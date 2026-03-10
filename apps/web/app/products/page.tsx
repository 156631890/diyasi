import BuyNowButton from "@/components/BuyNowButton";
import { safeFetchJson } from "@/lib/api";
import { fallbackCatalogCategories, fallbackCatalogProducts } from "@/lib/catalog";
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

const fallbackProductImages: Record<string, string> = {
  "SW-001": "/media/generated/products/seamless-women-brief.png",
  "YL-002": "/media/generated/products/high-waist-yoga-leggings.png",
  "AB-003": "/media/generated/products/supportive-sports-bra.png",
  "MB-004": "/media/generated/products/men-seamless-boxer.png"
};

const categoryFallbackImages: Record<string, string> = {
  "women's panties": "/media/generated/products/seamless-women-brief.png",
  bras: "/media/generated/products/supportive-sports-bra.png",
  thongs: "/media/generated/products/seamless-women-brief.png",
  "men underwear": "/media/generated/products/men-seamless-boxer.png",
  "gym & sports wear": "/media/generated/products/high-waist-yoga-leggings.png",
  "home wear": "/media/generated/products/high-waist-yoga-leggings.png",
  "socks & hosiery": "/media/generated/products/men-seamless-boxer.png",
  "base layers": "/media/generated/products/high-waist-yoga-leggings.png",
  shorts: "/media/generated/products/high-waist-yoga-leggings.png"
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
    quote: "Start a Conversation",
    bulk: "Start a Conversation",
    paidSample: "Paid Sample"
  },
  zh: {
    kicker: "产品库",
    title: "按分类组织的产品系统，提升选款效率",
    desc: "按品类快速浏览、对比与筛选，让合作从付费打样顺畅进入大货阶段。",
    all: "全部分类",
    noPoster: "该分类暂时没有产品。",
    noImage: "图片待更新",
    quote: "开始沟通",
    bulk: "开始沟通",
    paidSample: "付费打样"
  },
  es: {
    kicker: "Biblioteca de Producto",
    title: "Colección por categorías para una selección más eficiente",
    desc: "Navega por categoría, filtra estilos rápidamente y avanza de muestra pagada a producción masiva con más claridad.",
    all: "Todas las Categorías",
    noPoster: "Aún no hay productos en esta categoría.",
    noImage: "Imagen pendiente",
    quote: "Iniciar Conversación",
    bulk: "Iniciar Conversación",
    paidSample: "Muestra Pagada"
  }
};

const categoryPricing: Record<string, number> = {
  "seamless underwear": 249,
  "yoga leggings": 299,
  "sports bras": 279,
  "mens underwear": 259,
  loungewear: 289,
  "women's panties": 249,
  bras: 279,
  thongs: 229,
  "men underwear": 259,
  "gym & sports wear": 319,
  "home wear": 289,
  "socks & hosiery": 189,
  "base layers": 309,
  shorts: 259
};

function keyCategory(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function resolvePrice(product: Product): number {
  return categoryPricing[keyCategory(product.category)] || 279;
}

function resolveImage(product: Product): string {
  return product.image_url || fallbackProductImages[product.product_id] || categoryFallbackImages[keyCategory(product.category)] || "";
}

async function getProducts(): Promise<Product[]> {
  return safeFetchJson<Product[]>("/products/", fallbackCatalogProducts);
}

async function getCategories(): Promise<ProductCategory[]> {
  return safeFetchJson<ProductCategory[]>("/products/categories", fallbackCatalogCategories);
}

type ProductsPageProps = { searchParams: { category?: string } };

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const lang = getServerLang();
  const t = copy[lang];
  const selected = searchParams.category ? decodeURIComponent(searchParams.category) : "";
  const selectedKey = keyCategory(selected);

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const filteredProducts = selectedKey ? products.filter((item) => keyCategory(item.category) === selectedKey) : products;
  const leadProduct = filteredProducts[0] || null;
  const supportingProducts = filteredProducts.slice(1);

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
        <p className="page-reference-body mt-3 max-w-3xl text-[#51627d]">{t.desc}</p>
      </section>

      <section className="catalog-rail mt-8">
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

      <section className="mt-10">
        {leadProduct ? (
          <article className="catalog-feature">
            <div className="catalog-feature-media">
              {resolveImage(leadProduct) ? (
                <img src={resolveImage(leadProduct)} alt={leadProduct.product_name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center bg-gradient-to-br from-[#dde8f7] to-[#f4e7d5] text-sm text-slate-600">{t.noImage}</div>
              )}
            </div>
            <div className="catalog-feature-copy">
              <p className="kicker">{leadProduct.category}</p>
              <h2 className="page-reference-subtitle mt-3 text-[#112742]">{leadProduct.product_name}</h2>
              <p className="page-reference-body mt-4 max-w-2xl text-[#4f607d]">{leadProduct.description}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">Fabric</p>
                  <p className="page-reference-body mt-2 text-[#3f5068]">{leadProduct.fabric}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">Price</p>
                  <p className="page-reference-body mt-2 text-[#3f5068]">${resolvePrice(leadProduct)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">Product ID</p>
                  <p className="page-reference-body mt-2 text-[#3f5068]">{leadProduct.product_id}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <BuyNowButton title={`${leadProduct.product_name} - ${t.paidSample}`} unitAmountUsd={resolvePrice(leadProduct)} />
                <Link href="/contact" className="btn btn-soft">{t.bulk}</Link>
                <Link href="/contact" className="btn btn-soft">{t.quote}</Link>
              </div>
            </div>
          </article>
        ) : null}
      </section>

      <section className="catalog-grid mt-12">
        {filteredProducts.length === 0 ? <div className="card p-5 text-slate-600">{t.noPoster}</div> : null}
        {supportingProducts.map((product) => {
          const price = resolvePrice(product);
          const image = resolveImage(product);
          return (
            <article key={product.product_id} className="catalog-card">
              {image ? (
                <img src={image} alt={product.product_name} className="catalog-card-image" />
              ) : (
                <div className="grid h-72 place-items-center bg-gradient-to-br from-[#dde8f7] to-[#f4e7d5] text-sm text-slate-600">{t.noImage}</div>
              )}
              <div className="catalog-card-copy">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">{product.category}</p>
                    <h2 className="page-reference-subtitle mt-2 text-[#112742]">{product.product_name}</h2>
                  </div>
                  <p className="rounded-full bg-[#102949] px-3 py-1 text-sm font-semibold text-white">${price}</p>
                </div>
                <p className="page-reference-body mt-2 text-[#5d6e89]">{product.fabric}</p>
                <p className="page-reference-body mt-3 text-[#4f607d]">{product.description}</p>
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

