import Link from "next/link";
import { API_BASE } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

type MediaAsset = {
  id: number;
  asset_type: string;
  title: string;
  image_url: string;
};

type ProductCategory = {
  category: string;
  count: number;
};

const copy: Record<
  SiteLang,
  {
    heroKicker: string;
    heroTitle: string;
    heroDesc: string;
    ctaProducts: string;
    ctaContact: string;
    posterKicker: string;
    posterTitle: string;
    posterDesc: string;
    posterBtn: string;
    noPoster: string;
    catKicker: string;
    catTitle: string;
    catDesc: string;
  }
> = {
  en: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Premium sustainable underwear manufacturing for global brands",
    heroDesc:
      "Founded on the belief that sustainability and high-quality manufacturing go hand in hand, we have spent 23+ years helping brands bring their dream underwear lines to market.",
    ctaProducts: "Browse Product Categories",
    ctaContact: "Discuss Your Project",
    posterKicker: "Brand Creative",
    posterTitle: "Campaign visuals built for premium positioning",
    posterDesc:
      "From hero banners to product posters, your website visuals are managed in one system and aligned with your brand story.",
    posterBtn: "Open Media Library",
    noPoster: "No featured visuals yet. Generate and set featured assets in Admin.",
    catKicker: "Product Navigation",
    catTitle: "Category-first experience for faster buyer decisions",
    catDesc:
      "Help international buyers quickly find target categories, evaluate options, and move from sampling to bulk production."
  },
  zh: {
    heroKicker: "义乌迪亚斯服饰有限公司",
    heroTitle: "面向全球品牌的高端可持续内衣制造伙伴",
    heroDesc:
      "我们始终相信可持续与高品质制造可以并行发展。23+ 年来，迪亚斯持续帮助品牌将理想内衣产品线从概念落地到稳定交付。",
    ctaProducts: "查看产品分类",
    ctaContact: "洽谈合作项目",
    posterKicker: "品牌视觉",
    posterTitle: "服务高端定位的官网视觉系统",
    posterDesc: "从首页主视觉到产品海报，所有素材统一管理并围绕品牌叙事持续更新。",
    posterBtn: "进入素材库",
    noPoster: "暂无精选视觉，请在后台生成并设为精选素材。",
    catKicker: "产品导航",
    catTitle: "以分类为核心，缩短买家决策路径",
    catDesc: "让海外买家快速进入目标品类，清晰比较方案，并顺畅推进打样与大货合作。"
  },
  es: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Manufactura premium y sostenible de ropa interior para marcas globales",
    heroDesc:
      "Con la conviccion de que sostenibilidad y calidad deben avanzar juntas, llevamos mas de 23 anos ayudando a marcas a lanzar y escalar sus lineas de ropa interior.",
    ctaProducts: "Ver Categorias",
    ctaContact: "Hablar del Proyecto",
    posterKicker: "Creatividad de Marca",
    posterTitle: "Visuales de campana para una posicion premium",
    posterDesc:
      "Desde banners principales hasta posters de producto, toda la creatividad se gestiona en un solo sistema alineado a tu historia de marca.",
    posterBtn: "Abrir Biblioteca Media",
    noPoster: "Aun no hay visuales destacados. Configuralos desde Admin.",
    catKicker: "Navegacion de Producto",
    catTitle: "Estructura por categorias para decidir mas rapido",
    catDesc:
      "Permite a compradores internacionales encontrar su categoria objetivo, comparar opciones y avanzar de muestra a produccion masiva."
  }
};

async function getFeaturedPosters(): Promise<MediaAsset[]> {
  const response = await fetch(`${API_BASE}/media/assets?only_active=true&only_featured=true&limit=6`, {
    cache: "no-store"
  });
  if (!response.ok) {
    return [];
  }
  const rows = (await response.json()) as MediaAsset[];
  return rows.filter((item) => item.asset_type === "poster" || item.asset_type === "hero_banner").slice(0, 3);
}

async function getCategories(): Promise<ProductCategory[]> {
  const response = await fetch(`${API_BASE}/products/categories`, { cache: "no-store" });
  if (!response.ok) {
    return [];
  }
  return response.json();
}

export default async function HomePage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [posters, categories] = await Promise.all([getFeaturedPosters(), getCategories()]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YiWu DiYaSi Dress CO., LTD",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description: "Premium sustainable underwear manufacturing partner.",
    areaServed: "Worldwide",
    knowsLanguage: ["en", "zh", "es"]
  };

  return (
    <main className="pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <section className="container-shell pt-10 lg:pt-14">
        <div className="hero-panel p-7 md:p-10 lg:p-14">
          <p className="kicker">{t.heroKicker}</p>
          <h1 className="section-title mt-4 text-[#0f2038]">{t.heroTitle}</h1>
          <p className="mt-5 max-w-3xl text-[1.04rem] leading-8 text-[#44546d]">{t.heroDesc}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              {t.ctaProducts}
            </Link>
            <Link href="/contact" className="btn btn-soft">
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell mt-12">
        <div className="card p-7 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">{t.posterKicker}</p>
              <h2 className="heading-font mt-2 text-4xl font-semibold text-[#11253f]">{t.posterTitle}</h2>
              <p className="mt-2 text-[#51627d]">{t.posterDesc}</p>
            </div>
            <Link href="/admin" className="btn btn-soft">
              {t.posterBtn}
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {posters.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 md:col-span-3">
                {t.noPoster}
              </div>
            ) : (
              posters.map((asset) => (
                <article key={asset.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2">
                  <img src={asset.image_url} alt={asset.title} className="h-72 w-full rounded-2xl object-cover" />
                  <p className="mt-3 px-2 text-sm font-semibold text-[#1c2d4b]">{asset.title}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="container-shell mt-12">
        <div className="dark-band card p-7 md:p-10">
          <p className="kicker text-[#f3d7a1]">{t.catKicker}</p>
          <h2 className="heading-font mt-2 text-4xl font-semibold">{t.catTitle}</h2>
          <p className="mt-2 text-[#cfdbef]">{t.catDesc}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link
                key={item.category}
                href={`/products?category=${encodeURIComponent(item.category)}`}
                className="rounded-full border border-white/35 px-4 py-2 text-sm text-white/90 transition hover:bg-white/15"
              >
                {item.category} ({item.count})
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
