import { afterEach, expect, test, vi } from "vitest";
import {
  getAnalyticsConsent,
  safeAnalyticsContext,
  trackAnalyticsEvent,
  stopAnalytics,
} from "@/lib/analytics";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

test("analytics excludes private and unreviewed paths and discards query data", () => {
  for (const path of [
    "/admin",
    "/checkout/success",
    "/contact/person@example.com",
    "/unknown",
  ]) {
    expect(safeAnalyticsContext(path)).toBeNull();
  }
  const context = safeAnalyticsContext(
    "/contact",
    "?email=buyer@example.com&productId=lace-trim-cotton-brazilian-brief-ls006",
  );
  expect(context?.product_id).toBe("lace-trim-cotton-brazilian-brief-ls006");
  expect(JSON.stringify(context)).not.toContain("buyer");
  expect(context?.page_location).toBe(
    "https://www.yiwudiyasidress.com/contact",
  );
  expect(
    safeAnalyticsContext("/contact", "?productId=buyer@example.com"),
  ).not.toHaveProperty("product_id");
});

test("analytics sends nothing without affirmative consent, including inaccessible storage", () => {
  const gtag = vi.fn();
  for (const value of [null, "denied", "invalid"]) {
    vi.stubGlobal("window", { localStorage: { getItem: () => value }, gtag });
    trackAnalyticsEvent("quote_submitted");
  }
  vi.stubGlobal("window", {
    localStorage: {
      getItem: () => {
        throw new Error("blocked");
      },
    },
    gtag,
  });
  expect(getAnalyticsConsent()).toBeNull();
  trackAnalyticsEvent("whatsapp_started");
  expect(gtag).not.toHaveBeenCalled();
});

test("with consent, only reviewed event names and non-personal context reach GA", () => {
  const target = {
    localStorage: { getItem: () => "granted" },
    location: {
      pathname: "/products/lace-trim-cotton-brazilian-brief-ls006",
      search: "?email=buyer@example.com",
    },
    dataLayer: [] as unknown[],
  };
  const appendChild = vi.fn();
  vi.stubGlobal("window", target);
  vi.stubGlobal("document", {
    referrer: "https://www.google.com/search?q=private",
    createElement: () => ({}),
    head: { appendChild },
  });
  trackAnalyticsEvent("product_view");
  trackAnalyticsEvent("quote_submit_failed", "buyer@example.com");
  trackAnalyticsEvent("sample_added", undefined, "low-rise-cotton-bikini-brief-dys201");
  trackAnalyticsEvent("sample_added", undefined, "buyer@example.com");
  trackAnalyticsEvent("unapproved_event");
  const calls = target.dataLayer.map((args) =>
    Array.from(args as ArrayLike<unknown>),
  );
  const events = calls.filter((args) => args[0] === "event");
  expect(events.map((args) => args[1])).toEqual([
    "product_view",
    "quote_submit_failed",
    "sample_added",
    "sample_added",
  ]);
  expect(events[2][2]).toHaveProperty("product_id", "low-rise-cotton-bikini-brief-dys201");
  expect(JSON.stringify(calls)).not.toContain("buyer@example.com");
  expect(JSON.stringify(calls)).not.toContain("?q=");
  expect(appendChild).toHaveBeenCalledOnce();
  // The same stop routine is used when another tab changes the stored choice.
  const reload = vi.fn();
  Object.assign(target.location, { reload, hostname: "www.yiwudiyasidress.com" });
  Object.assign(document, { cookie: "_ga=synthetic" });
  stopAnalytics();
  expect(target).toHaveProperty("ga-disable-G-ZWC86GDCXY", true);
  expect(reload).toHaveBeenCalledOnce();
});
