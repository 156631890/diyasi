"use client";

import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "zh" | "es";
const contactWideImage = "/media/generated/wide/contact-wide-brief-floor.png";

export default function ContactPage() {
  const copy: Record<
    Lang,
    {
      lead: string;
      title: string;
      inquiry: string;
      inquiryDesc: string;
      inquiryNote: string;
      processTitle: string;
      processLead: string;
      process: string[];
      formTitle: string;
      formLead: string;
      paymentTitle: string;
      paymentDesc: string;
      paymentCta: string;
      submit: string;
      nameLabel: string;
      emailLabel: string;
      companyLabel: string;
      messageLabel: string;
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
      visualTitle: string;
      visualBody: string;
      visualMetrics: Array<{ value: string; label: string }>;
      visualImageAlt: string;
    }
  > = {
    en: {
      lead: "Contact",
      title: "A calmer first conversation for brands planning their next collection",
      inquiry: "Project Inquiry",
      inquiryDesc: "Share category, quantity range, timing, and product priorities. We come back with clear next steps rather than generic replies.",
      inquiryNote: "A concise brief usually shortens the distance between first contact and useful action.",
      processTitle: "What helps us respond well",
      processLead: "A stronger inquiry usually makes the first response more precise, more useful, and faster to act on.",
      process: ["Target category and fabric direction", "Estimated quantity and market position", "Sample window and launch timing"],
      formTitle: "Brief Form",
      formLead: "Keep it measured. A focused brief is more useful than a long message with no decision points.",
      paymentTitle: "Need to place a sample fee or launch deposit?",
      paymentDesc: "Keep consultation and payment separate. Use the dedicated payments page once scope and stage are already aligned.",
      paymentCta: "Open Payments",
      submit: "Send Inquiry",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Brand / Company",
      messageLabel: "Project Scope",
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
      leadDesc: "That helps us respond with the right material direction, MOQ logic, and production timing instead of generic sales language.",
      visualTitle: "The first conversation should already feel like product direction.",
      visualBody: "Good briefs create momentum because they remove guesswork from category, timing, and next-step decisions.",
      visualMetrics: [
        { value: "5-7", label: "days to first sample direction" },
        { value: "20-30", label: "days for stable bulk timing" }
      ],
      visualImageAlt: "Brand development floor and showroom"
    },
    zh: {
      lead: "联系",
      title: "为下一季系列，开始一场更清晰也更克制的沟通",
      inquiry: "项目咨询",
      inquiryDesc: "请告诉我们品类、数量区间、时间节点和产品重点，我们会给出更明确的下一步，而不是泛泛而谈。",
      inquiryNote: "更简洁但更清楚的 brief，通常能更快把第一次联系转成真正有用的推进。",
      processTitle: "这些信息会帮助我们更快判断",
      processLead: "更完整的询盘，通常会带来更准确、更有用，也更容易推进的第一轮回应。",
      process: ["目标品类与面料方向", "预估数量与市场定位", "打样窗口与上市时间"],
      formTitle: "项目 Brief",
      formLead: "保持克制。一个有重点的 brief，通常比一段没有判断点的长描述更有用。",
      paymentTitle: "如果需要支付打样费或启动定金",
      paymentDesc: "请把咨询和支付动作分开。只有在范围和阶段已经明确后，再进入支付页面。",
      paymentCta: "前往支付",
      submit: "发送咨询",
      nameLabel: "姓名",
      emailLabel: "邮箱",
      companyLabel: "品牌 / 公司",
      messageLabel: "项目范围",
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
      leadDesc: "这样我们才能围绕面料方向、MOQ 判断和交付节奏给出真正有用的回应，而不是标准销售话术。",
      visualTitle: "第一次沟通，也应该已经带有产品方向感。",
      visualBody: "好的 brief 之所以重要，是因为它能让品类、时间和下一步动作更少猜测、更多判断。",
      visualMetrics: [
        { value: "5-7", label: "天进入首轮打样方向" },
        { value: "20-30", label: "天进入稳定大货节奏" }
      ],
      visualImageAlt: "品牌开发与展示空间"
    },
    es: {
      lead: "Contacto",
      title: "Una primera conversación más clara y más serena para tu próxima colección",
      inquiry: "Consulta de Proyecto",
      inquiryDesc: "Comparte categoría, rango de volumen, timing y prioridades del producto. Respondemos con siguientes pasos claros, no con lenguaje genérico.",
      inquiryNote: "Un brief más claro y más corto suele convertir el primer contacto en una acción útil con menos fricción.",
      processTitle: "Qué nos ayuda a responder mejor",
      processLead: "Una consulta mejor planteada suele traer una primera respuesta más precisa, más útil y más fácil de convertir en acción.",
      process: ["Categoría objetivo y dirección textil", "Volumen estimado y posición de mercado", "Ventana de muestra y fecha de lanzamiento"],
      formTitle: "Brief del Proyecto",
      formLead: "Mantenlo medido. Un brief enfocado suele servir más que un mensaje largo sin puntos claros de decisión.",
      paymentTitle: "¿Necesitas pagar muestra o depósito?",
      paymentDesc: "Separa consulta y pago. Usa la página de pagos solo cuando alcance y etapa ya estén claros.",
      paymentCta: "Abrir Pagos",
      submit: "Enviar Consulta",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      companyLabel: "Marca / Empresa",
      messageLabel: "Alcance del Proyecto",
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
      leadDesc: "Eso nos permite responder con criterio sobre material, MOQ y timing, en lugar de lenguaje comercial genérico.",
      visualTitle: "La primera conversación ya debería sentirse como dirección de producto.",
      visualBody: "Un buen brief genera tracción porque reduce la incertidumbre en categoría, timing y próxima decisión.",
      visualMetrics: [
        { value: "5-7", label: "días hacia la primera muestra" },
        { value: "20-30", label: "días para ritmo estable de producción" }
      ],
      visualImageAlt: "Espacio de desarrollo y showroom de marca"
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
            <p className="kicker page-reference-subtitle">{t.lead}</p>
            <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.processTitle}</p>
            <p className="page-reference-subtitle mt-4 text-[#44546d]">{t.leadTitle}</p>
            <p className="page-reference-body mt-3 text-[#5d6e89]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="contact-layout mt-10">
        <div className="contact-panel">
          <div className="contact-inquiry-grid">
            <div className="contact-inquiry-copy">
              <p className="kicker page-reference-subtitle">{t.inquiry}</p>
              <h2 className="page-reference-subtitle mt-3 text-[#122744]">{t.inquiry}</h2>
              <p className="page-reference-body mt-3 text-[#556681]">{t.inquiryDesc}</p>
              <p className="contact-inquiry-note">{t.inquiryNote}</p>

              <div className="contact-visual-anchor">
                <div className="contact-visual-copy">
                  <p className="contact-visual-kicker">Brief</p>
                  <h3 className="page-reference-subtitle text-white">{t.visualTitle}</h3>
                  <p className="page-reference-body mt-4 text-[#d7e2f1]">{t.visualBody}</p>
                </div>
                <div className="contact-visual-image-shell">
                  <img src={contactWideImage} alt={t.visualImageAlt} className="contact-visual-image" />
                </div>
                <div className="contact-visual-metrics">
                  {t.visualMetrics.map((item) => (
                    <div key={item.label} className="contact-visual-metric">
                      <p className="contact-visual-value">{item.value}</p>
                      <p className="contact-visual-label">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-process-block">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.processTitle}</p>
                <p className="page-reference-body mt-3 text-[#44546d]">{t.processLead}</p>
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
              <div className="contact-form-head">
                <p className="kicker page-reference-subtitle">{t.formTitle}</p>
                <p className="page-reference-body mt-3 text-[#44546d]">{t.formLead}</p>
              </div>
              <div className="contact-form-grid">
                <label className="contact-field">
                  <span className="contact-field-label">{t.nameLabel}</span>
                  <input className="input" placeholder={t.namePlaceholder} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label className="contact-field">
                  <span className="contact-field-label">{t.emailLabel}</span>
                  <input className="input" placeholder={t.emailPlaceholder} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
                <label className="contact-field contact-form-span">
                  <span className="contact-field-label">{t.companyLabel}</span>
                  <input className="input" placeholder={t.companyPlaceholder} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </label>
                <label className="contact-field contact-form-span">
                  <span className="contact-field-label">{t.messageLabel}</span>
                  <textarea className="input min-h-40" placeholder={t.messagePlaceholder} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </label>
              </div>
              <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              <div className="contact-form-actions">
                <button className="btn btn-primary" type="submit">{t.submit}</button>
                <p className="text-sm text-slate-500">{t.statusLabel}: {statusText}</p>
              </div>
            </form>
          </div>
        </div>

        <section className="contact-payment-band">
          <div>
            <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.paymentTitle}</p>
            <h2 className="page-reference-subtitle mt-3 text-white">{t.paymentTitle}</h2>
            <p className="page-reference-body mt-3 max-w-2xl text-[#d9e4f4]">{t.paymentDesc}</p>
          </div>
          <div className="contact-payment-actions">
            <Link href="/payments" className="btn bg-white text-[#102949]">{t.paymentCta}</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
