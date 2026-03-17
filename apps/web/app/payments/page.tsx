import type { Metadata } from "next";
import Link from "next/link";

import PayPalPaymentsPanel from "@/components/PayPalPaymentsPanel";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import { buildMetadata } from "@/lib/seo";

type PaymentItem = {
  title: string;
  amount: number;
  desc: string;
  tag: string;
};

const paymentsWideImage = "/media/generated/wide/payments-wide-project-checkpoint.png";

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    intro: string;
    leadTitle: string;
    leadDesc: string;
    items: PaymentItem[];
    noteTitle: string;
    noteBody: string;
    contactCta: string;
    briefTitle: string;
    briefLead: string;
    imageAlt: string;
    paypalLead: string;
    paypalUnavailable: string;
    paypalMissingConfig: string;
  }
> = {
  en: {
    kicker: "Payments",
    title: "Pay sample fees and OEM launch deposits in one dedicated page",
    desc: "Use this page for paid sample confirmation and OEM launch deposits once your product scope, quantity, and delivery stage are defined.",
    intro: "Choose the payment that matches your current project stage and continue with sample setup or launch planning.",
    leadTitle: "Sample fee and launch deposit options",
    leadDesc: "Each payment item maps to a defined stage in sampling or project kickoff.",
    items: [
      { tag: "Sample", title: "Sample Development Fee", amount: 199, desc: "For paid sample confirmation before pattern and material setup." },
      { tag: "Launch", title: "OEM Launch Deposit", amount: 500, desc: "For project kickoff after scope, pricing, and sampling direction are aligned." }
    ],
    noteTitle: "Before you pay",
    noteBody: "Confirm product direction, quantity range, and delivery timing with the team first so the payment matches the project stage.",
    contactCta: "Start a Conversation",
    briefTitle: "Payment Brief",
    briefLead: "Select the stage that matches your project and complete payment for sample development or launch deposit processing.",
    imageAlt: "Wide production line and factory floor",
    paypalLead: "Complete payment directly with PayPal Checkout below.",
    paypalUnavailable: "PayPal is not available on this device or browser.",
    paypalMissingConfig: "PayPal is not configured yet. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID, and PAYPAL_CLIENT_SECRET."
  },
  zh: {
    kicker: "支付",
    title: "在一个独立页面完成打样费与 OEM 启动定金支付",
    desc: "当产品范围、数量区间和交付阶段已经明确后，可以在这里完成付费打样或项目启动定金支付。",
    intro: "选择当前项目对应的付款阶段，继续推进打样准备或 OEM 项目启动。",
    leadTitle: "打样费与启动定金",
    leadDesc: "每个支付项目都对应明确的打样阶段或项目启动阶段。",
    items: [
      { tag: "打样", title: "打样开发费", amount: 199, desc: "用于确认付费打样，并开始版型与面料准备。" },
      { tag: "启动", title: "OEM 启动定金", amount: 500, desc: "用于确认报价、范围和打样方向后的项目启动。" }
    ],
    noteTitle: "付款前",
    noteBody: "付款前请确认品类、数量区间、打样安排和交付时间，确保支付对应当前项目阶段。",
    contactCta: "开始沟通",
    briefTitle: "支付 Brief",
    briefLead: "根据当前项目阶段选择对应金额，完成打样开发费或 OEM 启动定金支付。",
    imageAlt: "生产线与工厂空间横向画面",
    paypalLead: "可直接在下方使用 PayPal Checkout 完成付款。",
    paypalUnavailable: "当前设备或浏览器暂不可用 PayPal。",
    paypalMissingConfig: "PayPal 尚未配置，请补充 NEXT_PUBLIC_PAYPAL_CLIENT_ID、PAYPAL_CLIENT_ID 和 PAYPAL_CLIENT_SECRET。"
  },
  es: {
    kicker: "Pagos",
    title: "Paga muestras y depositos OEM en una pagina dedicada",
    desc: "Usa esta pagina para confirmar muestra pagada y depositos de lanzamiento OEM cuando alcance, volumen y etapa ya estan definidos.",
    intro: "Elige el pago que coincide con tu etapa actual y continua con muestra o lanzamiento del proyecto.",
    leadTitle: "Opciones de muestra y deposito",
    leadDesc: "Cada pago corresponde a una etapa definida de muestreo o arranque del proyecto.",
    items: [
      { tag: "Muestra", title: "Tarifa de Desarrollo de Muestra", amount: 199, desc: "Para confirmar muestra pagada antes de patrón y preparación de materiales." },
      { tag: "Inicio", title: "Depósito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y dirección de muestra ya están claros." }
    ],
    noteTitle: "Antes de pagar",
    noteBody: "Confirma primero categoría, rango de volumen y timing de entrega con el equipo para que el pago coincida con la etapa correcta.",
    contactCta: "Iniciar Conversación",
    briefTitle: "Brief de Pago",
    briefLead: "Selecciona la etapa correcta y completa el pago para desarrollo de muestra o deposito de lanzamiento OEM.",
    imageAlt: "Vista amplia de línea de producción y fábrica",
    paypalLead: "Completa el pago directamente con PayPal Checkout abajo.",
    paypalUnavailable: "PayPal no esta disponible en este dispositivo o navegador.",
    paypalMissingConfig: "PayPal no esta configurado todavia. Agrega NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET."
  }
};

export default function PaymentsPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  return (
    <main className="container-shell page-shell page-stack">
      <section className="dark-band page-hero rounded-[34px] shadow-[0_32px_90px_rgba(121,72,47,0.18)] md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="page-copy-wide">
            <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.kicker}</p>
            <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
            <p className="page-reference-body mt-4 text-[#fff0e5]">{t.desc}</p>
            <p className="page-reference-body mt-4 text-white/75">{t.intro}</p>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#f3d7a1]">{t.kicker}</p>
            <p className="card-title-standard mt-4 text-white/90">{t.leadTitle}</p>
            <p className="page-reference-body mt-3 text-[#fff0e5]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="payment-brief-layout page-section">
        <div className="payment-brief-copy">
          <p className="kicker page-reference-subtitle">{t.briefTitle}</p>
          <h2 className="card-title-standard mt-3 text-[#6a3524]">{t.briefTitle}</h2>
          <p className="page-reference-body page-copy mt-3 text-[#7d4f3e]">{t.briefLead}</p>
          <div className="payment-brief-visual mt-6">
            <img src={paymentsWideImage} alt={t.imageAlt} className="payment-brief-image" />
          </div>
        </div>

        <div>
          <p className="page-reference-body mb-5 text-[#7d4f3e]">{t.paypalLead}</p>
          <PayPalPaymentsPanel
            items={t.items}
            clientId={clientId}
            loadingLabel={lang === "zh" ? "PayPal 按钮加载中..." : lang === "es" ? "Cargando PayPal..." : "Loading PayPal..."}
            unavailableLabel={t.paypalUnavailable}
            missingConfigLabel={t.paypalMissingConfig}
          />
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">{t.noteTitle}</p>
          <p className="page-reference-body mt-3 text-[#7d4f3e]">{t.noteBody}</p>
        </div>
        <Link href="/contact" className="btn btn-soft">
          {t.contactCta}
        </Link>
      </section>
    </main>
  );
}

export const metadata: Metadata = buildMetadata({
  title: "Payments",
  description:
    "Pay sample development fees and OEM launch deposits for YiWu DiYaSi projects once scope, timing, and production stage are confirmed.",
  path: "/payments"
});
