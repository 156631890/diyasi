import TranslatedSourcingPage, { translatedMetadata } from "@/components/TranslatedSourcingPage";
import { sourcingLocales } from "@/lib/sourcing-translations";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(sourcingLocales.de.pages).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return translatedMetadata("de","manufacturers",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <TranslatedSourcingPage locale="de" kind="manufacturers" slug={slug}/>;}
