"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getClientLang } from "@/lib/client-lang";

export default function CheckoutPaypalPage() {
  const router = useRouter();
  const params = useSearchParams();
  const ref = params.get("ref") || "ORD-MOCK";
  const token = params.get("token") || "";
  const [status, setStatus] = useState("Capturing payment...");
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"en" | "zh" | "es">("en");

  useEffect(() => {
    setLang(getClientLang());
  }, []);

  useEffect(() => {
    async function capturePayment() {
      const failedCopy =
        lang === "zh"
          ? "PayPal \u56de\u8f6c\u540e\u6e32\u67d3\u5931\u8d25"
          : lang === "es"
            ? "Fallo el procesamiento del retorno de PayPal"
            : "PayPal return processing failed";

      if (!token) {
        setError(failedCopy);
        return;
      }

      try {
        const response = await fetch("/api/payments/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: token, orderRef: ref }),
          cache: "no-store"
        });

        const payload = (await response.json()) as { orderRef?: string; captureId?: string; detail?: string };
        if (!response.ok || !payload.orderRef) {
          setError(payload.detail || failedCopy);
          return;
        }

        router.replace(
          `/checkout/success?ref=${encodeURIComponent(payload.orderRef)}&captureId=${encodeURIComponent(payload.captureId || "")}&source=paypal`
        );
      } catch {
        setError(failedCopy);
      }
    }

    void capturePayment();
  }, [lang, ref, router, token]);

  return (
    <main className="container-shell py-16">
      <section className="card max-w-2xl p-8">
        <p className="kicker">PayPal Checkout</p>
        <h1 className="heading-font mt-2 text-4xl font-semibold text-[#1d2521]">Finalizing payment</h1>
        <p className="mt-3 text-[#51627d]">{status}</p>
        {error ? <p className="mt-4 text-sm text-[#b14d2c]">{error}</p> : null}
        {error ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.replace(`/checkout/cancel?ref=${encodeURIComponent(ref)}&source=paypal`)}
              className="btn btn-soft"
            >
              Back to Cancel
            </button>
            <button type="button" onClick={() => router.replace("/payments")} className="btn btn-primary">
              Go to Payments
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
