"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import QuoteFlow from "@/components/QuoteFlow";
import WhatsAppLink from "@/components/WhatsAppLink";
import { resolveReviewedProductTitle } from "@/lib/conversion-events";
import { companyInfo } from "@/lib/site-info";
import ContentFaq from "@/components/ContentFaq";

function ContactFlow() {
  const search = useSearchParams();
  const product = resolveReviewedProductTitle(search.get("productId"));
  return (
    <QuoteFlow
      key={product ?? "contact"}
      page="contact page"
      source={product ? "product" : "contact"}
      product={product}
      includeSamples={search.get("samples") === "1"}
    />
  );
}
export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="d-catalog-intro">
        <div>
          <nav className="d-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <p className="d-eyebrow">A shared beginning</p>
          <h1>Request underwear samples and quote.</h1>
          <p>
            Request underwear samples and quote details with your model numbers,
            sizes, colors, artwork and packaging brief. Catalogue MOQ is 120
            pieces per style; sample guidance is 5–7 days after brief review.
          </p>
        </div>
      </section>
      <section className="d-contact-layout">
        <aside>
          <p className="d-eyebrow">A conversation with DIYASI</p>
          <h2>
            How to prepare
            <br />
            <em>underwear quotation brief details.</em>
          </h2>
          <p>
            Bring a style number, a fabric idea or a first sketch. We will
            review your market, quantity, branding and packaging together.
          </p>
          <dl className="d-contact-facts">
            <div>
              <dt>Email the atelier</dt>
              <dd>
                <a href={"mailto:" + companyInfo.emailPrimary}>
                  {companyInfo.emailPrimary}
                </a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <WhatsAppLink page="contact page">
                  {companyInfo.phone}
                </WhatsAppLink>
              </dd>
            </div>
            <div>
              <dt>Find us in Yiwu</dt>
              <dd>
                {companyInfo.name}
                <br />
                {companyInfo.address}
              </dd>
            </div>
          </dl>
          <a
            className="d-text-link"
            href="https://www.google.com/maps/search/?api=1&query=No.%2016%20Dashi%20Road%2C%20Fotang%20Town%2C%20Yiwu%2C%20Zhejiang%2C%20China"
            target="_blank"
            rel="noopener noreferrer"
          >
            View location ↗
          </a>
          <div className="d-source-links">
            <h3>Before you begin</h3>
            <p>
              Most listed catalogue styles start at 120 pieces, subject to
              confirmation. Custom fabrics, colors, labels and packaging have
              their own requirements.
            </p>
            <Link href="/resources/private-label-underwear-moq-guide">
              Underwear MOQ explained ↗
            </Link>
            <Link href="/resources/underwear-sampling-lead-time-guide">Underwear sampling lead time guide ↗</Link>
          </div>
        </aside>
        <Suspense fallback={<p>Loading your project form…</p>}>
          <ContactFlow />
        </Suspense>
      </section>
      <ContentFaq items={[["How do I request underwear samples from a factory?", "Send model numbers, sample size and colors, materials, artwork, packaging and any fit changes. Ask for the sample cost and the confirmed sample plan; the guidance is 5–7 days, with courier delivery confirmed separately."], ["What should I include in an underwear quotation brief?", "Include the style list, per-style size/color quantities, component specifications, branding, packing, destination and delivery needs. Ask for sample fees, development, packaging and freight to be identified in the quotation."]]} />
    </main>
  );
}
