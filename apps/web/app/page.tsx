import type { Metadata } from "next";
import Link from "next/link";
import HomeCollection from "@/components/HomeCollection";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/lib/news-articles";
import { productByModel } from "@/lib/collections";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Manufacturer in Yiwu, China | DIYASI",
  description:
    "Source cotton, lace and seamless underwear from DIYASI, a manufacturer in Yiwu, China. Explore women's and men's styles, private labels, samples and bulk orders.",
  path: "/",
});
const faqs = [
  {
    question: "Can I put my own brand on these underwear styles?",
    answer:
      "Yes. DIYASI can discuss logo application, waistbands, care labels and packaging for selected styles. Customization, quantities and available colors are confirmed against your sample brief.",
  },
  {
    question: "What is the minimum order for the catalogue styles?",
    answer:
      "Most current product specification tables list 120 pieces per style with mixed sizes and colors, subject to confirmation. Custom fabrics, colors, labels and packaging may require different quantities.",
  },
  {
    question: "How do I choose between cotton, lace and seamless underwear?",
    answer:
      "Start with the intended fit. Cotton-rich styles are useful everyday essentials, lace adds decorative detail, and seamless polyamide styles use laser-cut edges. Compare each product's composition, gusset construction and size range before sampling.",
  },
  {
    question: "How long does sampling take?",
    answer:
      "The source catalogue typically states 5 to 7 days for samples. The factory confirms the schedule after checking fabric availability, artwork and any pattern changes.",
  },
];
export default function HomePage() {
  return (
    <main id="main-content">
      <HomeCollection products={["LS006", "DYS201", "DYS323", "DYS219", "LS005", "DYS314", "DYS224", "M001"].map(productByModel)} />
      <section className="d-section d-home-news">
        <div className="d-section-heading">
          <div><p className="d-eyebrow">The latest from DIYASI</p><h2>News &amp; insights.</h2></div>
          <Link href="/news" className="d-text-link">Explore all news ↗</Link>
        </div>
        <div className="d-news-grid">
          {newsArticles.slice(0, 3).map((article) => <NewsCard key={article.slug} article={article} />)}
        </div>
      </section>
      <section className="d-home-faq">
        <div>
          <p className="d-eyebrow">Before we begin</p>
          <h2>
            A few things
            <br />
            <em>you might wonder.</em>
          </h2>
          <Link href="/contact" className="d-text-link">
            Ask us something ↗
          </Link>
        </div>
        <div className="d-accordions">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
    </main>
  );
}
