import { indexableContent } from "./indexable-content";
import { getIndexableProduct } from "./indexable-products";
import { SITE_ORIGIN } from "./site-config";

export class InquiryError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export type InquiryDetails = {
  name: string;
  email: string;
  company: string;
  message: string;
  country: string;
  category: string;
  quantity: string;
  project_route: string;
  private_label: string;
  packaging: string;
  launch_date: string;
  source_path: string;
  related_path: string;
  product_id: string;
  product_ids?: string[];
  sample_quantities?: Record<string, string>;
  referrer_origin: string;
  locale: "en" | "es";
};

function knownPath(value: string): string {
  return (indexableContent.paths as readonly string[]).includes(value) ? value : "";
}

export function validateInquiry(value: unknown): { details: InquiryDetails; submissionId: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new InquiryError(400, "Please check the form fields.");
  }
  const fields = value as Record<string, unknown>;
  function field(name: string, max: number, min = 0): string {
    const raw = fields[name] ?? "";
    if (typeof raw !== "string" || raw.length > max || raw.trim().length < min || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(raw)) {
      throw new InquiryError(400, "Please check the form fields.");
    }
    return raw.trim();
  }
  if (field("website", 300)) throw new InquiryError(400, "Please check the form fields.");
  const email = field("email", 254, 3).toLowerCase();
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    throw new InquiryError(400, "Please enter a valid email address.");
  }
  const submissionId = field("submission_id", 36);
  if (submissionId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    throw new InquiryError(400, "Please reload the form and try again.");
  }
  const sourcePath = knownPath(field("source_path", 250)) || "/contact";
  const relatedPath = knownPath(field("related_path", 250));
  const suppliedProduct = field("product_id", 200);
  const pathProduct = sourcePath.startsWith("/products/") ? sourcePath.slice(10) : "";
  const productId = getIndexableProduct(pathProduct)?.id ?? getIndexableProduct(suppliedProduct)?.id ?? "";
  const sampleIds = fields.product_ids ?? [];
  if (!Array.isArray(sampleIds) || sampleIds.length > 20 || sampleIds.some(id => typeof id !== "string" || !getIndexableProduct(id))) {
    throw new InquiryError(400, "Please review your selected styles and try again.");
  }
  const productIds = [...new Set(sampleIds as string[])];
  const rawQuantities = fields.sample_quantities ?? {};
  if (!rawQuantities || typeof rawQuantities !== "object" || Array.isArray(rawQuantities)) {
    throw new InquiryError(400, "Please review the quantities for your selected styles.");
  }
  const quantities = rawQuantities as Record<string, unknown>;
  if (Object.keys(quantities).some(id => !productIds.includes(id) || typeof quantities[id] !== "string" || !/^\d{1,7}$/.test(quantities[id]))) {
    throw new InquiryError(400, "Please review the quantities for your selected styles.");
  }
  let referrerOrigin = "";
  try {
    const referrer = new URL(field("referrer_origin", 300));
    if (["https:", "http:"].includes(referrer.protocol) && !referrer.username && !referrer.password) {
      referrerOrigin = referrer.origin === SITE_ORIGIN ? "" : referrer.origin;
    }
  } catch { /* No referrer is a valid submission. */ }
  return {
    submissionId,
    details: {
      name: field("name", 120, 1), email, company: field("company", 200),
      message: field("message", 5000, 8), country: field("country", 120),
      category: field("category", 150), quantity: field("quantity", 120),
      project_route: field("project_route", 100), private_label: field("private_label", 300),
      packaging: field("packaging", 300), launch_date: field("launch_date", 160),
      source_path: sourcePath, related_path: relatedPath, product_id: productId,
      ...(productIds.length ? { product_ids: productIds } : {}),
      ...(Object.keys(quantities).length ? { sample_quantities: quantities as Record<string, string> } : {}),
      referrer_origin: referrerOrigin,
      locale: sourcePath === "/es" || sourcePath.startsWith("/es/") ? "es" : "en",
    },
  };
}

export async function readInquiryBody(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    throw new InquiryError(415, "JSON required.");
  }
  if (Number(request.headers.get("content-length")) > 16000) throw new InquiryError(413, "Request too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new InquiryError(400, "Please check the form fields.");
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16000) {
      await reader.cancel();
      throw new InquiryError(413, "Request too large.");
    }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new InquiryError(400, "Please check the form fields."); }
}
