# Public evidence for three lead DIYASI models — 2026-09-27

Fresh HTTP 200 reads of both DIYASI-operated product sites and visual inspection of the source size-chart images. These are catalogue claims and references, **not** a dated quotation, approved tech pack, independent laboratory result or proof of today's stock. The two sites are related sources, not independent corroboration.

| Model | Facts consistent across the two product pages | Differences or limits | Public page action |
| --- | --- | --- | --- |
| DYS201 | 95% cotton / 5% spandex; S–XL; 120 pcs catalogue MOQ with mixed sizes and colors listed; heat-transfer, screen-print, silicone-gel and embroidery methods named. | Underwear page lists 11 stock colors; Apparel page lists 13. Neither provides a dated swatch card, sample fee or finished-garment measurement sheet. | Removed the exact stock-color count from the collection catalogue; show the discrepancy and quote boundary on its page. |
| DYS323 | 80% polyamide / 20% spandex body, 100% cotton gusset; S–XL; 5 listed stock colors; 120 pcs catalogue MOQ with mixed sizes and colors listed. | No test method or result proves bond durability. Generic delivery and performance claims are not order-specific. | Show the sourced MOQ/mix with an explicit bonded-gusset evidence limit. |
| M005 | S–3XL, 13 listed stock colors, modal pouch component; 120 pcs catalogue MOQ with mixed sizes and colors listed. | Underwear describes recycled polyester/spandex, Apparel polyester/spandex. Neither gives exact component percentages, recycled-content records, or a defined 5-inch-inseam measurement method. | Show the composition conflict and require an order-specific specification. |

Manufacturer chart transcriptions now appear as crawlable tables on the three product pages, next to the original images. DYS201 and DYS323 images each label wearer **waist/hip**, S 68–72/91–95 cm, M 73–77/96–100, L 78–82/101–105, XL 83–87/106–110. The M005 image labels **waist/length**, S 70–75/32.5 cm, M 80–85/33.6, L 90–95/34.7, XL 100–105/35.8, 2XL 110–115/36.9, 3XL 120–125/38. It does not define the “length” measurement; do not call these values a 5-inch inseam. None of the three images supplies finished-garment tolerances.

The pages also carry generic 5–7-day sample and 10–30 or 15–30-day bulk claims. Those ranges were not promoted to a guaranteed schedule because order type and approval start dates are unspecified, and one page contains two different bulk ranges. Public sample charges and courier terms were not found. The current collection site therefore continues to ask for a written, dated quote.

Sources:

- DYS201: https://www.diyasiunderwear.com/ladies-low-waist-cotton-bikini-panties-breathable-briefs-custom-logo-support and https://diyasiapparel.com/product/wholesale-ladies-low-waist-cotton-bikini-panties-soft-breathable-women-s-briefs-diyasi-apparel/
- DYS323: https://www.diyasiunderwear.com/laser-cut-brazilian-seamless-panties-oem--one-piece-bonded-gusset-underwear-manufacturer and https://diyasiapparel.com/product/laser-cut-brazilian-seamless-panties-oem-one-piece-bonded-gusset-underwear-manufacturer/
- M005: https://www.diyasiunderwear.com/factory-direct-wholesale-custom-recycled-polyester-mens-boxer-briefs---5-inseam-underwear and https://diyasiapparel.com/product/factory-direct-wholesale-custom-recycled-polyester-men-s-boxer-briefs-5-inseam-underwear/

Still unavailable from these public sources: legal registration evidence, current per-color availability, sample charge, exact approved customization-component MOQ, signed specification, finished measurements/tolerances, order-specific delivery schedule, and dated inspection or test records. An initial connected Gmail/Drive request hit a transport error; the focused retry completed and found no messages matching DYS201/DYS323/M005 and no Drive file named DIYASI or DYS201. The broader Drive result set contained unrelated underwear content, not a DIYASI quotation or specification.

## Release and checks

- Published to Vercel production as `dpl_FdX2QGakKeGoSsVL845Ye7d4kBUy` on 2026-09-27 11:09 CST. `vercel inspect` reports Ready with both official domains aliased.
- All three official product URLs returned HTTP 200 with their own canonical URLs, two visible company-source links, the updated review date, and transcribed chart tables (4, 4 and 6 rows). DYS201's spec now says to confirm the current stock palette. The browser-expanded DYS201 chart exposed the correct S–XL values and original chart link.
- The first automated live check falsely returned zero table rows because its BeautifulSoup selector treated `caption` as an HTML attribute. A corrected `.d-source-size-reference table` selector verified the actual rows on all three pages; this was a check-script error, not a page failure.
- 75/75 Vitest tests, changed-file ESLint, Python compilation, local and remote production builds and TypeScript passed. IndexNow received the three updated product URLs with HTTP 200 at 2026-09-27 03:12 UTC; acceptance is not search indexing. No new Google priority-index request was made.
