"use client";

import { useEffect, useRef, useState } from "react";

type PaymentItem = {
  title: string;
  amount: number;
  desc: string;
  tag: string;
};

type PayPalButtonInstance = {
  close?: () => void;
  isEligible?: () => boolean;
  render: (target: HTMLElement) => Promise<void>;
};

type PayPalNamespace = {
  Buttons: (options: {
    style?: Record<string, string>;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onCancel: () => void;
    onError: (error: Error) => void;
  }) => PayPalButtonInstance;
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

function PayPalButtonCard({
  item,
  loadingLabel,
  unavailableLabel,
  sdkReady
}: {
  item: PaymentItem;
  loadingLabel: string;
  unavailableLabel: string;
  sdkReady: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window.paypal || !containerRef.current) {
      return;
    }

    let currentOrderRef = "";
    containerRef.current.innerHTML = "";

    const buttons = window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal"
      },
      createOrder: async () => {
        setError("");
        const response = await fetch("/api/payments/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: item.title,
            unitAmountUsd: item.amount,
            quantity: 1
          })
        });
        const payload = (await response.json()) as { orderId?: string; orderRef?: string; detail?: string };
        if (!response.ok || !payload.orderId || !payload.orderRef) {
          throw new Error(payload.detail || "Failed to create PayPal order.");
        }
        currentOrderRef = payload.orderRef;
        return payload.orderId;
      },
      onApprove: async (data) => {
        const response = await fetch("/api/payments/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: data.orderID,
            orderRef: currentOrderRef
          })
        });
        const payload = (await response.json()) as { orderRef?: string; captureId?: string; detail?: string };
        if (!response.ok || !payload.orderRef) {
          throw new Error(payload.detail || "Failed to capture PayPal payment.");
        }
        window.location.href = `/checkout/success?ref=${encodeURIComponent(payload.orderRef)}&captureId=${encodeURIComponent(payload.captureId || "")}&source=paypal`;
      },
      onCancel: () => {
        window.location.href = `/checkout/cancel?ref=${encodeURIComponent(currentOrderRef || item.tag)}&source=paypal`;
      },
      onError: (sdkError) => {
        setError(sdkError.message || "PayPal Checkout failed.");
      }
    });

    if (buttons.isEligible && !buttons.isEligible()) {
      setError(unavailableLabel);
      return;
    }

    void buttons.render(containerRef.current).catch((renderError: Error) => {
      setError(renderError.message || "Unable to render PayPal button.");
    });

    return () => {
      buttons.close?.();
    };
  }, [item, unavailableLabel]);

  return (
    <article className="payment-brief-card">
      <div className="payment-brief-head">
        <p className="payment-brief-tag">{item.tag}</p>
        <p className="payment-brief-label">USD</p>
      </div>
      <div className="payment-brief-amount-row">
        <div>
          <h3 className="card-title-standard text-[#8d452d]">{item.title}</h3>
          <p className="page-reference-body mt-3 max-w-xl text-[#7d4f3e]">{item.desc}</p>
        </div>
        <p className="heading-font text-5xl font-semibold text-[#8d452d]">${item.amount}</p>
      </div>
      <div className="payment-brief-actions">
        <div className="w-full">
          <div ref={containerRef} />
          {!sdkReady ? <p className="mt-3 text-sm text-[#7d4f3e]">{loadingLabel}</p> : null}
          {error ? <p className="mt-3 text-sm text-[#b14d2c]">{error}</p> : null}
        </div>
      </div>
    </article>
  );
}

export default function PayPalPaymentsPanel({
  items,
  clientId,
  loadingLabel,
  unavailableLabel,
  missingConfigLabel
}: {
  items: PaymentItem[];
  clientId: string;
  loadingLabel: string;
  unavailableLabel: string;
  missingConfigLabel: string;
}) {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-paypal-sdk='true']");
    if (existing) {
      const onLoad = () => setSdkReady(true);
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [clientId]);

  if (!clientId) {
    return <p className="text-sm text-[#b14d2c]">{missingConfigLabel}</p>;
  }

  return (
    <div className="payment-brief-stack">
      {items.map((item) => (
        <PayPalButtonCard
          key={item.title}
          item={item}
          loadingLabel={sdkReady ? loadingLabel : "Loading PayPal Checkout..."}
          unavailableLabel={unavailableLabel}
          sdkReady={sdkReady}
        />
      ))}
    </div>
  );
}
