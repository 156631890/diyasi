// Small route manifest shared with navigation; no page bodies in the client bundle.
const p0=["private-label-underwear-manufacturer","low-moq-underwear-manufacturer","custom-underwear-manufacturer","seamless-underwear-manufacturer"];
const core=[...p0,"mens-underwear-manufacturer","lingerie-manufacturer","bra-manufacturer","underwear-factory"];
const guides=["underwear-manufacturing-cost","underwear-manufacturing-process","underwear-moq-explained"];
export function sourcingAlternates(path:string):Record<string,string>|undefined{
 const english=path.replace(/^\/(es|fr|de|it)(?=\/)/,"");
 const parts=english.split("/");
 let locales:string[]=[];
 if(parts[1]==="manufacturers"&&core.includes(parts[2]))locales=p0.includes(parts[2])?["es","fr","de","it"]:["fr","de","it"];
 if(parts[1]==="guides"&&guides.includes(parts[2]))locales=["es"];
 if(!locales.length)return undefined;
 return {en:english,...Object.fromEntries(locales.map(l=>[l,`/${l}${english}`])),"x-default":english};
}
