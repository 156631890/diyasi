import { catalogProducts, type CatalogProduct } from "./catalog-source";

export const collections = [
  {
    slug: "womens-panties",
    title: "Wholesale Women's Panties",
    seoTitle: "Wholesale Women's Panties | Cotton, Lace & Seamless",
    short: "For her",
    eyebrow: "Everyday, considered",
    description:
      "Compare DIYASI wholesale panties in cotton, lace and laser-cut seamless styles. Review coverage, sizes and component fabrics before requesting samples.",
    imageModel: "LS006",
  },
  {
    slug: "cotton-underwear",
    title: "Wholesale Cotton Underwear",
    seoTitle: "Wholesale Cotton Underwear | Briefs, Bikinis & Thongs",
    short: "Cotton",
    eyebrow: "Soft by nature",
    description:
      "Source cotton-spandex underwear from DIYASI: bikinis, briefs, boyshorts and thongs. Compare model measurements and component fabrics for your wholesale order.",
    imageModel: "DYS201",
  },
  {
    slug: "cotton-thongs",
    title: "Wholesale Cotton Thongs",
    seoTitle: "Wholesale Cotton Thongs | Tangas & String Styles",
    short: "Cotton thongs",
    eyebrow: "Cotton, less coverage",
    description:
      "Compare DIYASI cotton-spandex thongs in regular and high-rise cuts. Check back width, rise and gusset details before requesting wholesale samples and a quote.",
    imageModel: "DYS224",
  },
  {
    slug: "lace-underwear",
    title: "Wholesale Lace Panties & Thongs",
    seoTitle: "Wholesale Lace Panties & Thongs | Cotton-Lace Styles",
    short: "Lace",
    eyebrow: "The delicate details",
    description:
      "Compare wholesale lace panties and thongs from DIYASI. Review cotton bodies, separate lace blends, coverage and fit before samples and private-label approval.",
    imageModel: "LS006",
  },
  {
    slug: "seamless-underwear",
    title: "Wholesale Seamless Underwear: Laser-Cut Styles",
    seoTitle: "Wholesale Seamless Underwear | Laser-Cut Briefs & Thongs",
    short: "Seamless",
    eyebrow: "Less is lovely",
    description:
      "Compare DIYASI wholesale seamless underwear in laser-cut brief and thong styles. Check bonded or sewn cotton gussets, fit, samples and model-specific minimums.",
    imageModel: "DYS323",
  },
  {
    slug: "thongs",
    title: "Wholesale Thongs: Cotton, Lace & Seamless",
    seoTitle: "Wholesale Thongs | Cotton, Lace & Seamless Styles",
    short: "Thongs & tangas",
    eyebrow: "Find your shape",
    description:
      "Choose wholesale thongs from DIYASI's cotton, lace and laser-cut seamless styles. Compare rise, back width and gusset placement before sample approval.",
    imageModel: "DYS224",
  },
  {
    slug: "high-waist",
    title: "High Waisted Underwear Supplier: Briefs and Thongs",
    seoTitle: "High Waisted Underwear Supplier: Briefs and Thongs",
    short: "High waist",
    eyebrow: "Comfort with coverage",
    description:
      "Compare a high waisted underwear supplier by front/back rise and coverage. Review DIYASI cotton and seamless briefs and high-rise thongs before sampling.",
    imageModel: "DYS219",
  },
  {
    slug: "mens-underwear",
    title: "Wholesale Men's Underwear",
    seoTitle: "Wholesale Men's Underwear | Briefs & Boxer Briefs",
    short: "For him",
    eyebrow: "Made for the everyday",
    description:
      "Compare DIYASI men's briefs, trunks and boxer briefs for wholesale orders. Review pouch fabrics, inseam, fly and waistband, then request samples and a quote.",
    imageModel: "M001",
  },
  {
    slug: "mens-boxer-briefs",
    title: "Wholesale Men's Boxer Briefs",
    seoTitle: "Wholesale Men's Boxer Briefs | Plain & Printed Styles",
    short: "Boxer briefs",
    eyebrow: "Longer leg, considered fit",
    description:
      "Source plain and printed men's boxer briefs from DIYASI. Compare measured inseam, pouch composition and waistband before wholesale or private-label approval.",
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
