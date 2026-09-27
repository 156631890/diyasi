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
