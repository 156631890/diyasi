// Context is attached only when the buyer submits a form. No browsing-history cookie.
export function inquiryPageContext() {
  const current = new URL(window.location.href);
  let referrerOrigin = "";
  let relatedPath = "";
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === current.origin) relatedPath = referrer.pathname;
    else referrerOrigin = referrer.origin;
  } catch { /* Direct visits have no referrer. */ }
  const resource = current.searchParams.get("resource");
  if (resource) relatedPath = `/resources/${resource}`;
  const from = current.searchParams.get("from");
  if (from?.startsWith("/") && !from.startsWith("//") && !from.includes("?") && !from.includes("#")) relatedPath = from;
  return {
    source_path: current.pathname,
    related_path: relatedPath,
    product_id: current.searchParams.get("productId") || "",
    referrer_origin: referrerOrigin,
  };
}

export function inquirySubmissionKey(previous: { body: string; id: string } | null, body: string) {
  return previous?.body === body ? previous : { body, id: crypto.randomUUID() };
}
