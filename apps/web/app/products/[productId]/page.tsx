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
  resolveDisplayTitle,
  resolvePrice,
  resolvePriceText,
  topFamily
} from "@/lib/product-display";
import { buildBreadcrumbJsonLd, buildMetadata, absoluteUrl } from "@/lib/seo";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

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

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getCatalogProductById(decodeURIComponent(params.productId));

  if (!product) {
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

  if (!product) {
    notFound();
  }

  const typedProduct = product as DisplayProduct;
  const displayTitle = resolveDisplayTitle(typedProduct);
  const displayProductId = resolveDisplayProductId(typedProduct);
  const displayDescription = resolveDisplayDescription(typedProduct);
  const price = resolvePrice(typedProduct);
  const priceText = resolvePriceText(typedProduct);
  const family = topFamily(typedProduct.category);
  const galleryImages = buildGalleryImages(typedProduct);
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
            <BuyNowButton title={`${displayTitle} - ${t.paidSample}`} unitAmountUsd={price} />
            <Link href="/contact" className="btn btn-soft">
              {t.quote}
            </Link>
          </div>

          <div className="catalog-detail-panel">
            <h2 className="catalog-detail-panel-title">{t.overview}</h2>
            <dl className="catalog-detail-specs">
              <div>
                <dt>{t.category}</dt>
                <dd>{typedProduct.category}</dd>
              </div>
              <div>
                <dt>{t.fabric}</dt>
                <dd>{typedProduct.fabric || "-"}</dd>
              </div>
              <div>
                <dt>{t.color}</dt>
                <dd>{typedProduct.color || "-"}</dd>
              </div>
              <div>
                <dt>{t.size}</dt>
                <dd>{typedProduct.size || "-"}</dd>
              </div>
              <div>
                <dt>{t.moq}</dt>
                <dd>{typedProduct.moq || "-"}</dd>
              </div>
              <div>
                <dt>{t.sampleTime}</dt>
                <dd>{typedProduct.sample_time || "-"}</dd>
              </div>
              <div>
                <dt>{t.productionTime}</dt>
                <dd>{typedProduct.production_time || "-"}</dd>
              </div>
            </dl>
          </div>

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
            <p className="page-reference-body text-[#9d7d6f]">{t.relatedDesc}</p>
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
