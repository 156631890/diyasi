import BuyNowButton from "@/components/BuyNowButton";
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
    workflow: WorkflowBlock[];
  }
> = {
  en: {
    kicker: "OEM / ODM",
    title: "From concept to shipment, executed in one manufacturing system",
    desc:
      "We integrate product planning, material development, fit engineering, and mass production into a practical workflow for global underwear brands.",
    pay: "Pay Launch Deposit",
    call: "Book Development Call",
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
    title: "从产品概念到出货交付，一体化制造执行",
    desc: "我们将产品规划、面料开发、版型优化与量产交付整合为可复制流程，服务全球内衣品牌增长。",
    pay: "支付启动定金",
    call: "预约开发沟通",
    workflow: [
      {
        title: "产品规划",
        items: ["确定品类与市场定位", "明确成本目标与质量标准", "梳理版型与穿着方向"]
      },
      {
        title: "面料与辅料开发",
        items: ["可持续面料方案匹配", "颜色与辅料统一管理", "标签包装规范确认"]
      },
      {
        title: "打样与版型优化",
        items: ["5-7 天完成首版样衣", "基于反馈快速迭代修正", "为量产做版型稳定化"]
      },
      {
        title: "量产与交付",
        items: ["排产与质检节点控制", "大货进度管理", "出货与补货节奏规划"]
      }
    ]
  },
  es: {
    kicker: "OEM / ODM",
    title: "Del concepto al envio dentro de un solo sistema de manufactura",
    desc:
      "Integramos plan de producto, desarrollo de material, ajuste de patron y produccion masiva en un flujo practico para marcas globales.",
    pay: "Pagar Deposito Inicial",
    call: "Reservar Llamada",
    workflow: [
      {
        title: "Plan de Producto",
        items: ["Posicionamiento por categoria", "Objetivo de costo y calidad", "Direccion de fit y silueta"]
      },
      {
        title: "Desarrollo de Material",
        items: ["Opciones de tejido sostenible", "Coordinacion de color y trims", "Requisitos de empaque y etiqueta"]
      },
      {
        title: "Muestra y Ajuste",
        items: ["Prototipo en 5-7 dias", "Revision de fit con feedback", "Optimizacion de patron para produccion"]
      },
      {
        title: "Produccion y Entrega",
        items: ["Plan de linea y control de calidad", "Gestion de produccion masiva", "Plan de envio y reposicion"]
      }
    ]
  }
};

export default function OemOdmPage() {
  const lang = getServerLang();
  const t = copy[lang];
  return (
    <main className="container-shell py-10">
      <section className="dark-band card p-7 md:p-10">
        <p className="kicker text-[#f3d7a1]">{t.kicker}</p>
        <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
        <p className="mt-3 max-w-3xl leading-8 text-[#cfdbef]">{t.desc}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <BuyNowButton title="OEM Launch Deposit" unitAmountUsd={500} label={t.pay} />
          <Link href="/contact" className="btn bg-white text-[#112742]">
            {t.call}
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {t.workflow.map((block) => (
          <article key={block.title} className="card p-6">
            <h2 className="heading-font text-3xl font-semibold text-[#122744]">{block.title}</h2>
            <ul className="mt-4 space-y-2 text-[#4f607d]">
              {block.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
