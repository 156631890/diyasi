import { createHash, createHmac, randomUUID } from "node:crypto";
import { get, put } from "@vercel/blob";
import { InquiryError, readInquiryBody, validateInquiry, type InquiryDetails } from "./inquiry-validation";
import { SITE_ORIGIN } from "./site-config";
import { notifyInquiry, type InquiryNotification } from "./inquiry-notification";

export type StoredInquiry = {
  version: 1;
  id: string;
  received_at: string;
  fingerprint: string;
  details: InquiryDetails;
  notification: InquiryNotification;
};

type RateState = { windowStart: number; count: number; dailyCount: number };
const privateOptions = {
  access: "private" as const,
  addRandomSuffix: false,
  contentType: "application/json",
  cacheControlMaxAge: 60,
};

async function readRecord<T>(path: string): Promise<{ data: T; etag: string } | null> {
  const result = await get(path, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return { data: await new Response(result.stream).json() as T, etag: result.blob.etag };
}

async function consumeQuota(request: Request, now: number): Promise<void> {
  // Vercel replaces x-forwarded-for with the incoming client's address.
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = createHmac("sha256", process.env.BLOB_READ_WRITE_TOKEN!).update(address).digest("hex");
  const day = new Date(now).toISOString().slice(0, 10);
  const path = `inquiry-rate/${day}/${key}.json`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const previous = await readRecord<RateState>(path);
    const old = previous?.data;
    const sameWindow = old && now - old.windowStart < 10 * 60 * 1000;
    if ((sameWindow && old.count >= 5) || (old?.dailyCount ?? 0) >= 30) {
      throw new InquiryError(429, "Too many requests. Please try again later or contact us by email or WhatsApp.");
    }
    const next: RateState = {
      windowStart: sameWindow ? old.windowStart : now,
      count: sameWindow ? old.count + 1 : 1,
      dailyCount: (old?.dailyCount ?? 0) + 1,
    };
    try {
      await put(path, JSON.stringify(next), {
        ...privateOptions,
        ...(previous ? { ifMatch: previous.etag, allowOverwrite: true } : { allowOverwrite: false }),
      });
      return;
    } catch (error) {
      // A concurrent create/update gets another read; outages never bypass the quota.
      if (attempt === 3) throw error;
    }
  }
}

function checkOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) return; // Non-browser clients still pass validation and distributed quotas.
  const allowed = [SITE_ORIGIN, "https://yiwudiyasidress.com"];
  if (process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== "production") allowed.push(new URL(request.url).origin);
  if (!allowed.includes(origin)) throw new InquiryError(403, "Please submit the form from our website.");
}

export async function saveInquiry(request: Request): Promise<Response> {
  const responseHeaders = { "Cache-Control": "no-store" };
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) throw new InquiryError(503, "Please contact us by email or WhatsApp.");
    checkOrigin(request);
    const { details, submissionId } = validateInquiry(await readInquiryBody(request));
    const fingerprint = createHash("sha256").update(JSON.stringify(details)).digest("hex");
    const id = submissionId || randomUUID();
    const path = `inquiries/${id}.json`;
    const previous = await readRecord<StoredInquiry>(path);
    if (previous) {
      if (previous.data.fingerprint !== fingerprint) throw new InquiryError(409, "Please reload the form and try again.");
      return Response.json({ ok: true, id, team_notification: previous.data.notification.status }, { status: 200, headers: responseHeaders });
    }
    const now = Date.now();
    await consumeQuota(request, now);
    const record: StoredInquiry = {
      version: 1, id, received_at: new Date(now).toISOString(), fingerprint, details,
      notification: { status: "pending_setup" },
    };
    try {
      await put(path, JSON.stringify(record), { ...privateOptions, allowOverwrite: false });
    } catch (error) {
      // A lost response or concurrent retry may already have saved this exact request.
      const saved = await readRecord<StoredInquiry>(path);
      if (!saved || saved.data.fingerprint !== fingerprint) throw error;
    }
    // The inquiry is durable before email is attempted. Email/status-write failure must not undo it.
    const notification = await notifyInquiry(id, details);
    if (notification.status !== "pending_setup") {
      try {
        const saved = await readRecord<StoredInquiry>(path);
        if (saved && saved.data.notification.status !== "accepted") {
          await put(path, JSON.stringify({ ...saved.data, notification }), { ...privateOptions, allowOverwrite: true, ifMatch: saved.etag });
        }
      } catch { console.error("inquiry_notification_status_unavailable"); }
    }
    return Response.json({ ok: true, id, team_notification: notification.status }, { status: 201, headers: responseHeaders });
  } catch (error) {
    const known = error instanceof InquiryError;
    // Do not log buyer details, request bodies, credentials or private blob URLs.
    if (!known) console.error("inquiry_storage_unavailable");
    return Response.json({ error: known ? error.message : "Your request was not saved. Please try again or contact us by email or WhatsApp." }, {
      status: known ? error.status : 503,
      headers: { ...responseHeaders, ...(known && error.status === 429 ? { "Retry-After": "600" } : {}) },
    });
  }
}
