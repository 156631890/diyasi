import { expect, test, vi } from "vitest";
import { generateMetadata } from "@/app/products/[productId]/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { selectCatalog, catalogMetadata } from "@/components/CatalogPage";
import { catalogProducts, getCatalogProductById } from "@/lib/catalog-source";
import { indexableContent } from "@/lib/indexable-content";
import { collections, findCollection } from "@/lib/collections";

test("all replacement products have unique URLs, copy, sources and a real collection", () => {
  expect(catalogProducts).toHaveLength(45);
  expect(new Set(catalogProducts.map((p) => p.slug)).size).toBe(45);
  expect(new Set(catalogProducts.map((p) => p.product_name)).size).toBe(45);
  expect(new Set(catalogProducts.map((p) => p.seo_title)).size).toBe(45);
  // All original source pages stay covered when a second company site adds evidence.
  expect(catalogProducts.flatMap((p) => p.source_urls).filter((url) => new URL(url).hostname === "www.diyasiunderwear.com")).toHaveLength(46);
  expect(catalogProducts.every((p) => findCollection(p.collection))).toBe(true);
  expect(
    catalogProducts.every((p) => p.gallery_images.includes(p.image_url)),
  ).toBe(true);
});
test("sitemap exposes every replacement product and excludes retired products", async () => {
  const urls = (await sitemap()).map((item) => new URL(item.url));
  const paths = urls.map((url) => url.pathname);
  expect(
    urls.every((url) => url.origin === "https://www.yiwudiyasidress.com"),
  ).toBe(true);
  expect(paths).toEqual(
    expect.arrayContaining(catalogProducts.map((p) => "/products/" + p.slug)),
  );
  expect(paths).toEqual(
    expect.arrayContaining(collections.map((c) => "/products/" + c.slug)),
  );
  expect(paths).toContain("/resources/private-label-underwear-moq-guide");
  expect(paths).not.toContain("/products/DYS-1601642594802");
  expect(paths).not.toContain("/admin");
  expect(new Set(paths).size).toBe(paths.length);
  expect(indexableContent.productPaths).toHaveLength(45);
});
test("server pagination discovers the complete catalogue without duplicates", () => {
  const slugs = [1, 2, 3, 4].flatMap((page) =>
    selectCatalog({ page: String(page) }).visible.map((p) => p.slug),
  );
  expect(slugs).toHaveLength(45);
  expect(new Set(slugs).size).toBe(45);
  expect(selectCatalog({ page: "0" }).page).toBe(0);
  expect(selectCatalog({ page: "99" }).visible).toHaveLength(0);
});
test("search handles repeated query parameters and supports fabric and model search", () => {
  expect(
    selectCatalog({ q: ["LS006", "ignored"] }).visible.map(
      (p) => p.model_number,
    ),
  ).toEqual(["LS006"]);
  expect(selectCatalog({ q: "cotton" }).products.length).toBeGreaterThan(0);
  expect(selectCatalog({ q: "impossible model" }).products).toHaveLength(0);
  expect(
    selectCatalog({}, findCollection("mens-underwear")).products,
  ).toHaveLength(16);
});
test("focused underwear collections show only their matching catalogue styles", () => {
  const cottonThongs = selectCatalog({}, findCollection("cotton-thongs")).products;
  expect(cottonThongs.length).toBeGreaterThanOrEqual(5);
  expect(cottonThongs.every((p) => p.collection === "cotton-underwear" && /thong|tanga|string/i.test(p.fit))).toBe(true);
  const boxerBriefs = selectCatalog({}, findCollection("mens-boxer-briefs")).products;
  expect(boxerBriefs.length).toBeGreaterThanOrEqual(5);
  expect(boxerBriefs.every((p) => p.collection === "mens-underwear" && /boxer brief/i.test(p.fit))).toBe(true);
  expect(catalogMetadata({}, findCollection("cotton-thongs")).alternates?.canonical).toBe("https://www.yiwudiyasidress.com/products/cotton-thongs");
});
test("product metadata and pagination canonicals identify actual pages", async () => {
  const p = catalogProducts[0];
  const meta = await generateMetadata({
    params: Promise.resolve({ productId: p.slug }),
  });
  expect(meta.title).toEqual({ absolute: p.seo_title });
  expect(meta.alternates?.canonical).toBe(
    "https://www.yiwudiyasidress.com/products/" + p.slug,
  );
  expect(catalogMetadata({ page: "2" }).alternates?.canonical).toBe(
    "https://www.yiwudiyasidress.com/products?page=2",
  );
  expect(catalogMetadata({ q: "cotton" }).robots).toEqual({
    index: false,
    follow: true,
  });
});
test("retired products cannot come back through an API fallback", async () => {
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  expect(await getCatalogProductById("DYS-1601642594802")).toBeNull();
  const meta = await generateMetadata({
    params: Promise.resolve({ productId: "DYS-1601642594802" }),
  });
  expect(meta.robots).toEqual({ index: false, follow: true });
  expect(fetch).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});
test("robots excludes administrative and transactional surfaces", () => {
  expect(robots().rules).toEqual({
    userAgent: "*",
    allow: "/",
    disallow: ["/admin", "/api", "/payments", "/checkout"],
  });
});
