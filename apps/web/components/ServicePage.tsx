import Image from "next/image";
import Link from "next/link";
import JsonLd from "./JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import type { ServicePageContent } from "@/lib/service-pages";
import { serviceRelatedLinks } from "@/lib/buyer-guidance";
export default function ServicePage({
  page,
  path,
}: {
  page: ServicePageContent;
  path: string;
}) {
  return (
    <main id="main-content" className="d-service">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.eyebrow, path },
        ])}
      />
      <section className="d-service-hero">
        <div className="d-service-hero-copy">
          <p className="d-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        <div className="d-service-hero-photo">
          <Image
            src={page.image}
            alt={page.imageAlt}
            fill
            priority
            sizes="(max-width:600px) 100vw, 50vw"
          />
        </div>
      </section>
      <div className="d-service-body">
        <section className="d-service-intro">
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
        </section>
        <div className="d-service-sections">
          {page.sections.map((s, i) => (
            <section key={s.title} className="d-service-section">
              <span>0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              {s.items && (
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.link && (
                <Link className="d-text-link" href={s.link[1]}>
                  {s.link[0]} ↗
                </Link>
              )}
            </section>
          ))}
        </div>
        {page.gallery && (
          <section className="d-factory-gallery">
            <h2>A closer look at the factory.</h2>
            <p>
              Photographs supplied by DIYASI, showing production, storage and
              dispatch. For your order, request current inspection records and
              dated photographs against the agreed specification.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {page.gallery.map((photo) => (
                <figure key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={500}
                    height={300}
                    sizes="(max-width:700px) 100vw, 33vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <figcaption className="d-fineprint">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {page.sources && (
          <aside className="d-source-links">
            <h2>Read the original guidance.</h2>
            <p>
              {page.sourceNote ??
                "Use the current official guidance and the documents for your actual order when making sourcing and labeling decisions."}
            </p>
            {page.sources.map(([label, url]) => (
              <a href={url} key={url} target="_blank" rel="noopener noreferrer">
                {label} ↗
              </a>
            ))}
          </aside>
        )}
        {page.faqs && (
          <section className="d-service-faq">
            <h2>A few useful answers.</h2>
            <div className="d-accordions">
              {page.faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: page.faqs.map(([q, a]) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              }}
            />
          </section>
        )}
      </div>
      <section className="d-section d-reading">
        <h2>Plan your next sourcing step</h2>
        {serviceRelatedLinks[path]?.map(({ label, href }) => <Link key={href} href={href} className="d-text-link">{label} ↗</Link>)}
      </section>
      <section className="d-service-cta">
        <p className="d-eyebrow">Let’s create together</p>
        <h2>Tell us what you have in mind.</h2>
        <p>
          A style, a fabric, a first collection. Share your starting point and
          we’ll help you work through the details.
        </p>
        <Link href="/contact#quote-form" className="d-button">
          Start a conversation ↗
        </Link>
      </section>
    </main>
  );
}
