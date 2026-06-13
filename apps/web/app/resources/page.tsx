import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { resourceArticles } from "@/lib/resource-articles";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Manufacturing Resources & Sourcing Guides",
  description:
    "Expert guides on underwear manufacturing: sourcing, fabric selection, sizing, QC, MOQ planning, private label packaging, and cost optimization for intimate apparel brands.",
  path: "/resources"
});

export default function ResourcesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="visual-hero page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle">News & Buyer Guides</p>
          <h1 className="section-title mt-2 text-[#1d2521]">Startup sourcing news for underwear and yoga wear buyers</h1>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Practical News articles for European and North American startup brands comparing underwear factories,
            quotation details, fabric choices, unit cost, sizing, private label packaging, and QC decisions.
          </p>
          <div className="resource-hero-pills mt-7">
            <span>Quotes</span>
            <span>Unit Cost</span>
            <span>Fabric</span>
            <span>QC</span>
          </div>
        </div>
        <div className="visual-hero-media">
          <Image
            src="/media/generated/pages/buyer-resource-desk.jpg"
            alt="Underwear buyer sourcing desk with fabric swatches, packaging sample, notebook, and QC documents"
            width={1600}
            height={1000}
            priority
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="resource-card-grid page-section">
        {resourceArticles.map((article) => (
          <article key={article.slug} className="resource-card">
            <Link href={`/resources/${article.slug}`} className="resource-card-media" aria-label={article.title}>
              <img
                src={article.coverImage}
                alt={article.title}
                width={1200}
                height={720}
                loading="lazy"
                decoding="async"
                className="resource-card-image"
              />
            </Link>
            <div className="resource-card-copy">
              <div className="resource-card-kicker">
                <img src="/media/generated/icons/resource-guide.png" alt="" width={34} height={34} loading="lazy" decoding="async" />
                <p>{article.keyword}</p>
              </div>
              <p className="resource-card-date">{article.publishedAt}</p>
              <h2 className="card-title-standard mt-3 text-[#1d2521]">{article.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{article.desc}</p>
              <Link href={`/resources/${article.slug}`} className="resource-card-link">
                Read Guide
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
