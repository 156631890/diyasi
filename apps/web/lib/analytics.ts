import { indexableContent } from "./indexable-content";
import { getIndexableProduct } from "./indexable-products";

export const ANALYTICS_ID = "G-ZWC86GDCXY";
export const CONSENT_KEY = "diyasi-analytics-consent-v1";
export type AnalyticsConsent = "granted" | "denied" | null;
const origin = "https://www.yiwudiyasidress.com";
const events = new Set([
  "page_view",
  "product_view",
  "low_moq_route_selected",
  "quote_started",
  "quote_submit_attempt",
  "quote_submit_failed",
  "quote_submitted",
  "whatsapp_started",
  "product_inquiry_started",
  "resource_to_quote",
  "sample_added",
  "sample_removed",
  "sample_list_opened",
  "sample_inquiry_started",
  "product_quick_view",
]);
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-ZWC86GDCXY"?: boolean;
};
let initialized = false;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function safeAnalyticsContext(pathname: string, search = "") {
  if (!(indexableContent.paths as readonly string[]).includes(pathname))
    return null;
  const pathId = pathname.startsWith("/products/") ? pathname.slice(10) : "";
  const queryId = ["/contact", "/es/contacto"].includes(pathname)
    ? new URLSearchParams(search).get("productId")
    : null;
  const product = getIndexableProduct(pathId || queryId || "");
  return {
    page_location: origin + pathname,
    page_path: pathname,
    language: pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en",
    ...(product ? { product_id: product.id, item_name: product.title } : {}),
  };
}

function safeReferrer() {
  try {
    return new URL(document.referrer).origin + "/";
  } catch {
    return "";
  }
}

export function startAnalytics() {
  if (getAnalyticsConsent() !== "granted") return;
  const target = window as AnalyticsWindow;
  target[`ga-disable-${ANALYTICS_ID}`] = false;
  if (initialized) return;
  initialized = true;
  target.dataLayer = target.dataLayer || [];
  target.gtag = function () {
    target.dataLayer!.push(arguments);
  };
  target.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  target.gtag("js", new Date());
  target.gtag("config", ANALYTICS_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location:
      safeAnalyticsContext(window.location.pathname)?.page_location || origin,
    page_referrer: safeReferrer(),
    cookie_flags: "SameSite=Lax;Secure",
  });
  const script = document.createElement("script");
  script.id = "diyasi-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  document.head.appendChild(script);
}

export function setAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    return;
  }
  window.dispatchEvent(new Event("diyasi-consent-change"));
  if (value === "denied") stopAnalytics();
}

export function stopAnalytics() {
  if (typeof window === "undefined") return;
  const target = window as AnalyticsWindow;
  target[`ga-disable-${ANALYTICS_ID}`] = true;
  // Also called after a storage event: revoke collection in other open tabs.
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of [
      "",
      window.location.hostname,
      ".yiwudiyasidress.com",
    ]) {
      document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""}`;
    }
  }
  if (initialized) window.location.reload();
}

export function trackAnalyticsEvent(name: string, projectRoute?: string, productId?: string) {
  if (!events.has(name) || getAnalyticsConsent() !== "granted") return;
  const context = safeAnalyticsContext(
    window.location.pathname,
    window.location.search,
  );
  if (!context) return;
  startAnalytics();
  const route = [
    "ready-stock",
    "private-label",
    "custom-color",
    "full-oem",
  ].includes(projectRoute || "")
    ? projectRoute
    : undefined;
  const selectedProduct = productId ? getIndexableProduct(productId) : undefined;
  (window as AnalyticsWindow).gtag?.("event", name, {
    ...context,
    ...(selectedProduct ? { product_id: selectedProduct.id, item_name: selectedProduct.title } : {}),
    page_referrer: safeReferrer(),
    ...(route ? { project_route: route } : {}),
    transport_type: "beacon",
  });
}
