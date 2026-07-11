export const SITE_ORIGIN = "https://www.yiwudiyasidress.com";
export const SITE_NAME = "YiWu DiYaSi Dress Co., Ltd.";
export const SITE_DESCRIPTION =
  "Low-MOQ private-label underwear supplier for startup brands, retailers, and wholesale buyers.";

export function canonicalUrl(path = "/"): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\")) {
    throw new Error("canonicalUrl path must be root-relative and begin with a single '/'.");
  }

  return new URL(path, SITE_ORIGIN).toString();
}
