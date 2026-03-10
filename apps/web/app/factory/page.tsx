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
    title: "Women’s Seamless Underwear",
    image: "/media/generated/products/seamless-women-brief.png",
    link: "/products?category=Women's%20Panties"
  },
  {
    title: "Supportive Bras",
    image: "/media/generated/products/supportive-sports-bra.png",
    link: "/products?category=Bras"
  },
  {
    title: "Men’s Boxer Programs",
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
    title: "Factory introduction built for brand buyers, not generic traffic",
    desc: "A clearer supplier page covering production capability, quality discipline, certificates, recent updates, and direct inquiry conversion.",
    videoTitle: "Factory Introduction Video",
    videoDesc: "A full walk-through of the production floor, inspection sequence, and packing line can be shared during inquiry.",
    videoCta: "Request the Video",
    introTitle: "Manufacturing discipline that reads clearly before the first call",
    introBody: "We organize the factory story around what buyers actually evaluate: equipment stability, process control, proof of compliance, recent activity, and how quickly a team can move from concept to sample.",
    gallery: "Factory Gallery",
    certificates: "Certificates",
    news: "Recent News",
    contactTitle: "Move from review to inquiry",
    contactBody: "If you already know your category, MOQ range, and launch timing, we can turn the first exchange into a productive brief instead of a generic introduction.",
    inquire: "Start a Conversation",
    customize: "Customization Flow",
    products: "Main Product Lines",
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
    title: "面向品牌买家的工厂介绍页，而不是普通展示页",
    desc: "把生产能力、质量体系、证书背书、近期动态与询盘转化组织到同一条清晰路径中。",
    videoTitle: "工厂介绍视频",
    videoDesc: "生产车间、质检流程与包装线的完整介绍视频，可在询盘后按需发送。",
    videoCta: "索取视频",
    introTitle: "让买家在第一次沟通前就读懂你的制造能力",
    introBody: "页面围绕买家真正关心的内容展开：设备稳定性、流程控制、合规证明、近期动态，以及从开发到打样的执行速度。",
    gallery: "工厂展示",
    certificates: "证书展示",
    news: "最近新闻",
    contactTitle: "从浏览进入询盘",
    contactBody: "如果你已经明确品类、MOQ 区间和上市时间，我们可以把第一次沟通直接推进成有效 brief，而不是泛泛介绍。",
    inquire: "开始沟通",
    customize: "定制流程",
    products: "主要产品线",
    infoBar: [
      { label: "打样", value: "5-7 天" },
      { label: "大货周期", value: "20-30 天" },
      { label: "MOQ", value: "300-500 件" },
      { label: "语言", value: "中 / 英 / 西" }
    ],
    capability: [
      { label: "无缝设备", value: "从织造到后整的一体流程" },
      { label: "质检节奏", value: "在线检查与尾检并行" },
      { label: "包装支持", value: "支持品牌包装落地" },
      { label: "核心范围", value: "内衣 / 文胸 / 运动服" }
    ],
    customSteps: [
      { icon: "01", title: "款式 Brief", body: "先确认品类方向、目标价位和版型参考。" },
      { icon: "02", title: "打样推进", body: "把需求转成样衣，并同步面料和辅料判断。" },
      { icon: "03", title: "大货计划", body: "在下单前锁定颜色、产能窗口和包装细节。" },
      { icon: "04", title: "出货执行", body: "统一衔接检验、包装与出运节奏。" }
    ],
    certificatesList: [
      { code: "BSCI", title: "审核准备", body: "工厂沟通和文件流转可以配合买家合规审核。" },
      { code: "OEKO", title: "材料认知", body: "围绕舒适度、手感和材料定位建立更清晰的表达。" },
      { code: "QA", title: "质量节点", body: "把检查节点放进打样、大货和包装阶段。" },
      { code: "OEM", title: "品牌定制", body: "支持洗标、包装和定制化生产 brief。" }
    ],
    noNews: "暂时还没有最近新闻。",
    readMore: "阅读更多"
  },
  es: {
    kicker: "Fabrica",
    title: "Una presentacion de fabrica pensada para compradores, no para trafico generico",
    desc: "La pagina organiza capacidad productiva, control de calidad, certificados, noticias recientes y conversion a consulta en una sola narrativa clara.",
    videoTitle: "Video de Introduccion de Fabrica",
    videoDesc: "El recorrido completo por planta, inspeccion y empaque puede compartirse durante la consulta.",
    videoCta: "Solicitar Video",
    introTitle: "Una fabrica que puede leerse con claridad antes de la primera llamada",
    introBody: "La estructura responde a lo que un comprador realmente evalua: estabilidad de equipo, control de proceso, respaldo documental, actividad reciente y velocidad para pasar de idea a muestra.",
    gallery: "Galeria de Fabrica",
    certificates: "Certificados",
    news: "Noticias Recientes",
    contactTitle: "Pasar de revision a consulta",
    contactBody: "Si ya conoces tu categoria, MOQ y timing de lanzamiento, la primera conversacion puede convertirse en un brief util y no en una introduccion generica.",
    inquire: "Iniciar Conversacion",
    customize: "Flujo de Personalizacion",
    products: "Lineas Principales",
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
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">Production floor and detail views</h2>
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
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">Trust markers buyers look for early</h2>
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
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">From concept to shipment in a readable sequence</h2>
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
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">Two-row overview of the main selling lines</h2>
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
          <h2 className="page-reference-subtitle mt-2 text-[#122744]">Recent activity and publishing</h2>
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
            Paid Sample
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
