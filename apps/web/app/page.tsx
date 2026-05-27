import type { Metadata } from "next";
import {
  AcademyGrid,
  ComparisonTable,
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  StarterKitGrid,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import {
  academyCards,
  comparisonRows,
  founderProblems,
  platformImages,
  starterKits,
  validationSteps
} from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Launch Your Own Underwear Brand",
  description:
    "Diyasi helps startup founders validate and launch underwear brands with Starter Kits, ready-stock testing, packaging direction, and gradual scaling.",
  path: "/"
});

export default function HomePage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Built for startup founders"
        title="Launch Your Own Underwear Brand"
        body="A low-risk founder platform helping startup brands validate products, test market demand, and scale gradually before investing heavily."
        image={platformImages.homeHero}
        imageAlt="Founder desk with underwear brand starter kit materials"
        ctas={[
          { href: "/starter-kits", label: "Start With A Starter Kit" },
          { href: "/brand-quiz", label: "Take AI Brand Quiz", tone: "light" }
        ]}
      />

      <section className="platform-section">
        <SectionHeader
          label="Founder Validation System"
          title="A practical path from brand idea to first reorder"
          body="Diyasi turns the risky first launch into a sequence of smaller decisions founders can test."
        />
        <WorkflowGrid items={validationSteps} />
      </section>

      <section className="platform-section">
        <SectionHeader
          label="Founder Problems"
          title="Why most startup brands fail"
          body="Most founders do not fail because factories cannot make products. They fail because they invest too much before validation."
        />
        <WorkflowGrid items={founderProblems} />
      </section>

      <section className="platform-section">
        <SectionHeader
          label="Starter Kits"
          title="Validate before you scale"
          body="Structured launch kits help founders preview product, packaging, and positioning before bulk inventory."
        />
        <StarterKitGrid kits={starterKits} />
      </section>

      <ImageTextBand
        label="Validation-first process"
        title="Test with ready stock before custom production"
        body="Start with a focused kit, test customer response, and move into private label only after the product direction is clearer."
        image={platformImages.homeStarterKit}
        imageAlt="Starter kit unboxing for underwear brand launch"
      />

      <section className="platform-section">
        <SectionHeader
          label="Comparison Hub"
          title="Traditional factory vs founder launch system"
          body="Diyasi is designed for founders who need validation, not only production capacity."
        />
        <ComparisonTable rows={comparisonRows.slice(0, 4)} />
      </section>

      <ImageTextBand
        label="Fulfillment proof"
        title="The platform is backed by product, packing, QC, and reorder support"
        body="Founder-friendly does not mean fragile. Behind each Starter Kit is a practical fulfillment path for repeat supply."
        image={platformImages.homeProofStrip}
        imageAlt="Ready stock, QC, packing, and shipping proof strip"
        reverse
      />

      <section className="platform-section">
        <SectionHeader
          label="Founder Academy"
          title="Learn before you launch"
          body="Education content helps founders avoid inventory mistakes, unfocused SKUs, and weak validation."
        />
        <AcademyGrid cards={academyCards} />
      </section>

      <CtaBand
        title="Ready to build your brand?"
        body="Start small, validate first, and scale gradually through a low-risk founder system."
        secondaryHref="/starter-kits"
        secondaryLabel="View Starter Kits"
      />
    </main>
  );
}
