import Link from "next/link";
import ProcurementWorksheet from "./ProcurementWorksheet";
import { localizedWorksheets } from "@/lib/procurement-worksheets";

import LocalizedCatalog from "./LocalizedCatalog";
import { russianCompanyFacts, russianMoqRoutes, russianQualitySteps } from "@/lib/russian-pages";
import SpanishQuoteFlow from "@/components/SpanishQuoteFlow";
import JsonLd from "@/components/JsonLd";
import { spanishBuyingGuidance } from "@/lib/spanish-buying-guidance";
import type { LocalizedPage } from "@/lib/localized-pages";
import {
  localizedCompanyFacts,
  localizedMoqRoutes,
  localizedQualitySteps,
} from "@/lib/localized-pages";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";

type LocalizedLandingPageProps = {
  page: LocalizedPage;
};

export default function LocalizedLandingPage({
  page,
}: LocalizedLandingPageProps) {
  const ru = page.path === "/ru" || page.path.startsWith("/ru/");
  const locale = ru ? "ru" : "es";
  const home = ru ? "/ru" : "/es";
  const homeLabel = ru ? "Главная" : "Inicio";
  const buyingGuide = spanishBuyingGuidance[page.path];
  const breadcrumbs =
    page.path === home
      ? [{ name: homeLabel, path: home }]
      : [
          { name: homeLabel, path: home },
          { name: page.title, path: page.path },
        ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.headline,
    description: page.intro,
    url: absoluteUrl(page.path),
    inLanguage: locale,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main id="main-content" lang={locale} className="container-shell page-shell page-stack">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <nav aria-label={ru ? "Навигационная цепочка" : "Miga de pan"} className="text-sm text-[#5f6b66]">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.path}>
            {index > 0 ? " / " : null}
            {index === breadcrumbs.length - 1 ? (
              breadcrumb.name
            ) : (
              <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
            )}
          </span>
        ))}
      </nav>

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{page.eyebrow}</p>
        <h1 className="section-title mt-2 text-[#1d2521]">{page.headline}</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">
          {page.intro}
        </p>
        {page.priorityCta ? (
          <Link
            href={page.priorityCta.href}
            className="mt-5 inline-flex text-sm font-bold text-[#0e5b51] underline"
          >
            {page.priorityCta.label}
          </Link>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={page.rfqCta.href} className="btn btn-primary inline-flex">
            {page.rfqCta.label}
          </Link>
          <a
            href={page.whatsAppCta.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-soft inline-flex"
          >
            {page.whatsAppCta.label}
          </a>
        </div>
      </section>

      {(page.englishPath === "/" || page.englishPath.startsWith("/products")) && <LocalizedCatalog locale={locale} englishPath={page.englishPath} />}

      <section className="page-section grid gap-5 md:grid-cols-2">
        {page.sections.map((section) => (
          <article key={section.title} className="card p-6">
            <h2 className="card-title-standard text-[#1d2521]">
              {section.title}
            </h2>
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

      {localizedWorksheets[page.path] && <ProcurementWorksheet sheet={localizedWorksheets[page.path]} />}
      {page.factSources.includes("company") ? (
        <section className="page-section">
          <h2 className="card-title-standard text-[#1d2521]">
            {ru ? "Данные фабрики и контакты" : "Datos de fábrica y contacto"}
          </h2>
          <dl className="company-overview-list mt-4">
            {(ru ? russianCompanyFacts : localizedCompanyFacts).map((fact) => (
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
          <h2 className="card-title-standard text-[#1d2521]">
            {ru ? "Минимальные партии по программам" : "Niveles de pedido mínimo"}
          </h2>
          <table className="success-table mt-4 min-w-[640px]">
            <thead>
              <tr>
                <th>{ru ? "Программа" : "Programa"}</th>
                <th>{ru ? "Минимальный заказ" : "Pedido mínimo"}</th>
                <th>{ru ? "Условия" : "Condición"}</th>
              </tr>
            </thead>
            <tbody>
              {(ru ? russianMoqRoutes : localizedMoqRoutes).map((route) => (
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
          <h2 className="card-title-standard text-[#1d2521]">
            {ru ? "Этапы контроля качества" : "Puntos de control de calidad"}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {(ru ? russianQualitySteps : localizedQualitySteps).map((step) => (
              <article key={step.title} className="card p-5">
                <h3 className="text-base font-bold text-[#1d2521]">
                  {step.title}
                </h3>
                <p className="page-reference-body mt-3">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.englishPath === "/contact" ? (
        <section id="cotizacion" className="page-section">
          <SpanishQuoteFlow locale={locale} />
        </section>
      ) : null}

      {page.englishPath !== "/" && !page.englishPath.startsWith("/products") && <LocalizedCatalog locale={locale} englishPath={page.englishPath} />}
      {buyingGuide && <section className="page-section card p-6">
        <h2 className="card-title-standard">{buyingGuide.title}</h2>
        <p className="page-reference-body mt-4">{buyingGuide.body}</p>
        <nav aria-label="Guías de compra relacionadas" className="mt-5 flex flex-wrap gap-5">
          {buyingGuide.links.map(({ label, href }) => <Link key={href} href={href} className="text-sm underline">{label} ↗</Link>)}
        </nav>
      </section>}
      <section className="page-section">
        <h2 className="card-title-standard text-[#1d2521]">
          {ru ? "Частые вопросы" : "Preguntas frecuentes"}
        </h2>
        <div className="mt-4 grid gap-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="card p-5">
              <summary className="cursor-pointer font-bold text-[#1d2521]">
                {faq.question}
              </summary>
              <p className="page-reference-body mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
