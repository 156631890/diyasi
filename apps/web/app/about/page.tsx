import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type MediaAsset = {
  id: number;
  image_url: string;
  title: string;
};

const aboutDetailImages = [
  {
    id: -11,
    title: "Quality Check Fabric Detail",
    image_url: "/media/generated/factory/quality-check-fabric-detail.png"
  },
  {
    id: -12,
    title: "Seamless Machine Detail",
    image_url: "/media/generated/factory/seamless-machine-detail.png"
  }
];

const aboutWideImage = "/media/generated/wide/about-wide-brand-floor.png";

const fallbackHeroImage: MediaAsset = {
  id: -1,
  title: "Material Confidence Hero",
  image_url: "/media/generated/hero-material-confidence.png"
};

async function getHeroImage(): Promise<MediaAsset | null> {
  const assets = await safeFetchJson<MediaAsset[]>("/media/assets?limit=1&asset_type=hero_banner", []);
  return assets[0] || fallbackHeroImage;
}

type ValueItem = {
  title: string;
  text: string;
};

type TimelineItem = {
  year: string;
  milestone: string;
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    cta1: string;
    cta2: string;
    milestone: string;
    journey: string;
    noVisual: string;
    values: ValueItem[];
    timeline: TimelineItem[];
  }
> = {
  en: {
    kicker: "About YiWu DiYaSi",
    title: "A manufacturing partner built for long-term brand growth",
    p1: "Founded on the belief that sustainability and high-quality manufacturing go hand in hand, YiWu DiYaSi Dress CO., LTD has spent over 23 years helping brands bring their dream underwear lines to life.",
    p2: "From product development to final delivery, we combine premium materials, reliable production systems, and practical OEM/ODM experience to support your growth at every stage.",
    cta1: "Start a Conversation",
    cta2: "View Factory",
    milestone: "Milestones",
    journey: "Our Growth Journey",
    noVisual: "Generate hero visual from Admin media library.",
    values: [
      { title: "Sustainable Material Commitment", text: "We prioritize premium sustainable fabrics that deliver comfort, durability, and responsible sourcing." },
      { title: "Precision Production Discipline", text: "From knitting and cutting to inline inspection, every step is controlled for consistency at scale." },
      { title: "Partnership for Growth", text: "We support each brand from first idea to repeat production with clear communication and dependable lead time." }
    ],
    timeline: [
      { year: "2003", milestone: "Factory established with first seamless underwear production line." },
      { year: "2011", milestone: "Expanded OEM/ODM service for international private-label brands." },
      { year: "2018", milestone: "Strengthened quality control and sustainable fabric sourcing roadmap." },
      { year: "2026", milestone: "Upgraded global operations through digital sales and multilingual site system." }
    ]
  },
  zh: {
    kicker: "关于迪雅斯",
    title: "为品牌长期增长而建立的制造合作关系",
    p1: "义乌迪雅斯服饰有限公司始终坚持可持续与高品质制造并行。23 年以上，我们持续帮助品牌把理想中的内衣产品线从概念推进到市场落地。",
    p2: "从产品开发到最终交付，我们以优质面料、稳定制造体系和成熟的 OEM/ODM 经验，为品牌每一个阶段的增长提供支持。",
    cta1: "开始沟通",
    cta2: "查看工厂",
    milestone: "发展里程碑",
    journey: "我们的成长路径",
    noVisual: "可在后台素材库生成品牌主视觉。",
    values: [
      { title: "可持续面料承诺", text: "优先选择高品质、可追溯的面料方案，在舒适度、耐用性与责任采购之间实现平衡。" },
      { title: "精细化制造纪律", text: "从织造、裁剪到在线质检，每一个环节都围绕稳定和一致性展开。" },
      { title: "面向增长的合作关系", text: "我们从品牌初期开发到复购量产持续支持，以清晰沟通和稳定交期陪伴成长。" }
    ],
    timeline: [
      { year: "2003", milestone: "工厂成立，并投入首条无缝内衣生产线。" },
      { year: "2011", milestone: "OEM/ODM 服务扩展至国际品牌客户。" },
      { year: "2018", milestone: "强化质量体系，并推进可持续面料 sourcing 路线。" },
      { year: "2026", milestone: "通过数字化官网与多语言系统升级全球业务能力。" }
    ]
  },
  es: {
    kicker: "Sobre YiWu DiYaSi",
    title: "Un socio de manufactura orientado al crecimiento de marca",
    p1: "Con la conviccion de que sostenibilidad y calidad deben avanzar juntas, YiWu DiYaSi Dress CO., LTD lleva mas de 23 anos ayudando a marcas a lanzar sus lineas de ropa interior.",
    p2: "Desde el desarrollo de producto hasta la entrega final, combinamos materiales premium, produccion estable y experiencia OEM/ODM para apoyar tu crecimiento.",
    cta1: "Iniciar Conversacion",
    cta2: "Ver Fabrica",
    milestone: "Hitos",
    journey: "Nuestra Evolucion",
    noVisual: "Genera visual principal desde Admin.",
    values: [
      { title: "Compromiso con Materiales Sostenibles", text: "Priorizamos tejidos premium sostenibles con equilibrio entre confort, durabilidad y trazabilidad." },
      { title: "Disciplina de Produccion", text: "Desde tejido y corte hasta inspeccion en linea, cada etapa se controla para mantener consistencia." },
      { title: "Socio para el Crecimiento", text: "Acompanamos a cada marca desde el primer desarrollo hasta produccion recurrente con plazos confiables." }
    ],
    timeline: [
      { year: "2003", milestone: "Fundacion de fabrica y primera linea seamless de ropa interior." },
      { year: "2011", milestone: "Expansion del servicio OEM/ODM para marcas internacionales." },
      { year: "2018", milestone: "Fortalecimiento de control de calidad y ruta de tejido sostenible." },
      { year: "2026", milestone: "Operacion global reforzada con sistema digital y sitio multilingue." }
    ]
  }
};

export default async function AboutPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const heroImage = await getHeroImage();
  return (
    <main className="container-shell py-10">
      <section className="hero-panel overflow-hidden p-7 md:p-10 lg:p-12">
        <div className="grid items-center gap-7 lg:grid-cols-2">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h1 className="section-title mt-3 text-[#122744]">{t.title}</h1>
            <p className="mt-4 leading-8 text-[#4f607d]">{t.p1}</p>
            <p className="mt-4 leading-8 text-[#4f607d]">{t.p2}</p>
            <div className="mt-6 flex gap-3">
              <Link href="/contact" className="btn btn-primary">{t.cta1}</Link>
              <Link href="/factory" className="btn btn-soft">{t.cta2}</Link>
            </div>
          </div>
          <div className="about-visual-shell">
            {heroImage ? (
              <div className="about-visual-stack">
                <img src={heroImage.image_url} alt={heroImage.title} className="about-visual" />
                <div className="about-detail-grid">
                  {aboutDetailImages.map((item) => (
                    <img key={item.id} src={item.image_url} alt={item.title} className="about-detail-image" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid h-[360px] place-items-center rounded-2xl bg-gradient-to-br from-[#dce5f5] to-[#f6ead7] text-sm text-slate-600">{t.noVisual}</div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="section-lead">
          <p className="kicker">{t.kicker}</p>
          <h2 className="heading-font mt-2 text-4xl font-semibold text-[#122744]">{t.journey}</h2>
        </div>
      </section>

      <section className="mt-8 about-principles">
        {t.values.map((item) => (
          <article key={item.title} className="editorial-column">
            <h2 className="heading-font text-3xl font-semibold text-[#122744]">{item.title}</h2>
            <p className="mt-4 leading-8 text-[#52627c]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 editorial-strip">
        <div>
          <p className="kicker">{t.milestone}</p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#43536c]">
            {lang === "zh"
              ? "从第一条无缝内衣生产线开始，迪雅斯的能力建设始终围绕交付稳定性、品类延展和国际合作经验扩展。"
              : lang === "es"
                ? "Desde la primera linea seamless, la evolucion de DiYaSi ha estado centrada en estabilidad operativa, amplitud de categoria y experiencia internacional."
                : "From the first seamless production line onward, DiYaSi has expanded around delivery stability, category depth, and international execution."}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <div className="wide-visual-shell">
          <img src={aboutWideImage} alt="Brand floor and development space" className="wide-visual" />
        </div>
      </section>

      <section className="mt-8 about-timeline">
        {t.timeline.map((item) => (
          <article key={item.year} className="timeline-row">
            <div className="timeline-year">{item.year}</div>
            <p className="timeline-copy">{item.milestone}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
