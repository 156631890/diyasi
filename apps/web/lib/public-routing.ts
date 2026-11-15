import manifest from "@/data/public-manifest.json";

const paths = new Set<string>(manifest.paths);
export function isPublicPath(path: string) { return paths.has(path); }
export function getPublicProduct(id: string) { return manifest.products.find(product => product.id === id); }
export const publicLocales = ["en", "es", "ru", "fr", "de", "it", "zh"] as const;
export function pageLocale(path: string): (typeof publicLocales)[number] {
  const prefix = path.split("/")[1];
  return publicLocales.find(locale => locale === prefix) ?? "en";
}
