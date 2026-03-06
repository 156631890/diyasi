"use client";

import { useState } from "react";

type BuyNowButtonProps = {
  title: string;
  unitAmountUsd: number;
  quantity?: number;
  className?: string;
  label?: string;
};

export default function BuyNowButton({
  title,
  unitAmountUsd,
  quantity = 1,
  className = "btn btn-primary",
  label = "Pay Now"
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onCheckout() {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, unitAmountUsd, quantity })
      });
      const payload = (await response.json()) as { checkoutUrl?: string; detail?: string };
      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.detail || "Checkout failed.");
      }
      window.location.href = payload.checkoutUrl;
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className={className} onClick={onCheckout} disabled={loading}>
      {loading ? "Redirecting..." : label}
    </button>
  );
}
