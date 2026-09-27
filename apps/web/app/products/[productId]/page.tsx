import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import CatalogPage, {
  catalogMetadata,
  type CatalogSearch,
} from "@/components/CatalogPage";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { SampleButton } from "@/components/SampleList";
import JsonLd from "@/components/JsonLd";
import BuyerGuidance from "@/components/BuyerGuidance";
import { productBuyingGuide } from "@/lib/buyer-guidance";
import { productSourceEvidence } from "@/lib/product-source-evidence";
import {
  catalogProducts,
  getCatalogProductById,
  legacyProductRedirects,
} from "@/lib/catalog-source";
import { findCollection } from "@/lib/collections";
import { absoluteUrl, buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
type Props = {
  params: Promise<{ productId: string }>;
  searchParams?: Promise<CatalogSearch>;
};
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { productId } = await params;
  const collection = findCollection(productId);
  if (collection)
    return catalogMetadata((await searchParams) ?? {}, collection);
  const p = await getCatalogProductById(productId);
  if (!p)
    return { title: "Style not found", robots: { index: false, follow: true } };
  const meta = buildMetadata({
    title: p.seo_title,
    description: p.meta_description,
    path: "/products/" + p.slug,
  });
  return {
    ...meta,
    title: { absolute: p.seo_title },
    openGraph: {
      ...meta.openGraph,
      images: [{ url: absoluteUrl(p.image_url), alt: p.product_name }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.seo_title,
      description: p.meta_description,
      images: [absoluteUrl(p.image_url)],
    },
  };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const { productId } = await params;
  if (legacyProductRedirects[productId])
    permanentRedirect("/products/" + legacyProductRedirects[productId]);
  const collection = findCollection(productId);
  if (collection)
    return <CatalogPage collection={collection} search={await searchParams} />;
  const p = await getCatalogProductById(productId);
  if (!p) notFound();
  const sourceEvidence = productSourceEvidence[p.model_number];
  const parent = findCollection(p.collection)!;
  const related = catalogProducts
    .filter((x) => x.collection === p.collection && x.slug !== p.slug)
    .sort((a, b) => Number(b.fit === p.fit) - Number(a.fit === p.fit) || Number(b.rise === p.rise) - Number(a.rise === p.rise))
    .slice(0, 4);
  const facts = [
    ["Style number", p.model_number],
    ["Composition", p.fabric],
    ["Silhouette", p.fit + " · " + p.rise],
    ["Size range", p.size],
    ["Colors", p.color],
    ["Starting quantity", p.moq],
    ["Sampling", p.sample_time],
    ["Bulk production", p.production_time],
  ];
  return (
    <main id="main-content" className="d-detail">
      {/* Quote-only styles have no published offer or reviews. Use ItemPage until
          genuine, visible data meets Google's Product rich-result requirements. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemPage",
          "@id": absoluteUrl("/products/" + p.slug) + "#webpage",
          name: p.product_name,
          description: p.description,
          identifier: p.model_number,
          isBasedOn: sourceEvidence
            ? [p.source_urls[0], sourceEvidence.secondaryUrl]
            : p.source_urls[0],
          inLanguage: "en",
          isPartOf: { "@id": absoluteUrl("/") + "#website" },
          publisher: { "@id": absoluteUrl("/") + "#organization" },
          image: p.gallery_images.map(absoluteUrl),
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(p.image_url),
          },
          url: absoluteUrl("/products/" + p.slug),
        }}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/products" },
          { name: parent.short, path: "/products/" + parent.slug },
          { name: p.product_name, path: "/products/" + p.slug },
        ])}
      />
      <nav className="d-breadcrumb" aria-label="Breadcrumb">
        <Link href="/products">Collections</Link>
        <span>/</span>
        <Link href={"/products/" + parent.slug}>{parent.short}</Link>
        <span>/</span>
        <span>{p.model_number}</span>
      </nav>
      <section className="d-detail-grid">
        <ProductGallery
          productName={p.product_name}
          images={p.gallery_images}
        />
        <div className="d-detail-copy">
          <p className="d-eyebrow">
            Private label &amp; wholesale · {p.model_number}
          </p>
          <h1>{p.product_name}</h1>
          <p className="d-detail-description">{p.description}</p>
          <p className="d-quote-price">
            Made for your label. <span>Quoted for your order.</span>
          </p>
          <dl className="d-key-facts">
            <div>
              <dt>The fit</dt>
              <dd>
                {p.fit} · {p.rise}
              </dd>
            </div>
            <div>
              <dt>The feel</dt>
              <dd>{p.material_label}</dd>
            </div>
            <div>
              <dt>The starting point</dt>
              <dd>{p.moq}</dd>
            </div>
          </dl>
          <a className="d-button d-button-wide" href="#product-inquiry">
            Request a sample & quotation <span aria-hidden="true">↗</span>
          </a>
          <div className="d-detail-sample"><SampleButton productId={p.slug} /></div>
          <Link
            className="d-text-link"
            href={
              "/contact?source=product&productId=" + encodeURIComponent(p.slug)
            }
          >
            Talk about this style ↗
          </Link>
          <div className="d-accordions">
            <details open>
              <summary>Fabric, fit & details</summary>
              <dl className="d-specs">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details>
              <summary>Size guide for {p.model_number}</summary>
              <p>
                Listed sizes: {p.size}. The manufacturer&apos;s chart below is a
                starting reference for this style. Confirm body measurements,
                finished garment measurements and tolerances on the sample; size
                labels do not establish a universal US or EU fit.
              </p>
              {sourceEvidence && (
                <div className="d-source-size-reference">
                  <p>{sourceEvidence.sizeChartNote}</p>
                  <div className="d-source-size-scroll">
                    <table>
                      <caption>{p.model_number} manufacturer size-chart transcription</caption>
                      <thead>
                        <tr>
                          <th scope="col">Size</th>
                          <th scope="col">Waist (cm)</th>
                          <th scope="col">{sourceEvidence.secondaryHeader}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sourceEvidence.sizeRows.map((row) => (
                          <tr key={row.size}>
                            <th scope="row">{row.size}</th>
                            <td>{row.waistCm}</td>
                            <td>{row.secondaryCm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {p.size_chart_image && (
                <a
                  href={p.size_chart_image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={p.size_chart_image}
                    alt={`${p.model_number} manufacturer size reference chart`}
                    width={1000}
                    height={1000}
                    sizes="(max-width:700px) 100vw, 45vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <span className="d-text-link">Open full-size chart ↗</span>
                </a>
              )}
              <Link href="/resources/us-eu-underwear-size-labeling-preparation-startup-brands">
                How to confirm sizes for your market ↗
              </Link>
            </details>
            <details>
              <summary>Make it your own</summary>
              <p>
                Discuss logo application, waistband artwork, care labels, colors
                and packaging. Availability and minimum quantities depend on the
                exact customization. Approve a physical sample and written
                specification before bulk production.
              </p>
              <Link href="/packaging">Explore labels & packaging ↗</Link>
            </details>
            <details>
              <summary>Sampling, delivery & care</summary>
              <p>
                Ask for current stock availability and a sample in the intended
                fabric and size. Delivery timing starts after your
                specifications are confirmed. Follow the care label approved for
                the finished garment; heat and bleach may affect stretch fibers
                and lace.
              </p>
              <Link href="/return-policy">Sample & order policy ↗</Link>
            </details>
            <details>
              <summary>Sample costs & packaging</summary>
              <p>
                Sample fees, development charges and courier costs are quoted
                for the selected style and destination. Confirm any sample-fee
                credit against a bulk order in writing. Choose plain or branded
                bags, hangtags, barcode labels or boxes with the team; component
                minimums and print/setup charges are quoted separately.
              </p>
              <p>
                Request a dated schedule showing sample approval, material and
                artwork approval, production, inspection and dispatch. Freight
                and customs time are additional to production time.
              </p>
              <Link href="/resources/underwear-sampling-costs-lead-times-packaging">
                Sample and quotation checklist ↗
              </Link>
            </details>
          </div>
        </div>
      </section>
      {p.detail_images.length > 0 && (
        <details className="d-source-details">
          <summary>
            More style photographs & construction details{" "}
            <span>{p.detail_images.length} images</span>
          </summary>
          <div>
            {p.detail_images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${p.product_name} — source construction or detail photograph ${i + 1}`}
                width={800}
                height={800}
                sizes="(max-width:700px) 100vw, 50vw"
                style={{ height: "auto" }}
              />
            ))}
          </div>
        </details>
      )}
      <aside className="d-catalog-provenance" aria-label="Catalogue provenance">
        <h2>Catalogue source and scope</h2>
        <p>
          DIYASI checked this model&apos;s listed specifications and photographs
          against its <a href={p.source_urls[0]} target="_blank" rel="noopener noreferrer">original manufacturer listing</a> on {p.reviewed_at}.
          This is a catalogue reference. Current availability, sample fees,
          customization and final order specifications are confirmed in writing.
        </p>
        {sourceEvidence && (
          <div className="d-catalog-source-comparison">
            <h3>What the manufacturer listings establish</h3>
            <p>{sourceEvidence.catalogueNote}</p>
            <p>
              Compare the <a href={p.source_urls[0]} target="_blank" rel="noopener noreferrer">underwear listing</a> and the <a href={sourceEvidence.secondaryUrl} target="_blank" rel="noopener noreferrer">related apparel listing</a>. These are two DIYASI-owned sources, not independent test reports or a current order quotation.
            </p>
          </div>
        )}
      </aside>
      <BuyerGuidance guide={productBuyingGuide(p)} />
      <section className="d-product-enquiry" id="product-inquiry">
        <div>
          <p className="d-eyebrow">Let’s begin with a sample</p>
          <h2>
            A small detail.
            <br />
            <em>A signature style.</em>
          </h2>
          <p>
            Tell us about your market, planned quantity and branding. We’ll help
            you turn this style into a clear production brief.
          </p>
          <p className="d-fineprint">
            Catalogue information reviewed {p.reviewed_at}. Final
            specifications, pricing and availability are confirmed in writing.
          </p>
        </div>
        <ProductInquiryForm
          productName={p.product_name + " · " + p.model_number}
          category={
            p.gender === "women" ? "Women's underwear" : "Men's underwear"
          }
        />
      </section>
      {related.length > 0 && (
        <section className="d-related">
          <div className="d-section-heading">
            <div>
              <p className="d-eyebrow">In good company</p>
              <h2>You may also love</h2>
            </div>
            <Link href={"/products/" + parent.slug} className="d-text-link">
              Explore the collection ↗
            </Link>
          </div>
          <div className="d-product-grid">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
