import type { MetadataRoute } from "next";
import { API_BASE } from "@/lib/api";

type Article = { slug: string };

async function getArticleSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/seo/articles`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const rows = (await response.json()) as Article[];
    return rows.map((row) => row.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  const basePaths = ["", "/about", "/products", "/oem-odm", "/sustainability", "/factory", "/blog", "/contact"];
  const staticUrls = basePaths.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const slugs = await getArticleSlugs();
  const blogUrls = slugs.map((slug) => ({
    url: `${site}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticUrls, ...blogUrls];
}
