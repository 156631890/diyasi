import { moqRoutes } from "./moq-routes";
import { collections } from "./collections";

export const companyInfo = {
  name: "YiWu DiYaSi Dress Co., Ltd.",
  shortName: "YiWu DiYaSi",
  establishedYear: 2003,
  facilityAreaSquareMeters: 28000,
  monthlyCapacityPieces: 1000000,
  countriesServed: 30,
  smallBatchMoqPerStyle: 100,
  address: "No. 16 Dashi Road, Fotang Town, Yiwu, Zhejiang, China",
  emailPrimary: "imbella.vicky@diyasidress.com",
  emailSecondary: "imbella.annie@diyasidress.com",
  phone: "+86 18042579030",
  phoneHref: "tel:+8618042579030",
  whatsapp: "https://wa.me/8618042579030",
  fax: "+86-579-85569925",
  exportMarkets:
    "USA, UK, Germany, France, Australia, Spain, and other global markets",
};

export const moqTiers = moqRoutes.map(({ label, value }) => ({ label, value }));

export const sampleAndLeadTimes = {
  stockFabricSample: "5-7 days for stock fabric sample",
  customColorSample: "10-15 days for custom color sample",
  newPatternSample: "15-20 days for new pattern development",
  bulkLeadTime: "20-35 days depending on quantity and customization",
};

export type LaunchCollection = {
  slug: string;
  family: string;
  match?: string;
  title: string;
  desc: string;
  href: string;
};

export const launchCollections: LaunchCollection[] = collections.map((c) => ({
  slug: c.slug,
  family: c.slug === "mens-underwear" ? "Men's Underwear" : "Women's Panties",
  title: c.title,
  desc: c.description,
  href: `/products/${c.slug}`,
}));

export const privateLabelOptions = [
  "Custom waistband",
  "Custom care label",
  "Heat transfer logo",
  "Hangtag",
  "Polybag",
  "Gift box",
  "Barcode / SKU sticker",
  "Size sticker and carton mark",
];

export const fabricOptions = [
  "Cotton",
  "Modal",
  "Bamboo",
  "Recycled nylon",
  "Lenzing Modal",
  "Spandex blends",
  "Seamless yarn",
  "Leakproof lining",
];

export const qualitySteps = [
  {
    title: "Incoming Fabric Inspection",
    desc: "Fabric weight, color difference, elasticity, shrinkage, hand feel, and surface condition are checked before cutting or knitting.",
  },
  {
    title: "Inline Production Inspection",
    desc: "Stitching, size tolerance, waistband position, gusset construction, logo placement, and loose threads are checked during production.",
  },
  {
    title: "Final Inspection",
    desc: "Finished size, color, quantity, label, packaging, carton mark, and shipment details are reviewed before delivery.",
  },
];
