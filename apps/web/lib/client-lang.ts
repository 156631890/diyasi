"use client";

import { SiteLang, normalizeLang } from "@/lib/i18n";

export function getClientLang(): SiteLang {
  if (typeof document === "undefined") {
    return "en";
  }

  const match = document.cookie.match(/(?:^|;\s*)site_lang=([^;]+)/);
  return normalizeLang(match?.[1] || "");
}
