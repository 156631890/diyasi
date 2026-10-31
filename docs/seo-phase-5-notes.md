# Phase 5 — repeatable HTTP checks

These scripts use Node's built-in APIs and add no npm dependency. They inspect the actual HTML served by the selected build, not strings in source files. Run the production build and start it before using the scripts.

```powershell
$env:BASE_URL = 'http://localhost:3131'
node scripts/check-jsonld.mjs
node scripts/check-internal-links.mjs
```

Defaults: `BASE_URL=http://localhost:3131`, five concurrent requests, a 30-second timeout per request, at most 4,000 public URLs and 100 sitemap XML files. Optional environment variables: `SEO_CONCURRENCY`, `SEO_MAX_PAGES`, `SEO_REPORT_DIR`. A reached cap fails the audit instead of claiming complete coverage.

Reports are written to `docs/seo-growth-20261031/jsonld.json` and `docs/seo-growth-20261031/internal-links.json`. A nonzero exit code means a failed check or an incomplete run. Merely adding these scripts is not a successful validation run.

## Coverage

- Read the sitemap index recursively; extract only page `<url><loc>` entries, never image URLs. Sitemap duplicates, query URLs and foreign origins fail.
- Fetch canonical-origin paths against `BASE_URL`, keeping production canonical/hreflang values intact. Inspect public links from the sitemap and recursively discovered HTML. Exclude admin, API, payment and checkout workflows; do not submit forms. Asset URLs linked by anchors receive a separate HEAD check and do not enter the HTML graph; this is not an image-loading audit.
- Report failed public URLs, redirect chains and direct-200/self-canonical/noindex eligibility of sitemap entries.
- Count distinct canonical referring pages for each of the 12 English manufacturer pages. Require at least five incoming pages and no more than two clicks from `/`. Self links do not count.
- Validate reciprocal, identical hreflang groups, `x-default`, direct-200 targets and each alternate's self canonical.
- Parse every JSON-LD block with `JSON.parse`; inspect FAQ question and answer strings against exact visible HTML text units after entity decoding and whitespace normalization. Script, style, template, explicitly hidden and `aria-hidden` content is excluded. FAQ text inside expandable `<details>` remains inspectable.
- Require Organization, Service, FAQPage and BreadcrumbList on manufacturer pages, four questions per page, article/breadcrumb markup on article routes and Product/breadcrumb markup on product details identified by ItemPage.
- Reject Product Offer/AggregateOffer/AggregateRating. Track local `@id` definitions and references, rejecting conflicting identities and unresolved local entity IDs. Repeated references to the same Organization ID across different pages are correct and are allowed.

## Interpretation

This is an HTTP/source-HTML check. It does not execute browser JavaScript, measure Core Web Vitals, prove facts, certify Google rich-result eligibility, check external links, or prove Google indexing. Browser verification and the three requested manual Rich Results Test samples remain distinct checks.

Next.js `permanent: true` redirects use HTTP 308. Where the task explicitly requires HTTP 301, use a supported `statusCode: 301` configuration instead of asserting that 308 is 301.

Validation at script delivery: both `node --check` commands passed. An isolated local HTTP fixture passed both scripts with 12 manufacturer pages and one product; malformed JSON, FAQ answers hidden from visible HTML and a broken internal link were each correctly rejected with exit code 1. These are script behavior checks, not website acceptance. Full site checks must run against the final build after all phase changes. The final report must record the actual command, build commit and outcomes.

## URL and date changes prepared for Phase 5

- `canonicalUrl` now removes trailing pathname slashes, including the origin-only root representation. Query strings and fragments are retained where deliberately provided; this helper does not silently discard them.
- `ORGANIZATION_ID` and `WEBSITE_ID` remain `https://www.yiwudiyasidress.com/#organization` and `https://www.yiwudiyasidress.com/#website`. Layout definitions use those stable constants. Other schema references must use the same identifiers; changing a page URL policy must not fork the entity graph.
- `next.config.mjs` explicitly uses `trailingSlash: false` and preserves the three requested HTTP 301 article migrations.
- Sitemap generation still uses the existing `app/sitemap.ts` and content registry. Product entries now preserve `indexableProducts.reviewedAt`, which already selects the later of the model's `reviewed_at` and `seo_updated_at`. The former final mapping overwrote that with a global keyword date.
- Existing static-page historical dates are retained explicitly, instead of looking up membership in a changing keyword map. No build-time timestamp or blanket current date was introduced. Resource and News dates still come directly from each content object; manufacturer entries added by Phase 2 remain intact.
- The old `site-config` test expecting a trailing slash on the homepage must be updated with the intentional new behavior. The lead agent owns final tests and build.
- `robots.ts` was not changed: the existing private-path exclusions and static asset allowance are preserved.

The link audit additionally enforces the exact canonical host and no-trailing-slash spelling in Sitemap entries and page canonical tags. A root URL with `/` is URL-equivalent in HTTP terms but will be reported as a policy mismatch, not described as a separate Google indexing defect.
