# DIYASI keyword implementation, 2026-10-24

The prior release e266bf0 handled homepage image priority, contrast, logo naming and the private-label service/guide split. It did not complete the broader keyword-to-page work. This release completes the on-site implementation using the existing DataForSEO US English research dated 2026-10-24, without additional API requests.

## Search intent and implementation

| Primary URL | Research themes | Implemented content |
| --- | --- | --- |
| `/` | underwear manufacturer; low MOQ procurement | Preserve the homepage title; add Yiwu sourcing guidance, qualified MOQ and links to catalogue, service, factory and quotation |
| `/products` | underwear manufacturer china; wholesale underwear manufacturers | Wholesale title/description, bulk-order scope, four real reference models with approval criteria and quotation CTA |
| `/oem-odm` | private label underwear; custom underwear manufacturers | Compare white-label, private-label customization, OEM and ODM briefs, required approvals and component minimums |
| `/products/seamless-underwear` | seamless underwear manufacturer | Laser-cut title/description; distinguish cut edges, bonding and knitted construction; compare DYS323, DYS314 and DYS322 |
| `/products/lace-underwear` | private label lingerie; lingerie manufacturers (secondary, limited to listed range) | Lace briefs/thongs scope; compare LS006, LS005-142 and LS005; separate body and lace composition |
| `/products/mens-underwear` | wholesale men's underwear; product destination supporting the guide | Compare M001, M004 and M005; separate body/pouch specifications and direct sample quotation |
| `/resources/mens-underwear-manufacturer-private-label` | mens underwear manufacturers | Buying-guide title/description, comparable quotation checklist, existing model evidence and service-page link |
| `/resources/seamless-vs-no-show-underwear` | seamless construction support | Clarify laser cutting, bonding and knitted construction without claiming an unsupported production route |

The existing logo/packaging guide remains an instructional page. No new near-duplicate keyword URLs were created. Retail gift-printing and unsupported geographic/manufacturing keywords were excluded.

## Related fixes

- Explicit descriptive link labels now take precedence over the keyword lookup, so editorial anchor text is preserved.
- Sitemap lastmod records the release date for changed core/collection pages. Article dates follow their actual content updates. URL membership remains unchanged at 145.
- Existing product catalogue, photographs, size charts, filtering, pagination, sample shortlist, comparison tools, quotation form, languages and structured data remain available.
- Quotation code records quote_submitted only after a saved result with a reference ID. Browser checks of the shortlist do not establish delivery to the team's inbox.

## Pre-release validation

- Production build and TypeScript passed.
- 81 existing tests passed; lint reported zero errors and eight pre-existing warnings in untouched files.
- Eight changed routes returned HTTP 200 from the production build, with one H1, self canonical, no accidental noindex, valid article data where relevant, and expected lastmod.
- Product/resource links on those routes resolve to sitemap members. Filtered catalogue URLs retain noindex; selection tables do not repeat on page 2.

## Remaining account-level work

GSC/Bing indexing and manual-action status, actual email receipt, external-link source verification and outreach are not proved by this release. No disavow, outreach message, paid placement or recurring task was created. Search visibility and effective enquiries need subsequent measurement; deployment is not evidence of ranking growth.

Rollback reference: production deployment dpl_EQrTXRhSYQJdFxxFDA6W5aiPGcB9, commit e266bf04cd6a0943da033e1b8f0f6b82504726ce.
