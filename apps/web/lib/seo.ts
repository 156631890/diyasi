import type { Metadata } from "next";

export const SITE_NAME = "YiWu DiYaSi Dress Co., Ltd.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiwudiyasidress.com";
export const SITE_DESCRIPTION =
  "Private label intimates manufacturer for DTC, retail, and wholesale brands, covering fabric selection, fit sampling, custom labels, packaging, bulk production, and global delivery.";

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
