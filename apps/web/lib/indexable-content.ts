import { indexableProducts } from "./indexable-products";
import { resourceArticles } from "./resource-articles";
import { launchCollections } from "./site-info";

type ChangeFrequency = "weekly" | "monthly";

export type IndexableContentEntry = {
  path: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const reviewedAt = "2026-07-01";

const pageEntries: IndexableContentEntry[] = [
  { path: "/", lastModified: reviewedAt, changeFrequency: "weekly", priority: 1 },
  { path: "/products", lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.9 },
  { path: "/oem-odm", lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.9 },
  { path: "/factory", lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", lastModified: reviewedAt, changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
  { path: "/fabrics", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
  { path: "/packaging", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
  { path: "/sustainability", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.5 },
  { path: "/return-policy", lastModified: reviewedAt, changeFrequency: "monthly", priority: 0.5 }
];

const collectionEntries = launchCollections.map((collection) => ({
  path: collection.href,
  lastModified: reviewedAt,
  changeFrequency: "weekly" as const,
  priority: 0.8
}));

const resourceEntries = resourceArticles.map((article) => ({
  path: `/resources/${article.slug}`,
  lastModified: reviewedAt,
  changeFrequency: "monthly" as const,
  priority: 0.6
}));

const productEntries = indexableProducts.map((product) => ({
  path: `/products/${product.id}`,
  lastModified: product.reviewedAt,
  changeFrequency: "monthly" as const,
  priority: 0.7
}));

export const indexableContent = {
  entries: [...pageEntries, ...collectionEntries, ...resourceEntries, ...productEntries],
  paths: [...pageEntries, ...collectionEntries, ...resourceEntries, ...productEntries].map((entry) => entry.path),
  productPaths: productEntries.map((entry) => entry.path)
} as const;
