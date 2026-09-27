import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { resourceArticles } from "@/lib/resource-articles";

export const metadata = buildMetadata({
  title: "Underwear Sourcing Guides & Private Label Journal",
  description:
    "Practical guides to underwear fabrics, fit, sample approvals, MOQ, labels and production planning. Clear answers for private-label brands.",
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
            Plan your underwear order with guides to MOQ, manufacturing costs,
            fabrics, sizing, labels and sample approval. Use the checklists to
            prepare a brief and compare supplier quotations.
          </p>
          <Link href="/news" className="d-text-link">Company news &amp; collection notes ↗</Link>
        </div>
      </section>
      <section className="d-section">
        <div className="d-journal-grid">
          {resourceArticles.map((a) => (
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
        </div>
      </section>
    </main>
  );
}
