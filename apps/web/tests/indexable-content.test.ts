import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { afterEach, expect, test, vi } from "vitest";

import { generateMetadata } from "@/app/products/[productId]/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { indexableContent } from "@/lib/indexable-content";
import { indexableProducts } from "@/lib/indexable-products";
import { resourceArticles } from "@/lib/resource-articles";
import { launchCollections } from "@/lib/site-info";

const sitemapPath = fileURLToPath(new URL("../app/sitemap.ts", import.meta.url));
const productPagePath = fileURLToPath(new URL("../app/products/[productId]/page.tsx", import.meta.url));
const productsPagePath = fileURLToPath(new URL("../app/products/page.tsx", import.meta.url));
const productCatalogViewPath = fileURLToPath(new URL("../components/ProductCatalogView.tsx", import.meta.url));

const reviewedProducts = [
  { id: "DYS-1601642594802", title: "Custom Logo Cotton Panties for Private Label Brands", route: "ready-stock" },
  { id: "DYS-1601700253074", title: "Laser-Cut Seamless Women's Underwear for Private Label", route: "ready-stock" },
  { id: "DYS-1601668037716", title: "Soft Stretch Seamless Bra for Private Label Intimates", route: "private-label" },
  { id: "DYS-1601700082173", title: "Seamless Shapewear Bodysuit for Private Label Programs", route: "private-label" },
  { id: "DYS-1601560752382", title: "Men's 3D Pouch Boxer Brief for Private Label Brands", route: "private-label" },
  { id: "DYS-1601421046806", title: "Men's Supportive Contour Pouch Boxer Brief", route: "ready-stock" },
  { id: "DYS-1601603600505", title: "Cotton Brief with Lace Trim for Women's Underwear Brands", route: "ready-stock" },
  { id: "DYS-1601663234376", title: "Leakproof Period Underwear with Four-Layer Cotton Gusset", route: "private-label" },
  { id: "DYS-1601682971804", title: "High-Rise Cotton Hipster Panties for Multipack Programs", route: "private-label" },
  { id: "DYS-1600455122336", title: "High-Waist Cotton Lace Boyshorts for Private Label", route: "private-label" },
  { id: "DYS-1600285556699", title: "High-Waist Seamless Workout Shorts for Activewear Brands", route: "private-label" },
  { id: "DYS-1601707021411", title: "Women's Knitted Homewear Set for Private Label Programs", route: "ready-stock" }
] as const;

const reviewedProductIds = reviewedProducts.map((product) => product.id);
const spanishAcquisitionPaths = [
  "/es",
  "/es/productos/ropa-interior-marca-privada",
  "/es/minimo-pedido-ropa-interior",
  "/es/ropa-interior-sin-costuras",
  "/es/fabricante-ropa-interior-china",
  "/es/empaque-personalizado",
  "/es/fabrica-y-control-de-calidad",
  "/es/contacto"
];

afterEach(() => {
  vi.unstubAllGlobals();
});

test("sitemap contains only deterministic, curated public content", async () => {
  const entries = await sitemap();
  const paths = entries.map((entry) => new URL(entry.url).pathname);
  const productIds = paths
    .filter((path) => path.startsWith("/products/DYS-"))
    .map((path) => decodeURIComponent(path.slice("/products/".length)));

  expect(paths).toContain("/");
  expect(paths).toContain("/products/seamless-underwear");
  expect(paths).toContain(`/resources/${resourceArticles[0].slug}`);
  expect(paths).toEqual(expect.arrayContaining(spanishAcquisitionPaths));
  expect(paths).not.toContain("/admin");
  expect(productIds.length).toBeGreaterThan(0);
  expect(productIds.length).toBeLessThanOrEqual(50);
  expect(productIds).toEqual(reviewedProductIds);
  expect(entries).toEqual(await sitemap());
});

test("indexable content defines a reviewed product search surface", () => {
  expect(indexableProducts.map(({ id, title, route }) => ({ id, title, route }))).toEqual(reviewedProducts);
  expect(indexableProducts).toHaveLength(12);
  expect(indexableProducts.every((product) => /^\d{4}-\d{2}-\d{2}$/.test(product.reviewedAt))).toBe(true);
  expect(
    indexableProducts.every((product) => launchCollections.some((collection) => collection.slug === product.collectionSlug))
  ).toBe(true);
  expect(indexableProducts.map((product) => product.collectionSlug)).toEqual(
    [
      "womens-panties",
      "seamless-underwear",
      "bras",
      "shapewear",
      "mens-underwear",
      "mens-underwear",
      "womens-panties",
      "period-underwear",
      "womens-panties",
      "womens-panties",
      "activewear",
      "homewear"
    ]
  );
  expect(indexableContent.productPaths).toEqual(reviewedProductIds.map((id) => `/products/${id}`));
  expect(indexableContent.paths).not.toContain("/blog");
  expect(indexableContent.paths).not.toContain("/admin");
  expect(indexableContent.paths).not.toContain("/checkout");
  expect(indexableContent.paths).not.toContain("/payments");
  expect(indexableContent.paths).toEqual(expect.arrayContaining(spanishAcquisitionPaths));
});

test("sitemap implementation does not fetch runtime content or generate dates", async () => {
  const source = await readFile(sitemapPath, "utf8");

  expect(source).not.toMatch(/safeFetchJson|getCatalogProducts|new Date/);
});

test("unreviewed product metadata is noindex,follow", async () => {
  vi.stubGlobal("fetch", async () => new Response(null, { status: 404 }));

  const metadata = await generateMetadata({
    params: Promise.resolve({ productId: "DYS-1600314985227" })
  });

  expect(metadata.robots).toEqual({ index: false, follow: true });
});

test("robots protects administrative, API, payment, and checkout routes", () => {
  expect(robots().rules).toEqual({
    userAgent: "*",
    allow: "/",
    disallow: ["/admin", "/api", "/payments", "/checkout"]
  });
});

test("product source keeps imported commercial terms out of pages", async () => {
  const source = await readFile(productPagePath, "utf8");

  expect(source).not.toContain('"@type": "Offer"');
  expect(source).not.toContain("BuyNowButton");
  expect(source).not.toContain("Paid Sample");
  expect(source).not.toContain("resolvePriceText");
  expect(source).not.toContain("resolveMoqText");
  expect(source).not.toContain("item.moq");
  expect(source).toContain("moqRoutes.find((item) => item.id === reviewedProduct.route)");
});

test("product source conditionally includes material schema and a reviewed collection link", async () => {
  const source = await readFile(productPagePath, "utf8");

  expect(source).toContain("material: typedProduct.fabric || undefined");
  expect(source).toContain("findCollection(reviewedProduct.collectionSlug)");
  expect(source).toContain("href={reviewedCollection.href}");
});

test("catalog sources do not forward or render imported price and raw MOQ fields", async () => {
  const [productsPageSource, catalogViewSource] = await Promise.all([
    readFile(productsPagePath, "utf8"),
    readFile(productCatalogViewPath, "utf8")
  ]);

  for (const source of [productsPageSource, catalogViewSource]) {
    expect(source).not.toContain("resolvePriceText");
    expect(source).not.toContain("priceText");
    expect(source).not.toContain("comparePrice");
    expect(source).not.toContain("compareMOQ");
    expect(source).not.toContain("lowMoq");
    expect(source).not.toContain("low_moq");
  }

  expect(productsPageSource).not.toContain("product.moq");
  expect(catalogViewSource).not.toContain("product.moq");
  expect(catalogViewSource).not.toContain("moq?: string");
  expect(productsPageSource).toContain("projectConfirmation");
  expect(catalogViewSource).toContain("copy.projectConfirmation");
});
