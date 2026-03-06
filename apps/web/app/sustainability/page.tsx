import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";

type StrategyItem = {
  title: string;
  copy: string;
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    strategy: StrategyItem[];
  }
> = {
  en: {
    kicker: "Sustainability",
    title: "Sustainability is a production standard, not a marketing slogan",
    desc:
      "We apply sustainability through material decisions, process control, and long-term product quality performance.",
    strategy: [
      {
        title: "Responsible Material Selection",
        copy: "We prioritize certified and traceable fabrics that balance skin comfort, durability, and environmental impact."
      },
      {
        title: "Waste-Aware Manufacturing",
        copy:
          "By improving planning accuracy and quality checkpoints, we reduce rework, material waste, and excessive packaging."
      },
      {
        title: "Long-Life Product Thinking",
        copy: "Better fit, stronger construction, and stable quality help end customers wear longer and replace less frequently."
      }
    ]
  },
  zh: {
    kicker: "可持续",
    title: "可持续不是营销口号，而是制造标准",
    desc: "我们将可持续落实在面料选择、工艺控制与长期品质表现中，确保每个环节可执行、可验证。",
    strategy: [
      {
        title: "负责任的面料选择",
        copy: "优先选择可追溯、可认证的面料方案，在舒适度、耐用性与环境影响之间取得平衡。"
      },
      {
        title: "减少浪费的生产管理",
        copy: "通过排产优化与质检前置，持续降低返工率、材料损耗与过度包装。"
      },
      {
        title: "面向长期穿着的产品思维",
        copy: "通过更稳定的版型与做工，让产品更耐穿，减少频繁替换，提升品牌长期价值。"
      }
    ]
  },
  es: {
    kicker: "Sostenibilidad",
    title: "La sostenibilidad es un estandar de produccion, no un eslogan",
    desc:
      "La aplicamos en decisiones de material, control de procesos y rendimiento de calidad a largo plazo.",
    strategy: [
      {
        title: "Seleccion Responsable de Materiales",
        copy:
          "Priorizamos tejidos certificados y trazables que equilibran confort, durabilidad e impacto ambiental."
      },
      {
        title: "Manufactura con Menos Desperdicio",
        copy:
          "Con mejor planificacion y control de calidad reducimos retrabajos, desperdicio de material y exceso de empaque."
      },
      {
        title: "Diseno para Mayor Vida Util",
        copy: "Mejor ajuste y construccion mas estable ayudan al cliente final a usar por mas tiempo y reemplazar menos."
      }
    ]
  }
};

export default function SustainabilityPage() {
  const lang = getServerLang();
  const t = copy[lang];
  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10">
        <p className="kicker">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#51627d]">{t.desc}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {t.strategy.map((item) => (
          <article key={item.title} className="card p-6">
            <h2 className="heading-font text-3xl font-semibold text-[#112742]">{item.title}</h2>
            <p className="mt-3 leading-7 text-[#4f607d]">{item.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
