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
    title: "Thoughtful factory-side writing for brands building with intention",
    desc: "Notes on sourcing, MOQ discipline, quality control, and launch decisions, written to be useful rather than noisy.",
    noArticle: "No articles yet. Create or generate articles in Admin SEO.",
    readMore: "Read",
    leadTitle: "Writing that should feel closer to guidance than content marketing",
    leadDesc: "The goal is not volume. The goal is a clearer point of view for buyers comparing factories, timelines, and quality expectations."
  },
  zh: {
    kicker: "文章",
    title: "写给真正准备启动产品线品牌方的工厂侧内容",
    desc: "围绕 sourcing、MOQ 节奏、质量控制与出海决策，提供更有判断力而不是更嘈杂的内容。",
    noArticle: "暂时还没有文章，可以在后台 SEO 模块创建或生成。",
    readMore: "阅读",
    leadTitle: "这些内容应该更像判断参考，而不是内容营销",
    leadDesc: "重点不是数量，而是帮助买家在比较工厂、时间和质量预期时，获得更清晰的视角。"
  },
  es: {
    kicker: "Journal",
    title: "Escritura del lado de fabrica para marcas que construyen con criterio",
    desc: "Notas sobre sourcing, disciplina MOQ, control de calidad y decisiones de lanzamiento, pensadas para ser utiles y no ruidosas.",
    noArticle: "Aun no hay articulos. Crea contenido desde Admin SEO.",
    readMore: "Leer",
    leadTitle: "El tono debe sentirse mas cercano a guia que a marketing de contenido",
    leadDesc: "La meta no es volumen. La meta es ofrecer un punto de vista mas claro para compradores que comparan fabrica, timing y calidad."
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
            <p className="kicker">{t.kicker}</p>
            <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#51627d]">{t.desc}</p>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.kicker}</p>
            <p className="mt-4 text-lg leading-8 text-[#44546d]">{t.leadTitle}</p>
            <p className="mt-3 text-[#5d6e89] leading-8">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        {lead ? (
          <article className="catalog-feature">
            <div className="catalog-feature-copy">
              <p className="kicker">{lead.category}</p>
              <h2 className="heading-font mt-3 text-5xl font-semibold text-[#112742]">{lead.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4f607d]">{lead.excerpt}</p>
              <div className="mt-8">
                <Link href={`/blog/${lead.slug}`} className="btn btn-primary">{t.readMore}</Link>
              </div>
            </div>
            <div className="wide-visual-shell">
              <div className="grid h-full place-items-center bg-gradient-to-br from-[#dfe7f5] via-[#f6f8fc] to-[#efe5d3] px-8 text-center">
                <p className="heading-font max-w-lg text-4xl font-semibold leading-[1.1] text-[#132845]">{lead.title}</p>
              </div>
            </div>
          </article>
        ) : null}
      </section>

      <section className="catalog-grid mt-12">
        {articles.length === 0 ? <div className="card p-6 text-[#52627d]">{t.noArticle}</div> : null}
        {rest.map((article) => (
          <article key={article.slug} className="catalog-card">
            <div className="catalog-card-copy">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a2c]">{article.category}</p>
              <h2 className="heading-font mt-2 text-3xl font-semibold text-[#122744]">{article.title}</h2>
              <p className="mt-3 leading-8 text-[#4f607d]">{article.excerpt}</p>
              <div className="mt-5"><Link href={`/blog/${article.slug}`} className="btn btn-soft">{t.readMore}</Link></div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
