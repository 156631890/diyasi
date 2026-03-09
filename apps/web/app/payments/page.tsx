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

const paymentsWideImage = "/media/generated/wide/factory-wide-production-line.png";

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
    title: "A dedicated payment step for samples and early-stage project confirmation",
    desc: "Payment should happen only after direction, scope, and timing are already aligned. This page keeps that step clear and separate from consultation.",
    intro: "This page should read like a project brief checkpoint, not like a generic checkout table.",
    leadTitle: "Use this page when the project is already understood.",
    leadDesc: "The payment should confirm a stage, not replace a conversation.",
    items: [
      { tag: "Sample", title: "Sample Development Fee", amount: 199, desc: "For paid sample confirmation before pattern and material setup." },
      { tag: "Launch", title: "OEM Launch Deposit", amount: 500, desc: "For project kickoff after scope, pricing, and sampling direction are aligned." }
    ],
    noteTitle: "Before you pay",
    noteBody: "Confirm product direction, quantity range, and delivery timing with the team first so the payment matches the project stage.",
    contactCta: "Start a Conversation",
    briefTitle: "Payment Brief",
    briefLead: "Each payment card should feel like a controlled stage confirmation, with enough context to make the action feel deliberate.",
    imageAlt: "Wide production line and factory floor",
    amountLabel: "Amount"
  },
  zh: {
    kicker: "支付",
    title: "把打样费和项目启动确认放在一个独立且清晰的支付步骤里",
    desc: "支付应当发生在方向、范围和时间已经明确之后，而不是拿来代替沟通。本页只承担确认阶段的作用。",
    intro: "这里更应该像项目阶段确认页，而不是普通结算列表。",
    leadTitle: "当项目阶段已经明确时，再进入这个页面。",
    leadDesc: "支付应该用来确认阶段，而不是代替沟通本身。",
    items: [
      { tag: "打样", title: "打样开发费", amount: 199, desc: "用于确认付费打样，并开始版型与面料准备。" },
      { tag: "启动", title: "OEM 启动定金", amount: 500, desc: "用于确认报价、范围和打样方向后的项目启动。" }
    ],
    noteTitle: "付款前",
    noteBody: "建议先与团队确认品类方向、数量区间和交付时间，再进行对应阶段的付款。",
    contactCta: "开始沟通",
    briefTitle: "支付 Brief",
    briefLead: "每个支付卡片都应该像一个被清楚定义的阶段确认，而不是直接催促付款的按钮区。",
    imageAlt: "生产线与工厂空间横向画面",
    amountLabel: "金额"
  },
  es: {
    kicker: "Pagos",
    title: "Un paso de pago dedicado para muestras y confirmación temprana del proyecto",
    desc: "El pago debe ocurrir solo cuando dirección, alcance y timing ya están claros. Esta página mantiene ese paso separado de la consulta.",
    intro: "Esta página debe sentirse más como un punto de control del proyecto que como una tabla de checkout genérica.",
    leadTitle: "Usa esta página cuando la etapa del proyecto ya esté definida.",
    leadDesc: "El pago debe confirmar una etapa, no sustituir la conversación.",
    items: [
      { tag: "Muestra", title: "Tarifa de Desarrollo de Muestra", amount: 199, desc: "Para confirmar muestra pagada antes de patrón y preparación de materiales." },
      { tag: "Inicio", title: "Depósito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y dirección de muestra ya están claros." }
    ],
    noteTitle: "Antes de pagar",
    noteBody: "Confirma primero categoría, rango de volumen y timing de entrega con el equipo para que el pago coincida con la etapa correcta.",
    contactCta: "Iniciar Conversación",
    briefTitle: "Brief de Pago",
    briefLead: "Cada tarjeta de pago debe sentirse como una confirmación controlada de etapa, no como un empujón genérico hacia checkout.",
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
            <p className="kicker text-[#f3d7a1]">{t.kicker}</p>
            <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d9e4f4]">{t.desc}</p>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75">{t.intro}</p>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#f3d7a1]">{t.kicker}</p>
            <p className="mt-4 text-lg leading-8 text-white/90">{t.leadTitle}</p>
            <p className="mt-3 leading-8 text-[#d9e4f4]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 payment-brief-layout">
        <div className="payment-brief-copy">
          <p className="kicker">{t.briefTitle}</p>
          <h2 className="heading-font mt-3 text-4xl font-semibold text-[#122744]">{t.briefTitle}</h2>
          <p className="mt-3 max-w-2xl text-[#556681] leading-8">{t.briefLead}</p>
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
                <h3 className="heading-font text-3xl font-semibold text-[#102949]">{item.title}</h3>
                <p className="mt-3 max-w-xl leading-8 text-[#53647f]">{item.desc}</p>
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
          <p className="kicker">{t.noteTitle}</p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#43536c]">{t.noteBody}</p>
        </div>
        <Link href="/contact" className="btn btn-soft">
          {t.contactCta}
        </Link>
      </section>
    </main>
  );
}
