import { afterEach, expect, test, vi } from "vitest";
import { proxyPublicPost } from "@/lib/public-api-proxy";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
const request = (body: string) =>
  new Request("http://localhost/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

test("missing production backend returns an honest unavailable response", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("BACKEND_URL", "");
  vi.stubEnv("NEXT_PUBLIC_BACKEND_URL", "");
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  expect((await proxyPublicPost(request("{}"), "/inquiries/")).status).toBe(
    503,
  );
  expect(fetch).not.toHaveBeenCalled();
});
test("malformed or oversized submissions never reach the backend", async () => {
  vi.stubEnv("BACKEND_URL", "http://api.example");
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  expect((await proxyPublicPost(request("broken"), "/inquiries/")).status).toBe(
    400,
  );
  expect(
    (
      await proxyPublicPost(
        request(JSON.stringify({ message: "a".repeat(17000) })),
        "/inquiries/",
      )
    ).status,
  ).toBe(413);
  expect(fetch).not.toHaveBeenCalled();
});
test("inquiry success requires backend acceptance and returns no contact details", async () => {
  vi.stubEnv("BACKEND_URL", "http://api.example");
  const fetch = vi.fn(async () =>
    Response.json({ id: 23, name: "Test buyer", email: "test@example.com" }),
  );
  vi.stubGlobal("fetch", fetch);
  const response = await proxyPublicPost(
    request('{"message":"Sample request"}'),
    "/inquiries/",
  );
  expect(response.status).toBe(201);
  expect(await response.json()).toEqual({ ok: true, id: 23 });
  expect(fetch).toHaveBeenCalledWith(
    "http://api.example/inquiries/",
    expect.objectContaining({ method: "POST" }),
  );
});
test("backend rejection never becomes a successful inquiry", async () => {
  vi.stubEnv("BACKEND_URL", "http://api.example");
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(null, { status: 429 })),
  );
  expect((await proxyPublicPost(request("{}"), "/inquiries/")).status).toBe(
    429,
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new Error("offline");
    }),
  );
  expect((await proxyPublicPost(request("{}"), "/inquiries/")).status).toBe(
    503,
  );
});
