import type { Metadata } from "next";
import Link from "next/link";

import HeroCarousel from "@/components/HeroCarousel";
import { getCatalogProducts } from "@/lib/catalog-source";
import {
  resolveDisplayProductId,
  resolveDisplayTitle,
  resolvePrimaryImage,
  topFamily,
  type DisplayProduct
} from "@/lib/product-display";
import { buildMetadata } from "@/lib/seo";
import {
  companyInfo,
  launchCollections,
  moqTiers,
  privateLabelOptions,
  qualitySteps,
  sampleAndLeadTimes,
  trustStats
} from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Private Label Intimates Manufacturer",
  description:
    "YiWu DiYaSi helps DTC, retail, and wholesale underwear brands develop private label intimates from fabric selection and fit sampling to packaging and bulk delivery.",
  path: "/"
});

const dtcSolutions = [
  {
    title: "For New Brands",
    desc: "Start with practical MOQ planning, stock fabric samples, label options, and packaging choices before committing to a full OEM route."
  },
  {
    title: "For Growing Brands",
    desc: "Move from early sales to stable replenishment with clearer size grading, repeatable fit blocks, and controlled production windows."
  },
  {
    title: "For Retailers",
    desc: "Build category programs around reliable quality, barcode-ready packaging, carton marks, and delivery dates aligned with retail cycles."
  },
  {
    title: "For Wholesale Buyers",
    desc: "Source launch-ready underwear, bras, shapewear, homewear, and activewear with factory-direct communication and practical quantity planning."
  }
];

const developmentSteps = [
  "Project brief",
  "Fabric direction",
  "Sample development",
  "Fit approval",
  "Packaging mockup",
  "Bulk production",
  "Final QC",
  "Global delivery"
];

const faqs = [
  {
    q: "What MOQ should a new underwear brand expect?",
    a: "Ready stock can start lower when available. Private label and full OEM programs depend on label, fabric, color, size range, and packaging complexity."
  },
  {
    q: "How long does sample development take?",
    a: `${sampleAndLeadTimes.stockFabricSample}; custom color and new pattern projects need more time before approval.`
  },
  {
    q: "Can you support custom packaging?",
    a: "Yes. We support custom waistband, care label, heat transfer logo, hangtag, polybag, gift box, barcode sticker, and carton marks."
  },
  {
    q: "Do you provide certifications?",
    a: "BSCI, SEDEX, ISO 9001, and OEKO-TEX related documents can be prepared for buyer review upon request. Certificate numbers and validity should be checked against the latest documents."
  }
];

function collectionImage(index: number): string {
  const images = [
    "/media/home/banner-1.jpg",
    "/media/home/banner-2.png",
    "/media/home/banner-2-2-3.jpg",
    "/media/home/banner-3.jpg",
    "/media/home/factory-1.jpg",
    "/media/home/factory-2.jpg",
    "/media/home/factory-3.jpg",
    "/media/home/factory-4.jpg"
  ];
  return images[index % images.length];
}

async function getFeaturedProducts(): Promise<DisplayProduct[]> {
  const products = (await getCatalogProducts()) as DisplayProduct[];
  const families = ["Women's Panties", "Bras", "Men's Underwear", "Activewear"];
  return families
    .flatMap((family) => products.filter((product) => topFamily(product.category) === family).slice(0, 2))
    .slice(0, 8);
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: "https://www.yiwudiyasidress.com",
    description:
      "Private label intimates manufacturer for DTC, retail, and wholesale brands, covering fabric selection, sampling, custom packaging, bulk production, and delivery.",
    foundingDate: companyInfo.establishedYear,
    email: companyInfo.emailPrimary,
    telephone: companyInfo.phone,
    areaServed: "Worldwide"
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroCarousel />

      <section className="border-y border-[#ead7c8] bg-[#fffaf5] py-5">
        <div className="container mx-auto grid gap-3 px-4 md:grid-cols-3 md:px-6 xl:grid-cols-6">
          {trustStats.map((stat) => (
            <article key={stat.label} className="rounded border border-[#ead7c8] bg-white px-4 py-3">
              <p className="text-lg font-bold text-[#5a2f1e]">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9d7d6f]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="kicker">DTC Brand Solutions</p>
            <h2 className="section-title mt-2 text-[#6a3524]">Manufacturing support for each stage of brand growth</h2>
            <p className="page-reference-body mt-4 text-[#7d4f3e]">
              The site is built around factory execution, not generic product listings. Buyers can evaluate category fit,
              MOQ route, packaging needs, quality control, and launch timing before starting a project.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dtcSolutions.map((item) => (
              <article key={item.title} className="rounded-lg border border-[#ead7c8] bg-[#fffaf5] p-5">
                <h3 className="text-lg font-bold text-[#5a2f1e]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#7d4f3e]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7ef] py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="kicker">Launch-Ready Collections</p>
              <h2 className="section-title mt-2 text-[#6a3524]">Core product lines for private label underwear programs</h2>
            </div>
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {launchCollections.map((item, index) => (
              <Link key={item.slug} href={item.href} className="group overflow-hidden rounded-lg border border-[#ead7c8] bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-[#f4e4d6]">
                  <img
                    src={collectionImage(index)}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#5a2f1e]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#7d4f3e]">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="kicker">Private Label Customization</p>
              <h2 className="section-title mt-2 text-[#6a3524]">Labels, packaging, and retail-ready details for DTC launches</h2>
              <p className="page-reference-body mt-4 text-[#7d4f3e]">
                Packaging is not an afterthought for underwear brands. We align product construction, logo placement,
                care labels, packaging format, barcode stickers, and carton marks before bulk production starts.
              </p>
              <div className="mt-6">
                <Link href="/packaging" className="btn btn-soft">
                  Explore Packaging Options
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {privateLabelOptions.map((item) => (
                <article key={item} className="rounded border border-[#ead7c8] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#5a2f1e]">
                  {item}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7eee6] py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <p className="kicker">Development Process</p>
          <h2 className="section-title mt-2 max-w-3xl text-[#6a3524]">From product brief to approved shipment</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {developmentSteps.map((step, index) => (
              <article key={step} className="rounded-lg border border-[#dfc8b8] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b06a46]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-base font-bold text-[#5a2f1e]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="aspect-video overflow-hidden rounded-lg bg-black shadow-xl">
              <video src="/media/home/factory-video.mp4" controls poster="/media/home/factory-1.jpg" className="h-full w-full" />
            </div>
            <div>
              <p className="kicker">Real Factory & QC</p>
              <h2 className="section-title mt-2 text-[#6a3524]">Factory photos, production checks, and buyer review documents</h2>
              <p className="page-reference-body mt-4 text-[#7d4f3e]">
                About and factory pages now prioritize existing factory media and buyer-verifiable information. Certificate
                documents are described as available for buyer review, because certificate numbers and validity must be
                checked against the latest real documents.
              </p>
              <div className="mt-5 grid gap-3">
                {qualitySteps.map((item) => (
                  <article key={item.title} className="rounded border border-[#ead7c8] bg-[#fffaf5] p-4">
                    <h3 className="font-bold text-[#5a2f1e]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#7d4f3e]">{item.desc}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/factory" className="btn btn-primary">
                  View Factory & Quality
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 ? (
        <section className="bg-[#fff7ef] py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">Core Product Examples</p>
                <h2 className="section-title mt-2 text-[#6a3524]">Clean product titles for professional buyer review</h2>
              </div>
              <Link href="/products" className="btn btn-soft">
                Browse Catalogue
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {featuredProducts.map((product) => {
                const image = resolvePrimaryImage(product);
                return (
                  <Link key={product.product_id} href={`/products/${encodeURIComponent(product.product_id)}`} className="group rounded-lg border border-[#ead7c8] bg-white">
                    <div className="aspect-[4/5] overflow-hidden rounded-t-lg bg-[#f4e4d6]">
                      {image ? (
                        <img src={image} alt={resolveDisplayTitle(product)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold leading-5 text-[#5a2f1e]">{resolveDisplayTitle(product)}</h3>
                      <p className="mt-2 text-xs text-[#9d7d6f]">{resolveDisplayProductId(product)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="kicker">FAQ</p>
              <h2 className="section-title mt-2 text-[#6a3524]">Questions buyers usually ask before sampling</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-lg border border-[#ead7c8] bg-[#fffaf5] p-5">
                  <h3 className="font-bold text-[#5a2f1e]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#7d4f3e]">{item.a}</p>
                </article>
              ))}
              <article className="rounded-lg border border-[#ead7c8] bg-white p-5">
                <h3 className="font-bold text-[#5a2f1e]">MOQ planning reference</h3>
                <div className="mt-3 grid gap-2">
                  {moqTiers.map((item) => (
                    <p key={item.label} className="text-sm leading-6 text-[#7d4f3e]">
                      <strong className="text-[#5a2f1e]">{item.label}:</strong> {item.value}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#5a2f1e] py-14 text-white md:py-20">
        <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-3xl">
            <p className="kicker text-[#f3d7a1]">Final CTA</p>
            <h2 className="heading-font mt-2 text-4xl font-semibold">Start your private label underwear project</h2>
            <p className="mt-4 text-sm leading-7 text-white/82">
              Send category, target market, estimated quantity, private label needs, packaging plan, and launch date.
            </p>
          </div>
          <Link href="/contact" className="btn bg-white text-[#5a2f1e] hover:bg-[#f4d4bd]">
            Contact Factory Team
          </Link>
        </div>
      </section>
    </main>
  );
}
