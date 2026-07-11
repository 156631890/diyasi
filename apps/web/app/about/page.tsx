import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { companyInfo, trustStats } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "About YiWu DiYaSi — China Underwear Manufacturer Since 2002",
  description:
    "Learn about YiWu DiYaSi Dress Co., Ltd., a leading private label underwear manufacturer in China since 2002. 20,000 sq m factory, 600,000+ pcs monthly capacity, BSCI & OEKO-TEX certified.",
  path: "/about"
});

import { getServerLang } from "@/lib/server-lang";
import { SiteLang } from "@/lib/i18n";

const copy: Record<
  SiteLang,
  {
    subtitle: string;
    title: string;
    desc1: string;
    desc2: string;
    ctaProject: string;
    ctaFactory: string;
    timelineTitle: string;
    timelineSub: string;
    timelineDesc: string;
    promises: Array<{ title: string; text: string }>;
    timeline: Array<{ year: string; milestone: string }>;
  }
> = {
  en: {
    subtitle: `About ${companyInfo.shortName}`,
    title: "An underwear factory built for private label growth",
    desc1: `${companyInfo.name} is located in Yiwu, Zhejiang, China. We support underwear brands, retailers, wholesalers, and sourcing teams with product development, sampling, custom labels, packaging coordination, bulk production, and global delivery.`,
    desc2: "The factory focuses on women's underwear, men's underwear, bras and bralettes, seamless underwear, shapewear, activewear, period underwear, loungewear, and related private label programs.",
    ctaProject: "Start a Project",
    ctaFactory: "View Factory & Quality",
    timelineTitle: "Our Timeline",
    timelineSub: "A practical manufacturing story",
    timelineDesc: "The timeline uses conservative public-facing milestones. Certificate numbers, audit dates, and document validity should be shown only after the latest real files are confirmed.",
    promises: [
      {
        title: "Stable Quality",
        text: "We focus on repeatable fit, controlled fabric selection, inline inspection, and final packing review for long-term programs."
      },
      {
        title: "Clear Communication",
        text: "Buyers receive practical answers on MOQ, sample timing, packaging route, production lead time, and next steps."
      },
      {
        title: "Design Protection",
        text: "Private label projects are handled with controlled communication around artwork, label files, packaging details, and development references."
      }
    ],
    timeline: [
      {
        year: String(companyInfo.establishedYear),
        milestone: "Factory established in Yiwu with underwear manufacturing as the core production direction."
      },
      {
        year: "2011",
        milestone: "OEM / ODM export programs expanded for international buyers and private label projects."
      },
      {
        year: "2018",
        milestone: "Quality control, production coordination, and compliance documentation were strengthened for buyer review."
      },
      {
        year: "2026",
        milestone: "Digital sourcing, multilingual inquiry, and private label project workflows upgraded for global buyers."
      }
    ]
  },
  zh: {
    subtitle: `关于 ${companyInfo.shortName}`,
    title: "面向贴牌定制发展的内衣工厂",
    desc1: `${companyInfo.name}位于中国浙江义乌。我们为内衣品牌、零售商、批发商及采购团队提供产品开发、打样、定制标签、包装协调、大货生产与全球交付等支持。`,
    desc2: "本工厂专注于女性内衣、男性内衣、文胸和无钢圈胸衣、无缝内衣、塑身衣、运动服、生理期内衣、家居服及相关的贴牌定制项目。",
    ctaProject: "发起项目",
    ctaFactory: "查看工厂与质量",
    timelineTitle: "我们的发展历程",
    timelineSub: "务实的制造故事",
    timelineDesc: "此历程展示了工厂稳健的公开里程碑。证书编号、审核日期及文件有效性将在确认最新真实文件后提供。",
    promises: [
      {
        title: "稳定质量",
        text: "我们专注于中长期项目的版型稳定性、严格的面料选择、产线中检和大货出厂包装检验。"
      },
      {
        title: "清晰沟通",
        text: "买家可以获得关于 MOQ、打样周期、包装途径、大货交期以及下一步安排的务实答复。"
      },
      {
        title: "设计保护",
        text: "贴牌定制项目中的设计图纸、洗水唛标签、包装细节和开发参考信息都受到严格的保密管理。"
      }
    ],
    timeline: [
      {
        year: String(companyInfo.establishedYear),
        milestone: "工厂在义乌成立，以服装及内衣制造为核心生产方向。"
      },
      {
        year: "2011",
        milestone: "扩大了面向国际买家和贴牌定制项目的 OEM/ODM 出口计划。"
      },
      {
        year: "2018",
        milestone: "加强了质量控制、生产协调和合规文件，以便买家审核。"
      },
      {
        year: "2026",
        milestone: "升级了面向全球买家的数字化采购、多语言询盘及贴牌定制项目工作流程。"
      }
    ]
  },
  es: {
    subtitle: `Sobre ${companyInfo.shortName}`,
    title: "Fábrica de ropa interior enfocada en el crecimiento de marca propia",
    desc1: `${companyInfo.name} está ubicada en Yiwu, Zhejiang, China. Apoyamos a marcas de ropa interior, minoristas, mayoristas y equipos de sourcing con el desarrollo de productos, muestreo, etiquetas personalizadas, coordinación de empaques, producción a granel y entrega global.`,
    desc2: "La fábrica se especializa en ropa interior para mujer, ropa interior para hombre, sujetadores y bralettes, ropa interior sin costuras (seamless), fajas reductoras, ropa deportiva, bragas para el periodo, ropa de casa y programas afines de marca propia.",
    ctaProject: "Iniciar Proyecto",
    ctaFactory: "Ver Fábrica y Calidad",
    timelineTitle: "Nuestra Trayectoria",
    timelineSub: "Una historia de producción práctica",
    timelineDesc: "La línea de tiempo utiliza hitos públicos conservadores. Los números de certificado, fechas de auditoría y validez de documentos se mostrarán solo después de confirmar los archivos reales más recientes.",
    promises: [
      {
        title: "Calidad Estable",
        text: "Nos enfocamos en un ajuste consistente, selección controlada de telas, inspección en línea y revisión final del empaque para programas a largo plazo."
      },
      {
        title: "Comunicación Clara",
        text: "Los compradores reciben respuestas prácticas sobre el pedido mínimo (MOQ), tiempos de muestra, opciones de empaque, plazos de entrega y siguientes pasos."
      },
      {
        title: "Protección de Diseños",
        text: "Los proyectos de marca propia se gestionan bajo estricta confidencialidad en cuanto a diseños, archivos de etiquetas, empaques e información de desarrollo."
      }
    ],
    timeline: [
      {
        year: String(companyInfo.establishedYear),
        milestone: "Establecimiento de la fábrica en Yiwu, con la producción de ropa interior como núcleo operativo."
      },
      {
        year: "2011",
        milestone: "Expansión de programas de exportación OEM / ODM para clientes internacionales y proyectos de marca propia."
      },
      {
        year: "2018",
        milestone: "Refuerzo en el control de calidad, coordinación productiva y recopilación de documentos de cumplimiento."
      },
      {
        year: "2026",
        milestone: "Digitalización de compras, canales de consulta multilingües y flujos para marcas globales optimizados."
      }
    ]
  }
};

export default async function AboutPage() {
  const lang = await getServerLang();
  const t = copy[lang];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ]);
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${companyInfo.name}`,
    description:
      "Company story, manufacturing scope, product categories, timeline, and buyer promise for private label underwear programs.",
    url: absoluteUrl("/about")
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />

      <section className="hero-panel page-hero overflow-hidden md:p-10 lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="page-copy-wide">
            <p className="kicker page-reference-subtitle">{t.subtitle}</p>
            <h1 className="section-title mt-3 text-[#1d2521]">{t.title}</h1>
            <p className="page-reference-body mt-4 text-[#5f6b66]">
              {t.desc1}
            </p>
            <p className="page-reference-body mt-4 text-[#5f6b66]">
              {t.desc2}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                {t.ctaProject}
              </Link>
              <Link href="/factory" className="btn btn-soft">
                {t.ctaFactory}
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <img
              src="/media/home/factory-1.jpg"
              alt="YiWu DiYaSi factory exterior and production site"
              loading="lazy"
              decoding="async"
              className="rounded-lg object-cover shadow-xl"
            />
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/media/home/factory-2.jpg"
                alt="Factory production area"
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-lg object-cover"
              />
              <img
                src="/media/home/factory-3.jpg"
                alt="Factory inspection and production details"
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {trustStats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-4">
              <p className="text-lg font-bold text-[#1d2521]">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-normal text-[#7d8a85]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principles">
        {t.promises.map((item) => (
          <article key={item.title} className="editorial-column">
            <h2 className="page-reference-subtitle text-[#1d2521]">{item.title}</h2>
            <p className="page-reference-body mt-4 text-[#5f6b66]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="page-section editorial-strip">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">{t.timelineTitle}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.timelineSub}</h2>
          <p className="page-reference-body mt-3 max-w-3xl text-[#5f6b66]">
            {t.timelineDesc}
          </p>
        </div>
      </section>

      <section className="about-timeline">
        {t.timeline.map((item) => (
          <article key={item.year} className="timeline-row">
            <div className="timeline-year">{item.year}</div>
            <p className="timeline-copy page-reference-body">{item.milestone}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
