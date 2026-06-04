import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { resourceArticles } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Manufacturing Resources",
  description:
    "Buyer resources for private label underwear brands covering MOQ, fabrics, packaging, sample development, quality control, and OEM vs ODM manufacturing.",
  path: "/resources"
});

function resourceCover(slug: string): string {
  return `/media/generated/resources/${slug}.png`;
}

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
          <p className="kicker page-reference-subtitle">Resources</p>
          <h1 className="section-title mt-2 text-[#1d2521]">Private label underwear sourcing guides</h1>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Practical buying guides for DTC brands, retailers, Amazon private label sellers, boutique buyers, and
            wholesale teams comparing underwear factories, MOQ routes, fabric choices, packaging, and QC systems.
          </p>
          <div className="resource-hero-pills mt-7">
            <span>MOQ</span>
            <span>Fabrics</span>
            <span>Packaging</span>
            <span>QC</span>
          </div>
        </div>
        <div className="visual-hero-media">
          <img
            src="/media/generated/pages/buyer-resource-desk.jpg"
            alt="Underwear buyer sourcing desk with fabric swatches, packaging sample, notebook, and QC documents"
            width={1600}
            height={1000}
            decoding="async"
            fetchPriority="high"
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="resource-card-grid page-section">
        {resourceArticles.map((article) => (
          <article key={article.slug} className="resource-card">
            <Link href={`/resources/${article.slug}`} className="resource-card-media" aria-label={article.title}>
              <img
                src={resourceCover(article.slug)}
                alt=""
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
