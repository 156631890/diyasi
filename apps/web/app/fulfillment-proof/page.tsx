import type { Metadata } from "next";

import { CtaBand, PlatformHero, ProofGrid, SectionHeader } from "@/components/founder-platform/PlatformSections";
import { platformImages, proofModules } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fulfillment Proof",
  description:
    "See the ready-stock, QC, packaging, shipping, and reorder systems behind Diyasi's founder launch path.",
  path: "/fulfillment-proof"
});

export default function FulfillmentProofPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Fulfillment Proof"
        title="Behind every starter kit is a fulfillment system"
        body="Diyasi keeps production capability in the background and brings it forward only where founders need confidence: ready stock, QC, packaging, shipping, and reorder support."
        image={platformImages.homeProofStrip}
        imageAlt="Fulfillment proof collage"
        ctas={[{ href: "/contact", label: "Plan My Launch" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Proof Modules" title="The operating pieces behind validation-first launching" />
        <ProofGrid items={proofModules} />
      </section>
      <CtaBand
        title="Validate first, then use the fulfillment path behind it"
        body="Start with a kit and move toward repeat supply only after the launch direction is clearer."
      />
    </main>
  );
}
