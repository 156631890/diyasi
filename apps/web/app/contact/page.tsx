"use client";

import BuyNowButton from "@/components/BuyNowButton";
import { API_BASE } from "@/lib/api";
import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "zh" | "es";

export default function ContactPage() {
  const copy: Record<
    Lang,
    {
      title: string;
      inquiry: string;
      inquiryDesc: string;
      quick: string;
      quickDesc: string;
      submit: string;
      statusReady: string;
      statusSubmitting: string;
      statusSubmitted: string;
      statusFailed: string;
    }
  > = {
    en: {
      title: "Start your next collection with a dependable manufacturing team",
      inquiry: "Project Inquiry",
      inquiryDesc: "Share product category, target quantity, launch timeline, and quality goals. We reply within 24 hours.",
      quick: "Payment Framework",
      quickDesc: "The checkout framework is ready. You can connect Stripe, PayPal, or other gateways in the next step.",
      submit: "Submit Inquiry",
      statusReady: "Ready",
      statusSubmitting: "Submitting...",
      statusSubmitted: "Submitted",
      statusFailed: "Submission failed"
    },
    zh: {
      title: "与可靠制造团队合作，启动你的下一季产品线",
      inquiry: "项目咨询",
      inquiryDesc: "请填写品类、目标数量、上线时间与质量要求。我们将在 24 小时内回复。",
      quick: "支付框架",
      quickDesc: "独立站支付框架已完成，下一步可接入 Stripe、PayPal 等网关。",
      submit: "提交咨询",
      statusReady: "待提交",
      statusSubmitting: "提交中...",
      statusSubmitted: "提交成功",
      statusFailed: "提交失败"
    },
    es: {
      title: "Inicia tu siguiente coleccion con un equipo de manufactura confiable",
      inquiry: "Consulta de Proyecto",
      inquiryDesc: "Comparte categoria, cantidad objetivo, calendario y requisitos de calidad. Respondemos en 24 horas.",
      quick: "Framework de Pago",
      quickDesc: "El framework de checkout ya esta listo. Puedes conectar Stripe, PayPal u otra pasarela despues.",
      submit: "Enviar Consulta",
      statusReady: "Listo",
      statusSubmitting: "Enviando...",
      statusSubmitted: "Enviado",
      statusFailed: "Error de envio"
    }
  };

  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)site_lang=([^;]+)/);
    const value = match?.[1] || "";
    if (value.startsWith("zh")) {
      setLang("zh");
      return;
    }
    if (value.startsWith("es")) {
      setLang("es");
      return;
    }
    setLang("en");
  }, []);
  const t = copy[lang];

  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: ""
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const response = await fetch(`${API_BASE}/inquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      setStatus("submitted");
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } else {
      setStatus("failed");
    }
  }

  const statusText =
    status === "ready"
      ? t.statusReady
      : status === "submitting"
        ? t.statusSubmitting
        : status === "submitted"
          ? t.statusSubmitted
          : t.statusFailed;

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10">
        <p className="kicker">Contact</p>
        <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="heading-font text-4xl font-semibold text-[#122744]">{t.inquiry}</h2>
          <p className="mt-2 text-[#556681]">{t.inquiryDesc}</p>
          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            <input
              className="input"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="input"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <textarea
              className="input min-h-32"
              placeholder="Describe your project scope"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <input
              type="text"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
            <button className="btn btn-primary" type="submit">
              {t.submit}
            </button>
            <p className="text-sm text-slate-500">Status: {statusText}</p>
          </form>
        </div>

        <div className="card p-6">
          <h2 className="heading-font text-4xl font-semibold text-[#122744]">{t.quick}</h2>
          <p className="mt-2 text-[#556681]">{t.quickDesc}</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Sample Development Fee</p>
              <p className="heading-font text-3xl font-semibold text-[#102949]">$199</p>
              <div className="mt-3">
                <BuyNowButton title="Sample Development Fee" unitAmountUsd={199} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">OEM Launch Deposit</p>
              <p className="heading-font text-3xl font-semibold text-[#102949]">$500</p>
              <div className="mt-3">
                <BuyNowButton title="OEM Launch Deposit" unitAmountUsd={500} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
