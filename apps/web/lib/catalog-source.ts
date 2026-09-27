import catalog from "@/data/catalog.json";

export type CatalogProduct = (typeof catalog.products)[number];
export type CatalogCategory = { category: string; count: number };
export const catalogProducts: CatalogProduct[] = catalog.products;
export const catalogUpdatedAt = catalog.updated_at;
export const legacyProductRedirects = catalog.legacy_redirects as Record<
  string,
  string
>;

// The reviewed bundle is authoritative: stale API data must not restore old products.
export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  return catalogProducts;
}
export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const categories = new Map<string, number>();
  for (const product of catalogProducts)
    categories.set(
      product.category,
      (categories.get(product.category) ?? 0) + 1,
    );
  return [...categories].map(([category, count]) => ({ category, count }));
}
export async function getCatalogProductById(
  id: string,
): Promise<CatalogProduct | null> {
  return catalogProducts.find((product) => product.slug === id) ?? null;
}
