import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, ImageTextBand, PlatformHero, SectionHeader } from "@/components/founder-platform/PlatformSections";
import { contactOptions, platformImages } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand Quiz",
  description:
    "Use Diyasi's brand quiz to identify the right underwear Starter Kit for your audience, channel, style, budget, and timeline.",
  path: "/brand-quiz"
});

function OptionGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <article className="platform-card">
      <p className="platform-card-label">{title}</p>
      <div className="platform-chip-list">
        {options.map((option) => (
          <span key={option} className="platform-chip">
            {option}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function BrandQuizPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Brand Quiz"
        title="Find the right starter kit for your brand"
        body="Answer a few launch questions so Diyasi can recommend a Starter Kit, product direction, packaging path, and first validation step."
        image={platformImages.brandQuizHero}
        imageAlt="Brand quiz desk with moodboard and starter kit materials"
        ctas={[{ href: "/contact", label: "Get My Recommendation" }]}
      />
      <section className="platform-section">
        <SectionHeader
          label="Quiz Inputs"
          title="Map the launch variables that shape the recommendation"
          body="Use these options as a quick preview, then send the full brief for a practical starter path."
        />
        <div className="platform-grid platform-grid-4">
          <OptionGroup title="Brand Stage" options={contactOptions.brandStages} />
          <OptionGroup title="Sales Channel" options={contactOptions.channels} />
          <OptionGroup title="Product Style" options={contactOptions.styles} />
          <OptionGroup title="Budget Range" options={contactOptions.budgets} />
        </div>
        <div className="platform-actions">
          <Link href="/contact" className="platform-btn platform-btn-dark">
            Send My Launch Details
          </Link>
        </div>
      </section>
      <ImageTextBand
        label="Brand direction"
        title="Clarify audience, channel, style, and first product range"
        body="The best starter path begins with a focused customer and a narrow product direction, not a large catalog."
        image={platformImages.brandMoodboard}
        imageAlt="Underwear brand direction moodboard"
      />
      <ImageTextBand
        label="Recommendation output"
        title="Turn launch details into a starter kit path"
        body="Diyasi can translate your inputs into a kit recommendation, packaging direction, and validation plan."
        image={platformImages.recommendationOutput}
        imageAlt="Starter kit recommendation output"
        reverse
      />
      <CtaBand
        title="Ready for the recommendation?"
        body="Send your launch details and get a practical starter path from the Diyasi team."
        primaryHref="/contact"
        primaryLabel="Get My Recommendation"
      />
    </main>
  );
}
