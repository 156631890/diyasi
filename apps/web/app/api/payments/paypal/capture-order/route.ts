import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const response = await fetch(`${BACKEND_URL}/api/payments/paypal/capture-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body,
      cache: "no-store"
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Unable to reach the payment backend to capture a PayPal order."
      },
      { status: 502 }
    );
  }
}
