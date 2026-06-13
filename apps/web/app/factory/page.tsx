import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { companyInfo, launchCollections, qualitySteps } from "@/lib/site-info";
import { getServerLang } from "@/lib/server-lang";
import { SiteLang } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "Factory Tour & Quality Control — BSCI Certified Underwear Production",
  description:
    "Tour our 20,000 sq m underwear factory in YiWu, China. ISO 9001, BSCI, SEDEX, OEKO-TEX certified. 15+ production lines, 3-stage QC system, 600,000+ pcs monthly capacity.",
  path: "/factory"
});

type OverviewItem = { label: string; value: string };
type CertItem = { code: string; title: string; desc: string };
type PhotoItem = { src: string; title: string };

const copy: Record<
  SiteLang,
  {
    heroKicker: string;
    heroTitle: string;
    heroDesc: string;
    overviewKicker: string;
    overviewTitle: string;
    capabilityKicker: string;
    contactKicker: string;
    systemKicker: string;
    systemTitle: string;
    systemDesc: string;
    systemCta: string;
    qcKicker: string;
    qcTitle: string;
    certKicker: string;
    certTitle: string;
    photosKicker: string;
    photosTitle: string;
    linesKicker: string;
    linesTitle: string;
    ctaKicker: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    overview: OverviewItem[];
    capabilities: string[];
    certifications: CertItem[];
    factoryPhotos: PhotoItem[];
  }
> = {
  en: {
    heroKicker: "Factory & Quality",
    heroTitle: "Factory capability with a practical QC system",
    heroDesc: `${companyInfo.name} supports private label underwear, bras, shapewear, activewear, and loungewear programs with sampling, bulk production, quality control, packaging coordination, and export delivery.`,
    overviewKicker: "Factory Overview",
    overviewTitle: "Core information for buyer review",
    capabilityKicker: "Production Capability",
    contactKicker: "Contact",
    systemKicker: "Production System",
    systemTitle: "From sample approval to repeat production",
    systemDesc: "We align product brief, fabric direction, sample route, size range, packaging needs, QC standard, and delivery schedule before the order moves into bulk production.",
    systemCta: "Request Factory Review",
    qcKicker: "Quality Control System",
    qcTitle: "Three inspection stages buyers can understand",
    certKicker: "Certifications",
    certTitle: "Compliance documents available for buyer review",
    photosKicker: "Factory Photos",
    photosTitle: "Real factory media currently available on the site",
    linesKicker: "Product Lines",
    linesTitle: "Categories for recurring private label orders",
    ctaKicker: "Start an Inquiry",
    ctaTitle: "Send your category, MOQ range, target market, and launch timing",
    ctaDesc: "We will respond with sample route, production assumptions, packaging checklist, and next-step information.",
    ctaBtn: "Contact Factory Team",
    overview: [
      { label: "Company", value: companyInfo.name },
      { label: "Location", value: companyInfo.address },
      { label: "Factory Area", value: companyInfo.factoryArea },
      { label: "Team", value: companyInfo.employees },
      { label: "Monthly Capacity", value: companyInfo.monthlyCapacity },
      { label: "Export Markets", value: companyInfo.exportMarkets }
    ],
    capabilities: [
      "Seamless underwear",
      "Cotton underwear",
      "Bras and bralettes",
      "Shapewear",
      "Men's underwear",
      "Activewear",
      "Period underwear",
      "Loungewear"
    ],
    certifications: [
      {
        code: "BSCI",
        title: "Social Compliance",
        desc: "Buyer review documents can be prepared upon request. Certificate number and validity should be checked against the latest file."
      },
      {
        code: "SEDEX",
        title: "Supply Chain Transparency",
        desc: "Factory process and documentation can support sourcing and compliance review for international buyers."
      },
      {
        code: "ISO 9001",
        title: "Quality System",
        desc: "Quality management is described around repeatable checks, documented standards, and production review points."
      },
      {
        code: "OEKO-TEX",
        title: "Material Review",
        desc: "Material certification details should be confirmed according to the selected fabric, supplier file, and buyer requirement."
      }
    ],
    factoryPhotos: [
      { src: "/media/home/factory-1.jpg", title: "Factory Exterior" },
      { src: "/media/home/factory-2.jpg", title: "Design and Production Area" },
      { src: "/media/home/factory-3.jpg", title: "Cutting and Sewing Detail" },
      { src: "/media/home/factory-4.jpg", title: "Seamless Production" },
      { src: "/media/home/factory-5.jpg", title: "QC and Packing Area" }
    ]
  },
  zh: {
    heroKicker: "工厂与质量",
    heroTitle: "具备务实质检体系的工厂制造能力",
    heroDesc: `${companyInfo.name}支持贴牌定制内衣、文胸、塑形衣、运动装和家居服项目，提供打样、大货生产、质量控制、包装协调和出口交付服务。`,
    overviewKicker: "工厂概览",
    overviewTitle: "供买家审核的核心信息",
    capabilityKicker: "生产能力范围",
    contactKicker: "联系方式",
    systemKicker: "生产体系流程",
    systemTitle: "从样品批准到重复生产",
    systemDesc: "在大货投产前，我们将产品方案、面料方向、打样路线、尺码范围、包装需求、质检标准以及交货计划做全面对齐。",
    systemCta: "申请工厂审查",
    qcKicker: "质量控制体系",
    qcTitle: "买家可以清晰理解的三阶段质检",
    certKicker: "企业认证说明",
    certTitle: "可供买家查阅的社会合规及质检证书",
    photosKicker: "工厂实景照片",
    photosTitle: "工厂车间与办公区域的实景展示",
    linesKicker: "生产线分类",
    linesTitle: "适合重复翻单的贴牌内衣品类",
    ctaKicker: "发起询盘沟通",
    ctaTitle: "发送您的品类、MOQ 范围、目标市场和上市交期",
    ctaDesc: "我们将反馈打样路线、生产设想、包装清单和下一步安排等信息。",
    ctaBtn: "联系工厂团队",
    overview: [
      { label: "公司名称", value: companyInfo.name },
      { label: "工厂地址", value: companyInfo.address },
      { label: "工厂面积", value: companyInfo.factoryArea },
      { label: "团队规模", value: companyInfo.employees },
      { label: "月均产能", value: companyInfo.monthlyCapacity },
      { label: "主要市场", value: companyInfo.exportMarkets }
    ],
    capabilities: [
      "无缝一体织内衣",
      "舒适纯棉内裤",
      "文胸与无钢圈胸衣",
      "美体塑身内衣",
      "男士内衣与平角裤",
      "运动服与瑜伽服",
      "生理期防漏内裤",
      "舒适家居服"
    ],
    certifications: [
      {
        code: "BSCI",
        title: "社会责任合规",
        desc: "可根据买家要求准备审核文件，证书编号及有效性可通过最新官方系统进行查询。"
      },
      {
        code: "SEDEX",
        title: "供应链透明度",
        desc: "完备的工厂程序及档案，可支持国际买家进行采购合规审查。"
      },
      {
        code: "ISO 9001",
        title: "质量体系认证",
        desc: "通过可重复的检验程序、标准化的操作流程和多个关键控制点进行品质管控。"
      },
      {
        code: "OEKO-TEX",
        title: "原材料环保认证",
        desc: "可根据买家选择的特定面料、供应商档案及项目合规要求配合提供相应的面料证书。"
      }
    ],
    factoryPhotos: [
      { src: "/media/home/factory-1.jpg", title: "工厂外观" },
      { src: "/media/home/factory-2.jpg", title: "版房与设计开发区" },
      { src: "/media/home/factory-3.jpg", title: "裁剪与缝纫车间" },
      { src: "/media/home/factory-4.jpg", title: "无缝织造车间" },
      { src: "/media/home/factory-5.jpg", title: "品检与包装车间" }
    ]
  },
  es: {
    heroKicker: "Fábrica y Calidad",
    heroTitle: "Capacidad fabril con un sistema de control práctico",
    heroDesc: `${companyInfo.name} respalda programas de ropa interior, sujetadores, fajas, activewear y loungewear de marca propia con muestreo, producción a granel, control de calidad, empaque y despacho de exportación.`,
    overviewKicker: "Resumen de la Fábrica",
    overviewTitle: "Información clave para la revisión de compradores",
    capabilityKicker: "Capacidad de Producción",
    contactKicker: "Contacto",
    systemKicker: "Sistema de Producción",
    systemTitle: "Desde la muestra aprobada hasta la reposición",
    systemDesc: "Alineamos ficha técnica, tipo de tela, ruta de muestra, tallaje, empaque, estándares de calidad y plazos antes de la producción masiva.",
    systemCta: "Solicitar Revisión de Fábrica",
    qcKicker: "Control de Calidad (QC)",
    qcTitle: "Tres etapas de inspección claras para el comprador",
    certKicker: "Certificaciones",
    certTitle: "Documentos de cumplimiento listos para revisión",
    photosKicker: "Fotos de Fábrica",
    photosTitle: "Fotos reales de nuestras instalaciones",
    linesKicker: "Líneas de Producto",
    linesTitle: "Categorías aptas para pedidos recurrentes de marca propia",
    ctaKicker: "Iniciar una Consulta",
    ctaTitle: "Envía categoría, rango de MOQ, mercado objetivo y timing",
    ctaDesc: "Responderemos con la ruta de muestra, estimaciones, checklist de empaque y próximos pasos.",
    ctaBtn: "Contactar al Equipo",
    overview: [
      { label: "Empresa", value: companyInfo.name },
      { label: "Ubicación", value: companyInfo.address },
      { label: "Área Fabril", value: companyInfo.factoryArea },
      { label: "Equipo", value: companyInfo.employees },
      { label: "Capacidad Mensual", value: companyInfo.monthlyCapacity },
      { label: "Destinos Exportación", value: companyInfo.exportMarkets }
    ],
    capabilities: [
      "Ropa interior sin costuras",
      "Ropa interior de algodón",
      "Sujetadores y bralettes",
      "Fajas reductoras",
      "Ropa interior masculina",
      "Ropa deportiva/activewear",
      "Bragas menstruales",
      "Ropa de casa/loungewear"
    ],
    certifications: [
      {
        code: "BSCI",
        title: "Cumplimiento Social",
        desc: "Documentación lista a petición del comprador. El número de certificado y vigencia se verifican con el último registro."
      },
      {
        code: "SEDEX",
        title: "Transparencia de la Cadena",
        desc: "Procesos y registros listos para respaldar la auditoría de cumplimiento de marcas globales."
      },
      {
        code: "ISO 9001",
        title: "Gestión de Calidad",
        desc: "Control ordenado mediante verificaciones reiteradas, pautas operativas y puntos de control en taller."
      },
      {
        code: "OEKO-TEX",
        title: "Seguridad de Materiales",
        desc: "Certificados listos de acuerdo con el tejido elegido, historial de proveeduría y requisitos del cliente."
      }
    ],
    factoryPhotos: [
      { src: "/media/home/factory-1.jpg", title: "Exterior de la Fábrica" },
      { src: "/media/home/factory-2.jpg", title: "Área de Diseño y Muestras" },
      { src: "/media/home/factory-3.jpg", title: "Taller de Corte y Confección" },
      { src: "/media/home/factory-4.jpg", title: "Taller de Tejido Sin Costuras" },
      { src: "/media/home/factory-5.jpg", title: "Área de Control de Calidad y Empaque" }
    ]
  }
};

const qualityIcons = [
  "/media/generated/icons/fabric-swatch.png",
  "/media/generated/icons/factory-line.png",
  "/media/generated/icons/qc-check.png"
];

export default function FactoryPage() {
  const lang = getServerLang();
  const t = copy[lang];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Factory & Quality", path: "/factory" }
  ]);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Factory & Quality",
    description:
      "Factory overview, production capability, quality control, certifications, and factory photos for buyer review.",
    url: absoluteUrl("/factory")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <section className="visual-hero visual-hero-dark page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle text-[#d7eee8]">{t.heroKicker}</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold text-white">{t.heroTitle}</h1>
          <p className="page-reference-body mt-4 text-white/82">
            {t.heroDesc}
          </p>
          <div className="factory-hero-stats mt-7">
            <span>{companyInfo.factoryArea}</span>
            <span>{companyInfo.monthlyCapacity}</span>
            <span>{companyInfo.employees}</span>
          </div>
        </div>
        <div className="visual-hero-media">
          <Image
            src="/media/generated/wide/factory-wide-production-line.png"
            alt="Underwear factory production line with textile machinery"
            width={1600}
            height={720}
            priority
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section company-overview-grid">
        <article className="company-overview-card">
          <div className="page-section-head">
            <p className="kicker page-reference-subtitle">{t.overviewKicker}</p>
            <h2 className="card-title-standard text-[#1d2521]">{t.overviewTitle}</h2>
          </div>
          <div className="company-overview-list">
            {t.overview.map((item) => (
              <div key={item.label} className="company-overview-row">
                <p className="company-overview-label">{item.label}</p>
                <p className="company-overview-value">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">{t.capabilityKicker}</p>
            <div className="chip-list mt-4">
              {t.capabilities.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="company-overview-card">
            <p className="kicker page-reference-subtitle">{t.contactKicker}</p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-[#5f6b66]">
              <p>{companyInfo.emailPrimary}</p>
              <p>{companyInfo.phone}</p>
              <p>{companyInfo.address}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="factory-story-shell page-section">
        <div className="factory-video-panel">
          <div className="factory-video-cover">
            <video
              src="/media/home/factory-video.mp4"
              controls
              preload="none"
              playsInline
              poster="/media/home/factory-1.jpg"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="factory-story-copy">
          <p className="kicker page-reference-subtitle">{t.systemKicker}</p>
          <h2 className="card-title-standard mt-3 text-[#1d2521]">{t.systemTitle}</h2>
          <p className="page-reference-body page-copy mt-4 text-[#5f6b66]">
            {t.systemDesc}
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn btn-primary">
              {t.systemCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.qcKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.qcTitle}</h2>
        </div>
        <div className="factory-custom-grid mt-6">
          {qualitySteps.map((item, index) => (
            <article key={item.title} className="factory-custom-card">
              <img
                src={qualityIcons[index] || "/media/generated/icons/qc-check.png"}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="service-step-icon"
              />
              <h3 className="card-title-standard mt-4 text-[#1d2521]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.certKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.certTitle}</h2>
        </div>
        <div className="factory-cert-grid mt-6">
          {t.certifications.map((item) => (
            <article key={item.code} className="factory-cert-card">
              <div className="factory-cert-head">
                <img
                  src="/media/generated/icons/certificate-document.png"
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                />
                <div className="factory-cert-code">{item.code}</div>
              </div>
              <h3 className="card-title-standard mt-4 text-[#1d2521]">{item.title}</h3>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.photosKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.photosTitle}</h2>
        </div>
        <div className="factory-detail-grid mt-6">
          {t.factoryPhotos.map((img) => (
            <article key={img.src} className="factory-detail-card">
              <img src={img.src} alt={img.title} loading="lazy" decoding="async" className="factory-detail-image" />
              <div className="factory-detail-caption">
                <p className="page-reference-body text-white">{img.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="factory-section-head">
          <p className="kicker page-reference-subtitle">{t.linesKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.linesTitle}</h2>
        </div>
        <div className="factory-product-rows mt-6">
          {launchCollections.slice(0, 4).map((item, index) => (
            <Link key={item.slug} href={item.href} className="factory-product-tile">
              <img
                src={t.factoryPhotos[index % t.factoryPhotos.length].src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="factory-product-image"
              />
              <div className="factory-product-caption">
                <p className="card-title-standard text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="factory-cta-band page-section">
        <div>
          <p className="kicker page-reference-subtitle text-[#d7eee8]">{t.ctaKicker}</p>
          <h2 className="card-title-standard mt-3 text-white">{t.ctaTitle}</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-white/82">
            {t.ctaDesc}
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          {t.ctaBtn}
        </Link>
      </section>
    </main>
  );
}
