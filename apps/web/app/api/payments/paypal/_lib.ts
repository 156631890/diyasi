const PAYPAL_SANDBOX_API = "https://api-m.sandbox.paypal.com";
const PAYPAL_LIVE_API = "https://api-m.paypal.com";

type PayPalAccessTokenResponse = {
  access_token: string;
};

function getPayPalApiBase() {
  return process.env.PAYPAL_ENV === "live" ? PAYPAL_LIVE_API : PAYPAL_SANDBOX_API;
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID || "";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${getPayPalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to get PayPal access token: ${await response.text()}`);
  }

  const payload = (await response.json()) as PayPalAccessTokenResponse;
  if (!payload.access_token) {
    throw new Error("PayPal access token missing from response.");
  }

  return payload.access_token;
}

export async function paypalRequest(path: string, init: RequestInit) {
  const accessToken = await getPayPalAccessToken();
  return fetch(`${getPayPalApiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    cache: "no-store"
  });
}
