import { notFound } from "next/navigation";
import ManufacturerPageTemplate from "@/components/ManufacturerPageTemplate";
import { manufacturerPages, manufacturerPath } from "@/lib/manufacturer-pages";
import { buildMetadata } from "@/lib/seo";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return manufacturerPages.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const p=manufacturerPages.find(p=>p.slug===slug);if(!p)notFound();return buildMetadata({title:p.title,description:p.description,path:manufacturerPath(p.slug)});}
export default async function Page({params}:Props){const {slug}=await params;const p=manufacturerPages.find(p=>p.slug===slug);if(!p)notFound();return <ManufacturerPageTemplate page={p}/>;}
