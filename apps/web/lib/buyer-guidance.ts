import type { CatalogProduct } from "./catalog-source";

export type BuyerLink = { label: string; href: string };
export type BuyingGuide = {
  heading: string;
  intro: string;
  checks: string[];
  links: BuyerLink[];
};
const guide = (slug: string, label: string): BuyerLink => ({ label, href: `/resources/${slug}` });
const model = (slug: string, label: string): BuyerLink => ({ label, href: `/products/${slug}` });
export const moqGuide = guide("private-label-underwear-moq-guide", "Private-label underwear MOQ explained");
export const sampleGuide = guide("underwear-sampling-costs-lead-times-packaging", "Sample costs, lead times and approval checklist");
const cottonGuide = guide("cotton-underwear-oem-guide-daily-basics-startups", "Cotton underwear: composition and sample checks");
const laceGuide = guide("lace-underwear-oem-guide-boutique-lingerie-brands", "Lace underwear development guide");
const seamlessGuide = guide("traceless-vs-seamless-underwear-yoga-brands", "Seamless vs no-show construction");
const gussetGuide = guide("gusset-construction-womens-underwear-comfort-qc", "Women's underwear gusset checklist");
const waistbandGuide = guide("waistband-customization-mens-boxer-briefs-private-label", "Custom boxer-brief waistband specifications");
const sizeGuide = guide("us-eu-underwear-size-labeling-preparation-startup-brands", "US and EU size and label preparation");
const quoteGuide = guide("accurate-underwear-yoga-wear-manufacturing-quote", "What to include in an underwear quotation brief");
const costGuide = guide("unit-cost-custom-underwear-manufacturing", "What changes your underwear unit cost");
const reorderGuide = guide("reorder-planning-after-low-moq-first-run", "Plan a reorder using size-level sales");
const supportGuide = guide("sports-bra-support-levels-small-yoga-brands", "Sports-bra support development checklist");

export const collectionBuyingGuides: Record<string, BuyingGuide> = {
  "womens-panties": {
    heading: "How to source women's underwear for your brand",
    intro: "Build a sample shortlist around the wearer, fabric and coverage you need. DIYASI's women's catalogue includes cotton bikinis, lace-trim briefs, thongs and laser-cut styles for wholesale and private-label enquiries.",
    checks: ["Compare front and back coverage across the same size before choosing a bikini, Brazilian brief or thong.", "Confirm the body, lace and gusset compositions separately; a cotton gusset does not mean the whole garment is cotton.", "Ask for a size/color allocation and a separate quote for labels or packaging. Catalogue quantities do not set every custom-component minimum."],
    links: [moqGuide, sizeGuide, gussetGuide, { label: "Bikini vs Brazilian underwear coverage", href: "/news/bikini-vs-brazilian-underwear-buying-notes" }, { label: "Women's cotton thong underwear", href: "/products/cotton-thongs" }],
  },
  "cotton-underwear": {
    heading: "Planning a private-label cotton underwear range",
    intro: "The current cotton styles list a 95% cotton / 5% spandex body. Compare bikinis, briefs, boyshorts and thongs using actual measurements and waistband construction, then request the selected model numbers for sampling.",
    checks: ["Check stretch recovery, shrinkage and colorfastness on the fabric and garment you plan to order.", "Choose the rise and leg coverage before adding a logo; a wide branded waistband may change the fit and component minimum.", "Confirm the cotton body and gusset specifications on the approved sample and final fiber label."],
    links: [cottonGuide, moqGuide, sampleGuide, { label: "100% cotton vs cotton-spandex labels", href: "/news/100-cotton-vs-cotton-spandex-underwear-labels" }, { label: "Shop cotton thongs and tangas", href: "/products/cotton-thongs" }],
  },
  "cotton-thongs": {
    heading: "Source cotton thongs by coverage and construction",
    intro: "These catalogue styles use cotton-spandex fabric, not 100% cotton. Compare DYS224's regular-rise thong with high-rise DYS225 and the narrower-back T-string or G-string models; a tanga provides more back coverage than a string fit.",
    checks: ["Record front and back rise, side width and back-panel width for the selected size.", "Confirm fabric and gusset composition on the actual sample and label; do not infer it from the word cotton alone.", "Test waist and leg elastic recovery, then agree size/color allocation and any branding minimum separately."],
    links: [{ label: "Cotton underwear collection", href: "/products/cotton-underwear" }, { label: "Thong, G-string and T-string comparison", href: "/news/thong-vs-g-string-t-string-underwear-buyers" }, { label: "Cotton thong range planning", href: "/news/cotton-thong-underwear-everyday-range" }, moqGuide],
  },
  "lace-underwear": {
    heading: "Lace underwear manufacturing: details to approve",
    intro: "This collection combines cotton-rich bodies with stretch-lace trim. LS006, LS005 and LS005-142 offer different coverage and waist shapes; they are not interchangeable samples of the same fit.",
    checks: ["Approve the actual lace pattern, scallop position and color against the cotton body.", "Check lace stretch and recovery at the waist and leg openings after the agreed wash test.", "Record body and lace compositions separately: these listed styles specify 95% cotton / 5% spandex for the body and 80% polyamide / 20% spandex for lace."],
    links: [laceGuide, gussetGuide, sampleGuide],
  },
  "seamless-underwear": {
    heading: "Choosing a seamless underwear manufacturer",
    intro: "DIYASI's current no-show styles use laser-cut stretch polyamide rather than a claim that every seam is absent. The listed body composition is 80% polyamide / 20% spandex; bonded and stitched cotton gussets require different sample checks.",
    checks: ["Compare the gusset attachment on each model. Check bonding edges or stitching after washing and stretching.", "Assess edge roll and visibility under the clothing your customers will wear; a no-show result depends on fit and outer fabric.", "Confirm logo placement, heat application and care instructions for the actual material before approving bulk production."],
    links: [seamlessGuide, gussetGuide, { label: "Private-label manufacturing process", href: "/oem-odm" }, { label: "Seamless underwear for leggings: sample checks", href: "/news/seamless-underwear-for-leggings-sample-review" }],
  },
  thongs: {
    heading: "Compare thong and tanga fits before ordering",
    intro: "Thongs, tangas and T-strings vary in back width, side coverage and rise. The catalogue includes cotton, lace and seamless constructions, so select by fit and material together rather than the silhouette name alone.",
    checks: ["Ask for front and back measurements and gusset placement in your intended sample size.", "Compare waist and leg-opening tension on a fitted sample; minimal coverage still needs stable positioning.", "Keep color, fabric and logo references with each model number so a mixed sample request remains unambiguous."],
    links: [gussetGuide, cottonGuide, seamlessGuide, { label: "Compare cotton thongs and tangas", href: "/products/cotton-thongs" }],
  },
  "high-waist": {
    heading: "Specify high-waisted underwear by measurement",
    intro: "High rise describes waist position, not a guaranteed shaping effect. This range includes full-coverage briefs and minimal thongs in cotton-rich or seamless fabrics; compare coverage as well as front and back rise.",
    checks: ["Confirm finished front and back rise for each size and record where the waistband should sit.", "Check waistband rolling, seated comfort and leg openings on the intended wearer and size set.", "Do not assume a high-waisted style is compression shapewear. Agree any performance claim and testing separately."],
    links: [sizeGuide, cottonGuide, seamlessGuide, { label: "High-waisted cotton underwear range planning", href: "/news/high-waisted-cotton-underwear-range-planning" }, { label: "High-rise cotton thong styles", href: "/products/cotton-thongs" }],
  },
  "mens-underwear": {
    heading: "Private-label men's underwear: pouch, leg and waistband",
    intro: "Compare men's briefs, trunks and boxer briefs by pouch construction and finished inseam. A modal-lined pouch describes a component, not the fiber composition of the entire garment.",
    checks: ["Request body and pouch compositions separately and verify whether the selected style has a fly.", "Set inseam measurements and tolerances by size; trunk and boxer-brief names alone do not establish leg length.", "For printed styles or branded waistbands, approve artwork scale, placement, elastic recovery and the print or elastic minimum."],
    links: [waistbandGuide, { label: "Trunks vs boxer briefs: leg-length comparison", href: "/news/trunks-vs-boxer-briefs-sourcing-notes" }, sampleGuide, { label: "Browse men's boxer briefs", href: "/products/mens-boxer-briefs" }],
  },
  "mens-boxer-briefs": {
    heading: "Specify men's boxer briefs beyond the product name",
    intro: "DIYASI's current boxer-brief group includes plain M005 and M007 and printed M003 Print, M004 Print and M005 Print. Compare each model's finished inseam and pouch construction before choosing a base for your brand.",
    checks: ["Measure finished inseam and leg-opening tension in the same size; printed and plain styles should be approved as distinct models.", "Confirm body and pouch fabric compositions separately. A modal-lined pouch does not mean the entire boxer brief is modal.", "Approve waistband artwork, print scale, color and sample wash results before confirming the production specification."],
    links: [{ label: "All men's underwear styles", href: "/products/mens-underwear" }, { label: "Trunks vs boxer briefs sourcing notes", href: "/news/trunks-vs-boxer-briefs-sourcing-notes" }, waistbandGuide, sampleGuide],
  },
};

// Model-specific checks come from the reviewed catalogue and the linked
// manufacturer's source pages. They describe what to approve on a sample,
// rather than promising an untested performance result or a fixed lead time.
export const featuredProductGuides: Record<string, BuyingGuide> = {
  LS006: {
    heading: "Check the lace placement on LS006",
    intro: "LS006 combines a 95% cotton / 5% spandex body with 80% polyamide / 20% spandex lace at the waist and leg openings. Its sewn cotton gusset and Brazilian back make it a different sample from a plain cotton bikini.",
    checks: ["Compare the lace edge and Brazilian back coverage on the same size as your intended range.", "Approve the lace shade against the cotton body and inspect the sewn gusset and leg seams after the agreed wash test.", "Confirm whether the selected stock colors and S–XL size mix can be supplied together before ordering branded components."],
    links: [laceGuide, gussetGuide, model("v-waist-lace-cotton-thong-ls005", "Compare the lower-coverage LS005 lace thong")],
  },
  DYS201: {
    heading: "Build a low-rise cotton bikini sample from DYS201",
    intro: "DYS201 is a low-rise bikini with a 95% cotton / 5% spandex body. Use its front rise, side width and back coverage as the baseline for a repeatable everyday style.",
    checks: ["Record finished front and back rise, side width and leg-opening measurements in the approved size.", "Check shrinkage and elastic recovery on the actual cotton-spandex sample before approving your size chart.", "Select the intended colors from the listed stock range, then confirm the S–XL allocation and logo method in writing."],
    links: [cottonGuide, sizeGuide, model("essential-cotton-bikini-brief-dys202", "Compare the DYS202 cotton bikini")],
  },
  DYS323: {
    heading: "Approve DYS323's bonded gusset and laser-cut edge",
    intro: "DYS323 is a low-rise Brazilian style with an 80% polyamide / 20% spandex body and a bonded 100% cotton gusset. Its gusset construction differs from the stitched DYS314.",
    checks: ["Inspect the bonded gusset edge after washing and stretching; specify how any lifting or separation will be judged.", "Check edge roll and visibility beneath the outer fabric your customer is likely to wear.", "Confirm S–XL grading, the selected stock colors and logo application on this specific fabric before bulk approval."],
    links: [gussetGuide, seamlessGuide, model("seamless-high-waist-full-brief-dys314", "Compare the stitched-gusset DYS314")],
  },
  DYS219: {
    heading: "Measure the high-rise, high-leg fit of DYS219",
    intro: "DYS219 is a 95% cotton / 5% spandex high-waist brief with a high-cut leg. Its listed XXS–2XL span makes size-by-size grading more important than the silhouette name alone.",
    checks: ["Approve front and back rise, leg-opening position and back coverage on sizes at both ends of the planned range.", "Check whether the waistband rolls when seated and whether the high leg stays in place during movement.", "Treat any shaping or tummy-control claim as a separate, testable specification rather than an assumed feature of high rise."],
    links: [sizeGuide, cottonGuide, model("cotton-high-waist-thong-dys225", "Compare the high-rise DYS225 thong")],
  },
  LS005: {
    heading: "Approve LS005's V waist and lace-to-cotton join",
    intro: "LS005 pairs a low V-shaped lace waist and thong back with a 95% cotton / 5% spandex body and 80% polyamide / 20% spandex lace. The lace position is central to this style's fit.",
    checks: ["Measure the V depth and check that both sides sit evenly on the fitted sample.", "Inspect the lace-to-body join, scallop placement and stretch recovery after the agreed wash test.", "Confirm the chosen shades and S–XL allocation against the actual lace and cotton components before approving branding."],
    links: [laceGuide, sampleGuide, model("v-waist-lace-cotton-brief-ls005-142", "Compare the fuller LS005-142 brief")],
  },
  DYS314: {
    heading: "Check DYS314's full coverage and sewn gusset",
    intro: "DYS314 is a high-waist, full-coverage no-show brief with an 80% polyamide / 20% spandex body and a sewn 100% cotton gusset. It should be sampled separately from bonded-gusset styles.",
    checks: ["Measure the waistband height and back coverage, then check for rolling when seated.", "Inspect the sewn gusset seam and laser-cut edges after washing and stretching.", "Test visibility beneath the intended outer garment; no-show performance depends on fit and fabric as well as the cut edge."],
    links: [gussetGuide, seamlessGuide, model("bonded-brazilian-seamless-brief-dys323", "Compare the bonded DYS323 Brazilian")],
  },
  DYS224: {
    heading: "Use DYS224 as the regular-rise cotton thong reference",
    intro: "DYS224 is a regular-rise thong with a 95% cotton / 5% spandex body. Compare its rise and back-panel width with the high-rise DYS225 before selecting a base style.",
    checks: ["Measure front and back rise, side width and back-panel width on the approved sample.", "Check waist and leg elastic recovery and confirm the gusset specification on the garment label.", "Agree the S–2XL size split and chosen stock colors separately from any custom label or packaging minimum."],
    links: [cottonGuide, moqGuide, model("cotton-high-waist-thong-dys225", "Compare the high-rise DYS225 thong")],
  },
  M001: {
    heading: "Specify M001's no-fly brief and modal pouch",
    intro: "M001 is a low-rise, tagless men's brief with no fly. Its body is listed as polyester/spandex and its pouch as modal; the pouch composition does not describe the whole garment.",
    checks: ["Approve pouch shape, seam placement and the no-fly opening on a fitted sample.", "Request body and pouch fiber percentages for the final label; the source does not establish a tested moisture-wicking result.", "Check waistband recovery, tagless print placement and S–3XL grading before setting the size chart."],
    links: [waistbandGuide, sizeGuide, model("mens-5-inch-modal-pouch-boxer-m005", "Compare the longer-leg M005 boxer brief")],
  },
  M005: {
    heading: "Measure the M005 boxer brief before approving artwork",
    intro: "M005 is a boxer brief with a polyester/spandex body and modal-lined pouch. The source markets a 5-inch inseam, but its size chart does not define the measuring method; confirm the finished inseam on a sample. Recycled polyester is an option, not a verified claim for every order.",
    checks: ["Measure finished inseam and leg-opening tension in the requested sizes; confirm where the 5-inch measurement is taken.", "Approve pouch construction, waistband artwork and body/pouch fiber percentages on the actual sample.", "If recycled content is selected, request order-specific material and chain-of-custody evidence before making a claim."],
    links: [waistbandGuide, sampleGuide, model("printed-mid-leg-mens-boxer-brief-m005-print", "Compare the printed M005 variant")],
  },
  DYS225: {
    heading: "Compare DYS225's high rise with its minimal back",
    intro: "DYS225 combines a high waist and thong back in a 95% cotton / 5% spandex body. A higher waistband does not make this a full-coverage brief.",
    checks: ["Measure waistband height, front rise and back-panel width on the same sample size used for comparison.", "Check whether the waistband rolls and whether the thong back remains correctly positioned when worn.", "Confirm the S–2XL size split, selected colors and custom-component minimums before approving the sample."],
    links: [sizeGuide, cottonGuide, model("essential-cotton-thong-dys224", "Compare the regular-rise DYS224 thong")],
  },
};

export function productBuyingGuide(product: CatalogProduct): BuyingGuide {
  const featured = featuredProductGuides[product.model_number];
  if (featured) return featured;
  const collection = collectionBuyingGuides[product.collection];
  return {
    heading: `Sampling ${product.model_number} for your label`,
    intro: `Include model ${product.model_number} and its ${product.fit.toLowerCase()} silhouette in your quotation brief. The listed rise is ${product.rise.toLowerCase()}; confirm its measurements in the intended size before applying your branding.`,
    checks: collection.checks,
    links: [{ label: "Compare styles in this collection", href: `/products/${product.collection}` }, ...collection.links.slice(0, 2)],
  };
}

// Editorial relationships are explicit: unrelated articles should not all point
// to whichever three guides happen to be first in the source file.
export const resourceRelatedLinks: Record<string, BuyerLink[]> = {
  "private-label-underwear-moq-guide": [costGuide, sampleGuide, { label: "Private-label production process", href: "/oem-odm" }],
  "accurate-underwear-yoga-wear-manufacturing-quote": [costGuide, sizeGuide, { label: "Request a manufacturing quotation", href: "/contact" }],
  "unit-cost-custom-underwear-manufacturing": [moqGuide, reorderGuide, { label: "Custom labels and packaging", href: "/packaging" }],
  "traceless-vs-seamless-underwear-yoga-brands": [gussetGuide, { label: "Seamless underwear collection", href: "/products/seamless-underwear" }, supportGuide],
  "lace-underwear-oem-guide-boutique-lingerie-brands": [gussetGuide, sampleGuide, { label: "Lace underwear collection", href: "/products/lace-underwear" }],
  "cotton-underwear-oem-guide-daily-basics-startups": [sizeGuide, reorderGuide, { label: "Cotton underwear collection", href: "/products/cotton-underwear" }],
  "waistband-customization-mens-boxer-briefs-private-label": [sizeGuide, { label: "Men's underwear collection", href: "/products/mens-underwear" }, { label: "Labels and packaging options", href: "/packaging" }],
  "gusset-construction-womens-underwear-comfort-qc": [seamlessGuide, laceGuide, { label: "Factory quality-control process", href: "/factory" }],
  "sports-bra-support-levels-small-yoga-brands": [quoteGuide, sizeGuide, { label: "Discuss development feasibility", href: "/contact" }],
  "reorder-planning-after-low-moq-first-run": [costGuide, moqGuide, { label: "Production inspection checklist", href: "/factory" }],
  "us-eu-underwear-size-labeling-preparation-startup-brands": [waistbandGuide, { label: "Underwear fabrics and composition", href: "/fabrics" }, { label: "Packaging and labeling options", href: "/packaging" }],
  "underwear-sampling-costs-lead-times-packaging": [quoteGuide, moqGuide, { label: "Sample and production issue policy", href: "/return-policy" }],
};

export const serviceRelatedLinks: Record<string, BuyerLink[]> = {
  "/oem-odm": [moqGuide, costGuide, sampleGuide, { label: "Wholesale cotton thongs and tangas", href: "/products/cotton-thongs" }, { label: "Private-label men's boxer briefs", href: "/products/mens-boxer-briefs" }],
  "/about": [{ label: "Factory and quality control", href: "/factory" }, { label: "Wholesale underwear catalogue", href: "/products" }, { label: "DIYASI collection news", href: "/news" }],
  "/factory": [gussetGuide, sizeGuide, reorderGuide],
  "/fabrics": [cottonGuide, laceGuide, seamlessGuide],
  "/packaging": [waistbandGuide, sizeGuide, sampleGuide],
  "/sustainability": [{ label: "Fabric specifications and care", href: "/fabrics" }, { label: "Quality checks and document scope", href: "/factory" }, reorderGuide],
};
