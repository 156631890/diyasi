import type { Metadata } from "next";
import Link from "next/link";

import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";

export const metadata: Metadata = buildMetadata({
  title: "Factory",
  description:
    "Review YiWu DiYaSi factory capability, company overview, certifications, production lines, and OEM / ODM execution flow.",
  path: "/factory"
});

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

type OverviewRow = {
  label: string;
  value: string;
};

type StoryRow = {
  country: string;
  product: string;
  annualVolume: string;
  years: string;
};

const fallbackFactoryImages: MediaAsset[] = [
  { id: -1, title: "Factory Capability Panorama", image_url: "/media/generated/factory-capability-panorama.png" },
  { id: -2, title: "Quality Check Fabric Detail", image_url: "/media/generated/factory/quality-check-fabric-detail.png" },
  { id: -3, title: "Seamless Machine Detail", image_url: "/media/generated/factory/seamless-machine-detail.png" },
  { id: -4, title: "Inspection and Finishing Table", image_url: "/media/generated/factory/inspection-and-finishing-table.png" }
];

const factoryWideImage = "/media/generated/wide/factory-wide-production-line.png";

const featuredShowcase = [
  { title: "Underwear", image: "/media/generated/products/seamless-women-brief.png", link: "/products?category=Women's%20Panties" },
  { title: "Loungewear", image: "/media/generated/products/supportive-sports-bra.png", link: "/products" },
  { title: "Activewear", image: "/media/generated/products/high-waist-yoga-leggings.png", link: "/products?category=Gym%20%26%20Sports%20Wear" },
  { title: "Kids & Maternity Wear", image: "/media/generated/products/men-seamless-boxer.png", link: "/products" }
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
    overviewTitle: string;
    overviewLead: string;
    certificationsTitle: string;
    advantagesTitle: string;
    categoriesTitle: string;
    storiesTitle: string;
    storiesLead: string;
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
    readMore: string;
    noNews: string;
    infoBar: Array<{ label: string; value: string }>;
    capability: Array<{ label: string; value: string }>;
    customSteps: Array<{ icon: string; title: string; body: string }>;
    certificatesList: Array<{ code: string; title: string; body: string }>;
    overviewStats: OverviewRow[];
    certificationsInline: string[];
    advantages: string[];
    categoriesList: string[];
    successStories: StoryRow[];
  }
> = {
  en: {
    kicker: "Factory",
    title: "Premium underwear and loungewear manufacturer since 2002",
    desc: "YiWu DiYaSi Dress CO., LTD supports wholesalers, retailers, and DTC brands with OEM / ODM development, stable production, and global delivery coordination.",
    overviewTitle: "Company Overview",
    overviewLead: "Company profile, operating scale, certifications, and contact details for buyer review.",
    certificationsTitle: "Certifications",
    advantagesTitle: "Advantages",
    categoriesTitle: "Product Categories",
    storiesTitle: "Success Stories",
    storiesLead: "Representative long-term programs across Europe and North America.",
    videoTitle: "Factory Introduction Video",
    videoDesc: "A full walk-through of the production floor, inspection sequence, and packing line can be shared during inquiry.",
    videoCta: "Request the Video",
    introTitle: "Production setup for sampling and bulk orders",
    introBody:
      "Our factory supports underwear, loungewear, activewear, and kids or maternity programs with integrated equipment, inline inspection, and private-label packaging coordination.",
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
    linesTitle: "Product categories for recurring orders",
    updatesTitle: "Recent factory and article updates",
    readMore: "Read More",
    noNews: "No recent news yet.",
    infoBar: [
      { label: "Sampling", value: "5-7 days" },
      { label: "Lead Time", value: "20-30 days" },
      { label: "Flexible MOQ", value: "100-500 pcs/style" },
      { label: "Monthly Capacity", value: "600,000+ pcs" }
    ],
    capability: [
      { label: "OEM / ODM", value: "Product planning, material development, fit engineering, and launch execution" },
      { label: "QC System", value: "3-stage QC from inline checks to final inspection" },
      { label: "Factory Scale", value: "20,000 m² production space with 100+ employees" },
      { label: "Export Reach", value: "30+ countries including USA, UK, Germany, France, Australia, and Spain" }
    ],
    customSteps: [
      { icon: "01", title: "Product Brief", body: "Confirm category, target market, and commercial direction before development starts." },
      { icon: "02", title: "Fast Sampling", body: "Move into sample development in 5-7 days with material and trim review." },
      { icon: "03", title: "Bulk Planning", body: "Lock MOQ, delivery windows, colorways, and packaging before order confirmation." },
      { icon: "04", title: "Shipment", body: "Coordinate final inspection, packing, and export schedule through one factory system." }
    ],
    certificatesList: [
      { code: "BSCI", title: "Social Compliance", body: "Structured communication and documentation for international buyer compliance review." },
      { code: "SEDEX", title: "Supply Chain Transparency", body: "Factory processes prepared for audit and sourcing review by global buyers." },
      { code: "ISO", title: "ISO 9001 Quality System", body: "Production and quality management organized around repeatable standards." },
      { code: "OEKO", title: "Material Awareness", body: "Comfort, fabric touch, and safer textile positioning aligned with brand requirements." }
    ],
    overviewStats: [
      { label: "Established", value: "2002" },
      { label: "Location", value: "No.16 DaShi Road, FoTang Town, Yiwu, Zhejiang, China" },
      { label: "Factory Size", value: "20,000 m²" },
      { label: "Employees", value: "100+" },
      { label: "Monthly Capacity", value: "600,000+ pieces" },
      { label: "Export Markets", value: "30+ countries (USA, UK, Germany, France, Australia, Spain)" },
      { label: "Email", value: "imbella.vicky@diyasidress.com" },
      { label: "Tel / Fax", value: "+86-18042579030 / +86-579-85569925" }
    ],
    certificationsInline: ["BSCI", "SEDEX", "ISO 9001", "OEKO-TEX"],
    advantages: [
      "Flexible MOQ: 100-500 pcs/style",
      "OEM / ODM services",
      "Fast sampling: 5-7 days",
      "3-stage QC",
      "Lead time: 20-30 days",
      "Eco-friendly fabrics available"
    ],
    categoriesList: ["Underwear", "Loungewear", "Activewear", "Kids Wear", "Maternity Wear"],
    successStories: [
      { country: "Spain", product: "Seamless Underwear", annualVolume: "1M-2M pcs", years: "15 yrs" },
      { country: "USA", product: "Loungewear Sets", annualVolume: "500K-800K pcs", years: "8 yrs" },
      { country: "Germany", product: "Sports Bras & Leggings", annualVolume: "300K-500K pcs", years: "5 yrs" },
      { country: "UK", product: "Kids Sleepwear", annualVolume: "200K-400K pcs", years: "3 yrs" }
    ]
  },
  zh: {
    kicker: "工厂",
    title: "自 2002 年起专注内衣与家居服制造",
    desc: "YiWu DiYaSi Dress CO., LTD 为批发商、零售商与 DTC 品牌提供 OEM / ODM 开发、稳定生产与国际交付配合。",
    overviewTitle: "公司概览",
    overviewLead: "用于买家评估的公司资料、工厂规模、认证资质与联系方式。",
    certificationsTitle: "认证资质",
    advantagesTitle: "工厂优势",
    categoriesTitle: "产品品类",
    storiesTitle: "合作案例",
    storiesLead: "面向欧洲与北美客户的代表性长期合作项目。",
    videoTitle: "工厂介绍视频",
    videoDesc: "生产车间、检验流程和包装环节的完整介绍，可在询盘阶段按需提供。",
    videoCta: "索取视频",
    introTitle: "支持打样与大货的生产体系",
    introBody: "工厂覆盖内衣、家居服、运动服以及儿童和孕产系列，具备一体化设备、在线检验和品牌包装配合能力。",
    gallery: "工厂展示",
    certificates: "资质展示",
    news: "最新文章",
    contactTitle: "开始询盘",
    contactBody: "发送品类、MOQ 区间、目标市场和上市时间，直接进入打样规划或大货沟通。",
    inquire: "开始洽谈",
    customize: "定制流程",
    products: "主要产品线",
    paidSample: "付费打样",
    floorTitle: "生产车间、设备与检验细节",
    complianceTitle: "合规、材料与质量控制节点",
    flowTitle: "从产品 brief 到出货",
    linesTitle: "适合长期复购的产品品类",
    updatesTitle: "工厂与文章更新",
    readMore: "阅读更多",
    noNews: "暂时还没有更新。",
    infoBar: [
      { label: "打样", value: "5-7 天" },
      { label: "交期", value: "20-30 天" },
      { label: "灵活 MOQ", value: "100-500 件/款" },
      { label: "月产能", value: "600,000+ 件" }
    ],
    capability: [
      { label: "OEM / ODM", value: "覆盖产品规划、面料开发、版型优化与项目启动执行" },
      { label: "质检体系", value: "从在线检验到尾检的 3 道质检流程" },
      { label: "工厂规模", value: "20,000 平方米生产空间，100+ 员工" },
      { label: "出口市场", value: "服务 30+ 国家，包括美国、英国、德国、法国、澳大利亚和西班牙" }
    ],
    customSteps: [
      { icon: "01", title: "产品 Brief", body: "先确认品类、市场定位和商业方向，再进入开发。" },
      { icon: "02", title: "快速打样", body: "5-7 天内推进首轮样品，并同步面料和辅料判断。" },
      { icon: "03", title: "大货计划", body: "在确认订单前锁定 MOQ、交期、颜色和包装细节。" },
      { icon: "04", title: "出货执行", body: "通过统一工厂体系衔接尾检、包装和出口安排。" }
    ],
    certificatesList: [
      { code: "BSCI", title: "社会责任审核", body: "配合买家进行国际合规审核所需的文件和沟通支持。" },
      { code: "SEDEX", title: "供应链透明度", body: "工厂流程可配合全球买家的审核与采购评估。" },
      { code: "ISO", title: "ISO 9001 质量体系", body: "生产与质量管理围绕可重复执行的标准建立。" },
      { code: "OEKO", title: "材料标准认知", body: "围绕舒适度、手感与材料定位建立更清晰的产品表达。" }
    ],
    overviewStats: [
      { label: "成立时间", value: "2002" },
      { label: "工厂地址", value: "浙江省义乌市佛堂镇大士路16号" },
      { label: "工厂面积", value: "20,000 平方米" },
      { label: "员工人数", value: "100+" },
      { label: "月产能", value: "600,000+ 件" },
      { label: "出口市场", value: "30+ 国家（美国、英国、德国、法国、澳大利亚、西班牙）" },
      { label: "邮箱", value: "imbella.vicky@diyasidress.com" },
      { label: "电话 / 传真", value: "+86-18042579030 / +86-579-85569925" }
    ],
    certificationsInline: ["BSCI", "SEDEX", "ISO 9001", "OEKO-TEX"],
    advantages: ["灵活 MOQ：100-500 件/款", "支持 OEM / ODM", "5-7 天快速打样", "3 道质检流程", "20-30 天交期", "可提供环保面料"],
    categoriesList: ["内衣", "家居服", "运动服", "儿童服饰", "孕产服饰"],
    successStories: [
      { country: "西班牙", product: "无缝内衣", annualVolume: "100万-200万件", years: "15年" },
      { country: "美国", product: "家居服套装", annualVolume: "50万-80万件", years: "8年" },
      { country: "德国", product: "运动文胸与打底裤", annualVolume: "30万-50万件", years: "5年" },
      { country: "英国", product: "儿童睡衣", annualVolume: "20万-40万件", years: "3年" }
    ]
  },
  es: {
    kicker: "Fabrica",
    title: "Fabricante de underwear y loungewear desde 2002",
    desc: "YiWu DiYaSi Dress CO., LTD apoya a mayoristas, retailers y marcas DTC con desarrollo OEM / ODM, produccion estable y coordinacion de entrega global.",
    overviewTitle: "Resumen de Empresa",
    overviewLead: "Perfil corporativo, escala operativa, certificaciones y contacto para revision del comprador.",
    certificationsTitle: "Certificaciones",
    advantagesTitle: "Ventajas",
    categoriesTitle: "Categorias de Producto",
    storiesTitle: "Casos de Exito",
    storiesLead: "Programas representativos de largo plazo en Europa y Norteamerica.",
    videoTitle: "Video de Introduccion de Fabrica",
    videoDesc: "El recorrido de planta, inspeccion y linea de empaque puede compartirse durante la consulta.",
    videoCta: "Solicitar Video",
    introTitle: "Sistema productivo para muestras y pedidos bulk",
    introBody: "La fabrica cubre underwear, loungewear, activewear y lineas para kids o maternity con equipo integrado, inspeccion en linea y coordinacion de empaque private-label.",
    gallery: "Galeria de Fabrica",
    certificates: "Certificados",
    news: "Articulos Recientes",
    contactTitle: "Iniciar Consulta",
    contactBody: "Envia categoria, rango de MOQ, mercado objetivo y timing de lanzamiento para iniciar muestra o conversacion bulk.",
    inquire: "Iniciar Conversacion",
    customize: "Flujo de Personalizacion",
    products: "Lineas Principales",
    paidSample: "Muestra Pagada",
    floorTitle: "Piso de produccion, maquinaria y detalles de inspeccion",
    complianceTitle: "Compliance, materiales y puntos de calidad",
    flowTitle: "Del brief de producto al envio",
    linesTitle: "Categorias para pedidos recurrentes",
    updatesTitle: "Actualizaciones de fabrica y articulos",
    readMore: "Leer Mas",
    noNews: "Aun no hay actualizaciones.",
    infoBar: [
      { label: "Muestra", value: "5-7 dias" },
      { label: "Lead Time", value: "20-30 dias" },
      { label: "MOQ Flexible", value: "100-500 pcs/estilo" },
      { label: "Capacidad", value: "600,000+ pcs/mes" }
    ],
    capability: [
      { label: "OEM / ODM", value: "Plan de producto, desarrollo de material, ajuste y ejecucion de lanzamiento" },
      { label: "Sistema QC", value: "QC en 3 etapas desde revision en linea hasta inspeccion final" },
      { label: "Escala", value: "20,000 m² de fabrica con 100+ empleados" },
      { label: "Mercados", value: "30+ paises incluyendo USA, UK, Alemania, Francia, Australia y Espana" }
    ],
    customSteps: [
      { icon: "01", title: "Brief de Producto", body: "Definir categoria, mercado objetivo y direccion comercial antes del desarrollo." },
      { icon: "02", title: "Muestra Rapida", body: "Mover la primera muestra en 5-7 dias con revision de tejido y trims." },
      { icon: "03", title: "Plan de Bulk", body: "Cerrar MOQ, lead time, colorways y empaque antes de confirmar pedido." },
      { icon: "04", title: "Envio", body: "Coordinar inspeccion final, packing y exportacion dentro de un mismo sistema." }
    ],
    certificatesList: [
      { code: "BSCI", title: "Compliance Social", body: "Documentacion y comunicacion preparadas para revision de compliance internacional." },
      { code: "SEDEX", title: "Transparencia de Supply Chain", body: "Procesos de fabrica listos para auditoria y evaluacion de sourcing." },
      { code: "ISO", title: "Sistema ISO 9001", body: "Produccion y control de calidad organizados alrededor de estandares repetibles." },
      { code: "OEKO", title: "Criterio de Material", body: "Confort, tacto y posicionamiento textil alineados con las necesidades de marca." }
    ],
    overviewStats: [
      { label: "Fundacion", value: "2002" },
      { label: "Ubicacion", value: "No.16 DaShi Road, FoTang Town, Yiwu, Zhejiang, China" },
      { label: "Tamano de Fabrica", value: "20,000 m²" },
      { label: "Empleados", value: "100+" },
      { label: "Capacidad Mensual", value: "600,000+ piezas" },
      { label: "Mercados", value: "30+ paises (USA, UK, Alemania, Francia, Australia, Espana)" },
      { label: "Email", value: "imbella.vicky@diyasidress.com" },
      { label: "Tel / Fax", value: "+86-18042579030 / +86-579-85569925" }
    ],
    certificationsInline: ["BSCI", "SEDEX", "ISO 9001", "OEKO-TEX"],
    advantages: [
      "MOQ flexible: 100-500 pcs/estilo",
      "Servicios OEM / ODM",
      "Muestra rapida: 5-7 dias",
      "QC en 3 etapas",
      "Lead time: 20-30 dias",
      "Tejidos eco-friendly disponibles"
    ],
    categoriesList: ["Underwear", "Loungewear", "Activewear", "Kids Wear", "Maternity Wear"],
    successStories: [
      { country: "Spain", product: "Seamless Underwear", annualVolume: "1M-2M pcs", years: "15 yrs" },
      { country: "USA", product: "Loungewear Sets", annualVolume: "500K-800K pcs", years: "8 yrs" },
      { country: "Germany", product: "Sports Bras & Leggings", annualVolume: "300K-500K pcs", years: "5 yrs" },
      { country: "UK", product: "Kids Sleepwear", annualVolume: "200K-400K pcs", years: "3 yrs" }
    ]
  }
};

export default async function FactoryPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [images, articles] = await Promise.all([getFactoryImages(), getArticles()]);
  const recentArticles = articles.slice(0, 3);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Factory", path: "/factory" }
  ]);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.title,
    description: t.desc,
    url: absoluteUrl("/factory")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <section className="dark-band page-hero rounded-[34px] shadow-[0_32px_90px_rgba(121,72,47,0.18)] md:px-10 lg:px-12">
        <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.kicker}</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
        <p className="page-reference-body page-copy-wide mt-3 text-[#fff0e5]">{t.desc}</p>
      </section>

      <section className="page-section company-overview-grid">
        <article className="company-overview-card">
          <div className="page-section-head">
            <p className="kicker page-reference-subtitle">{t.overviewTitle}</p>
            <h2 className="card-title-standard text-[#6a3524]">{t.overviewLead}</h2>
          </div>
          <div className="company-overview-list">
            {t.overviewStats.map((item) => (
              <div key={item.label} className="company-overview-row">
                <p className="company-overview-label">{item.label}</p>
                <p className="company-overview-value">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">{t.certificationsTitle}</p>
            <div className="chip-list mt-4">
              {t.certificationsInline.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">{t.advantagesTitle}</p>
            <div className="chip-list mt-4">
              {t.advantages.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">{t.categoriesTitle}</p>
            <div className="chip-list mt-4">
              {t.categoriesList.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="factory-story-shell page-section">
        <div className="factory-video-panel">
          <div className="factory-video-cover">
            <img src={factoryWideImage} alt={t.videoTitle} className="factory-video-image" />
            <div className="factory-video-overlay">
              <div className="factory-video-play">Play</div>
              <div>
                <p className="card-title-standard text-white">{t.videoTitle}</p>
                <p className="page-reference-body mt-2 max-w-xl text-white/85">{t.videoDesc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="factory-story-copy">
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <h2 className="card-title-standard mt-3 text-[#6a3524]">{t.introTitle}</h2>
          <p className="page-reference-body page-copy mt-4 text-[#7d4f3e]">{t.introBody}</p>
          <div className="factory-capability-grid mt-8">
            {t.capability.map((item) => (
              <article key={item.label} className="factory-capability-card">
                <p className="factory-capability-label">{item.label}</p>
                <p className="page-reference-body mt-2 text-[#7d4f3e]">{item.value}</p>
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

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.gallery}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.floorTitle}</h2>
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

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.certificates}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.complianceTitle}</h2>
        </div>
        <div className="factory-cert-grid mt-6">
          {t.certificatesList.map((item) => (
            <article key={item.code} className="factory-cert-card">
              <div className="factory-cert-code">{item.code}</div>
              <h3 className="card-title-standard mt-4 text-[#6a3524]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.customize}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.flowTitle}</h2>
        </div>
        <div className="factory-custom-grid mt-6">
          {t.customSteps.map((item) => (
            <article key={item.icon} className="factory-custom-card">
              <div className="factory-custom-icon">{item.icon}</div>
              <h3 className="card-title-standard mt-4 text-[#6a3524]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.products}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.linesTitle}</h2>
        </div>
        <div className="factory-product-rows mt-6">
          {featuredShowcase.map((item) => (
            <Link key={item.title} href={item.link} className="factory-product-tile">
              <img src={item.image} alt={item.title} className="factory-product-image" />
              <div className="factory-product-caption">
                <p className="card-title-standard text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.storiesTitle}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.storiesLead}</h2>
        </div>
        <div className="company-overview-card mt-6 overflow-x-auto">
          <table className="success-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Product</th>
                <th>Annual Volume</th>
                <th>Years</th>
              </tr>
            </thead>
            <tbody>
              {t.successStories.map((story) => (
                <tr key={`${story.country}-${story.product}`}>
                  <td>{story.country}</td>
                  <td>{story.product}</td>
                  <td>{story.annualVolume}</td>
                  <td>{story.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.news}</p>
          <h2 className="card-title-standard mt-2 text-[#6a3524]">{t.updatesTitle}</h2>
        </div>
        <div className="factory-news-grid mt-6">
          {recentArticles.length === 0 ? <div className="card p-6 text-[#7d4f3e]">{t.noNews}</div> : null}
          {recentArticles.map((article) => (
            <article key={article.slug} className="factory-news-card">
              <p className="factory-news-category">{article.category}</p>
              <h3 className="card-title-standard mt-3 text-[#6a3524]">{article.title}</h3>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{article.excerpt}</p>
              <div className="mt-5">
                <Link href={`/blog/${article.slug}`} className="btn btn-soft">
                  {t.readMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="factory-cta-band page-section">
        <div>
          <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.contactTitle}</p>
          <h2 className="card-title-standard mt-3 text-white">{t.contactTitle}</h2>
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

      <section className="factory-info-bar">
        {t.infoBar.map((item) => (
          <article key={item.label} className="factory-info-item">
            <p className="factory-info-label">{item.label}</p>
            <p className="card-title-standard mt-2 text-[#6a3524]">{item.value}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
