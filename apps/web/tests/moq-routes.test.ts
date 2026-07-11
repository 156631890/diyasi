import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { expect, test } from "vitest";

import { moqRoutes } from "@/lib/moq-routes";

const siteInfoPath = fileURLToPath(new URL("../lib/site-info.ts", import.meta.url));
const layoutPath = fileURLToPath(new URL("../app/layout.tsx", import.meta.url));
const llmsRoutePath = fileURLToPath(new URL("../app/llms.txt/route.ts", import.meta.url));
const siteConfigPath = fileURLToPath(new URL("../lib/site-config.ts", import.meta.url));
const localeRoutesPath = fileURLToPath(new URL("../lib/locale-routes.ts", import.meta.url));
const moqRoutesPath = fileURLToPath(new URL("../lib/moq-routes.ts", import.meta.url));
const seoPath = fileURLToPath(new URL("../lib/seo.ts", import.meta.url));
const vercelConfigPath = fileURLToPath(new URL("../../../vercel.json", import.meta.url));

test("MOQ routes preserve every published tier and qualification", () => {
  expect(moqRoutes).toEqual([
    {
      id: "ready-stock",
      title: "Ready-stock or mature style",
      label: "Ready Stock MOQ",
      value: "from 100 pcs per style when available",
      summary: "Low MOQ is available only for ready-stock or mature styles when available."
    },
    {
      id: "private-label",
      title: "Private label",
      label: "Private Label MOQ",
      value: "500 pcs per style for logo label or waistband programs",
      summary: "Logo-label and waistband programs use a separate MOQ based on the required components."
    },
    {
      id: "custom-color",
      title: "Custom color",
      label: "Custom Color MOQ",
      value: "1,000 pcs per color depending on fabric and dyeing route",
      summary: "Custom color MOQ depends on fabric, dyeing route, and color development."
    },
    {
      id: "full-oem",
      title: "Full OEM",
      label: "Full OEM MOQ",
      value: "1,000-3,000 pcs per style depending on pattern, fabric, and packaging",
      summary: "Full OEM MOQ depends on pattern, fabric, and packaging."
    }
  ]);
});

test("policy consumers reuse MOQ routes and retain only the canonical host", async () => {
  const [siteInfoSource, layoutSource, llmsSource, siteConfigSource, localeRoutesSource, moqRoutesSource, seoSource, vercelSource] = await Promise.all([
    readFile(siteInfoPath, "utf8"),
    readFile(layoutPath, "utf8"),
    readFile(llmsRoutePath, "utf8"),
    readFile(siteConfigPath, "utf8"),
    readFile(localeRoutesPath, "utf8"),
    readFile(moqRoutesPath, "utf8"),
    readFile(seoPath, "utf8"),
    readFile(vercelConfigPath, "utf8")
  ]);
  const vercelConfig = JSON.parse(vercelSource);

  expect(siteInfoSource).toMatch(/import\s*{\s*moqRoutes\s*}\s*from\s*"\.\/moq-routes"/);
  expect(siteInfoSource).toMatch(
    /export const moqTiers = moqRoutes\.map\(\(\{ label, value \}\) => \(\{ label, value \}\)\);/
  );
  expect(siteInfoSource).not.toMatch(/from 100 pcs|500 pcs|1,000 pcs|1,000-3,000 pcs/);
  expect(layoutSource).toMatch(/import\s*{\s*moqRoutes\s*}\s*from\s*"@\/lib\/moq-routes"/);
  expect(layoutSource).toMatch(/additionalProperty:\s*moqRoutes\.map/);
  expect(llmsSource).toMatch(/import\s*{\s*moqRoutes\s*}\s*from\s*"@\/lib\/moq-routes"/);
  expect(llmsSource).toMatch(/\.\.\.moqRoutes\.map/);
  expect(localeRoutesSource).toMatch(/export function alternatesFor/);
  expect(vercelConfig.installCommand).toBe("npm ci");
  expect(vercelConfig.redirects).toContainEqual({
    source: "/:path*",
    has: [{ type: "host", value: "^yiwudiyasidress\\.com$" }],
    destination: "https://www.yiwudiyasidress.com/:path*",
    permanent: true
  });
  expect(
    [
      siteInfoSource,
      layoutSource,
      llmsSource,
      siteConfigSource,
      localeRoutesSource,
      moqRoutesSource,
      seoSource,
      vercelSource
    ].join("\n")
  ).not.toContain("diyasiunderwear.com");
});
