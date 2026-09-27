import { expect, test, vi } from "vitest";
import { postInquiry } from "@/lib/inquiry-client";

const id = "663d5310-c753-4532-94c3-76e82d2d7e28";
const payload = { name: "Test Buyer", product_ids: ["style-one", "style-two"], quantity: "200" };

test("saved response includes its reference and separates team email status", async () => {
  const fetcher = vi.fn(async () => Response.json({ ok: true, id, team_notification: "failed" }, { status: 201 })) as typeof fetch;
  expect(await postInquiry(payload, id, fetcher)).toEqual({ kind: "saved", id, teamNotification: "failed" });
  const options = vi.mocked(fetcher).mock.calls[0][1]!;
  expect(JSON.parse(options.body as string)).toEqual({ ...payload, submission_id: id });
  expect(options.signal).toBeDefined();
});

test("server rejection never becomes a saved inquiry", async () => {
  const fetcher = vi.fn(async () => Response.json({ error: "storage unavailable" }, { status: 503 })) as typeof fetch;
  expect(await postInquiry(payload, id, fetcher)).toEqual({ kind: "rejected", status: 503 });
});

test("timeout and malformed success stay uncertain so a retry can reuse the same ID", async () => {
  const timeout = vi.fn(async () => { throw new DOMException("Timed out", "TimeoutError"); }) as typeof fetch;
  expect(await postInquiry(payload, id, timeout)).toEqual({ kind: "unknown" });
  const malformed = vi.fn(async () => Response.json({ ok: true }, { status: 201 })) as typeof fetch;
  expect(await postInquiry(payload, id, malformed)).toEqual({ kind: "unknown" });
});
