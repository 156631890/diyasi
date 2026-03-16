"use client";

import { FormEvent, useEffect, useState } from "react";

import { API_BASE } from "@/lib/api";
import { getClientLang } from "@/lib/client-lang";

type Lang = "en" | "zh" | "es";

const mapEmbedUrl =
  "https://www.google.com/maps?q=NO%2016%20DaShi%20Road%2C%20FoTang%20Town%2C%20Yiwu%2C%20Zhejiang%2C%20China&z=15&output=embed";

export default function ContactPage() {
  const copy: Record<
    Lang,
    {
      lead: string;
      title: string;
      intro: string;
      ctaLead: string;
      ctaTitle: string;
      ctaLines: string[];
      company: string;
      companyLabel: string;
      addressLabel: string;
      addressLines: string[];
      emailLabel: string;
      mobileLabel: string;
      formTitle: string;
      formIntro: string;
      submit: string;
      nameLabel: string;
      emailFieldLabel: string;
      companyFieldLabel: string;
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
    }
  > = {
    en: {
      lead: "Contact Us",
      title: "Talk to our factory team about sampling, OEM / ODM, and production planning",
      intro:
        "Use this page the same way buyers contact a factory directly: review the core company details first, then send a clear inquiry with category, quantity, and timeline.",
      ctaLead: "GET IN TOUCH",
      ctaTitle: "Don't wait to grow your brand.",
      ctaLines: [
        "Contact us NOW for a quick quote and sampling consultation.",
        "Please complete the form below, and our project manager will get back to you within 18 hours."
      ],
      company: "YiWu DiYaSi Dress Co.. LTD",
      companyLabel: "Company",
      addressLabel: "Company Adderss / Manufacturing Locations",
      addressLines: ["NO 16 DaShi Road, FoTang Town, Yiwu, Zhejiang", "China"],
      emailLabel: "Email",
      mobileLabel: "Mobie / WhatsApp",
      formTitle: "Send Your Inquiry",
      formIntro:
        "Tell us what you need and we will respond with MOQ, sample timing, and production guidance instead of a generic reply.",
      submit: "Submit",
      nameLabel: "Name",
      emailFieldLabel: "Email",
      companyFieldLabel: "Company Name",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      companyPlaceholder: "Your company",
      messagePlaceholder: "Tell us the product category, quantity, fabric direction, and delivery timing.",
      statusLabel: "Status",
      statusReady: "Ready",
      statusSubmitting: "Submitting...",
      statusSubmitted: "Submitted",
      statusFailed: "Submission failed"
    },
    zh: {
      lead: "联系我们",
      title: "与工厂团队直接沟通打样、OEM / ODM 与生产计划",
      intro: "这个页面按外贸工厂常见联系页重做，先展示核心公司信息，再提交明确询盘。",
      ctaLead: "GET IN TOUCH",
      ctaTitle: "Don't wait to grow your brand.",
      ctaLines: [
        "Contact us NOW for a quick quote and sampling consultation.",
        "Please complete the form below, and our project manager will get back to you within 18 hours."
      ],
      company: "YiWu DiYaSi Dress Co.. LTD",
      companyLabel: "公司名称",
      addressLabel: "公司地址 / 生产地址",
      addressLines: ["NO 16 DaShi Road, FoTang Town, Yiwu, Zhejiang", "China"],
      emailLabel: "邮箱",
      mobileLabel: "手机 / WhatsApp",
      formTitle: "发送询盘",
      formIntro: "请直接写明品类、数量、面料方向与交期，我们会回复 MOQ、打样和生产建议。",
      submit: "提交",
      nameLabel: "姓名",
      emailFieldLabel: "邮箱",
      companyFieldLabel: "公司名称",
      messageLabel: "留言内容",
      namePlaceholder: "请输入姓名",
      emailPlaceholder: "请输入邮箱",
      companyPlaceholder: "请输入公司名称",
      messagePlaceholder: "请填写产品品类、数量、面料方向与交期要求。",
      statusLabel: "状态",
      statusReady: "待提交",
      statusSubmitting: "提交中...",
      statusSubmitted: "提交成功",
      statusFailed: "提交失败"
    },
    es: {
      lead: "Contacto",
      title: "Habla con nuestra fabrica sobre muestras, OEM / ODM y planificacion de produccion",
      intro:
        "La pagina sigue la estructura de contacto de una fabrica exportadora: primero los datos clave de la empresa y luego un formulario de consulta claro.",
      ctaLead: "GET IN TOUCH",
      ctaTitle: "Don't wait to grow your brand.",
      ctaLines: [
        "Contact us NOW for a quick quote and sampling consultation.",
        "Please complete the form below, and our project manager will get back to you within 18 hours."
      ],
      company: "YiWu DiYaSi Dress Co.. LTD",
      companyLabel: "Empresa",
      addressLabel: "Direccion de empresa / ubicacion de fabrica",
      addressLines: ["NO 16 DaShi Road, FoTang Town, Yiwu, Zhejiang", "China"],
      emailLabel: "Email",
      mobileLabel: "Movil / WhatsApp",
      formTitle: "Enviar Consulta",
      formIntro:
        "Indica categoria, volumen, direccion textil y timing. Responderemos con MOQ, muestra y plan de produccion.",
      submit: "Enviar",
      nameLabel: "Nombre",
      emailFieldLabel: "Email",
      companyFieldLabel: "Empresa",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu email",
      companyPlaceholder: "Tu empresa",
      messagePlaceholder: "Comparte categoria, volumen, tejido y plazo de entrega.",
      statusLabel: "Estado",
      statusReady: "Listo",
      statusSubmitting: "Enviando...",
      statusSubmitted: "Enviado",
      statusFailed: "Error de envio"
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
      // fall through
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
    <main className="container-shell page-shell page-stack">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[30px] border border-[rgba(191,144,118,0.24)] bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(249,239,230,0.94))] shadow-[0_24px_56px_rgba(132,86,58,0.12)]">
          <div className="border-b border-[rgba(191,144,118,0.2)] px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b06a46]">Google Maps</p>
            <p className="mt-2 text-lg font-semibold text-[#5f3123]">{t.addressLabel}</p>
          </div>
          <div className="h-[320px] md:h-[420px]">
            <iframe
              title="YiWu DiYaSi map"
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form
          className="rounded-[30px] border border-[rgba(191,144,118,0.24)] bg-[linear-gradient(180deg,rgba(255,252,248,0.99),rgba(250,240,231,0.98))] p-6 shadow-[0_24px_56px_rgba(132,86,58,0.12)] md:p-8"
          onSubmit={onSubmit}
        >
          <div className="border-b border-[rgba(191,144,118,0.2)] pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b06a46]">{t.lead}</p>
            <h2 className="mt-2 text-[1.9rem] font-bold leading-tight text-[#5f3123]">{t.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[#7d4f3e]">{t.formIntro}</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7d6f]">{t.nameLabel}</span>
              <input
                className="input"
                placeholder={t.namePlaceholder}
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7d6f]">{t.emailFieldLabel}</span>
              <input
                className="input"
                placeholder={t.emailPlaceholder}
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7d6f]">{t.companyFieldLabel}</span>
              <input
                className="input"
                placeholder={t.companyPlaceholder}
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d7d6f]">{t.messageLabel}</span>
              <textarea
                className="input min-h-48"
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

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button className="btn btn-primary min-w-[160px]" type="submit">
              {t.submit}
            </button>
            <p className="text-sm text-[#9d7d6f]">
              {t.statusLabel}: {statusText}
            </p>
          </div>
        </form>
      </section>

      <section className="hero-panel overflow-hidden rounded-[34px] md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="kicker page-reference-subtitle">{t.ctaLead || t.lead}</p>
            <h1 className="section-title mt-2 text-[#6a3524]">{t.ctaTitle || t.title}</h1>
            <div className="mt-4 max-w-3xl space-y-3">
              {(t.ctaLines?.length ? t.ctaLines : [t.intro]).map((line) => (
                <p key={line} className="page-reference-body text-[#7d4f3e]">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] border border-[rgba(191,144,118,0.28)] bg-[rgba(255,251,246,0.96)] p-5 shadow-[0_20px_44px_rgba(143,91,62,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b06a46]">{t.companyLabel}</p>
            <p className="mt-3 text-[1.4rem] font-bold leading-tight text-[#5f3123]">{t.company}</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#7d4f3e]">
              <div>
                <p className="font-semibold text-[#b06a46]">{t.addressLabel}</p>
                {t.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-[#b06a46]">{t.emailLabel}</p>
                <p>
                  <a href="mailto:imbella.annie@diyasidress.com" className="hover:text-[#b15d39]">
                    imbella.annie@diyasidress.com
                  </a>
                </p>
                <p>
                  <a href="mailto:imbella.vicky@diyasidress.com" className="hover:text-[#b15d39]">
                    imbella.vicky@diyasidress.com
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#b06a46]">{t.mobileLabel}</p>
                <p>
                  <a href="tel:+8618042579030" className="hover:text-[#b15d39]">
                    +86 18042579030
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
