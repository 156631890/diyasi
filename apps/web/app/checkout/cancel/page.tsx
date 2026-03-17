"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CheckoutStatusView from "@/components/CheckoutStatusView";
import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";

export default function CheckoutCancelPage() {
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

      try {
        const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(ref)}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "cancelled",
            notes: source === "paypal" ? "paypal checkout cancelled" : "mock checkout cancelled"
          })
        });

        if (!response.ok) {
          setSyncState(failedCopy);
          return;
        }

        setSyncState(
          lang === "zh"
            ? "订单状态已标记为已取消"
            : lang === "es"
              ? "El pedido ya figura como cancelado"
              : "Order marked as cancelled"
        );
      } catch {
        setSyncState(failedCopy);
      }
    }

    void syncOrderStatus();
  }, [lang, ref, source]);

  return <CheckoutStatusView mode="cancel" refCode={ref} syncState={syncState} lang={lang} />;
}
