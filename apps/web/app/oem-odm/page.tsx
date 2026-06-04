import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions, privateLabelOptions, sampleAndLeadTimes } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Private Label Underwear Development",
  description:
    "Private label underwear development from fabric selection and reference sample review to fit sampling, packaging mockup, bulk production, QC, and delivery.",
  path: "/oem-odm"
});

const workflow = [
  {
    title: "Product Planning",
    items: [
      "Category and target market review",
      "Reference sample or moodboard review",
      "Target retail price and quality benchmark",
      "Quantity, size range, and launch timing"
    ]
  },
  {
    title: "Material Development",
    items: [
      "Cotton, modal, bamboo, recycled nylon, seamless yarn, and spandex blends",
      "Hand feel, stretch, recovery, breathability, and transparency review",
      "Color direction and trim coordination",
      "Certification and buyer document requirements"
    ]
  },
  {
    title: "Sampling & Fit",
    items: [
      sampleAndLeadTimes.stockFabricSample,
      sampleAndLeadTimes.customColorSample,
      sampleAndLeadTimes.newPatternSample,
      "Fit review, size grading, and correction round",
      "Pre-production sample before bulk approval"
    ]
  },
  {
    title: "Private Label Packaging",
    items: [
      "Custom waistband and care label",
      "Heat transfer logo placement",
      "Hangtag and polybag mockup",
      "Gift box, barcode / SKU sticker, carton mark",
      "Packing rule and retail-ready presentation"
    ]
  },
  {
    title: "Production & QC",
    items: [
      "Line scheduling and material preparation",
      "Incoming fabric inspection",
      "Inline production inspection",
      "Final inspection and packaging review",
      sampleAndLeadTimes.bulkLeadTime
    ]
  }
];

export default function OemOdmPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Private Label", path: "/oem-odm" }
  ]);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private Label Underwear Development",
    description:
      "Private label underwear development from fabric selection and reference sample review to fit sampling, packaging mockup, bulk production, QC, and delivery.",
    provider: {
      "@type": "Organization",
      name: "YiWu DiYaSi Dress Co., Ltd."
    },
    serviceType: "Private label underwear manufacturing",
    areaServed: "Worldwide",
    url: absoluteUrl("/oem-odm")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="home-cta-band page-hero rounded-[34px] shadow-[0_32px_90px_rgba(121,72,47,0.18)] md:px-10 lg:px-12">
        <p className="kicker page-reference-subtitle text-[#ffd7ba]">Private Label Services</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold text-[#fff7f0]">
          Private label underwear development from fabric to final delivery
        </h1>
        <p className="page-reference-body page-copy-wide mt-3 text-[#fff0e5]">
          We help brands move from product idea, reference sample, fabric selection, fit approval, custom label, and
          packaging mockup into bulk production and global delivery.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn border border-[#ffe2cf] bg-[#fff7f1] text-[#0f5f55] hover:bg-[#ffe9db]">
            Book Development Call
          </Link>
          <Link href="/packaging" className="btn border border-[#ffe2cf] text-[#fff7f1] hover:bg-[#fff7f1] hover:text-[#0f5f55]">
            View Packaging Options
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">Execution Flow</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">A practical development route with fewer handoffs</h2>
        </div>
        <div className="mt-8 space-y-8">
          {workflow.map((block, index) => (
            <article key={block.title} className="process-row">
              <div className="process-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="process-copy">
                <h2 className="page-reference-subtitle text-[#1d2521]">{block.title}</h2>
                <ul className="page-reference-body mt-4 grid gap-3 text-[#5f6b66] md:grid-cols-2">
                  {block.items.map((item) => (
                    <li key={item} className="process-bullet">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="kicker page-reference-subtitle">Fabric Options</p>
            <div className="chip-list mt-4">
              {fabricOptions.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="kicker page-reference-subtitle">Packaging Options</p>
            <div className="chip-list mt-4">
              {privateLabelOptions.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
