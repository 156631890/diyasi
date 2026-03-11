import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type WorkflowBlock = {
  title: string;
  items: string[];
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    pay: string;
    call: string;
    sectionTitle: string;
    workflow: WorkflowBlock[];
  }
> = {
  en: {
    kicker: "OEM / ODM",
    title: "From concept to shipment, executed in one manufacturing system",
    desc: "We integrate product planning, material development, fit engineering, and mass production into a practical workflow for global underwear brands.",
    pay: "Open Payments Page",
    call: "Book Development Call",
    sectionTitle: "Execution flow with fewer handoffs",
    workflow: [
      {
        title: "Product Planning",
        items: ["Category and market positioning", "Target cost and quality benchmark", "Silhouette and fit direction"]
      },
      {
        title: "Material Development",
        items: ["Sustainable fabric options", "Color and trim coordination", "Labeling and packaging requirements"]
      },
      {
        title: "Sampling & Fit",
        items: ["Prototype in 5-7 days", "Fit review with visual feedback", "Pattern optimization for production"]
      },
      {
        title: "Production & Delivery",
        items: ["Line scheduling and QC checkpoints", "Bulk production management", "Shipment and replenishment planning"]
      }
    ]
  },
  zh: {
    kicker: "OEM / ODM",
    title: "从产品概念到出货交付，统一在一个制造系统里完成",
    desc: "我们把产品规划、面料开发、版型优化和量产执行整合成一条连贯流程，服务全球内衣品牌。",
    pay: "打开支付页面",
    call: "预约开发沟通",
    sectionTitle: "更少交接的执行流程",
    workflow: [
      {
        title: "产品规划",
        items: ["明确品类与市场定位", "确定目标成本与质量标准", "梳理版型与穿着方向"]
      },
      {
        title: "面料开发",
        items: ["筛选可持续面料方案", "协调颜色与辅料", "确认标签与包装要求"]
      },
      {
        title: "打样与版型优化",
        items: ["5-7 天完成首版样衣", "根据反馈快速调整", "为量产做好版型稳定化"]
      },
      {
        title: "量产与交付",
        items: ["排产与质检节点控制", "大货进度管理", "出货与补货节奏规划"]
      }
    ]
  },
  es: {
    kicker: "OEM / ODM",
    title: "Del concepto al envío dentro de un solo sistema de manufactura",
    desc: "Integramos plan de producto, desarrollo de material, ajuste de patrón y producción masiva en un flujo práctico para marcas globales.",
    pay: "Abrir Pagos",
    call: "Iniciar Conversación",
    sectionTitle: "Flujo de ejecución con menos handoffs",
    workflow: [
      {
        title: "Plan de Producto",
        items: ["Posicionamiento por categoría", "Objetivo de costo y calidad", "Dirección de fit y silueta"]
      },
      {
        title: "Desarrollo de Material",
        items: ["Opciones de tejido sostenible", "Coordinación de color y trims", "Requisitos de empaque y etiqueta"]
      },
      {
        title: "Muestra y Ajuste",
        items: ["Prototipo en 5-7 días", "Revisión de fit con feedback", "Optimización de patrón para producción"]
      },
      {
        title: "Producción y Entrega",
        items: ["Plan de línea y control de calidad", "Gestión de producción masiva", "Plan de envío y reposición"]
      }
    ]
  }
};

export default function OemOdmPage() {
  const lang = getServerLang();
  const t = copy[lang];
  return (
    <main className="container-shell py-10">
      <section className="home-cta-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(121,72,47,0.18)] md:px-10 lg:px-12">
        <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.kicker}</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
        <p className="page-reference-body mt-3 max-w-3xl text-[#f3dfd3]">{t.desc}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/payments" className="btn bg-white text-[#8d452d]">
            {t.pay}
          </Link>
          <Link href="/contact" className="btn bg-white text-[#8d452d]">
            {t.call}
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="section-lead">
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#6a3524]">{t.sectionTitle}</h2>
        </div>
        <div className="mt-8 space-y-8">
          {t.workflow.map((block, index) => (
            <article key={block.title} className="process-row">
              <div className="process-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="process-copy">
                <h2 className="page-reference-subtitle text-[#6a3524]">{block.title}</h2>
                <ul className="page-reference-body mt-4 grid gap-3 text-[#7d4f3e] md:grid-cols-2">
                  {block.items.map((item) => (
                    <li key={item} className="process-bullet">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
