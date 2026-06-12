import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Fabrics Guide — Cotton, Modal, Bamboo, Recycled Nylon",
  description:
    "Explore our underwear fabric options: organic cotton, modal, bamboo viscose, recycled nylon, seamless yarn, and leakproof lining. Sustainable sourcing for intimate apparel brands.",
  path: "/fabrics"
});

const fabricDetails = [
  {
    icon: "/media/generated/icons/cotton.png",
    title: "Cotton",
    desc: "A practical everyday underwear fabric for breathable basics, multipacks, and retail programs where comfort and familiar hand feel matter.",
    bestFor: "Everyday briefs, multipacks, basics",
    check: "Shrinkage, weight, softness, colorfastness"
  },
  {
    icon: "/media/generated/icons/modal.png",
    title: "Modal",
    desc: "Soft, smooth, and suitable for premium basics, men's boxer briefs, lounge underwear, and DTC collections positioned around comfort.",
    bestFor: "Premium basics, boxer briefs, loungewear",
    check: "Hand feel, pilling, stretch recovery"
  },
  {
    icon: "/media/generated/icons/bamboo.png",
    title: "Bamboo",
    desc: "Often selected for soft touch and responsible material positioning. Best reviewed together with target price and certification needs.",
    bestFor: "Soft-touch underwear and comfort programs",
    check: "Supplier file, positioning, target price"
  },
  {
    icon: "/media/generated/icons/recycled-nylon.png",
    title: "Recycled Nylon",
    desc: "Useful for seamless underwear, activewear, and brands that want a sustainability-led material story with stretch performance.",
    bestFor: "Seamless underwear and activewear",
    check: "Stretch, recovery, certification route"
  },
  {
    icon: "/media/generated/icons/seamless-yarn.png",
    title: "Seamless Yarn",
    desc: "Used for no-show underwear, bralettes, sports bras, and activewear where stretch recovery and clean edges are important.",
    bestFor: "No-show panties, bralettes, sports bras",
    check: "Edge finish, opacity, recovery"
  },
  {
    icon: "/media/generated/icons/leakproof-lining.png",
    title: "Leakproof Lining",
    desc: "Used in period underwear and absorbent gusset programs. Absorbency, layer structure, and testing expectations must be confirmed early.",
    bestFor: "Period underwear and absorbent gussets",
    check: "Layer structure, absorbency, test method"
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

      <section className="visual-hero page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle">Fabrics</p>
          <h1 className="section-title mt-2 text-[#1d2521]">Underwear fabric options for private label collections</h1>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Fabric selection affects hand feel, fit, MOQ, sample timing, wash performance, and final price. We help buyers
            choose the right material route before sample development starts.
          </p>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              Discuss Fabric Direction
            </Link>
          </div>
        </div>
        <div className="visual-hero-media">
          <img
            src="/media/generated/pages/fabric-swatch-lab.jpg"
            alt="Underwear fabric swatches including cotton, modal, bamboo, nylon, seamless yarn, and lace"
            width={1600}
            height={1000}
            decoding="async"
            fetchPriority="high"
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fabricDetails.map((item) => (
            <article key={item.title} className="fabric-guide-card">
              <img src={item.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="service-step-icon" />
              <h2 className="card-title-standard mt-5 text-[#1d2521]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
              <div className="fabric-guide-facts">
                <p>
                  <strong>Best for:</strong> {item.bestFor}
                </p>
                <p>
                  <strong>Buyer check:</strong> {item.check}
                </p>
              </div>
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
        </div>
      </section>
    </main>
  );
}
