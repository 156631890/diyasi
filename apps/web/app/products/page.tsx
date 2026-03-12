import type { Metadata } from "next";

import ProductCatalogView from "@/components/ProductCatalogView";
import { getCatalogCategories, getCatalogProducts } from "@/lib/catalog-source";
import { SiteLang } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildMetadata, absoluteUrl } from "@/lib/seo";
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
    kicker: "Product Catalogue",
    title: "Private label underwear, bras, shapewear, and activewear",
    desc:
      "Browse imported Alibaba styles now organized for wholesale buyers, retailers, DTC brands, and factory development briefs.",
    all: "All products",
    noProducts: "No products found in this category yet.",
    noImage: "Image coming soon",
    quote: "Start a Conversation",
    paidSample: "Paid Sample",
    items: "items",
    viewDetails: "View Details",
    browseAll: "Browse all categories",
    categoryLabel: "Category",
    groupedLead: "All subcategories",
    topLevelLabel: "Top-level categories",
    subcategoryLabel: "Subcategories",
    loadMore: "Load more",
    searchLabel: "Search products",
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
    kicker: "产品目录",
    title: "内衣、文胸、塑形衣与运动服产品目录",
    desc:
      "按适合独立站的目录结构浏览产品，方便批发商、零售商、DTC 品牌和工厂开发项目快速筛选款式。",
    all: "全部产品",
    noProducts: "当前分类下暂时没有产品。",
    noImage: "图片即将更新",
    quote: "发起询盘",
    paidSample: "付费打样",
    items: "款",
    viewDetails: "查看详情",
    browseAll: "浏览全部分类",
    categoryLabel: "分类",
    groupedLead: "全部二级分类",
    topLevelLabel: "一级分类",
    subcategoryLabel: "二级分类",
    loadMore: "加载更多",
    searchLabel: "搜索产品",
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
    kicker: "Catalogo de Productos",
    title: "Catalogo de underwear, bras, shapewear y activewear",
    desc:
      "Explora productos organizados para compradores mayoristas, retailers, marcas DTC y proyectos de desarrollo de fabrica.",
    all: "Todos los productos",
    noProducts: "Todavia no hay productos en esta categoria.",
    noImage: "Imagen pendiente",
    quote: "Iniciar Consulta",
    paidSample: "Muestra Pagada",
    items: "articulos",
    viewDetails: "Ver Detalle",
    browseAll: "Ver todas las categorias",
    categoryLabel: "Categoria",
    groupedLead: "Todas las subcategorias",
    topLevelLabel: "Categorias principales",
    subcategoryLabel: "Subcategorias",
    loadMore: "Cargar mas",
    searchLabel: "Buscar productos",
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
        <p className="kicker page-reference-subtitle">{t.kicker}</p>
        <div className="catalog-intro-row">
          <div className="page-copy-wide">
            <h1 className="section-title mt-2 text-[#6a3524]">{t.title}</h1>
            <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.desc}</p>
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
