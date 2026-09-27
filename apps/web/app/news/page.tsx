import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/lib/news-articles";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Underwear News, Collection Notes & Buyer Insights",
  description: "Read DIYASI company updates, underwear collection notes and practical buying insights. Explore real styles, fabrics and fit details for your next collection.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <main id="main-content">
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "News & insights", path: "/news" },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "DIYASI News & insights",
        url: absoluteUrl("/news"),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: newsArticles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: absoluteUrl(`/news/${article.slug}`),
          })),
        },
      }} />
      <header className="d-catalog-intro d-news-intro">
        <div>
          <nav className="d-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span aria-current="page">News</span>
          </nav>
          <p className="d-eyebrow">From the people behind your collection</p>
          <h1>Underwear news &amp; buying notes</h1>
          <p>Company updates, collection notes and a closer look at the details that help you choose. New perspectives from DIYASI, for your next collection.</p>
          <Link href="/resources" className="d-text-link">Looking for a sourcing guide? Explore the journal ↗</Link>
        </div>
      </header>
      <section className="d-section d-news-list" aria-labelledby="latest-news-heading">
        <div className="d-section-heading">
          <h2 id="latest-news-heading">The latest from DIYASI</h2>
          <p className="d-fineprint">Company news · Collection notes · Buying notes</p>
        </div>
        <div className="d-news-grid">
          {newsArticles.map((article) => <NewsCard key={article.slug} article={article} />)}
        </div>
      </section>
    </main>
  );
}
