import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { companyInfo, launchCollections, qualitySteps } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Factory Tour & Quality Control — BSCI Certified Underwear Production",
  description:
    "Tour our 20,000 sq m underwear factory in YiWu, China. ISO 9001, BSCI, SEDEX, OEKO-TEX certified. 15+ production lines, 3-stage QC system, 600,000+ pcs monthly capacity.",
  path: "/factory"
});

const overview = [
  { label: "Company", value: companyInfo.name },
  { label: "Location", value: companyInfo.address },
  { label: "Factory Area", value: companyInfo.factoryArea },
  { label: "Team", value: companyInfo.employees },
  { label: "Monthly Capacity", value: companyInfo.monthlyCapacity },
  { label: "Export Markets", value: companyInfo.exportMarkets }
];

const capabilities = [
  "Seamless underwear",
  "Cotton underwear",
  "Bras and bralettes",
  "Shapewear",
  "Men's underwear",
  "Activewear",
  "Period underwear",
  "Loungewear"
];

const certifications = [
  {
    code: "BSCI",
    title: "Social Compliance",
    desc: "Buyer review documents can be prepared upon request. Certificate number and validity should be checked against the latest file."
  },
  {
    code: "SEDEX",
    title: "Supply Chain Transparency",
    desc: "Factory process and documentation can support sourcing and compliance review for international buyers."
  },
  {
    code: "ISO 9001",
    title: "Quality System",
    desc: "Quality management is described around repeatable checks, documented standards, and production review points."
  },
  {
    code: "OEKO-TEX",
    title: "Material Review",
    desc: "Material certification details should be confirmed according to the selected fabric, supplier file, and buyer requirement."
  }
];

const factoryPhotos = [
  { src: "/media/home/factory-1.jpg", title: "Factory Exterior" },
  { src: "/media/home/factory-2.jpg", title: "Design and Production Area" },
  { src: "/media/home/factory-3.jpg", title: "Cutting and Sewing Detail" },
  { src: "/media/home/factory-4.jpg", title: "Seamless Production" },
  { src: "/media/home/factory-5.jpg", title: "QC and Packing Area" }
];

const qualityIcons = [
  "/media/generated/icons/fabric-swatch.png",
  "/media/generated/icons/factory-line.png",
  "/media/generated/icons/qc-check.png"
];

export default function FactoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Factory & Quality", path: "/factory" }
  ]);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Factory & Quality",
    description:
      "Factory overview, production capability, quality control, certifications, and factory photos for buyer review.",
    url: absoluteUrl("/factory")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <section className="visual-hero visual-hero-dark page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle text-[#d7eee8]">Factory & Quality</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold text-white">Factory capability with a practical QC system</h1>
          <p className="page-reference-body mt-4 text-white/82">
            {companyInfo.name} supports private label underwear, bras, shapewear, activewear, and loungewear programs
            with sampling, bulk production, quality control, packaging coordination, and export delivery.
          </p>
          <div className="factory-hero-stats mt-7">
            <span>{companyInfo.factoryArea}</span>
            <span>{companyInfo.monthlyCapacity}</span>
            <span>{companyInfo.employees}</span>
          </div>
        </div>
        <div className="visual-hero-media">
          <img
            src="/media/generated/wide/factory-wide-production-line.png"
            alt="Underwear factory production line with textile machinery"
            width={1600}
            height={720}
            decoding="async"
            fetchPriority="high"
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section company-overview-grid">
        <article className="company-overview-card">
          <div className="page-section-head">
            <p className="kicker page-reference-subtitle">Factory Overview</p>
            <h2 className="card-title-standard text-[#1d2521]">Core information for buyer review</h2>
          </div>
          <div className="company-overview-list">
            {overview.map((item) => (
              <div key={item.label} className="company-overview-row">
                <p className="company-overview-label">{item.label}</p>
                <p className="company-overview-value">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">Production Capability</p>
            <div className="chip-list mt-4">
              {capabilities.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">Contact</p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-[#5f6b66]">
              <p>{companyInfo.emailPrimary}</p>
              <p>{companyInfo.phone}</p>
              <p>{companyInfo.address}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="factory-story-shell page-section">
        <div className="factory-video-panel">
          <div className="factory-video-cover">
            <video
              src="/media/home/factory-video.mp4"
              controls
              preload="none"
              playsInline
              poster="/media/home/factory-1.jpg"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="factory-story-copy">
          <p className="kicker page-reference-subtitle">Production System</p>
          <h2 className="card-title-standard mt-3 text-[#1d2521]">From sample approval to repeat production</h2>
          <p className="page-reference-body page-copy mt-4 text-[#5f6b66]">
            We align product brief, fabric direction, sample route, size range, packaging needs, QC standard, and delivery
            schedule before the order moves into bulk production.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn btn-primary">
              Request Factory Review
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">Quality Control System</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">Three inspection stages buyers can understand</h2>
        </div>
        <div className="factory-custom-grid mt-6">
          {qualitySteps.map((item, index) => (
            <article key={item.title} className="factory-custom-card">
              <img
                src={qualityIcons[index] || "/media/generated/icons/qc-check.png"}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="service-step-icon"
              />
              <h3 className="card-title-standard mt-4 text-[#1d2521]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">Certifications</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">Compliance documents available for buyer review</h2>
        </div>
        <div className="factory-cert-grid mt-6">
          {certifications.map((item) => (
            <article key={item.code} className="factory-cert-card">
              <div className="factory-cert-head">
                <img
                  src="/media/generated/icons/certificate-document.png"
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                />
                <div className="factory-cert-code">{item.code}</div>
              </div>
              <h3 className="card-title-standard mt-4 text-[#1d2521]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">Factory Photos</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">Real factory media currently available on the site</h2>
        </div>
        <div className="factory-detail-grid mt-6">
          {factoryPhotos.map((img) => (
            <article key={img.src} className="factory-detail-card">
              <img src={img.src} alt={img.title} loading="lazy" decoding="async" className="factory-detail-image" />
              <div className="factory-detail-caption">
                <p className="page-reference-body text-white">{img.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">Product Lines</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">Categories for recurring private label orders</h2>
        </div>
        <div className="factory-product-rows mt-6">
          {launchCollections.slice(0, 4).map((item, index) => (
            <Link key={item.slug} href={item.href} className="factory-product-tile">
              <img
                src={factoryPhotos[index % factoryPhotos.length].src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="factory-product-image"
              />
              <div className="factory-product-caption">
                <p className="card-title-standard text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="factory-cta-band page-section">
        <div>
          <p className="kicker page-reference-subtitle text-[#d7eee8]">Start an Inquiry</p>
          <h2 className="card-title-standard mt-3 text-white">Send your category, MOQ range, target market, and launch timing</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-white/82">
            We will respond with sample route, production assumptions, packaging checklist, and next-step information.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Contact Factory Team
        </Link>
      </section>
    </main>
  );
}
