import type { MetadataRoute } from "next";
import { safeFetchJson } from "@/lib/api";

type Article = { slug: string };

async function getArticleSlugs(): Promise<string[]> {
  const rows = await safeFetchJson<Article[]>("/seo/articles", []);
  return rows.map((row) => row.slug).filter(Boolean);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  const basePaths = ["", "/about", "/products", "/oem-odm", "/sustainability", "/factory", "/blog", "/contact", "/payments"];
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
