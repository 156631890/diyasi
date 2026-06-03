import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { privateLabelOptions } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Custom Underwear Packaging",
  description:
    "Private label underwear packaging options including waistband, care label, heat transfer logo, hangtag, polybag, gift box, barcode sticker, and carton mark.",
  path: "/packaging"
});

const packagingRoutes = [
  {
    title: "Starter Private Label",
    desc: "Use proven product bodies with custom care labels, size labels, simple polybags, and barcode stickers."
  },
  {
    title: "Retail-Ready Packaging",
    desc: "Add hangtags, branded polybags, outer carton marks, SKU labels, and packing rules for retail or marketplace workflows."
  },
  {
    title: "Premium DTC Packaging",
    desc: "Develop coordinated waistband, heat transfer logo, hangtag, gift box, insert card, and launch-ready packaging presentation."
  }
];

export default function PackagingPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Custom Packaging", path: "/packaging" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Private Label Packaging</p>
        <h1 className="section-title mt-2 text-[#6a3524]">Custom labels and packaging for underwear brands</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#7d4f3e]">
          Packaging decisions should be made before bulk production, not after. We help brands align label position,
          care label content, hangtag, polybag, gift box, barcode sticker, and carton mark early in the development route.
        </p>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-3">
          {packagingRoutes.map((item) => (
            <article key={item.title} className="rounded-lg border border-[#ead7c8] bg-[#fffaf5] p-5">
              <h2 className="card-title-standard text-[#6a3524]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">Packaging Options</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">Options buyers can combine by project</h2>
          <div className="chip-list mt-5">
            {privateLabelOptions.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              Start Packaging Discussion
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
