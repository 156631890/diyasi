import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { expect, test } from "vitest";

const catchAllRoutePath = fileURLToPath(new URL("../app/es/[...slug]/page.tsx", import.meta.url));
const landingPagePath = fileURLToPath(new URL("../components/LocalizedLandingPage.tsx", import.meta.url));
const topNavPath = fileURLToPath(new URL("../components/TopNav.tsx", import.meta.url));
const footerPath = fileURLToPath(new URL("../components/SiteFooter.tsx", import.meta.url));

test("Spanish catch-all route is explicit, static, and rejects unknown paths", async () => {
  const source = await readFile(catchAllRoutePath, "utf8");

  expect(source).toContain("export const dynamicParams = false");
  expect(source).toContain("return spanishStaticParams");
  expect(source).toContain("notFound();");
});

test("Spanish landing pages render factual schema and the CTA pair from localized data", async () => {
  const source = await readFile(landingPagePath, "utf8");

  expect(source).toContain('"@type": "WebPage"');
  expect(source).toContain("buildBreadcrumbJsonLd(breadcrumbs)");
  expect(source).toContain('"@type": "FAQPage"');
  expect(source).toContain("page.rfqCta");
  expect(source).toContain("page.whatsAppCta");
  expect(source).toContain("localizedMoqRoutes");
  expect(source).toContain("localizedQualitySteps");
  expect(source).toContain("SpanishQuoteFlow");
  expect(source).toContain('id="cotizacion"');
});

test("Spanish navigation and footer resolve only mapped URLs", async () => {
  const [topNavSource, footerSource] = await Promise.all([
    readFile(topNavPath, "utf8"),
    readFile(footerPath, "utf8")
  ]);

  expect(topNavSource).toContain('localeHref("es", englishPath)');
  expect(topNavSource).toContain("router.push(targetPath)");
  expect(footerSource).toContain('localeHref("es", englishPath)');
  expect(footerSource).toContain(".filter((item): item is { href: string; label: string } => Boolean(item.href))");
  expect(footerSource).toContain("spanishLinkLabels");
  expect(footerSource).toContain('"Fábrica y calidad"');
  expect(footerSource).toContain('"Servicios de marca propia"');
});
