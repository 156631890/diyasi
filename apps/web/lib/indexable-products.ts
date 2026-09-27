import { catalogProducts } from "./catalog-source";
export type IndexableProduct = {
  id: string;
  title: string;
  route: "ready-stock" | "private-label";
  collectionSlug: string;
  reviewedAt: string;
};
export const indexableProducts: IndexableProduct[] = catalogProducts.map(
  (p) => ({
    id: p.slug,
    title: p.product_name,
    route: "private-label",
    collectionSlug: p.collection,
    reviewedAt: p.seo_updated_at > p.reviewed_at ? p.seo_updated_at : p.reviewed_at,
  }),
);
export function getIndexableProduct(id: string) {
  return indexableProducts.find((p) => p.id === id);
}
