"use client";

import { API_BASE } from "@/lib/api";
import CheckoutStatusView from "@/components/CheckoutStatusView";
import { getClientLang } from "@/lib/client-lang";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutCancelPage() {
  const params = useSearchParams();
  const ref = params.get("ref") || "ORD-MOCK";
  const [syncState, setSyncState] = useState("Syncing...");
  const [lang, setLang] = useState<"en" | "zh" | "es">("en");

  useEffect(() => {
    setLang(getClientLang());
  }, []);

  useEffect(() => {
    async function updateStatus() {
      try {
        const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(ref)}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled", notes: "mock checkout cancelled" })
        });
        if (response.ok) {
          setSyncState(
            lang === "zh"
              ? "订单状态已标记为已取消"
              : lang === "es"
                ? "El pedido ya figura como cancelado"
                : "Order marked as cancelled"
          );
          return;
        }
        setSyncState(
          lang === "zh"
            ? "订单状态同步失败"
            : lang === "es"
              ? "Falló la sincronización del estado"
              : "Order status sync failed"
        );
      } catch {
        setSyncState(
          lang === "zh"
            ? "订单状态同步失败"
            : lang === "es"
              ? "Falló la sincronización del estado"
              : "Order status sync failed"
        );
      }
    }
    updateStatus();
  }, [lang, ref]);

  return <CheckoutStatusView mode="cancel" refCode={ref} syncState={syncState} lang={lang} />;
}
