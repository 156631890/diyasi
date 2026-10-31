import { sourcingTopics } from "@/lib/sourcing-topics";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { activeResourceArticles } from "@/lib/resource-articles";
import ContentFaq from "@/components/ContentFaq";
import { catalogueFaq } from "@/lib/keyword-content";

export const metadata = buildMetadata({
  title: "Underwear Sourcing Guides: Private Label Buyer Briefs",
  description:
    "Use underwear sourcing guides to plan MOQ, fabrics, fit, samples, branding and production. Compare real DIYASI models and prepare a written private-label brief.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The journal", path: "/resources" },
        ])}
      />
      <section className="d-catalog-intro">
        <div>
          <p className="d-eyebrow">Notes from the atelier</p>
          <h1>Underwear sourcing guides</h1>
          <p>
            Use underwear sourcing guides to plan MOQ, manufacturing costs,
            fabrics, sizing, labels and sample approval. Use the checklists to
            prepare a brief and compare supplier quotations.
          </p>
          <Link href="/news" className="d-text-link">Company news &amp; collection notes ↗</Link>
        </div>
      </section>
      <section className="d-section">
        {sourcingTopics.map(topic=><section key={topic.id} id={topic.id}><div className="d-section-heading"><h2>{topic.title}</h2><Link href={`/manufacturers/${topic.manufacturer}`} className="d-text-link">Related manufacturing route ↗</Link></div><p>{topic.description}</p><div className="d-journal-grid">
          {activeResourceArticles.filter(a=>a.sourcingTopic === topic.id).map((a) => (
            <article className="d-journal-card" key={a.slug}>
              <div>
                <Link href={"/resources/" + a.slug} aria-label={a.title}>
                  <Image
                    src={a.coverImage}
                    alt=""
                    fill
                    sizes="(max-width:600px) 90vw,33vw"
                  />
                </Link>
              </div>
              <p className="d-eyebrow">{a.category}</p>
              <h2>
                <Link href={"/resources/" + a.slug}>{a.title}</Link>
              </h2>
              <p>{a.desc}</p>
              <Link href={"/resources/" + a.slug} className="d-text-link">
                Read the guide ↗
              </Link>
            </article>
          ))}
        </div></section>)}
      </section>
      <ContentFaq title="Underwear sourcing guide questions" items={catalogueFaq} />
    </main>
  );
}
