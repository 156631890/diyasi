import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type Article = { title: string; slug: string; category: string; excerpt: string };

async function getArticles(): Promise<Article[]> {
  return safeFetchJson<Article[]>("/seo/articles", []);
}

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    noArticle: string;
    readMore: string;
    leadTitle: string;
    leadDesc: string;
  }
> = {
  en: {
    kicker: "Journal",
    title: "Factory articles on sourcing, MOQ, quality control, and launch planning",
    desc: "Read practical articles on product development, sampling, compliance, and delivery planning for underwear programs.",
    noArticle: "No articles yet. Create or generate articles in Admin SEO.",
    readMore: "Read",
    leadTitle: "Articles for buyers comparing factories, timelines, and product quality",
    leadDesc: "These posts focus on sourcing decisions, MOQ structure, production timing, and common issues in OEM / ODM underwear projects."
  },
  zh: {
    kicker: "文章",
    title: "围绕 sourcing、MOQ、质量控制与上市节奏的工厂文章",
    desc: "这里集中展示与产品开发、打样推进、合规准备和交付计划相关的实用内容。",
    noArticle: "暂时还没有文章，可以在后台 SEO 模块创建或生成。",
    readMore: "阅读",
    leadTitle: "写给正在比较工厂、交期和质量预期的采购团队",
    leadDesc: "文章重点覆盖 sourcing 选择、MOQ 结构、生产节奏，以及 OEM / ODM 项目中的常见问题。"
  },
  es: {
    kicker: "Journal",
    title: "Articulos de fabrica sobre sourcing, MOQ, control de calidad y lanzamientos",
    desc: "Consulta contenido practico sobre desarrollo de producto, muestreo, compliance y planificacion de entrega.",
    noArticle: "Aún no hay artículos. Crea contenido desde Admin SEO.",
    readMore: "Leer",
    leadTitle: "Contenido para compradores que comparan fabrica, timing y calidad",
    leadDesc: "Los articulos se enfocan en decisiones de sourcing, estructura de MOQ, tiempos de produccion y problemas comunes en proyectos OEM / ODM."
  }
};

export default async function BlogPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const articles = await getArticles();
  const lead = articles[0] || null;
  const rest = articles.slice(1);

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="kicker page-reference-subtitle">{t.kicker}</p>
            <h1 className="section-title mt-2 text-[#6a3524]">{t.title}</h1>
            <p className="page-reference-body mt-4 max-w-3xl text-[#7d4f3e]">{t.desc}</p>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.kicker}</p>
            <p className="page-reference-subtitle mt-4 text-[#6a3524]">{t.leadTitle}</p>
            <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        {lead ? (
          <article className="catalog-feature">
            <div className="catalog-feature-copy">
              <p className="kicker">{lead.category}</p>
              <h2 className="page-reference-subtitle mt-3 text-[#6a3524]">{lead.title}</h2>
              <p className="page-reference-body mt-4 max-w-2xl text-[#7d4f3e]">{lead.excerpt}</p>
              <div className="mt-8">
                <Link href={`/blog/${lead.slug}`} className="btn btn-primary">{t.readMore}</Link>
              </div>
            </div>
            <div className="wide-visual-shell">
              <div className="grid h-full place-items-center bg-gradient-to-br from-[#fff7f0] via-[#fffaf6] to-[#efe0d2] px-8 text-center">
                <p className="page-reference-subtitle max-w-lg text-[#6a3524]">{lead.title}</p>
              </div>
            </div>
          </article>
        ) : null}
      </section>

      <section className="catalog-grid mt-12">
        {articles.length === 0 ? <div className="card p-6 text-[#7d4f3e]">{t.noArticle}</div> : null}
        {rest.map((article) => (
          <article key={article.slug} className="catalog-card">
            <div className="catalog-card-copy">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">{article.category}</p>
              <h2 className="page-reference-subtitle mt-2 text-[#6a3524]">{article.title}</h2>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{article.excerpt}</p>
              <div className="mt-5"><Link href={`/blog/${article.slug}`} className="btn btn-soft">{t.readMore}</Link></div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
