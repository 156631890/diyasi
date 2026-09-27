export const SITE_ORIGIN = "https://www.yiwudiyasidress.com";
export const SITE_NAME = "DIYASI";
export const SITE_DESCRIPTION =
  "Thoughtfully made cotton, lace and seamless underwear. DIYASI supports brands, retailers and wholesale buyers with private-label manufacturing in Yiwu, China.";

export function canonicalUrl(path = "/"): string {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.startsWith("/\\")
  ) {
    throw new Error(
      "canonicalUrl path must be root-relative and begin with a single '/'.",
    );
  }

  return new URL(path, SITE_ORIGIN).toString();
}
