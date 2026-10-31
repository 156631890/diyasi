import { BASE_URL, PUBLIC_ORIGIN, concurrentMap, fetchPath, inspectPage, localPath, normalizeText, parseHtml, readSitemap, saveReport } from './check-internal-links.mjs';

const hasType = (node, type) => [node['@type']].flat().includes(type);
function* walk(value) {
  if (!value || typeof value !== 'object') return;
  if (!Array.isArray(value)) yield value;
  for (const child of Object.values(value)) yield* walk(child);
}
const schemaText = (value) => { const doc = parseHtml(String(value ?? '')); return normalizeText(doc.visible(doc.root)); };

async function main() {
  const started = new Date().toISOString(), sitemap = await readSitemap();
  const pages = await concurrentMap(sitemap.paths, async (path) => inspectPage(await fetchPath(path)));
  const errors = [...sitemap.errors], records = [], definitions = new Map(), references = [];
  let parsedBlocks = 0, faqQuestions = 0;
  if (!pages.length) errors.push({ message: 'No sitemap pages found; empty validation is not a pass' });
  for (const page of pages) {
    const pageErrors = [], schemas = [], types = new Set();
    if (page.status !== 200 || page.error || page.redirects.length) pageErrors.push('Expected direct HTTP 200');
    const scripts = page.doc.elements.filter((node) => node.tag === 'script' && (node.attrs.type || '').toLowerCase() === 'application/ld+json');
    if (!scripts.length) pageErrors.push('No JSON-LD blocks found');
    for (const [index, script] of scripts.entries()) {
      try { schemas.push(JSON.parse(page.doc.rawText(script))); parsedBlocks++; }
      catch (error) { pageErrors.push(`JSON-LD block ${index + 1}: ${error.message}`); }
    }
    const textUnits = new Set(page.doc.elements.filter((node) => ['summary', 'h1', 'h2', 'h3', 'h4', 'p', 'li', 'div', 'span', 'dd'].includes(node.tag)).map((node) => normalizeText(page.doc.visible(node))).filter(Boolean));
    for (const schema of schemas) for (const node of walk(schema)) {
      for (const type of [node['@type']].flat().filter(Boolean)) types.add(type);
      const id = node['@id'];
      if (id && typeof id === 'string') {
        let absolute;
        try { absolute = new URL(id, PUBLIC_ORIGIN + page.path).href; } catch { pageErrors.push(`Invalid @id: ${id}`); continue; }
        if (Object.keys(node).length === 1) references.push({ id: absolute, path: page.path });
        else {
          if (!definitions.has(absolute)) definitions.set(absolute, []);
          definitions.get(absolute).push({ path: page.path, type: node['@type'], name: node.name, url: node.url });
        }
      }
      if (hasType(node, 'FAQPage')) {
        if (!Array.isArray(node.mainEntity) || !node.mainEntity.length) pageErrors.push('FAQPage has no questions');
        for (const question of node.mainEntity || []) {
          faqQuestions++;
          const q = schemaText(question.name), answer = schemaText(question.acceptedAnswer?.text);
          if (!q || !textUnits.has(q)) pageErrors.push(`FAQ question not an exact visible text unit: ${q}`);
          if (!answer || !textUnits.has(answer)) pageErrors.push(`FAQ answer not an exact visible text unit: ${answer}`);
        }
      }
      if (hasType(node, 'Product')) {
        if ('offers' in node || 'aggregateRating' in node) pageErrors.push('Product contains prohibited offers or aggregateRating');
        if ([...walk(node)].some((child) => ['Offer', 'AggregateOffer', 'AggregateRating'].some((type) => hasType(child, type)))) pageErrors.push('Product contains prohibited Offer/AggregateOffer/AggregateRating object');
      }
    }
    if (/^(?:\/(?:es|fr|de|it))?\/manufacturers\/[^/]+$/.test(page.path)) {
      for (const required of ['Organization', 'Service', 'FAQPage', 'BreadcrumbList']) if (!types.has(required)) pageErrors.push(`Manufacturer page missing ${required}`);
      const faqCount = schemas.flatMap((schema) => [...walk(schema)]).filter((node) => hasType(node, 'FAQPage')).reduce((count, node) => count + (node.mainEntity?.length || 0), 0);
      if (faqCount !== 4) pageErrors.push(`Manufacturer page must have exactly 4 FAQ questions, found ${faqCount}`);
    }
    if (/^\/(resources|news|guides)\/[^/]+$/.test(page.path)) {
      if (!types.has('Article') && !types.has('NewsArticle')) pageErrors.push('Article route lacks Article/NewsArticle');
      if (!types.has('BreadcrumbList')) pageErrors.push('Article route lacks BreadcrumbList');
    }
    if (/^\/products\/[^/]+$/.test(page.path) && types.has('ItemPage')) {
      for (const required of ['Product', 'BreadcrumbList']) if (!types.has(required)) pageErrors.push(`Product detail missing ${required}`);
    }
    for (const message of pageErrors) errors.push({ path: page.path, message });
    records.push({ path: page.path, status: page.status, blocks: scripts.length, types: [...types], errors: pageErrors });
  }
  const idConflicts = [];
  for (const [id, items] of definitions) {
    for (const key of ['type', 'name', 'url']) {
      const values = new Set(items.filter((item) => item[key] !== undefined).map((item) => JSON.stringify(Array.isArray(item[key]) ? [...item[key]].sort() : item[key])));
      if (values.size > 1) idConflicts.push({ id, field: key, definitions: items });
    }
  }
  // Reusing #organization across pages is correct. Conflicting identities or unresolved
  // local entity references fail; external identifiers remain outside this site's graph.
  const unresolvedReferences = references.filter((reference) => {
    const url = new URL(reference.id);
    return url.origin === PUBLIC_ORIGIN && url.hash && !definitions.has(reference.id);
  });
  for (const conflict of idConflicts) errors.push({ message: 'Conflicting definitions for shared @id', ...conflict });
  for (const reference of unresolvedReferences) errors.push({ message: 'Unresolved local @id reference', ...reference });
  const canonicalMismatches = records.filter((record) => {
    const page = pages.find((p) => p.path === record.path);
    return page.canonical.length !== 1 || localPath(page.canonical[0]) !== page.path;
  }).map((record) => record.path);
  const report = { started, completed: new Date().toISOString(), baseUrl: BASE_URL, publicOrigin: PUBLIC_ORIGIN, passed: errors.length === 0, pages: pages.length, parsedBlocks, faqQuestions, uniqueDefinedIds: definitions.size, sharedIdsAreAllowed: true, idConflicts, unresolvedReferences, canonicalMismatches, records, errors };
  const output = await saveReport('jsonld.json', report);
  console.log(JSON.stringify({ passed: report.passed, pages: pages.length, parsedBlocks, faqQuestions, errors: errors.length, report: output }, null, 2));
  if (!report.passed) process.exitCode = 1;
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
