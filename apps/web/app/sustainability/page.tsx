import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    sectionTitle: string;
    closing: string;
    strategy: Array<{ title: string; copy: string }>;
  }
> = {
  en: {
    kicker: "Sustainability",
    title: "Sustainable materials, lower waste, and longer product life",
    desc: "Our sustainability work focuses on material selection, process control, and product durability in daily production.",
    sectionTitle: "How it shows up in production",
    closing: "We apply sustainability through certified fabrics, waste reduction, and longer-wear products across sampling and bulk production.",
    strategy: [
      {
        title: "Responsible Material Selection",
        copy: "We prioritize certified and traceable fabrics that balance skin comfort, durability, and environmental impact."
      },
      {
        title: "Waste-Aware Manufacturing",
        copy: "By improving planning accuracy and quality checkpoints, we reduce rework, material waste, and excessive packaging."
      },
      {
        title: "Long-Life Product Thinking",
        copy: "Better fit, stronger construction, and stable quality help end customers wear longer and replace less frequently."
      }
    ]
  },
  zh: {
    kicker: "可持续",
    title: "可持续面料、减少浪费与更长产品寿命",
    desc: "我们的可持续工作落实在面料选择、生产控制和产品耐用性上。",
    sectionTitle: "它如何体现在生产里",
    closing: "我们通过认证面料、减少浪费和更耐穿的产品，把可持续落实到打样和量产流程里。",
    strategy: [
      {
        title: "负责任的面料选择",
        copy: "优先选择可追溯、可认证的面料方案，在舒适度、耐用性与环境影响之间取得平衡。"
      },
      {
        title: "减少浪费的生产管理",
        copy: "通过排产优化和质检前置，持续降低返工、材料损耗和过度包装。"
      },
      {
        title: "面向长期使用的产品思维",
        copy: "通过更稳定的版型与做工，让产品更耐穿，减少频繁替换。"
      }
    ]
  },
  es: {
    kicker: "Sostenibilidad",
    title: "Materiales sostenibles, menos desperdicio y mayor vida util",
    desc: "La sostenibilidad se aplica en seleccion de materiales, control de proceso y durabilidad del producto.",
    sectionTitle: "Cómo aparece en producción",
    closing: "La aplicamos con tejidos certificados, menos desperdicio y productos de mayor duracion en muestra y produccion bulk.",
    strategy: [
      {
        title: "Seleccion Responsable de Materiales",
        copy: "Priorizamos tejidos certificados y trazables que equilibran confort, durabilidad e impacto ambiental."
      },
      {
        title: "Manufactura con Menos Desperdicio",
        copy: "Con mejor planificación y control de calidad reducimos retrabajos, desperdicio de material y exceso de empaque."
      },
      {
        title: "Diseño para Mayor Vida Útil",
        copy: "Mejor ajuste y construcción más estable ayudan al cliente final a usar por más tiempo y reemplazar menos."
      }
    ]
  }
};

export default function SustainabilityPage() {
  const lang = getServerLang();
  const t = copy[lang];
  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#6a3524]">{t.title}</h1>
        <p className="page-reference-body mt-4 max-w-3xl text-[#51627d]">{t.desc}</p>
      </section>

      <section className="mt-10">
        <div className="section-lead">
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#6a3524]">{t.sectionTitle}</h2>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {t.strategy.map((item, index) => (
            <article key={item.title} className="editorial-column">
              <p className="text-sm uppercase tracking-[0.22em] text-[#8b6a2c]">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="page-reference-subtitle mt-4 text-[#112742]">{item.title}</h2>
              <p className="page-reference-body mt-4 text-[#4f607d]">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip mt-12">
        <div>
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <p className="page-reference-body mt-3 max-w-3xl text-[#43536c]">{t.closing}</p>
        </div>
      </section>
    </main>
  );
}
