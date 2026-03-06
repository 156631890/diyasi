"use client";

import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "zh" | "es";

export default function ContactPage() {
  const copy: Record<
    Lang,
    {
      lead: string;
      title: string;
      inquiry: string;
      inquiryDesc: string;
      processTitle: string;
      process: string[];
      paymentTitle: string;
      paymentDesc: string;
      paymentCta: string;
      submit: string;
      statusReady: string;
      statusSubmitting: string;
      statusSubmitted: string;
      statusFailed: string;
    }
  > = {
    en: {
      lead: "Contact",
      title: "Start your next collection with a dependable manufacturing team",
      inquiry: "Project Inquiry",
      inquiryDesc: "Share product category, target quantity, launch timeline, and quality goals. We reply within 24 hours.",
      processTitle: "What to send us",
      process: [
        "Target category and fabric direction",
        "Estimated quantity and target market",
        "Sample timing and launch window"
      ],
      paymentTitle: "Need to pay a sample fee or launch deposit?",
      paymentDesc: "Use the dedicated payments page so contact stays focused on consultation and project scoping.",
      paymentCta: "Open Payments Page",
      submit: "Submit Inquiry",
      statusReady: "Ready",
      statusSubmitting: "Submitting...",
      statusSubmitted: "Submitted",
      statusFailed: "Submission failed"
    },
    zh: {
      lead: "联系",
      title: "与稳定可靠的制造团队合作，开启你的下一季产品线",
      inquiry: "项目咨询",
      inquiryDesc: "请填写目标品类、预估数量、上线时间与质量要求。我们会在 24 小时内回复。",
      processTitle: "建议提供的信息",
      process: ["目标品类与面料方向", "预估数量与目标市场", "打样时间与上市节点"],
      paymentTitle: "如需支付打样费或启动定金",
      paymentDesc: "请前往独立支付页面，让联系页专注于项目沟通和需求确认。",
      paymentCta: "打开支付页面",
      submit: "提交咨询",
      statusReady: "待提交",
      statusSubmitting: "提交中...",
      statusSubmitted: "提交成功",
      statusFailed: "提交失败"
    },
    es: {
      lead: "Contacto",
      title: "Inicia tu siguiente coleccion con un equipo de manufactura confiable",
      inquiry: "Consulta de Proyecto",
      inquiryDesc: "Comparte categoria, cantidad objetivo, calendario y requisitos de calidad. Respondemos en 24 horas.",
      processTitle: "Que debemos recibir",
      process: [
        "Categoria objetivo y direccion de tejido",
        "Volumen estimado y mercado objetivo",
        "Tiempo de muestra y fecha de lanzamiento"
      ],
      paymentTitle: "Necesitas pagar muestra o deposito?",
      paymentDesc: "Usa la pagina de pagos dedicada para que contacto se mantenga enfocado en consulta y alcance del proyecto.",
      paymentCta: "Abrir Pagos",
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
    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setStatus("submitted");
        setForm({ name: "", email: "", company: "", message: "", website: "" });
        return;
      }
    } catch {
      // fall through to failed state
    }
    setStatus("failed");
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
      <section className="hero-panel overflow-hidden p-7 md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="kicker">{t.lead}</p>
            <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.processTitle}</p>
            <div className="mt-4 space-y-3">
              {t.process.map((item, index) => (
                <div key={item} className="contact-point">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-layout mt-10">
        <div className="contact-panel">
          <h2 className="heading-font text-4xl font-semibold text-[#122744]">{t.inquiry}</h2>
          <p className="mt-2 text-[#556681]">{t.inquiryDesc}</p>
          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            <input className="input" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="input" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <textarea className="input min-h-32" placeholder="Describe your project scope" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <button className="btn btn-primary" type="submit">
              {t.submit}
            </button>
            <p className="text-sm text-slate-500">Status: {statusText}</p>
          </form>
        </div>

        <aside className="contact-sideband">
          <p className="kicker">{t.paymentTitle}</p>
          <p className="mt-3 text-lg leading-8 text-[#d9e4f4]">{t.paymentDesc}</p>
          <div className="mt-6">
            <Link href="/payments" className="btn bg-white text-[#102949]">
              {t.paymentCta}
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
