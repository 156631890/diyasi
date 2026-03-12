import type { Metadata } from "next";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Return Policy",
  description:
    "Read the return policy for sample orders, approved production, and issue handling at YiWu DiYaSi Dress CO., LTD.",
  path: "/return-policy"
});

export default function ReturnPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Return Policy", path: "/return-policy" }
  ]);

  return (
    <main className="container-shell py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Return Policy</p>
        <h1 className="section-title mt-2 text-[#6a3524]">Return Policy</h1>
        <p className="page-reference-body mt-4 max-w-3xl text-[#7d4f3e]">
          This policy outlines how sample orders, approved production orders, and quality-related issues are handled by YiWu DiYaSi Dress CO., LTD.
        </p>
      </section>

      <section className="mt-10 grid gap-8">
        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Sample Orders</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            Paid sample fees are generally non-refundable once development work has started, unless a different written agreement has been confirmed in advance.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Bulk Production Orders</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            Bulk production orders are handled according to the approved sample, confirmed specifications, and agreed production terms. Returns are not accepted for approved custom production without verified quality issues.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Quality Issues</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            If there is a verified quality issue, please contact the team promptly with order details, photos, and supporting information so the case can be reviewed and resolved.
          </p>
        </article>

        <article className="editorial-column">
          <h2 className="page-reference-subtitle text-[#6a3524]">Contact</h2>
          <p className="page-reference-body mt-4 text-[#7d4f3e]">
            For return or quality discussions, contact YiWu DiYaSi Dress CO., LTD through the contact page and include the product, order stage, and issue details.
          </p>
        </article>
      </section>
    </main>
  );
}
