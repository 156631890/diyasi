import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";
import NewsDetailPage, { generateMetadata } from "@/app/news/[slug]/page";
import sitemap from "@/app/sitemap";
import { catalogProducts } from "@/lib/catalog-source";
import { newsArticles } from "@/lib/news-articles";
import { resourceArticles } from "@/lib/resource-articles";
import { safeAnalyticsContext } from "@/lib/analytics";

test("published news has real product references and images and is discoverable alongside existing guides", () => {
  const paths = sitemap().map((entry) => new URL(entry.url).pathname);
  expect(paths).toContain("/news");
  expect(new Set(paths).size).toBe(paths.length);
  for (const article of newsArticles) {
    const path = `/news/${article.slug}`;
    expect(paths).toContain(path);
    expect(safeAnalyticsContext(path)?.page_path).toBe(path);
    expect(existsSync(resolve(process.cwd(), "public", article.coverImage.slice(1)))).toBe(true);
    expect(article.models.every((model) => catalogProducts.some((product) => product.model_number === model))).toBe(true);
    expect(article.reading.every((link) => paths.includes(link.href))).toBe(true);
  }
  for (const article of resourceArticles) expect(paths).toContain(`/resources/${article.slug}`);
});

test("news metadata identifies each article and its actual image", async () => {
  for (const article of newsArticles) {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: article.slug }) });
    expect(metadata.alternates?.canonical).toBe(`https://www.yiwudiyasidress.com/news/${article.slug}`);
    expect(metadata.openGraph).toMatchObject({ type: "article", publishedTime: article.publishedAt, images: [{ url: `https://www.yiwudiyasidress.com${article.coverImage}`, alt: article.coverAlt }] });
  }
});

test("unknown news URLs return not found instead of another article", async () => {
  const params = Promise.resolve({ slug: "does-not-exist" });
  expect(await generateMetadata({ params })).toMatchObject({ robots: { index: false } });
  await expect(NewsDetailPage({ params })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
});
