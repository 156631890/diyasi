import { cookies, headers } from "next/headers";
import { SiteLang, normalizeLang } from "./i18n";

export function getServerLang(): SiteLang {
  const headerStore = headers();
  const rawCookie = headerStore.get("cookie") || "";
  const headerMatch = rawCookie.match(/(?:^|;\s*)site_lang=([^;]+)/);
  if (headerMatch?.[1]) {
    return normalizeLang(decodeURIComponent(headerMatch[1]));
  }

  const cookieStore = cookies();
  const value = cookieStore.get("site_lang")?.value;
  return normalizeLang(value ? decodeURIComponent(value) : value);
}
