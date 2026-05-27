import type { Metadata } from "next";

import {
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import { founderProblems, platformImages, validationSteps } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Validation System",
  description: "Test your underwear brand direction with Diyasi's validation-first system before custom production.",
  path: "/validation-system"
});

export default function ValidationSystemPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Validation System"
        title="Test Your Market Before Custom Production"
        body="Reduce startup risk by validating products, packaging, and positioning before you invest in large custom inventory."
        image={platformImages.validationWorkflow}
        imageAlt="Underwear brand validation workflow scene"
        ctas={[{ href: "/brand-quiz", label: "Take AI Brand Quiz" }]}
      />
      <section className="platform-section">
        <SectionHeader label="The Risk" title="The first mistake is scaling before signal" />
        <WorkflowGrid items={founderProblems} />
      </section>
      <section className="platform-section">
        <SectionHeader label="The System" title="Four steps from idea to custom production" />
        <WorkflowGrid items={validationSteps} />
      </section>
      <ImageTextBand
        label="Ready-stock testing"
        title="Start with a testable product path"
        body="Ready stock lets founders test products and content without waiting for a full custom production cycle."
        image={platformImages.readyStockTesting}
        imageAlt="Ready stock testing scene"
      />
      <ImageTextBand
        label="Gradual scale"
        title="Move into private label after market signal"
        body="Once the direction works, Diyasi can support packaging, colors, labels, and reorder planning."
        image={platformImages.gradualScale}
        imageAlt="Gradual scale into custom production"
        reverse
      />
      <CtaBand
        title="Build the launch around validation"
        body="Use the brand quiz to turn your audience, channel, and style direction into a practical starter path."
        primaryHref="/brand-quiz"
        primaryLabel="Take AI Brand Quiz"
      />
    </main>
  );
}
