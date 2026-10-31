export const SITE_ORIGIN = "https://www.yiwudiyasidress.com";
export const SITE_NAME = "DIYASI";
// Entity IDs retain the established fragment namespace; page URLs do not end in /.
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
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

  const url = new URL(path, SITE_ORIGIN);
  const pathname = url.pathname.replace(/\/+$/, "");
  return `${url.origin}${pathname}${url.search}${url.hash}`;
}
