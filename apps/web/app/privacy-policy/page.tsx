import type { Metadata } from "next";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy for YiWu DiYaSi Dress CO., LTD regarding inquiry data, communication, and website usage.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" }
  ]);

  return (
    <main className="container-shell py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Privacy Policy</p>
        <h1 className="section-title mt-2 text-[#6a3524]">Privacy Policy</h1>
        <p className="page-reference-body mt-4 max-w-3xl text-[#7d4f3e]">
          This policy explains how YiWu DiYaSi Dress CO., LTD collects, uses, and protects information submitted through this website.
        </p>
      </section>

      <section className="mt-10 grid gap-8">
        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Information We Collect</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            We may collect contact details, company information, and project information when you submit inquiries, request samples, or contact our team.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">How We Use Information</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            Information is used to respond to inquiries, prepare quotations, discuss OEM / ODM projects, arrange sampling, and coordinate production communication.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Data Protection</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            We take reasonable steps to protect submitted information and limit internal access to business communication and project handling purposes.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Contact</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            For privacy-related questions, contact YiWu DiYaSi Dress CO., LTD through the contact page on this website.
          </p>
        </article>
      </section>
    </main>
  );
}
