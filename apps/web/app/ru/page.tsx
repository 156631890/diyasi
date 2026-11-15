import type { Metadata } from "next";

import LocalizedLandingPage from "@/components/LocalizedLandingPage";
import { getLocalizedPage } from "@/lib/localized-pages";
import { buildMetadata } from "@/lib/seo";

const page = getLocalizedPage("/ru");

if (!page) {
  throw new Error("Russian home page data is required.");
}

const spanishHomePage = page;

export const metadata: Metadata = buildMetadata({
  title: spanishHomePage.title,
  description: spanishHomePage.description,
  path: spanishHomePage.path
});

export default function RussianHomePage() {
  return <LocalizedLandingPage page={spanishHomePage} />;
}
