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

export default function ResourcesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Resources</p>
        <h1 className="section-title mt-2 text-[#1d2521]">Private label underwear sourcing guides</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">
          Practical buying guides for DTC brands, retailers, Amazon private label sellers, boutique buyers, and
          wholesale teams comparing underwear factories, MOQ routes, fabric choices, packaging, and QC systems.
        </p>
      </section>

      <section className="catalog-grid page-section">
        {resourceArticles.map((article) => (
          <article key={article.slug} className="catalog-card">
            <div className="catalog-card-copy">
              <p className="text-xs uppercase tracking-normal text-[#0f5f55]">{article.keyword}</p>
              <h2 className="card-title-standard mt-2 text-[#1d2521]">{article.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{article.desc}</p>
              <div className="mt-5">
                <Link href={`/resources/${article.slug}`} className="btn btn-soft">
                  Read Guide
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
