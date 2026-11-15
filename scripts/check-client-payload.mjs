import { gzipSync } from 'node:zlib';
import { BASE_URL, fetchPath, parseHtml, saveReport, concurrentMap } from './check-internal-links.mjs';
const page=await fetchPath('/');
if(page.status!==200) throw new Error('Homepage unavailable');
const scripts=[...new Set(parseHtml(page.html).elements.filter(n=>n.tag==='script'&&n.attrs.src?.startsWith('/_next/static/')).map(n=>n.attrs.src))];
const chunks=await concurrentMap(scripts,async path=>{
  const r=await fetch(BASE_URL+path,{signal:AbortSignal.timeout(30000)});
  if(!r.ok) throw new Error(`${path}: ${r.status}`);
  const body=Buffer.from(await r.arrayBuffer());
  return {path,bytes:body.length,gzipBytes:gzipSync(body).length,containsArticleCorpus:body.includes(Buffer.from('Keep the enquiry and its revisions together'))||body.includes(Buffer.from('Choose a public category system and apply it consistently'))};
});
const report={baseUrl:BASE_URL,at:new Date().toISOString(),htmlBytes:Buffer.byteLength(page.html),chunks,decodedBytes:chunks.reduce((s,c)=>s+c.bytes,0),gzipBytes:chunks.reduce((s,c)=>s+c.gzipBytes,0),note:'Initial script tags only, same gzip method for comparison; not a Core Web Vitals or real network timing measurement.'};
await saveReport('client-payload.json',report);
console.log(JSON.stringify({...report,chunks:chunks.length},null,2));
