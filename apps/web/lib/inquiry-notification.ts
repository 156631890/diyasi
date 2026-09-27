import type { InquiryDetails } from "./inquiry-validation";
import { companyInfo } from "./site-info";
import { SITE_ORIGIN } from "./site-config";

export type InquiryNotification =
  | { status: "pending_setup" }
  | { status: "accepted"; provider_id: string; attempted_at: string }
  | { status: "failed"; reason: "provider_unavailable"; attempted_at: string };

// Static server configuration only: buyers cannot choose the sender or recipient.
export async function notifyInquiry(id: string, details: InquiryDetails): Promise<InquiryNotification> {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.INQUIRY_NOTIFICATION_FROM;
  const recipient = process.env.INQUIRY_NOTIFICATION_TO || companyInfo.emailPrimary;
  if (!apiKey || !sender) return { status: "pending_setup" };
  const attempted_at = new Date().toISOString();
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `diyasi-inquiry-${id}` },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: sender, to: [recipient], reply_to: details.email,
        subject: `DIYASI inquiry ${id}`,
        text: [
          `New website inquiry. Reference: ${id}`,
          `Name: ${details.name}`, `Email: ${details.email}`, `Company: ${details.company}`,
          `Market: ${details.country}`, `Quantity: ${details.quantity}`, `Project route: ${details.project_route}`,
          `Source: ${SITE_ORIGIN}${details.source_path}`,
          ...(details.related_path ? [`Related page: ${SITE_ORIGIN}${details.related_path}`] : []),
          ...[...new Set([...(details.product_ids ?? []), ...(details.product_id ? [details.product_id] : [])])].map(slug => `Selected style: ${SITE_ORIGIN}/products/${slug}${details.sample_quantities?.[slug] ? ` — ${details.sample_quantities[slug]} pieces requested` : ""}`),
          "", details.message,
        ].join("\n"),
      }),
    });
    if (!result.ok) throw new Error("provider_unavailable");
    const data = await result.json() as { id?: unknown };
    if (typeof data.id !== "string" || !data.id) throw new Error("provider_unavailable");
    // Provider acceptance is not proof of inbox delivery.
    return { status: "accepted", provider_id: data.id, attempted_at };
  } catch {
    return { status: "failed", reason: "provider_unavailable", attempted_at };
  }
}
