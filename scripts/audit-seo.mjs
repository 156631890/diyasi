import { readSitemap, fetchPath, inspectPage, concurrentMap, saveReport, normalizeText } from './check-internal-links.mjs';

const sitemap = await readSitemap();
const extra = ['/products?page=2', '/products?q=cotton', '/products?sort=model', '/products?page=999', '/does-not-exist-seo-check', '/design-preview', '/llms.txt', '/robots.txt'];
const pages = await concurrentMap([...sitemap.paths, ...extra], async path => {
  const p = inspectPage(await fetchPath(path));
  const nodes = p.doc.elements;
  const meta = name => nodes.filter(n => n.tag === 'meta' && (n.attrs.name === name || n.attrs.property === name)).map(n => n.attrs.content);
  const titles = nodes.filter(n => n.tag === 'title').map(n => normalizeText(p.doc.rawText(n)));
  const h1 = nodes.filter(n => n.tag === 'h1').map(n => normalizeText(p.doc.visible(n)));
  const main = nodes.find(n => n.tag === 'main');
  return {path,status:p.status,redirects:p.redirects,canonical:p.canonical,robots:[...p.robots,p.xRobotsTag].filter(Boolean),title:titles[0],titles:titles.length,description:meta('description')[0],h1,lang:nodes.find(n=>n.tag==='html')?.attrs.lang,ogImage:meta('og:image'),ogLocale:meta('og:locale'),alternates:p.alternates,mainWords:main?normalizeText(p.doc.visible(main)).split(' ').length:0,images:nodes.filter(n=>n.tag==='img').map(n=>({src:n.attrs.src,alt:n.attrs.alt,loading:n.attrs.loading,width:n.attrs.width,height:n.attrs.height})),bytes:Buffer.byteLength(p.html),error:p.error};
});
const duplicates = key => Object.entries(Object.groupBy(pages.filter(p=>sitemap.paths.includes(p.path)),p=>p[key])).filter(([,p])=>p.length>1).map(([value,p])=>({value,paths:p.map(x=>x.path)}));
const report={at:new Date().toISOString(),sitemapPages:sitemap.paths.length,pages,duplicateTitles:duplicates('title'),duplicateDescriptions:duplicates('description'),issues:pages.filter(p=>sitemap.paths.includes(p.path)&&(p.status!==200||p.h1.length!==1||!p.title||!p.description||p.canonical.length!==1||p.robots.some(r=>r.includes('noindex'))))};
await saveReport('seo-inventory.json',report);
console.log(JSON.stringify({sitemapPages:report.sitemapPages,issues:report.issues,duplicateTitles:report.duplicateTitles,duplicateDescriptions:report.duplicateDescriptions,longTitles:pages.filter(p=>p.title?.length>70).map(p=>({path:p.path,title:p.title,length:p.title.length})),longDescriptions:pages.filter(p=>p.description?.length>170).map(p=>({path:p.path,length:p.description.length})),extra:pages.filter(p=>extra.includes(p.path))},null,2));
