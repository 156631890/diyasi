import dictionaries from "@/data/sourcing-locales.json";
import spanishGuides from "@/data/spanish-guides.json";
export type SourcingLocale="es"|"fr"|"de"|"it";
export type SourcingDictionary={home:string;hub:string;guides:string;specs:string;questions:string;related:string;contact:string;evidence:string;assessment:string;rows:string[][];sections:string[][];faq:string[][];pages:Record<string,string[]>};
export const sourcingLocales=dictionaries as Record<SourcingLocale,SourcingDictionary>;
export const translatedGuides=spanishGuides;
export const translatedPaths=Object.entries(sourcingLocales).flatMap(([locale,d])=>Object.keys(d.pages).map(slug=>`/${locale}/manufacturers/${slug}`)).concat(spanishGuides.map(g=>`/es/guides/${g.slug}`));
