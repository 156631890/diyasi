import ProductCard from "./ProductCard";
import ResourceQuoteLink from "./ResourceQuoteLink";
import { catalogProducts } from "@/lib/catalog-source";
import { resourceRelatedLinks } from "@/lib/buyer-guidance";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";
import { ORGANIZATION_ID } from "@/lib/site-config";
import { companyInfo } from "@/lib/site-info";
import Image from "next/image";
import Link from "next/link";
import { manufacturerFaq, manufacturerModels, manufacturerPages, manufacturerPath, manufacturerSpecifications, componentRows, productionSteps, manufacturingNotes, migratedArticle, type ManufacturerPage } from "@/lib/manufacturer-pages";

export function SourcingTable({rows, label}:{rows:string[][]; label:string}) {
  return <div className="d-table-scroll" tabIndex={0} role="region" aria-label={label}><table><thead><tr>{rows[0].map((cell,i)=><th key={i} scope="col">{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export default function ManufacturerPageTemplate({page}:{page:ManufacturerPage}) {
  const models=manufacturerModels(page);
  const migrated=migratedArticle(page);
  return <main id="main-content">
    <JsonLd data={buildBreadcrumbJsonLd([{name:"Home",path:"/"},{name:"Manufacturers",path:"/manufacturers"},{name:page.h1,path:manufacturerPath(page.slug)}])}/>
    <JsonLd data={{"@context":"https://schema.org","@type":"Service","@id":absoluteUrl(manufacturerPath(page.slug))+"#service",name:page.h1,serviceType:page.assessmentOnly ? `${page.h1} feasibility assessment` : page.h1,description:page.intro,url:absoluteUrl(manufacturerPath(page.slug)),provider:{"@id":ORGANIZATION_ID},areaServed:companyInfo.exportMarkets}}/>
    <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:manufacturerFaq(page).map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}}/>
    <header className="d-article-head"><nav className="d-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/manufacturers">Manufacturers</Link></nav><p className="d-eyebrow">{page.assessmentOnly ? "Category feasibility enquiry" : "Manufacturing & sourcing"}</p><h1>{page.h1}</h1><p>{page.description}</p><p className="d-fineprint">By <Link href="/about">DIYASI</Link> · Published <time dateTime="2026-10-31">31 October 2026</time></p></header>
    <div className="d-article-layout"><aside className="d-article-aside"><p className="d-eyebrow">Plan your order</p><nav aria-label="Page contents"><a href="#specifications">Specifications</a><a href="#quantities">MOQ & quotation</a><a href="#customization">Labels & packaging</a><a href="#quality">Quality evidence</a><a href="#production">Production process</a><a href="#questions">Questions</a></nav><Link className="d-text-link" href="/contact#quote-form">Discuss your brief ↗</Link></aside>
    <article className="d-article-body"><p className="d-article-answer">{page.intro}</p>
      {page.assessmentOnly && <p><strong>Capability requires confirmation.</strong> This page is a procurement assessment, not an offer of a verified production range for this category.</p>}
      {models[0] && <figure className="d-article-photo"><Image src={models[0].image_url} alt={`${models[0].model_number}: original DIYASI catalogue style photograph`} width={800} height={800} sizes="(max-width:800px) 90vw,750px" loading="eager"/><figcaption>Actual catalogue style {models[0].model_number}; confirm the final specification on the approved sample.</figcaption></figure>}
      {page.focus.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}
      <section id="specifications"><h2>Specifications to verify before sampling</h2><SourcingTable rows={manufacturerSpecifications(page)} label="Manufacturing specification references"/>{models.map(p=><p key={p.slug}><Link href={`/products/${p.slug}`}>View {p.model_number} measurements, source details and photographs ↗</Link></p>)}</section>
      <section id="quantities"><h2>MOQ and a comparable written quotation</h2><p>{manufacturingNotes.quantities}</p><p>The website does not publish a verified unit-price ladder. Request your actual quantity and specification through the enquiry form; a quotation is required before making a cost or discount assumption.</p></section>
      <section id="customization"><h2>Private-label components and their limits</h2><p>{manufacturingNotes.custom}</p><SourcingTable rows={componentRows} label="Component approval checklist"/><p><Link href="/packaging">Review the existing labels and packaging information ↗</Link></p></section>
      <section id="quality"><h2>Quality checks and certification evidence</h2><p>{manufacturingNotes.quality}</p><p><Link href="/factory">Factory information and inspection stages</Link> · <Link href="/news/underwear-aql-inspection-defect-checklist">Prepare an AQL inspection and defect checklist</Link></p></section>
      <section id="production"><h2>Six decisions from brief to dispatch</h2>{productionSteps.map(s=><section key={s.title}><h3>{s.title}</h3><p><strong>Timing:</strong> {s.timing}</p><p>{s.text}</p></section>)}</section>
      {migrated && <section>{migrated.coverImage!==models[0]?.image_url && <Image src={migrated.coverImage} alt="Original DIYASI sourcing guide illustration" width={800} height={800} loading="lazy"/>}<h2>Detailed buying notes retained from the sourcing guide</h2><p>{migrated.answer}</p>{migrated.sections.map(s=><section key={s.title}><h3>{s.title}</h3><p>{s.text}</p>{"rows" in s && s.rows && <SourcingTable rows={s.rows} label={s.title}/>}</section>)}</section>}
      {migrated && <section><h2>Additional questions from the original guide</h2>{migrated.faq.map(([q,a])=><section key={q}><h3>{q}</h3><p>{a}</p></section>)}<h2>Sources and further reading</h2><p>External standards explain their own scope; these references do not establish certification of a garment or factory.</p>{migrated.references.map(([label,href])=><p key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></p>)}<ResourceQuoteLink resourceSlug={migrated.slug}/></section>}
      <section id="questions" className="d-service-faq"><h2>Purchasing questions</h2><div className="d-accordions">{manufacturerFaq(page).map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className="d-source-links"><h2>Related manufacturing services</h2>{page.relatedManufacturers.map(slug=><p key={slug}><Link href={manufacturerPath(slug)}>{manufacturerPages.find(p=>p.slug===slug)?.h1}</Link></p>)}<h2>Go deeper before requesting a quote</h2>{page.resources.map(slug=><p key={slug}><Link href={`/resources/${slug}`}>{slug.replaceAll("-"," ")}</Link></p>)}<p><Link href="/oem-odm">OEM / ODM process</Link> · <Link href="/fabrics">Material information</Link> · <Link href="/about">Company identity and evidence</Link></p><p>Specifications above come from the published DIYASI catalogue and company pages. They are supplier information, not an independent audit or a substitute for order-specific confirmation.</p></section>
      <p><Link className="d-button" href="/contact#quote-form">Send your manufacturing brief ↗</Link></p>
    </article></div>
    {migrated && <><JsonLd data={{"@context":"https://schema.org","@type":"Article","@id":absoluteUrl(manufacturerPath(page.slug))+"#sourcing-notes",headline:migrated.title,datePublished:migrated.publishedAt,dateModified:"2026-10-31",author:{"@id":ORGANIZATION_ID},publisher:{"@id":ORGANIZATION_ID},citation:migrated.references.map(r=>r[1]),image:absoluteUrl(migrated.coverImage)}}/><section className="d-section d-related"><h2>Styles from the original sourcing guide</h2><div className="d-product-grid">{catalogProducts.filter(p=>migrated.models.includes(p.model_number)).map(p=><ProductCard key={p.slug} product={p}/>)}</div></section><section className="d-section d-reading"><h2>Keep exploring</h2>{(resourceRelatedLinks[migrated.slug]??[]).map(r=><Link className="d-text-link" key={r.href} href={r.href}>{r.label} ↗</Link>)}</section></>}
  </main>;
}
