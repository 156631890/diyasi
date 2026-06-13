import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions, privateLabelOptions, sampleAndLeadTimes } from "@/lib/site-info";
import { getServerLang } from "@/lib/server-lang";
import { SiteLang } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "Private Label Underwear OEM/ODM Development Services",
  description:
    "End-to-end private label underwear development: custom design, fabric sourcing, sampling, branding, and production. Low MOQ from 500 pcs. Free tech pack consultation.",
  path: "/oem-odm"
});

type WorkflowBlock = {
  icon: string;
  title: string;
  items: string[];
};

const copy: Record<
  SiteLang,
  {
    heroKicker: string;
    heroTitle: string;
    heroDesc: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    flowKicker: string;
    flowTitle: string;
    inputsKicker: string;
    inputsTitle: string;
    inputsDesc: string;
    fabricKicker: string;
    packagingKicker: string;
    workflow: WorkflowBlock[];
    projectInputs: string[];
  }
> = {
  en: {
    heroKicker: "Private Label Services",
    heroTitle: "Private label underwear development from fabric to final delivery",
    heroDesc: "We help brands move from product idea, reference sample, fabric selection, fit approval, custom label, and packaging mockup into bulk production and global delivery.",
    heroCtaPrimary: "Book Development Call",
    heroCtaSecondary: "View Packaging Options",
    flowKicker: "Execution Flow",
    flowTitle: "A practical development route with fewer handoffs",
    inputsKicker: "Project Inputs",
    inputsTitle: "What buyers should prepare before sampling",
    inputsDesc: "A clear first brief helps us recommend the right MOQ route, sample timing, fabric direction, and packaging plan before cost is quoted.",
    fabricKicker: "Fabric Options",
    packagingKicker: "Packaging Options",
    workflow: [
      {
        icon: "/media/generated/icons/planning.png",
        title: "Product Planning",
        items: [
          "Category and target market review",
          "Reference sample or moodboard review",
          "Target retail price and quality benchmark",
          "Quantity, size range, and launch timing"
        ]
      },
      {
        icon: "/media/generated/icons/fabric-swatch.png",
        title: "Material Development",
        items: [
          "Cotton, modal, bamboo, recycled nylon, seamless yarn, and spandex blends",
          "Hand feel, stretch, recovery, breathability, and transparency review",
          "Color direction and trim coordination",
          "Certification and buyer document requirements"
        ]
      },
      {
        icon: "/media/generated/icons/sample-hanger.png",
        title: "Sampling & Fit",
        items: [
          sampleAndLeadTimes.stockFabricSample,
          sampleAndLeadTimes.customColorSample,
          sampleAndLeadTimes.newPatternSample,
          "Fit review, size grading, and correction round",
          "Pre-production sample before bulk approval"
        ]
      },
      {
        icon: "/media/generated/icons/packaging-box.png",
        title: "Private Label Packaging",
        items: [
          "Custom waistband and care label",
          "Heat transfer logo placement",
          "Hangtag and polybag mockup",
          "Gift box, barcode / SKU sticker, carton mark",
          "Packing rule and retail-ready presentation"
        ]
      },
      {
        icon: "/media/generated/icons/qc-check.png",
        title: "Production & QC",
        items: [
          "Line scheduling and material preparation",
          "Incoming fabric inspection",
          "Inline production inspection",
          "Final inspection and packaging review",
          sampleAndLeadTimes.bulkLeadTime
        ]
      }
    ],
    projectInputs: [
      "Target category and reference style",
      "Fabric direction and hand feel expectation",
      "Logo, label, waistband, or artwork files",
      "Size range, color plan, and launch quantity",
      "Packaging route and retail channel needs",
      "Sampling deadline and target delivery window"
    ]
  },
  zh: {
    heroKicker: "贴牌定制服务",
    heroTitle: "从面料开发到大货交期的一站式贴牌定制内衣开发",
    heroDesc: "我们协助品牌推进产品想法、参考样板、面料选择、版型批准、定制标签和包装设计，直达大货生产和全球交付。",
    heroCtaPrimary: "预约开发沟通",
    heroCtaSecondary: "查看包装选项",
    flowKicker: "执行流程",
    flowTitle: "减少对接环节点、高效率的务实开发路线",
    inputsKicker: "项目筹备清单",
    inputsTitle: "买家在打样前应做好的准备",
    inputsDesc: "明确的首次询盘方案有助于我们在报价前，为您推荐合适的 MOQ 路线、打样时间、面料方向和包装方案。",
    fabricKicker: "面料选择范围",
    packagingKicker: "包装配置选项",
    workflow: [
      {
        icon: "/media/generated/icons/planning.png",
        title: "产品规划设计",
        items: [
          "品类及目标消费市场审查",
          "参考样板或设计效果图分析",
          "零售目标价及项目质量基准对齐",
          "计划数量、尺码放码和上市节点"
        ]
      },
      {
        icon: "/media/generated/icons/fabric-swatch.png",
        title: "原材料评估开发",
        items: [
          "纯棉、莫代尔、竹纤维、再生尼龙、无缝针织以及氨纶混纺",
          "手感、拉伸性、回弹力、透气性及防透度审查",
          "色彩趋势和辅料腰带的协调开发",
          "对应证书与买家合规文件核对"
        ]
      },
      {
        icon: "/media/generated/icons/sample-hanger.png",
        title: "打样与版型调试",
        items: [
          `现存面料打样: ${sampleAndLeadTimes.stockFabricSample}`,
          `定制颜色打样: ${sampleAndLeadTimes.customColorSample}`,
          `新版型花型开发: ${sampleAndLeadTimes.newPatternSample}`,
          "版型评估、尺码放码及修改更正",
          "大货生产前的产前样确认"
        ]
      },
      {
        icon: "/media/generated/icons/packaging-box.png",
        title: "品牌专属包装定制",
        items: [
          "定制提花/印花腰带及洗水唛标签",
          "无感烫印/转印 Logo 细节",
          "吊牌及定制包装袋封样",
          "礼盒、条形码/SKU 贴纸、外箱唛头",
          "包装规则及面向零售渠道的成品呈现"
        ]
      },
      {
        icon: "/media/generated/icons/qc-check.png",
        title: "批量生产与质检",
        items: [
          "生产车间排单及物料采购筹备",
          "原材料入库前及产前检验",
          "产线缝纫装配在线检验",
          "大货成品检验及出厂包装审核",
          `大货交期: ${sampleAndLeadTimes.bulkLeadTime}`
        ]
      }
    ],
    projectInputs: [
      "目标品类和参考款式",
      "面料材质要求和手感预期",
      "Logo、洗水唛、腰带或设计图档",
      "尺码范围、颜色方案及首期起订量",
      "包装要求及零售渠道配送需求",
      "打样截止时间及目标交期窗口"
    ]
  },
  es: {
    heroKicker: "Servicios de Marca Propia",
    heroTitle: "Desarrollo de ropa interior de marca propia desde la tela hasta la entrega final",
    heroDesc: "Ayudamos a las marcas a pasar de la idea del producto, muestra de referencia, selección de tela, aprobación de ajuste, etiqueta personalizada y mockup de empaque a la producción a granel y entrega global.",
    heroCtaPrimary: "Agendar Llamada de Desarrollo",
    heroCtaSecondary: "Ver Opciones de Empaque",
    flowKicker: "Flujo de Ejecución",
    flowTitle: "Una ruta de desarrollo práctica con menos intermediarios",
    inputsKicker: "Requisitos del Proyecto",
    inputsTitle: "Qué deben preparar los compradores antes del muestreo",
    inputsDesc: "Un brief inicial claro nos ayuda a recomendar la ruta de MOQ, tiempos de muestra, telas y empaques adecuados antes de cotizar.",
    fabricKicker: "Opciones de Tejido",
    packagingKicker: "Opciones de Empaque",
    workflow: [
      {
        icon: "/media/generated/icons/planning.png",
        title: "Planeación de Producto",
        items: [
          "Revisión de categoría y mercado objetivo",
          "Muestra de referencia o revisión de moodboard",
          "Precio minorista objetivo y estándar de calidad",
          "Cantidad, rango de tallas y tiempos de lanzamiento"
        ]
      },
      {
        icon: "/media/generated/icons/fabric-swatch.png",
        title: "Desarrollo de Materiales",
        items: [
          "Algodón, modal, bambú, nailon reciclado, hilo sin costuras y elastano",
          "Revisión de tacto, estiramiento, recuperación, transpirabilidad y opacidad",
          "Dirección de color y coordinación de elásticos/avíos",
          "Requisitos de certificación y documentos del comprador"
        ]
      },
      {
        icon: "/media/generated/icons/sample-hanger.png",
        title: "Muestreo y Ajuste",
        items: [
          `Muestra con tela de stock: ${sampleAndLeadTimes.stockFabricSample}`,
          `Muestra con color personalizado: ${sampleAndLeadTimes.customColorSample}`,
          `Muestra con nuevo diseño: ${sampleAndLeadTimes.newPatternSample}`,
          "Evaluación de ajuste, gradación de tallas y correcciones",
          "Muestra de preproducción antes de la aprobación del lote"
        ]
      },
      {
        icon: "/media/generated/icons/packaging-box.png",
        title: "Empaque de Marca Propia",
        items: [
          "Pretina y etiqueta de cuidado personalizadas",
          "Colocación de logotipo por transferencia de calor",
          "Mockup de etiqueta colgante y bolsa de empaque",
          "Caja de regalo, código de barras/SKU, marcas de cartón",
          "Regla de embalaje y presentación lista para venta minorista"
        ]
      },
      {
        icon: "/media/generated/icons/qc-check.png",
        title: "Producción y QC",
        items: [
          "Programación de líneas y preparación de materiales",
          "Inspección de tela entrante",
          "Inspección de producción en línea",
          "Inspección final y revisión de embalaje",
          `Plazo de producción bulk: ${sampleAndLeadTimes.bulkLeadTime}`
        ]
      }
    ],
    projectInputs: [
      "Categoría objetivo y estilo de referencia",
      "Dirección del tejido y expectativa de tacto",
      "Archivos de logotipo, etiqueta, elástico o diseño",
      "Rango de tallas, plan de color y cantidad de lanzamiento",
      "Ruta de empaque y necesidades del canal minorista",
      "Plazo límite para muestras y ventana de entrega"
    ]
  }
};

export default function OemOdmPage() {
  const lang = getServerLang();
  const t = copy[lang];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Private Label", path: "/oem-odm" }
  ]);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private Label Underwear Development",
    description:
      "Private label underwear development from fabric selection and reference sample review to fit sampling, packaging mockup, bulk production, QC, and delivery.",
    provider: {
      "@type": "Organization",
      name: "YiWu DiYaSi Dress Co., Ltd."
    },
    serviceType: "Private label underwear manufacturing",
    areaServed: "Worldwide",
    url: absoluteUrl("/oem-odm")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="visual-hero visual-hero-dark page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle text-[#d7eee8]">{t.heroKicker}</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold text-white">
            {t.heroTitle}
          </h1>
          <p className="page-reference-body mt-4 text-white/82">
            {t.heroDesc}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn bg-white text-[#0f5f55] hover:bg-[#e7f2ef]">
              {t.heroCtaPrimary}
            </Link>
            <Link href="/packaging" className="btn border border-white/70 text-white hover:bg-white hover:text-[#0f5f55]">
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
        <div className="visual-hero-media">
          <Image
            src="/media/generated/pages/private-label-development-board.jpg"
            alt="Private label underwear development board with fabric swatches, trims, packaging, and production notes"
            width={1600}
            height={800}
            priority
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">{t.flowKicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">{t.flowTitle}</h2>
        </div>
        <div className="service-flow-stack mt-8">
          {t.workflow.map((block, index) => (
            <article key={block.title} className="service-flow-card">
              <div className="service-flow-aside">
                <span className="service-flow-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="service-flow-icon-wrap">
                  <img src={block.icon} alt="" className="service-flow-icon" />
                </div>
              </div>
              <div className="service-flow-content">
                <h3 className="service-flow-title">{block.title}</h3>
                <ul className="service-flow-list">
                  {block.items.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section split-proof-band">
        <div>
          <p className="kicker page-reference-subtitle">{t.inputsKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.inputsTitle}</h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            {t.inputsDesc}
          </p>
        </div>
        <div className="project-input-grid">
          {t.projectInputs.map((item) => (
            <article key={item} className="project-input-item">
              <img src="/media/generated/icons/resource-guide.png" alt="" width={44} height={44} loading="lazy" decoding="async" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="kicker page-reference-subtitle">Fabric Options</p>
            <div className="chip-list mt-4">
              {fabricOptions.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="kicker page-reference-subtitle">Packaging Options</p>
            <div className="chip-list mt-4">
              {privateLabelOptions.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
