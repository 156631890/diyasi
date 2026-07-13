import { API_BASE } from "@/lib/api";

import { indexableContent } from "./indexable-content";
import { getIndexableProduct } from "./indexable-products";
import { moqRoutes } from "./moq-routes";

export const approvedConversionEvents = [
  "low_moq_route_selected",
  "quote_started",
  "quote_submitted",
  "whatsapp_started",
  "product_inquiry_started",
  "resource_to_quote"
] as const;

export type ConversionEvent = (typeof approvedConversionEvents)[number];

export const approvedConversionLocales = ["en", "es", "zh"] as const;

export type ConversionEventContext = {
  path?: string;
  locale?: string;
  projectRoute?: string;
  productId?: string;
};

export type WhatsAppContext = {
  page: string;
  projectRoute?: string;
  product?: string;
};

export function isApprovedConversionEvent(event: string): event is ConversionEvent {
  return (approvedConversionEvents as readonly string[]).includes(event);
}

function isApprovedConversionPath(value: string): boolean {
  return (indexableContent.paths as readonly string[]).includes(value);
}

function localeFromPathname(pathname: string): (typeof approvedConversionLocales)[number] {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

function isApprovedProjectRoute(value: string): boolean {
  return moqRoutes.some((route) => route.id === value);
}

function isReviewedResourcePath(path: string): boolean {
  return path.startsWith("/resources/") && isApprovedConversionPath(path);
}

function buildConversionPayload(event: ConversionEvent, context: ConversionEventContext): string | undefined {
  const currentPath = isApprovedConversionPath(window.location.pathname) ? window.location.pathname : "/";
  const path = context.path && isApprovedConversionPath(context.path) ? context.path : currentPath;
  const expectedLocale = localeFromPathname(path);
  const locale = context.locale === expectedLocale ? context.locale : expectedLocale;
  const payload: Record<string, string> = { name: event, path, locale };
  const pathProductId = path.startsWith("/products/") ? path.slice("/products/".length) : "";
  const reviewedPathProduct = pathProductId ? getIndexableProduct(pathProductId) : undefined;

  if (
    context.projectRoute
    && isApprovedProjectRoute(context.projectRoute)
    && (!reviewedPathProduct || context.projectRoute === reviewedPathProduct.route)
  ) {
    payload.project_route = context.projectRoute;
  }
  if (context.productId && context.productId === pathProductId && reviewedPathProduct) {
    payload.product_id = context.productId;
  }

  if (event === "low_moq_route_selected" && !payload.project_route) return undefined;
  if (event === "resource_to_quote" && !isReviewedResourcePath(path)) return undefined;
  return JSON.stringify(payload);
}

export function trackConversionEvent(event: ConversionEvent, context: ConversionEventContext = {}): void {
  if (typeof window === "undefined") return;
  const payload = buildConversionPayload(event, context);
  if (!payload) return;
  const url = `${API_BASE}/analytics/events`;

  window.dispatchEvent(new CustomEvent("diyasi-conversion", { detail: { event } }));

  if (navigator.sendBeacon?.(url, new Blob([payload], { type: "application/json" }))) return;

  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true
  }).catch(() => undefined);
}

export function buildWhatsAppUrl({ page, projectRoute, product }: WhatsAppContext): string {
  const lines = ["Hello YiWu DiYaSi, I would like to discuss a project.", `Page: ${page}`];
  if (projectRoute) lines.push(`Project route: ${projectRoute}`);
  if (product) lines.push(`Product: ${product}`);
  return `https://wa.me/8618042579030?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function resolveReviewedProductTitle(productId: string | null): string | undefined {
  return productId ? getIndexableProduct(productId)?.title : undefined;
}

export function buildResourceQuoteHref(resourceSlug: string): string {
  return `/contact?source=resource&resource=${encodeURIComponent(resourceSlug)}`;
}
