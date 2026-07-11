export type IndexableProduct = {
  id: string;
  title: string;
  route: "ready-stock" | "private-label";
  collectionSlug: string;
  reviewedAt: string;
};

export const indexableProducts: readonly IndexableProduct[] = [
  { id: "DYS-1601642594802", title: "Custom Logo Cotton Panties for Private Label Brands", route: "ready-stock", collectionSlug: "womens-panties", reviewedAt: "2026-07-01" },
  { id: "DYS-1601700253074", title: "Laser-Cut Seamless Women's Underwear for Private Label", route: "ready-stock", collectionSlug: "seamless-underwear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601668037716", title: "Soft Stretch Seamless Bra for Private Label Intimates", route: "private-label", collectionSlug: "bras", reviewedAt: "2026-07-01" },
  { id: "DYS-1601700082173", title: "Seamless Shapewear Bodysuit for Private Label Programs", route: "private-label", collectionSlug: "shapewear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601560752382", title: "Men's 3D Pouch Boxer Brief for Private Label Brands", route: "private-label", collectionSlug: "mens-underwear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601421046806", title: "Men's Supportive Contour Pouch Boxer Brief", route: "ready-stock", collectionSlug: "mens-underwear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601603600505", title: "Cotton Brief with Lace Trim for Women's Underwear Brands", route: "ready-stock", collectionSlug: "womens-panties", reviewedAt: "2026-07-01" },
  { id: "DYS-1601663234376", title: "Leakproof Period Underwear with Four-Layer Cotton Gusset", route: "private-label", collectionSlug: "period-underwear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601682971804", title: "High-Rise Cotton Hipster Panties for Multipack Programs", route: "private-label", collectionSlug: "womens-panties", reviewedAt: "2026-07-01" },
  { id: "DYS-1600455122336", title: "High-Waist Cotton Lace Boyshorts for Private Label", route: "private-label", collectionSlug: "womens-panties", reviewedAt: "2026-07-01" },
  { id: "DYS-1600285556699", title: "High-Waist Seamless Workout Shorts for Activewear Brands", route: "private-label", collectionSlug: "activewear", reviewedAt: "2026-07-01" },
  { id: "DYS-1601707021411", title: "Women's Knitted Homewear Set for Private Label Programs", route: "ready-stock", collectionSlug: "homewear", reviewedAt: "2026-07-01" }
];

const indexableProductsById = new Map(indexableProducts.map((product) => [product.id, product]));

export function getIndexableProduct(productId: string): IndexableProduct | undefined {
  return indexableProductsById.get(productId);
}
