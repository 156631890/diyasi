import articles from "@/data/news-articles.json";
import insights from "@/data/industry-insights.json";
import buyerResearch from "@/data/buyer-research-articles.json";
import { catalogProducts } from "./catalog-source";

type NewsSourceArticle = {
  slug: string;
  relatedManufacturers: string[];
  sourcingTopic: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  coverModel?: string;
  coverAlt: string;
  imageCaption: string;
  models: string[];
  intro: string;
  insight?: boolean;
  dataScope?: string;
  downloads?: Array<{ label: string; href: string }>;
  sections: Array<{ title: string; paragraphs: string[]; rows?: string[][]; sources?: Array<{ label: string; href: string }> }>;
  reading: Array<{ label: string; href: string }>;
  references?: Array<{ label: string; href: string }>;
  faq?: string[][];
};
export type NewsArticle = Omit<NewsSourceArticle, "coverImage"> & { coverImage: string };
const sourceArticles: NewsSourceArticle[] = [...articles, ...insights, ...buyerResearch];

export const newsArticles: NewsArticle[] = sourceArticles
  .filter(article => article.slug !== "bikini-vs-brazilian-underwear-buying-notes")
  .map((article) => ({
    ...article,
    coverImage:
      article.coverImage ??
      catalogProducts.find((product) => product.model_number === article.coverModel)!
        .image_url,
  }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function findNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function newsDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(new Date(date));
}
