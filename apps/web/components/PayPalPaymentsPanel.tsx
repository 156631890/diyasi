"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M7.2 4h6.3c2.7 0 4.7 1.8 4.2 4.5-.5 2.9-2.8 4.3-5.7 4.3H9.5l-.9 5.2H5.2L7.2 4Zm3 6.4h2c1.6 0 2.8-.6 3.1-2.1.2-1.2-.6-1.9-2.1-1.9h-2.6l-.4 4Z" />
      <path d="M10.3 9.3h4.4c2.1 0 3.6 1.4 3.2 3.6-.4 2.4-2.4 3.7-4.8 3.7h-1.8l-.6 3.4H7.9l1.1-6.3h2.1c1.3 0 2.5-.4 2.8-1.8.2-1-.5-1.5-1.7-1.5H9.8l.5-1.1Z" opacity=".7" />
    </svg>
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
  const [selectedTitle, setSelectedTitle] = useState(items[0]?.title || "");
  const [sdkReady, setSdkReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [paypalError, setPayPalError] = useState("");
  const [runtimeClientId, setRuntimeClientId] = useState("");
  const [configChecked, setConfigChecked] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);

  const selectedItem = useMemo(
    () => items.find((item) => item.title === selectedTitle) || items[0],
    [items, selectedTitle]
  );
  const effectiveClientId = runtimeClientId || clientId;

  useEffect(() => {
    let cancelled = false;

    async function loadRuntimeConfig() {
      try {
        const response = await fetch("/api/payments/paypal/config", {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { clientId?: string };
        if (!cancelled && payload.clientId) {
          setRuntimeClientId(payload.clientId.trim());
        }
      } catch {
        // Keep using the server-rendered value if the runtime probe is unavailable.
      } finally {
        if (!cancelled) {
          setConfigChecked(true);
        }
      }
    }

    void loadRuntimeConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!effectiveClientId) {
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
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(effectiveClientId)}&currency=USD&intent=capture&components=buttons`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = () => setSdkReady(true);
    script.onerror = () => {
      setPendingOpen(false);
      setPayPalError("Failed to load the PayPal SDK.");
    };
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [effectiveClientId]);

  useEffect(() => {
    if (!modalOpen || !sdkReady || !window.paypal || !paypalContainerRef.current || !selectedItem) {
      return;
    }

    let currentOrderRef = "";
    paypalContainerRef.current.innerHTML = "";
    setPayPalError("");

    let buttons: PayPalButtonInstance;
    try {
      buttons = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal"
        },
        createOrder: async () => {
          const response = await fetch("/api/payments/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: selectedItem.title,
              unitAmountUsd: selectedItem.amount,
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
            throw new Error(payload.detail || "Failed to verify PayPal payment.");
          }

          window.location.href = `/checkout/success?ref=${encodeURIComponent(payload.orderRef)}&captureId=${encodeURIComponent(payload.captureId || "")}&source=paypal`;
        },
        onCancel: () => {
          window.location.href = `/checkout/cancel?ref=${encodeURIComponent(currentOrderRef || selectedItem.tag)}&source=paypal`;
        },
        onError: (sdkError) => {
          setPayPalError(sdkError.message || "PayPal Checkout failed.");
        }
      });
    } catch (error) {
      setPayPalError(error instanceof Error ? error.message : "Unable to initialize PayPal.");
      return;
    }

    if (buttons.isEligible && !buttons.isEligible()) {
      setPayPalError(unavailableLabel);
      return;
    }

    void buttons.render(paypalContainerRef.current).catch((renderError: Error) => {
      setPayPalError(renderError.message || "Unable to render the PayPal button.");
    });

    return () => {
      buttons.close?.();
    };
  }, [modalOpen, sdkReady, selectedItem, unavailableLabel]);

  useEffect(() => {
    if (!pendingOpen || !sdkReady) {
      return;
    }

    setPendingOpen(false);
    setMessage("");
    setModalOpen(true);
  }, [pendingOpen, sdkReady]);

  function onProceed() {
    setMessage("");

    if (!selectedItem) return;

    if (!effectiveClientId) {
      setMessage(
        configChecked
          ? missingConfigLabel
          : loadingLabel
      );
      return;
    }

    if (!sdkReady) {
      setPendingOpen(true);
      setMessage(loadingLabel);
      return;
    }

    setModalOpen(true);
  }

  if (!selectedItem) {
    return null;
  }

  return (
    <>
      <section className="rounded-[30px] border border-[rgba(191,144,118,0.18)] bg-white/94 p-6 shadow-[0_22px_50px_rgba(132,86,58,0.1)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">Checkout</p>
            <h2 className="mt-3 text-[1.9rem] font-bold leading-tight text-[#1d2521]">Choose PayPal payment</h2>
            <p className="mt-2 text-sm leading-6 text-[#5f6b66]">
              Use this payment page only after your sample fee or deposit amount has been confirmed.
            </p>
          </div>
          <div className="rounded-full bg-[rgba(223,124,68,0.1)] px-4 py-2 text-sm font-semibold text-[#0f5f55]">PayPal</div>
        </div>

        <div className="mt-6 grid gap-3">
          {items.map((item) => {
            const active = item.title === selectedTitle;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedTitle(item.title)}
                className={`rounded-[22px] border p-4 text-left transition ${
                  active
                    ? "border-[#df7c44] bg-[#fff2e8] shadow-[0_14px_28px_rgba(223,124,68,0.15)]"
                    : "border-[rgba(191,144,118,0.22)] bg-white hover:border-[#d9a07a]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">{item.tag}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#1d2521]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f6b66]">{item.desc}</p>
                  </div>
                  <p className="text-3xl font-semibold text-[#0f5f55]">${item.amount}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] bg-[linear-gradient(180deg,#fff9f3_0%,#fff0e4_100%)] p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">Order Summary</p>
              <p className="mt-2 text-lg font-semibold text-[#1d2521]">{selectedItem.title}</p>
            </div>
            <p className="text-3xl font-semibold text-[#0f5f55]">${selectedItem.amount}</p>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-[20px] border border-[rgba(191,144,118,0.22)] bg-white p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(223,124,68,0.12)] text-[#0f5f55]">
              <PayPalIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-[#1d2521]">PayPal</p>
              <p className="mt-1 text-sm leading-6 text-[#5f6b66]">
                Open PayPal checkout, then confirm payment on the server before the order is marked as paid.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onProceed}
            className="mt-6 inline-flex w-full items-center justify-center rounded-[18px] bg-[#e67e3d] px-6 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_rgba(230,126,61,0.28)] transition hover:bg-[#d46a29]"
          >
            Pay now
          </button>

          {message ? <p className="mt-4 text-sm leading-6 text-[#b14d2c]">{message}</p> : null}
        </div>
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(32,20,12,0.56)] p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_28px_80px_rgba(42,23,12,0.28)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">PayPal Checkout</p>
                <h3 className="mt-2 text-2xl font-bold text-[#1d2521]">{selectedItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-[rgba(191,144,118,0.2)] px-3 py-1 text-sm text-[#5f6b66]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 rounded-[22px] bg-[linear-gradient(180deg,#fffaf5_0%,#fff1e6_100%)] p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-normal text-[#0f5f55]">Amount</p>
                <p className="text-3xl font-semibold text-[#0f5f55]">${selectedItem.amount}</p>
              </div>
              <div ref={paypalContainerRef} className="mt-5 min-h-[48px]" />
              {!sdkReady ? <p className="mt-3 text-sm text-[#5f6b66]">{loadingLabel}</p> : null}
              {paypalError ? <p className="mt-3 text-sm text-[#b14d2c]">{paypalError}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
