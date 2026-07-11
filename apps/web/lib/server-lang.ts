import { cookies, headers } from "next/headers";
import { SiteLang, normalizeLang } from "./i18n";

export async function getServerLang(): Promise<SiteLang> {
  const headerStore = await headers();
  const routedLocale = headerStore.get("x-site-locale");
  if (routedLocale) {
    return normalizeLang(routedLocale);
  }

  const cookieStore = await cookies();
  return normalizeLang(cookieStore.get("site_lang")?.value);
}
