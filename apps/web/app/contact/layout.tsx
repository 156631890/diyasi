import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Starter Kit Recommendation Request",
  description:
    "Share your audience, channel, style direction, budget, and launch timeline so Diyasi can recommend a practical underwear Starter Kit and validation path.",
  path: "/contact"
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
