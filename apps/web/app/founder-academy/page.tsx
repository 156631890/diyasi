import type { Metadata } from "next";

import { AcademyGrid, CtaBand, PlatformHero, SectionHeader } from "@/components/founder-platform/PlatformSections";
import { academyCards, platformImages } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Founder Academy",
  description:
    "Learn how to validate an underwear brand with starter kits, ready-stock testing, SKU planning, and gradual scaling.",
  path: "/founder-academy"
});

export default function FounderAcademyPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Founder Academy"
        title="Learn Before You Launch"
        body="Educational systems for founders who want to avoid bulk-inventory mistakes and validate products before scaling."
        image={platformImages.academyHero}
        imageAlt="Founder learning desk for underwear brand launch"
        ctas={[{ href: "/starter-kits", label: "Start With A Starter Kit" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Founder Lessons" title="Learn the decisions that shape a sharper first launch" />
        <AcademyGrid cards={academyCards} />
      </section>
      <CtaBand
        title="Use education to make the launch smaller and sharper"
        body="Learn the basics, choose a kit, and validate before committing to custom production."
        primaryHref="/starter-kits"
        primaryLabel="View Starter Kits"
      />
    </main>
  );
}
