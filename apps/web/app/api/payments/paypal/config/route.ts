import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/paypal/config`, {
      cache: "no-store"
    });

    const body = await response.text();
    return new NextResponse(body, {
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
            : "Unable to reach the payment backend for PayPal config."
      },
      { status: 502 }
    );
  }
}
