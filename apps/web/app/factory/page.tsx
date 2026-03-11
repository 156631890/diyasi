import Link from "next/link";

import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

type MediaAsset = {
  id: number;
  title: string;
  image_url: string;
};

type Article = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
};

const fallbackFactoryImages: MediaAsset[] = [
  {
    id: -1,
    title: "Factory Capability Panorama",
    image_url: "/media/generated/factory-capability-panorama.png"
  },
  {
    id: -2,
    title: "Quality Check Fabric Detail",
    image_url: "/media/generated/factory/quality-check-fabric-detail.png"
  },
  {
    id: -3,
    title: "Seamless Machine Detail",
    image_url: "/media/generated/factory/seamless-machine-detail.png"
  },
  {
    id: -4,
    title: "Inspection and Finishing Table",
    image_url: "/media/generated/factory/inspection-and-finishing-table.png"
  }
];

const factoryWideImage = "/media/generated/wide/factory-wide-production-line.png";

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

async function getFactoryImages(): Promise<MediaAsset[]> {
  const assets = await safeFetchJson<MediaAsset[]>("/media/assets?asset_type=factory&limit=6", []);
  if (assets.length === 0) {
    return fallbackFactoryImages;
  }
  const existingTitles = new Set(assets.map((item) => item.title));
  const extraFallbacks = fallbackFactoryImages.filter((item) => !existingTitles.has(item.title));
  return [...assets, ...extraFallbacks].slice(0, 4);
}

async function getArticles(): Promise<Article[]> {
  return safeFetchJson<Article[]>("/seo/articles", []);
}

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    videoTitle: string;
    videoDesc: string;
    videoCta: string;
    introTitle: string;
    introBody: string;
    gallery: string;
    certificates: string;
    news: string;
    contactTitle: string;
    contactBody: string;
    inquire: string;
    customize: string;
    products: string;
    paidSample: string;
    floorTitle: string;
    complianceTitle: string;
    flowTitle: string;
    linesTitle: string;
    updatesTitle: string;
    infoBar: Array<{ label: string; value: string }>;
    capability: Array<{ label: string; value: string }>;
    customSteps: Array<{ icon: string; title: string; body: string }>;
    certificatesList: Array<{ code: string; title: string; body: string }>;
    noNews: string;
    readMore: string;
  }
> = {
  en: {
    kicker: "Factory",
    title: "Underwear factory capability, compliance, and production overview",
    desc: "Review production lines, quality control, certificates, sample flow, and contact details for OEM / ODM cooperation.",
    videoTitle: "Factory Introduction Video",
    videoDesc: "A full walk-through of the production floor, inspection sequence, and packing line can be shared during inquiry.",
    videoCta: "Request the Video",
    introTitle: "Production setup for sampling and bulk orders",
    introBody: "Our factory supports seamless underwear, bras, and activewear with integrated equipment, inline inspection, and private-label packaging coordination.",
    gallery: "Factory Gallery",
    certificates: "Certificates",
    news: "Recent News",
    contactTitle: "Start an Inquiry",
    contactBody: "Send your category, MOQ range, target market, and launch timing to start sample planning or bulk production discussion.",
    inquire: "Start a Conversation",
    customize: "Customization Flow",
    products: "Main Product Lines",
    paidSample: "Paid Sample",
    floorTitle: "Production floor, machinery, and inspection details",
    complianceTitle: "Compliance, materials, and quality checkpoints",
    flowTitle: "From product brief to shipment",
    linesTitle: "Main product lines for recurring orders",
    updatesTitle: "Recent factory and article updates",
    infoBar: [
      { label: "Sampling", value: "5-7 days" },
      { label: "Bulk Lead Time", value: "20-30 days" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Language", value: "EN / ZH / ES" }
    ],
    capability: [
      { label: "Seamless Machinery", value: "Integrated knitting to finishing" },
      { label: "QC Routine", value: "Inline checks and final inspection" },
      { label: "Packaging Support", value: "Private label pack-out coordination" },
      { label: "Core Scope", value: "Underwear / Bras / Activewear" }
    ],
    customSteps: [
      { icon: "01", title: "Style Brief", body: "Confirm category direction, target pricing, and fit references." },
      { icon: "02", title: "Sampling", body: "Translate requirements into a sample round with material and trim checks." },
      { icon: "03", title: "Bulk Planning", body: "Lock colorways, capacity windows, and packaging details before PO." },
      { icon: "04", title: "Shipment", body: "Coordinate inspection, packing, and export timing with a single production rhythm." }
    ],
    certificatesList: [
      { code: "BSCI", title: "Audit Readiness", body: "Factory communication and document flow structured for buyer compliance review." },
      { code: "OEKO", title: "Material Awareness", body: "Comfort, fabric touch, and safer material positioning aligned with brand expectations." },
      { code: "QA", title: "Quality Sequence", body: "Inspection checkpoints built into sampling, bulk production, and final packing." },
      { code: "OEM", title: "Private Label Execution", body: "Support for labels, packaging, and customized production briefs." }
    ],
    noNews: "No recent news yet.",
    readMore: "Read More"
  },
  zh: {
    kicker: "工厂",
    title: "内衣工厂能力、合规资质与生产概览",
    desc: "查看生产线、质量控制、证书资质、打样流程，以及 OEM / ODM 合作联系信息。",
    videoTitle: "工厂介绍视频",
    videoDesc: "生产车间、检验流程和包装线介绍视频可在询盘后按需提供。",
    videoCta: "索取视频",
    introTitle: "支持打样与大货订单的生产体系",
    introBody: "工厂覆盖内衣、文胸和运动系列，具备一体化设备、在线检验和品牌包装配合能力。",
    gallery: "工厂展示",
    certificates: "证书展示",
    news: "最新动态",
    contactTitle: "提交询盘",
    contactBody: "发送品类、MOQ 区间、目标市场和上市时间，开始打样或大货生产沟通。",
    inquire: "开始沟通",
    customize: "定制流程",
    products: "主要产品线",
    paidSample: "付费打样",
    floorTitle: "生产车间、设备与检验细节",
    complianceTitle: "合规资质、材料标准与质量节点",
    flowTitle: "从产品 brief 到出货",
    linesTitle: "适合长期复购的核心产品线",
    updatesTitle: "最新工厂与文章动态",
    infoBar: [
      { label: "打样", value: "5-7 天" },
      { label: "大货周期", value: "20-30 天" },
      { label: "MOQ", value: "300-500 件" },
      { label: "语言", value: "中 / 英 / 西" }
    ],
    capability: [
      { label: "无缝设备", value: "从织造到后整的一体化流程" },
      { label: "质检流程", value: "在线检查与尾检并行" },
      { label: "包装支持", value: "支持品牌包装与 pack-out 配合" },
      { label: "核心范围", value: "内衣 / 文胸 / 运动系列" }
    ],
    customSteps: [
      { icon: "01", title: "产品 Brief", body: "确认品类方向、目标价位和版型参考。" },
      { icon: "02", title: "打样安排", body: "根据需求推进样衣开发，并同步面料和辅料确认。" },
      { icon: "03", title: "大货计划", body: "在下单前锁定颜色、产能窗口和包装细节。" },
      { icon: "04", title: "出货执行", body: "统一衔接检验、包装和出运安排。" }
    ],
    certificatesList: [
      { code: "BSCI", title: "审核准备", body: "配合买家合规审核所需的沟通与文件支持。" },
      { code: "OEKO", title: "材料标准", body: "围绕舒适度、手感和材料定位提供清晰方案。" },
      { code: "QA", title: "质量节点", body: "在打样、大货和包装环节设置质量检查点。" },
      { code: "OEM", title: "品牌定制", body: "支持洗标、包装和定制化生产 brief 执行。" }
    ],
    noNews: "暂时还没有最新动态。",
    readMore: "阅读更多"
  },
  es: {
    kicker: "Fabrica",
    title: "Capacidad de fabrica, compliance y produccion de ropa interior",
    desc: "Revisa lineas de produccion, control de calidad, certificados, flujo de muestra y contacto para cooperacion OEM / ODM.",
    videoTitle: "Video de Introduccion de Fabrica",
    videoDesc: "El recorrido completo por planta, inspeccion y empaque puede compartirse durante la consulta.",
    videoCta: "Solicitar Video",
    introTitle: "Estructura productiva para muestras y pedidos bulk",
    introBody: "La fabrica trabaja underwear, bras y activewear con equipo integrado, inspeccion en linea y coordinacion de empaque private-label.",
    gallery: "Galeria de Fabrica",
    certificates: "Certificados",
    news: "Noticias Recientes",
    contactTitle: "Iniciar Consulta",
    contactBody: "Envia categoria, MOQ, mercado objetivo y timing de lanzamiento para iniciar muestra o conversacion de produccion bulk.",
    inquire: "Iniciar Conversacion",
    customize: "Flujo de Personalizacion",
    products: "Lineas Principales",
    paidSample: "Muestra Pagada",
    floorTitle: "Piso de produccion, maquinaria y detalles de inspeccion",
    complianceTitle: "Compliance, materiales y puntos de calidad",
    flowTitle: "Del brief de producto al envio",
    linesTitle: "Lineas principales para pedidos recurrentes",
    updatesTitle: "Actualizaciones de fabrica y articulos",
    infoBar: [
      { label: "Muestra", value: "5-7 dias" },
      { label: "Produccion", value: "20-30 dias" },
      { label: "MOQ", value: "300-500 pcs" },
      { label: "Idioma", value: "EN / ZH / ES" }
    ],
    capability: [
      { label: "Maquinaria Seamless", value: "Del tejido al acabado en un flujo integrado" },
      { label: "Rutina QC", value: "Revisiones en linea e inspeccion final" },
      { label: "Packaging", value: "Coordinacion de pack-out para marca privada" },
      { label: "Alcance", value: "Underwear / Bras / Activewear" }
    ],
    customSteps: [
      { icon: "01", title: "Brief de Estilo", body: "Definir categoria, rango de precio objetivo y referencias de fit." },
      { icon: "02", title: "Muestreo", body: "Convertir el requerimiento en muestra con control de material y trims." },
      { icon: "03", title: "Plan de Produccion", body: "Cerrar colorways, capacidad y detalles de empaque antes del PO." },
      { icon: "04", title: "Envio", body: "Coordinar inspeccion, packing y salida con un mismo ritmo productivo." }
    ],
    certificatesList: [
      { code: "BSCI", title: "Preparacion de Auditoria", body: "Comunicacion de fabrica y documentos listos para revisiones de compliance." },
      { code: "OEKO", title: "Criterio de Material", body: "Comodidad, tacto y posicionamiento de material alineados con la marca." },
      { code: "QA", title: "Secuencia de Calidad", body: "Puntos de inspeccion incorporados a muestra, bulk y empaque final." },
      { code: "OEM", title: "Ejecucion Private Label", body: "Soporte para etiquetas, empaque y briefs de produccion personalizados." }
    ],
    noNews: "Aun no hay noticias recientes.",
    readMore: "Leer Mas"
  }
};

export default async function FactoryPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [images, articles] = await Promise.all([getFactoryImages(), getArticles()]);
  const recentArticles = articles.slice(0, 3);

  return (
    <main className="container-shell py-10">
      <section className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
        <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.kicker}</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
        <p className="page-reference-body mt-3 max-w-3xl text-[#cfdbef]">{t.desc}</p>
      </section>

      <section className="factory-story-shell mt-10">
        <div className="factory-video-panel">
          <div className="factory-video-cover">
            <img src={factoryWideImage} alt={t.videoTitle} className="factory-video-image" />
            <div className="factory-video-overlay">
              <div className="factory-video-play">Play</div>
              <div>
                <p className="page-reference-subtitle text-white">{t.videoTitle}</p>
                <p className="page-reference-body mt-2 max-w-xl text-white/85">{t.videoDesc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="factory-story-copy">
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <h2 className="page-reference-subtitle mt-3 text-[#122744]">{t.introTitle}</h2>
          <p className="page-reference-body mt-4 text-[#53637c]">{t.introBody}</p>
          <div className="factory-capability-grid mt-8">
            {t.capability.map((item) => (
              <article key={item.label} className="factory-capability-card">
                <p className="factory-capability-label">{item.label}</p>
                <p className="page-reference-body mt-2 text-[#253753]">{item.value}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/contact" className="btn btn-primary">
              {t.videoCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.gallery}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">{t.floorTitle}</h2>
        </div>
        <div className="factory-detail-grid mt-6">
          {images.map((img) => (
            <article key={img.id} className="factory-detail-card">
              <img src={img.image_url} alt={img.title} className="factory-detail-image" />
              <div className="factory-detail-caption">
                <p className="page-reference-body text-white">{img.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.certificates}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">{t.complianceTitle}</h2>
        </div>
        <div className="factory-cert-grid mt-6">
          {t.certificatesList.map((item) => (
            <article key={item.code} className="factory-cert-card">
              <div className="factory-cert-code">{item.code}</div>
              <h3 className="page-reference-subtitle mt-4 text-[#122744]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#5b6b84]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.customize}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">{t.flowTitle}</h2>
        </div>
        <div className="factory-custom-grid mt-6">
          {t.customSteps.map((item) => (
            <article key={item.icon} className="factory-custom-card">
              <div className="factory-custom-icon">{item.icon}</div>
              <h3 className="page-reference-subtitle mt-4 text-[#122744]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#566880]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.products}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">{t.linesTitle}</h2>
        </div>
        <div className="factory-product-rows mt-6">
          {featuredShowcase.map((item) => (
            <Link key={item.title} href={item.link} className="factory-product-tile">
              <img src={item.image} alt={item.title} className="factory-product-image" />
              <div className="factory-product-caption">
                <p className="page-reference-subtitle text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.news}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">{t.updatesTitle}</h2>
        </div>
        <div className="factory-news-grid mt-6">
          {recentArticles.length === 0 ? (
            <div className="card p-6 text-[#53637c]">{t.noNews}</div>
          ) : null}
          {recentArticles.map((article) => (
            <article key={article.slug} className="factory-news-card">
              <p className="factory-news-category">{article.category}</p>
              <h3 className="page-reference-subtitle mt-3 text-[#122744]">{article.title}</h3>
              <p className="page-reference-body mt-3 text-[#566880]">{article.excerpt}</p>
              <div className="mt-5">
                <Link href={`/blog/${article.slug}`} className="btn btn-soft">
                  {t.readMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="factory-cta-band mt-12">
        <div>
          <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.contactTitle}</p>
          <h2 className="page-reference-subtitle mt-3 text-white">{t.contactTitle}</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-white/82">{t.contactBody}</p>
        </div>
        <div className="factory-cta-actions">
          <Link href="/contact" className="btn btn-primary">
            {t.inquire}
          </Link>
          <Link href="/payments" className="btn factory-cta-secondary">
            {t.paidSample}
          </Link>
        </div>
      </section>

      <section className="factory-info-bar mt-8">
        {t.infoBar.map((item) => (
          <article key={item.label} className="factory-info-item">
            <p className="factory-info-label">{item.label}</p>
            <p className="page-reference-subtitle mt-2 text-[#122744]">{item.value}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
