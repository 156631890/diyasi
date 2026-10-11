# DIYASI Dress buyer tools, 11 October 2026

Target: https://www.yiwudiyasidress.com, Vercel project diyasi-web (prj_WHM0RY5r9cDsgN05Jm35LwqUpLRs). Do not deploy the separate diyasi project. Goal: qualified underwear wholesale/private-label sample enquiries.

## Release constraint

The production domain currently resolves to CLI deployment dpl_CaxtA5WJQmSP9hsWgzT4iWB36zPo (8 October). It exposes no Git SHA. GitHub main is an older design. The latest redesign branch is feat/diyasi-redesign-20260917 at 8c5a5957aa4c1be4b9ad22388e31fe39bf52014b (27 September).

The production source tree contains five data files versus three in this checkout. Its file-list connector truncates the nested source tree. Package and Next config retrieved through the connector match the redesign content, but that does not establish whole-source equality. Browser access to deployment Source requires Vercel login. Personal-context and Library checks did not locate an authoritative October source archive. **Do not replace production with this September snapshot.** This PR is a tested implementation to rebase onto the actual production source, not a completed release.

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
- Desktop/mobile live interaction remains pending accurate-source reconciliation and release; do not mark this draft as live.
- REA deep process analysis was unavailable in this environment earlier. Public pages informed an original implementation; no REA runtime or competitor source added to the site.
