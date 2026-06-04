import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { companyInfo, trustStats } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "About YiWu DiYaSi",
  description:
    "Learn about YiWu DiYaSi Dress Co., Ltd., a Yiwu underwear manufacturer supporting private label, OEM, ODM, retail, wholesale, and DTC intimates programs.",
  path: "/about"
});

const timeline = [
  {
    year: companyInfo.establishedYear,
    milestone: "Factory established in Yiwu with underwear manufacturing as the core production direction."
  },
  {
    year: "2011",
    milestone: "OEM / ODM export programs expanded for international buyers and private label projects."
  },
  {
    year: "2018",
    milestone: "Quality control, production coordination, and compliance documentation were strengthened for buyer review."
  },
  {
    year: "2026",
    milestone: "Digital sourcing, multilingual inquiry, and private label project workflows upgraded for global buyers."
  }
];

const promises = [
  {
    title: "Stable Quality",
    text: "We focus on repeatable fit, controlled fabric selection, inline inspection, and final packing review for long-term programs."
  },
  {
    title: "Clear Communication",
    text: "Buyers receive practical answers on MOQ, sample timing, packaging route, production lead time, and next steps."
  },
  {
    title: "Design Protection",
    text: "Private label projects are handled with controlled communication around artwork, label files, packaging details, and development references."
  }
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ]);
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${companyInfo.name}`,
    description:
      "Company story, manufacturing scope, product categories, timeline, and buyer promise for private label underwear programs.",
    url: absoluteUrl("/about")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />

      <section className="hero-panel page-hero overflow-hidden md:p-10 lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="page-copy-wide">
            <p className="kicker page-reference-subtitle">About {companyInfo.shortName}</p>
            <h1 className="section-title mt-3 text-[#1d2521]">An underwear factory built for private label growth</h1>
            <p className="page-reference-body mt-4 text-[#5f6b66]">
              {companyInfo.name} is located in Yiwu, Zhejiang, China. We support underwear brands, retailers,
              wholesalers, and sourcing teams with product development, sampling, custom labels, packaging coordination,
              bulk production, and global delivery.
            </p>
            <p className="page-reference-body mt-4 text-[#5f6b66]">
              The factory focuses on women's underwear, men's underwear, bras and bralettes, seamless underwear,
              shapewear, activewear, period underwear, loungewear, and related private label programs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/factory" className="btn btn-soft">
                View Factory & Quality
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <img
              src="/media/home/factory-1.jpg"
              alt="YiWu DiYaSi factory exterior and production site"
              loading="lazy"
              decoding="async"
              className="rounded-lg object-cover shadow-xl"
            />
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/media/home/factory-2.jpg"
                alt="Factory production area"
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-lg object-cover"
              />
              <img
                src="/media/home/factory-3.jpg"
                alt="Factory inspection and production details"
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {trustStats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-4">
              <p className="text-lg font-bold text-[#1d2521]">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-normal text-[#7d8a85]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principles">
        {promises.map((item) => (
          <article key={item.title} className="editorial-column">
            <h2 className="page-reference-subtitle text-[#1d2521]">{item.title}</h2>
            <p className="page-reference-body mt-4 text-[#5f6b66]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="page-section editorial-strip">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">Our Timeline</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">A practical manufacturing story</h2>
          <p className="page-reference-body mt-3 max-w-3xl text-[#5f6b66]">
            The timeline uses conservative public-facing milestones. Certificate numbers, audit dates, and document
            validity should be shown only after the latest real files are confirmed.
          </p>
        </div>
      </section>

      <section className="about-timeline">
        {timeline.map((item) => (
          <article key={item.year} className="timeline-row">
            <div className="timeline-year">{item.year}</div>
            <p className="timeline-copy page-reference-body">{item.milestone}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
