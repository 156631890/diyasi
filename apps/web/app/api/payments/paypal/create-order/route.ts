import { NextRequest, NextResponse } from "next/server";

import { paypalRequest } from "../_lib";

export const runtime = "nodejs";

type CreateOrderRequest = {
  title: string;
  unitAmountUsd: number;
  quantity?: number;
  customerName?: string;
  customerEmail?: string;
};

type PayPalCreateOrderResponse = {
  id: string;
};

export async function POST(request: NextRequest) {
  let payload: CreateOrderRequest;
  try {
    payload = (await request.json()) as CreateOrderRequest;
  } catch {
    return NextResponse.json({ detail: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.title || typeof payload.unitAmountUsd !== "number") {
    return NextResponse.json({ detail: "title and unitAmountUsd are required." }, { status: 400 });
  }

  const quantity = Math.max(1, Math.floor(payload.quantity || 1));
  const amount = Math.max(1, Number(payload.unitAmountUsd || 0));
  const total = Number((amount * quantity).toFixed(2));
  const orderRef = `PP-${Date.now()}`;

  try {
    const paypalResponse = await paypalRequest("/v2/checkout/orders", {
      method: "POST",
      headers: {
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderRef,
            custom_id: orderRef,
            invoice_id: orderRef,
            description: payload.title.slice(0, 127),
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total.toFixed(2)
                }
              }
            },
            items: [
              {
                name: payload.title.slice(0, 127),
                quantity: String(quantity),
                unit_amount: {
                  currency_code: "USD",
                  value: amount.toFixed(2)
                }
              }
            ]
          }
        ]
      })
    });

    if (!paypalResponse.ok) {
      return NextResponse.json({ detail: await paypalResponse.text() }, { status: 502 });
    }

    const paypalOrder = (await paypalResponse.json()) as PayPalCreateOrderResponse;
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8010";

    try {
      await fetch(`${backend}/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_ref: orderRef,
          title: payload.title,
          unit_amount_usd: amount,
          quantity,
          total_amount_usd: total,
          status: "pending",
          customer_name: payload.customerName || "",
          customer_email: payload.customerEmail || "",
          source: "paypal_checkout",
          notes: `PayPal order ${paypalOrder.id}`
        }),
        cache: "no-store"
      });
    } catch {
      // Keep checkout usable even if local order sync fails.
    }

    return NextResponse.json({
      orderId: paypalOrder.id,
      orderRef
    });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Failed to create PayPal order." },
      { status: 500 }
    );
  }
}
