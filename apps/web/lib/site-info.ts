export const companyInfo = {
  name: "YiWu DiYaSi Dress Co., Ltd.",
  shortName: "YiWu DiYaSi",
  establishedYear: "2002",
  factoryArea: "20,000 sq m",
  employees: "100+",
  monthlyCapacity: "600,000+ pcs",
  address: "No. 16 Dashi Road, Fotang Town, Yiwu, Zhejiang, China",
  emailPrimary: "imbella.vicky@diyasidress.com",
  emailSecondary: "imbella.annie@diyasidress.com",
  phone: "+86 18042579030",
  phoneHref: "tel:+8618042579030",
  whatsapp: "https://wa.me/8618042579030",
  fax: "+86-579-85569925",
  exportMarkets: "USA, UK, Germany, France, Australia, Spain, and other global markets"
};

export const trustStats = [
  { value: `Since ${companyInfo.establishedYear}`, label: "Factory Experience" },
  { value: companyInfo.factoryArea, label: "Factory Area" },
  { value: companyInfo.monthlyCapacity, label: "Monthly Capacity" },
  { value: companyInfo.employees, label: "Skilled Team" },
  { value: "BSCI / SEDEX", label: "Buyer Review Support" },
  { value: "OEKO-TEX", label: "Material Review Support" }
];

export const moqTiers = [
  { label: "Ready Stock MOQ", value: "from 100 pcs per style when available" },
  { label: "Private Label MOQ", value: "500 pcs per style for logo label or waistband programs" },
  { label: "Custom Color MOQ", value: "1,000 pcs per color depending on fabric and dyeing route" },
  { label: "Full OEM MOQ", value: "1,000-3,000 pcs per style depending on pattern, fabric, and packaging" }
];

export const sampleAndLeadTimes = {
  stockFabricSample: "5-7 days for stock fabric sample",
  customColorSample: "10-15 days for custom color sample",
  newPatternSample: "15-20 days for new pattern development",
  bulkLeadTime: "20-35 days depending on quantity and customization"
};

export type LaunchCollection = {
  slug: string;
  family: string;
  match?: string;
  title: string;
  desc: string;
  href: string;
};

export const launchCollections: LaunchCollection[] = [
  {
    slug: "womens-panties",
    family: "Women's Panties",
    title: "Women's Panties",
    desc: "Cotton, modal, seamless, bikini, brief, thong, hipster, and period underwear options for private label programs.",
    href: "/products/womens-panties"
  },
  {
    slug: "seamless-underwear",
    family: "Women's Panties",
    match: "seamless",
    title: "Seamless Underwear",
    desc: "No-show briefs, thongs, boyshorts, and matching seamless basics for DTC underwear collections.",
    href: "/products/seamless-underwear"
  },
  {
    slug: "bras",
    family: "Bras",
    title: "Bras & Bralettes",
    desc: "Seamless bras, light support bralettes, matching sets, and comfort-led everyday bra programs.",
    href: "/products/bras"
  },
  {
    slug: "shapewear",
    family: "Shapewear",
    title: "Shapewear",
    desc: "High-waist shaping briefs, smoothing shorts, and control pieces for fit-focused collections.",
    href: "/products/shapewear"
  },
  {
    slug: "mens-underwear",
    family: "Men's Underwear",
    title: "Men's Underwear",
    desc: "Modal, cotton, seamless, and performance boxer briefs with OEM waistband branding options.",
    href: "/products/mens-underwear"
  },
  {
    slug: "period-underwear",
    family: "Women's Panties",
    match: "period",
    title: "Period Underwear",
    desc: "Leakproof lining, absorbent gusset, and comfort-fit underwear for private label period care ranges.",
    href: "/products/period-underwear"
  },
  {
    slug: "activewear",
    family: "Activewear",
    title: "Activewear",
    desc: "Seamless leggings, sports bras, shorts, yoga sets, and studio basics for active lifestyle brands.",
    href: "/products/activewear"
  },
  {
    slug: "homewear",
    family: "Homewear",
    title: "Loungewear & Homewear",
    desc: "Soft lounge sets, sleepwear, and homewear programs for retail and wholesale buyers.",
    href: "/products/homewear"
  }
];

export const privateLabelOptions = [
  "Custom waistband",
  "Custom care label",
  "Heat transfer logo",
  "Hangtag",
  "Polybag",
  "Gift box",
  "Barcode / SKU sticker",
  "Size sticker and carton mark"
];

export const fabricOptions = [
  "Cotton",
  "Modal",
  "Bamboo",
  "Recycled nylon",
  "Lenzing Modal",
  "Spandex blends",
  "Seamless yarn",
  "Leakproof lining"
];

export const qualitySteps = [
  {
    title: "Incoming Fabric Inspection",
    desc: "Fabric weight, color difference, elasticity, shrinkage, hand feel, and surface condition are checked before cutting or knitting."
  },
  {
    title: "Inline Production Inspection",
    desc: "Stitching, size tolerance, waistband position, gusset construction, logo placement, and loose threads are checked during production."
  },
  {
    title: "Final Inspection",
    desc: "Finished size, color, quantity, label, packaging, carton mark, and shipment details are reviewed before delivery."
  }
];

export const resourceArticles = [
  {
    slug: "launch-private-label-underwear-brand",
    title: "How to Launch a Private Label Underwear Brand",
    keyword: "private label underwear brand",
    desc: "A practical roadmap for turning a product idea into samples, packaging, production, and launch-ready inventory."
  },
  {
    slug: "private-label-underwear-moq-guide",
    title: "Private Label Underwear MOQ Guide",
    keyword: "private label underwear MOQ",
    desc: "How ready stock, custom labels, custom colors, and full OEM development change MOQ planning."
  },
  {
    slug: "seamless-vs-cotton-underwear",
    title: "Seamless vs Cotton Underwear: Which Is Better for Your Brand?",
    keyword: "seamless vs cotton underwear",
    desc: "A buyer-focused comparison of comfort, fit, production route, positioning, and margin logic."
  },
  {
    slug: "underwear-fabric-guide",
    title: "How to Choose Fabrics for Underwear Collections",
    keyword: "underwear fabric guide",
    desc: "Cotton, modal, bamboo, recycled nylon, seamless yarn, spandex blends, and leakproof linings explained for sourcing teams."
  },
  {
    slug: "custom-underwear-packaging-guide",
    title: "Custom Packaging Guide for Underwear Brands",
    keyword: "custom underwear packaging",
    desc: "Care labels, waistbands, hangtags, polybags, gift boxes, and barcode stickers for retail-ready underwear programs."
  },
  {
    slug: "underwear-sample-development",
    title: "How Underwear Samples Are Developed Before Bulk Production",
    keyword: "underwear sample development",
    desc: "What happens between product brief, fabric choice, fit sample, correction round, packaging mockup, and pre-production approval."
  },
  {
    slug: "underwear-quality-control-checklist",
    title: "Quality Control Checklist for Underwear Manufacturing",
    keyword: "underwear quality control",
    desc: "A structured checklist covering fabric, stitching, sizing, waistband, gusset, labels, packaging, and final shipment review."
  },
  {
    slug: "oem-vs-odm-underwear-manufacturing",
    title: "OEM vs ODM Underwear Manufacturing",
    keyword: "OEM ODM underwear manufacturer",
    desc: "How to choose the right development route for private label underwear, retail programs, and repeat production."
  }
];
