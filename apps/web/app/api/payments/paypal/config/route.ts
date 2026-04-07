import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const clientId = (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim();
  const clientSecret = (process.env.PAYPAL_CLIENT_SECRET || "").trim();
  const env = (process.env.PAYPAL_ENV || "sandbox").trim().toLowerCase();

  return NextResponse.json({
    clientId,
    env,
    productionReady: Boolean(clientId && clientSecret && env === "live")
  });
}
