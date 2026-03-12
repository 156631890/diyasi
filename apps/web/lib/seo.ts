import type { Metadata } from "next";

export const SITE_NAME = "YiWu DiYaSi Dress CO., LTD";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Private-label underwear, bras, shapewear, and activewear manufacturing for wholesalers, retailers, and DTC brands.";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
