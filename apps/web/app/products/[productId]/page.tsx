import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BuyNowButton from "@/components/BuyNowButton";
import ProductGallery from "@/components/ProductGallery";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { getCatalogProductById, getCatalogProducts } from "@/lib/catalog-source";
import {
  buildGalleryImages,
  DisplayProduct,
  resolveDisplayProductId,
  resolveDisplayDescription,
  resolveCustomizationText,
  resolveDisplayTitle,
  resolveMoqText,
  resolvePrice,
  resolvePriceText,
  resolveProductionTimeText,
  resolveSampleTimeText,
  resolveSuitableFor,
  resolvePrimaryImage,
  topFamily,
  isInStock,
  isOemReady,
  isLowMoq
} from "@/lib/product-display";
import { buildBreadcrumbJsonLd, buildMetadata, absoluteUrl } from "@/lib/seo";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import { launchCollections, moqTiers, qualitySteps } from "@/lib/site-info";

const copy: Record<
  SiteLang,
  {
    back: string;
    quote: string;
    paidSample: string;
    overview: string;
    category: string;
    fabric: string;
    moq: string;
    sampleTime: string;
    productionTime: string;
    color: string;
    size: string;
    noImage: string;
    relatedTitle: string;
    relatedDesc: string;
    viewDetails: string;
    collectionLabel: string;
    overviewLabel: string;
    overviewIntro: string;
    referencePrice: string;
  }
> = {
  en: {
    back: "Back to Products",
    quote: "Start a Conversation",
    paidSample: "Paid Sample",
    overview: "Product Specifications",
    category: "Category",
    fabric: "Fabric",
    moq: "MOQ",
    sampleTime: "Sample Time",
    productionTime: "Production Time",
    color: "Color",
    size: "Size",
    noImage: "Image coming soon",
    relatedTitle: "Related products",
    relatedDesc: "More styles from the same category or top-level product family.",
    viewDetails: "View Details",
    collectionLabel: "Collection",
    overviewLabel: "Overview",
    overviewIntro: "A focused product brief for brand, retail, and private label development.",
    referencePrice: "Reference Price"
  },
  zh: {
    back: "返回产品列表",
    quote: "发起询盘",
    paidSample: "付费打样",
    overview: "产品规格",
    category: "分类",
    fabric: "面料",
    moq: "起订量",
    sampleTime: "打样时间",
    productionTime: "生产周期",
    color: "颜色",
    size: "尺码",
    noImage: "图片即将更新",
    relatedTitle: "相关产品",
    relatedDesc: "同类目或同一级产品线的更多款式。",
    viewDetails: "查看详情",
    collectionLabel: "系列",
    overviewLabel: "概览",
    overviewIntro: "面向品牌、零售与贴牌开发的精简产品信息。",
    referencePrice: "参考价格"
  },
  es: {
    back: "Volver a Productos",
    quote: "Iniciar Consulta",
    paidSample: "Muestra Pagada",
    overview: "Especificaciones del Producto",
    category: "Categoria",
    fabric: "Tejido",
    moq: "MOQ",
    sampleTime: "Tiempo de Muestra",
    productionTime: "Tiempo de Produccion",
    color: "Color",
    size: "Talla",
    noImage: "Imagen pendiente",
    relatedTitle: "Productos relacionados",
    relatedDesc: "Mas estilos de la misma categoria o familia principal.",
    viewDetails: "Ver Detalle",
    collectionLabel: "Coleccion",
    overviewLabel: "Resumen",
    overviewIntro: "Un resumen de producto pensado para desarrollo de marca, retail y private label.",
    referencePrice: "Precio de Referencia"
  }
};

type ProductDetailPageProps = {
  params: { productId: string };
};

type LaunchCollection = (typeof launchCollections)[number];

function findCollection(slug: string): LaunchCollection | undefined {
  return launchCollections.find((item) => item.slug === slug);
}

function productMatchesCollection(product: DisplayProduct, collection: LaunchCollection): boolean {
  const family = topFamily(product.category);
  const haystack = [product.product_name, product.category, product.description, product.fabric].join(" ").toLowerCase();
  const familyMatches = family === collection.family;
  if (!familyMatches) {
    return false;
  }
  return collection.match ? haystack.includes(collection.match) : true;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.productId);
  const product = await getCatalogProductById(decodedId);
  const collection = findCollection(decodedId);

  if (!product) {
    if (collection) {
      return buildMetadata({
        title: `${collection.title} Manufacturer`,
        description: collection.desc,
        path: `/products/${collection.slug}`
      });
    }
    return buildMetadata({
      title: "Product not found",
      description: "This product page is not available.",
      path: `/products/${params.productId}`
    });
  }

  const typedProduct = product as DisplayProduct;
  const title = resolveDisplayTitle(typedProduct);
  const description = resolveDisplayDescription(typedProduct);

  return buildMetadata({
    title,
    description,
    path: `/products/${encodeURIComponent(typedProduct.product_id)}`
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = decodeURIComponent(params.productId);
  const [product, allProducts] = await Promise.all([getCatalogProductById(productId), getCatalogProducts()]);
  const lang = getServerLang();
  const t = copy[lang];
  const collection = findCollection(productId);

  if (!product) {
    if (!collection) {
      notFound();
    }

    const categoryProducts = (allProducts as DisplayProduct[]).filter((item) => productMatchesCollection(item, collection));
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: collection.title, path: `/products/${collection.slug}` }
    ]);
    const collectionPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: collection.title,
      description: collection.desc,
      url: absoluteUrl(`/products/${collection.slug}`)
    };

    return (
      <main className="container-shell page-shell-tight">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />

        <section className="catalog-intro">
          <p className="catalog-intro-kicker">Launch-Ready Collection</p>
          <div className="catalog-intro-row">
            <div className="catalog-intro-copy">
              <h1 className="catalog-intro-title">{collection.title}</h1>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{collection.desc}</p>
            </div>
            <div className="catalog-meta">
              <p className="catalog-meta-count">{categoryProducts.length} items</p>
              <p className="page-reference-body text-[#7d8a85]">Fixed category URL</p>
            </div>
          </div>
        </section>

        <section className="catalog-grid-clean mt-8">
          {categoryProducts.map((item) => {
            const displayTitle = resolveDisplayTitle(item);
            const image = resolvePrimaryImage(item);
            return (
              <article key={item.product_id} className="catalog-card-clean">
                <Link href={`/products/${encodeURIComponent(item.product_id)}`} className="catalog-card-clean-media">
                  {image ? (
                    <img
                      src={image}
                      alt={displayTitle}
                      loading="lazy"
                      decoding="async"
                      className="catalog-card-clean-image catalog-card-clean-image-primary"
                    />
                  ) : (
                    <div className="catalog-card-clean-fallback">{t.noImage}</div>
                  )}
                </Link>
                <div className="catalog-card-clean-copy">
                  <p className="catalog-card-clean-category">{item.category}</p>
                  <Link href={`/products/${encodeURIComponent(item.product_id)}`}>
                    <h2 className="catalog-card-clean-title">{displayTitle}</h2>
                  </Link>
                  
                  {item.fabric ? (
                    <p className="catalog-card-clean-fabric mt-1.5 text-[12px] text-[#5f6b66] truncate">
                      {item.fabric}
                    </p>
                  ) : null}

                  <div className="catalog-card-clean-tags mt-2">
                    {isInStock(item) && (
                      <span className="catalog-card-tag">{t.inStock || "In Stock"}</span>
                    )}
                    {isOemReady(item) && (
                      <span className="catalog-card-tag">{t.oemReady || "OEM Ready"}</span>
                    )}
                    {isLowMoq(item) && (
                      <span className="catalog-card-tag">{t.lowMoq || "Low MOQ"}</span>
                    )}
                  </div>

                  <div className="catalog-card-clean-bottom mt-3 border-t border-[#d9e2dc]/40 pt-2.5">
                    <div className="flex flex-col">
                      <span className="catalog-card-clean-price font-bold text-[#0e5b51]">
                        {resolvePriceText(item)}
                      </span>
                      {item.moq && (
                        <span className="text-[10px] text-[#7d8a85] mt-0.5">
                          MOQ: {item.moq}
                        </span>
                      )}
                    </div>
                    <span className="inline-block rounded bg-[#f3f7f4] px-2 py-0.5 text-[10px] font-mono text-[#57635e]">
                      {resolveDisplayProductId(item)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-6">
          <h2 className="card-title-standard text-[#1d2521]">MOQ and development route</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {moqTiers.map((item) => (
              <p key={item.label} className="text-sm leading-6 text-[#5f6b66]">
                <strong className="text-[#1d2521]">{item.label}:</strong> {item.value}
              </p>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const typedProduct = product as DisplayProduct;
  const displayTitle = resolveDisplayTitle(typedProduct);
  const displayProductId = resolveDisplayProductId(typedProduct);
  const displayDescription = resolveDisplayDescription(typedProduct);
  const price = resolvePrice(typedProduct);
  const priceText = resolvePriceText(typedProduct);
  const family = topFamily(typedProduct.category);
  const galleryImages = buildGalleryImages(typedProduct);
  const customizationOptions = resolveCustomizationText();
  const suitableFor = resolveSuitableFor(typedProduct);
  const specRows = [
    { label: t.category, value: typedProduct.category },
    { label: t.fabric, value: typedProduct.fabric || "Fabric can be confirmed during sampling." },
    { label: t.color, value: typedProduct.color || "Stock colors and custom colors available by project." },
    { label: t.size, value: typedProduct.size || "XS to XL; extended size range can be reviewed by project." },
    { label: t.moq, value: resolveMoqText(typedProduct) },
    { label: t.sampleTime, value: resolveSampleTimeText(typedProduct) },
    { label: t.productionTime, value: resolveProductionTimeText(typedProduct) },
    { label: "Packaging", value: "Custom label, hangtag, polybag, gift box, barcode sticker, and carton mark available." },
    { label: "Payment", value: "Sample fee, deposit, and balance before shipment after quotation confirmation." }
  ];
  const relatedProducts = allProducts
    .filter((item) => item.product_id !== typedProduct.product_id)
    .sort((left, right) => {
      const leftScore =
        (left.category === typedProduct.category ? 2 : 0) + (topFamily(left.category) === family ? 1 : 0);
      const rightScore =
        (right.category === typedProduct.category ? 2 : 0) + (topFamily(right.category) === family ? 1 : 0);
      return rightScore - leftScore || left.product_name.localeCompare(right.product_name);
    })
    .filter((item) => item.category === typedProduct.category || topFamily(item.category) === family)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: displayTitle,
    description: displayDescription,
    image: galleryImages.map((image) => (image.startsWith("http") ? image : absoluteUrl(image))),
    sku: displayProductId,
    category: typedProduct.category,
    brand: {
      "@type": "Brand",
      name: "YiWu DiYaSi"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${encodeURIComponent(typedProduct.product_id)}`)
    }
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: displayTitle, path: `/products/${encodeURIComponent(typedProduct.product_id)}` }
  ]);

  return (
    <main className="container-shell py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="catalog-detail-back">
        <Link href="/products" className="catalog-detail-back-link">
          {t.back}
        </Link>
      </div>

      <section className="catalog-detail-shell">
        <ProductGallery productName={displayTitle} images={galleryImages} emptyLabel={t.noImage} />

        <div className="catalog-detail-copy">
          <div className="catalog-detail-header">
            <p className="catalog-detail-kicker">
              {t.collectionLabel} / {family}
            </p>
            <p className="catalog-detail-category">{displayProductId}</p>
            <p className="catalog-detail-category">{typedProduct.category}</p>
            <h1 className="catalog-detail-title">{displayTitle}</h1>
            <div className="catalog-detail-intro">
              <p className="catalog-detail-intro-label">{t.overviewLabel}</p>
              <p className="catalog-detail-intro-text">{t.overviewIntro}</p>
            </div>
            <p className="catalog-detail-desc">{displayDescription}</p>
          </div>

          <div className="catalog-detail-price-row">
            <p className="catalog-detail-price-label">{t.referencePrice}</p>
            <p className="catalog-detail-price">{priceText}</p>
          </div>

          <div className="catalog-detail-actions">
            <BuyNowButton
              title={`${displayTitle} - ${t.paidSample}`}
              unitAmountUsd={price}
              label={t.paidSample}
            />
            <Link href="/contact" className="btn btn-soft">
              {t.quote}
            </Link>
          </div>

          <div className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">{t.overview}</h2>
            <dl className="catalog-detail-specs">
              {specRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">Key Features</h2>
            <ul className="grid gap-2 text-sm leading-7 text-[#5f6b66]">
              <li>Fabric hand feel and stretch direction reviewed before sampling.</li>
              <li>Fit, coverage, waistband, gusset, and logo placement can be adjusted by project.</li>
              <li>Private label packaging route can be aligned before bulk production.</li>
              <li>Suitable for repeat production after fit and pre-production sample approval.</li>
            </ul>
          </section>

          <section className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">Customization Options</h2>
            <div className="chip-list">
              {customizationOptions.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">Quality Control</h2>
            <div className="grid gap-3">
              {qualitySteps.map((item) => (
                <article key={item.title} className="rounded-xl border-l-4 border-l-[#0e5b51] border border-[#d9e2dc]/80 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-bold text-[#17201c]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57635e]">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">Suitable For</h2>
            <div className="chip-list">
              {suitableFor.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <ProductInquiryForm productName={displayTitle} category={typedProduct.category} />
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="catalog-related-shell">
          <div className="catalog-group-head">
            <div>
              <p className="catalog-group-kicker">{family}</p>
              <h2 className="catalog-group-title">{t.relatedTitle}</h2>
            </div>
            <p className="page-reference-body text-[#7d8a85]">{t.relatedDesc}</p>
          </div>
          <div className="catalog-related-grid">
            {relatedProducts.map((item) => {
              const relatedProduct = item as DisplayProduct;
              const relatedImages = buildGalleryImages(relatedProduct);

              return (
                <article key={item.product_id} className="catalog-related-card">
                  <Link href={`/products/${encodeURIComponent(item.product_id)}`} className="catalog-related-media">
                    {relatedImages[0] ? (
                      <img
                        src={relatedImages[0]}
                        alt={resolveDisplayTitle(relatedProduct)}
                        loading="lazy"
                        decoding="async"
                        className="catalog-related-image"
                      />
                    ) : (
                      <div className="catalog-card-clean-fallback">{t.noImage}</div>
                    )}
                  </Link>
                  <div className="catalog-related-copy">
                    <p className="catalog-card-clean-category">{item.category}</p>
                    <h3 className="catalog-related-title">{resolveDisplayTitle(relatedProduct)}</h3>
                    <Link
                      href={`/products/${encodeURIComponent(item.product_id)}`}
                      className="catalog-card-clean-link"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}

