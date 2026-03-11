"use client";

import { FormEvent, useMemo, useState } from "react";

import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";

type Lang = "en" | "zh" | "es";

type ProductInquiryFormProps = {
  productName: string;
  category: string;
};

const copy: Record<
  Lang,
  {
    title: string;
    desc: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    qtyLabel: string;
    messageLabel: string;
    submit: string;
    ready: string;
    submitting: string;
    submitted: string;
    failed: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    qtyPlaceholder: string;
    messagePlaceholder: string;
  }
> = {
  en: {
    title: "Request quotation",
    desc: "Send your target quantity, market, and timeline for this style.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Brand / Company",
    qtyLabel: "Target Quantity",
    messageLabel: "Project Details",
    submit: "Send Inquiry",
    ready: "Ready",
    submitting: "Submitting...",
    submitted: "Submitted",
    failed: "Submission failed",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    companyPlaceholder: "Company",
    qtyPlaceholder: "e.g. 3,000 pcs",
    messagePlaceholder: "Share market, packaging, delivery timing, and product changes."
  },
  zh: {
    title: "立即询盘",
    desc: "提交这款产品的目标数量、销售市场和时间节点。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    companyLabel: "品牌 / 公司",
    qtyLabel: "目标数量",
    messageLabel: "项目说明",
    submit: "发送询盘",
    ready: "待提交",
    submitting: "提交中...",
    submitted: "提交成功",
    failed: "提交失败",
    namePlaceholder: "姓名",
    emailPlaceholder: "邮箱",
    companyPlaceholder: "公司名称",
    qtyPlaceholder: "例如 3000 件",
    messagePlaceholder: "请说明市场、包装、交期以及需要调整的产品细节。"
  },
  es: {
    title: "Solicitar cotizacion",
    desc: "Comparte volumen objetivo, mercado y timing para este producto.",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    companyLabel: "Marca / Empresa",
    qtyLabel: "Cantidad Objetivo",
    messageLabel: "Detalles del Proyecto",
    submit: "Enviar Consulta",
    ready: "Listo",
    submitting: "Enviando...",
    submitted: "Enviado",
    failed: "Error de envio",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo",
    companyPlaceholder: "Empresa",
    qtyPlaceholder: "ej. 3,000 pcs",
    messagePlaceholder: "Comparte mercado, empaque, timing de entrega y cambios del producto."
  }
};

export default function ProductInquiryForm({ productName, category }: ProductInquiryFormProps) {
  const lang = getClientLang();
  const t = copy[lang];
  const defaultMessage = useMemo(
    () =>
      `Product: ${productName}\nCategory: ${category}\nTarget quantity: \nMarket: \nDelivery timing: \nRequested changes: `,
    [category, productName]
  );
  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "",
    message: defaultMessage,
    website: ""
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const payload = {
      name: form.name,
      email: form.email,
      company: form.company,
      message: `${form.message}\nQuantity: ${form.quantity}`.trim(),
      website: form.website
    };

    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setStatus("submitted");
        setForm({
          name: "",
          email: "",
          company: "",
          quantity: "",
          message: defaultMessage,
          website: ""
        });
        return;
      }
    } catch {
      // fall through
    }

    setStatus("failed");
  }

  const statusText =
    status === "ready"
      ? t.ready
      : status === "submitting"
        ? t.submitting
        : status === "submitted"
          ? t.submitted
          : t.failed;

  return (
    <form className="product-inquiry-card" onSubmit={onSubmit}>
      <div>
        <p className="kicker page-reference-subtitle">{t.title}</p>
        <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.desc}</p>
      </div>

      <div className="product-inquiry-grid">
        <label className="contact-field">
          <span className="contact-field-label">{t.nameLabel}</span>
          <input
            className="input"
            placeholder={t.namePlaceholder}
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">{t.emailLabel}</span>
          <input
            className="input"
            type="email"
            placeholder={t.emailPlaceholder}
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">{t.companyLabel}</span>
          <input
            className="input"
            placeholder={t.companyPlaceholder}
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">{t.qtyLabel}</span>
          <input
            className="input"
            placeholder={t.qtyPlaceholder}
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
          />
        </label>
        <label className="contact-field product-inquiry-span">
          <span className="contact-field-label">{t.messageLabel}</span>
          <textarea
            className="input min-h-40"
            placeholder={t.messagePlaceholder}
            required
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
          />
        </label>
      </div>

      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => setForm({ ...form, website: event.target.value })}
      />

      <div className="product-inquiry-actions">
        <button className="btn btn-primary" type="submit">
          {t.submit}
        </button>
        <p className="page-reference-body text-[#9d7d6f]">Status: {statusText}</p>
      </div>
    </form>
  );
}
