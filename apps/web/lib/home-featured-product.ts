import type { CatalogProduct } from "./catalog-source";

// Only fields rendered by the featured cards or their existing quick view.
export type HomeFeaturedProduct = Pick<
  CatalogProduct,
  | "slug"
  | "model_number"
  | "product_name"
  | "collection"
  | "material_label"
  | "image_url"
  | "gallery_images"
  | "description"
  | "fabric"
  | "fit"
  | "rise"
  | "size"
  | "moq"
>;
