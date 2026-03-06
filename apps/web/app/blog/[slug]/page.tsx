import { API_BASE } from "@/lib/api";
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

type Props = {
  params: { slug: string };
};

async function getArticle(slug: string): Promise<Article | null> {
  const response = await fetch(`${API_BASE}/seo/articles/${slug}`, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

const copy: Record<SiteLang, { back: string; discuss: string }> = {
  en: { back: "Back to Blog", discuss: "Discuss With Team" },
  zh: { back: "返回博客", discuss: "联系团队沟通" },
  es: { back: "Volver al Blog", discuss: "Hablar con el equipo" }
};

export default async function BlogDetailPage({ params }: Props) {
  const lang = getServerLang();
  const t = copy[lang];
  const article = await getArticle(params.slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="container-shell py-10">
      <article className="card p-7 md:p-10">
        <p className="kicker">{article.category}</p>
        <h1 className="section-title mt-2 text-[#122744]">{article.title}</h1>
        <p className="mt-3 max-w-3xl leading-8 text-[#51627d]">{article.excerpt}</p>
        <div className="brand-divider my-6" />
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-[15px] leading-8 text-[#243450]">
          {article.body}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-soft">
            {t.back}
          </Link>
          <Link href="/contact" className="btn btn-primary">
            {t.discuss}
          </Link>
        </div>
      </article>
    </main>
  );
}
