export type PublicLocale = "en" | "es";

export const spanishRoutes: Readonly<Record<string, string>> = {
  "/": "/es",
  "/products": "/es/productos/ropa-interior-marca-privada",
  "/low-moq": "/es/minimo-pedido-ropa-interior",
  "/products/seamless-underwear": "/es/ropa-interior-sin-costuras",
  "/oem-odm": "/es/fabricante-ropa-interior-china",
  "/packaging": "/es/empaque-personalizado",
  "/factory": "/es/fabrica-y-control-de-calidad",
  "/contact": "/es/contacto"
};

const reciprocalEnglishPaths = new Set([
  "/",
  "/products",
  "/products/seamless-underwear",
  "/oem-odm",
  "/packaging",
  "/factory",
  "/contact"
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
  return locale === "es" ? spanishRoutes[englishPath] : englishPath;
}

export function englishPathFor(path: string): string | undefined {
  if (spanishRoutes[path]) {
    return path;
  }

  return Object.entries(spanishRoutes).find(([, spanishPath]) => spanishPath === path)?.[0];
}

export function localeSwitchHref(locale: PublicLocale, path: string): string | undefined {
  const englishPath = englishPathFor(path);
  if (!englishPath) {
    return locale === "en" ? path : undefined;
  }

  if (locale === "es") {
    return localeHref("es", englishPath);
  }

  return reciprocalEnglishPaths.has(englishPath) ? englishPath : englishRouteFallbacks[englishPath];
}

export function alternatesFor(path: string): LocaleAlternates | undefined {
  const englishPath = englishPathFor(path);
  if (!englishPath || !reciprocalEnglishPaths.has(englishPath)) {
    return undefined;
  }

  const spanishPath = spanishRoutes[englishPath];
  return { en: englishPath, es: spanishPath, "x-default": englishPath };
}
