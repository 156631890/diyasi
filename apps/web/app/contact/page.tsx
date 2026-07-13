"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import QuoteFlow from "@/components/QuoteFlow";
import WhatsAppLink from "@/components/WhatsAppLink";
import { resolveReviewedProductTitle } from "@/lib/conversion-events";
import { companyInfo } from "@/lib/site-info";

const mapEmbedUrl =
  "https://www.google.com/maps?hl=en&gl=US&q=No.%2016%20Dashi%20Road%2C%20Fotang%20Town%2C%20Yiwu%2C%20Zhejiang%2C%20China&z=15&output=embed";

function ContactFlow() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") === "product" ? "product" : "contact";
  const product = resolveReviewedProductTitle(searchParams.get("productId"));

  return <QuoteFlow page="contact page" source={source} product={product} />;
}

export default function ContactPage() {
  return (
    <main className="container-shell page-shell page-stack">
      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Start Your Private Label Project</p>
        <h1 className="section-title mt-2 text-[#1d2521]">Get a practical production route before you commit to a larger order</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">Tell us the product, quantity, target market, materials, branding, packaging, and timing. The factory team can then confirm the route that fits the project.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-8">
          <div className="card p-6 md:p-8">
            <p className="kicker">Factory contact</p>
            <h2 className="card-title-standard mt-2 text-[#1d2521]">{companyInfo.name}</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#5f6b66]">
              <div><p className="font-semibold text-[#0f5f55]">Manufacturing location</p><p>{companyInfo.address}</p></div>
              <div><p className="font-semibold text-[#0f5f55]">Email</p><a href={`mailto:${companyInfo.emailPrimary}`} className="underline decoration-[#d08b67] underline-offset-4">{companyInfo.emailPrimary}</a><br /><a href={`mailto:${companyInfo.emailSecondary}`} className="underline decoration-[#d08b67] underline-offset-4">{companyInfo.emailSecondary}</a></div>
              <div><p className="font-semibold text-[#0f5f55]">WhatsApp</p><WhatsAppLink page="contact page" className="underline decoration-[#d08b67] underline-offset-4">{companyInfo.phone}</WhatsAppLink></div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#d9e2dc] bg-white">
            <iframe title="YiWu DiYaSi map" src={mapEmbedUrl} className="h-[320px] w-full border-0 md:h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <Suspense fallback={<div className="card min-h-96 p-6" />}><ContactFlow /></Suspense>
      </section>
    </main>
  );
}
