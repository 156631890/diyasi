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
    items: PaymentItem[];
    noteTitle: string;
    noteBody: string;
    contactCta: string;
  }
> = {
  en: {
    kicker: "Payments",
    title: "Dedicated payment page for samples, deposits, and framework checkout",
    desc: "Keep consultation and payment separate. Use this page only when your team is ready to place a sample fee or launch deposit.",
    items: [
      { title: "Sample Development Fee", amount: 199, desc: "For paid sample confirmation before pattern and material setup." },
      { title: "OEM Launch Deposit", amount: 500, desc: "For project kickoff after scope, pricing, and sampling direction are aligned." }
    ],
    noteTitle: "Before you pay",
    noteBody: "Confirm product direction, quantity range, and delivery timing with the team first so the payment matches the project stage.",
    contactCta: "Discuss Project First"
  },
  zh: {
    kicker: "支付",
    title: "将打样费、启动定金与模拟结算集中到独立页面",
    desc: "把咨询沟通与支付动作分开。只有在团队已经确认项目阶段后，再使用这个页面。",
    items: [
      { title: "打样开发费", amount: 199, desc: "用于确认付费打样，并开始版型与面料准备。" },
      { title: "OEM 启动定金", amount: 500, desc: "用于确认报价、范围和打样方向后的项目启动。" }
    ],
    noteTitle: "付款前",
    noteBody: "建议先与团队确认品类方向、数量区间和交付时间，再进行对应阶段的付款。",
    contactCta: "先沟通项目"
  },
  es: {
    kicker: "Pagos",
    title: "Pagina dedicada para muestras, depositos y checkout de framework",
    desc: "Separa la consulta del pago. Usa esta pagina solo cuando el equipo ya haya confirmado la etapa del proyecto.",
    items: [
      { title: "Tarifa de Desarrollo de Muestra", amount: 199, desc: "Para confirmar muestra pagada antes de patron y preparacion de materiales." },
      { title: "Deposito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y direccion de muestra ya estan claros." }
    ],
    noteTitle: "Antes de pagar",
    noteBody: "Confirma primero categoria, rango de volumen y timing de entrega con el equipo para que el pago coincida con la etapa correcta.",
    contactCta: "Hablar del Proyecto"
  }
};

export default function PaymentsPage() {
  const lang = getServerLang();
  const t = copy[lang];

  return (
    <main className="container-shell py-10">
      <section className="dark-band rounded-[34px] px-7 py-10 shadow-[0_32px_90px_rgba(16,30,52,0.18)] md:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="kicker text-[#f3d7a1]">{t.kicker}</p>
          <h1 className="heading-font mt-2 text-5xl font-semibold">{t.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d9e4f4]">{t.desc}</p>
        </div>
      </section>

      <section className="payment-grid mt-10">
        {t.items.map((item) => (
          <article key={item.title} className="payment-panel">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{item.title}</p>
            <p className="heading-font mt-4 text-6xl font-semibold text-[#102949]">${item.amount}</p>
            <p className="mt-4 max-w-xl text-[#53647f]">{item.desc}</p>
            <div className="mt-6">
              <BuyNowButton title={item.title} unitAmountUsd={item.amount} />
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
