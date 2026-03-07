import BuyNowButton from "@/components/BuyNowButton";
import { SiteLang } from "@/lib/i18n";
import { getServerLang } from "@/lib/server-lang";
import Link from "next/link";

type PaymentItem = {
  title: string;
  amount: number;
  desc: string;
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    leadTitle: string;
    leadDesc: string;
    items: PaymentItem[];
    noteTitle: string;
    noteBody: string;
    contactCta: string;
  }
> = {
  en: {
    kicker: "Payments",
    title: "A dedicated payment step for samples and early-stage project confirmation",
    desc: "Payment should happen only after direction, scope, and timing are already aligned. This page keeps that step clear and separate from consultation.",
    leadTitle: "Use this page when the project is already understood.",
    leadDesc: "The payment should confirm a stage, not replace a conversation.",
    items: [
      { title: "Sample Development Fee", amount: 199, desc: "For paid sample confirmation before pattern and material setup." },
      { title: "OEM Launch Deposit", amount: 500, desc: "For project kickoff after scope, pricing, and sampling direction are aligned." }
    ],
    noteTitle: "Before you pay",
    noteBody: "Confirm product direction, quantity range, and delivery timing with the team first so the payment matches the project stage.",
    contactCta: "Start a Conversation"
  },
  zh: {
    kicker: "支付",
    title: "把打样费和项目启动确认放在一个独立且清晰的支付步骤里",
    desc: "支付应当发生在方向、范围和时间已经明确之后，而不是拿来代替沟通。本页只承担确认阶段的作用。",
    leadTitle: "当项目阶段已经明确时，再进入这个页面。",
    leadDesc: "支付应该用来确认阶段，而不是代替沟通本身。",
    items: [
      { title: "打样开发费", amount: 199, desc: "用于确认付费打样，并开始版型与面料准备。" },
      { title: "OEM 启动定金", amount: 500, desc: "用于确认报价、范围和打样方向后的项目启动。" }
    ],
    noteTitle: "付款前",
    noteBody: "建议先与团队确认品类方向、数量区间和交付时间，再进行对应阶段的付款。",
    contactCta: "开始沟通"
  },
  es: {
    kicker: "Pagos",
    title: "Un paso de pago dedicado para muestras y confirmacion temprana del proyecto",
    desc: "El pago debe ocurrir solo cuando direccion, alcance y timing ya estan claros. Esta pagina mantiene ese paso separado de la consulta.",
    leadTitle: "Usa esta pagina cuando la etapa del proyecto ya este definida.",
    leadDesc: "El pago debe confirmar una etapa, no sustituir la conversacion.",
    items: [
      { title: "Tarifa de Desarrollo de Muestra", amount: 199, desc: "Para confirmar muestra pagada antes de patron y preparacion de materiales." },
      { title: "Deposito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y direccion de muestra ya estan claros." }
    ],
    noteTitle: "Antes de pagar",
    noteBody: "Confirma primero categoria, rango de volumen y timing de entrega con el equipo para que el pago coincida con la etapa correcta.",
    contactCta: "Iniciar Conversacion"
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
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#f3d7a1]">{t.kicker}</p>
            <p className="mt-4 text-lg leading-8 text-white/90">{t.leadTitle}</p>
            <p className="mt-3 leading-8 text-[#d9e4f4]">{t.leadDesc}</p>
          </div>
        </div>
      </section>

      <section className="payment-grid mt-10">
        {t.items.map((item) => (
          <article key={item.title} className="payment-panel">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{item.title}</p>
            <p className="heading-font mt-4 text-6xl font-semibold text-[#102949]">${item.amount}</p>
            <p className="mt-4 max-w-xl text-[#53647f]">{item.desc}</p>
            <div className="mt-6">
              <BuyNowButton title={item.title} unitAmountUsd={item.amount} label={lang === "zh" ? "继续支付" : lang === "es" ? "Continuar al Pago" : "Continue to Payment"} />
            </div>
          </article>
        ))}
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
