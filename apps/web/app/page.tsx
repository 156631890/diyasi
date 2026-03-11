import Link from "next/link";

import { safeFetchJson } from "@/lib/api";
import { fallbackCatalogCategories } from "@/lib/catalog";
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

type Article = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
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

const fallbackFactoryImages: MediaAsset[] = [
  {
    id: -11,
    asset_type: "factory",
    title: "Factory Capability Panorama",
    image_url: "/media/generated/factory-capability-panorama.png"
  },
  {
    id: -12,
    asset_type: "factory",
    title: "Quality Check Fabric Detail",
    image_url: "/media/generated/factory/quality-check-fabric-detail.png"
  },
  {
    id: -13,
    asset_type: "factory",
    title: "Seamless Machine Detail",
    image_url: "/media/generated/factory/seamless-machine-detail.png"
  },
  {
    id: -14,
    asset_type: "factory",
    title: "Inspection and Finishing Table",
    image_url: "/media/generated/factory/inspection-and-finishing-table.png"
  }
];

const featuredShowcase = [
  {
    title: "Women's Seamless Underwear",
    image: "/media/generated/products/seamless-women-brief.png",
    link: "/products?category=Women's%20Panties"
  },
  {
    title: "Supportive Bras",
    image: "/media/generated/products/supportive-sports-bra.png",
    link: "/products?category=Bras"
  },
  {
    title: "Men's Boxer Programs",
    image: "/media/generated/products/men-seamless-boxer.png",
    link: "/products?category=Men%20Underwear"
  },
  {
    title: "Activewear Capsules",
    image: "/media/generated/products/high-waist-yoga-leggings.png",
    link: "/products?category=Gym%20%26%20Sports%20Wear"
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
    noPoster: string;
    metrics: Metric[];
    factoryKicker: string;
    factoryTitle: string;
    factoryDesc: string;
    videoTitle: string;
    videoDesc: string;
    videoCta: string;
    capability: Array<{ label: string; value: string }>;
    gallery: string;
    certificates: string;
    certificatesList: Array<{ code: string; title: string; body: string }>;
    customize: string;
    customSteps: Array<{ icon: string; title: string; body: string }>;
    products: string;
    productsDesc: string;
    news: string;
    noNews: string;
    readMore: string;
    contactTitle: string;
    contactBody: string;
    inquire: string;
    paidSample: string;
    infoBar: Array<{ label: string; value: string }>;
    categoryTitle: string;
    categoryDesc: string;
    noCategory: string;
  }
> = {
  en: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Factory strength, category clarity, and brand-ready execution in one homepage",
    heroDesc:
      "The homepage should already tell buyers how you produce, what you sell, how you customize, and how quickly they can move into a useful inquiry.",
    ctaProducts: "View Categories",
    ctaContact: "Start a Conversation",
    noPoster: "No featured visuals yet. Generate and set featured assets in Admin.",
    metrics: [
      { value: "23+", label: "years of manufacturing experience" },
      { value: "5-7", label: "days for first sample development" },
      { value: "300-500", label: "pcs MOQ per style and color" },
      { value: "20-30", label: "days for bulk production window" }
    ],
    factoryKicker: "Factory Overview",
    factoryTitle: "The first factory questions, answered early",
    factoryDesc:
      "Instead of splitting brand, factory, and conversion into separate weak pages, the homepage now carries the strongest proof points in one readable flow.",
    videoTitle: "Factory Introduction Video",
    videoDesc: "Production line overview, inspection rhythm, and pack-out sequence can be shared once the inquiry becomes concrete.",
    videoCta: "Request the Video",
    capability: [
      { label: "Seamless Machinery", value: "Integrated knitting to finishing" },
      { label: "QC Routine", value: "Inline checks and final inspection" },
      { label: "Packaging Support", value: "Private label pack-out coordination" },
      { label: "Core Scope", value: "Underwear / Bras / Activewear" }
    ],
    gallery: "Factory Gallery",
    certificates: "Certificates",
    certificatesList: [
      { code: "BSCI", title: "Audit Readiness", body: "Factory communication and document flow structured for buyer compliance review." },
      { code: "OEKO", title: "Material Awareness", body: "Comfort, fabric touch, and safer material positioning aligned with brand expectations." },
      { code: "QA", title: "Quality Sequence", body: "Inspection checkpoints built into sampling, bulk production, and final packing." },
      { code: "OEM", title: "Private Label Execution", body: "Support for labels, packaging, and customized production briefs." }
    ],
    customize: "Customization Flow",
    customSteps: [
      { icon: "01", title: "Style Brief", body: "Confirm category direction, target pricing, and fit references." },
      { icon: "02", title: "Sampling", body: "Translate requirements into a sample round with material and trim checks." },
      { icon: "03", title: "Bulk Planning", body: "Lock colorways, capacity windows, and packaging details before PO." },
      { icon: "04", title: "Shipment", body: "Coordinate inspection, packing, and export timing with a single production rhythm." }
    ],
    products: "Main Product Lines",
    productsDesc: "Two rows that clarify the commercial core.",
    news: "Recent News",
    noNews: "No recent news yet.",
    readMore: "Read More",
    contactTitle: "Move from review to inquiry",
    contactBody: "If you already know your category, MOQ range, and launch timing, we can turn the first exchange into a productive brief instead of a generic introduction.",
    inquire: "Start a Conversation",
    paidSample: "Paid Sample",
    infoBar: [
      { label: "Sampling", value: "5-7 days" },
      { label: "Bulk Lead Time", value: "20-30 days" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Language", value: "EN / ZH / ES" }
    ],
    categoryTitle: "Large categories. Clearer choices.",
    categoryDesc: "Core categories should still be visible on the homepage for buyers who prefer to jump straight into product navigation.",
    noCategory: "No categories available yet."
  },
  zh: {
    heroKicker: "义乌迪雅斯服饰有限公司",
    heroTitle: "把工厂实力、产品结构和转化路径直接放进首页",
    heroDesc:
      "首页就应该让买家看懂你怎么生产、卖什么、如何定制，以及如何快速进入有效询盘。",
    ctaProducts: "查看分类",
    ctaContact: "开始沟通",
    noPoster: "暂时还没有精选视觉素材，请在后台生成并设为精选。",
    metrics: [
      { value: "23+", label: "年制造经验" },
      { value: "5-7", label: "天完成首轮打样" },
      { value: "300-500", label: "件起订量区间" },
      { value: "20-30", label: "天大货交付周期" }
    ],
    factoryKicker: "工厂概览",
    factoryTitle: "首页先回答买家最关心的问题",
    factoryDesc:
      "不再把品牌、工厂和询盘转化拆成弱关联页面，而是在首页里按更清晰的顺序整合起来。",
    videoTitle: "工厂介绍视频",
    videoDesc: "生产线、质检节奏和包装流程的完整视频，可在询盘后按需发送。",
    videoCta: "索取视频",
    capability: [
      { label: "无缝设备", value: "从织造到后整的一体流程" },
      { label: "质检节奏", value: "在线检查与尾检并行" },
      { label: "包装支持", value: "支持品牌包装落地" },
      { label: "核心范围", value: "内衣 / 文胸 / 运动服" }
    ],
    gallery: "工厂展示",
    certificates: "证书展示",
    certificatesList: [
      { code: "BSCI", title: "审核准备", body: "工厂沟通和文件流转可以配合买家合规审核。" },
      { code: "OEKO", title: "材料认知", body: "围绕舒适度、手感和材料定位建立更清晰的表达。" },
      { code: "QA", title: "质量节点", body: "把检查节点放进打样、大货和包装阶段。" },
      { code: "OEM", title: "品牌定制", body: "支持洗标、包装和定制化生产 brief。" }
    ],
    customize: "定制流程",
    customSteps: [
      { icon: "01", title: "款式 Brief", body: "先确认品类方向、目标价位和版型参考。" },
      { icon: "02", title: "打样推进", body: "把需求转成样衣，并同步面料和辅料判断。" },
      { icon: "03", title: "大货计划", body: "在下单前锁定颜色、产能窗口和包装细节。" },
      { icon: "04", title: "出货执行", body: "统一衔接检验、包装与出运节奏。" }
    ],
    products: "主要产品线",
    productsDesc: "用两行重点产品概览，快速说明你的主销方向。",
    news: "最近新闻",
    noNews: "暂时还没有最近新闻。",
    readMore: "阅读更多",
    contactTitle: "从浏览进入询盘",
    contactBody: "如果你已经明确品类、MOQ 区间和上市时间，我们可以把第一次沟通直接推进成有效 brief，而不是泛泛介绍。",
    inquire: "开始沟通",
    paidSample: "付费打样",
    infoBar: [
      { label: "打样", value: "5-7 天" },
      { label: "大货周期", value: "20-30 天" },
      { label: "MOQ", value: "300-500 件" },
      { label: "语言", value: "中 / 英 / 西" }
    ],
    categoryTitle: "把核心分类直接放在首页",
    categoryDesc: "对更偏采购导向的买家来说，首页就应该能直接进入产品分类。",
    noCategory: "暂时还没有可展示的分类。"
  },
  es: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Un inicio que ya muestra fabrica, categorias y conversion",
    heroDesc:
      "La homepage debe explicar desde el principio como produces, que vendes, como personalizas y como puede avanzar el comprador hacia una consulta util.",
    ctaProducts: "Ver Categorias",
    ctaContact: "Iniciar Conversacion",
    noPoster: "Aun no hay visuales destacados. Configuralos desde Admin.",
    metrics: [
      { value: "23+", label: "anos de experiencia productiva" },
      { value: "5-7", label: "dias para primera muestra" },
      { value: "300-500", label: "pcs MOQ por estilo y color" },
      { value: "20-30", label: "dias para produccion masiva" }
    ],
    factoryKicker: "Vision General de Fabrica",
    factoryTitle: "Las primeras preguntas del comprador, resueltas antes",
    factoryDesc:
      "En lugar de separar marca, fabrica y conversion en paginas debiles, el inicio ahora concentra los puntos mas utiles en una sola secuencia.",
    videoTitle: "Video de Introduccion de Fabrica",
    videoDesc: "El recorrido por planta, inspeccion y empaque puede compartirse cuando la consulta ya es concreta.",
    videoCta: "Solicitar Video",
    capability: [
      { label: "Maquinaria Seamless", value: "Del tejido al acabado en un flujo integrado" },
      { label: "Rutina QC", value: "Revisiones en linea e inspeccion final" },
      { label: "Packaging", value: "Coordinacion de pack-out para marca privada" },
      { label: "Alcance", value: "Underwear / Bras / Activewear" }
    ],
    gallery: "Galeria de Fabrica",
    certificates: "Certificados",
    certificatesList: [
      { code: "BSCI", title: "Preparacion de Auditoria", body: "Comunicacion de fabrica y documentos listos para revisiones de compliance." },
      { code: "OEKO", title: "Criterio de Material", body: "Comodidad, tacto y posicionamiento de material alineados con la marca." },
      { code: "QA", title: "Secuencia de Calidad", body: "Puntos de inspeccion incorporados a muestra, bulk y empaque final." },
      { code: "OEM", title: "Ejecucion Private Label", body: "Soporte para etiquetas, empaque y briefs personalizados." }
    ],
    customize: "Flujo de Personalizacion",
    customSteps: [
      { icon: "01", title: "Brief de Estilo", body: "Definir categoria, rango de precio objetivo y referencias de fit." },
      { icon: "02", title: "Muestreo", body: "Convertir el requerimiento en muestra con control de material y trims." },
      { icon: "03", title: "Plan de Produccion", body: "Cerrar colorways, capacidad y detalles de empaque antes del PO." },
      { icon: "04", title: "Envio", body: "Coordinar inspeccion, packing y salida con un mismo ritmo productivo." }
    ],
    products: "Lineas Principales",
    productsDesc: "Dos filas claras para mostrar el nucleo comercial.",
    news: "Noticias Recientes",
    noNews: "Aun no hay noticias recientes.",
    readMore: "Leer Mas",
    contactTitle: "Pasar de revision a consulta",
    contactBody: "Si ya conoces tu categoria, MOQ y timing de lanzamiento, la primera conversacion puede convertirse en un brief util y no en una introduccion generica.",
    inquire: "Iniciar Conversacion",
    paidSample: "Muestra Pagada",
    infoBar: [
      { label: "Muestra", value: "5-7 dias" },
      { label: "Produccion", value: "20-30 dias" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Idioma", value: "EN / ZH / ES" }
    ],
    categoryTitle: "Categorias grandes, decisiones mas claras",
    categoryDesc: "Para compradores mas directos, la homepage debe seguir permitiendo entrar al catalogo desde el primer scroll.",
    noCategory: "Aun no hay categorias disponibles."
  }
};

async function getFeaturedPosters(): Promise<MediaAsset[]> {
  const rows = await safeFetchJson<MediaAsset[]>("/media/assets?only_active=true&only_featured=true&limit=6", []);
  const filtered = rows
    .filter((item) => item.asset_type === "poster" || item.asset_type === "hero_banner")
    .slice(0, 3);
  return filtered.length > 0 ? filtered : fallbackPosters;
}

async function getFactoryImages(): Promise<MediaAsset[]> {
  const assets = await safeFetchJson<MediaAsset[]>("/media/assets?asset_type=factory&limit=6", []);
  if (assets.length === 0) {
    return fallbackFactoryImages;
  }
  const existingTitles = new Set(assets.map((item) => item.title));
  const extraFallbacks = fallbackFactoryImages.filter((item) => !existingTitles.has(item.title));
  return [...assets, ...extraFallbacks].slice(0, 4);
}

async function getCategories(): Promise<ProductCategory[]> {
  return safeFetchJson<ProductCategory[]>("/products/categories", fallbackCatalogCategories);
}

async function getArticles(): Promise<Article[]> {
  return safeFetchJson<Article[]>("/seo/articles", []);
}

export default async function HomePage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [posters, categories, factoryImages, articles] = await Promise.all([
    getFeaturedPosters(),
    getCategories(),
    getFactoryImages(),
    getArticles()
  ]);
  const heroPoster = posters[0] || null;
  const recentArticles = articles.slice(0, 3);

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

      <section className="pt-8 lg:pt-10">
        <div className="home-reference-banner">
          {heroPoster ? (
            <img src={heroPoster.image_url} alt={heroPoster.title} className="home-reference-banner-image" />
          ) : (
            <div className="home-reference-banner-fallback">{t.noPoster}</div>
          )}
          <div className="home-reference-banner-overlay" />
          <div className="container-shell home-reference-banner-content">
            <p className="kicker home-reference-subtitle text-white">{t.heroKicker}</p>
            <h1 className="home-reference-title mt-4 max-w-4xl text-white">{t.heroTitle}</h1>
            <p className="home-reference-body mt-5 max-w-3xl text-white/90">{t.heroDesc}</p>
            <div className="home-reference-actions mt-7">
              <Link href="/products" className="btn bg-white text-[#102949]">
                {t.ctaProducts}
              </Link>
              <Link href="/contact" className="btn home-reference-btn-secondary">
                {t.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-plain mt-10">
        <div className="container-shell py-8">
          <div className="stat-band">
          {t.metrics.map((metric) => (
            <article key={metric.label} className="stat-band-item">
              <p className="metric-num">{metric.value}</p>
              <p className="metric-label mt-2 max-w-[14rem]">{metric.label}</p>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-soft mt-6">
        <div className="container-shell py-8">
          <div className="editorial-strip border-b-0 pt-0">
          <div>
            <p className="kicker home-reference-subtitle">{t.factoryKicker}</p>
            <h2 className="home-reference-subtitle mt-2 text-[#11253f]">{t.factoryTitle}</h2>
            <p className="home-reference-body mt-4 max-w-3xl text-[#51627d]">{t.factoryDesc}</p>
          </div>
          <Link href="/contact" className="btn btn-soft">
            {t.inquire}
          </Link>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-white">
        <div className="home-full-bleed-shell py-10">
          <div className="factory-story-shell">
          <div className="factory-video-panel">
            <div className="factory-video-cover">
              <img
                src="/media/generated/wide/factory-wide-production-line.png"
                alt={t.videoTitle}
                className="factory-video-image"
              />
              <div className="factory-video-overlay">
                <div className="factory-video-play">Play</div>
                <div>
                  <p className="factory-home-title text-white">{t.videoTitle}</p>
                  <p className="factory-home-body mt-2 max-w-xl text-white/85">{t.videoDesc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="factory-story-copy">
            <p className="kicker page-reference-subtitle">{t.factoryKicker}</p>
            <h2 className="factory-home-title mt-3 text-[#122744]">{t.factoryTitle}</h2>
            <p className="factory-home-body mt-4 text-[#53637c]">{t.factoryDesc}</p>
            <div className="factory-capability-grid mt-8">
              {t.capability.map((item) => (
                <article key={item.label} className="factory-capability-card">
                  <p className="factory-capability-label">{item.label}</p>
                  <p className="factory-home-body mt-2 text-[#253753]">{item.value}</p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn btn-primary">
                {t.videoCta}
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-plain">
        <div className="home-full-bleed-shell py-10">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.gallery}</p>
          <h2 className="factory-home-title mt-2 text-[#122744]">Production floor and detail views</h2>
        </div>
        <div className="factory-detail-grid mt-6">
          {factoryImages.map((img) => (
            <article key={img.id} className="factory-detail-card">
              <img src={img.image_url} alt={img.title} className="factory-detail-image" />
              <div className="factory-detail-caption">
                <p className="factory-home-body text-white">{img.title}</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-soft">
        <div className="home-full-bleed-shell py-10">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.certificates}</p>
          <h2 className="factory-home-title mt-2 text-[#122744]">Trust markers buyers look for early</h2>
        </div>
        <div className="factory-cert-grid mt-6">
          {t.certificatesList.map((item) => (
            <article key={item.code} className="factory-cert-card">
              <div className="factory-cert-code">{item.code}</div>
              <h3 className="factory-home-card-title mt-4 text-[#122744]">{item.title}</h3>
              <p className="factory-home-body mt-3 text-[#5b6b84]">{item.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-white">
        <div className="home-full-bleed-shell py-10">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.customize}</p>
          <h2 className="factory-home-title mt-2 text-[#122744]">From concept to shipment in a readable sequence</h2>
        </div>
        <div className="factory-custom-grid mt-6">
          {t.customSteps.map((item) => (
            <article key={item.icon} className="factory-custom-card">
              <div className="factory-custom-icon">{item.icon}</div>
              <h3 className="factory-home-card-title mt-4 text-[#122744]">{item.title}</h3>
              <p className="factory-home-body mt-3 text-[#566880]">{item.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-plain">
        <div className="home-full-bleed-shell py-10">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.products}</p>
          <h2 className="factory-home-title mt-2 text-[#122744]">{t.productsDesc}</h2>
        </div>
        <div className="factory-product-rows mt-6">
          {featuredShowcase.map((item) => (
            <Link key={item.title} href={item.link} className="factory-product-tile">
              <img src={item.image} alt={item.title} className="factory-product-image" />
              <div className="factory-product-caption">
                <p className="factory-home-title text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-dark">
        <div className="container-shell py-8">
        <div className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
          <p className="kicker home-reference-subtitle text-[#f3d7a1]">{t.categoryTitle}</p>
          <h2 className="home-reference-subtitle mt-2 max-w-4xl text-white">{t.categoryTitle}</h2>
          <p className="home-reference-body mt-4 max-w-3xl text-[#cfdbef]">{t.categoryDesc}</p>
          <div className="category-rows mt-8">
            {categories.length === 0 ? (
              <div className="home-reference-body text-white/70">{t.noCategory}</div>
            ) : (
              categories.map((item) => (
                <Link
                  key={item.category}
                  href={`/products?category=${encodeURIComponent(item.category)}`}
                  className="category-row"
                >
                  <span className="home-reference-body">{item.category}</span>
                  <span className="home-reference-body">{item.count}</span>
                </Link>
              ))
            )}
          </div>
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-soft">
        <div className="home-full-bleed-shell py-10">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.news}</p>
          <h2 className="factory-home-title mt-2 text-[#122744]">Recent activity and publishing</h2>
        </div>
        <div className="factory-news-grid mt-6">
          {recentArticles.length === 0 ? (
            <div className="card p-6 text-[#53637c]">{t.noNews}</div>
          ) : null}
          {recentArticles.map((article) => (
            <article key={article.slug} className="factory-news-card">
              <p className="factory-news-category">{article.category}</p>
              <h3 className="factory-home-title mt-3 text-[#122744]">{article.title}</h3>
              <p className="factory-home-body mt-3 text-[#566880]">{article.excerpt}</p>
              <div className="mt-5">
                <Link href={`/blog/${article.slug}`} className="btn btn-soft">
                  {t.readMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-dark">
        <div className="home-full-bleed-shell py-10">
          <div className="factory-cta-band">
          <div>
            <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.contactTitle}</p>
            <h2 className="factory-home-title mt-3 text-white">{t.contactTitle}</h2>
            <p className="factory-home-body mt-3 max-w-2xl text-white/82">{t.contactBody}</p>
          </div>
          <div className="factory-cta-actions">
            <Link href="/contact" className="btn btn-primary">
              {t.inquire}
            </Link>
            <Link href="/payments" className="btn factory-cta-secondary">
              {t.paidSample}
            </Link>
          </div>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-white factory-info-band">
        <div className="home-full-bleed-shell py-0">
          <div className="factory-info-bar">
          {t.infoBar.map((item) => (
            <article key={item.label} className="factory-info-item">
              <p className="factory-info-label">{item.label}</p>
              <p className="factory-info-value mt-2">{item.value}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}


