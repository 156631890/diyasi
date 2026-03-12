import Link from "next/link";
import { notFound } from "next/navigation";

import BuyNowButton from "@/components/BuyNowButton";
import ProductGallery from "@/components/ProductGallery";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { getCatalogProductById, getCatalogProducts } from "@/lib/catalog-source";
import {
  buildGalleryImages,
  DisplayProduct,
  resolveDisplayDescription,
  resolveDisplayTitle,
  resolvePrice,
  resolvePriceText,
  topFamily
} from "@/lib/product-display";
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
    sourceNote: string;
    noImage: string;
    relatedTitle: string;
    relatedDesc: string;
    viewDetails: string;
  }
> = {
  en: {
    back: "Back to Products",
    quote: "Start a Conversation",
    paidSample: "Paid Sample",
    overview: "Product Overview",
    category: "Category",
    fabric: "Fabric",
    moq: "MOQ",
    sampleTime: "Sample Time",
    productionTime: "Production Time",
    color: "Color",
    size: "Size",
    sourceNote:
      "Product data is currently enhanced from the Alibaba listing page, including visible price, MOQ, and gallery assets.",
    noImage: "Image coming soon",
    relatedTitle: "Related products",
    relatedDesc: "More styles from the same category or top-level product family.",
    viewDetails: "View Details"
  },
  zh: {
    back: "返回产品列表",
    quote: "发起询盘",
    paidSample: "付费打样",
    overview: "产品信息",
    category: "分类",
    fabric: "面料",
    moq: "起订量",
    sampleTime: "打样时间",
    productionTime: "生产周期",
    color: "颜色",
    size: "尺码",
    sourceNote: "当前产品信息已结合 Alibaba 列表页可见的价格、MOQ 与图片资源进行整理。",
    noImage: "图片即将更新",
    relatedTitle: "相关产品",
    relatedDesc: "同类目或同一级产品线的更多款式。",
    viewDetails: "查看详情"
  },
  es: {
    back: "Volver a Productos",
    quote: "Iniciar Consulta",
    paidSample: "Muestra Pagada",
    overview: "Resumen del Producto",
    category: "Categoria",
    fabric: "Tejido",
    moq: "MOQ",
    sampleTime: "Tiempo de Muestra",
    productionTime: "Tiempo de Produccion",
    color: "Color",
    size: "Talla",
    sourceNote:
      "Los datos del producto estan reforzados con precio visible, MOQ y galeria obtenidos de la lista de Alibaba.",
    noImage: "Imagen pendiente",
    relatedTitle: "Productos relacionados",
    relatedDesc: "Mas estilos de la misma categoria o familia principal.",
    viewDetails: "Ver Detalle"
  }
};

type ProductDetailPageProps = {
  params: { productId: string };
};

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

  return (
    <main className="container-shell py-8 md:py-10">
      <div className="catalog-detail-back">
        <Link href="/products" className="catalog-detail-back-link">
          {t.back}
        </Link>
      </div>

      <section className="catalog-detail-shell">
        <ProductGallery productName={displayTitle} images={galleryImages} emptyLabel={t.noImage} />

        <div className="catalog-detail-copy">
          <p className="catalog-card-clean-category">{typedProduct.category}</p>
          <h1 className="catalog-detail-title">{displayTitle}</h1>
          <p className="catalog-detail-desc">{displayDescription}</p>

          <div className="catalog-detail-price-row">
            <p className="catalog-detail-price">{priceText}</p>
            <p className="catalog-detail-note">{t.sourceNote}</p>
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
