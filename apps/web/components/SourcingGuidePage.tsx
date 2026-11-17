import Link from "next/link";
import JsonLd from "./JsonLd";
import { SourcingTable } from "./ManufacturerPageTemplate";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";
import { ORGANIZATION_ID } from "@/lib/site-config";
import { guideDate, guideEvidence, type SourcingGuide } from "@/lib/sourcing-guides";
import { manufacturerPages } from "@/lib/manufacturer-pages";

export default function SourcingGuidePage({guide:g}:{guide:SourcingGuide}) {
 const path=`/guides/${g.slug}`;
 const updated=["underwear-manufacturing-cost","underwear-moq-explained","starting-an-underwear-brand"].includes(g.slug)?"2026-11-17":guideDate;
 return <main id="main-content">
  <JsonLd data={{"@context":"https://schema.org","@type":"Article",headline:g.title,description:g.description,datePublished:guideDate,dateModified:updated,inLanguage:"en",author:{"@id":ORGANIZATION_ID},publisher:{"@id":ORGANIZATION_ID},mainEntityOfPage:absoluteUrl(path)}}/>
  <JsonLd data={buildBreadcrumbJsonLd([{name:"Home",path:"/"},{name:"Buying guides",path:"/guides"},{name:g.title,path}])}/>
  <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:g.faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}}/>
  <header className="d-article-head"><nav className="d-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Buying guides</Link></nav><p className="d-eyebrow">Practical sourcing decisions</p><h1>{g.title}</h1><p>{g.description}</p><p className="d-fineprint">By <Link href="/about">DIYASI</Link> · <time dateTime={guideDate}>31 October 2026</time>{updated!==guideDate && <> · Updated <time dateTime={updated}>17 November 2026</time></>}</p></header>
  <div className="d-article-layout"><aside className="d-article-aside"><p className="d-eyebrow">In this guide</p><nav>{g.sections.map((s,i)=><a key={s.title} href={`#step-${i}`}>{s.title}</a>)}</nav><Link href={`/contact?from=${encodeURIComponent(path)}#quote-form`}>Discuss a specific brief ↗</Link></aside>
  <article className="d-article-body"><p className="d-article-answer">{g.answer}</p>{g.sections.map((s,i)=><section key={s.title} id={`step-${i}`}><h2>{s.title}</h2><p>{s.text}</p></section>)}
  <section><h2>Decision worksheet</h2><SourcingTable rows={g.rows} label={`${g.title} worksheet`}/></section>
  {g.slug==="underwear-manufacturing-cost" && <p><Link href="/resources/unit-cost-custom-underwear-manufacturing#cost-calculator">Have a quotation? Calculate and export landed unit cost ↗</Link></p>}
  {g.slug==="underwear-moq-explained" && <p><Link href="/resources/private-label-underwear-moq-guide#moq-allocation">Complete the per-model MOQ and component worksheet ↗</Link></p>}
  {g.slug==="starting-an-underwear-brand" && <p><Link href="/resources/underwear-manufacturer-for-startup-brands#first-order-rfq">Ready to source? Prepare your first-order RFQ ↗</Link></p>}
  <section><h2>Evidence and enquiry checklist</h2>{guideEvidence.map(p=><p key={p}>{p}</p>)}<p><Link href="/products">Catalogue specifications</Link> · <Link href="/factory">Factory and quality information</Link> · <Link href="/packaging">Labels and packing</Link> · <Link href="/resources">Detailed sourcing resources</Link></p></section>
  <section><h2>Frequently asked questions</h2><div className="d-accordions">{g.faq.map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <section><h2>Next steps for your product</h2>{g.related.map(slug=><p key={slug}><Link href={`/manufacturers/${slug}`}>{manufacturerPages.find(p=>p.slug===slug)?.h1}</Link></p>)}<p><Link className="d-button" href={`/contact?from=${encodeURIComponent(path)}#quote-form`}>Send your sourcing brief ↗</Link></p></section>
  </article></div>
 </main>;
}
