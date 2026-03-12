import type { Metadata } from "next";

import ProductCatalogView from "@/components/ProductCatalogView";
import { getCatalogCategories, getCatalogProducts } from "@/lib/catalog-source";
import { SiteLang } from "@/lib/i18n";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Private-label underwear, bras, shapewear, and activewear catalogue for wholesalers, retailers, and DTC brands.",
  path: "/products"
});

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    all: string;
    noProducts: string;
    noImage: string;
    quote: string;
    paidSample: string;
    items: string;
    viewDetails: string;
    browseAll: string;
    categoryLabel: string;
    groupedLead: string;
    topLevelLabel: string;
    subcategoryLabel: string;
    loadMore: string;
    searchLabel: string;
    searchPlaceholder: string;
    moqLabel: string;
    priceLabel: string;
    quickView: string;
    inStock: string;
    oemReady: string;
    lowMoq: string;
    close: string;
  }
> = {
  en: {
    kicker: "Products",
    title: "Underwear, bras, shapewear, and activewear",
    desc: "",
    all: "All",
    noProducts: "No products found in this category yet.",
    noImage: "Image coming soon",
    quote: "Start a Conversation",
    paidSample: "Paid Sample",
    items: "items",
    viewDetails: "View Details",
    browseAll: "All",
    categoryLabel: "Category",
    groupedLead: "All",
    topLevelLabel: "Categories",
    subcategoryLabel: "Filters",
    loadMore: "Load more",
    searchLabel: "Search",
    searchPlaceholder: "Search by product name, fabric, or MOQ",
    moqLabel: "MOQ",
    priceLabel: "Range",
    quickView: "Quick View",
    inStock: "In Stock",
    oemReady: "OEM Ready",
    lowMoq: "Low MOQ",
    close: "Close"
  },
  zh: {
    kicker: "产品",
    title: "内衣、文胸、塑形与运动系列",
    desc: "",
    all: "全部",
    noProducts: "当前分类下暂无产品。",
    noImage: "图片即将更新",
    quote: "发起询盘",
    paidSample: "付费打样",
    items: "款",
    viewDetails: "查看详情",
    browseAll: "全部",
    categoryLabel: "分类",
    groupedLead: "全部",
    topLevelLabel: "分类",
    subcategoryLabel: "筛选",
    loadMore: "加载更多",
    searchLabel: "搜索",
    searchPlaceholder: "按产品名、面料或 MOQ 搜索",
    moqLabel: "MOQ",
    priceLabel: "价格区间",
    quickView: "快速预览",
    inStock: "有现货",
    oemReady: "可 OEM",
    lowMoq: "低 MOQ",
    close: "关闭"
  },
  es: {
    kicker: "Productos",
    title: "Underwear, bras, shapewear y activewear",
    desc: "",
    all: "Todo",
    noProducts: "Todavia no hay productos en esta categoria.",
    noImage: "Imagen pendiente",
    quote: "Iniciar Consulta",
    paidSample: "Muestra Pagada",
    items: "articulos",
    viewDetails: "Ver Detalle",
    browseAll: "Todo",
    categoryLabel: "Categoria",
    groupedLead: "Todo",
    topLevelLabel: "Categorias",
    subcategoryLabel: "Filtros",
    loadMore: "Cargar mas",
    searchLabel: "Buscar",
    searchPlaceholder: "Buscar por nombre, tejido o MOQ",
    moqLabel: "MOQ",
    priceLabel: "Rango",
    quickView: "Vista Rapida",
    inStock: "En Stock",
    oemReady: "OEM Disponible",
    lowMoq: "MOQ Bajo",
    close: "Cerrar"
  }
};

export default async function ProductsPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [products, categories] = await Promise.all([getCatalogProducts(), getCatalogCategories()]);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/${encodeURIComponent(product.product_id)}`),
      name: product.product_name
    }))
  };
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.title,
    description: t.desc,
    url: absoluteUrl("/products")
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" }
  ]);

  return (
    <main className="container-shell page-shell-tight">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="catalog-intro">
        <p className="catalog-intro-kicker">{t.kicker}</p>
        <div className="catalog-intro-row">
          <div className="catalog-intro-copy">
            <h1 className="catalog-intro-title">{t.title}</h1>
            {t.desc ? <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.desc}</p> : null}
          </div>
          <div className="catalog-meta">
            <p className="catalog-meta-count">
              {products.length} {t.items}
            </p>
            <p className="page-reference-body text-[#9d7d6f]">{t.topLevelLabel}</p>
          </div>
        </div>
      </section>

      <ProductCatalogView products={products} categories={categories} copy={t} />
    </main>
  );
}
