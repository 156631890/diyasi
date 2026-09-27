import { afterEach, beforeEach, expect, test, vi } from "vitest";

const blobs = vi.hoisted(() => new Map<string, { content: string; etag: string }>());
const controls = vi.hoisted(() => ({ failSave: false, loseResponse: false, revision: 0 }));
vi.mock("@vercel/blob", () => ({
  get: vi.fn(async (path: string, options: { access: string; useCache: boolean }) => {
    expect(options).toMatchObject({ access: "private", useCache: false });
    const item = blobs.get(path);
    return item ? { statusCode: 200, stream: new Response(item.content).body, blob: { etag: item.etag } } : null;
  }),
  put: vi.fn(async (path: string, content: string, options: { access: string; ifMatch?: string; allowOverwrite?: boolean }) => {
    expect(options.access).toBe("private");
    if (path.startsWith("inquiries/") && controls.failSave) throw new Error("storage unavailable");
    const old = blobs.get(path);
    if (options.ifMatch ? old?.etag !== options.ifMatch : !!old && !options.allowOverwrite) throw new Error("conflict");
    blobs.set(path, { content, etag: String(++controls.revision) });
    if (path.startsWith("inquiries/") && controls.loseResponse) throw new Error("response lost after save");
    return { pathname: path };
  }),
}));

import { saveInquiry } from "@/lib/inquiry-store";
import { validateInquiry } from "@/lib/inquiry-validation";
import { inquirySubmissionKey } from "@/lib/inquiry-context";

const base = {
  submission_id: "663d5310-c753-4532-94c3-76e82d2d7e28",
  name: "Sample buyer", email: "buyer@example.com", company: "Example", website: "",
  message: "Please quote samples for LS006.", source_path: "/products/lace-trim-cotton-brazilian-brief-ls006",
  referrer_origin: "https://diyasiunderwear.com/path?email=private@example.com",
};
function request(value: unknown = base, origin = "https://www.yiwudiyasidress.com") {
  return new Request("https://www.yiwudiyasidress.com/api/inquiries", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: origin, "x-forwarded-for": "192.0.2.10" },
    body: JSON.stringify(value),
  });
}

beforeEach(() => {
  blobs.clear(); controls.failSave = false; controls.loseResponse = false;
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", "unit-test-token");
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("INQUIRY_NOTIFICATION_FROM", "");
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

test("accepted inquiry is private, attributed, and returns only a reference", async () => {
  const result = await saveInquiry(request());
  expect(result.status).toBe(201);
  expect(await result.json()).toEqual({ ok: true, id: base.submission_id, team_notification: "pending_setup" });
  expect(result.headers.get("cache-control")).toBe("no-store");
  const saved = JSON.parse(blobs.get(`inquiries/${base.submission_id}.json`)!.content);
  expect(saved.details.product_id).toBe("lace-trim-cotton-brazilian-brief-ls006");
  expect(saved.details.referrer_origin).toBe("https://diyasiunderwear.com");
  expect(saved.notification.status).toBe("pending_setup");
  expect(JSON.stringify([...blobs.entries()])).not.toContain("192.0.2.10");
});

test("retry returns the existing record and a changed payload cannot overwrite it", async () => {
  expect((await saveInquiry(request())).status).toBe(201);
  expect((await saveInquiry(request())).status).toBe(200);
  expect((await saveInquiry(request({ ...base, message: "Different inquiry details" }))).status).toBe(409);
  expect([...blobs.keys()].filter((key) => key.startsWith("inquiries/"))).toHaveLength(1);
});

test("concurrent copies create one record; a lost save response is recovered", async () => {
  controls.loseResponse = true;
  const results = await Promise.all([saveInquiry(request()), saveInquiry(request())]);
  expect(results.every((r) => r.ok)).toBe(true);
  expect([...blobs.keys()].filter((key) => key.startsWith("inquiries/"))).toHaveLength(1);
});

test("distributed quota rejects the sixth distinct inquiry", async () => {
  for (let index = 0; index < 5; index++) {
    expect((await saveInquiry(request({ ...base, submission_id: `663d5310-c753-4532-94c3-76e82d2d7e2${index}` }))).status).toBe(201);
  }
  const response = await saveInquiry(request({ ...base, submission_id: "663d5310-c753-4532-94c3-76e82d2d7e29" }));
  expect(response.status).toBe(429);
  expect(response.headers.get("retry-after")).toBe("600");
});

test("bad email, spam, cross-origin and oversized data never save records", async () => {
  expect((await saveInquiry(request({ ...base, email: "not-email" }))).status).toBe(400);
  expect((await saveInquiry(request({ ...base, website: "spam" }))).status).toBe(400);
  expect((await saveInquiry(request(base, "https://unrelated.example"))).status).toBe(403);
  expect((await saveInquiry(request({ ...base, message: "x".repeat(16001) }))).status).toBe(413);
  expect(blobs.size).toBe(0);
});

test("missing credentials and storage failure never become successful inquiries", async () => {
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
  expect((await saveInquiry(request())).status).toBe(503);
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", "unit-test-token");
  controls.failSave = true;
  const logger = vi.spyOn(console, "error").mockImplementation(() => {});
  expect((await saveInquiry(request())).status).toBe(503);
  expect(logger).toHaveBeenCalledWith("inquiry_storage_unavailable");
  expect([...blobs.keys()].filter((key) => key.startsWith("inquiries/"))).toHaveLength(0);
});

test("unknown page/product context is discarded and Spanish locale is derived from its page", () => {
  const parsed = validateInquiry({ ...base, source_path: "/es", product_id: "invented", related_path: "/admin?token=secret" });
  expect(parsed.details).toMatchObject({ locale: "es", product_id: "", related_path: "" });
});

test("client retries reuse the key but changed form details create a new key", () => {
  const first = inquirySubmissionKey(null, "first payload");
  expect(inquirySubmissionKey(first, "first payload").id).toBe(first.id);
  expect(inquirySubmissionKey(first, "updated payload").id).not.toBe(first.id);
});

test("a multi-style inquiry stores only reviewed, unique catalogue ids", async () => {
  const ids = ["lace-trim-cotton-brazilian-brief-ls006", "low-rise-cotton-bikini-brief-dys201"];
  const response = await saveInquiry(request({ ...base, source_path: "/contact", related_path: `/products/${ids[0]}`, quantity: "200 total", product_ids: [...ids, ids[0]], sample_quantities: { [ids[0]]: "120", [ids[1]]: "80" } }));
  expect(response.status).toBe(201);
  const saved = JSON.parse(blobs.get(`inquiries/${base.submission_id}.json`)!.content);
  expect(saved.details.product_ids).toEqual(ids);
  expect(saved.details.sample_quantities).toEqual({ [ids[0]]: "120", [ids[1]]: "80" });
  expect(saved.details.quantity).toBe("200 total");
  expect(saved.details.related_path).toBe(`/products/${ids[0]}`);
  expect((await saveInquiry(request({ ...base, product_ids: ["made-up-style"] }))).status).toBe(400);
  expect((await saveInquiry(request({ ...base, product_ids: Array(21).fill(ids[0]) }))).status).toBe(400);
  expect((await saveInquiry(request({ ...base, product_ids: ids, sample_quantities: { "made-up-style": "100" } }))).status).toBe(400);
  expect((await saveInquiry(request({ ...base, product_ids: ids, sample_quantities: { [ids[0]]: "many" } }))).status).toBe(400);
});

test("email provider failure does not turn a saved inquiry into a failed submission", async () => {
  vi.stubEnv("RESEND_API_KEY", "mock-mail-key");
  vi.stubEnv("INQUIRY_NOTIFICATION_FROM", "DIYASI <notify@example.com>");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("provider unavailable")));
  const response = await saveInquiry(request());
  expect(response.status).toBe(201);
  expect((await response.json()).team_notification).toBe("failed");
  const saved = JSON.parse(blobs.get(`inquiries/${base.submission_id}.json`)!.content);
  expect(saved.notification.status).toBe("failed");
  expect(saved.details.email).toBe(base.email);
});

test("email uses a fixed receiver and idempotency key; acceptance is recorded without claiming delivery", async () => {
  vi.stubEnv("RESEND_API_KEY", "mock-mail-key");
  vi.stubEnv("INQUIRY_NOTIFICATION_FROM", "DIYASI <notify@example.com>");
  vi.stubEnv("INQUIRY_NOTIFICATION_TO", "sales@example.com");
  const send = vi.fn().mockResolvedValue(Response.json({ id: "mock-provider-id" }));
  vi.stubGlobal("fetch", send);
  const response = await saveInquiry(request());
  expect(response.status).toBe(201);
  expect((await response.json()).team_notification).toBe("accepted");
  const options = send.mock.calls[0][1];
  expect(JSON.parse(options.body)).toMatchObject({ to: ["sales@example.com"], reply_to: base.email });
  expect(options.headers["Idempotency-Key"]).toBe(`diyasi-inquiry-${base.submission_id}`);
  expect(JSON.parse(blobs.get(`inquiries/${base.submission_id}.json`)!.content).notification.status).toBe("accepted");
  expect((await saveInquiry(request())).status).toBe(200);
  expect(send).toHaveBeenCalledTimes(1);
});
