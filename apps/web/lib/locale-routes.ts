import { sourcingAlternates } from "./sourcing-locale-routes";
export type PublicLocale = "en" | "es" | "ru";

export const spanishRoutes: Readonly<Record<string, string>> = {
  "/": "/es",
  "/products": "/es/productos/ropa-interior-marca-privada",
  "/low-moq": "/es/minimo-pedido-ropa-interior",
  "/products/seamless-underwear": "/es/ropa-interior-sin-costuras",
  "/oem-odm": "/es/fabricante-ropa-interior-china",
  "/packaging": "/es/empaque-personalizado",
  "/factory": "/es/fabrica-y-control-de-calidad",
  "/contact": "/es/contacto",
  ...Object.fromEntries(["womens-panties", "cotton-underwear", "cotton-thongs", "lace-underwear", "thongs", "high-waist", "mens-underwear", "mens-boxer-briefs"].map(slug => [`/products/${slug}`, `/es/productos/${slug}`]))
};

export const russianRoutes: Readonly<Record<string,string>> = {
  "/": "/ru", "/products": "/ru/products", "/low-moq": "/ru/minimum-order", "/oem-odm": "/ru/private-label", "/packaging": "/ru/packaging", "/factory": "/ru/factory", "/contact": "/ru/contact",
  ...Object.fromEntries(Object.keys(spanishRoutes).filter(path => path.startsWith("/products/")).map(path => [path, `/ru${path}`]))
};

const reciprocalEnglishPaths = new Set([
  "/",
  "/products",
  "/products/seamless-underwear",
  "/oem-odm",
  "/packaging",
  "/factory",
  "/contact",
  ...Object.keys(spanishRoutes).filter(path => path.startsWith("/products/"))
]);

const englishRouteFallbacks: Readonly<Record<string, string>> = {
  "/low-moq": "/products"
};

export type LocaleAlternates = Readonly<{
  en: string;
  es: string;
  "x-default": string;
}>;

export function localeHref(locale: PublicLocale, englishPath: string): string | undefined {
  if (locale === "en") return englishPath;
  return (locale === "es" ? spanishRoutes : russianRoutes)[englishPath] ?? sourcingAlternates(englishPath)?.[locale];
}

export function englishPathFor(path: string): string | undefined {
  if (spanishRoutes[path]) {
    return path;
  }

  return [...Object.entries(spanishRoutes), ...Object.entries(russianRoutes)].find(([, translatedPath]) => translatedPath === path)?.[0];
}

export function localeSwitchHref(locale: PublicLocale, path: string): string | undefined {
  const sourcing = sourcingAlternates(path);
  if (sourcing) return sourcing[locale];
  const englishPath = englishPathFor(path);
  if (!englishPath) {
    return locale === "en" && !/^\/(es|ru|fr|de|it)(\/|$)/.test(path) ? path : undefined;
  }

  if (locale !== "en") {
    return localeHref(locale, englishPath);
  }

  return reciprocalEnglishPaths.has(englishPath) ? englishPath : englishRouteFallbacks[englishPath];
}

export function alternatesFor(path: string): Readonly<Record<string,string>> | undefined {
  const sourcing=sourcingAlternates(path); if(sourcing) return sourcing;
  const englishPath = englishPathFor(path);
  if (!englishPath || !reciprocalEnglishPaths.has(englishPath)) {
    return undefined;
  }

  const spanishPath = spanishRoutes[englishPath];
  return { en: englishPath, es: spanishPath, ru: russianRoutes[englishPath], "x-default": englishPath };
}
