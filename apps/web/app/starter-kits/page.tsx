import type { Metadata } from "next";

import {
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  StarterKitGrid,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import { platformImages, starterKits } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Starter Kits",
  description:
    "Validate your underwear brand with Diyasi Starter Kits before investing in bulk custom production.",
  path: "/starter-kits"
});

const chooser = [
  { title: "Shopify stores", body: "Choose Shopify Comfort Kit when the goal is a premium DTC basics launch." },
  { title: "Creator launches", body: "Choose TikTok Launch Kit when content hooks and fast market feedback matter most." },
  {
    title: "Minimal brands",
    body: "Choose Minimal Essentials Kit when the first collection should stay narrow, clean, and premium."
  },
  {
    title: "Boutiques",
    body: "Choose Boutique Retail Kit when shelf presentation and reorder planning are part of the launch."
  }
];

export default function StarterKitsPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Starter Kits"
        title="Validate Before You Scale"
        body="Not just samples. Diyasi Starter Kits are structured launch packages designed to help founders preview products, packaging, content direction, and market fit before large inventory."
        image={platformImages.starterKitsHero}
        imageAlt="Four underwear brand starter kits on a studio table"
        ctas={[{ href: "/contact", label: "Get Starter Kit Recommendation" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Kit Options" title="Choose a launch kit around your channel and brand direction" />
        <StarterKitGrid kits={starterKits} />
      </section>
      <section className="platform-section">
        <SectionHeader
          label="Decision Guide"
          title="Which kit fits your launch?"
          body="Start with the channel and customer you understand best. The kit should support validation, not lock you into bulk inventory."
        />
        <WorkflowGrid items={chooser} />
      </section>
      <ImageTextBand
        label="What each kit includes"
        title="Products, packaging, content prompts, and launch recommendations"
        body="Each kit is built to help founders see a practical first collection and understand how it could be tested in the market."
        image={platformImages.homeStarterKit}
        imageAlt="Starter kit contents with packaging and product samples"
      />
      <CtaBand
        title="Need help choosing?"
        body="Share your audience, channel, style, budget, and timeline. Diyasi will recommend a practical starter path."
      />
    </main>
  );
}
