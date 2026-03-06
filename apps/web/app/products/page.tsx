import BuyNowButton from "@/components/BuyNowButton";
import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type Product = {
  product_id: string;
  product_name: string;
  category: string;
  fabric: string;
  description: string;
  image_url: string;
};

type ProductCategory = {
  category: string;
  count: number;
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    all: string;
    noPoster: string;
    noImage: string;
    quote: string;
    bulk: string;
    paidSample: string;
  }
> = {
  en: {
    kicker: "Product Library",
    title: "Category-based collection built for sourcing efficiency",
    desc: "Browse by category, shortlist styles faster, and move smoothly from paid sampling to bulk production.",
    all: "All Categories",
    noPoster: "No products in this category yet.",
    noImage: "Image coming soon",
    quote: "Request Category Quote",
    bulk: "Discuss Bulk Order",
    paidSample: "Paid Sample"
  },
  zh: {
    kicker: "产品库",
    title: "按分类组织的产品系统，提升选款效率",
    desc: "按品类快速浏览、对比与筛选，让合作从付费打样顺畅进入大货阶段。",
    all: "全部分类",
    noPoster: "该分类暂时没有产品。",
    noImage: "图片待更新",
    quote: "获取分类报价",
    bulk: "洽谈大货合作",
    paidSample: "付费打样"
  },
  es: {
    kicker: "Biblioteca de Producto",
    title: "Coleccion por categorias para una seleccion mas eficiente",
    desc: "Navega por categoria, filtra estilos rapidamente y avanza de muestra pagada a produccion masiva.",
    all: "Todas las Categorias",
    noPoster: "Aun no hay productos en esta categoria.",
    noImage: "Imagen pendiente",
    quote: "Solicitar Cotizacion",
    bulk: "Hablar Pedido Masivo",
    paidSample: "Muestra Pagada"
  }
};

const categoryPricing: Record<string, number> = {
  "seamless underwear": 249,
  "yoga leggings": 299,
  "sports bras": 279,
  "mens underwear": 259,
  loungewear: 289
};

function keyCategory(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function resolvePrice(product: Product): number {
  return categoryPricing[keyCategory(product.category)] || 279;
}

async function getProducts(): Promise<Product[]> {
  return safeFetchJson<Product[]>("/products/", []);
}

async function getCategories(): Promise<ProductCategory[]> {
  return safeFetchJson<ProductCategory[]>("/products/categories", []);
}

type ProductsPageProps = { searchParams: { category?: string } };

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const lang = getServerLang();
  const t = copy[lang];
  const selected = searchParams.category ? decodeURIComponent(searchParams.category) : "";
  const selectedKey = keyCategory(selected);

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const filteredProducts = selectedKey ? products.filter((item) => keyCategory(item.category) === selectedKey) : products;

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10">
        <p className="kicker">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
        <p className="mt-3 max-w-3xl leading-8 text-[#51627d]">{t.desc}</p>
      </section>

      <section className="mt-7 card p-6">
        <div className="flex flex-wrap gap-2">
          <Link href="/products" className={`rounded-full border px-4 py-2 text-sm ${selectedKey ? "border-slate-300 text-slate-700" : "border-[#102949] bg-[#102949] text-white"}`}>
            {t.all} ({products.length})
          </Link>
          {categories.map((item) => {
            const active = keyCategory(item.category) === selectedKey;
            return (
              <Link
                key={item.category}
                href={`/products?category=${encodeURIComponent(item.category)}`}
                className={`rounded-full border px-4 py-2 text-sm transition ${active ? "border-[#102949] bg-[#102949] text-white" : "border-slate-300 text-slate-700 hover:border-slate-400"}`}
              >
                {item.category} ({item.count})
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {filteredProducts.length === 0 ? <div className="card p-5 text-slate-600">{t.noPoster}</div> : null}
        {filteredProducts.map((product) => {
          const price = resolvePrice(product);
          return (
            <article key={product.product_id} className="card overflow-hidden">
              {product.image_url ? (
                <img src={product.image_url} alt={product.product_name} className="h-72 w-full object-cover" />
              ) : (
                <div className="grid h-72 place-items-center bg-gradient-to-br from-[#dde8f7] to-[#f4e7d5] text-sm text-slate-600">{t.noImage}</div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="heading-font text-4xl font-semibold text-[#112742]">{product.product_name}</h2>
                    <p className="mt-1 text-sm uppercase tracking-wide text-[#8b6a2c]">{product.category}</p>
                  </div>
                  <p className="rounded-full bg-[#102949] px-3 py-1 text-sm font-semibold text-white">${price}</p>
                </div>
                <p className="mt-2 text-sm text-[#5d6e89]">{product.fabric}</p>
                <p className="mt-3 leading-7 text-[#4f607d]">{product.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <BuyNowButton title={`${product.product_name} - ${t.paidSample}`} unitAmountUsd={price} />
                  <Link href="/contact" className="btn btn-soft">{t.bulk}</Link>
                  <Link href="/contact" className="btn btn-soft">{t.quote}</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
