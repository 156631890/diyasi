# DIYASI Balanced SEO, GEO, and Conversion Growth Design

## Status

Proposed design approved by the site owner on 2026-07-11. This document defines the implementation boundary for `www.yiwudiyasidress.com` before code or content changes begin.

## Objective

Make `https://www.yiwudiyasidress.com` the clear, crawlable B2B acquisition site for low-MOQ private-label underwear programs. The primary business result is more qualified quote-form and WhatsApp conversations from startup brands, retailers, and wholesale buyers in North America, Europe, and Spanish-speaking Latin America.

SEO, GEO, and conversion work support that outcome. The project does not promise rankings, indexing speed, AI citations, backlinks, or sales.

## Confirmed Decisions

| Decision | Chosen direction |
| --- | --- |
| Canonical site | `https://www.yiwudiyasidress.com` |
| Existing `www.diyasiunderwear.com` site | Not controlled; no migration or redirect claim may be made |
| Priority buyers | Startup DTC brands first; retailers and wholesalers are supported by product, factory, and quality pages |
| Priority markets | North America and Europe in English; Spanish-speaking Latin America receives a dedicated Spanish acquisition layer |
| Conversion model | Detailed quote form is primary; WhatsApp is a contextual secondary route |
| Commercial focus | Low-MOQ ready-stock and mature styles lead the offer |
| Success metric | Qualified inquiries, supported by search visibility and crawl health |

## Current-State Findings

- The repository deploys the current Next.js site to `www.yiwudiyasidress.com`; `diyasi.vercel.app` returns 404 and is not a public destination.
- The uncontrolled `www.diyasiunderwear.com` site is a separate, older website with different pages and URL structure.
- The new site exposes roughly 300 catalog items, but the live sitemap contained 46 URLs during the audit. Product URL inclusion must not depend on a runtime API response.
- The catalog has repeated or near-repeated product names. Indexing every SKU would create keyword cannibalization and duplicate-content risk.
- The public Journal says articles are pending, while the repository contains ten buyer-resource articles. Existing resource content must become a visible acquisition surface.
- English, Chinese, and Spanish currently use a same-URL language switch. That is not a search-indexable multilingual architecture.
- Public MOQ values differ by surface. Low-MOQ ready-stock, private-label, custom-color, and full-OEM routes must be presented as separate commercial paths.
- `next lint` has no configured ESLint setup and blocks unattended quality checks. The installed Next.js dependency has high-severity audit findings that require a planned framework migration rather than `npm audit fix --force`.

## Information Architecture

### Core acquisition hierarchy

1. Homepage: low-MOQ private-label underwear positioning and project-path selection.
2. Collection pages: buyer-intent category hubs for women’s panties, seamless underwear, bras, shapewear, men’s underwear, period underwear, activewear, and loungewear.
3. Representative product pages: proof of concrete materials, construction, imagery, customization options, and inquiry context.
4. Capability pages: private label, factory and quality, fabrics, packaging, sustainability, and about.
5. Buyer Resources: sourcing, MOQ, product-development, quality-control, and launch-planning guidance.
6. Contact: two-stage RFQ form and contextual WhatsApp handoff.

### Product indexing policy

- All eight collection pages are indexable and are core sitemap entries.
- Only 30-50 reviewed representative SKUs may become indexable product-detail pages in the first release.
- An indexable SKU needs a unique buyer-intent title, unique product copy, actual media, material or construction detail, its applicable MOQ route, customization information, and internal links to its collection and RFQ path.
- Remaining catalog records remain searchable for buyers but do not become independent SEO landing pages until they meet the same uniqueness standard.
- The sitemap is generated from an explicit approved-content manifest, not from the availability of the backend API at request time.

## Canonical and Multilingual Architecture

### Host policy

- `https://www.yiwudiyasidress.com` is the sole canonical origin for metadata, sitemap, robots, Open Graph, JSON-LD, RSS, `llms.txt`, and internal URLs.
- The controllable non-`www` host permanently redirects to the canonical `www` host while preserving paths and queries where appropriate.
- The uncontrolled legacy domain is never named as an alternate, canonical, or migration target.

### Language policy

| Locale | Path pattern | Indexing role |
| --- | --- | --- |
| English | `/...` | Primary acquisition market for North America, the UK, and Europe |
| Spanish | `/es/...` | Dedicated Latin American acquisition market |
| Chinese | `/zh/...` | Communication support; index only after complete human-reviewed content is available |

- English and Spanish use separate server-rendered, crawlable URLs with localized titles, descriptions, headings, body copy, schema descriptions, and calls to action.
- Every localized page has a self-canonical and precise `hreflang` links to its actual equivalents, including `x-default` to English.
- Client-only language switching is not used as the SEO mechanism.

## Homepage and Conversion Design

### Homepage promise

The first viewport positions DIYASI as a low-MOQ private-label underwear supplier for startup brands, retailers, and wholesale buyers. It uses one primary action, `Explore Low-MOQ Options`, and one secondary action, `WhatsApp a Factory Specialist`.

The homepage presents these sections in order:

1. Low-MOQ private-label promise with one clear CTA pair.
2. Project-path selector: mature or ready-stock style, private label, or full OEM.
3. Buyer segment support for new brands, growing brands, retailers, and wholesalers.
4. Launch-ready collection links.
5. Customization and retail-readiness details.
6. A practical quote-development process.
7. Factory and QC evidence based only on current, reviewable facts and real media.
8. Product examples that link to reviewed representative pages.
9. Buyer FAQs, MOQ-route explanation, and final RFQ CTA.

### MOQ presentation

The site uses one shared commercial-route data source. It distinguishes:

- Ready-stock or mature-style low MOQ.
- Private-label label or waistband MOQ.
- Custom-color MOQ.
- Full OEM MOQ.

Pages must state the applicable route rather than treating product-level source quantities, ready-stock quantities, and full-OEM quantities as interchangeable.

### RFQ and WhatsApp flow

The RFQ flow is two stages:

1. Buyer role, product category, project route, estimated quantity, and target market.
2. Fabric or color direction, logo or packaging needs, timing, contact details, and free-form project notes.

WhatsApp remains visible as a quick path. Its prefilled message includes the current page or product, selected project route, and a short instruction set, avoiding blank conversations.

The site records `low_moq_route_selected`, `quote_started`, `quote_submitted`, `whatsapp_started`, `product_inquiry_started`, and `resource_to_quote` events. Event instrumentation does not store form contents in public analytics.

## Buyer Resources, Content, and GEO

### Content positioning

`/resources` is the public buyer-education hub. `/blog` is retained for URL compatibility but becomes a visible, curated entry to the same editorial system rather than an empty Journal.

The initial topic clusters are:

| Cluster | Buyer question | Commercial destination |
| --- | --- | --- |
| Low MOQ launch | How can a new brand start with a small order? | Low-MOQ project path and RFQ |
| Women’s and seamless underwear | Which style and construction fit the brand? | Women’s and seamless collection pages |
| Men’s underwear | How do modal, waistband, and packaging choices work? | Men’s underwear collection |
| Private label | How do labels, logos, and packaging affect MOQ? | Private-label capability page |
| Fabrics | How should cotton, modal, nylon, and seamless yarn be compared? | Fabrics page |
| Quality and timing | How should sampling, QC, and production risk be managed? | Factory and quality page |
| Packaging | What packaging route fits retail and ecommerce? | Packaging page |

Each resource follows this structure: answer-first lead, fact box, decision matrix, risks and boundaries, related product or capability links, buyer FAQ, and RFQ CTA.

### Spanish first release

The first indexed Spanish release includes these routes:

- `/es/`
- `/es/productos/ropa-interior-marca-privada`
- `/es/minimo-pedido-ropa-interior`
- `/es/ropa-interior-sin-costuras`
- `/es/fabricante-ropa-interior-china`
- `/es/empaque-personalizado`
- `/es/fabrica-y-control-de-calidad`
- `/es/contacto`

Spanish pages are written for sourcing questions in Spanish, not mechanically translated keyword copies.

### GEO and factual boundaries

Pages clearly express the relationship between DIYASI, Yiwu, Zhejiang, China, low-MOQ underwear development, private labeling, sampling, packaging, quality control, and delivery planning. Structured data and `llms.txt` use the same factual entities.

The site does not invent testimonials, certifications, certificate numbers, delivery promises, prices, MOQ promises, or customer logos. Certificates are described as documents available for buyer review only when the current evidence supports that claim.

## Structured Data

- Site-wide `Organization` and `WebSite` nodes share the canonical domain and factual organization identity.
- Collection and capability pages use `WebPage`, `BreadcrumbList`, and `FAQPage` only where visible FAQs are present.
- Reviewed representative SKUs use `Product` with accurate identifier, image, material, category, and visible product facts. `Offer` fields are used only where price, currency, availability, and sales conditions are genuinely current.
- Resources use `Article` or `TechArticle` with visible publication and update dates, editorial identity, images, and source boundaries.
- Schema is validated against rendered content and does not include old-domain or preview-host URLs.

## Technical Quality and Release Controls

- Configure ESLint for non-interactive local and CI execution.
- Add focused tests for canonical host policy, `hreflang`, sitemap manifest, robots exclusions, schema parsing, product-title uniqueness, content visibility, MOQ-route consistency, and inquiry-event contracts.
- Upgrade Next.js through a dedicated compatibility path to a patched supported release. Do not use a breaking automated audit fix without tests, build validation, and deployment review.
- Preserve current production behavior while migrating package versions. Payment and backend API behavior are out of scope unless the audit identifies a direct conversion-blocking defect.
- CI runs install, lint, tests, production build, and rendered SEO contract checks before deployment.
- Production verification checks the canonical host, redirects, critical response codes, sitemap set, indexability, schema, key conversion routes, and no preview-host leakage before IndexNow submission.

## Measurement and Rollout

### Day 0

Record GSC index coverage, query/page performance, sitemap status, and canonical selection. Record existing RFQ and WhatsApp baseline events before comparing results.

### Day 7

Verify production deployment identity, canonical redirects, sitemap fetches, key page crawl state, form and WhatsApp events, and any IndexNow response.

### Day 30

Compare homepage, low-MOQ collection pages, representative product pages, and resources by qualified inquiry rate, quote-start rate, quote-submit rate, WhatsApp-start rate, impressions, clicks, CTR, and average position.

### Day 60

Release and inspect the Spanish core pages, then assess Spanish query coverage, crawl state, and inquiry quality before expanding translation scope.

### Day 90

Expand clusters that create qualified inquiries. Consolidate, improve, or keep out of the index any product pages that do not earn relevant visibility or buyer engagement.

Numeric targets are defined only after the Day 0 baseline is recorded. The initial acceptance criteria are crawl health, canonical correctness, fact consistency, non-duplicative indexable surfaces, working conversion events, and traceable measurement.

## Non-Goals

- Migrating or redirecting the uncontrolled `www.diyasiunderwear.com` site.
- Bulk-generating low-quality SEO pages or translations.
- Fabricating reviews, certifications, citations, orders, or customer endorsements.
- Promising rankings, traffic, backlinks, AI citations, or sales.
- Rewriting the entire CRM, payment, or backend system without a verified blocker.

## Acceptance Criteria

- All canonical, sitemap, schema, Open Graph, RSS, and `llms.txt` URLs use `https://www.yiwudiyasidress.com`.
- English and Spanish have distinct, crawlable routes with correct self-canonicals and reciprocal `hreflang` links.
- Sitemap entries derive from an explicit manifest and include only approved indexable pages.
- Indexable product pages have unique titles and verified buyer-facing details.
- All public MOQ statements resolve to the correct commercial path.
- Homepage, collection pages, product pages, and resources route visitors into the RFQ or contextual WhatsApp flow.
- Lint, tests, production build, SEO contract verification, production verification, and measurement documentation pass before release.
- GSC and IndexNow submissions are recorded as requests, not as guarantees of indexing.
