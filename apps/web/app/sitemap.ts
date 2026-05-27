import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const basePaths = [
    "",
    "/starter-kits",
    "/validation-system",
    "/brand-quiz",
    "/founder-academy",
    "/fulfillment-proof",
    "/comparison-hub",
    "/contact",
    "/payments"
  ];
  const staticUrls = basePaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const blogUrls: MetadataRoute.Sitemap = [];

  return [...staticUrls, ...blogUrls];
}
