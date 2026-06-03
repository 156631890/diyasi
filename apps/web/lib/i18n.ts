export type SiteLang = "en" | "zh" | "es";

export const SUPPORTED_LANGS: SiteLang[] = ["en", "zh", "es"];

export const LANG_LABELS: Record<SiteLang, string> = {
  en: "English",
  zh: "\u4e2d\u6587",
  es: "Espanol"
};

export function normalizeLang(value?: string | null): SiteLang {
  if (!value) {
    return "en";
  }
  const lower = value.toLowerCase();
  if (lower.startsWith("zh")) {
    return "zh";
  }
  if (lower.startsWith("es")) {
    return "es";
  }
  return "en";
}
