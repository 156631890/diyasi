import { catalogProducts, type CatalogProduct } from "./catalog-source";

export const collections = [
  {
    slug: "womens-panties",
    title: "Underwear Manufacturer for Boutiques: Women’s Styles",
    seoTitle: "Underwear Manufacturer for Boutiques: Women’s Styles",
    short: "For her",
    eyebrow: "Everyday, considered",
    description:
      "Compare an underwear manufacturer for boutiques using real cotton, lace and seamless styles. Review coverage, sizes and components before sampling.",
    imageModel: "LS006",
  },
  {
    slug: "cotton-underwear",
    title: "Cotton Underwear Manufacturer: Private Label Styles",
    seoTitle: "Cotton Underwear Manufacturer: Private Label Styles",
    short: "Cotton",
    eyebrow: "Soft by nature",
    description:
      "Compare a cotton underwear manufacturer using DIYASI cotton-spandex bikinis, briefs, boyshorts and thongs. Check measurements, component composition and samples.",
    imageModel: "DYS201",
  },
  {
    slug: "cotton-thongs",
    title: "Cotton Thong Manufacturer: Tangas and String Fits",
    seoTitle: "Cotton Thong Manufacturer: Tangas and String Fits",
    short: "Cotton thongs",
    eyebrow: "Cotton, less coverage",
    description:
      "Compare a cotton thong manufacturer using regular and high-rise DIYASI styles. Review back width, rise, gusset and cotton-spandex composition before sampling.",
    imageModel: "DYS224",
  },
  {
    slug: "lace-underwear",
    title: "Lace Underwear Manufacturer Private Label: Styles",
    seoTitle: "Lace Underwear Manufacturer Private Label: Styles",
    short: "Lace",
    eyebrow: "The delicate details",
    description:
      "Compare a lace underwear manufacturer private label range with cotton-rich bodies and separate lace blends. Review Brazilian briefs, V-waist briefs and thongs.",
    imageModel: "LS006",
  },
  {
    slug: "seamless-underwear",
    title: "Seamless Underwear Manufacturer: OEM Styles",
    seoTitle: "Seamless Underwear Manufacturer: OEM Styles",
    short: "Seamless",
    eyebrow: "Less is lovely",
    description:
      "Choose a seamless underwear manufacturer by real cut edges, bonded or sewn cotton gussets and fit. Compare DIYASI polyamide-spandex briefs and thongs.",
    imageModel: "DYS323",
  },
  {
    slug: "thongs",
    title: "Thong Underwear Manufacturer OEM: Styles and Fits",
    seoTitle: "Thong Underwear Manufacturer OEM: Styles and Fits",
    short: "Thongs & tangas",
    eyebrow: "Find your shape",
    description:
      "Compare a thong underwear manufacturer OEM range in cotton, lace and seamless constructions. Check rise, back width and gusset placement on samples.",
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
    title: "Men’s Underwear OEM Catalogue: Briefs and Trunks",
    seoTitle: "Men’s Underwear OEM Catalogue: Briefs and Trunks",
    short: "For him",
    eyebrow: "Made for the everyday",
    description:
      "Use the men’s underwear OEM catalogue to compare briefs, trunks and boxer briefs. Review pouch components, inseam, fly and waistband before private-label sampling.",
    imageModel: "M001",
  },
  {
    slug: "mens-boxer-briefs",
    title: "Men’s Boxer Briefs Manufacturer OEM: Real Styles",
    seoTitle: "Men’s Boxer Briefs Manufacturer OEM: Real Styles",
    short: "Boxer briefs",
    eyebrow: "Longer leg, considered fit",
    description:
      "Compare a men’s boxer briefs manufacturer OEM range using DIYASI plain and printed models. Check measured inseam, pouch composition, waistband and artwork.",
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
