import TranslatedSourcingPage, { translatedMetadata } from "@/components/TranslatedSourcingPage";
import { sourcingLocales } from "@/lib/sourcing-translations";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(sourcingLocales.fr.pages).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return translatedMetadata("fr","manufacturers",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <TranslatedSourcingPage locale="fr" kind="manufacturers" slug={slug}/>;}
