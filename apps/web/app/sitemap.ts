import type { MetadataRoute } from "next";
import { safeFetchJson } from "@/lib/api";
import { getCatalogProducts } from "@/lib/catalog-source";
import { resourceArticles } from "@/lib/resource-articles";
import { SITE_URL } from "@/lib/seo";
import { launchCollections } from "@/lib/site-info";

type Article = { slug: string };

async function getArticleSlugs(): Promise<string[]> {
  const rows = await safeFetchJson<Article[]>("/seo/articles", []);
  return rows.map((row) => row.slug).filter(Boolean);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const basePaths = [
    "",
    "/about",
    "/products",
    "/oem-odm",
    "/factory",
    "/fabrics",
    "/packaging",
    "/resources",
    "/sustainability",
    "/contact"
  ];
  const staticUrls = basePaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const slugs = await getArticleSlugs();
  const products = await getCatalogProducts();
  const categoryUrls = launchCollections.map((collection) => ({
    url: `${SITE_URL}/products/${collection.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));
  const resourceUrls = resourceArticles.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));
  const blogUrls = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));
  const productUrls = products.map((product) => ({
    url: `${SITE_URL}/products/${encodeURIComponent(product.product_id)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticUrls, ...categoryUrls, ...resourceUrls, ...blogUrls, ...productUrls];
}
