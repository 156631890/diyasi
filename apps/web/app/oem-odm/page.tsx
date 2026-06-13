import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { sampleAndLeadTimes } from "@/lib/site-info";
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

type ProjectInputItem = {
  icon: string;
  text: string;
};

type ShowcaseItem = {
  name: string;
  desc: string;
  icon: string;
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
    projectInputs: ProjectInputItem[];
    fabrics: ShowcaseItem[];
    packaging: ShowcaseItem[];
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
      { icon: "/media/generated/icons/input-style.png", text: "Target category and reference style" },
      { icon: "/media/generated/icons/input-fabric.png", text: "Fabric direction and hand feel expectation" },
      { icon: "/media/generated/icons/input-artwork.png", text: "Logo, label, waistband, or artwork files" },
      { icon: "/media/generated/icons/input-quantity.png", text: "Size range, color plan, and launch quantity" },
      { icon: "/media/generated/icons/input-channel.png", text: "Packaging route and retail channel needs" },
      { icon: "/media/generated/icons/input-timeline.png", text: "Sampling deadline and target delivery window" }
    ],
    fabrics: [
      { name: "Cotton / Organic Cotton", desc: "Breathable, natural organic fibers for everyday comfort.", icon: "/media/generated/icons/fabric-cotton.png" },
      { name: "Modal / Lenzing Modal", desc: "Ultra-soft, silky feel with excellent moisture absorption.", icon: "/media/generated/icons/fabric-modal.png" },
      { name: "Bamboo Fiber", desc: "Naturally antibacterial, cooling, and eco-friendly.", icon: "/media/generated/icons/fabric-bamboo.png" },
      { name: "Recycled Nylon", desc: "Sustainable, durable, and smooth stretch performance.", icon: "/media/generated/icons/fabric-nylon.png" },
      { name: "Seamless Yarn", desc: "Perfect for no-show comfort and engineered compression.", icon: "/media/generated/icons/fabric-seamless.png" },
      { name: "Leakproof Lining", desc: "Absorbent, multi-layered barrier for period protection.", icon: "/media/generated/icons/fabric-leakproof.png" }
    ],
    packaging: [
      { name: "Custom Waistband", desc: "Woven Jacquard or printed elastic bands with your brand logo.", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "Heat Transfer Label", desc: "Tagless comfort with screen-printed care labels inside.", icon: "/media/generated/icons/input-artwork.png" },
      { name: "Custom Hangtag", desc: "Premium cardstock hangtags with plastic or cotton strings.", icon: "/media/generated/icons/planning.png" },
      { name: "Premium Zip Bag", desc: "Frosted or clear EVA/PE zipper bags with custom artwork.", icon: "/media/generated/icons/input-channel.png" },
      { name: "Custom Gift Box", desc: "Rigid or folding cardboard boxes for premium retail packaging.", icon: "/media/generated/icons/packaging-box.png" },
      { name: "Barcode & Carton Mark", desc: "Retail-ready SKU barcodes, sticker marks, and shipping specs.", icon: "/media/generated/icons/qc-check.png" }
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
      { icon: "/media/generated/icons/input-style.png", text: "目标品类和参考款式" },
      { icon: "/media/generated/icons/input-fabric.png", text: "面料材质要求和手感预期" },
      { icon: "/media/generated/icons/input-artwork.png", text: "Logo、洗水唛、腰带或设计图档" },
      { icon: "/media/generated/icons/input-quantity.png", text: "尺码范围、颜色方案及首期起订量" },
      { icon: "/media/generated/icons/input-channel.png", text: "包装要求及零售渠道配送需求" },
      { icon: "/media/generated/icons/input-timeline.png", text: "打样截止时间及目标交期窗口" }
    ],
    fabrics: [
      { name: "纯棉 / 有机棉", desc: "天然有机纤维，吸湿透气，亲肤舒适，适合日常穿着。", icon: "/media/generated/icons/fabric-cotton.png" },
      { name: "莫代尔 / 兰精莫代尔", desc: "手感超柔滑，宛如真丝，垂顺性好，吸湿性能优异。", icon: "/media/generated/icons/fabric-modal.png" },
      { name: "竹纤维", desc: "天然抗菌抑菌，清凉透气，绿色环保可持续材质。", icon: "/media/generated/icons/fabric-bamboo.png" },
      { name: "再生尼龙", desc: "环保可持续，高强度耐磨，表面细腻光滑，极佳弹性。", icon: "/media/generated/icons/fabric-nylon.png" },
      { name: "无缝针织纱", desc: "无侧缝一体成型，极佳包裹感与弹力，适合零感内衣。", icon: "/media/generated/icons/fabric-seamless.png" },
      { name: "防漏涂层/吸水层", desc: "多层防漏工艺，吸水量大，干爽不闷热，专为生理期开发。", icon: "/media/generated/icons/fabric-leakproof.png" }
    ],
    packaging: [
      { name: "专属定制提花腰带", desc: "提花织造或印花弹力松紧带，印刻您的品牌标志性设计。", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "无缝无感热转印洗水唛", desc: "免缝线无感舒适度，大货高清晰度丝网印刷内标。", icon: "/media/generated/icons/input-artwork.png" },
      { name: "高质感纸制/卡纸吊牌", desc: "可定制特种纸、卡纸厚度，搭配棉绳或塑料绳扣。", icon: "/media/generated/icons/planning.png" },
      { name: "定制磨砂拉链袋/PE包装袋", desc: "EVA或PE材质，可定制排气孔和单色/彩色图案。", icon: "/media/generated/icons/input-channel.png" },
      { name: "高档精美包装礼盒", desc: "折叠纸盒或天地盖硬纸盒，提升品牌零售溢价感。", icon: "/media/generated/icons/packaging-box.png" },
      { name: "SKU条形码与外箱贴纸", desc: "合规条码、尺码标以及符合全球亚马逊/海外仓唛头。", icon: "/media/generated/icons/qc-check.png" }
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
      { icon: "/media/generated/icons/input-style.png", text: "Categoría objetivo y estilo de referencia" },
      { icon: "/media/generated/icons/input-fabric.png", text: "Dirección del tejido y expectativa de tacto" },
      { icon: "/media/generated/icons/input-artwork.png", text: "Archivos de logotipo, etiqueta, elástico o diseño" },
      { icon: "/media/generated/icons/input-quantity.png", text: "Rango de tallas, plan de color y cantidad de lanzamiento" },
      { icon: "/media/generated/icons/input-channel.png", text: "Ruta de empaque y necesidades del canal minorista" },
      { icon: "/media/generated/icons/input-timeline.png", text: "Plazo límite para muestras y ventana de entrega" }
    ],
    fabrics: [
      { name: "Algodón / Algodón Orgánico", desc: "Fibras naturales y transpirables para comodidad diaria.", icon: "/media/generated/icons/fabric-cotton.png" },
      { name: "Modal / Lenzing Modal", desc: "Tacto ultra suave y sedoso con excelente absorción de humedad.", icon: "/media/generated/icons/fabric-modal.png" },
      { name: "Fibra de Bambú", desc: "Naturalmente antibacteriano, fresco y ecológico.", icon: "/media/generated/icons/fabric-bamboo.png" },
      { name: "Nailon Reciclado", desc: "Sostenible, duradero y con estiramiento suave.", icon: "/media/generated/icons/fabric-nylon.png" },
      { name: "Hilo sin Costuras", desc: "Perfecto para confort sin costuras y compresión diseñada.", icon: "/media/generated/icons/fabric-seamless.png" },
      { name: "Forro Antifugas", desc: "Barrera absorbente de múltiples capas para protección de periodo.", icon: "/media/generated/icons/fabric-leakproof.png" }
    ],
    packaging: [
      { name: "Pretina Personalizada", desc: "Bandas elásticas tejidas en jacquard o impresas con su logotipo.", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "Etiqueta Termotransferible", desc: "Comodidad sin etiquetas mediante impresión serigráfica de cuidado.", icon: "/media/generated/icons/input-artwork.png" },
      { name: "Etiqueta Colgante", desc: "Etiquetas de cartón premium con hilos de plástico o algodón.", icon: "/media/generated/icons/planning.png" },
      { name: "Bolsa de Cierre Premium", desc: "Bolsas de cremallera EVA/PE esmeriladas o transparentes.", icon: "/media/generated/icons/input-channel.png" },
      { name: "Caja de Regalo a Medida", desc: "Cajas de cartón rígidas o plegables para empaque minorista premium.", icon: "/media/generated/icons/packaging-box.png" },
      { name: "Código de Barras y Marca", desc: "Código de barras SKU listo para venta y especificaciones de envío.", icon: "/media/generated/icons/qc-check.png" }
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
            <article key={item.text} className="project-input-item-new">
              <div className="project-input-icon-wrap">
                <img src={item.icon} alt="" className="project-input-icon" loading="lazy" decoding="async" />
              </div>
              <p className="project-input-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">{t.fabricKicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">Premium Material Options</h2>
        </div>
        <div className="editorial-showcase-grid mt-8">
          {t.fabrics.map((item) => (
            <article key={item.name} className="showcase-card">
              <div className="showcase-icon-wrap">
                <img src={item.icon} alt={item.name} className="showcase-icon" loading="lazy" decoding="async" />
              </div>
              <h3 className="showcase-title">{item.name}</h3>
              <p className="showcase-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">{t.packagingKicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">Branded Packaging & Trims</h2>
        </div>
        <div className="editorial-showcase-grid mt-8">
          {t.packaging.map((item) => (
            <article key={item.name} className="showcase-card">
              <div className="showcase-icon-wrap">
                <img src={item.icon} alt={item.name} className="showcase-icon" loading="lazy" decoding="async" />
              </div>
              <h3 className="showcase-title">{item.name}</h3>
              <p className="showcase-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
