import articles from "@/data/resource-articles.json";
import { catalogProducts } from "./catalog-source";

export type ResourceArticle = (typeof articles)[number] & {
  coverImage: string;
  updatedAt: string;
};
export const resourceArticles: ResourceArticle[] = articles.map((article) => ({
  ...article,
  coverImage:
    catalogProducts.find((p) => p.model_number === article.models[0])
      ?.image_url ?? "/media/editorial/cotton-lace-story.png",
  updatedAt: article.updatedAt,
}));

// Preserve migrated source data for the receiving service page.
export const activeResourceArticles = resourceArticles.filter(a => !["private-label-underwear-manufacturer", "mens-underwear-manufacturer-private-label", "120-pcs-moq-underwear-manufacturer"].includes(a.slug));
