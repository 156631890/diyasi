import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { expect, test } from "vitest";

import { canonicalUrl, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/site-config";
import { localeHref, spanishRoutes } from "@/lib/locale-routes";
import { buildMetadata } from "@/lib/seo";

const layoutPath = fileURLToPath(new URL("../app/layout.tsx", import.meta.url));
const rootPackagePath = fileURLToPath(new URL("../../../package.json", import.meta.url));

const expectedSpanishRoutes = {
  "/": "/es",
  "/products": "/es/productos/ropa-interior-marca-privada",
  "/low-moq": "/es/minimo-pedido-ropa-interior",
  "/products/seamless-underwear": "/es/ropa-interior-sin-costuras",
  "/oem-odm": "/es/fabricante-ropa-interior-china",
  "/packaging": "/es/empaque-personalizado",
  "/factory": "/es/fabrica-y-control-de-calidad",
  "/contact": "/es/contacto"
} as const;

const spanishCounterparts = Object.entries(expectedSpanishRoutes);

test("all public URLs use the canonical www origin", () => {
  expect(SITE_ORIGIN).toBe("https://www.yiwudiyasidress.com");
  expect(SITE_NAME).toBe("YiWu DiYaSi Dress Co., Ltd.");
  expect(SITE_DESCRIPTION).toBe(
    "Low-MOQ private-label underwear supplier for startup brands, retailers, and wholesale buyers."
  );
  expect(canonicalUrl("/products")).toBe("https://www.yiwudiyasidress.com/products");
  expect(canonicalUrl("/")).toBe("https://www.yiwudiyasidress.com/");
  expect(canonicalUrl("/products?sort=latest#details")).toBe(
    "https://www.yiwudiyasidress.com/products?sort=latest#details"
  );
});

test.each(["//evil.example", "/\\evil.example", "https://evil.example", "javascript:alert(1)", "products"])(
  "canonical URLs reject non-root-relative path %s",
  (path) => {
    expect(() => canonicalUrl(path)).toThrow("canonicalUrl path must be root-relative");
  }
);

test("Spanish counterpart map contains only approved public routes", () => {
  expect(spanishRoutes).toEqual(expectedSpanishRoutes);
});

test.each(spanishCounterparts)("locale helpers resolve %s", (englishPath, spanishPath) => {
  const englishUrl = new URL(englishPath, SITE_ORIGIN).toString();

  expect(localeHref("es", englishPath)).toBe(spanishPath);
  expect(localeHref("en", englishPath)).toBe(englishPath);
  expect(englishUrl).toBe(canonicalUrl(englishPath));
});

test("unmapped paths have no Spanish counterpart", () => {
  expect(localeHref("es", "/about")).toBeUndefined();
  expect(localeHref("en", "/about")).toBe("/about");
});

test("page metadata includes language alternates for reciprocal public counterparts", () => {
  const metadata = buildMetadata({
    title: "Contact",
    description: "Contact YiWu DiYaSi Dress Co., Ltd.",
    path: "/contact"
  });

  expect(metadata.alternates).toEqual({
    canonical: "https://www.yiwudiyasidress.com/contact",
    languages: {
      en: "https://www.yiwudiyasidress.com/contact",
      es: "https://www.yiwudiyasidress.com/es/contacto",
      "x-default": "https://www.yiwudiyasidress.com/contact"
    }
  });
});

test("root metadata uses shared canonical and MOQ policy data", async () => {
  const [layoutSource, rootPackageSource] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(rootPackagePath, "utf8")
  ]);
  const rootPackage = JSON.parse(rootPackageSource);
  const runtimeDependencies = rootPackage.dependencies ?? {};

  expect(layoutSource).toMatch(/import\s*{[^}]*SITE_ORIGIN[^}]*}\s*from\s*"@\/lib\/seo"/);
  expect(layoutSource).toMatch(/metadataBase:\s*new URL\(SITE_ORIGIN\)/);
  expect(layoutSource).toMatch(/import\s*{\s*moqRoutes\s*}\s*from\s*"@\/lib\/moq-routes"/);
  expect(layoutSource).toMatch(/additionalProperty:\s*moqRoutes\.map/);
  expect(layoutSource).not.toMatch(/\blanguages\s*:/);
  expect(layoutSource).not.toContain("diyasiunderwear.com");
  expect(rootPackage.devDependencies?.next).toBe("16.2.10");
  expect(runtimeDependencies).not.toHaveProperty("next");
  expect(runtimeDependencies).not.toHaveProperty("react");
  expect(runtimeDependencies).not.toHaveProperty("react-dom");
});
