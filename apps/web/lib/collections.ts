import { catalogProducts, type CatalogProduct } from "./catalog-source";

export const collections = [
  {
    slug: "womens-panties",
    title: "Wholesale women's panties",
    seoTitle: "Wholesale Women's Panties & Private Label Underwear",
    short: "For her",
    eyebrow: "Everyday, considered",
    description:
      "Explore wholesale women's panties in cotton, lace and seamless styles. Compare fabric specifications and photos, then ask DIYASI about private-label samples.",
    imageModel: "LS006",
  },
  {
    slug: "cotton-underwear",
    title: "Cotton underwear for private label",
    seoTitle: "Wholesale Cotton Underwear for Private Label",
    short: "Cotton",
    eyebrow: "Soft by nature",
    description:
      "Source cotton-spandex bikinis, briefs, boyshorts and thongs for wholesale and private label. Compare DIYASI specifications, rise and size ranges before sampling.",
    imageModel: "DYS201",
  },
  {
    slug: "cotton-thongs",
    title: "Wholesale cotton thong underwear & tangas",
    seoTitle: "Wholesale Cotton Thong Underwear & Tangas",
    short: "Cotton thongs",
    eyebrow: "Cotton, less coverage",
    description:
      "Compare women's cotton-spandex thong underwear, tangas, T-strings and G-strings for wholesale or private label. Check regular and high-rise fits, back coverage and waistband construction before sampling.",
    imageModel: "DYS224",
  },
  {
    slug: "lace-underwear",
    title: "Lace underwear for your brand",
    seoTitle: "Private Label Lace Underwear & Cotton-Lace Briefs",
    short: "Lace",
    eyebrow: "The delicate details",
    description:
      "Develop private-label lace underwear with cotton-rich bodies and stretch-lace trim. Compare Brazilian briefs, V-waist briefs and thongs, then request samples.",
    imageModel: "LS006",
  },
  {
    slug: "seamless-underwear",
    title: "Seamless & no-show underwear manufacturing",
    seoTitle: "Seamless & No-Show Underwear Manufacturer",
    short: "Seamless",
    eyebrow: "Less is lovely",
    description:
      "Source laser-cut seamless and no-show underwear from DIYASI in Yiwu. Compare polyamide-spandex briefs and thongs, bonded or stitched cotton gussets, and private-label sample options.",
    imageModel: "DYS323",
  },
  {
    slug: "thongs",
    title: "Wholesale thongs & tangas",
    seoTitle: "Wholesale Thongs & Tangas for Private Label",
    short: "Thongs & tangas",
    eyebrow: "Find your shape",
    description:
      "Compare wholesale cotton, lace and seamless thongs, tangas and T-strings. Review rise, gusset and size options for your private-label underwear collection.",
    imageModel: "DYS224",
  },
  {
    slug: "high-waist",
    title: "High-waisted women's underwear",
    seoTitle: "Wholesale High-Waisted Women's Underwear",
    short: "High waist",
    eyebrow: "Comfort with coverage",
    description:
      "Compare high-waisted cotton underwear, seamless briefs and high-rise thongs for wholesale or private label. Review rise measurements, coverage and size ranges with DIYASI; these are not automatically shaping garments.",
    imageModel: "DYS219",
  },
  {
    slug: "mens-underwear",
    title: "Men's underwear for private label",
    seoTitle: "Men's Underwear Manufacturer: Briefs, Trunks & Boxers",
    short: "For him",
    eyebrow: "Made for the everyday",
    description:
      "Source men's briefs, trunks and boxer briefs from DIYASI. Compare printed and plain styles, pouch lining, inseam and custom waistbands for your brand.",
    imageModel: "M001",
  },
  {
    slug: "mens-boxer-briefs",
    title: "Wholesale men's boxer briefs for private label",
    seoTitle: "Wholesale Men's Boxer Briefs & Private Label Styles",
    short: "Boxer briefs",
    eyebrow: "Longer leg, considered fit",
    description:
      "Compare DIYASI plain and printed men's boxer briefs with different pouch constructions for wholesale and private label. Review inseam, pouch lining, waistband and artwork against real catalogue styles.",
    imageModel: "M005",
  },
] as const;
export type Collection = (typeof collections)[number];
export function findCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}
export function matchesCollection(product: CatalogProduct, slug: string) {
  if (slug === "womens-panties") return product.gender === "women";
  if (slug === "cotton-thongs")
    return product.collection === "cotton-underwear" &&
      /thong|tanga|string/i.test(product.fit);
  if (slug === "thongs")
    return (
      product.gender === "women" && /thong|tanga|string/i.test(product.fit)
    );
  if (slug === "high-waist")
    return product.gender === "women" && /high/i.test(product.rise);
  if (slug === "mens-boxer-briefs")
    return product.collection === "mens-underwear" &&
      /boxer brief/i.test(product.fit);
  return product.collection === slug;
}
export function collectionImage(collection: Collection) {
  return catalogProducts.find((p) => p.model_number === collection.imageModel)!
    .image_url;
}
export function productsForCollection(slug: string) {
  return catalogProducts.filter((p) => matchesCollection(p, slug));
}
export function productByModel(model: string) {
  return catalogProducts.find((p) => p.model_number === model)!;
}
