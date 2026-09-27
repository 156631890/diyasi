import type { Metadata } from "next";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy for YiWu DiYaSi Dress CO., LTD regarding inquiry data, communication, and website usage.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ]);

  return (
    <main className="container-shell py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Privacy Policy</p>
        <h1 className="section-title mt-2 text-[#1d2521]">Privacy Policy</h1>
        <p className="page-reference-body mt-4 max-w-3xl text-[#5f6b66]">
          This policy explains how YiWu DiYaSi Dress CO., LTD collects, uses,
          and protects information submitted through this website.
        </p>
      </section>

      <section className="mt-10 grid gap-8">
        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#1d2521]">
            Optional Analytics and Cookies
          </h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            With your permission, we use Google Analytics 4 to measure page and
            product views, sample selections, WhatsApp link clicks, and quotation form starts,
            submission attempts, failures and successful saves. A WhatsApp click
            does not mean a message was sent. A submission attempt does not mean
            an inquiry was received. We do not send names, email addresses,
            phone numbers, company details or inquiry messages to Google
            Analytics.
          </p>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Analytics is off until you choose “Allow analytics”. Google may
            process cookie identifiers and device information to provide
            aggregated reports. We disable advertising personalization and
            automatic form tracking, and remove query strings from page
            addresses sent with our events. Your cookie preference is stored in
            your browser. Use “Cookie preferences” at the bottom of any public
            page to change it; declining removes our Google Analytics cookies
            and stops further analytics collection.
          </p>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Learn how Google processes data in its{" "}
            <a
              className="d-text-link"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </a>
            . You can use our catalogue and contact options without accepting
            analytics.
          </p>
        </article>
        <article className="editorial-column">
          <h2 className="page-reference-subtitle">Your Sample List</h2>
          <p className="page-reference-body mt-4">When you select styles, we save their catalogue identifiers in this browser so your sample list remains available between pages and visits. This functional storage does not require analytics consent and does not store your contact details. Use “Clear sample list” or clear this site’s browser storage to remove it. Your selected styles are sent to our team only when you submit an inquiry or send a WhatsApp message.</p>
        </article>
        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#1d2521]">
            Information We Collect
          </h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            We may collect contact details, company information, and project
            information when you submit inquiries, request samples, or contact
            our team.
          </p>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            When you submit a quotation request, we also save the page and
            product associated with that request, a related guide when
            available, and the referring website domain when your browser
            provides it. We do not save the referring website&apos;s query
            strings. This form context does not use an analytics cookie.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#1d2521]">
            How We Use Information
          </h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Information is used to respond to inquiries, prepare quotations,
            discuss OEM / ODM projects, arrange sampling, and coordinate
            production communication.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#1d2521]">
            Data Protection
          </h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            We take reasonable steps to protect submitted information and limit
            internal access to business communication and project handling
            purposes.
          </p>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            Inquiry records are stored in private Vercel storage and are not
            published on the website. To limit automated submissions, we keep
            daily request counters using a keyed hash of the connection&apos;s
            IP address; the raw IP address is not saved in inquiry records.
            You may contact us to request access, correction or deletion of
            your inquiry information.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#1d2521]">Contact</h2>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            For privacy-related questions, contact YiWu DiYaSi Dress CO., LTD
            through the contact page on this website.
          </p>
        </article>
      </section>
    </main>
  );
}
