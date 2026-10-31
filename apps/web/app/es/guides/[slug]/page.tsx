import TranslatedSourcingPage, { translatedMetadata } from "@/components/TranslatedSourcingPage";
import { translatedGuides } from "@/lib/sourcing-translations";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return translatedGuides.map(g=>g.slug).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return translatedMetadata("es","guides",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <TranslatedSourcingPage locale="es" kind="guides" slug={slug}/>;}
