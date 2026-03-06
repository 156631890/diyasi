import { cookies } from "next/headers";
import { SiteLang, normalizeLang } from "./i18n";

export function getServerLang(): SiteLang {
  const cookieStore = cookies();
  const value = cookieStore.get("site_lang")?.value;
  return normalizeLang(value);
}
