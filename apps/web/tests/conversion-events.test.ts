import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { afterEach, expect, test, vi } from "vitest";

import {
  approvedConversionEvents,
  buildResourceQuoteHref,
  buildWhatsAppUrl,
  isApprovedConversionEvent,
  resolveReviewedProductTitle,
  trackConversionEvent
} from "@/lib/conversion-events";

const resourceQuoteLinkPath = fileURLToPath(new URL("../components/ResourceQuoteLink.tsx", import.meta.url));
const quoteFlowPath = fileURLToPath(new URL("../components/QuoteFlow.tsx", import.meta.url));
const projectRouteSelectorPath = fileURLToPath(new URL("../components/ProjectRouteSelector.tsx", import.meta.url));

test("conversion analytics exposes exactly the approved event whitelist", () => {
  expect(approvedConversionEvents).toEqual([
    "low_moq_route_selected",
    "quote_started",
    "quote_submitted",
    "whatsapp_started",
    "product_inquiry_started",
    "resource_to_quote"
  ]);

  expect(isApprovedConversionEvent("quote_started")).toBe(true);
  expect(isApprovedConversionEvent("unapproved_event")).toBe(false);
});

test("WhatsApp links contain only non-PII page and project context", () => {
  const url = buildWhatsAppUrl({
    page: "product detail",
    projectRoute: "private-label",
    product: "Modal boxer brief"
  });

  expect(url).toBe(
    "https://wa.me/8618042579030?text=Hello%20YiWu%20DiYaSi%2C%20I%20would%20like%20to%20discuss%20a%20project.%0APage%3A%20product%20detail%0AProject%20route%3A%20private-label%0AProduct%3A%20Modal%20boxer%20brief"
  );
  expect(url).not.toContain("email");
  expect(url).not.toContain("name");
  expect(url).not.toContain("company");
});

test("contact product context accepts only reviewed product IDs", () => {
  expect(resolveReviewedProductTitle("DYS-1601642594802")).toBe(
    "Custom Logo Cotton Panties for Private Label Brands"
  );
  expect(resolveReviewedProductTitle("buyer@example.com")).toBeUndefined();
  expect(resolveReviewedProductTitle("Custom Logo Cotton Panties for Private Label Brands")).toBeUndefined();
});

test("resource quote CTA tracks immediately and preserves the resource source", async () => {
  const [source, quoteFlowSource] = await Promise.all([
    readFile(resourceQuoteLinkPath, "utf8"),
    readFile(quoteFlowPath, "utf8")
  ]);

  expect(buildResourceQuoteHref("private-label-underwear-moq-guide")).toBe(
    "/contact?source=resource&resource=private-label-underwear-moq-guide"
  );
  expect(source).toContain('onClick={() => trackConversionEvent("resource_to_quote")}');
  expect(source).toContain("buildResourceQuoteHref(resourceSlug)");
  expect(quoteFlowSource).not.toContain('source === "resource"');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("conversion tracking sends only safe context through sendBeacon", () => {
  const sendBeacon = vi.fn<(url: string, data: BodyInit | null) => boolean>(() => true);
  const dispatchEvent = vi.fn();
  vi.stubGlobal("window", { location: { pathname: "/es/contact" }, dispatchEvent });
  vi.stubGlobal("navigator", { sendBeacon });
  vi.stubGlobal("fetch", vi.fn());

  trackConversionEvent("quote_started", { projectRoute: "private-label", productId: "DYS-1601642594802" });

  expect(sendBeacon).toHaveBeenCalledOnce();
  expect(sendBeacon.mock.calls[0][0]).toBe("http://127.0.0.1:8000/analytics/events");
  expect(dispatchEvent).toHaveBeenCalledOnce();
});

test("conversion tracking drops invalid context before beacon transport", async () => {
  const sendBeacon = vi.fn<(url: string, data: BodyInit | null) => boolean>(() => true);
  vi.stubGlobal("window", { location: { pathname: "/es/contacto" }, dispatchEvent: vi.fn() });
  vi.stubGlobal("navigator", { sendBeacon });

  trackConversionEvent("quote_started", {
    path: "https://attacker.example/contact?email=buyer@example.com",
    locale: "fr",
    projectRoute: "private-label<script>",
    productId: "buyer@example.com"
  });

  const beaconBody = sendBeacon.mock.calls[0][1] as Blob;
  await expect(beaconBody.text()).resolves.toBe(
    JSON.stringify({ name: "quote_started", path: "/es/contacto", locale: "es" })
  );
});

test("conversion tracking drops a phone-like path suffix before beacon transport", async () => {
  const sendBeacon = vi.fn<(url: string, data: BodyInit | null) => boolean>(() => true);
  vi.stubGlobal("window", { location: { pathname: "/contact/13800138000" }, dispatchEvent: vi.fn() });
  vi.stubGlobal("navigator", { sendBeacon });

  trackConversionEvent("quote_started");

  const beaconBody = sendBeacon.mock.calls[0][1] as Blob;
  await expect(beaconBody.text()).resolves.toBe(
    JSON.stringify({ name: "quote_started", path: "/", locale: "en" })
  );
});

test("conversion tracking normalizes cross-field product context", async () => {
  const sendBeacon = vi.fn<(url: string, data: BodyInit | null) => boolean>(() => true);
  vi.stubGlobal("window", { location: { pathname: "/products/DYS-1601642594802" }, dispatchEvent: vi.fn() });
  vi.stubGlobal("navigator", { sendBeacon });

  trackConversionEvent("quote_started", {
    locale: "es",
    projectRoute: "private-label",
    productId: "DYS-1601642594802"
  });

  const beaconBody = sendBeacon.mock.calls[0][1] as Blob;
  await expect(beaconBody.text()).resolves.toBe(
    JSON.stringify({
      name: "quote_started",
      path: "/products/DYS-1601642594802",
      locale: "en",
      product_id: "DYS-1601642594802"
    })
  );
});

test("conversion tracking avoids event-specific payloads without required context", () => {
  const sendBeacon = vi.fn<(url: string, data: BodyInit | null) => boolean>(() => true);
  const dispatchEvent = vi.fn();
  vi.stubGlobal("window", { location: { pathname: "/contact" }, dispatchEvent });
  vi.stubGlobal("navigator", { sendBeacon });

  trackConversionEvent("low_moq_route_selected");
  trackConversionEvent("resource_to_quote");

  expect(sendBeacon).not.toHaveBeenCalled();
  expect(dispatchEvent).not.toHaveBeenCalled();
});

test("project route selection records route, page, and locale context", async () => {
  const source = await readFile(projectRouteSelectorPath, "utf8");

  expect(source).toContain('trackConversionEvent("low_moq_route_selected", {');
  expect(source).toContain("path: window.location.pathname");
  expect(source).toContain("locale,");
  expect(source).toContain("projectRoute: route");
});

test("conversion tracking falls back to keepalive fetch without surfacing failures", async () => {
  const fetch = vi.fn(() => Promise.reject(new Error("network unavailable")));
  vi.stubGlobal("window", { location: { pathname: "/contact" }, dispatchEvent: vi.fn() });
  vi.stubGlobal("navigator", { sendBeacon: vi.fn(() => false) });
  vi.stubGlobal("fetch", fetch);

  trackConversionEvent("quote_submitted");
  await Promise.resolve();

  expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/analytics/events", expect.objectContaining({ keepalive: true }));
});
