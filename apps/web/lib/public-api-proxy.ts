export async function proxyPublicPost(
  request: Request,
  endpoint: "/inquiries/" | "/analytics/events",
) {
  const backend =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8010" : "");
  if (!backend)
    return Response.json(
      {
        error:
          "Submission is temporarily unavailable. Please contact us by email or WhatsApp.",
      },
      { status: 503 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ error: "JSON required" }, { status: 415 });
  const text = await request.text();
  if (new TextEncoder().encode(text).length > 16000)
    return Response.json({ error: "Request too large" }, { status: 413 });
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return Response.json({ error: "Invalid request" }, { status: 400 });
  try {
    const response = await fetch(backend.replace(/\/$/, "") + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return Response.json(
        {
          error:
            response.status === 429
              ? "Too many requests. Please try again later or use email / WhatsApp."
              : "Your request was not saved. Please check the fields or use email / WhatsApp.",
        },
        {
          status: [400, 422, 429].includes(response.status)
            ? response.status
            : 502,
        },
      );
    const saved = await response.json();
    return Response.json({ ok: true, id: saved.id }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Your request was not saved. Please try email or WhatsApp." },
      { status: 503 },
    );
  }
}
