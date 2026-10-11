# DIYASI Dress buyer tools, 11 October 2026

Target: https://www.yiwudiyasidress.com, Vercel project diyasi-web (prj_WHM0RY5r9cDsgN05Jm35LwqUpLRs). Do not deploy the separate diyasi project. Goal: qualified underwear wholesale/private-label sample enquiries.

## Production source reconciliation

The October 8 production CLI deployment `dpl_CaxtA5WJQmSP9hsWgzT4iWB36zPo` was inspected through the authenticated Vercel Source interface on October 11. All 148 displayed application/configuration source files were read; the generated TypeScript build cache was excluded. No application source files from the September Git base were missing from that production tree. Vercel's Copy action strips final newlines and Unicode BOMs; those formatting differences were normalized before comparison.

The recovered production version has 135 keyword-page configurations, 24 resource articles and 46 news articles. Its substantive source changes and three production WOFF2 fonts are restored before the buyer-tools commit. All 333 literal media references already exist in the checkout. The existing production quotation guide was preserved and received only the new planning section and modification date. The original source blocker is resolved; release and live verification are tracked below.

## Public research

Checked 11 October using free public search and first-party pages. Competitor claims are not independently verified and are not copied into DIYASI.

| Source | Observed feature/content | Decision |
| --- | --- | --- |
| https://www.zonaseamless.com/seamless-intimates/seamless-underwear-sets/ | Organises development by yarn, construction, branding and packaging; requests tech packs or references | Make the sample brief concrete per model and size/color allocation; do not inherit its knitting or performance claims |
| https://seamlessunderwearfactory.com/seamless-panties | Displays style, composition, sizes, MOQ and sample/bulk distinctions | Keep comparable fields together; preserve DIYASI model-specific conditions. Its page has conflicting MOQ claims, illustrating why not to copy a headline number |
| https://www.smlintimate.com/products/seamless-ribbed-bikini-brief | Search snippet asks for reference, size chart, colors, quantity and branding; full page timed out | Secondary evidence for brief completeness, not a verified UI review |
| https://apparitex.com/seamless-underwear-manufacturer/ | Search discovery identifies OEM/private-label category; full page unavailable | Discovery only, not implementation evidence |

Existing DIYASI has sample lists and four-style comparison. This change adds differences-only comparison and complete comparison CSV; a bilingual temporary size/color planning draft with full sample-list CSV (up to existing 20-style limit); and a useful section in the existing quotation guide. The planner does not claim availability or automatically approve MOQ. Planning notes are explicitly not auto-transferred to the form. Download and send the brief with a normal email/chat request.

## Keyword-to-page hypotheses

No current search volume, traffic, rank or conversion uplift was measured. These are buying-intent candidates from public results and real site topics, not “proven traffic” terms. No paid tools or keyword-credit actions used.

| Cluster | Existing primary page | Improvement |
| --- | --- | --- |
| private label underwear manufacturer; low MOQ underwear manufacturer | /oem-odm | Preserve existing buying routes and terms; sample-list tool supports next step |
| underwear manufacturing quote; underwear quotation brief; underwear size color allocation sheet | /resources/accurate-underwear-yoga-wear-manufacturing-quote | Add working sample-brief preparation explanation |
| seamless panties wholesale; seamless underwear manufacturer; no-show panties supplier | /products/seamless | Keep real construction/materials; comparison differentiates catalogued styles |
| cotton underwear wholesale; cotton spandex underwear manufacturer | /products/cotton-underwear | Existing factual category; export selected reference models |
| underwear sample request; underwear sample checklist | /resources/underwear-sampling-costs-lead-times-packaging | Preserve sample conditions; full-list CSV supports team handoff |
| underwear MOQ; mixed sizes colors MOQ underwear; private label underwear MOQ | /resources/private-label-underwear-moq-guide | Keep model/component-specific terms; planning totals do not certify MOQ eligibility |
| ropa interior marca privada; muestras ropa interior; reparto tallas colores | Existing Spanish contact flow | Spanish planner labels, quantity validation and no-send status |

## Validation and preservation

- 81 tests pass, including 3 new CSV/quantity tests; TypeScript, changed-file ESLint and fresh Next production build pass.
- Existing 45 product records untouched. No source assets, styles, collection links, existing form fields or backend storage removed.
- No dependencies, credentials, payment behavior, notification setup or server submission code changed.
- React review: local component state, shared typed CSV functions, labelled inputs, invalid quantity feedback, native checkbox, scrollable comparison, mobile form stacking.
- Tests and live verification must be repeated against the reconciled production source before marking the release complete.
- REA deep process analysis was unavailable in this environment earlier. Public pages informed an original implementation; no REA runtime or competitor source added to the site.
