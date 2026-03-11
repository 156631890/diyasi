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
      title: "Contact our factory for sampling, OEM / ODM, and bulk production planning",
      inquiry: "Project Inquiry",
      inquiryDesc: "Share category, quantity range, timing, and product priorities. We come back with clear next steps rather than generic replies.",
      inquiryNote: "Include category, target quantity, timing, and price range so we can reply with sample and production options.",
      processTitle: "Project details we need",
      processLead: "Share the core commercial details below so we can prepare the right sample path and delivery plan.",
      process: ["Target category and fabric direction", "Estimated quantity and market position", "Sample window and launch timing"],
      formTitle: "Brief Form",
      formLead: "Tell us the product category, quantity range, target market, and launch timing.",
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
      leadTitle: "Send a clear brief and we will respond with sample, MOQ, and lead-time details.",
      leadDesc: "Our team replies around material direction, quantity structure, sampling plan, and production timing for your project.",
      visualTitle: "From first inquiry to sample planning",
      visualBody: "A clear inquiry helps us move directly into category review, sample arrangement, and delivery scheduling.",
      visualMetrics: [
        { value: "5-7", label: "days to first sample direction" },
        { value: "20-30", label: "days for stable bulk timing" }
      ],
      visualImageAlt: "Brand development floor and showroom"
    },
    zh: {
      lead: "联系",
      title: "联系工厂，沟通打样、OEM / ODM 与大货计划",
      inquiry: "项目咨询",
      inquiryDesc: "请告诉我们品类、数量区间、时间节点和产品重点，我们会给出更明确的下一步，而不是泛泛而谈。",
      inquiryNote: "请附上品类、目标数量、时间节点和价格区间，方便我们回复打样与生产方案。",
      processTitle: "我们需要的项目信息",
      processLead: "把下面这些商业信息说明白，我们就能更快安排样品路径和交付节奏。",
      process: ["目标品类与面料方向", "预估数量与市场定位", "打样窗口与上市时间"],
      formTitle: "项目 Brief",
      formLead: "请直接填写产品品类、数量区间、目标市场和上市时间。",
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
      leadTitle: "提交清晰 brief，我们会回复打样、MOQ 和交期安排。",
      leadDesc: "团队会围绕面料方向、数量结构、打样计划和生产时间给出具体回复。",
      visualTitle: "从第一次询盘进入打样计划",
      visualBody: "清楚的项目信息可以让我们直接进入品类评估、样品安排和交付排期。",
      visualMetrics: [
        { value: "5-7", label: "天进入首轮打样方向" },
        { value: "20-30", label: "天进入稳定大货节奏" }
      ],
      visualImageAlt: "品牌开发与展示空间"
    },
    es: {
      lead: "Contacto",
      title: "Contacta la fabrica para muestreo, OEM / ODM y planificacion de produccion",
      inquiry: "Consulta de Proyecto",
      inquiryDesc: "Comparte categoría, rango de volumen, timing y prioridades del producto. Respondemos con siguientes pasos claros, no con lenguaje genérico.",
      inquiryNote: "Incluye categoria, cantidad objetivo, timing y rango de precio para responder con plan de muestra y produccion.",
      processTitle: "Datos del proyecto que necesitamos",
      processLead: "Comparte estos datos comerciales para preparar la ruta de muestra y el plan de entrega correctos.",
      process: ["Categoría objetivo y dirección textil", "Volumen estimado y posición de mercado", "Ventana de muestra y fecha de lanzamiento"],
      formTitle: "Brief del Proyecto",
      formLead: "Indica categoria, volumen estimado, mercado objetivo y fecha de lanzamiento.",
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
      leadTitle: "Envia un brief claro y responderemos con muestra, MOQ y lead time.",
      leadDesc: "El equipo responde sobre direccion de material, estructura de volumen, plan de muestreo y timing de produccion.",
      visualTitle: "De la primera consulta al plan de muestra",
      visualBody: "Un brief claro nos permite pasar directo a revision de categoria, muestra y programacion de entrega.",
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
            <h1 className="section-title mt-2 text-[#6a3524]">{t.title}</h1>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.processTitle}</p>
            <p className="page-reference-subtitle mt-4 text-[#6a3524]">{t.leadTitle}</p>
            <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="contact-layout mt-10">
        <div className="contact-panel">
          <div className="contact-inquiry-grid">
            <div className="contact-inquiry-copy">
              <p className="kicker page-reference-subtitle">{t.inquiry}</p>
              <h2 className="page-reference-subtitle mt-3 text-[#6a3524]">{t.inquiry}</h2>
              <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.inquiryDesc}</p>
              <p className="contact-inquiry-note">{t.inquiryNote}</p>

              <div className="contact-visual-anchor">
                <div className="contact-visual-copy">
                  <p className="contact-visual-kicker">Brief</p>
                  <h3 className="page-reference-subtitle text-white">{t.visualTitle}</h3>
                  <p className="page-reference-body mt-4 text-[#f3dfd3]">{t.visualBody}</p>
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
                <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.processLead}</p>
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
                <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.formLead}</p>
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
                <p className="text-sm text-[#9d7d6f]">{t.statusLabel}: {statusText}</p>
              </div>
            </form>
          </div>
        </div>

        <section className="contact-payment-band">
          <div>
            <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.paymentTitle}</p>
            <h2 className="page-reference-subtitle mt-3 text-white">{t.paymentTitle}</h2>
            <p className="page-reference-body mt-3 max-w-2xl text-[#f3dfd3]">{t.paymentDesc}</p>
          </div>
          <div className="contact-payment-actions">
            <Link href="/payments" className="btn bg-white text-[#8d452d]">{t.paymentCta}</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
