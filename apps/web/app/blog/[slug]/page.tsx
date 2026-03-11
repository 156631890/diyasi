import { safeFetchJson } from "@/lib/api";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";
import { notFound } from "next/navigation";

type Article = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  is_published: boolean;
};

type Props = { params: { slug: string } };

async function getArticle(slug: string): Promise<Article | null> {
  return safeFetchJson<Article | null>(`/seo/articles/${slug}`, null);
}

const copy: Record<
  SiteLang,
  {
    back: string;
    discuss: string;
    kicker: string;
    lead: string;
  }
> = {
  en: {
    back: "View Journal",
    discuss: "Start a Conversation",
    kicker: "Journal",
    lead: "Factory article on product development, quality, and delivery."
  },
  zh: {
    back: "查看文章",
    discuss: "开始沟通",
    kicker: "文章",
    lead: "这是一篇关于产品开发、质量与交付的工厂文章。"
  },
  es: {
    back: "Ver Journal",
    discuss: "Iniciar Conversación",
    kicker: "Journal",
    lead: "Articulo de fabrica sobre desarrollo de producto, calidad y entrega."
  }
};

export default async function BlogDetailPage({ params }: Props) {
  const lang = getServerLang();
  const t = copy[lang];
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="kicker page-reference-subtitle">{t.kicker}</p>
            <h1 className="section-title mt-2 text-[#122744]">{article.title}</h1>
            <p className="page-reference-body mt-4 max-w-3xl text-[#51627d]">{article.excerpt}</p>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{article.category}</p>
            <p className="page-reference-subtitle mt-4 text-[#44546d]">{t.lead}</p>
          </div>
        </div>
      </section>

      <section className="editorial-strip mt-10">
        <div>
          <p className="kicker page-reference-subtitle">{article.category}</p>
          <p className="page-reference-body mt-3 max-w-3xl text-[#43536c]">
            {lang === "zh"
              ? "这篇文章围绕产品开发、生产安排、交付节奏和工厂合作展开。"
              : lang === "es"
                ? "Este articulo trata desarrollo de producto, ritmo de entrega, produccion y cooperacion con fabrica."
                : "This article covers product development, production timing, delivery rhythm, and factory cooperation."}
          </p>
        </div>
      </section>

      <article className="mt-10">
        <div className="prose prose-slate max-w-none whitespace-pre-wrap page-reference-body text-[#243450]">{article.body}</div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-soft">{t.back}</Link>
          <Link href="/contact" className="btn btn-primary">{t.discuss}</Link>
        </div>
      </article>
    </main>
  );
}
