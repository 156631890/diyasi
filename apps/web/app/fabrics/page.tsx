import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Fabrics",
  description:
    "Underwear fabric guide covering cotton, modal, bamboo, recycled nylon, seamless yarn, spandex blends, and leakproof lining options for private label brands.",
  path: "/fabrics"
});

const fabricDetails = [
  {
    title: "Cotton",
    desc: "A practical everyday underwear fabric for breathable basics, multipacks, and retail programs where comfort and familiar hand feel matter."
  },
  {
    title: "Modal",
    desc: "Soft, smooth, and suitable for premium basics, men's boxer briefs, lounge underwear, and DTC collections positioned around comfort."
  },
  {
    title: "Bamboo",
    desc: "Often selected for soft touch and responsible material positioning. Best reviewed together with target price and certification needs."
  },
  {
    title: "Recycled Nylon",
    desc: "Useful for seamless underwear, activewear, and brands that want a sustainability-led material story with stretch performance."
  },
  {
    title: "Seamless Yarn",
    desc: "Used for no-show underwear, bralettes, sports bras, and activewear where stretch recovery and clean edges are important."
  },
  {
    title: "Leakproof Lining",
    desc: "Used in period underwear and absorbent gusset programs. Absorbency, layer structure, and testing expectations must be confirmed early."
  }
];

export default function FabricsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Fabrics", path: "/fabrics" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Fabrics</p>
        <h1 className="section-title mt-2 text-[#1d2521]">Underwear fabric options for private label collections</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">
          Fabric selection affects hand feel, fit, MOQ, sample timing, wash performance, and final price. We help buyers
          choose the right material route before sample development starts.
        </p>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fabricDetails.map((item) => (
            <article key={item.title} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-5">
              <h2 className="card-title-standard text-[#1d2521]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">Material Review</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">What to confirm before sampling</h2>
          <div className="chip-list mt-5">
            {fabricOptions.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              Discuss Fabric Direction
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
