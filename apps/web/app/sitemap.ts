import type { MetadataRoute } from "next";
import { indexableContent } from "@/lib/indexable-content";
import { canonicalUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableContent.entries.map((entry) => {
    return {
      url: canonicalUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority
    };
  });
}
