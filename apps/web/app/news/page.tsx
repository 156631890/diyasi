import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/lib/news-articles";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import ContentFaq from "@/components/ContentFaq";

export const metadata = buildMetadata({
  title: "Underwear Buying Notes: Models, Fit and Components",
  description: "Use underwear buying notes to review actual DIYASI models, fabric components, fit, labeling and sample approvals before planning your next collection.",
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
          <h1>Underwear buying notes</h1>
          <p>Use underwear buying notes to review real model specifications, fit, component materials and sample approval. Turn a focused product comparison into a written brief for your collection.</p>
          <Link href="/resources" className="d-text-link">Underwear sourcing guides ↗</Link>
        </div>
      </header>
      <section className="d-section d-news-list" aria-labelledby="latest-news-heading">
        <div className="d-section-heading">
          <h2 id="latest-news-heading">Underwear fabrics, fit and sample approval notes</h2>
          <p className="d-fineprint">Company news · Collection notes · Buying notes</p>
        </div>
        <div className="d-news-grid">
          {newsArticles.map((article) => <NewsCard key={article.slug} article={article} />)}
        </div>
      </section>
      <ContentFaq items={[["How should I use these underwear buying notes?", "Use the model references and checklists to prepare your sample brief. Confirm the final order specification and retain an approved physical sample."], ["Do buying notes prove certification or performance?", "No. They describe product sources and review methods. A certification or performance claim needs its own current, order-specific evidence."]]} />
    </main>
  );
}
