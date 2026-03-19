"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

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

type Method = "card" | "paypal";

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

function BankCardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M7.2 4h6.3c2.7 0 4.7 1.8 4.2 4.5-.5 2.9-2.8 4.3-5.7 4.3H9.5l-.9 5.2H5.2L7.2 4Zm3 6.4h2c1.6 0 2.8-.6 3.1-2.1.2-1.2-.6-1.9-2.1-1.9h-2.6l-.4 4Z" />
      <path d="M10.3 9.3h4.4c2.1 0 3.6 1.4 3.2 3.6-.4 2.4-2.4 3.7-4.8 3.7h-1.8l-.6 3.4H7.9l1.1-6.3h2.1c1.3 0 2.5-.4 2.8-1.8.2-1-.5-1.5-1.7-1.5H9.8l.5-1.1Z" opacity=".7" />
    </svg>
  );
}

function MethodOption({
  id,
  checked,
  title,
  desc,
  icon,
  onChange
}: {
  id: Method;
  checked: boolean;
  title: string;
  desc: string;
  icon: ReactNode;
  onChange: (value: Method) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-[20px] border p-4 transition ${
        checked
          ? "border-[#df7c44] bg-[#fff2e8] shadow-[0_14px_28px_rgba(223,124,68,0.15)]"
          : "border-[rgba(191,144,118,0.22)] bg-white hover:border-[#d9a07a]"
      }`}
    >
      <input
        type="radio"
        name="payment-method"
        checked={checked}
        onChange={() => onChange(id)}
        className="h-4 w-4 accent-[#df7c44]"
      />
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(223,124,68,0.12)] text-[#bf6536]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-[#5f3123]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#7d4f3e]">{desc}</p>
      </div>
    </label>
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
  const [selectedMethod, setSelectedMethod] = useState<Method>("paypal");
  const [sdkReady, setSdkReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [paypalError, setPayPalError] = useState("");
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);

  const selectedItem = useMemo(
    () => items.find((item) => item.title === selectedTitle) || items[0],
    [items, selectedTitle]
  );

  useEffect(() => {
    if (!clientId) return;
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
    script.onerror = () => {
      setPendingOpen(false);
      setPayPalError("Failed to load PayPal SDK.");
    };
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [clientId]);

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
      setPayPalError(renderError.message || "Unable to render PayPal button.");
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

    if (selectedMethod === "card") {
      setMessage("Bank card gateway is not connected yet. Please use PayPal for live payment.");
      return;
    }

    if (!clientId) {
      setMessage(missingConfigLabel);
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b56e49]">Checkout</p>
            <h2 className="mt-3 text-[1.9rem] font-bold leading-tight text-[#5f3123]">{"\u8bf7\u9009\u62e9\u652f\u4ed8\u65b9\u5f0f"}</h2>
          </div>
          <div className="rounded-full bg-[rgba(223,124,68,0.1)] px-4 py-2 text-sm font-semibold text-[#bf6536]">USD</div>
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
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">{item.tag}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#5f3123]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#7d4f3e]">{item.desc}</p>
                  </div>
                  <p className="text-3xl font-semibold text-[#8d452d]">${item.amount}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] bg-[linear-gradient(180deg,#fff9f3_0%,#fff0e4_100%)] p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">Order Summary</p>
              <p className="mt-2 text-lg font-semibold text-[#5f3123]">{selectedItem.title}</p>
            </div>
            <p className="text-3xl font-semibold text-[#8d452d]">${selectedItem.amount}</p>
          </div>

          <div className="mt-5 grid gap-3">
            <MethodOption
              id="card"
              checked={selectedMethod === "card"}
              title="Bank Card"
              desc="Reserved for a future card gateway integration."
              icon={<BankCardIcon />}
              onChange={setSelectedMethod}
            />
            <MethodOption
              id="paypal"
              checked={selectedMethod === "paypal"}
              title="PayPal"
              desc="Open PayPal popup verification and confirm payment on the server before marking the order as paid."
              icon={<PayPalIcon />}
              onChange={setSelectedMethod}
            />
          </div>

          <button
            type="button"
            onClick={onProceed}
            className="mt-6 inline-flex w-full items-center justify-center rounded-[18px] bg-[#e67e3d] px-6 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_rgba(230,126,61,0.28)] transition hover:bg-[#d46a29]"
          >
            {"\u7acb\u5373\u652f\u4ed8"}
          </button>

          {message ? <p className="mt-4 text-sm leading-6 text-[#b14d2c]">{message}</p> : null}
        </div>
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(32,20,12,0.56)] p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_28px_80px_rgba(42,23,12,0.28)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">PayPal Checkout</p>
                <h3 className="mt-2 text-2xl font-bold text-[#5f3123]">{selectedItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-[rgba(191,144,118,0.2)] px-3 py-1 text-sm text-[#7d4f3e]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 rounded-[22px] bg-[linear-gradient(180deg,#fffaf5_0%,#fff1e6_100%)] p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b56e49]">Amount</p>
                <p className="text-3xl font-semibold text-[#8d452d]">${selectedItem.amount}</p>
              </div>
              <div ref={paypalContainerRef} className="mt-5 min-h-[48px]" />
              {!sdkReady ? <p className="mt-3 text-sm text-[#7d4f3e]">{loadingLabel}</p> : null}
              {paypalError ? <p className="mt-3 text-sm text-[#b14d2c]">{paypalError}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
