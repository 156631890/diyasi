import type { Metadata } from "next";

import LocalizedLandingPage from "@/components/LocalizedLandingPage";
import { getLocalizedPage } from "@/lib/localized-pages";
import { buildMetadata } from "@/lib/seo";

const page = getLocalizedPage("/es");

if (!page) {
  throw new Error("Spanish home page data is required.");
}

const spanishHomePage = page;

export const metadata: Metadata = buildMetadata({
  title: spanishHomePage.title,
  description: spanishHomePage.description,
  path: spanishHomePage.path
});

export default function SpanishHomePage() {
  return <LocalizedLandingPage page={spanishHomePage} />;
}
