import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { expect, test } from "vitest";

const catchAllRoutePath = fileURLToPath(
  new URL("../app/es/[...slug]/page.tsx", import.meta.url),
);
const landingPagePath = fileURLToPath(
  new URL("../components/LocalizedLandingPage.tsx", import.meta.url),
);

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
