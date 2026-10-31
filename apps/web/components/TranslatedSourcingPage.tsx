import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "./JsonLd";
import { SourcingTable } from "./ManufacturerPageTemplate";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ORGANIZATION_ID } from "@/lib/site-config";
import { companyInfo } from "@/lib/site-info";
import { sourcingLocales, translatedGuides, type SourcingLocale } from "@/lib/sourcing-translations";

function getPage(locale:SourcingLocale,kind:string,slug:string){
 const d=sourcingLocales[locale];if(!d)notFound();
 if(kind==="guides"){const g=locale==="es" ? translatedGuides.find(g=>g.slug===slug) : undefined;if(!g)notFound();return {d,title:g.title,description:g.description,intro:g.answer,sections:g.sections,rows:g.rows,faq:g.faq,related:g.related,assessment:false};}
 const p=d.pages[slug];if(kind!=="manufacturers"||!p)notFound();
 const assessment=slug==="bra-manufacturer";
 return {d,title:p[0],description:p[1],intro:p[2],sections:d.sections,rows:assessment ? [[d.rows[0][0],d.rows[0][2]],[p[0],d.assessment]] : d.rows,faq:assessment ? [[d.questions,d.assessment],[d.faq[2][0],d.faq[2][1]],[d.faq[3][0],d.faq[3][1]],[d.specs,d.evidence]] : d.faq,related:Object.keys(d.pages).filter(x=>x!==slug).slice(0,3),assessment};
}
export function translatedMetadata(locale:SourcingLocale,kind:string,slug:string){const p=getPage(locale,kind,slug);return buildMetadata({title:p.title,description:p.description,path:`/${locale}/${kind}/${slug}`});}
export default function TranslatedSourcingPage({locale,kind,slug}:{locale:SourcingLocale;kind:string;slug:string}){
 const p=getPage(locale,kind,slug),d=p.d,path=`/${locale}/${kind}/${slug}`;
 return <main id="main-content" lang={locale}>
  <JsonLd data={buildBreadcrumbJsonLd([{name:d.home,path:"/"},{name:kind==="guides"?d.guides:d.hub,path:`/${kind}`},{name:p.title,path}])}/>
  <JsonLd data={{"@context":"https://schema.org","@type":kind==="guides"?"Article":"Service","@id":absoluteUrl(path)+(kind==="guides"?"#article":"#service"),name:p.title,description:p.intro,url:absoluteUrl(path),...(kind==="guides"?{headline:p.title,inLanguage:locale,datePublished:"2026-10-31",dateModified:"2026-10-31",author:{"@id":ORGANIZATION_ID},publisher:{"@id":ORGANIZATION_ID}}:{serviceType:p.assessment ? d.assessment : p.title,provider:{"@id":ORGANIZATION_ID},areaServed:companyInfo.exportMarkets})}}/>
  <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:p.faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}}/>
  <header className="d-article-head"><nav className="d-breadcrumb"><Link href="/">{d.home}</Link><span>/</span><Link href={`/${kind}`}>{kind==="guides"?d.guides:d.hub} (EN)</Link></nav><p className="d-eyebrow">DIYASI · Yiwu</p><h1>{p.title}</h1><p>{p.description}</p><p className="d-fineprint">DIYASI · <time dateTime="2026-10-31">31 / 10 / 2026</time></p></header>
  <div className="d-article-layout"><aside className="d-article-aside"><nav><a href="#specifications">{d.specs}</a><a href="#questions">{d.questions}</a><a href="#related">{d.related}</a></nav><Link href={locale==="es"?"/es/contacto":"/contact"}>{d.contact}{locale!=="es"?" (EN)":""} ↗</Link></aside><article className="d-article-body"><p className="d-article-answer">{p.intro}</p>{p.assessment&&<p><strong>{d.assessment}</strong></p>}
  {p.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}
  <section id="specifications"><h2>{d.specs}</h2><SourcingTable rows={p.rows} label={d.specs}/><p>{d.evidence}</p><p><Link href="/products">{d.specs} (EN)</Link> · <Link href="/factory">DIYASI · Yiwu (EN)</Link></p></section>
  <section id="questions"><h2>{d.questions}</h2><div className="d-accordions">{p.faq.map(([q,a])=><details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <section id="related"><h2>{d.related}</h2>{p.related.map(slug=><p key={slug}><Link href={`/${locale}/manufacturers/${slug}`}>{d.pages[slug][0]}</Link></p>)}</section><p><Link className="d-button" href={locale==="es"?"/es/contacto":"/contact"}>{d.contact}{locale!=="es"?" (EN)":""} ↗</Link></p>
  </article></div>
 </main>;
}
