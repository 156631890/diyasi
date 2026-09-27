import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import NewsCard from "@/components/NewsCard";
import { catalogProducts } from "@/lib/catalog-source";
import { findNewsArticle, newsArticles, newsDate } from "@/lib/news-articles";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findNewsArticle((await params).slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: true } };
  const metadata = buildMetadata({ title: article.title, description: article.description, path: `/news/${article.slug}` });
  const image = { url: absoluteUrl(article.coverImage), alt: article.coverAlt };
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, images: [image] },
    twitter: { ...metadata.twitter, card: "summary_large_image", images: [image] },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = findNewsArticle((await params).slug);
  if (!article) notFound();
  const path = `/news/${article.slug}`;
  const related = article.models.map((model) => catalogProducts.find((product) => product.model_number === model)!);
  const sources = related.flatMap((product) => product.source_urls.map((url) => ({ label: `${product.model_number} original product specification`, url })));
  return (
    <main id="main-content">
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" }, { name: "News & insights", path: "/news" }, { name: article.title, path },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": article.category === "Company news" ? "NewsArticle" : "Article",
        "@id": `${absoluteUrl(path)}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        image: [absoluteUrl(article.coverImage)],
        inLanguage: "en",
        articleSection: article.category,
        author: { "@type": "Organization", name: "DIYASI", url: absoluteUrl("/about") },
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        mainEntityOfPage: absoluteUrl(path),
        citation: [...sources.map(({ url }) => url), ...(article.references ?? []).map(({ href }) => href)],
      }} />
      <header className="d-article-head">
        <nav className="d-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/news">News &amp; insights</Link>
        </nav>
        <p className="d-eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p className="d-fineprint">By <Link href="/about">DIYASI</Link> · Published <time dateTime={article.publishedAt}>{newsDate(article.publishedAt)}</time>
          {article.updatedAt !== article.publishedAt && <> · Updated <time dateTime={article.updatedAt}>{newsDate(article.updatedAt)}</time></>}
        </p>
      </header>
      <div className="d-article-layout">
        <aside className="d-article-aside">
          <p className="d-eyebrow">In this story</p>
          <nav aria-label="Article contents">
            {article.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}>{section.title}</a>)}
          </nav>
          <Link href="/news" className="d-text-link">All news &amp; insights ↗</Link>
        </aside>
        <article className="d-article-body">
          <p className="d-article-answer">{article.intro}</p>
          <figure className="d-article-photo">
            <Image src={article.coverImage} alt={article.coverAlt} width={900} height={700} sizes="(max-width:800px) 88vw,750px" priority />
            <figcaption>{article.imageCaption}</figcaption>
          </figure>
          {article.sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.rows && <div className="d-table-scroll" tabIndex={0} role="region" aria-label={`${section.title} comparison`}>
                <table>
                  <thead><tr>{section.rows[0].map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr></thead>
                  <tbody>{section.rows.slice(1).map((row) => <tr key={row[0]}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>}
            </section>
          ))}
          <section className="d-reading">
            <h2>Put your research to work</h2>
            {article.reading.map(({ label, href }) => <Link key={href} className="d-text-link" href={href}>{label} ↗</Link>)}
          </section>
          <section className="d-source-links">
            <h2>Product sources</h2>
            <p>Product examples refer to the linked DIYASI source specifications. Confirm the final materials, measurements and availability for your selected sample.</p>
            {sources.map(({ label, url }) => <a href={url} key={url} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}
          </section>
          {article.references && article.references.length > 0 && <section className="d-source-links">
            <h2>Further references</h2>
            {article.references.map(({ label, href }) => <a href={href} key={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}
          </section>}
          <section className="d-service-cta">
            <h2>A starting point for your collection.</h2>
            <p>Share your selected model numbers, intended market and sample requirements with the DIYASI team.</p>
            <Link href="/contact" className="d-button">Discuss your collection ↗</Link>
          </section>
        </article>
      </div>
      <section className="d-section d-related">
        <div className="d-section-heading"><h2>The styles in this story</h2><Link href="/products" className="d-text-link">Explore the collection ↗</Link></div>
        <div className="d-product-grid">{related.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>
      <section className="d-section d-reading">
        <div className="d-section-heading"><h2>More from DIYASI</h2><Link href="/news" className="d-text-link">All news ↗</Link></div>
        <div className="d-news-grid">{newsArticles.filter((other) => other.slug !== article.slug).slice(0, 3).map((other) => <NewsCard key={other.slug} article={other} />)}</div>
      </section>
    </main>
  );
}
