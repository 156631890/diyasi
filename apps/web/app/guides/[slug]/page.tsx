import { notFound } from "next/navigation";
import SourcingGuidePage from "@/components/SourcingGuidePage";
import { sourcingGuides } from "@/lib/sourcing-guides";
import { buildMetadata } from "@/lib/seo";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return sourcingGuides.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const g=sourcingGuides.find(g=>g.slug===slug);if(!g)notFound();return buildMetadata({title:g.title,description:g.description,path:`/guides/${g.slug}`});}
export default async function Page({params}:Props){const {slug}=await params;const g=sourcingGuides.find(g=>g.slug===slug);if(!g)notFound();return <SourcingGuidePage guide={g}/>;}
