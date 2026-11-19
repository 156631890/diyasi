import { allLocalizedPages } from "./localized-pages";
import { translatedPaths } from "./sourcing-translations";
import { sourcingGuides, guideDate } from "./sourcing-guides";
import { manufacturerPages, sourcingUpdatedAt as manufacturerUpdatedAt } from "./manufacturer-pages";
import { indexableProducts } from "./indexable-products";
import { activeResourceArticles } from "./resource-articles";
import { newsArticles } from "./news-articles";
import { launchCollections } from "./site-info";

type ChangeFrequency = "weekly" | "monthly";

export type IndexableContentEntry = {
  path: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const reviewedAt = "2026-09-17";
const seoUpdatedAt = "2026-09-22";
const collectionUpdatedAt = "2026-09-27";
const keywordUpdatedAt = "2026-10-07";
// Preserve release dates already recorded for these static pages. Do not derive
// dates from whichever keywords happen to be present or from the build clock.
const staticPageDates: Readonly<Record<string, string>> = {
  "/": "2026-11-15",
  "/products": "2026-11-15",
  "/oem-odm": "2026-11-15",
  "/resources": "2026-10-31",
  "/about": "2026-10-07",
  "/factory": "2026-10-07",
  "/fabrics": "2026-10-07",
  "/packaging": "2026-10-07",
  "/sustainability": "2026-10-07",
  "/contact": "2026-10-07",
};
// Record actual releases only; do not refresh every URL on each sitemap request.
const sourcingUpdatedAt = "2026-10-24";
const sourcingUpdatedPaths = new Set([
  "/", "/products", "/oem-odm", "/resources",
  "/products/lace-underwear", "/products/seamless-underwear", "/products/mens-underwear",
]);
const keywordReleaseDate = "2026-11-15";
const keywordReleasePaths = new Set([
  "/products/womens-panties", "/products/cotton-underwear", "/products/cotton-thongs",
  "/products/lace-underwear", "/products/seamless-underwear", "/products/thongs",
  "/products/mens-underwear", "/products/mens-boxer-briefs",
  "/manufacturers/private-label-underwear-manufacturer", "/manufacturers/low-moq-underwear-manufacturer",
  "/manufacturers/custom-underwear-manufacturer", "/manufacturers/mens-underwear-manufacturer",
]);

const pageEntries: IndexableContentEntry[] = [
  ...Object.keys(allLocalizedPages).map(path => ({path, lastModified:"2026-11-15", changeFrequency:"monthly" as const, priority:0.8})),
  {
    path: "/",
    lastModified: reviewedAt,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/products",
    lastModified: reviewedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/oem-odm",
    lastModified: reviewedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/factory",
    lastModified: collectionUpdatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/contact",
    lastModified: collectionUpdatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/about",
    lastModified: collectionUpdatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/fabrics",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/packaging",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/sustainability",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/resources",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy-policy",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/return-policy",
    lastModified: reviewedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  },

];

const collectionEntries = launchCollections.map((collection) => ({
  path: collection.href,
  lastModified: keywordReleasePaths.has(collection.href) ? keywordReleaseDate : sourcingUpdatedPaths.has(collection.href) ? sourcingUpdatedAt : keywordUpdatedAt,
  changeFrequency: "weekly" as const,
  priority: 0.8,
}));

const newsEntries: IndexableContentEntry[] = [
  {
    path: "/news",
    lastModified: newsArticles.reduce((latest, article) => article.updatedAt > latest ? article.updatedAt : latest, reviewedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  ...newsArticles.map((article) => ({
    path: `/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
];

const resourceEntries = activeResourceArticles.map((article) => ({
  path: `/resources/${article.slug}`,
  lastModified: article.updatedAt,
  changeFrequency: "monthly" as const,
  priority: 0.6,
}));

const productEntries = indexableProducts.map((product) => ({
  path: `/products/${product.id}`,
  lastModified: product.reviewedAt,
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

const contentRepairPaths = new Set([
  ...manufacturerPages.map(p=>"/manufacturers/"+p.slug),
  ...translatedPaths.filter(path=>path.includes("/manufacturers/")),
  ...Object.values(allLocalizedPages).filter(page=>page.englishPath.startsWith("/products/")).map(page=>page.path),
  "/es/empaque-personalizado","/ru/packaging","/es/fabricante-ropa-interior-china","/ru/private-label",
  "/manufacturers","/resources",
  "/products/womens-panties","/products/cotton-underwear","/products/lace-underwear","/oem-odm",
  "/guides/underwear-manufacturing-cost","/guides/underwear-moq-explained","/guides/starting-an-underwear-brand",
]);
export const indexableContent = {
  entries: [
    ...pageEntries.map((entry) => ({
      ...entry,
      lastModified: allLocalizedPages[entry.path] ? "2026-11-15" : staticPageDates[entry.path] ?? (
        ["/privacy-policy", "/return-policy"].includes(entry.path)
          ? entry.lastModified
          : seoUpdatedAt
      ),
    })),
    ...collectionEntries,
    { path: "/manufacturers", lastModified: keywordReleaseDate, changeFrequency: "monthly", priority: 0.9 },
    ...manufacturerPages.map(p => ({path: `/manufacturers/${p.slug}`,lastModified:keywordReleasePaths.has(`/manufacturers/${p.slug}`) ? keywordReleaseDate : manufacturerUpdatedAt,changeFrequency:"monthly" as const,priority:0.8})),
    {path:"/guides",lastModified:guideDate,changeFrequency:"monthly",priority:0.8},
    ...sourcingGuides.map(g=>({path:`/guides/${g.slug}`,lastModified:guideDate,changeFrequency:"monthly" as const,priority:0.7})),
    ...translatedPaths.map(path=>({path,lastModified:guideDate,changeFrequency:"monthly" as const,priority:0.7})),
    ...resourceEntries,
    ...newsEntries,
    ...productEntries,
  ].map(entry=>contentRepairPaths.has(entry.path)?{...entry,lastModified:"2026-11-17"}:entry) as IndexableContentEntry[],
  paths: [
    ...pageEntries,
    ...collectionEntries,
    { path: "/manufacturers", lastModified: keywordReleaseDate, changeFrequency: "monthly", priority: 0.9 },
    ...manufacturerPages.map(p => ({path: `/manufacturers/${p.slug}`,lastModified:keywordReleasePaths.has(`/manufacturers/${p.slug}`) ? keywordReleaseDate : manufacturerUpdatedAt,changeFrequency:"monthly" as const,priority:0.8})),
    {path:"/guides",lastModified:guideDate,changeFrequency:"monthly",priority:0.8},
    ...sourcingGuides.map(g=>({path:`/guides/${g.slug}`,lastModified:guideDate,changeFrequency:"monthly" as const,priority:0.7})),
    ...translatedPaths.map(path=>({path,lastModified:guideDate,changeFrequency:"monthly" as const,priority:0.7})),
    ...resourceEntries,
    ...newsEntries,
    ...productEntries,
  ].map((entry) => entry.path),
  productPaths: productEntries.map((entry) => entry.path),
} as const;
