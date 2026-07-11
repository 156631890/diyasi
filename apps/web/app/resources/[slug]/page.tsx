import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { resourceArticles, type ResourceArticleBlock } from "@/lib/resource-articles";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function getArticle(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return resourceArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return buildMetadata({
      title: "Resource not found",
      description: "This resource guide is not available.",
      path: `/resources/${slug}`
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.desc,
    path: `/resources/${article.slug}`
  });
}

function publishedIso(value: string): string {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
}

function renderArticleBlock(block: ResourceArticleBlock, index: number) {
  if (block.type === "heading") {
    return (
      <h2 key={`${block.type}-${index}`} className="news-article-heading">
        {block.text}
      </h2>
    );
  }
  if (block.type === "paragraph") {
    return (
      <p key={`${block.type}-${index}`} className="news-article-paragraph">
        {block.text}
      </p>
    );
  }
  if (block.type === "faqQuestion") {
    return (
      <h3 key={`${block.type}-${index}`} className="news-article-faq-question">
        {block.text}
      </h3>
    );
  }
  if (block.type === "callout" || block.type === "cta") {
    return (
      <section key={`${block.type}-${index}`} className={`news-article-callout ${block.type === "cta" ? "news-article-callout-cta" : ""}`}>
        <p>{block.text}</p>
      </section>
    );
  }
  if (block.type === "image") {
    return (
      <figure key={`${block.type}-${index}`} className="news-article-figure">
        <img src={block.src} alt={block.alt} width={1200} height={800} loading="lazy" decoding="async" />
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
  }
  return (
    <div key={`${block.type}-${index}`} className="news-article-table-wrap">
      <table className="news-article-table">
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: article.title, path: `/resources/${article.slug}` }
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc,
    datePublished: publishedIso(article.publishedAt),
    image: article.images.map((image) => absoluteUrl(image.src)),
    author: {
      "@type": "Organization",
      name: "YiWu DiYaSi Dress Co., Ltd."
    },
    publisher: {
      "@type": "Organization",
      name: "YiWu DiYaSi Dress Co., Ltd."
    },
    mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`)
  };

  const faqs: { q: string; a: string }[] = [];
  for (let i = 0; i < article.blocks.length - 1; i++) {
    const block = article.blocks[i];
    const nextBlock = article.blocks[i + 1];
    if (block.type === "faqQuestion" && nextBlock.type === "paragraph") {
      faqs.push({
        q: block.text,
        a: nextBlock.text,
      });
    }
  }

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  } : null;

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <section className="visual-hero page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle">{article.keyword}</p>
          <h1 className="section-title mt-2 text-[#1d2521]">{article.title}</h1>
          <p className="resource-card-date mt-4">{article.publishedAt}</p>
          <p className="page-reference-body mt-4 text-[#5f6b66]">{article.desc}</p>
        </div>
        <div className="visual-hero-media">
          <img
            src={article.coverImage}
            alt={article.title}
            width={1200}
            height={800}
            decoding="async"
            fetchPriority="high"
            className="visual-hero-image"
          />
        </div>
      </section>

      <article className="news-article-body page-section">
        {article.blocks.map((block, index) => renderArticleBlock(block, index))}
      </article>

      <section className="factory-cta-band page-section">
        <div>
          <p className="kicker page-reference-subtitle text-[#d7eee8]">Buyer Guide</p>
          <h2 className="card-title-standard mt-3 text-white">Apply this guide to your project brief</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-white/82">
            Send product category, target market, estimated quantity, fabric direction, packaging needs, and launch timing.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Start a Project
        </Link>
      </section>
    </main>
  );
}
