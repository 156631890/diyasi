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
    title: "Sustainability is a production standard, not a marketing slogan",
    desc: "We apply sustainability through material decisions, process control, and long-term product quality performance.",
    sectionTitle: "How it shows up in production",
    closing: "Sustainability is strongest when it is visible in sourcing discipline, process stability, and product life span, not just in a footer badge.",
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
    title: "可持续不是营销口号，而是生产标准",
    desc: "我们把可持续落实在面料选择、工艺控制与长期质量表现上。",
    sectionTitle: "它如何体现在生产里",
    closing: "真正有分量的可持续，应该体现在采购纪律、流程稳定性和产品寿命里，而不是只停留在页面标签。",
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
    title: "La sostenibilidad es un estándar de producción, no un eslogan",
    desc: "La aplicamos en decisiones de material, control de procesos y rendimiento de calidad a largo plazo.",
    sectionTitle: "Cómo aparece en producción",
    closing: "La sostenibilidad gana peso cuando se ve en disciplina de compra, estabilidad de proceso y vida útil del producto, no solo en una insignia visual.",
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
        <p className="kicker">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#51627d]">{t.desc}</p>
      </section>

      <section className="mt-10">
        <div className="section-lead">
          <p className="kicker">{t.kicker}</p>
          <h2 className="heading-font mt-2 text-4xl font-semibold text-[#122744]">{t.sectionTitle}</h2>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {t.strategy.map((item, index) => (
            <article key={item.title} className="editorial-column">
              <p className="text-sm uppercase tracking-[0.22em] text-[#8b6a2c]">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="heading-font mt-4 text-3xl font-semibold text-[#112742]">{item.title}</h2>
              <p className="mt-4 leading-8 text-[#4f607d]">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip mt-12">
        <div>
          <p className="kicker">{t.kicker}</p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#43536c]">{t.closing}</p>
        </div>
      </section>
    </main>
  );
}
