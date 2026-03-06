import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type Article = { title: string; slug: string; category: string; excerpt: string };

async function getArticles(): Promise<Article[]> {
  return safeFetchJson<Article[]>("/seo/articles", []);
}

const copy: Record<SiteLang, { kicker: string; title: string; desc: string; noArticle: string; readMore: string }> = {
  en: {
    kicker: "Insights",
    title: "Practical knowledge for underwear brand growth",
    desc: "Read clear guides on supplier selection, MOQ planning, quality control, and launch strategy for global markets.",
    noArticle: "No articles yet. Create or generate articles in Admin SEO.",
    readMore: "Read Article"
  },
  zh: {
    kicker: "行业洞察",
    title: "服务内衣品牌增长的实战内容",
    desc: "围绕供应商筛选、MOQ 规划、质量控制与出海策略，持续发布可执行的制造与运营经验。",
    noArticle: "暂时还没有文章，可以在后台 SEO 模块创建或生成。",
    readMore: "阅读全文"
  },
  es: {
    kicker: "Insights",
    title: "Conocimiento practico para crecer marcas de ropa interior",
    desc: "Guias claras sobre seleccion de proveedor, estrategia MOQ, control de calidad y lanzamiento para mercados globales.",
    noArticle: "Aun no hay articulos. Crea contenido desde Admin SEO.",
    readMore: "Leer Articulo"
  }
};

export default async function BlogPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const articles = await getArticles();
  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10">
        <p className="kicker">{t.kicker}</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
        <p className="mt-3 max-w-3xl leading-8 text-[#51627d]">{t.desc}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.length === 0 ? <div className="card p-6 text-[#52627d]">{t.noArticle}</div> : null}
        {articles.map((article) => (
          <article key={article.slug} className="card p-6">
            <p className="text-xs uppercase tracking-widest text-[#8b6a2c]">{article.category}</p>
            <h2 className="heading-font mt-2 text-3xl font-semibold text-[#122744]">{article.title}</h2>
            <p className="mt-3 leading-7 text-[#4f607d]">{article.excerpt}</p>
            <div className="mt-5"><Link href={`/blog/${article.slug}`} className="btn btn-soft">{t.readMore}</Link></div>
          </article>
        ))}
      </section>
    </main>
  );
}
