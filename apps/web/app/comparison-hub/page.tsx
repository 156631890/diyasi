import type { Metadata } from "next";

import {
  ComparisonTable,
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader
} from "@/components/founder-platform/PlatformSections";
import { comparisonRows, platformImages } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Traditional Factory vs Founder Launch System",
  description:
    "Compare MOQ-first factory production with Diyasi's founder launch system for smaller validation tests and gradual scaling.",
  path: "/comparison-hub"
});

export default function ComparisonHubPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Comparison Hub"
        title="Traditional Factory vs Founder Launch System"
        body="Beginner founders need validation before volume. Diyasi is built around smaller tests, structured kits, and gradual scaling."
        image={platformImages.comparisonHero}
        imageAlt="Traditional factory approach versus founder launch system"
        ctas={[{ href: "/contact", label: "Get Starter Kit Recommendation" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Comparison" title="How the founder launch system changes the first decision" />
        <ComparisonTable rows={comparisonRows} />
      </section>
      <ImageTextBand
        label="MOQ-first risk"
        title="Bulk inventory can turn uncertainty into dead stock"
        body="Large commitments make sense after signal, not before the founder understands product-market response."
        image={platformImages.moqRisk}
        imageAlt="MOQ-first inventory risk"
      />
      <ImageTextBand
        label="Validation-first path"
        title="Small tests create clearer decisions"
        body="Starter Kits help founders learn which product, positioning, packaging, and channel deserve more investment."
        image={platformImages.validationPath}
        imageAlt="Validation-first founder launch path"
        reverse
      />
      <CtaBand title="Choose the path built for first launches" body="Start with a recommendation instead of a bulk order." />
    </main>
  );
}
