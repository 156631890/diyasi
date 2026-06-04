import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { moqTiers, privateLabelOptions, qualitySteps, resourceArticles, sampleAndLeadTimes } from "@/lib/site-info";

type Props = { params: { slug: string } };

function getArticle(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return resourceArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) {
    return buildMetadata({
      title: "Resource not found",
      description: "This resource guide is not available.",
      path: `/resources/${params.slug}`
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.desc,
    path: `/resources/${article.slug}`
  });
}

function guideSections(slug: string) {
  if (slug.includes("moq")) {
    return moqTiers.map((tier) => ({
      title: tier.label,
      body: tier.value
    }));
  }
  if (slug.includes("packaging")) {
    return privateLabelOptions.map((option) => ({
      title: option,
      body: "Confirm artwork, placement, size, material, barcode needs, and packing method before bulk production starts."
    }));
  }
  if (slug.includes("quality")) {
    return qualitySteps.map((step) => ({ title: step.title, body: step.desc }));
  }
  if (slug.includes("sample")) {
    return [
      { title: "Stock Fabric Sample", body: sampleAndLeadTimes.stockFabricSample },
      { title: "Custom Color Sample", body: sampleAndLeadTimes.customColorSample },
      { title: "New Pattern Sample", body: sampleAndLeadTimes.newPatternSample },
      { title: "Bulk Lead Time", body: sampleAndLeadTimes.bulkLeadTime }
    ];
  }
  if (slug.includes("fabric")) {
    return [
      { title: "Comfort Target", body: "Clarify hand feel, stretch, coverage, and breathability before fabric selection." },
      { title: "Price Positioning", body: "Fabric route should match the brand's target retail price and margin structure." },
      { title: "Sampling Route", body: "Stock fabric samples move fastest; custom color and new construction require more planning." }
    ];
  }
  if (slug.includes("oem-vs-odm")) {
    return [
      { title: "OEM Route", body: "Best when the buyer provides clear design, fit, fabric, and packaging requirements." },
      { title: "ODM Route", body: "Best when the buyer wants to start from proven factory styles and customize brand details." },
      { title: "Hybrid Route", body: "Often practical for DTC launches: proven base product, custom label, selected fabric, and custom packaging." }
    ];
  }
  return [
    { title: "Define Product Direction", body: "Start with category, target customer, fabric expectation, retail positioning, and launch timing." },
    { title: "Plan Sampling", body: "Confirm what needs to be tested: fit, fabric feel, logo position, packaging, and size range." },
    { title: "Prepare Bulk Production", body: "Move to production only after MOQ, color, size ratio, packaging, QC standard, and delivery schedule are aligned." }
  ];
}

export default function ResourceDetailPage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const sections = guideSections(article.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: article.title, path: `/resources/${article.slug}` }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{article.keyword}</p>
        <h1 className="section-title mt-2 text-[#1d2521]">{article.title}</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">{article.desc}</p>
      </section>

      <article className="page-section">
        <div className="grid gap-5">
          {sections.map((section, index) => (
            <section key={section.title} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-6">
              <p className="text-xs font-bold uppercase tracking-normal text-[#0f5f55]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="card-title-standard mt-3 text-[#1d2521]">{section.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      <section className="factory-cta-band page-section">
        <div>
          <p className="kicker page-reference-subtitle text-[#d7eee8]">Buyer Guide</p>
          <h2 className="card-title-standard mt-3 text-white">Apply this guide to your project brief</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-white/82">
            Send product category, target market, estimated quantity, fabric direction, packaging needs, and launch timing.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Start a Project
        </Link>
      </section>
    </main>
  );
}
