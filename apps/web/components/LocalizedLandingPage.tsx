import Link from "next/link";

import SpanishQuoteFlow from "@/components/SpanishQuoteFlow";
import type { LocalizedPage } from "@/lib/localized-pages";
import {
  localizedCompanyFacts,
  localizedMoqRoutes,
  localizedQualitySteps
} from "@/lib/localized-pages";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";

type LocalizedLandingPageProps = {
  page: LocalizedPage;
};

export default function LocalizedLandingPage({ page }: LocalizedLandingPageProps) {
  const breadcrumbs =
    page.path === "/es"
      ? [{ name: "Inicio", path: "/es" }]
      : [
          { name: "Inicio", path: "/es" },
          { name: page.title, path: page.path }
        ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.headline,
    description: page.intro,
    url: absoluteUrl(page.path),
    inLanguage: "es"
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Miga de pan" className="text-sm text-[#5f6b66]">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.path}>
            {index > 0 ? " / " : null}
            {index === breadcrumbs.length - 1 ? breadcrumb.name : <Link href={breadcrumb.path}>{breadcrumb.name}</Link>}
          </span>
        ))}
      </nav>

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{page.eyebrow}</p>
        <h1 className="section-title mt-2 text-[#1d2521]">{page.headline}</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">{page.intro}</p>
        {page.priorityCta ? (
          <Link href={page.priorityCta.href} className="mt-5 inline-flex text-sm font-bold text-[#0e5b51] underline">
            {page.priorityCta.label}
          </Link>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={page.rfqCta.href} className="btn btn-primary inline-flex">
            {page.rfqCta.label}
          </Link>
          <a href={page.whatsAppCta.href} target="_blank" rel="noreferrer" className="btn btn-soft inline-flex">
            {page.whatsAppCta.label}
          </a>
        </div>
      </section>

      <section className="page-section grid gap-5 md:grid-cols-2">
        {page.sections.map((section) => (
          <article key={section.title} className="card p-6">
            <h2 className="card-title-standard text-[#1d2521]">{section.title}</h2>
            <p className="page-reference-body mt-3">{section.body}</p>
            {section.items ? (
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#44514b]">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      {page.factSources.includes("company") ? (
        <section className="page-section">
          <h2 className="card-title-standard text-[#1d2521]">Datos de fábrica y contacto</h2>
          <dl className="company-overview-list mt-4">
            {localizedCompanyFacts.map((fact) => (
              <div key={fact.label} className="company-overview-row">
                <dt className="company-overview-label">{fact.label}</dt>
                <dd className="company-overview-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {page.factSources.includes("moq") ? (
        <section className="page-section overflow-x-auto">
          <h2 className="card-title-standard text-[#1d2521]">Niveles de pedido mínimo</h2>
          <table className="success-table mt-4 min-w-[640px]">
            <thead>
              <tr>
                <th>Programa</th>
                <th>Pedido mínimo</th>
                <th>Condición</th>
              </tr>
            </thead>
            <tbody>
              {localizedMoqRoutes.map((route) => (
                <tr key={route.id}>
                  <td>{route.title}</td>
                  <td>{route.value}</td>
                  <td>{route.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {page.factSources.includes("quality") ? (
        <section className="page-section">
          <h2 className="card-title-standard text-[#1d2521]">Puntos de control de calidad</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {localizedQualitySteps.map((step) => (
              <article key={step.title} className="card p-5">
                <h3 className="text-base font-bold text-[#1d2521]">{step.title}</h3>
                <p className="page-reference-body mt-3">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.path === "/es/contacto" ? (
        <section id="cotizacion" className="page-section">
          <SpanishQuoteFlow />
        </section>
      ) : null}

      <section className="page-section">
        <h2 className="card-title-standard text-[#1d2521]">Preguntas frecuentes</h2>
        <div className="mt-4 grid gap-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="card p-5">
              <summary className="cursor-pointer font-bold text-[#1d2521]">{faq.question}</summary>
              <p className="page-reference-body mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
