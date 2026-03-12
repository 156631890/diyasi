import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact YiWu DiYaSi for underwear sampling, OEM / ODM development, MOQ discussion, and bulk production planning.",
  path: "/contact"
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
