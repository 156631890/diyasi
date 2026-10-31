import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Native fetch and a small HTML tokenizer keep the audit independent of new npm packages.
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const PUBLIC_ORIGIN = 'https://www.yiwudiyasidress.com';
export const BASE_URL = (process.env.BASE_URL || 'http://localhost:3131').replace(/\/$/, '');
export const OUTPUT_DIR = resolve(process.env.SEO_REPORT_DIR || resolve(ROOT, 'docs/seo-growth-20261031'));
const LIMIT = Number(process.env.SEO_MAX_PAGES || 4000);
const CONCURRENCY = Math.max(1, Math.min(12, Number(process.env.SEO_CONCURRENCY || 5)));
export const MANUFACTURER_SLUGS = [
  'private-label-underwear-manufacturer', 'low-moq-underwear-manufacturer',
  'custom-underwear-manufacturer', 'seamless-underwear-manufacturer',
  'mens-underwear-manufacturer', 'shapewear-manufacturer', 'bra-manufacturer',
  'underwear-factory', 'lingerie-manufacturer', 'swimwear-manufacturer',
  'lingerie-supplier', 'private-label-lingerie',
];
const SITE_HOSTS = new Set([new URL(PUBLIC_ORIGIN).host, 'yiwudiyasidress.com', new URL(BASE_URL).host]);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'br', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'section', 'summary', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul']);
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…', copy: '©', reg: '®', trade: '™', middot: '·', times: '×', euro: '€', pound: '£', bull: '•', rarr: '→', larr: '←', uarr: '↑', darr: '↓' };

export function decodeEntities(value) {
  return String(value).replace(/&(#x[\da-f]+|#\d+|[a-z][\da-z]+);/gi, (match, name) => {
    if (name[0] !== '#') return NAMED[name] ?? match;
    const n = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : '\ufffd';
  });
}
export const normalizeText = (value) => decodeEntities(value).replace(/\s+/gu, ' ').trim();
function attributes(source) {
  const attrs = {};
  const re = /([^\s=/'">]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const m of source.matchAll(re)) attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}
export function parseHtml(html) {
  const root = { tag: '#document', attrs: {}, children: [], excluded: false };
  const stack = [root], elements = [], lower = html.toLowerCase();
  let cursor = 0;
  while (cursor < html.length) {
    if (html.startsWith('<!--', cursor)) {
      const end = html.indexOf('-->', cursor + 4); cursor = end < 0 ? html.length : end + 3; continue;
    }
    if (html[cursor] !== '<') {
      const end = html.indexOf('<', cursor);
      stack.at(-1).children.push(html.slice(cursor, end < 0 ? html.length : end));
      cursor = end < 0 ? html.length : end; continue;
    }
    let end = cursor + 1, quote = '';
    for (; end < html.length; end++) {
      const ch = html[end];
      if (quote) { if (ch === quote) quote = ''; }
      else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '>') break;
    }
    const source = html.slice(cursor + 1, end); cursor = Math.min(end + 1, html.length);
    if (/^[!?]/.test(source)) continue;
    const close = source.match(/^\s*\/\s*([\w:-]+)/);
    if (close) {
      const index = stack.map((node) => node.tag).lastIndexOf(close[1].toLowerCase());
      if (index > 0) stack.length = index;
      continue;
    }
    const open = source.match(/^\s*([\w:-]+)/);
    if (!open) { stack.at(-1).children.push('<' + source + '>'); continue; }
    const tag = open[1].toLowerCase();
    const attrs = attributes(source.slice(open[0].length));
    const excluded = stack.at(-1).excluded || ['script', 'style', 'head', 'template', 'noscript', 'svg'].includes(tag) || 'hidden' in attrs || attrs['aria-hidden'] === 'true' || /(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attrs.style || '');
    const node = { tag, attrs, children: [], excluded };
    stack.at(-1).children.push(node); elements.push(node);
    if (['script', 'style', 'textarea', 'title'].includes(tag)) {
      const closing = lower.indexOf('</' + tag, cursor);
      node.children.push(html.slice(cursor, closing < 0 ? html.length : closing));
      cursor = closing < 0 ? html.length : html.indexOf('>', closing) + 1;
      if (cursor === 0) cursor = html.length;
    } else if (!VOID.has(tag) && !/\/\s*$/.test(source)) stack.push(node);
  }
  function rawText(node) { return typeof node === 'string' ? node : node.children.map(rawText).join(''); }
  function visible(node) {
    if (typeof node === 'string') return decodeEntities(node);
    if (node.excluded) return '';
    const text = node.children.map(visible).join('');
    return BLOCK.has(node.tag) ? '\n' + text + '\n' : text;
  }
  const body = elements.find((node) => node.tag === 'body') || root;
  return { root, elements, rawText, visible, text: normalizeText(visible(body)) };
}
export function localPath(href, from = '/') {
  if (!href || /^(?:mailto:|tel:|javascript:|data:|blob:)/i.test(href)) return null;
  try {
    const url = new URL(href, new URL(from, PUBLIC_ORIGIN));
    if (!['http:', 'https:'].includes(url.protocol) || !SITE_HOSTS.has(url.host)) return null;
    url.hash = ''; url.searchParams.sort();
    return url.pathname + url.search;
  } catch { return null; }
}
const privatePath = (path) => /^\/(?:api|admin|payments|checkout)(?:[/?]|$)/.test(path);
const assetPath = (path) => /\.(?:png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|eot|pdf|zip|csv|xlsx?|mp4|webm|css|js|map|xml|txt)(?:\?|$)/i.test(path);
export async function fetchPath(path, options = {}) {
  let current = path;
  const redirects = [];
  try {
    for (let hop = 0; hop <= 8; hop++) {
      let response = await fetch(BASE_URL + current, {
        method: options.headOnly ? 'HEAD' : 'GET',
        redirect: 'manual', signal: AbortSignal.timeout(30000),
        headers: { 'User-Agent': 'DIYASI-SEO-Verification/1.0', Accept: 'text/html,application/xml;q=0.9,*/*;q=0.8' },
      });
      if (options.headOnly && response.status === 405) {
        await response.body?.cancel();
        response = await fetch(BASE_URL + current, { redirect: 'manual', signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'DIYASI-SEO-Verification/1.0', Range: 'bytes=0-0' } });
      }
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const destination = response.headers.get('location');
        redirects.push({ status: response.status, from: current, to: destination });
        await response.body?.cancel();
        const next = localPath(destination, current);
        if (!next || privatePath(next)) return { path, status: response.status, finalPath: destination, redirects, error: 'Redirect left the public audited origin or entered an excluded route', html: '' };
        if (hop === 8 || redirects.some((r) => r.from === next)) return { path, status: response.status, finalPath: next, redirects, error: 'Redirect loop or more than eight hops', html: '' };
        current = next; continue;
      }
      let html = '';
      if (options.headOnly) await response.body?.cancel();
      else html = await response.text();
      return { path, finalPath: current, status: response.status, redirects, html, contentType: response.headers.get('content-type') || '', xRobotsTag: response.headers.get('x-robots-tag') || '' };
    }
  } catch (error) { return { path, finalPath: current, status: 0, redirects, html: '', error: error.message }; }
}
export async function readSitemap() {
  const pending = ['/sitemap.xml'], seen = new Set(), paths = [], rawUrls = [], errors = [], files = [];
  while (pending.length) {
    const path = pending.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    if (seen.size > 100) { errors.push({ path, message: 'Sitemap XML limit of 100 exceeded' }); break; }
    const result = await fetchPath(path); files.push({ path, status: result.status, redirects: result.redirects });
    if (result.status !== 200 || result.redirects.length || result.error) { errors.push({ path, message: result.error || 'Sitemap did not return direct HTTP 200' }); continue; }
    const doc = parseHtml(result.html);
    const index = doc.elements.find((node) => node.tag === 'sitemapindex');
    const urlset = doc.elements.find((node) => node.tag === 'urlset');
    if (!index && !urlset) { errors.push({ path, message: 'Not a sitemapindex or urlset XML document' }); continue; }
    // Only direct loc children of sitemap/url entries: image:loc is never a page URL.
    for (const entry of (index || urlset).children.filter((node) => typeof node !== 'string' && node.tag === (index ? 'sitemap' : 'url'))) {
      const loc = entry.children.find((node) => typeof node !== 'string' && node.tag === 'loc');
      if (!loc) { errors.push({ path, message: 'Entry lacks loc' }); continue; }
      const raw = decodeEntities(doc.rawText(loc)).trim(), target = localPath(raw);
      if (!target) { errors.push({ path, url: raw, message: 'Sitemap URL outside expected origin' }); continue; }
      if (index) pending.push(target);
      else {
        paths.push(target); rawUrls.push(raw);
        if (new URL(raw).search) errors.push({ path, url: raw, message: 'Query URL in sitemap' });
        if (raw !== PUBLIC_ORIGIN + target.replace(/\/+$/, '')) errors.push({ path, url: raw, message: 'Sitemap URL violates canonical host/no-trailing-slash policy' });
      }
    }
  }
  const duplicates = paths.filter((path, i) => paths.indexOf(path) !== i);
  if (duplicates.length) errors.push({ message: 'Duplicate sitemap page URLs', paths: [...new Set(duplicates)] });
  return { paths: [...new Set(paths)], rawUrls, files, errors };
}
export async function concurrentMap(items, worker) {
  let cursor = 0;
  const results = new Array(items.length);
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) { const i = cursor++; results[i] = await worker(items[i]); }
  }));
  return results;
}
export function inspectPage(result) {
  const doc = parseHtml(result.html);
  const links = doc.elements.filter((node) => node.tag === 'a' && node.attrs.href).map((node) => ({ href: node.attrs.href, path: localPath(node.attrs.href, result.finalPath || result.path), text: normalizeText(doc.visible(node)) }));
  const canonical = doc.elements.filter((node) => node.tag === 'link' && (node.attrs.rel || '').toLowerCase().split(/\s+/).includes('canonical')).map((node) => node.attrs.href);
  const alternates = doc.elements.filter((node) => node.tag === 'link' && node.attrs.hreflang && (node.attrs.rel || '').toLowerCase().split(/\s+/).includes('alternate')).map((node) => ({ language: node.attrs.hreflang, href: node.attrs.href, path: localPath(node.attrs.href, result.finalPath || result.path) }));
  const robots = doc.elements.filter((node) => node.tag === 'meta' && ['robots', 'googlebot'].includes((node.attrs.name || '').toLowerCase())).map((node) => node.attrs.content || '');
  return { ...result, doc, links, canonical, alternates, robots };
}
export async function saveReport(name, report) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const path = resolve(OUTPUT_DIR, name);
  await writeFile(path, JSON.stringify(report, null, 2) + '\n');
  return path;
}

async function main() {
  const started = new Date().toISOString(), sitemap = await readSitemap();
  const pages = new Map(), excluded = new Set(), queued = new Set(), pending = [], assets = new Set();
  const add = (path) => { if (!path || queued.has(path)) return; if (privatePath(path)) { excluded.add(path); return; } queued.add(path); pending.push(path); };
  ['/', ...sitemap.paths].forEach(add);
  let capped = false;
  while (pending.length) {
    if (pages.size >= LIMIT) { capped = true; break; }
    const batch = pending.splice(0, Math.min(CONCURRENCY, LIMIT - pages.size));
    const responses = await concurrentMap(batch, fetchPath);
    for (const result of responses) {
      const page = inspectPage(result); pages.set(result.path, page);
      if (!/text\/html/i.test(page.contentType || '')) continue;
      // Assets linked by anchors get a separate HEAD check and do not enter the HTML graph.
      for (const link of page.links) if (link.path) {
        if (assetPath(link.path)) assets.add(link.path);
        else add(link.path);
      }
      for (const alternate of page.alternates) add(alternate.path);
    }
    if (pages.size % 50 < CONCURRENCY) console.log(`Checked ${pages.size} URLs; ${pending.length} pending`);
  }
  const deadLinks = [], failures = [...sitemap.errors], redirects = [], sitemapChecks = [];
  const assetChecks = await concurrentMap([...assets], (path) => fetchPath(path, { headOnly: true }));
  for (const asset of assetChecks) {
    if (asset.status >= 400 || !asset.status || asset.error) deadLinks.push({ path: asset.path, status: asset.status, error: asset.error, kind: 'linked_asset', sources: [...pages.values()].filter((p) => p.links.some((a) => a.path === asset.path)).map((p) => p.path) });
  }
  for (const page of pages.values()) {
    if (page.status >= 400 || !page.status || page.error) {
      const sources = [...pages.values()].filter((p) => p.links.some((a) => a.path === page.path)).map((p) => p.path);
      deadLinks.push({ path: page.path, status: page.status, error: page.error, sources });
    }
    if (page.redirects.length) redirects.push({ path: page.path, redirects: page.redirects });
  }
  for (const path of sitemap.paths) {
    const page = pages.get(path), issues = [];
    if (!page) issues.push('not_checked');
    else {
      if (page.status !== 200) issues.push(`http_${page.status}`);
      if (page.redirects.length) issues.push('redirect_in_sitemap');
      if (page.canonical.length !== 1) issues.push('expected_one_canonical');
      else if (localPath(page.canonical[0]) !== path) issues.push('canonical_points_elsewhere');
      else if (page.canonical[0] !== PUBLIC_ORIGIN + path.replace(/\/+$/, '')) issues.push('canonical_host_or_trailing_slash_mismatch');
      if ([...page.robots, page.xRobotsTag].some((text) => /\b(?:noindex|none)\b/i.test(text))) issues.push('noindex_in_sitemap');
    }
    sitemapChecks.push({ path, status: page?.status ?? null, canonical: page?.canonical || [], issues });
  }
  const incoming = new Map();
  for (const page of pages.values()) {
    const source = page.canonical.length === 1 ? localPath(page.canonical[0]) : page.path;
    for (const target of new Set(page.links.map((link) => link.path).filter(Boolean))) {
      if (target === source) continue;
      if (!incoming.has(target)) incoming.set(target, new Set());
      incoming.get(target).add(source);
    }
  }
  const depth = new Map([['/', 0]]), bfs = ['/'];
  while (bfs.length) {
    const path = bfs.shift(), page = pages.get(path);
    if (!page) continue;
    const targets = page.links.map((link) => link.path).filter(Boolean);
    if (page.redirects.length && pages.has(page.finalPath)) targets.push(page.finalPath);
    for (const target of targets) if (!depth.has(target)) { depth.set(target, depth.get(path) + 1); bfs.push(target); }
  }
  const manufacturers = MANUFACTURER_SLUGS.map((slug) => {
    const path = '/manufacturers/' + slug, sources = [...(incoming.get(path) || [])];
    return { path, inboundPages: sources.length, clickDepth: depth.get(path) ?? null, status: pages.get(path)?.status ?? null, sources, passed: sources.length >= 5 && depth.has(path) && depth.get(path) <= 2 && pages.get(path)?.status === 200 };
  });
  const hreflangErrors = [];
  for (const page of pages.values()) {
    if (!sitemap.paths.includes(page.path) || !page.alternates.length) continue;
    const group = Object.fromEntries(page.alternates.map((a) => [a.language, a.path]));
    if (page.alternates.length !== Object.keys(group).length) hreflangErrors.push({ path: page.path, message: 'Duplicate hreflang entries' });
    if (!group['x-default']) hreflangErrors.push({ path: page.path, message: 'Missing x-default' });
    for (const alternate of page.alternates) {
      const peer = pages.get(alternate.path);
      if (!peer || peer.status !== 200 || peer.redirects.length) { hreflangErrors.push({ path: page.path, target: alternate.path, message: 'Alternate target is not direct HTTP 200' }); continue; }
      const peerGroup = Object.fromEntries(peer.alternates.map((a) => [a.language, a.path]));
      if (JSON.stringify(Object.entries(group).sort()) !== JSON.stringify(Object.entries(peerGroup).sort())) hreflangErrors.push({ path: page.path, target: alternate.path, message: 'Hreflang groups are not reciprocal and identical' });
      if (peer.canonical.length !== 1 || localPath(peer.canonical[0]) !== alternate.path) hreflangErrors.push({ path: page.path, target: alternate.path, message: 'Alternate does not use self canonical' });
    }
  }
  if (capped) failures.push({ message: `Crawl capped at ${LIMIT}; incomplete audit`, remaining: pending.length });
  if (deadLinks.length) failures.push({ message: `${deadLinks.length} failed public URLs` });
  if (sitemapChecks.some((entry) => entry.issues.length)) failures.push({ message: 'Sitemap indexability failures' });
  if (manufacturers.some((entry) => !entry.passed)) failures.push({ message: 'Manufacturer inbound-link/depth/status requirements failed' });
  if (hreflangErrors.length) failures.push({ message: 'Hreflang validation failed' });
  const report = { started, completed: new Date().toISOString(), baseUrl: BASE_URL, publicOrigin: PUBLIC_ORIGIN, passed: failures.length === 0, sitemapPageCount: sitemap.paths.length, checkedUrlCount: pages.size, linkedAssetChecks: assetChecks.map(({ path, status, redirects, error }) => ({ path, status, redirects, error })), sitemapFiles: sitemap.files, excludedPrivateRoutes: [...excluded], deadLinks, redirects, manufacturers, hreflangErrors, sitemapChecks, failures };
  const output = await saveReport('internal-links.json', report);
  console.log(JSON.stringify({ passed: report.passed, sitemapPages: sitemap.paths.length, checkedUrls: pages.size, deadLinks: deadLinks.length, manufacturersPassing: manufacturers.filter((p) => p.passed).length, hreflangErrors: hreflangErrors.length, report: output }, null, 2));
  if (!report.passed) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch((error) => { console.error(error); process.exitCode = 1; });
