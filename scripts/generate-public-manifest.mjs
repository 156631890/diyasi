import { createRequire } from 'node:module';
import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const app = fileURLToPath(new URL('../apps/web/', import.meta.url));
const { build } = createRequire(app + 'package.json')('esbuild');
// Project only routing and product identifiers into the browser. Article bodies,
// sourcing translations and supplier evidence belong in server-rendered pages.
const result = await build({stdin:{contents:'import { indexableContent } from "./lib/indexable-content"; import { indexableProducts } from "./lib/indexable-products"; export default {paths:indexableContent.paths,products:indexableProducts.map(({id,title,route})=>({id,title,route}))};',resolveDir:app,loader:'ts'},bundle:true,platform:'node',format:'esm',write:false,tsconfig:app+'tsconfig.json'});
const {default: manifest} = await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const output = new URL('../apps/web/data/public-manifest.json', import.meta.url);
const content=JSON.stringify(manifest,null,2)+'\n';
if(process.argv.includes('--check')){
  if(await readFile(output,'utf8')!==content) throw new Error('Public manifest is stale; run npm run generate:public');
} else await writeFile(output,content);
console.log(`Public routing manifest: ${manifest.paths.length} pages, ${manifest.products.length} products`);
