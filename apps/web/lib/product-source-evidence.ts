type SizeRow = { size: string; waistCm: string; secondaryCm: string };

type ProductSourceEvidence = {
  secondaryUrl: string;
  catalogueNote: string;
  sizeChartNote: string;
  secondaryHeader: string;
  sizeRows: SizeRow[];
};

const womensWaistHipRows: SizeRow[] = [
  { size: "S", waistCm: "68–72", secondaryCm: "91–95" },
  { size: "M", waistCm: "73–77", secondaryCm: "96–100" },
  { size: "L", waistCm: "78–82", secondaryCm: "101–105" },
  { size: "XL", waistCm: "83–87", secondaryCm: "106–110" },
];

// These are transcriptions of the size-chart images attached to the original
// manufacturer listings, not approved finished-garment specifications.
export const productSourceEvidence: Record<string, ProductSourceEvidence> = {
  DYS201: {
    secondaryUrl:
      "https://diyasiapparel.com/product/wholesale-ladies-low-waist-cotton-bikini-panties-soft-breathable-women-s-briefs-diyasi-apparel/",
    catalogueNote:
      "Both DIYASI listings describe a 120-piece catalogue minimum with mixed sizes and colors. They disagree on the number of stock colors (11 versus 13), so request a current swatch card and confirm the allocation, logo and packaging minimums in the quotation.",
    sizeChartNote:
      "The attached manufacturer chart gives wearer waist and hip ranges. It does not provide finished-brief measurements or production tolerances.",
    secondaryHeader: "Hip (cm)",
    sizeRows: womensWaistHipRows,
  },
  DYS323: {
    secondaryUrl:
      "https://diyasiapparel.com/product/laser-cut-brazilian-seamless-panties-oem-one-piece-bonded-gusset-underwear-manufacturer/",
    catalogueNote:
      "Both DIYASI listings describe a 120-piece catalogue minimum with mixed sizes and colors. Confirm the selected colors, logo process and any custom-component minimums in the quotation; the listings do not document a bonded-gusset test result.",
    sizeChartNote:
      "The attached manufacturer chart gives wearer waist and hip ranges. It does not provide finished-brief measurements, bonding tolerances or test results.",
    secondaryHeader: "Hip (cm)",
    sizeRows: womensWaistHipRows,
  },
  M005: {
    secondaryUrl:
      "https://diyasiapparel.com/product/factory-direct-wholesale-custom-recycled-polyester-men-s-boxer-briefs-5-inseam-underwear/",
    catalogueNote:
      "Both DIYASI listings describe a 120-piece catalogue minimum with mixed sizes and colors. One lists a recycled-polyester body and the other polyester/spandex; confirm the actual body and pouch composition, any recycled-content evidence and waistband minimums for your order.",
    sizeChartNote:
      'The attached manufacturer chart labels these columns "Waist" and "Length". It does not define how length is measured; the values below are not a verified 5-inch inseam or finished-garment tolerance.',
    secondaryHeader: "Length (cm, source label)",
    sizeRows: [
      { size: "S", waistCm: "70–75", secondaryCm: "32.5" },
      { size: "M", waistCm: "80–85", secondaryCm: "33.6" },
      { size: "L", waistCm: "90–95", secondaryCm: "34.7" },
      { size: "XL", waistCm: "100–105", secondaryCm: "35.8" },
      { size: "2XL", waistCm: "110–115", secondaryCm: "36.9" },
      { size: "3XL", waistCm: "120–125", secondaryCm: "38" },
    ],
  },
};
