import Link from "next/link";

import BuyNowButton from "@/components/BuyNowButton";
import { safeFetchJson } from "@/lib/api";
import { fallbackCatalogCategories, fallbackCatalogProducts } from "@/lib/catalog";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

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

const categoryImagePairs: Record<string, [string, string]> = {
  "women's panties": [
    "/media/generated/products/seamless-women-brief.png",
    "/media/generated/products/supportive-sports-bra.png"
  ],
  bras: [
    "/media/generated/products/supportive-sports-bra.png",
    "/media/generated/products/seamless-women-brief.png"
  ],
  thongs: [
    "/media/generated/products/seamless-women-brief.png",
    "/media/generated/products/high-waist-yoga-leggings.png"
  ],
  "men underwear": [
    "/media/generated/products/men-seamless-boxer.png",
    "/media/generated/products/high-waist-yoga-leggings.png"
  ],
  "gym & sports wear": [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/supportive-sports-bra.png"
  ],
  "home wear": [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/seamless-women-brief.png"
  ],
  "socks & hosiery": [
    "/media/generated/products/men-seamless-boxer.png",
    "/media/generated/products/supportive-sports-bra.png"
  ],
  "base layers": [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/men-seamless-boxer.png"
  ],
  shorts: [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/seamless-women-brief.png"
  ]
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
    paidSample: string;
    items: string;
    viewDetails: string;
  }
> = {
  en: {
    kicker: "Product Catalogue",
    title: "Underwear, bras, and activewear catalogue",
    desc: "Browse categories, compare styles, and move directly into inquiry or paid sampling.",
    all: "All",
    noPoster: "No products in this category yet.",
    noImage: "Image coming soon",
    quote: "Start a Conversation",
    paidSample: "Paid Sample",
    items: "items",
    viewDetails: "View Details"
  },
  zh: {
    kicker: "产品目录",
    title: "内衣、文胸与运动系列产品目录",
    desc: "按分类浏览产品，对比款式，并直接进入询盘或付费打样。",
    all: "全部",
    noPoster: "当前分类下暂无产品。",
    noImage: "图片即将更新",
    quote: "开始沟通",
    paidSample: "付费打样",
    items: "款",
    viewDetails: "查看详情"
  },
  es: {
    kicker: "Catalogo de Producto",
    title: "Catalogo de underwear, bras y activewear",
    desc: "Explora categorias, compara estilos y pasa directo a consulta o muestra pagada.",
    all: "Todo",
    noPoster: "Aun no hay productos en esta categoria.",
    noImage: "Imagen pendiente",
    quote: "Iniciar Conversacion",
    paidSample: "Muestra Pagada",
    items: "articulos",
    viewDetails: "Ver Detalle"
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

function resolvePrimaryImage(product: Product): string {
  return (
    product.image_url ||
    fallbackProductImages[product.product_id] ||
    categoryImagePairs[keyCategory(product.category)]?.[0] ||
    ""
  );
}

function resolveHoverImage(product: Product): string {
  return categoryImagePairs[keyCategory(product.category)]?.[1] || resolvePrimaryImage(product);
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
  const filteredProducts = selectedKey
    ? products.filter((item) => keyCategory(item.category) === selectedKey)
    : products;

  return (
    <main className="container-shell py-8 md:py-10">
      <section className="catalog-intro">
        <p className="kicker page-reference-subtitle">{t.kicker}</p>
        <div className="catalog-intro-row">
          <div>
            <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
            <p className="page-reference-body mt-3 max-w-2xl text-[#51627d]">{t.desc}</p>
          </div>
          <div className="catalog-meta">
            <p className="catalog-meta-count">
              {filteredProducts.length} {t.items}
            </p>
            <p className="page-reference-body text-[#687894]">{selectedKey ? selected : t.all}</p>
          </div>
        </div>
      </section>

      <section className="catalog-filter-bar mt-8">
        <div className="catalog-filter-scroll">
          <Link
            href="/products"
            className={`catalog-filter-pill ${selectedKey ? "" : "catalog-filter-pill-active"}`}
          >
            {t.all} ({products.length})
          </Link>
          {categories.map((item) => {
            const active = keyCategory(item.category) === selectedKey;
            return (
              <Link
                key={item.category}
                href={`/products?category=${encodeURIComponent(item.category)}`}
                className={`catalog-filter-pill ${active ? "catalog-filter-pill-active" : ""}`}
              >
                {item.category} ({item.count})
              </Link>
            );
          })}
        </div>
      </section>

      <section className="catalog-toolbar mt-6">
        <p className="catalog-toolbar-text">
          {selectedKey ? selected : t.all} / {filteredProducts.length} {t.items}
        </p>
      </section>

      <section className="catalog-grid-clean mt-6">
        {filteredProducts.length === 0 ? (
          <div className="card p-5 text-slate-600">{t.noPoster}</div>
        ) : null}
        {filteredProducts.map((product) => {
          const price = resolvePrice(product);
          const primaryImage = resolvePrimaryImage(product);
          const hoverImage = resolveHoverImage(product);
          return (
            <article key={product.product_id} className="catalog-card-clean">
              <div className="catalog-card-clean-media">
                {primaryImage ? (
                  <div className="catalog-card-clean-media-stack">
                    <img
                      src={primaryImage}
                      alt={product.product_name}
                      className="catalog-card-clean-image catalog-card-clean-image-primary"
                    />
                    <img
                      src={hoverImage}
                      alt={`${product.product_name} alternate view`}
                      className="catalog-card-clean-image catalog-card-clean-image-secondary"
                    />
                  </div>
                ) : (
                  <div className="catalog-card-clean-fallback">{t.noImage}</div>
                )}
              </div>
              <div className="catalog-card-clean-copy">
                <p className="catalog-card-clean-category">{product.category}</p>
                <h2 className="catalog-card-clean-title">{product.product_name}</h2>
                <p className="catalog-card-clean-fabric">{product.fabric}</p>
                <div className="catalog-card-clean-bottom">
                  <p className="catalog-card-clean-price">${price}</p>
                  <p className="catalog-card-clean-link">{t.viewDetails}</p>
                </div>
                <div className="catalog-card-clean-actions">
                  <BuyNowButton
                    title={`${product.product_name} - ${t.paidSample}`}
                    unitAmountUsd={price}
                  />
                  <Link href="/contact" className="btn btn-soft">
                    {t.quote}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
