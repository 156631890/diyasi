import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import ResourceQuoteLink from "@/components/ResourceQuoteLink";
import { resourceArticles } from "@/lib/resource-articles";
import { catalogProducts } from "@/lib/catalog-source";
import { resourceRelatedLinks } from "@/lib/buyer-guidance";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return resourceArticles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = resourceArticles.find((a) => a.slug === slug);
  if (!a)
    return { title: "Guide not found", robots: { index: false, follow: true } };
  const meta = buildMetadata({
    title: a.title,
    description: a.desc,
    path: "/resources/" + a.slug,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      images: [absoluteUrl(a.coverImage)],
    },
    twitter: { ...meta.twitter, card: "summary_large_image", images: [absoluteUrl(a.coverImage)] },
  };
}
export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const a = resourceArticles.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = catalogProducts.filter((p) =>
    a.models.includes(p.model_number),
  );
  return (
    <main id="main-content">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The journal", path: "/resources" },
          { name: a.title, path: "/resources/" + a.slug },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.desc,
          inLanguage: "en",
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          image: [absoluteUrl(a.coverImage)],
          author: {
            "@type": "Organization",
            name: "DIYASI",
            url: absoluteUrl("/about"),
          },
          publisher: { "@id": absoluteUrl("/") + "#organization" },
          mainEntityOfPage: absoluteUrl("/resources/" + a.slug),
          citation: a.references.map((r) => r[1]),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <header className="d-article-head">
        <nav className="d-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/resources">The journal</Link>
        </nav>
        <p className="d-eyebrow">{a.category}</p>
        <h1>{a.title}</h1>
        <p>{a.desc}</p>
        <p className="d-fineprint">
          By <Link href="/about">DIYASI</Link> · Published{" "}
          <time dateTime={a.publishedAt}>{a.publishedAt}</time> · Updated{" "}
          <time dateTime={a.updatedAt}>{a.updatedAt}</time>
        </p>
      </header>
      <div className="d-article-layout">
        <aside className="d-article-aside">
          <p className="d-eyebrow">In this guide</p>
          <nav aria-label="Article contents">
            {a.sections.map((s, i) => (
              <a key={s.title} href={"#section-" + (i + 1)}>
                {s.title}
              </a>
            ))}
          </nav>
          <Link className="d-text-link" href="/products">
            Explore the collection ↗
          </Link>
        </aside>
        <article className="d-article-body">
          <p className="d-article-answer">{a.answer}</p>
          <figure className="d-article-photo">
            <Image
              src={a.coverImage}
              alt={
                related[0]?.product_name ??
                "Editorial still life of cotton, lace and fabric"
              }
              width={800}
              height={800}
              sizes="(max-width:800px) 90vw,750px"
              priority
            />
            <figcaption>
              {related[0]
                ? "Original DIYASI style photograph. Confirm the final specification on your approved sample."
                : "Illustrative fabric still life."}
            </figcaption>
          </figure>
          {a.sections.map((s, i) => (
            <section key={s.title} id={"section-" + (i + 1)}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              {"rows" in s && s.rows && (
                <div
                  className="d-table-scroll"
                  tabIndex={0}
                  role="region"
                  aria-label={s.title + " comparison"}
                >
                  <table>
                    <thead>
                      <tr>
                        {s.rows[0].map((c, j) => (
                          <th key={j} scope="col">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.slice(1).map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            <td key={k}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
          <section className="d-service-faq">
            <h2>One more thing</h2>
            <div className="d-accordions">
              {a.faq.map(([q, answer]) => (
                <details key={q} open>
                  <summary>{q}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="d-source-links">
            <h2>Sources & further reading</h2>
            <p>
              Product examples refer to the DIYASI catalogue. External standards
              explain their own scope; a reference is not a claim that a
              specific garment or factory is certified.
            </p>
            {a.references.map(([label, href]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            ))}
          </section>
          <section className="d-service-cta">
            <h2>Put the details into practice.</h2>
            <p>
              Share your selected styles, target market, planned quantity and
              branding needs.
            </p>
            <ResourceQuoteLink resourceSlug={a.slug} />
          </section>
        </article>
      </div>
      {related.length > 0 && (
        <section className="d-section d-related">
          <div className="d-section-heading">
            <h2>Styles to start with</h2>
            <Link href="/products" className="d-text-link">
              Explore all styles ↗
            </Link>
          </div>
          <div className="d-product-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
      <section className="d-section d-reading">
        <h2>Keep exploring</h2>
        {(resourceRelatedLinks[a.slug] ?? []).map((r) => (
            <Link
              className="d-text-link"
              key={r.href}
              href={r.href}
            >
              {r.label} ↗
            </Link>
          ))}
      </section>
    </main>
  );
}
