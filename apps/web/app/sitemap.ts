import type { MetadataRoute } from "next";
import { indexableContent } from "@/lib/indexable-content";
import { canonicalUrl } from "@/lib/site-config";
import { catalogProducts } from "@/lib/catalog-source";
import { alternatesFor } from "@/lib/locale-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableContent.entries.map((entry) => {
    const languages = alternatesFor(entry.path);
    const product = catalogProducts.find(p => entry.path === `/products/${p.slug}`);
    return {
      url: canonicalUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(languages ? { alternates: { languages: Object.fromEntries(Object.entries(languages).map(([locale, path]) => [locale, canonicalUrl(path)])) } } : {}),
      ...(product ? { images: product.gallery_images.map(path => canonicalUrl(path)) } : {}),
    };
  });
}
