import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions, privateLabelOptions, sampleAndLeadTimes } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Private Label Underwear OEM/ODM Development Services",
  description:
    "End-to-end private label underwear development: custom design, fabric sourcing, sampling, branding, and production. Low MOQ from 500 pcs. Free tech pack consultation.",
  path: "/oem-odm"
});

const workflow = [
  {
    icon: "/media/generated/icons/planning.png",
    title: "Product Planning",
    items: [
      "Category and target market review",
      "Reference sample or moodboard review",
      "Target retail price and quality benchmark",
      "Quantity, size range, and launch timing"
    ]
  },
  {
    icon: "/media/generated/icons/fabric-swatch.png",
    title: "Material Development",
    items: [
      "Cotton, modal, bamboo, recycled nylon, seamless yarn, and spandex blends",
      "Hand feel, stretch, recovery, breathability, and transparency review",
      "Color direction and trim coordination",
      "Certification and buyer document requirements"
    ]
  },
  {
    icon: "/media/generated/icons/sample-hanger.png",
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
    icon: "/media/generated/icons/packaging-box.png",
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
    icon: "/media/generated/icons/qc-check.png",
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

const projectInputs = [
  "Target category and reference style",
  "Fabric direction and hand feel expectation",
  "Logo, label, waistband, or artwork files",
  "Size range, color plan, and launch quantity",
  "Packaging route and retail channel needs",
  "Sampling deadline and target delivery window"
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

      <section className="visual-hero visual-hero-dark page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle text-[#d7eee8]">Private Label Services</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold text-white">
            Private label underwear development from fabric to final delivery
          </h1>
          <p className="page-reference-body mt-4 text-white/82">
            We help brands move from product idea, reference sample, fabric selection, fit approval, custom label, and
            packaging mockup into bulk production and global delivery.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn bg-white text-[#0f5f55] hover:bg-[#e7f2ef]">
              Book Development Call
            </Link>
            <Link href="/packaging" className="btn border border-white/70 text-white hover:bg-white hover:text-[#0f5f55]">
              View Packaging Options
            </Link>
          </div>
        </div>
        <div className="visual-hero-media">
          <img
            src="/media/generated/pages/private-label-development-board.jpg"
            alt="Private label underwear development board with fabric swatches, trims, packaging, and production notes"
            width={1600}
            height={800}
            decoding="async"
            fetchPriority="high"
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">Execution Flow</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">A practical development route with fewer handoffs</h2>
        </div>
        <div className="service-step-grid mt-8">
          {workflow.map((block, index) => (
            <article key={block.title} className="service-step-card">
              <div className="service-step-head">
                <img src={block.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="service-step-icon" />
                <span className="service-step-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="card-title-standard mt-5 text-[#1d2521]">{block.title}</h2>
              <ul className="page-reference-body mt-4 grid gap-3 text-[#5f6b66]">
                {block.items.map((item) => (
                  <li key={item} className="process-bullet">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section split-proof-band">
        <div>
          <p className="kicker page-reference-subtitle">Project Inputs</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">What buyers should prepare before sampling</h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            A clear first brief helps us recommend the right MOQ route, sample timing, fabric direction, and packaging
            plan before cost is quoted.
          </p>
        </div>
        <div className="project-input-grid">
          {projectInputs.map((item) => (
            <article key={item} className="project-input-item">
              <img src="/media/generated/icons/resource-guide.png" alt="" width={44} height={44} loading="lazy" decoding="async" />
              <p>{item}</p>
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
