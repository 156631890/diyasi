"use client";

import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";
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
      processLead: string;
      process: string[];
      paymentTitle: string;
      paymentDesc: string;
      paymentCta: string;
      submit: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      companyPlaceholder: string;
      messagePlaceholder: string;
      statusLabel: string;
      statusReady: string;
      statusSubmitting: string;
      statusSubmitted: string;
      statusFailed: string;
      leadTitle: string;
      leadDesc: string;
    }
  > = {
    en: {
      lead: "Contact",
      title: "A calmer first conversation for brands planning their next collection",
      inquiry: "Project Inquiry",
      inquiryDesc: "Share category, quantity range, timing, and product priorities. We come back with clear next steps rather than generic replies.",
      processTitle: "What helps us respond well",
      processLead: "A stronger inquiry usually makes the first response more precise, more useful, and faster to act on.",
      process: ["Target category and fabric direction", "Estimated quantity and market position", "Sample window and launch timing"],
      paymentTitle: "Need to place a sample fee or launch deposit?",
      paymentDesc: "Keep consultation and payment separate. Use the dedicated payments page once scope and stage are already aligned.",
      paymentCta: "Open Payments",
      submit: "Send Inquiry",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      companyPlaceholder: "Company",
      messagePlaceholder: "Describe your project scope",
      statusLabel: "Status",
      statusReady: "Ready",
      statusSubmitting: "Submitting...",
      statusSubmitted: "Submitted",
      statusFailed: "Submission failed",
      leadTitle: "The best inquiries are specific, measured, and honest about stage.",
      leadDesc: "That helps us respond with the right material direction, MOQ logic, and production timing instead of generic sales language."
    },
    zh: {
      lead: "联系",
      title: "为下一季系列，开始一场更清晰也更克制的沟通",
      inquiry: "项目咨询",
      inquiryDesc: "请告诉我们品类、数量区间、时间节点和产品重点，我们会给出更明确的下一步，而不是泛泛而谈。",
      processTitle: "这些信息会帮助我们更快判断",
      processLead: "更完整的询盘，通常会带来更准确、更有用，也更容易推进的第一轮回应。",
      process: ["目标品类与面料方向", "预估数量与市场定位", "打样窗口与上市时间"],
      paymentTitle: "如果需要支付打样费或启动定金",
      paymentDesc: "请把咨询和支付动作分开。只有在范围和阶段已经明确后，再进入支付页面。",
      paymentCta: "前往支付",
      submit: "发送咨询",
      namePlaceholder: "姓名",
      emailPlaceholder: "邮箱",
      companyPlaceholder: "公司名称",
      messagePlaceholder: "请描述你的项目范围",
      statusLabel: "状态",
      statusReady: "待提交",
      statusSubmitting: "提交中...",
      statusSubmitted: "提交成功",
      statusFailed: "提交失败",
      leadTitle: "最好的询盘通常具体、克制，并且对项目阶段足够诚实。",
      leadDesc: "这样我们才能围绕面料方向、MOQ 判断和交付节奏给出真正有用的回应，而不是标准销售话术。"
    },
    es: {
      lead: "Contacto",
      title: "Una primera conversación más clara y más serena para tu próxima colección",
      inquiry: "Consulta de Proyecto",
      inquiryDesc: "Comparte categoría, rango de volumen, timing y prioridades del producto. Respondemos con siguientes pasos claros, no con lenguaje genérico.",
      processTitle: "Qué nos ayuda a responder mejor",
      processLead: "Una consulta mejor planteada suele traer una primera respuesta más precisa, más útil y más fácil de convertir en acción.",
      process: ["Categoría objetivo y dirección textil", "Volumen estimado y posición de mercado", "Ventana de muestra y fecha de lanzamiento"],
      paymentTitle: "¿Necesitas pagar muestra o depósito?",
      paymentDesc: "Separa consulta y pago. Usa la página de pagos solo cuando alcance y etapa ya estén claros.",
      paymentCta: "Abrir Pagos",
      submit: "Enviar Consulta",
      namePlaceholder: "Nombre",
      emailPlaceholder: "Correo",
      companyPlaceholder: "Empresa",
      messagePlaceholder: "Describe el alcance de tu proyecto",
      statusLabel: "Estado",
      statusReady: "Listo",
      statusSubmitting: "Enviando...",
      statusSubmitted: "Enviado",
      statusFailed: "Error de envío",
      leadTitle: "Las mejores consultas son específicas, medidas y honestas sobre la etapa real del proyecto.",
      leadDesc: "Eso nos permite responder con criterio sobre material, MOQ y timing, en lugar de lenguaje comercial genérico."
    }
  };

  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    setLang(getClientLang());
  }, []);
  const t = copy[lang];

  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });

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
            <p className="mt-4 text-lg leading-8 text-[#44546d]">{t.leadTitle}</p>
            <p className="mt-3 text-[#5d6e89] leading-8">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="contact-layout mt-10">
        <div className="contact-panel">
          <div className="contact-inquiry-grid">
            <div className="contact-inquiry-copy">
              <p className="kicker">{t.inquiry}</p>
              <h2 className="heading-font mt-3 text-4xl font-semibold text-[#122744]">{t.inquiry}</h2>
              <p className="mt-3 text-[#556681] leading-8">{t.inquiryDesc}</p>

              <div className="contact-process-block">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.processTitle}</p>
                <p className="mt-3 text-[#44546d] leading-8">{t.processLead}</p>
                <div className="mt-5 grid gap-3">
                  {t.process.map((item, index) => (
                    <div key={item} className="contact-process-item">
                      <p className="contact-process-index">{String(index + 1).padStart(2, "0")}</p>
                      <p className="contact-process-copy">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form className="contact-form-card" onSubmit={onSubmit}>
              <div className="contact-form-grid">
                <input className="input" placeholder={t.namePlaceholder} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="input" placeholder={t.emailPlaceholder} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="input contact-form-span" placeholder={t.companyPlaceholder} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <textarea className="input min-h-40 contact-form-span" placeholder={t.messagePlaceholder} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              <div className="contact-form-actions">
                <button className="btn btn-primary" type="submit">{t.submit}</button>
                <p className="text-sm text-slate-500">{t.statusLabel}: {statusText}</p>
              </div>
            </form>
          </div>
        </div>

        <aside className="contact-sideband">
          <p className="kicker">{t.paymentTitle}</p>
          <p className="mt-3 text-lg leading-8 text-[#d9e4f4]">{t.paymentDesc}</p>
          <div className="mt-6">
            <Link href="/payments" className="btn bg-white text-[#102949]">{t.paymentCta}</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
