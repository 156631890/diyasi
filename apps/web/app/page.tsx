import Link from "next/link";

import HomeProductCarousel from "@/components/HomeProductCarousel";
import { safeFetchJson } from "@/lib/api";
import { fallbackCatalogCategories } from "@/lib/catalog";
import { getCatalogProducts } from "@/lib/catalog-source";
import { SiteLang } from "@/lib/i18n";
import { resolveDisplayTitle, resolvePrimaryImage, topFamily, type DisplayProduct } from "@/lib/product-display";
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

type FeaturedProduct = {
  title: string;
  image: string;
  link: string;
};

function resolveHomeProductTitle(product: DisplayProduct): string {
  const family = topFamily(product.category);

  if (family === "Women's Panties") {
    return "Women's Panties";
  }
  if (family === "Bras") {
    return "Bras";
  }
  if (family === "Men's Underwear") {
    return "Men's Underwear";
  }
  if (family === "Activewear") {
    return "Activewear";
  }

  return resolveDisplayTitle(product)
    .replace(/\b(?:women's|womens|men's|mens)\b/gi, "")
    .replace(/\b(?:underwear|panties|bra|bras|activewear|wear)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

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
    contactTitle: string;
    contactBody: string;
    inquire: string;
    paidSample: string;
    infoBar: Array<{ label: string; value: string }>;
    categoryTitle: string;
    categoryDesc: string;
    noCategory: string;
    galleryTitle: string;
    certificatesTitle: string;
    customizeTitle: string;
  }
> = {
  en: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Private-label underwear manufacturing for wholesalers, retailers, and DTC brands",
    heroDesc:
      "We produce underwear, bras, and activewear for wholesale programs, retail collections, and DTC brands with clear sampling, MOQ, and delivery planning.",
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
      "YiWu DiYaSi combines seamless production, inline quality control, and private-label packaging support for repeat wholesale, retail, and DTC orders.",
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
    productsDesc: "Carousel highlights that keep the commercial focus readable.",
    contactTitle: "Move from review to inquiry",
    contactBody: "If you are a wholesaler, retailer, or DTC team with a target category, MOQ, and launch timing, we can move the first exchange directly into a useful production brief.",
    inquire: "Start a Conversation",
    paidSample: "Paid Sample",
    infoBar: [
      { label: "Sampling", value: "5-7 days" },
      { label: "Bulk Lead Time", value: "20-30 days" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Language", value: "EN / ZH / ES" }
    ],
    categoryTitle: "Large categories. Clearer choices.",
    categoryDesc: "Browse core product lines for women, men, bras, and activewear programs.",
    noCategory: "No categories available yet.",
    galleryTitle: "Production floor and detail views",
    certificatesTitle: "Trust markers buyers look for early",
    customizeTitle: "From concept to shipment in a readable sequence"
  },
  zh: {
    heroKicker: "义乌迪雅斯服饰有限公司",
    heroTitle: "服务批发、零售与 DTC 品牌的 private-label 内衣制造",
    heroDesc: "我们生产内衣、文胸和运动系列，支持批发项目、零售系列与 DTC 品牌的打样、定制和稳定交付。",
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
    factoryTitle: "工厂能力、产品范围与合作流程一页看清",
    factoryDesc: "迪雅斯提供无缝生产、在线质检、品牌包装配合与 OEM / ODM 执行，适合需要稳定复购和清晰交期的客户。",
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
    productsDesc: "用轮播展示核心系列，首页节奏更清晰。",
    contactTitle: "从浏览进入询盘",
    contactBody: "如果你是批发商、零售商或 DTC 品牌，并且已经明确品类、MOQ 区间和上市时间，我们可以把第一次沟通直接推进成有效 production brief。",
    inquire: "开始沟通",
    paidSample: "付费打样",
    infoBar: [
      { label: "打样", value: "5-7 天" },
      { label: "大货周期", value: "20-30 天" },
      { label: "MOQ", value: "300-500 件" },
      { label: "语言", value: "中 / 英 / 西" }
    ],
    categoryTitle: "把核心分类直接放在首页",
    categoryDesc: "直接查看女士内裤、文胸、男士内裤和运动系列等核心产品分类。",
    noCategory: "暂时还没有可展示的分类。",
    galleryTitle: "生产现场与工艺细节展示",
    certificatesTitle: "买家会优先关注的合作信号",
    customizeTitle: "从概念到出货的完整推进顺序"
  },
  es: {
    heroKicker: "YiWu DiYaSi Dress CO., LTD",
    heroTitle: "Manufactura private-label de ropa interior para mayoristas, retailers y marcas DTC",
    heroDesc: "Producimos underwear, bras y activewear para programas mayoristas, colecciones retail y marcas DTC con muestreo, MOQ y entrega definidos.",
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
    factoryDesc: "YiWu DiYaSi combina produccion seamless, control de calidad en linea y soporte de empaque private-label para pedidos repetibles.",
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
    productsDesc: "Un carrusel limpio para mostrar las lineas clave.",
    contactTitle: "Pasar de revision a consulta",
    contactBody: "Si eres mayorista, retailer o marca DTC y ya conoces tu categoria, MOQ y timing, la primera conversacion puede convertirse en un brief productivo.",
    inquire: "Iniciar Conversacion",
    paidSample: "Muestra Pagada",
    infoBar: [
      { label: "Muestra", value: "5-7 dias" },
      { label: "Produccion", value: "20-30 dias" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Idioma", value: "EN / ZH / ES" }
    ],
    categoryTitle: "Categorias grandes, decisiones mas claras",
    categoryDesc: "Explora categorias principales para mujer, hombre, bras y activewear.",
    noCategory: "Aun no hay categorias disponibles.",
    galleryTitle: "Vistas de planta y detalles de produccion",
    certificatesTitle: "Senales de confianza que el comprador revisa primero",
    customizeTitle: "De concepto a envio en una secuencia clara"
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

async function getFeaturedShowcase(): Promise<FeaturedProduct[]> {
  const products = (await getCatalogProducts()) as DisplayProduct[];
  const targetFamilies = ["Women's Panties", "Bras", "Men's Underwear", "Activewear"];
  const selected = targetFamilies
    .map((family) => products.find((item) => topFamily(item.category) === family))
    .filter((item): item is DisplayProduct => Boolean(item));

  const source = selected.length >= 4 ? selected.slice(0, 4) : products.slice(0, 4);

  return source.map((product) => ({
    title: resolveHomeProductTitle(product),
    image: resolvePrimaryImage(product),
    link: `/products/${encodeURIComponent(product.product_id)}`
  }));
}

export default async function HomePage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [posters, categories, factoryImages, featuredShowcase] = await Promise.all([
    getFeaturedPosters(),
    getCategories(),
    getFactoryImages(),
    getFeaturedShowcase()
  ]);
  const heroPoster = posters[0] || null;

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

      <section className="pt-6 lg:pt-8">
        <div className="home-reference-banner home-hero-shell">
          {heroPoster ? (
            <img src={heroPoster.image_url} alt={heroPoster.title} className="home-reference-banner-image" />
          ) : (
            <div className="home-reference-banner-fallback">{t.noPoster}</div>
          )}
          <div className="home-reference-banner-overlay" />
          <div className="container-shell home-reference-banner-content">
            <div className="home-hero-grid">
              <div className="home-hero-copy">
                <p className="kicker home-reference-subtitle text-white">{t.heroKicker}</p>
                <h1 className="home-reference-title mt-4 max-w-4xl text-white">{t.heroTitle}</h1>
                <p className="home-reference-body mt-5 max-w-3xl text-white/90">{t.heroDesc}</p>
                <div className="home-reference-actions mt-7">
                  <Link href="/products" className="btn home-hero-btn-primary">
                    {t.ctaProducts}
                  </Link>
                  <Link href="/contact" className="btn home-reference-btn-secondary">
                    {t.ctaContact}
                  </Link>
                </div>
              </div>
              <div className="home-hero-panel">
                <p className="home-hero-panel-kicker">Factory Snapshot</p>
                <div className="home-hero-metric-list">
                  {t.metrics.map((metric) => (
                    <article key={metric.label} className="home-hero-metric">
                      <p className="home-hero-metric-value">{metric.value}</p>
                      <p className="home-hero-metric-label">{metric.label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-plain mt-8">
        <div className="container-shell py-2">
          <div className="home-overview-flow">
            <article className="home-overview-card home-overview-card-large">
              <p className="kicker home-reference-subtitle">{t.factoryKicker}</p>
              <h2 className="home-reference-subtitle mt-2 text-[#5e3120]">{t.factoryTitle}</h2>
              <p className="home-reference-body mt-4 max-w-3xl text-[#7d4f3e]">{t.factoryDesc}</p>
            </article>
            <article className="home-overview-card">
              <p className="home-overview-label">{t.categoryTitle}</p>
              <p className="home-reference-body mt-3 text-[#7d4f3e]">{t.categoryDesc}</p>
            </article>
            <article className="home-overview-card">
              <p className="home-overview-label">{t.contactTitle}</p>
              <p className="home-reference-body mt-3 text-[#7d4f3e]">{t.contactBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-white">
        <div className="home-full-bleed-shell py-12">
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
              <h2 className="factory-home-title mt-3 text-[#6c3827]">{t.factoryTitle}</h2>
              <p className="factory-home-body mt-4 text-[#7d4f3e]">{t.factoryDesc}</p>
              <div className="factory-capability-grid mt-8">
                {t.capability.map((item) => (
                  <article key={item.label} className="factory-capability-card">
                    <p className="factory-capability-label">{item.label}</p>
                    <p className="factory-home-body mt-2 text-[#7d4f3e]">{item.value}</p>
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

      <section className="home-wide-band home-wide-band-soft">
        <div className="home-full-bleed-shell py-12">
          <div className="factory-section-head">
            <p className="kicker page-reference-subtitle">{t.certificates}</p>
            <h2 className="factory-home-title mt-2 text-[#6a3524]">{t.certificatesTitle}</h2>
          </div>
          <div className="home-trust-grid mt-6">
            <div className="home-trust-visual">
              <p className="kicker page-reference-subtitle">{t.gallery}</p>
              <h3 className="factory-home-card-title mt-3 text-[#6a3524]">{t.galleryTitle}</h3>
              <div className="factory-detail-grid mt-5">
                {factoryImages.slice(0, 3).map((img) => (
                  <article key={img.id} className="factory-detail-card">
                    <img src={img.image_url} alt={img.title} className="factory-detail-image" />
                    <div className="factory-detail-caption">
                      <p className="factory-home-body text-white">{img.title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="factory-cert-grid home-trust-cards">
              {t.certificatesList.map((item) => (
                <article key={item.code} className="factory-cert-card">
                  <div className="factory-cert-code">{item.code}</div>
                  <h3 className="factory-home-card-title mt-4 text-[#6a3524]">{item.title}</h3>
                  <p className="factory-home-body mt-3 text-[#7d4f3e]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-white">
        <div className="home-full-bleed-shell py-12">
          <div className="factory-section-head">
            <p className="kicker page-reference-subtitle">{t.customize}</p>
            <h2 className="factory-home-title mt-2 text-[#6a3524]">{t.customizeTitle}</h2>
          </div>
          <div className="factory-custom-grid mt-6">
            {t.customSteps.map((item) => (
              <article key={item.icon} className="factory-custom-card">
                <div className="factory-custom-icon">{item.icon}</div>
                <h3 className="factory-home-card-title mt-4 text-[#6a3524]">{item.title}</h3>
                <p className="factory-home-body mt-3 text-[#7d4f3e]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-plain">
        <div className="home-full-bleed-shell py-12">
          <div className="factory-section-head">
            <p className="kicker page-reference-subtitle">{t.products}</p>
            <h2 className="factory-home-title mt-2 text-[#6a3524]">{t.productsDesc}</h2>
          </div>
          <div className="home-product-flow mt-6">
            <HomeProductCarousel items={featuredShowcase} />
            <div className="home-product-side">
              <div className="home-category-panel rounded-[34px] px-7 py-10 md:px-10">
                <p className="kicker home-reference-subtitle text-[#c36b44]">{t.products}</p>
                <h2 className="home-reference-subtitle mt-2 max-w-4xl text-[#5e3120]">{t.categoryTitle}</h2>
                <p className="home-reference-body mt-4 max-w-3xl text-[#7d4f3e]">{t.categoryDesc}</p>
                <div className="category-rows mt-8">
                  {categories.length === 0 ? (
                    <div className="home-reference-body text-[#7d4f3e]">{t.noCategory}</div>
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
          </div>
        </div>
      </section>

      <section className="home-wide-band home-wide-band-dark">
        <div className="home-full-bleed-shell py-12">
          <div className="factory-cta-band home-cta-band">
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
