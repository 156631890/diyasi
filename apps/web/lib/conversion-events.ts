export const approvedConversionEvents = [
  "low_moq_route_selected",
  "quote_started",
  "quote_submitted",
  "whatsapp_started",
  "product_inquiry_started",
  "resource_to_quote"
] as const;

export type ConversionEvent = (typeof approvedConversionEvents)[number];

export type WhatsAppContext = {
  page: string;
  projectRoute?: string;
  product?: string;
};

export function isApprovedConversionEvent(event: string): event is ConversionEvent {
  return (approvedConversionEvents as readonly string[]).includes(event);
}

export function trackConversionEvent(event: ConversionEvent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("diyasi-conversion", { detail: { event } }));
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
import { getIndexableProduct } from "./indexable-products";
