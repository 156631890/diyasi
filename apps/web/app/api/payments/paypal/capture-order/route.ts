import { NextRequest, NextResponse } from "next/server";

import { paypalRequest } from "../_lib";

export const runtime = "nodejs";

type CaptureOrderRequest = {
  orderId: string;
  orderRef?: string;
};

type PayPalCaptureResponse = {
  status?: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units?: Array<{
    custom_id?: string;
    reference_id?: string;
    description?: string;
    amount?: {
      currency_code?: string;
      value?: string;
    };
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
      }>;
    };
  }>;
};

export async function POST(request: NextRequest) {
  let payload: CaptureOrderRequest;
  try {
    payload = (await request.json()) as CaptureOrderRequest;
  } catch {
    return NextResponse.json({ detail: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.orderId) {
    return NextResponse.json({ detail: "orderId is required." }, { status: 400 });
  }

  try {
    const paypalResponse = await paypalRequest(`/v2/checkout/orders/${encodeURIComponent(payload.orderId)}/capture`, {
      method: "POST",
      body: "{}"
    });

    if (!paypalResponse.ok) {
      return NextResponse.json({ detail: await paypalResponse.text() }, { status: 502 });
    }

    const capturePayload = (await paypalResponse.json()) as PayPalCaptureResponse;
    const purchaseUnit = capturePayload.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    const orderRef = purchaseUnit?.custom_id || purchaseUnit?.reference_id || payload.orderRef || `PP-${Date.now()}`;
    const payerName = [capturePayload.payer?.name?.given_name, capturePayload.payer?.name?.surname].filter(Boolean).join(" ");
    const payerEmail = capturePayload.payer?.email_address || "";
    const totalAmount = Number(purchaseUnit?.amount?.value || 0);
    const currency = purchaseUnit?.amount?.currency_code || "USD";
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8010";
    const captureNote = `PayPal capture ${capture?.id || "unknown"} (${capture?.status || capturePayload.status || "completed"})`;

    let orderExists = false;
    try {
      const orderResponse = await fetch(`${backend}/orders/${encodeURIComponent(orderRef)}`, {
        cache: "no-store"
      });
      orderExists = orderResponse.ok;
    } catch {
      orderExists = false;
    }

    try {
      if (orderExists) {
        await fetch(`${backend}/orders/${encodeURIComponent(orderRef)}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "paid",
            notes: captureNote,
            customer_name: payerName,
            customer_email: payerEmail,
            source: "paypal_checkout",
            currency,
            paypal_order_id: payload.orderId,
            paypal_capture_id: capture?.id || "",
            total_amount_usd: totalAmount
          }),
          cache: "no-store"
        });
      } else {
        await fetch(`${backend}/orders/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_ref: orderRef,
            title: purchaseUnit?.description || "PayPal Checkout Payment",
            unit_amount_usd: totalAmount,
            quantity: 1,
            total_amount_usd: totalAmount,
            status: "paid",
            customer_name: payerName,
            customer_email: payerEmail,
            source: "paypal_checkout",
            currency,
            paypal_order_id: payload.orderId,
            paypal_capture_id: capture?.id || "",
            notes: captureNote
          }),
          cache: "no-store"
        });
      }
    } catch {
      // Preserve PayPal capture success even if local sync fails.
    }

    return NextResponse.json({
      status: capturePayload.status || capture?.status || "COMPLETED",
      orderRef,
      captureId: capture?.id || "",
      payerEmail,
      amount: totalAmount,
      currency
    });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Failed to capture PayPal order." },
      { status: 500 }
    );
  }
}
