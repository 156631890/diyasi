import pages from "@/data/keyword-pages.json";

export type ContentLink = { label: string; href: string };

// Text-only relationships: routes, catalogue selection and inquiry behavior
// remain in their existing modules.
const keywords = new Map(pages.map((page) => [page.path, page.keyword]));
export function keywordLink(href: string, fallback?: string): ContentLink {
  return { href, label: keywords.get(href) ?? fallback ?? href };
}
const resource = (slug: string) => `/resources/${slug}`;
const collection = (slug: string) => `/products/${slug}`;
const product = (slug: string) => `/products/${slug}`;

export const newResourceLinks: Record<string, ContentLink[]> = {
  "120-pcs-moq-underwear-manufacturer": [resource("private-label-underwear-moq-guide"), resource("underwear-manufacturer-for-startup-brands"), "/oem-odm", product("low-rise-cotton-bikini-brief-dys201")].map((href) => keywordLink(href)),
  "private-label-underwear-manufacturer": ["/oem-odm", "/packaging", resource("custom-waistband-underwear-manufacturer"), product("lace-trim-cotton-brazilian-brief-ls006")].map((href) => keywordLink(href)),
  "custom-waistband-underwear-manufacturer": [resource("waistband-customization-mens-boxer-briefs-private-label"), collection("mens-boxer-briefs"), "/packaging", product("mens-5-inch-modal-pouch-boxer-m005")].map((href) => keywordLink(href)),
  "laser-cut-underwear-manufacturer": [collection("seamless-underwear"), resource("seamless-vs-no-show-underwear"), "/factory", product("bonded-brazilian-seamless-brief-dys323")].map((href) => keywordLink(href)),
  "underwear-manufacturer-for-startup-brands": [resource("120-pcs-moq-underwear-manufacturer"), resource("private-label-underwear-manufacturer"), resource("accurate-underwear-yoga-wear-manufacturing-quote"), product("essential-cotton-thong-dys224")].map((href) => keywordLink(href)),
  "underwear-sampling-lead-time-guide": [resource("underwear-sampling-costs-lead-times-packaging"), resource("accurate-underwear-yoga-wear-manufacturing-quote"), "/factory", product("mens-5-inch-modal-pouch-boxer-m005")].map((href) => keywordLink(href)),
  "mens-underwear-manufacturer-private-label": [collection("mens-underwear"), collection("mens-boxer-briefs"), resource("custom-waistband-underwear-manufacturer"), product("mens-tagless-low-rise-brief-m001")].map((href) => keywordLink(href)),
  "yiwu-underwear-manufacturer": ["/about", "/factory", "/products", resource("120-pcs-moq-underwear-manufacturer"), product("low-rise-cotton-bikini-brief-dys201")].map((href) => keywordLink(href)),
  "high-waisted-briefs-manufacturer": [collection("high-waist"), collection("cotton-underwear"), resource("us-eu-underwear-size-labeling-preparation-startup-brands"), product("high-leg-cotton-high-waist-brief-dys219")].map((href) => keywordLink(href)),
  "bikini-vs-brazilian-underwear": [collection("womens-panties"), resource("cotton-vs-seamless-underwear-buyers-guide"), "/news/bikini-vs-brazilian-underwear-buying-notes", product("lace-trim-cotton-brazilian-brief-ls006")].map((href) => keywordLink(href)),
  "seamless-vs-no-show-underwear": [collection("seamless-underwear"), resource("traceless-vs-seamless-underwear-yoga-brands"), resource("laser-cut-underwear-manufacturer"), product("seamless-high-waist-full-brief-dys314")].map((href) => keywordLink(href)),
  "cotton-vs-seamless-underwear-buyers-guide": ["/fabrics", collection("cotton-underwear"), collection("seamless-underwear"), resource("gusset-construction-womens-underwear-comfort-qc"), product("low-rise-cotton-bikini-brief-dys201")].map((href) => keywordLink(href)),
};

export const collectionKeywordGuides: Record<string, { heading: string; links: ContentLink[]; faq: string[][] }> = {
  "womens-panties": {
    heading: "Bikini panties manufacturer OEM: compare coverage before sampling",
    links: [resource("bikini-vs-brazilian-underwear"), resource("underwear-manufacturer-for-startup-brands")].map((href) => keywordLink(href)),
    faq: [["How do I compare bikini vs boyshort vs brief?", "Compare front/back coverage, rise, side width and leg length in the same intended size. Record differences in fabric and waistband so they are not mistaken for silhouette differences."], ["What should an underwear manufacturer for boutiques receive?", "Send the model shortlist, intended wearer, market, size/color allocation and branding brief. Catalogue MOQ is 120 pieces per style; mixed sizes and colors need order confirmation."]],
  },
  "cotton-underwear": {
    heading: "Cotton briefs manufacturer and cotton hipster manufacturer: specify the fit",
    links: [resource("cotton-vs-seamless-underwear-buyers-guide"), resource("high-waisted-briefs-manufacturer")].map((href) => keywordLink(href)),
    faq: [["Are these cotton styles 100% cotton?", "The current cotton body specifications list 95% cotton and 5% spandex. Confirm the component specification and label for the actual order; cotton-rich does not mean all-cotton."], ["How should a cotton hipster manufacturer brief define the fit?", "Specify front/back rise, side width, coverage, leg openings and finished measurements. Choose a reference model with the team; a silhouette name does not establish the pattern."], ["How do I compare everyday cotton underwear manufacturer options?", "Compare actual fabric composition, sample fit, elastic recovery and the agreed care review. Keep model and component differences visible in the brief."]],
  },
  "cotton-thongs": {
    heading: "Thong underwear manufacturer OEM: cotton back width and rise",
    links: [resource("bikini-vs-brazilian-underwear"), resource("120-pcs-moq-underwear-manufacturer")].map((href) => keywordLink(href)),
    faq: [["How do I distinguish a thong, tanga and string fit?", "Compare measured back-panel width, side coverage and rise on the selected sample. The tanga and string names should be supported by the actual pattern."], ["Can I mix sizes and colors in a cotton thong order?", "Catalogue MOQ is 120 pieces per style. Propose the allocation and confirm availability, branding and component requirements for that model."]],
  },
  "lace-underwear": {
    heading: "Lace underwear manufacturer private label: approve body and trim",
    links: [resource("private-label-underwear-manufacturer"), resource("bikini-vs-brazilian-underwear")].map((href) => keywordLink(href)),
    faq: [["Can I select a lace boyshort manufacturer from these models?", "The current lace examples are Brazilian briefs, a V-waist brief and a thong. No lace boyshort is listed here; ask the team to review a separate development brief if required."], ["How should lace composition appear in a private-label brief?", "State body and lace blends separately. The listed LS006 and LS005 family uses a cotton-spandex body and a separate polyamide-spandex lace component; confirm the final order label."]],
  },
  "seamless-underwear": {
    heading: "Seamless panties manufacturer OEM: bonded and sewn gussets",
    links: [resource("laser-cut-underwear-manufacturer"), resource("seamless-vs-no-show-underwear")].map((href) => keywordLink(href)),
    faq: [["What is the difference in seamless vs no-show underwear?", "Seamless describes aspects of construction; no-show describes an intended outcome beneath clothing. Check the actual edge, gusset, size and outer garment combination."], ["What should I check when selecting a seamless thong manufacturer?", "Review back width, front/back rise, gusset placement and attachment stability. Confirm the model’s construction and try the intended size before approving branding."]],
  },
  thongs: {
    heading: "Seamless thong manufacturer and cotton alternatives: compare construction",
    links: [resource("laser-cut-underwear-manufacturer"), resource("bikini-vs-brazilian-underwear")].map((href) => keywordLink(href)),
    faq: [["Can the same thong brief cover cotton, lace and seamless materials?", "Use separate component and construction specifications for each model. Coverage names do not establish identical fabric, gusset attachment or waistband behavior."], ["How do I approve minimal back coverage?", "Measure the back width and rise, check positioning and gusset placement, then review movement and seated comfort on the intended sample size."]],
  },
  "high-waist": {
    heading: "High waisted briefs manufacturer: separate rise and coverage",
    links: [resource("high-waisted-briefs-manufacturer"), resource("cotton-vs-seamless-underwear-buyers-guide")].map((href) => keywordLink(href)),
    faq: [["Are high-waisted briefs automatically shapewear?", "No. Rise describes waist position. A shaping or compression claim needs a defined construction and supporting evidence for the actual garment."], ["What should I ask a plus size briefs manufacturer?", "Ask for finished waist, hip, rise and leg measurements and a reviewed size set. The listed size letters do not establish a universal US or EU plus-size fit."]],
  },
  "mens-underwear": {
    heading: "Men’s briefs manufacturer OEM and men’s trunks manufacturer: pouch and leg",
    links: [resource("mens-underwear-manufacturer-private-label"), resource("custom-waistband-underwear-manufacturer")].map((href) => keywordLink(href)),
    faq: [["Are the men’s styles entirely modal?", "No. These source records list polyester/spandex bodies with modal pouch components. Request exact component percentages for the final order label."], ["How do I compare trunks and boxer briefs?", "Specify measured inseam, leg opening, rise, pouch construction and fly. Names alone do not fix leg length or fit."]],
  },
  "mens-boxer-briefs": {
    heading: "Custom waistband underwear manufacturer: artwork on the boxer brief",
    links: [resource("mens-underwear-manufacturer-private-label"), resource("custom-waistband-underwear-manufacturer")].map((href) => keywordLink(href)),
    faq: [["Does an advertised inseam establish the finished measurement?", "Confirm where and how it is measured on the selected sample and record tolerances by size. A model name does not replace a finished measurement specification."], ["What should I approve on a printed boxer brief?", "Review print scale and placement, waistband artwork, pouch and body composition, leg fit and the final care label on the actual sample."]],
  },
};

export const serviceKeywordSections: Record<string, { headings: string[]; faq: string[][]; links: ContentLink[] }> = {
  "/oem-odm": {
    headings: ["White label underwear manufacturer: choose the catalogue base", "Custom waistband underwear manufacturer: logo and components", "OEM underwear sampling 5–7 days: approve the brief", "Small batch underwear production China: confirm the order"],
    links: [resource("private-label-underwear-manufacturer"), resource("120-pcs-moq-underwear-manufacturer"), resource("underwear-manufacturer-for-startup-brands")].map((href) => keywordLink(href)),
    faq: [["What is OEM vs ODM underwear manufacturing?", "An OEM brief identifies the brand-supplied pattern and specifications. An ODM starting point uses a selected manufacturer design with agreed changes. Confirm who supplies and approves each file, material and sample."]],
  },
  "/about": { headings: ["Small batch underwear production China: the catalogue order basis", "OEM underwear sampling 5–7 days: confirm the sample plan", "Underwear fabrics and finishes: confirm components", "Yiwu underwear manufacturer: address and sourcing evidence"], links: [resource("yiwu-underwear-manufacturer")].map((href) => keywordLink(href)), faq: [] },
  "/factory": {
    headings: ["Yiwu underwear manufacturer: what the photographs show", "Underwear gusset materials guide: inspect the components", "Underwear sizing chart US EU: agree measuring points", "How to check underwear quality stitching and attachment", "Underwear reorder planning guide: inspect before dispatch", "Underwear manufacturer China OEM: plan a buyer audit"],
    links: [resource("yiwu-underwear-manufacturer"), resource("laser-cut-underwear-manufacturer")].map((href) => keywordLink(href)),
    faq: [["How do I check underwear quality stitching before ordering?", "Set the seam placement, stitch appearance, gusset attachment and measurement criteria in the specification, then review the selected sample and production inspection record. Bonded joins need their own attachment checks."], ["Do factory photographs prove a certificate or process for my model?", "No. Request current evidence for the selected line and order. Verify any certificate by holder, site, dates and scope before using it in a claim."]],
  },
  "/fabrics": {
    headings: ["Everyday cotton underwear manufacturer: the cotton-spandex body", "Lace underwear manufacturer private label: separate body and trim", "Seamless panties manufacturer OEM: polyamide body and cotton gusset", "Underwear fabrics and finishes: care and documentation"],
    links: [resource("cotton-vs-seamless-underwear-buyers-guide"), resource("seamless-vs-no-show-underwear")].map((href) => keywordLink(href)),
    faq: [["How should a cotton vs seamless underwear buyers guide be used?", "Select similar coverage and rise, then compare component composition, fit, care and the intended clothing result. Record pattern differences so they are not attributed only to fabric."], ["Does a cotton gusset establish an all-cotton garment?", "No. Describe the body, lace and gusset separately using the approved order specification."]],
  },
  "/packaging": {
    headings: ["Custom waistband logo methods explained: artwork and elastic", "Underwear manufacturer custom labels packaging: care and fiber labels", "Custom logo underwear packaging manufacturer: the packed sample", "Underwear reorder planning guide: retain approved files"],
    links: [resource("private-label-underwear-manufacturer"), resource("custom-waistband-underwear-manufacturer")].map((href) => keywordLink(href)),
    faq: [["What should a custom labels and packaging brief include?", "Supply artwork versions, dimensions, label language, confirmed component composition, barcode data and size/color identification. Approve the physical packed sample with the garment."], ["Does the garment MOQ also set packaging minimums?", "Catalogue MOQ is 120 pieces per style. Custom label, elastic and packaging requirements need a separate component review and written confirmation."]],
  },
  "/sustainability": {
    headings: ["Underwear fabrics and finishes: know each component", "Recycled polyester underwear claims: request order records", "Responsible underwear sourcing: verify certificate scope", "Underwear reorder planning guide: retain the approved sample"],
    links: [resource("cotton-vs-seamless-underwear-buyers-guide"), resource("reorder-planning-after-low-moq-first-run")].map((href) => keywordLink(href)),
    faq: [["Does a fiber name establish certification?", "No. Request current documentation for the specific material and order. A fiber name or generic supplier statement does not establish a product certificate."], ["What should I verify before making a recycled-content claim?", "Match the claim to the actual order’s component and material records. Check any supporting document’s holder, dates, site and product scope."]],
  },
};

export const existingResourceNewLinks: Record<string, string[]> = {
  "private-label-underwear-moq-guide": ["120-pcs-moq-underwear-manufacturer", "underwear-manufacturer-for-startup-brands"],
  "accurate-underwear-yoga-wear-manufacturing-quote": ["underwear-manufacturer-for-startup-brands", "underwear-sampling-lead-time-guide"],
  "unit-cost-custom-underwear-manufacturing": ["120-pcs-moq-underwear-manufacturer", "private-label-underwear-manufacturer"],
  "traceless-vs-seamless-underwear-yoga-brands": ["seamless-vs-no-show-underwear", "laser-cut-underwear-manufacturer"],
  "lace-underwear-oem-guide-boutique-lingerie-brands": ["private-label-underwear-manufacturer", "bikini-vs-brazilian-underwear"],
  "cotton-underwear-oem-guide-daily-basics-startups": ["cotton-vs-seamless-underwear-buyers-guide", "underwear-manufacturer-for-startup-brands"],
  "waistband-customization-mens-boxer-briefs-private-label": ["custom-waistband-underwear-manufacturer", "mens-underwear-manufacturer-private-label"],
  "gusset-construction-womens-underwear-comfort-qc": ["laser-cut-underwear-manufacturer", "cotton-vs-seamless-underwear-buyers-guide"],
  "sports-bra-support-levels-small-yoga-brands": ["underwear-sampling-lead-time-guide"],
  "reorder-planning-after-low-moq-first-run": ["120-pcs-moq-underwear-manufacturer"],
  "us-eu-underwear-size-labeling-preparation-startup-brands": ["high-waisted-briefs-manufacturer", "mens-underwear-manufacturer-private-label"],
  "underwear-sampling-costs-lead-times-packaging": ["underwear-sampling-lead-time-guide", "private-label-underwear-manufacturer"],
};

export function uniqueKeywordLinks(links: ContentLink[]): ContentLink[] {
  return [...new Map(links.map((link) => [link.href, keywordLink(link.href, link.label)])).values()];
}

export const catalogueFaq = [
  ["What does mixed sizes colors MOQ underwear mean?", "Catalogue MOQ is 120 pieces per style. Propose a size/color allocation for that model; availability and the final assortment need written order confirmation."],
  ["How do I request underwear samples from a factory?", "Send model numbers, materials, sample sizes and colors, artwork, packaging and any changes. Sample guidance is 5–7 days after review of the brief; confirm completion and shipping separately."],
];
