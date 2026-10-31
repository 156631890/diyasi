import Link from "next/link";
import { manufacturerPages, manufacturerPath } from "@/lib/manufacturer-pages";
export default function RelatedManufacturers({slugs}:{slugs:string[]}){return <section className="d-reading"><h2>Related manufacturing services</h2>{slugs.map(slug=>{const p=manufacturerPages.find(p=>p.slug===slug);return p?<p key={slug}><Link className="d-text-link" href={manufacturerPath(slug)}>{p.h1} ↗</Link></p>:null;})}</section>;}
