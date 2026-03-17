"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CheckoutStatusView from "@/components/CheckoutStatusView";
import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const ref = params.get("ref") || "ORD-MOCK";
  const source = params.get("source") || "mock";
  const [syncState, setSyncState] = useState("Syncing...");
  const [lang, setLang] = useState<"en" | "zh" | "es">("en");

  useEffect(() => {
    setLang(getClientLang());
  }, []);

  useEffect(() => {
    async function syncOrderStatus() {
      const failedCopy =
        lang === "zh"
          ? "订单状态同步失败"
          : lang === "es"
            ? "Fallo la sincronizacion del estado"
            : "Order status sync failed";

      if (source === "paypal") {
        try {
          const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(ref)}`, {
            cache: "no-store"
          });

          if (!response.ok) {
            setSyncState(failedCopy);
            return;
          }

          setSyncState(
            lang === "zh"
              ? "PayPal 付款已完成并同步到订单"
              : lang === "es"
                ? "El pago de PayPal ya esta sincronizado"
                : "PayPal payment captured and synced"
          );
          return;
        } catch {
          setSyncState(failedCopy);
          return;
        }
      }

      try {
        const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(ref)}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "paid", notes: "mock checkout paid" })
        });

        if (!response.ok) {
          setSyncState(failedCopy);
          return;
        }

        setSyncState(
          lang === "zh"
            ? "订单状态已标记为已支付"
            : lang === "es"
              ? "El pedido ya figura como pagado"
              : "Order marked as paid"
        );
      } catch {
        setSyncState(failedCopy);
      }
    }

    void syncOrderStatus();
  }, [lang, ref, source]);

  return <CheckoutStatusView mode="success" refCode={ref} syncState={syncState} lang={lang} />;
}
