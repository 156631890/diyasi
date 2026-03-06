import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutRequest = {
  title: string;
  unitAmountUsd: number;
  quantity?: number;
  customerName?: string;
  customerEmail?: string;
};

export async function POST(request: NextRequest) {
  let payload: CheckoutRequest;
  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ detail: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.title || typeof payload.unitAmountUsd !== "number") {
    return NextResponse.json({ detail: "title and unitAmountUsd are required." }, { status: 400 });
  }

  const quantity = Math.max(1, Math.floor(payload.quantity || 1));
  const amount = Math.max(1, Number(payload.unitAmountUsd || 0));
  const total = Number((amount * quantity).toFixed(2));
  const orderRef = `ORD-${Date.now()}`;

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8010";
  const orderPayload = {
    order_ref: orderRef,
    title: payload.title,
    unit_amount_usd: amount,
    quantity,
    total_amount_usd: total,
    status: "pending",
    customer_name: payload.customerName || "",
    customer_email: payload.customerEmail || "",
    source: "mock_checkout"
  };

  const createResp = await fetch(`${backend}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
    cache: "no-store"
  });
  if (!createResp.ok) {
    const text = await createResp.text();
    return NextResponse.json({ detail: `Failed to create order: ${text}` }, { status: 502 });
  }

  const params = new URLSearchParams({
    ref: orderRef,
    title: payload.title,
    amount: String(amount),
    qty: String(quantity)
  });
  return NextResponse.json({
    mode: "framework_mock",
    orderRef,
    checkoutUrl: `/checkout/mock?${params.toString()}`
  });
}
