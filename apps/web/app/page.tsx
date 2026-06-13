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
  title: "Private Label Underwear Manufacturer",
  description:
    "YiWu DiYaSi helps brands, retailers, and wholesale underwear buyers develop private label collections from fabric selection and fit sampling to packaging and bulk delivery.",
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
  {
    title: "Project Brief",
    desc: "Submit your category, reference styles, target quantities, and brand specifications to start the project planning.",
    icon: "/media/generated/icons/planning.png"
  },
  {
    title: "Fabric Direction",
    desc: "Select from our premium cotton, modal, bamboo, nylon, or seamless yarns with customized hand-feel and weight options.",
    icon: "/media/generated/icons/input-fabric.png"
  },
  {
    title: "Sample Development",
    desc: "We build patterns and sew initial physical samples using stock fabric or custom colors to check details and trim compatibility.",
    icon: "/media/generated/icons/sample-hanger.png"
  },
  {
    title: "Fit Approval",
    desc: "Conduct detailed fitting trials, coordinate correction rounds, perform size grading, and confirm pre-production approval.",
    icon: "/media/generated/icons/input-style.png"
  },
  {
    title: "Packaging Mockup",
    desc: "Design waistbands, tagless heat-transfer care labels, hangtags, custom polybags, gift boxes, and barcode stickers.",
    icon: "/media/generated/icons/packaging-box.png"
  },
  {
    title: "Bulk Production",
    desc: "Schedule production lines, prepare materials, perform sewing, and execute final assembly with dedicated project timelines.",
    icon: "/media/generated/icons/input-quantity.png"
  },
  {
    title: "Final QC",
    desc: "Conduct systematic inspections of dimensions, stitching strength, waistband stretch, trim security, and clean presentation.",
    icon: "/media/generated/icons/qc-check.png"
  },
  {
    title: "Global Delivery",
    desc: "Pack according to specific retail carton marks, organize cargo logistics, and ship via ocean, air, or express channels.",
    icon: "/media/generated/icons/input-channel.png"
  }
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

function collectionImage(slug: string): string {
  const images: Record<string, string> = {
    "womens-panties": "/media/generated/products/womens-panties.png",
    "seamless-underwear": "/media/generated/products/seamless-women-brief.png",
    "bras": "/media/generated/products/supportive-sports-bra.png",
    "shapewear": "/media/generated/products/shapewear.png",
    "mens-underwear": "/media/generated/products/men-seamless-boxer.png",
    "period-underwear": "/media/generated/products/period-underwear.png",
    "activewear": "/media/generated/products/high-waist-yoga-leggings.png",
    "homewear": "/media/generated/products/homewear.png"
  };
  return images[slug] || "/media/home/banner-1.jpg";
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroCarousel />

      <section className="border-y border-[#d9e2dc] bg-[#fffdf8] py-5">
        <div className="container mx-auto grid gap-3 px-4 md:grid-cols-3 md:px-6 xl:grid-cols-6">
          {trustStats.map((stat) => (
            <article key={stat.label} className="rounded border border-[#d9e2dc] bg-white px-4 py-3">
              <p className="text-lg font-bold text-[#1d2521]">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-normal text-[#7d8a85]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="kicker">DTC Brand Solutions</p>
            <h2 className="section-title mt-2 font-semibold text-[#1d2521]">
              Manufacturing support for each stage of <span className="gradient-text">brand growth</span>
            </h2>
            <p className="page-reference-body mt-4 text-[#5f6b66] text-base leading-relaxed">
              The site is built around factory execution, not generic product listings. Buyers can evaluate category fit,
              MOQ route, packaging needs, quality control, and launch timing before starting a project.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dtcSolutions.map((item) => (
              <article key={item.title} className="card p-6 glow-hover border-[#d9e2dc]/80 bg-white">
                <h3 className="text-lg font-bold text-[#1d2521] border-b border-[#d9e2dc]/40 pb-3 mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#5f6b66]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f3f7f4] to-[#e8eee9] py-16 md:py-24 border-y border-[#d9e2dc]/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">Launch-Ready Collections</p>
              <h2 className="section-title mt-2 font-semibold text-[#1d2521]">
                Core product lines for <span className="gradient-text">private label</span> programs
              </h2>
            </div>
            <Link href="/products" className="btn btn-primary shadow-md">
              View All Products
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {launchCollections.map((item) => (
              <Link key={item.slug} href={item.href} className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d9e2dc] bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[1.35/1] overflow-hidden bg-[#f0f4f1] relative">
                  <img
                    src={collectionImage(item.slug)}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1d2521] group-hover:text-[#0e5b51] transition-colors duration-300">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57635e]">{item.desc}</p>
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
              <h2 className="section-title mt-2 text-[#1d2521]">Labels, packaging, and retail-ready details for DTC launches</h2>
              <p className="page-reference-body mt-4 text-[#5f6b66]">
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
                <article key={item} className="rounded border border-[#d9e2dc] bg-[#fffdf8] px-4 py-3 text-sm font-semibold text-[#1d2521]">
                  {item}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#e5efec] to-[#f3f7f4] py-16 md:py-24 border-y border-[#d9e2dc]/50">
        <div className="container mx-auto px-4 md:px-6">
          <p className="kicker">Development Process</p>
          <h2 className="section-title mt-2 max-w-3xl font-semibold text-[#17201c]">
            From product brief to <span className="gradient-text">approved shipment</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {developmentSteps.map((step, index) => (
              <article key={step.title} className="fabric-guide-card relative pt-8">
                <span className="absolute top-5 right-5 text-xs font-extrabold uppercase tracking-widest text-[#b27037]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="showcase-icon-wrap">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="showcase-icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#17201c] mt-2">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#57635e]">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl hover:shadow-[0_20px_50px_rgba(14,91,81,0.25)] transition-shadow duration-500">
              <video
                src="/media/home/factory-video.mp4"
                controls
                preload="none"
                playsInline
                poster="/media/home/factory-1.jpg"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="kicker">Real Factory & QC</p>
              <h2 className="section-title mt-2 font-semibold text-[#17201c]">
                Factory photos, production checks, and buyer review
              </h2>
              <p className="page-reference-body mt-4 text-[#57635e] text-base leading-relaxed">
                About and factory pages now prioritize existing factory media and buyer-verifiable information. Certificate
                documents are described as available for buyer review, because certificate numbers and validity must be
                checked against the latest real documents.
              </p>
              <div className="mt-6 grid gap-4">
                {qualitySteps.map((item) => (
                  <article key={item.title} className="rounded-xl border-l-4 border-l-[#0e5b51] border border-[#d9e2dc]/80 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="font-bold text-[#17201c]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#57635e]">{item.desc}</p>
                  </article>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/factory" className="btn btn-primary">
                  View Factory & Quality
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 ? (
        <section className="bg-gradient-to-b from-[#f3f7f4] to-white py-16 md:py-24 border-t border-[#d9e2dc]/60">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">Core Product Examples</p>
                <h2 className="section-title mt-2 font-semibold text-[#17201c]">
                  Clean product titles for <span className="gradient-text">professional review</span>
                </h2>
              </div>
              <Link href="/products" className="btn btn-soft shadow-sm">
                Browse Catalogue
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {featuredProducts.map((product) => {
                const image = resolvePrimaryImage(product);
                return (
                  <Link key={product.product_id} href={`/products/${encodeURIComponent(product.product_id)}`} className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d9e2dc]/80 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="aspect-[4/5] overflow-hidden bg-[#f0f4f1] relative">
                      {image ? (
                        <img
                          src={image}
                          alt={resolveDisplayTitle(product)}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <h3 className="text-sm font-bold leading-snug text-[#17201c] group-hover:text-[#0e5b51] transition-colors duration-300 line-clamp-2">{resolveDisplayTitle(product)}</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-block rounded-full bg-[#f3f7f4] px-2.5 py-1 text-[11px] font-semibold text-[#57635e]">
                          {resolveDisplayProductId(product)}
                        </span>
                      </div>
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
              <h2 className="section-title mt-2 text-[#1d2521]">Questions buyers usually ask before sampling</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-5">
                  <h3 className="font-bold text-[#1d2521]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5f6b66]">{item.a}</p>
                </article>
              ))}
              <article className="rounded-lg border border-[#d9e2dc] bg-white p-5">
                <h3 className="font-bold text-[#1d2521]">MOQ planning reference</h3>
                <div className="mt-3 grid gap-2">
                  {moqTiers.map((item) => (
                    <p key={item.label} className="text-sm leading-6 text-[#5f6b66]">
                      <strong className="text-[#1d2521]">{item.label}:</strong> {item.value}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#162520] py-14 text-white md:py-20">
        <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-3xl">
            <p className="kicker text-[#d7eee8]">Final CTA</p>
            <h2 className="heading-font mt-2 text-4xl font-semibold">Start your private label underwear project</h2>
            <p className="mt-4 text-sm leading-7 text-white/82">
              Send category, target market, estimated quantity, private label needs, packaging plan, and launch date.
            </p>
          </div>
          <Link href="/contact" className="btn bg-white text-[#1d2521] hover:bg-[#dce9e5]">
            Contact Factory Team
          </Link>
        </div>
      </section>
    </main>
  );
}
