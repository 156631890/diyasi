# DIYASI Balanced SEO, GEO, and Conversion Growth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `https://www.yiwudiyasidress.com` into a verifiable low-MOQ private-label underwear acquisition site with a healthy canonical surface, indexable English and Spanish buyer pages, and attributable RFQ and WhatsApp conversion paths.

**Architecture:** Keep the Next.js App Router and FastAPI backend. Centralize origin, locale, MOQ-route, indexability, and buyer-content decisions in small data modules. Use a Next.js `proxy.ts` only to expose the locale route to the existing site shell; publish Spanish acquisition pages as explicit routes; retain the catalog for buyer browsing while indexing only a reviewed representative set.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript, Tailwind CSS, Vitest, ESLint flat config, FastAPI, SQLAlchemy, SQLite/PostgreSQL through `DATABASE_URL`, GitHub Actions, Vercel.

---

## Baseline to Preserve

- The canonical production site is `https://www.yiwudiyasidress.com`.
- `www.diyasiunderwear.com` is uncontrolled and must never appear as a canonical, alternate, sitemap, or redirect target.
- `npm run build` currently passes on Next.js `14.2.35` and emits 40 routes.
- `npm run lint` fails because `next lint` opens an interactive setup prompt.
- `npm audit --omit=dev --audit-level=high` reports high-severity Next.js advisories; do not run `npm audit fix --force`.
- The current live sitemap has 46 URLs even though `data/alibaba-products.json` contains 300 catalog records. Product indexing must become deterministic.
- Existing product data includes third-party source price and MOQ fields. Do not make those fields a universal public promise or structured-data `Offer`.

## File Responsibility Map

| File | Responsibility |
| --- | --- |
| `apps/web/lib/site-config.ts` | Immutable canonical host, organization facts, locale metadata, and public contact facts |
| `apps/web/lib/seo.ts` | Canonical URL, localized metadata, JSON-LD helpers, and `hreflang` helpers |
| `apps/web/lib/locale-routes.ts` | English/Spanish counterpart URLs and locale-aware navigation helpers |
| `apps/web/lib/moq-routes.ts` | Four public MOQ paths and their buyer-facing boundaries |
| `apps/web/lib/indexable-content.ts` | Core, resource, Spanish, and selected-product sitemap manifest |
| `apps/web/lib/indexable-products.ts` | Explicit representative product IDs and editorial titles/descriptions |
| `apps/web/lib/localized-pages.ts` | The first Spanish landing-page content and English counterparts |
| `apps/web/lib/conversion-events.ts` | Safe, non-PII conversion event names and client tracking helper |
| `apps/web/proxy.ts` | Sets an internal `x-site-locale` header for `/es` URLs |
| `apps/web/app/es/**` | Spanish acquisition routes |
| `apps/web/components/ProjectRouteSelector.tsx` | Homepage project-path choice and conversion event trigger |
| `apps/web/components/QuoteFlow.tsx` | Two-stage RFQ interface shared by contact and representative-product routes |
| `apps/web/components/WhatsAppLink.tsx` | Contextual WhatsApp message builder and event trigger |
| `apps/web/components/LocalizedLandingPage.tsx` | Shared rendering for explicit Spanish acquisition pages |
| `apps/web/tests/*.test.ts` | Unit and contract tests for every new pure policy module |
| `apps/web/scripts/verify-seo.mjs` | Build-output and production HTTP SEO contract checker |
| `services/api/models.py` | Adds a non-PII conversion-event table |
| `services/api/schemas.py` | Validated conversion-event request and response schemas |
| `services/api/migrations.py` | Adds the conversion-event columns for existing SQLite deployments |
| `services/api/routers/analytics.py` | Stores event rows and returns actual conversion counts without fabricated traffic/ranking metrics |
| `.github/workflows/quality.yml` | Installs, lints, tests, builds, and verifies the web app before deployment |
| `docs/seo/diyasi-search-console-monitoring.md` | Day 0/7/30/60/90 measurement and release records |

## Task 1: Create a Non-Interactive Quality Baseline and Upgrade the Framework Safely

**Files:**
- Modify: `package.json`
- Modify: `apps/package.json`
- Modify: `apps/web/package.json`
- Modify: `apps/web/package-lock.json`
- Create: `apps/web/eslint.config.mjs`
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/tests/setup.test.ts`
- Create: `apps/web/tests/checkout-mock-route.test.ts`
- Modify: `apps/web/lib/server-lang.ts`
- Modify: `apps/web/next-env.d.ts`
- Modify: `apps/web/tsconfig.json`
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/app/admin/page.tsx`
- Modify: `apps/web/app/about/page.tsx`
- Modify: `apps/web/app/blog/page.tsx`
- Modify: `apps/web/app/blog/[slug]/page.tsx`
- Modify: `apps/web/app/fabrics/page.tsx`
- Modify: `apps/web/app/factory/page.tsx`
- Modify: `apps/web/app/oem-odm/page.tsx`
- Modify: `apps/web/app/packaging/page.tsx`
- Modify: `apps/web/app/payments/page.tsx`
- Modify: `apps/web/app/products/page.tsx`
- Modify: `apps/web/app/products/[productId]/page.tsx`
- Modify: `apps/web/app/resources/[slug]/page.tsx`
- Modify: `apps/web/app/sustainability/page.tsx`
- Modify: `apps/web/app/checkout/mock/page.tsx`
- Modify: `apps/web/app/checkout/cancel/page.tsx`
- Modify: `apps/web/app/checkout/paypal/page.tsx`
- Modify: `apps/web/app/checkout/success/page.tsx`
- Modify: `apps/web/components/CompareButton.tsx`
- Modify: `apps/web/components/PayPalPaymentsPanel.tsx`
- Modify: `apps/web/components/ProductCatalogView.tsx`

- [x] **Step 1: Add a failing Vitest smoke test and test commands.**

Add this script block to `apps/web/package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "test": "vitest run"
}
```

Add this root script block to `package.json`:

```json
"scripts": {
  "dev": "npm run dev --workspace apps/web",
  "build": "npm run build --workspace apps/web",
  "start": "npm run start --workspace apps/web",
  "lint": "npm run lint --workspace apps/web",
  "test": "npm run test --workspace apps/web"
}
```

Create `apps/web/tests/setup.test.ts`:

```ts
import { expect, test } from "vitest";

test("test runner is configured", () => {
  expect(true).toBe(true);
});
```

- [x] **Step 2: Run the new test command and confirm the expected failure.**

Run: `npm test`

Expected: FAIL because Vitest is not installed and the `test` script does not yet exist in the lockfile.

- [x] **Step 3: Install the supported framework and quality dependencies.**

Run:

```powershell
npm install --workspace apps/web next@16.2.10 react@19.2 react-dom@19.2
npm install --workspace apps/web --save-dev eslint@9 eslint-config-next@16.2.10 @types/react@19 @types/react-dom@19 vitest@3
```

Create `apps/web/eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "node_modules/**", "coverage/**"])
]);
```

Create `apps/web/vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname)
    }
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
```

- [x] **Step 4: Migrate request-time APIs required by Next.js 16.**

Make `getServerLang` asynchronous and use the locale header first:

```ts
import { cookies, headers } from "next/headers";
import { SiteLang, normalizeLang } from "./i18n";

export async function getServerLang(): Promise<SiteLang> {
  const headerStore = await headers();
  const routedLocale = headerStore.get("x-site-locale");
  if (routedLocale) return normalizeLang(routedLocale);

  const cookieStore = await cookies();
  return normalizeLang(cookieStore.get("site_lang")?.value);
}
```

Mark every server page listed in this task `async` and replace `const lang = getServerLang()` with `const lang = await getServerLang()`. Change every dynamic route type from `params: { ... }` to `params: Promise<{ ... }>` and resolve it once:

```ts
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // existing lookup using slug
}
```

Apply the same promise resolution to `productId`, `searchParams`, and `headers()` calls in the listed route files. This includes `/checkout/mock`, which must await its order query parameters once before calculating the fallback order data; add a regression test for the async route contract.

Keep the flat ESLint core-web-vitals rules intact. If the upgraded rule detects pre-existing browser-storage hydration or third-party PayPal SDK transition code, use only narrow, documented line-level suppressions after confirming the failure; do not lower the rule globally.

- [x] **Step 5: Run the framework migration checks.**

Run:

```powershell
npm test
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

Expected: tests and lint pass without prompts; build passes; the production dependency audit has no high or critical finding. If the audit still reports a framework advisory, stop and diagnose the installed version before continuing.

- [x] **Step 6: Commit the foundation.**

```powershell
git add package.json package-lock.json apps/package.json apps/web/package.json apps/web/package-lock.json apps/web/eslint.config.mjs apps/web/vitest.config.ts apps/web/tests apps/web/lib/server-lang.ts apps/web/next-env.d.ts apps/web/tsconfig.json apps/web/app apps/web/components
git commit -m "chore: establish diyasi quality baseline"
```

## Task 2: Centralize the Canonical Origin, Locale Counterparts, and MOQ Paths

**Files:**
- Create: `apps/web/lib/site-config.ts`
- Create: `apps/web/lib/locale-routes.ts`
- Create: `apps/web/lib/moq-routes.ts`
- Modify: `apps/web/lib/seo.ts`
- Modify: `apps/web/lib/site-info.ts`
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/app/llms.txt/route.ts`
- Modify: `vercel.json`
- Create: `apps/web/tests/site-config.test.ts`
- Create: `apps/web/tests/moq-routes.test.ts`

- [ ] **Step 1: Write failing origin, locale, and MOQ policy tests.**

Create `apps/web/tests/site-config.test.ts`:

```ts
import { expect, test } from "vitest";
import { canonicalUrl, SITE_ORIGIN } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-routes";

test("all public URLs use the canonical www origin", () => {
  expect(SITE_ORIGIN).toBe("https://www.yiwudiyasidress.com");
  expect(canonicalUrl("/products")).toBe("https://www.yiwudiyasidress.com/products");
  expect(canonicalUrl("/")).toBe("https://www.yiwudiyasidress.com/");
});

test("Spanish routes have explicit public URLs", () => {
  expect(localeHref("es", "/")).toBe("/es");
  expect(localeHref("es", "/contact")).toBe("/es/contacto");
  expect(localeHref("es", "/about")).toBeUndefined();
  expect(localeHref("en", "/contact")).toBe("/contact");
});
```

Create `apps/web/tests/moq-routes.test.ts`:

```ts
import { expect, test } from "vitest";
import { moqRoutes } from "@/lib/moq-routes";

test("MOQ routes remain distinct commercial paths", () => {
  expect(moqRoutes.map((route) => route.id)).toEqual([
    "ready-stock",
    "private-label",
    "custom-color",
    "full-oem"
  ]);
  expect(moqRoutes[0].summary).toContain("when available");
  expect(moqRoutes[3].summary).toContain("pattern, fabric, and packaging");
});
```

- [ ] **Step 2: Run the policy tests and confirm they fail.**

Run: `npm test -- --run tests/site-config.test.ts tests/moq-routes.test.ts`

Expected: FAIL because the new modules do not exist.

- [ ] **Step 3: Add the single source of truth modules.**

Create `apps/web/lib/site-config.ts`:

```ts
export const SITE_ORIGIN = "https://www.yiwudiyasidress.com";
export const SITE_NAME = "YiWu DiYaSi Dress Co., Ltd.";
export const SITE_DESCRIPTION =
  "Low-MOQ private-label underwear supplier for startup brands, retailers, and wholesale buyers.";

export function canonicalUrl(path = "/"): string {
  return new URL(path, SITE_ORIGIN).toString();
}
```

Create `apps/web/lib/locale-routes.ts` with only the confirmed first-release counterpart map:

```ts
export type PublicLocale = "en" | "es";

const spanishRoutes: Record<string, string> = {
  "/": "/es",
  "/products": "/es/productos/ropa-interior-marca-privada",
  "/low-moq": "/es/minimo-pedido-ropa-interior",
  "/products/seamless-underwear": "/es/ropa-interior-sin-costuras",
  "/oem-odm": "/es/fabricante-ropa-interior-china",
  "/packaging": "/es/empaque-personalizado",
  "/factory": "/es/fabrica-y-control-de-calidad",
  "/contact": "/es/contacto"
};

export function localeHref(locale: PublicLocale, englishPath: string): string | undefined {
  return locale === "es" ? spanishRoutes[englishPath] : englishPath;
}

export function alternatesFor(englishPath: string) {
  const spanishPath = localeHref("es", englishPath);
  return {
    en: canonicalUrl(englishPath),
    ...(spanishPath ? { es: canonicalUrl(spanishPath) } : {}),
    "x-default": canonicalUrl(englishPath)
  };
}
```

Import `canonicalUrl` inside the module. Never map an unsupported English page to `/es`; it has no equivalent until a real counterpart is added. Create `apps/web/lib/moq-routes.ts` with these exact public boundaries:

```ts
export const moqRoutes = [
  { id: "ready-stock", title: "Ready-stock or mature style", summary: "Low MOQ is available only for ready-stock or mature styles when available." },
  { id: "private-label", title: "Private label", summary: "Logo-label and waistband programs use a separate MOQ based on the required components." },
  { id: "custom-color", title: "Custom color", summary: "Custom color MOQ depends on fabric, dyeing route, and color development." },
  { id: "full-oem", title: "Full OEM", summary: "Full OEM MOQ depends on pattern, fabric, and packaging." }
] as const;
```

Replace the `SITE_URL`, `SITE_NAME`, and `SITE_DESCRIPTION` constants in `apps/web/lib/seo.ts` with re-exports from `site-config.ts`. Replace repeated public MOQ strings in `site-info.ts`, the layout JSON-LD, and `llms.txt` with the shared route data. Do not include `www.diyasiunderwear.com` anywhere in the new modules.

- [ ] **Step 4: Add the host redirect.**

Update `vercel.json` so the controllable apex host redirects to the canonical host:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "yiwudiyasidress.com" }],
      "destination": "https://www.yiwudiyasidress.com/:path*",
      "permanent": true
    }
  ]
}
```

- [ ] **Step 5: Run policy tests, lint, and build.**

Run:

```powershell
npm test -- --run tests/site-config.test.ts tests/moq-routes.test.ts
npm run lint
npm run build
```

Expected: policy tests pass, no lint errors, and the build still renders every existing page.

- [ ] **Step 6: Commit canonical and commercial policy.**

```powershell
git add apps/web/lib/site-config.ts apps/web/lib/locale-routes.ts apps/web/lib/moq-routes.ts apps/web/lib/seo.ts apps/web/lib/site-info.ts apps/web/app/layout.tsx apps/web/app/llms.txt/route.ts apps/web/tests/site-config.test.ts apps/web/tests/moq-routes.test.ts vercel.json
git commit -m "feat: centralize diyasi SEO and MOQ policy"
```

## Task 3: Make Sitemap and Product Indexability Deterministic

**Files:**
- Create: `apps/web/lib/indexable-products.ts`
- Create: `apps/web/lib/indexable-content.ts`
- Modify: `apps/web/app/sitemap.ts`
- Modify: `apps/web/app/robots.ts`
- Modify: `apps/web/app/products/[productId]/page.tsx`
- Modify: `apps/web/lib/catalog-source.ts`
- Create: `apps/web/tests/indexable-content.test.ts`

- [ ] **Step 1: Write a failing sitemap-manifest test.**

Create `apps/web/tests/indexable-content.test.ts`:

```ts
import { expect, test } from "vitest";
import { indexablePaths, indexableProductIds } from "@/lib/indexable-content";

test("sitemap uses explicit approved paths", () => {
  expect(indexablePaths).toContain("/");
  expect(indexablePaths).toContain("/products/seamless-underwear");
  expect(indexablePaths).toContain("/resources/accurate-underwear-yoga-wear-manufacturing-quote");
  expect(indexablePaths).not.toContain("/admin");
  expect(indexableProductIds.length).toBeGreaterThan(0);
  expect(indexableProductIds.length).toBeLessThanOrEqual(50);
});
```

- [ ] **Step 2: Run the test and confirm it fails.**

Run: `npm test -- --run tests/indexable-content.test.ts`

Expected: FAIL because `indexable-content.ts` is absent.

- [ ] **Step 3: Define the reviewed representative-product manifest.**

Create `apps/web/lib/indexable-products.ts` with this first-release set. The names describe the page intent; every product still renders the factual imported material, images, and project details.

```ts
export const indexableProducts = [
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
```

- [ ] **Step 4: Add the sitemap manifest and apply robots rules to unreviewed SKUs.**

Create `apps/web/lib/indexable-content.ts`:

```ts
import { indexableProducts } from "./indexable-products";
import { launchCollections } from "./site-info";
import { resourceArticles } from "./resource-articles";

export const indexableProductIds = indexableProducts.map((product) => product.id);
export const indexablePaths = [
  "/",
  "/products",
  "/oem-odm",
  "/factory",
  "/fabrics",
  "/packaging",
  "/sustainability",
  "/resources",
  "/about",
  "/contact",
  "/privacy-policy",
  "/return-policy",
  ...launchCollections.map((collection) => `/products/${collection.slug}`),
  ...resourceArticles.map((article) => `/resources/${article.slug}`),
  ...indexableProductIds.map((id) => `/products/${id}`)
] as const;
```

Replace request-time `new Date()` sitemap dates with fixed content dates from the manifest. Add a `reviewedAt` field to each representative product record and use it for its sitemap entry.

In `apps/web/app/products/[productId]/page.tsx`, resolve an editorial manifest record before metadata generation. Use its unique title and `robots: { index: false, follow: true }` for every non-manifest SKU. Remove `Offer` JSON-LD and the public `BuyNowButton` from every product page because imported source prices and availability are not a current direct-sale offer. Keep `Product`, `BreadcrumbList`, visible material, project-route, and RFQ details for reviewed products.

- [ ] **Step 5: Replace the dynamic sitemap dependency.**

Remove `safeFetchJson` and `getCatalogProducts` from `apps/web/app/sitemap.ts`. Generate the sitemap solely from `indexablePaths`, `canonicalUrl`, and the manifest's dates. Do not add `/admin`, payment, checkout, API, `blog`, or any unreviewed product route.

- [ ] **Step 6: Run the manifest checks.**

Run:

```powershell
npm test -- --run tests/indexable-content.test.ts
npm run lint
npm run build
```

Expected: the manifest test passes; the sitemap output is deterministic; no public product route exposes `Offer` schema or a paid-sample checkout CTA.

- [ ] **Step 7: Commit deterministic indexing.**

```powershell
git add apps/web/lib/indexable-products.ts apps/web/lib/indexable-content.ts apps/web/app/sitemap.ts apps/web/app/robots.ts apps/web/app/products/[productId]/page.tsx apps/web/lib/catalog-source.ts apps/web/tests/indexable-content.test.ts
git commit -m "feat: publish curated diyasi search surface"
```

## Task 4: Build Explicit Spanish Acquisition Pages and Correct Hreflang

**Files:**
- Create: `apps/web/proxy.ts`
- Create: `apps/web/lib/localized-pages.ts`
- Create: `apps/web/components/LocalizedLandingPage.tsx`
- Create: `apps/web/app/es/page.tsx`
- Create: `apps/web/app/es/[slug]/page.tsx`
- Modify: `apps/web/components/TopNav.tsx`
- Modify: `apps/web/components/SiteFooter.tsx`
- Modify: `apps/web/lib/seo.ts`
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/app/products/page.tsx`
- Modify: `apps/web/app/oem-odm/page.tsx`
- Modify: `apps/web/app/packaging/page.tsx`
- Modify: `apps/web/app/factory/page.tsx`
- Modify: `apps/web/app/contact/layout.tsx`
- Create: `apps/web/tests/localized-pages.test.ts`

- [ ] **Step 1: Write a failing localized-page contract.**

Create `apps/web/tests/localized-pages.test.ts`:

```ts
import { expect, test } from "vitest";
import { spanishPages } from "@/lib/localized-pages";

test("Spanish launch set has eight unique acquisition routes", () => {
  expect(spanishPages.map((page) => page.slug)).toEqual([
    "home",
    "productos/ropa-interior-marca-privada",
    "minimo-pedido-ropa-interior",
    "ropa-interior-sin-costuras",
    "fabricante-ropa-interior-china",
    "empaque-personalizado",
    "fabrica-y-control-de-calidad",
    "contacto"
  ]);
  expect(new Set(spanishPages.map((page) => page.slug)).size).toBe(8);
  expect(spanishPages.every((page) => page.title.length > 30 && page.description.length > 80)).toBe(true);
});
```

- [ ] **Step 2: Run the test and confirm it fails.**

Run: `npm test -- --run tests/localized-pages.test.ts`

Expected: FAIL because the Spanish content module does not exist.

- [ ] **Step 3: Create Spanish page data and renderer.**

Create `apps/web/lib/localized-pages.ts` with eight page records. Each record includes `slug`, `englishPath`, `title`, `description`, `eyebrow`, `h1`, `lead`, `facts`, `sections`, `faq`, `primaryCta`, and `secondaryCta`. Use the approved copy direction below for the home record:

```ts
{
  slug: "home",
  englishPath: "/",
  title: "Fabricante de ropa interior de marca privada con MOQ bajo",
  description: "DIYASI ayuda a marcas, distribuidores y mayoristas a desarrollar ropa interior de marca privada con opciones de MOQ bajo para estilos disponibles y rutas claras para personalizacion.",
  eyebrow: "Fabricante de ropa interior en Yiwu, China",
  h1: "Ropa interior de marca privada para marcas que empiezan con MOQ bajo",
  lead: "Elige una ruta de estilo disponible, marca privada o desarrollo OEM completo antes de solicitar cotizacion. Asi el MOQ, la muestra, el empaque y el plazo se revisan segun el proyecto real.",
  primaryCta: "Explorar opciones de MOQ bajo",
  secondaryCta: "Hablar por WhatsApp"
}
```

Use the same verified organization, MOQ-route, and contact data as English. Do not translate a claim that lacks an English factual source.

Create `LocalizedLandingPage.tsx` to render one H1, a fact list, sections, visible FAQs, contextual `QuoteFlow`, and `WhatsAppLink`. The component receives one page record and emits `WebPage`, `BreadcrumbList`, and `FAQPage` only when that record has visible FAQs.

- [ ] **Step 4: Route Spanish URLs and make the shell locale-aware.**

Create `apps/web/proxy.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", request.nextUrl.pathname === "/es" || request.nextUrl.pathname.startsWith("/es/") ? "es" : "en");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next|api|favicon.ico).*)"] };
```

Create `app/es/page.tsx` for the `home` record and `app/es/[...slug]/page.tsx` for the seven non-home records. Use `generateStaticParams` from `spanishPages`. For an unknown Spanish route call `notFound()`.

Update `TopNav` and `SiteFooter` so `initialLang === "es"` prefixes navigation through `localeHref("es", href)`, while English keeps existing paths. The language selector navigates to the counterpart route instead of only setting a cookie.

- [ ] **Step 5: Add reciprocal metadata alternates.**

Extend `buildMetadata` to accept `englishPath` and return:

```ts
alternates: {
  canonical: canonicalUrl(path),
  languages: alternatesFor(englishPath)
}
```

Pass counterpart paths on English home, products, OEM/ODM, packaging, factory, and contact pages. Spanish records use `canonicalUrl(`/es/${slug}`)` and `alternatesFor(englishPath)`.

- [ ] **Step 6: Run localized route verification.**

Run:

```powershell
npm test -- --run tests/localized-pages.test.ts tests/site-config.test.ts
npm run lint
npm run build
```

Expected: eight Spanish routes build; their canonicals use `/es`; English counterparts use English routes; navigation never sends Spanish users to a cookie-only English URL.

- [ ] **Step 7: Commit the Spanish acquisition layer.**

```powershell
git add apps/web/proxy.ts apps/web/lib/localized-pages.ts apps/web/components/LocalizedLandingPage.tsx apps/web/app/es apps/web/components/TopNav.tsx apps/web/components/SiteFooter.tsx apps/web/lib/seo.ts apps/web/app/page.tsx apps/web/app/products/page.tsx apps/web/app/oem-odm/page.tsx apps/web/app/packaging/page.tsx apps/web/app/factory/page.tsx apps/web/app/contact/layout.tsx apps/web/tests/localized-pages.test.ts
git commit -m "feat: add diyasi Spanish acquisition pages"
```

## Task 5: Add the Low-MOQ Homepage Path and Contextual RFQ Components

**Files:**
- Create: `apps/web/components/ProjectRouteSelector.tsx`
- Create: `apps/web/components/QuoteFlow.tsx`
- Create: `apps/web/components/WhatsAppLink.tsx`
- Create: `apps/web/lib/conversion-events.ts`
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/app/contact/page.tsx`
- Modify: `apps/web/components/ProductInquiryForm.tsx`
- Modify: `apps/web/app/products/[productId]/page.tsx`
- Create: `apps/web/tests/conversion-events.test.ts`

- [ ] **Step 1: Write failing conversion policy tests.**

Create `apps/web/tests/conversion-events.test.ts`:

```ts
import { expect, test } from "vitest";
import { conversionEventNames, buildWhatsAppUrl } from "@/lib/conversion-events";

test("only approved non-PII conversion events are emitted", () => {
  expect(conversionEventNames).toEqual([
    "low_moq_route_selected",
    "quote_started",
    "quote_submitted",
    "whatsapp_started",
    "product_inquiry_started",
    "resource_to_quote"
  ]);
});

test("WhatsApp links preserve page and project context", () => {
  const url = buildWhatsAppUrl({ page: "/products/DYS-1601642594802", route: "ready-stock" });
  expect(url).toContain("wa.me/8618042579030");
  expect(decodeURIComponent(url)).toContain("Project route: ready-stock");
});
```

- [ ] **Step 2: Run the test and confirm it fails.**

Run: `npm test -- --run tests/conversion-events.test.ts`

Expected: FAIL because `conversion-events.ts` does not exist.

- [ ] **Step 3: Add the conversion helper.**

Create `apps/web/lib/conversion-events.ts`:

```ts
export const conversionEventNames = [
  "low_moq_route_selected",
  "quote_started",
  "quote_submitted",
  "whatsapp_started",
  "product_inquiry_started",
  "resource_to_quote"
] as const;

export type ConversionEventName = (typeof conversionEventNames)[number];

export function buildWhatsAppUrl({ page, route, productId }: { page: string; route?: string; productId?: string }) {
  const lines = [
    "Hello DIYASI, I would like to discuss a private-label underwear project.",
    `Page: ${page}`,
    route ? `Project route: ${route}` : "",
    productId ? `Product: ${productId}` : ""
  ].filter(Boolean);
  return `https://wa.me/8618042579030?text=${encodeURIComponent(lines.join("\n"))}`;
}
```

Add a client-only `trackConversion` function that sends only event name, path, locale, project route, and product ID to `/analytics/events`. Do not send email, name, company, message, or any form field.

- [ ] **Step 4: Implement the route selector and RFQ flow.**

`ProjectRouteSelector` renders these exact route cards from `moqRoutes`: ready-stock, private-label, custom-color, and full-oem. Selecting a card updates the second-stage form, fires `low_moq_route_selected`, and scrolls to the quote flow.

`QuoteFlow` keeps stage one to buyer role, category, project route, estimated quantity, and target market. Stage two contains fabric/color, label or packaging requirements, timeline, contact information, and project notes. The submit payload keeps the existing API compatibility by serializing project details into `message` until Task 6 adds typed fields.

`WhatsAppLink` calls `buildWhatsAppUrl`, fires `whatsapp_started`, and opens a new tab with `rel="noreferrer"`.

Replace the single large contact form with `QuoteFlow`. Replace `ProductInquiryForm` with a product-context variant of `QuoteFlow`; it must preselect the product category and product ID without exposing the imported source price as a checkout CTA.

- [ ] **Step 5: Recompose the homepage.**

Update `app/page.tsx` to use this order:

1. Existing factory hero with low-MOQ primary CTA and contextual WhatsApp secondary CTA.
2. `ProjectRouteSelector`.
3. Existing buyer-segment support.
4. Existing eight collection links.
5. Customization and process blocks.
6. Factory and QC proof.
7. Reviewed product examples only.
8. MOQ-route FAQ and final `QuoteFlow` CTA.

Remove the public paid-sample purchase action from homepage-linked product cards. Do not delete payment API routes in this task.

- [ ] **Step 6: Run conversion checks.**

Run:

```powershell
npm test -- --run tests/conversion-events.test.ts tests/moq-routes.test.ts
npm run lint
npm run build
```

Expected: every approved event name is test-covered; no conversion helper sends PII; the RFQ route is reachable from homepage, contact, and reviewed product pages.

- [ ] **Step 7: Commit the low-MOQ funnel.**

```powershell
git add apps/web/components/ProjectRouteSelector.tsx apps/web/components/QuoteFlow.tsx apps/web/components/WhatsAppLink.tsx apps/web/lib/conversion-events.ts apps/web/app/page.tsx apps/web/app/contact/page.tsx apps/web/components/ProductInquiryForm.tsx apps/web/app/products/[productId]/page.tsx apps/web/tests/conversion-events.test.ts
git commit -m "feat: add diyasi low MOQ inquiry funnel"
```

## Task 6: Store Actual Conversion Events and Typed RFQ Details

**Files:**
- Modify: `services/api/models.py`
- Modify: `services/api/schemas.py`
- Modify: `services/api/migrations.py`
- Modify: `services/api/routers/inquiries.py`
- Modify: `services/api/routers/analytics.py`
- Modify: `services/api/main.py`
- Create: `services/api/routers/conversions.py`
- Create: `services/api/tests/test_conversions.py`
- Modify: `apps/web/lib/conversion-events.ts`

- [ ] **Step 1: Write failing API tests.**

Create `services/api/tests/test_conversions.py`:

```python
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_accepts_allowlisted_conversion_event() -> None:
    response = client.post(
        "/analytics/events",
        json={"name": "quote_started", "path": "/contact", "locale": "en", "project_route": "ready-stock"},
    )
    assert response.status_code == 201
    assert response.json()["name"] == "quote_started"


def test_rejects_unknown_or_personal_event_payloads() -> None:
    response = client.post(
        "/analytics/events",
        json={"name": "email_captured", "path": "/contact", "email": "buyer@example.com"},
    )
    assert response.status_code == 422
```

- [ ] **Step 2: Run the API test and confirm it fails.**

Run: `cd services/api; python -m pytest tests/test_conversions.py -q`

Expected: FAIL because `/analytics/events` and `ConversionEvent` do not exist.

- [ ] **Step 3: Add the conversion model, schema, and migration.**

Add this model to `services/api/models.py`:

```python
class ConversionEvent(Base):
    __tablename__ = "conversion_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(80), index=True)
    path: Mapped[str] = mapped_column(String(255), default="")
    locale: Mapped[str] = mapped_column(String(8), default="en")
    project_route: Mapped[str] = mapped_column(String(40), default="")
    product_id: Mapped[str] = mapped_column(String(80), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
```

Add this request schema to `services/api/schemas.py`:

```python
class ConversionEventCreate(BaseModel):
    name: Literal[
        "low_moq_route_selected", "quote_started", "quote_submitted",
        "whatsapp_started", "product_inquiry_started", "resource_to_quote"
    ]
    path: str = Field(max_length=255)
    locale: str = Field(default="en", max_length=8)
    project_route: str = Field(default="", max_length=40)
    product_id: str = Field(default="", max_length=80)
```

Add `conversion_events` creation through `Base.metadata.create_all` and add no unsafe raw migration. The existing SQLite migration runner only handles additive column changes, so no migration is needed for a new table.

- [ ] **Step 4: Add the router and remove fabricated analytics.**

Create `services/api/routers/conversions.py` with a `POST /analytics/events` handler that persists only `ConversionEventCreate` fields and returns `201`.

Update `services/api/main.py` to include `conversions.router`.

Update `analytics.overview` to return actual counters such as `conversion_events_total`, `events_by_name`, `inquiries`, `lead_total`, and `qualified_leads`. Remove `daily_visitors`, `keyword_ranking_keywords`, and `email_reply_rate`, because those values are currently fabricated.

Extend `InquiryCreate` only with typed non-PII project fields already collected by `QuoteFlow`: `country`, `category`, `quantity`, `project_route`, `private_label`, `packaging`, and `launch_date`. Persist them in an additive `Inquiry` model migration and retain `message` for backward compatibility.

- [ ] **Step 5: Update the browser event helper and run API checks.**

Make `trackConversion` send a `navigator.sendBeacon` payload when available, otherwise use `fetch` with `keepalive: true`. Ignore transport failures so conversion tracking cannot block quote submission.

Run:

```powershell
cd services/api; python -m pytest tests/test_conversions.py -q
cd ../..; npm test
npm run lint
npm run build
```

Expected: the API accepts only allowlisted non-PII event payloads; frontend build and tests pass.

- [ ] **Step 6: Commit attributable conversion data.**

```powershell
git add services/api/models.py services/api/schemas.py services/api/migrations.py services/api/routers/conversions.py services/api/routers/analytics.py services/api/routers/inquiries.py services/api/main.py services/api/tests/test_conversions.py apps/web/lib/conversion-events.ts
git commit -m "feat: record diyasi conversion events"
```

## Task 7: Consolidate Buyer Resources and Add Article-Level GEO Contracts

**Files:**
- Modify: `apps/web/app/blog/page.tsx`
- Modify: `apps/web/app/blog/[slug]/page.tsx`
- Modify: `apps/web/app/resources/page.tsx`
- Modify: `apps/web/app/resources/[slug]/page.tsx`
- Modify: `apps/web/lib/resource-articles.ts`
- Modify: `apps/web/app/llms.txt/route.ts`
- Create: `apps/web/tests/resources.test.ts`

- [ ] **Step 1: Write failing resource-system tests.**

Create `apps/web/tests/resources.test.ts`:

```ts
import { expect, test } from "vitest";
import { resourceArticles } from "@/lib/resource-articles";

test("every buyer resource has facts, FAQ, and a conversion route", () => {
  expect(resourceArticles.length).toBeGreaterThanOrEqual(10);
  for (const article of resourceArticles) {
    expect(article.title.length).toBeGreaterThan(35);
    expect(article.blocks.some((block) => block.type === "table")).toBe(true);
    expect(article.blocks.some((block) => block.type === "faqQuestion")).toBe(true);
    expect(article.blocks.some((block) => block.type === "cta")).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test and confirm it fails on missing structural fields.**

Run: `npm test -- --run tests/resources.test.ts`

Expected: FAIL for any article without the required visible fact table, FAQ, or CTA block.

- [ ] **Step 3: Normalize the resource data and render it as the Journal.**

Extend `ResourceArticle` with `updatedAt`, `englishPath`, and `projectRoute`. Add a visible `Updated` date to each detail page. Retain each existing slug and image path.

Change `/blog` to render the same curated `resourceArticles` feed as `/resources`, with a canonical URL of `/resources` and a visible link to `/resources`. Do not duplicate the article body at both paths. Existing API-authored blog routes remain accessible but are `noindex` until their content satisfies the same fact-table, FAQ, and CTA policy.

On `/resources/[slug]`, emit `Article`, `BreadcrumbList`, and `FAQPage` JSON-LD from visible content. The Article publisher and author are the factual organization. Do not create a named editor profile.

Add contextual links from every resource to one collection page, one capability page, and `/contact`; call `trackConversion("resource_to_quote")` when the CTA is used.

- [ ] **Step 4: Update `llms.txt` and verify resources.**

Add the resources hub, the low-MOQ route, each collection page, the Spanish homepage, and the Spanish factory/quality page to `llms.txt`. Keep factual MOQ boundaries and source limitations aligned with `moqRoutes`.

Run:

```powershell
npm test -- --run tests/resources.test.ts
npm run lint
npm run build
```

Expected: all resource records pass the buyer-guide contract; `/blog` no longer publishes an empty-Journal message; resource schema mirrors visible content.

- [ ] **Step 5: Commit the buyer-resource hub.**

```powershell
git add apps/web/app/blog apps/web/app/resources apps/web/lib/resource-articles.ts apps/web/app/llms.txt/route.ts apps/web/tests/resources.test.ts
git commit -m "feat: consolidate diyasi buyer resources"
```

## Task 8: Add Build and Production SEO Contract Verification

**Files:**
- Create: `apps/web/scripts/verify-seo.mjs`
- Modify: `package.json`
- Modify: `apps/web/package.json`
- Create: `apps/web/tests/seo-contract.test.ts`
- Create: `config/diyasi-protected-routes.json`

- [ ] **Step 1: Write a failing SEO verifier source test.**

Create `apps/web/tests/seo-contract.test.ts`:

```ts
import { expect, test } from "vitest";
import { protectedRoutes } from "@/lib/indexable-content";

test("protected routes cover every primary acquisition surface", () => {
  expect(protectedRoutes).toEqual(expect.arrayContaining([
    "/", "/products", "/oem-odm", "/factory", "/fabrics", "/packaging", "/resources", "/contact",
    "/es", "/es/minimo-pedido-ropa-interior", "/es/contacto"
  ]));
});
```

- [ ] **Step 2: Run the test and confirm it fails.**

Run: `npm test -- --run tests/seo-contract.test.ts`

Expected: FAIL because `protectedRoutes` does not yet exist.

- [ ] **Step 3: Add protected-route data and output verifier.**

Create `config/diyasi-protected-routes.json` with the exact core English, Spanish, collection, and resource paths from `indexable-content.ts`.

Export `protectedRoutes` from `indexable-content.ts` by reading the same list at build time. Create `apps/web/scripts/verify-seo.mjs` to:

1. Start `next start` only when `VERIFY_BASE_URL` is not provided.
2. Fetch each protected route and require `200`, exactly one H1, one title, an indexable robots meta tag, and a canonical under `SITE_ORIGIN`.
3. Parse every JSON-LD block with `JSON.parse` and reject `diyasiunderwear.com`, `vercel.app`, and localhost URLs.
4. Fetch `/sitemap.xml` and require every `protectedRoutes` path plus no duplicate or non-canonical host.
5. Fetch `/robots.txt` and `/llms.txt` and require the canonical sitemap URL and no legacy host.
6. For `/es` pages, require canonical `/es...` and an English plus Spanish `hreflang` pair.

Write a `.artifacts/diyasi-seo-verification.json` report containing base URL, commit SHA, checked routes, sitemap SHA-256, and timestamp. Add `.artifacts/` to `.gitignore`.

Add the root command only now that its target exists:

```json
"verify:seo": "node apps/web/scripts/verify-seo.mjs"
```

- [ ] **Step 4: Run local verifier and a negative test.**

Run:

```powershell
npm run build
npm run verify:seo
```

Temporarily replace the verifier base URL with `http://127.0.0.1:1` in the command invocation:

```powershell
$env:VERIFY_BASE_URL='http://127.0.0.1:1'; npm run verify:seo
```

Expected: the first command passes and writes a report; the second exits nonzero and removes any stale successful report. Clear `VERIFY_BASE_URL` afterward.

- [ ] **Step 5: Commit SEO verification.**

```powershell
git add apps/web/scripts/verify-seo.mjs apps/web/tests/seo-contract.test.ts apps/web/lib/indexable-content.ts config/diyasi-protected-routes.json package.json apps/web/package.json .gitignore
git commit -m "test: verify diyasi production SEO contract"
```

## Task 9: Add CI, Release Documentation, and GSC Measurement Controls

**Files:**
- Create: `.github/workflows/quality.yml`
- Create: `docs/seo/diyasi-search-console-monitoring.md`
- Create: `docs/seo/diyasi-content-governance.md`
- Modify: `.env.example`
- Modify: `README.md`
- Create: `apps/web/tests/release-docs.test.ts`

- [ ] **Step 1: Write failing release-documentation tests.**

Create `apps/web/tests/release-docs.test.ts`:

```ts
import { expect, test } from "vitest";
import { readFile } from "node:fs/promises";

test("release workflow gates the web quality contract", async () => {
  const workflow = await readFile("../../.github/workflows/quality.yml", "utf8");
  expect(workflow).toContain("npm ci");
  expect(workflow).toContain("npm run lint");
  expect(workflow).toContain("npm test");
  expect(workflow).toContain("npm run build");
  expect(workflow).toContain("npm run verify:seo");
});
```

- [ ] **Step 2: Run the test and confirm it fails.**

Run: `npm test -- --run tests/release-docs.test.ts`

Expected: FAIL because the quality workflow does not exist.

- [ ] **Step 3: Add the quality workflow.**

Create `.github/workflows/quality.yml`:

```yaml
name: Quality gate

on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - run: npm run verify:seo
```

- [ ] **Step 4: Add operational documentation.**

Create `docs/seo/diyasi-search-console-monitoring.md` with these sections and tables:

```markdown
# DIYASI Search Console Monitoring

## Day 0

Record property, sitemap submission date, canonical inspection state, page/query baseline, quote submissions, WhatsApp starts, and product inquiry starts.

## Day 7

Verify the deployed commit, sitemap fetch, `www` canonical redirect, homepage, collections, representative products, English resources, and Spanish core routes.

## Day 30

Compare qualified quote submissions, quote-start rate, WhatsApp-start rate, impressions, clicks, CTR, and average position for `/`, `/products`, `/resources`, `/es`, and `/es/minimo-pedido-ropa-interior`.

## Day 60

Inspect Spanish crawl and query data before adding more Spanish pages.

## Day 90

Expand content or representative SKUs only when crawl and qualified-inquiry evidence supports the decision.
```

Create `docs/seo/diyasi-content-governance.md` requiring a source, factual owner, last-reviewed date, buyer intent, English counterpart, Spanish counterpart if indexed, and a collection/capability/RFQ internal-link destination before any new page is published.

Add these frontend environment keys to `.env.example` and explain them in `README.md`:

```text
NEXT_PUBLIC_SITE_URL=https://www.yiwudiyasidress.com
NEXT_PUBLIC_BACKEND_URL=https://your-api.up.railway.app
```

- [ ] **Step 5: Run release checks.**

Run:

```powershell
npm test -- --run tests/release-docs.test.ts
npm run lint
npm test
npm run build
npm run verify:seo
```

Expected: all checks pass without an interactive prompt; the release workflow, content governance, and GSC monitoring documents exist.

- [ ] **Step 6: Commit release controls.**

```powershell
git add .github/workflows/quality.yml docs/seo/diyasi-search-console-monitoring.md docs/seo/diyasi-content-governance.md .env.example README.md apps/web/tests/release-docs.test.ts
git commit -m "ci: add diyasi release and measurement controls"
```

## Task 10: Final Audit, Production Release, and Discovery Submission

**Files:**
- Modify only if a verified defect is found during release checks
- Update: `docs/seo/diyasi-search-console-monitoring.md`

- [ ] **Step 1: Run the complete local release gate from a clean worktree.**

Run:

```powershell
git status --short
npm ci
npm run lint
npm test
npm run build
npm run verify:seo
```

Expected: no uncommitted implementation changes; every command exits 0; the SEO verification report names the canonical host and current commit.

- [ ] **Step 2: Review live prerequisite configuration before deployment.**

Confirm Vercel has:

```text
NEXT_PUBLIC_SITE_URL=https://www.yiwudiyasidress.com
NEXT_PUBLIC_BACKEND_URL=<production Railway API origin>
```

Confirm Railway has:

```text
FRONTEND_SITE_URL=https://www.yiwudiyasidress.com
BACKEND_CORS_ORIGINS=https://www.yiwudiyasidress.com
DATABASE_URL=<persistent production database URL>
```

Expected: no production secret is written to Git, and inquiry requests are accepted from only the canonical site.

- [ ] **Step 3: Merge, deploy, and verify production.**

Run:

```powershell
git switch main
git merge --ff-only feat/diyasi-balanced-seo-geo
git push origin main
vercel --prod --yes
$env:VERIFY_BASE_URL='https://www.yiwudiyasidress.com'; npm run verify:seo
```

Expected: the deployed report contains only the canonical host, protected route set, sitemap hash, and deployed commit SHA. If this command fails, stop before GSC or IndexNow submission and roll back through Vercel to the prior ready deployment.

- [ ] **Step 4: Submit discovery only after production verification.**

In Google Search Console, submit or refresh `https://www.yiwudiyasidress.com/sitemap.xml`. Inspect the homepage, `/products`, `/resources`, `/es`, `/es/minimo-pedido-ropa-interior`, and representative product pages. Request indexing only after each inspected URL reports the new canonical host.

If an IndexNow key is configured, submit only changed public paths after the fresh production verification report. A successful submission is recorded as a request, never as an indexing guarantee.

- [ ] **Step 5: Record release evidence and commit it.**

Append deployment URL, source commit, verification time, sitemap hash, IndexNow response if used, GSC sitemap submission time, and inspection state to `docs/seo/diyasi-search-console-monitoring.md`.

```powershell
git add docs/seo/diyasi-search-console-monitoring.md
git commit -m "docs: record diyasi SEO production rollout"
git push origin main
```

## Plan Self-Review Checklist

- [ ] Canonical host, Spanish routing, low-MOQ messaging, product curation, buyer resources, conversion paths, analytics, CI, deployment, GSC, and IndexNow each map to at least one task.
- [ ] Every new public claim derives from shared factual data or existing imported product data; no task asks for invented certification, testimonial, price, or delivery evidence.
- [ ] All product `Offer` schema and public paid-sample CTAs are removed until a verified direct-sale offer model exists.
- [ ] Every task has failing-test, implementation, verification, and commit steps where code behavior changes.
- [ ] The no-index policy prevents unreviewed imported SKU pages from competing with collection and representative-product pages.
