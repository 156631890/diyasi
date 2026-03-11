import ProductCatalogView from "@/components/ProductCatalogView";
import { getCatalogCategories, getCatalogProducts } from "@/lib/catalog-source";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

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
    loadMore: "Load more"
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
    loadMore: "加载更多"
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
    loadMore: "Cargar mas"
  }
};

export default async function ProductsPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [products, categories] = await Promise.all([getCatalogProducts(), getCatalogCategories()]);

  return (
    <main className="container-shell py-8 md:py-10">
      <section className="catalog-intro">
        <p className="kicker page-reference-subtitle">{t.kicker}</p>
        <div className="catalog-intro-row">
          <div>
            <h1 className="section-title mt-2 text-[#6a3524]">{t.title}</h1>
            <p className="page-reference-body mt-3 max-w-2xl text-[#7d4f3e]">{t.desc}</p>
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
