import TranslatedSourcingPage, { translatedMetadata } from "@/components/TranslatedSourcingPage";
import { sourcingLocales } from "@/lib/sourcing-translations";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(sourcingLocales.it.pages).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return translatedMetadata("it","manufacturers",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <TranslatedSourcingPage locale="it" kind="manufacturers" slug={slug}/>;}
