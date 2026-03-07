import Link from "next/link";
import { safeFetchJson } from "@/lib/api";
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

type Metric = {
  value: string;
  label: string;
};

const fallbackPosters: MediaAsset[] = [
  {
    id: -1,
    asset_type: "hero_banner",
    title: "Material Confidence Hero",
    image_url: "/media/generated/hero-material-confidence.png"
  },
  {
    id: -2,
    asset_type: "poster",
    title: "Premium Collection Showroom",
    image_url: "/media/generated/poster-premium-collection.png"
  },
  {
    id: -3,
    asset_type: "factory",
    title: "Factory Capability Panorama",
    image_url: "/media/generated/factory-capability-panorama.png"
  }
];

const copy: Record<
  SiteLang,
  {
    heroKicker: string;
    heroTitle: string;
    heroDesc: string;
    ctaProducts: string;
    ctaContact: string;
    storyKicker: string;
    storyTitle: string;
    storyDesc: string;
    storyBtn: string;
    noPoster: string;
    catKicker: string;
    catTitle: string;
    catDesc: string;
    noCategory: string;
    metrics: Metric[];
  }
> = {
  en: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Premium underwear manufacturing for brands that value consistency, clarity, and quiet confidence",
    heroDesc:
      "We support underwear and activewear brands from concept and sampling through stable bulk production, with stronger quality discipline, cleaner execution, and a more premium product presentation from the start.",
    ctaProducts: "View Categories",
    ctaContact: "Start a Conversation",
    storyKicker: "Brand Visual Direction",
    storyTitle: "A calmer, more premium front door for serious buyers",
    storyDesc:
      "Visual systems, category structure, and launch materials should communicate substance before a single email is exchanged.",
    storyBtn: "View Media",
    noPoster: "No featured visuals yet. Generate and set featured assets in Admin.",
    catKicker: "Product Navigation",
    catTitle: "Large categories, clearer choices, faster sourcing decisions",
    catDesc:
      "Buyers should not dig through small cards. They should understand your strongest categories at a glance and move quickly into discussion.",
    noCategory: "No categories available yet.",
    metrics: [
      { value: "23+", label: "years of manufacturing experience" },
      { value: "5-7", label: "days for first sample development" },
      { value: "300-500", label: "pcs MOQ per style and color" },
      { value: "20-30", label: "days for bulk production window" }
    ]
  },
  zh: {
    heroKicker: "义乌迪雅斯服饰有限公司",
    heroTitle: "面向重视稳定、清晰与品牌质感客户的高端内衣制造体系",
    heroDesc:
      "我们帮助内衣与运动服品牌从概念、打样走向稳定量产，以更克制的执行、更可靠的品质控制和更成熟的产品呈现支持品牌成长。",
    ctaProducts: "查看分类",
    ctaContact: "开始沟通",
    storyKicker: "品牌视觉方向",
    storyTitle: "让官网更像品牌展厅，而不是信息堆叠",
    storyDesc:
      "主视觉、分类结构与品牌叙事应当在第一次联系之前，就传达出品质感与制造信心。",
    storyBtn: "查看素材",
    noPoster: "暂时还没有精选视觉素材，请在后台生成并设为精选。",
    catKicker: "产品导航",
    catTitle: "更大的分类结构，更清晰的选择路径",
    catDesc: "采购方不应该在很多小卡片里来回寻找，而应该一眼看到你的核心品类，并快速进入沟通。",
    noCategory: "暂时还没有可展示的分类。",
    metrics: [
      { value: "23+", label: "年制造经验" },
      { value: "5-7", label: "天完成首轮打样" },
      { value: "300-500", label: "件起订量区间" },
      { value: "20-30", label: "天大货交付周期" }
    ]
  },
  es: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Manufactura premium y sostenible de ropa interior para marcas globales",
    heroDesc:
      "Acompanamos a marcas de underwear y activewear desde concepto y muestra hasta produccion masiva estable, con ejecucion mas limpia, mejor control de calidad y una presentacion de producto mas premium.",
    ctaProducts: "Ver Categorias",
    ctaContact: "Iniciar Conversacion",
    storyKicker: "Direccion Visual de Marca",
    storyTitle: "Una entrada mas serena y premium para compradores serios",
    storyDesc:
      "Los visuales, la estructura por categorias y la narrativa de marca deben comunicar solidez antes del primer correo.",
    storyBtn: "Ver Media",
    noPoster: "Aun no hay visuales destacados. Configuralos desde Admin.",
    catKicker: "Navegacion de Producto",
    catTitle: "Categorias grandes, decisiones mas claras, sourcing mas rapido",
    catDesc:
      "Los compradores no deberian navegar entre pequenas tarjetas. Deben entender las categorias fuertes de inmediato y avanzar a conversacion.",
    noCategory: "Aun no hay categorias disponibles.",
    metrics: [
      { value: "23+", label: "anos de experiencia productiva" },
      { value: "5-7", label: "dias para primera muestra" },
      { value: "300-500", label: "pcs MOQ por estilo y color" },
      { value: "20-30", label: "dias para produccion masiva" }
    ]
  }
};

async function getFeaturedPosters(): Promise<MediaAsset[]> {
  const rows = await safeFetchJson<MediaAsset[]>("/media/assets?only_active=true&only_featured=true&limit=6", []);
  const filtered = rows.filter((item) => item.asset_type === "poster" || item.asset_type === "hero_banner").slice(0, 3);
  return filtered.length > 0 ? filtered : fallbackPosters;
}

async function getCategories(): Promise<ProductCategory[]> {
  return safeFetchJson<ProductCategory[]>("/products/categories", []);
}

export default async function HomePage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [posters, categories] = await Promise.all([getFeaturedPosters(), getCategories()]);
  const heroPoster = posters[0] || null;
  const sidePosters = posters.slice(1, 3);

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
    <main className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <section className="container-shell pt-10 lg:pt-14">
        <div className="hero-panel overflow-hidden px-7 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="kicker">{t.heroKicker}</p>
              <h1 className="section-title mt-4 max-w-4xl text-[#0f2038]">{t.heroTitle}</h1>
              <p className="mt-6 max-w-3xl text-[1.05rem] leading-8 text-[#44546d]">{t.heroDesc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary">
                  {t.ctaProducts}
                </Link>
                <Link href="/contact" className="btn btn-soft">
                  {t.ctaContact}
                </Link>
              </div>
            </div>

            <div className="home-gallery">
              {heroPoster ? (
                <img src={heroPoster.image_url} alt={heroPoster.title} className="home-gallery-main" />
              ) : (
                <div className="home-gallery-fallback">{t.noPoster}</div>
              )}
              <div className="home-gallery-stack">
                {sidePosters.length > 0 ? (
                  sidePosters.map((asset) => (
                    <img key={asset.id} src={asset.image_url} alt={asset.title} className="home-gallery-side" />
                  ))
                ) : (
                  <div className="home-gallery-note">{t.noPoster}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10">
        <div className="stat-band">
          {t.metrics.map((metric) => (
            <article key={metric.label} className="stat-band-item">
              <p className="metric-num">{metric.value}</p>
              <p className="mt-2 max-w-[14rem] text-sm uppercase tracking-[0.18em] text-[#5d6e89]">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell mt-14">
        <div className="editorial-strip border-b-0 pt-0">
          <div>
            <p className="kicker">{t.storyKicker}</p>
            <h2 className="heading-font mt-2 text-4xl font-semibold text-[#11253f] md:text-5xl">{t.storyTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#51627d]">{t.storyDesc}</p>
          </div>
          <Link href="/admin" className="btn btn-soft">
            {t.storyBtn}
          </Link>
        </div>
      </section>

      <section className="container-shell mt-8">
        {posters.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 px-6 py-8 text-sm text-slate-500">{t.noPoster}</div>
        ) : (
          <div className="split-gallery">
            {posters.map((asset) => (
              <article key={asset.id} className="split-gallery-item">
                <img src={asset.image_url} alt={asset.title} className="h-full w-full object-cover" />
                <div className="split-gallery-caption">
                  <p>{asset.title}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="container-shell mt-14">
        <div className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
          <p className="kicker text-[#f3d7a1]">{t.catKicker}</p>
          <h2 className="heading-font mt-2 max-w-4xl text-4xl font-semibold md:text-5xl">{t.catTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#cfdbef]">{t.catDesc}</p>
          <div className="category-rows mt-8">
            {categories.length === 0 ? (
              <div className="text-sm text-white/70">{t.noCategory}</div>
            ) : (
              categories.map((item) => (
                <Link key={item.category} href={`/products?category=${encodeURIComponent(item.category)}`} className="category-row">
                  <span>{item.category}</span>
                  <span>{item.count}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
