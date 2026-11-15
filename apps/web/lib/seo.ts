import type { Metadata } from "next";

import { alternatesFor } from "./locale-routes";
import { canonicalUrl, SITE_DESCRIPTION, SITE_NAME } from "./site-config";

export { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "./site-config";
export { SITE_ORIGIN as SITE_URL } from "./site-config";

export function absoluteUrl(path = "/"): string {
  return canonicalUrl(path);
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: { url: string; alt: string };
}): Metadata {
  const url = absoluteUrl(path);
  const localeAlternates = alternatesFor(path);
  const locales: Record<string, string> = { en: "en_US", es: "es_ES", fr: "fr_FR", de: "de_DE", it: "it_IT" };
  const locale = locales[path.split("/")[1]] ?? locales.en;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(localeAlternates
        ? {
            languages: Object.fromEntries(
              Object.entries(localeAlternates).map(([locale, localePath]) => [
                locale,
                absoluteUrl(localePath),
              ]),
            ),
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale,
      ...(localeAlternates ? { alternateLocale: Object.keys(localeAlternates).filter(key => key !== "x-default" && locales[key] !== locale).map(key => locales[key]).filter(Boolean) } : {}),
      images: [
        {
          url: absoluteUrl(image?.url ?? "/media/editorial/cotton-lace-story.png"),
          alt: image?.alt ?? "DIYASI cotton and lace materials",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image?.url ?? "/media/editorial/cotton-lace-story.png")],
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
