import BuyNowButton from "@/components/BuyNowButton";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

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
    amountLabel: string;
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
    amountLabel: "Amount"
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
    amountLabel: "金额"
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
    amountLabel: "Importe"
  }
};

export default function PaymentsPage() {
  const lang = getServerLang();
  const t = copy[lang];

  return (
    <main className="container-shell py-10">
      <section className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="kicker page-reference-subtitle text-[#f3d7a1]">{t.kicker}</p>
            <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
            <p className="page-reference-body mt-4 max-w-3xl text-[#d9e4f4]">{t.desc}</p>
            <p className="page-reference-body mt-4 max-w-2xl text-white/75">{t.intro}</p>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#f3d7a1]">{t.kicker}</p>
            <p className="page-reference-subtitle mt-4 text-white/90">{t.leadTitle}</p>
            <p className="page-reference-body mt-3 text-[#d9e4f4]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 payment-brief-layout">
        <div className="payment-brief-copy">
          <p className="kicker page-reference-subtitle">{t.briefTitle}</p>
          <h2 className="page-reference-subtitle mt-3 text-[#122744]">{t.briefTitle}</h2>
          <p className="page-reference-body mt-3 max-w-2xl text-[#556681]">{t.briefLead}</p>
          <div className="payment-brief-visual mt-6">
            <img src={paymentsWideImage} alt={t.imageAlt} className="payment-brief-image" />
          </div>
        </div>

        <div className="payment-brief-stack">
        {t.items.map((item) => (
          <article key={item.title} className="payment-brief-card">
            <div className="payment-brief-head">
              <p className="payment-brief-tag">{item.tag}</p>
              <p className="payment-brief-label">{t.amountLabel}</p>
            </div>
            <div className="payment-brief-amount-row">
              <div>
                <h3 className="page-reference-subtitle text-[#102949]">{item.title}</h3>
                <p className="page-reference-body mt-3 max-w-xl text-[#53647f]">{item.desc}</p>
              </div>
              <p className="heading-font text-5xl font-semibold text-[#102949]">${item.amount}</p>
            </div>
            <div className="payment-brief-actions">
              <BuyNowButton title={item.title} unitAmountUsd={item.amount} label={lang === "zh" ? "继续支付" : lang === "es" ? "Continuar al pago" : "Continue to Payment"} />
            </div>
          </article>
        ))}
        </div>
      </section>

      <section className="editorial-strip mt-10">
        <div>
          <p className="kicker page-reference-subtitle">{t.noteTitle}</p>
          <p className="page-reference-body mt-3 max-w-3xl text-[#43536c]">{t.noteBody}</p>
        </div>
        <Link href="/contact" className="btn btn-soft">
          {t.contactCta}
        </Link>
      </section>
    </main>
  );
}
