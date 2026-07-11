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

export function localeHref(locale: PublicLocale, englishPath: string): string | undefined {
  return locale === "es" ? spanishRoutes[englishPath] : englishPath;
}
