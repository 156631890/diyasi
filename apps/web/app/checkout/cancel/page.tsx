"use client";

import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutCancelPage() {
  const params = useSearchParams();
  const ref = params.get("ref") || "ORD-MOCK";
  const [syncState, setSyncState] = useState("syncing...");

  useEffect(() => {
    async function updateStatus() {
      try {
        const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(ref)}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled", notes: "mock checkout cancelled" })
        });
        setSyncState(response.ok ? "order marked cancelled" : "order status sync failed");
      } catch {
        setSyncState("order status sync failed");
      }
    }
    updateStatus();
  }, [ref]);

  return (
    <main className="container-shell py-16">
      <section className="card max-w-2xl p-8">
        <p className="kicker">Payment Framework</p>
        <h1 className="heading-font mt-2 text-4xl font-semibold text-[#122744]">Mock checkout cancelled</h1>
        <p className="mt-3 text-[#51627d]">
          No real payment occurred. Order reference <strong>{ref}</strong>. Status sync: {syncState}
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/products" className="btn btn-primary">
            View Products
          </Link>
          <Link href="/contact" className="btn btn-soft">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
