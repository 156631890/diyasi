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

const copy: Record<
  SiteLang,
  {
    eyebrow: string;
    title: string;
    desc: string;
    infoTitle: string;
    infoBody: string;
    supportTitle: string;
    supportBody: string;
    supportCta: string;
    items: PaymentItem[];
    loadingLabel: string;
    unavailableLabel: string;
    missingConfigLabel: string;
  }
> = {
  en: {
    eyebrow: "Secure Checkout",
    title: "Buyer payment page for sample fees and OEM launch deposits",
    desc: "Keep the payment flow clear: select the project stage, select the payment method, and complete PayPal verification with server-side confirmation before the order is marked paid.",
    infoTitle: "Why this layout",
    infoBody: "This page is intentionally simple for independent-site checkout. It avoids visual noise, keeps the payment choices obvious, and makes audit screenshots easier to capture.",
    supportTitle: "Need a custom amount?",
    supportBody: "If the buyer needs a custom quote, split deposit, or combined invoice, confirm the brief first and then direct them to the matching payment stage.",
    supportCta: "Contact Sales",
    items: [
      { tag: "Sample", title: "Sample Development Fee", amount: 199, desc: "Used for paid sampling before material sourcing and pattern work begin." },
      { tag: "Launch", title: "OEM Launch Deposit", amount: 500, desc: "Used once scope, pricing, and sample direction are confirmed for production launch." }
    ],
    loadingLabel: "Loading PayPal...",
    unavailableLabel: "PayPal is not available on this device or browser.",
    missingConfigLabel: "PayPal is not configured yet. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID, and PAYPAL_CLIENT_SECRET."
  },
  zh: {
    eyebrow: "\u5b89\u5168\u6536\u94f6\u53f0",
    title: "\u7528\u4e00\u4e2a\u7b80\u6d01\u7684\u9875\u9762\u5b8c\u6210\u6253\u6837\u8d39\u4e0e OEM \u542f\u52a8\u5b9a\u91d1\u652f\u4ed8",
    desc: "\u8ba9\u4ed8\u6b3e\u6d41\u7a0b\u4fdd\u6301\u6e05\u695a\uff1a\u5148\u9009\u62e9\u9879\u76ee\u9636\u6bb5\uff0c\u518d\u9009\u62e9\u652f\u4ed8\u65b9\u5f0f\uff0c\u6700\u540e\u5728 PayPal \u4e2d\u5b8c\u6210\u9a8c\u8bc1\uff0c\u5e76\u7531\u670d\u52a1\u7aef\u786e\u8ba4\u5230\u8d26\u540e\u518d\u5165\u5e93\u3002",
    infoTitle: "\u8fd9\u4e2a\u5e03\u5c40\u7684\u76ee\u7684",
    infoBody: "\u8fd9\u4e2a\u6536\u94f6\u53f0\u662f\u4e3a\u72ec\u7acb\u7ad9\u4ed8\u6b3e\u573a\u666f\u8bbe\u8ba1\u7684\uff0c\u5c3d\u91cf\u51cf\u5c11\u89c6\u89c9\u5e72\u6270\uff0c\u8ba9\u4e70\u5bb6\u80fd\u4e00\u773c\u770b\u6e05\u652f\u4ed8\u9009\u62e9\uff0c\u4e5f\u66f4\u9002\u5408\u5ba1\u6838\u622a\u56fe\u3002",
    supportTitle: "\u9700\u8981\u81ea\u5b9a\u4e49\u91d1\u989d\uff1f",
    supportBody: "\u5982\u679c\u4e70\u5bb6\u9700\u8981\u5b9a\u5236\u62a5\u4ef7\uff0c\u5206\u9636\u6bb5\u5b9a\u91d1\uff0c\u6216\u5408\u5e76\u8d26\u5355\uff0c\u53ef\u4ee5\u5148\u6c9f\u901a\u9700\u6c42\uff0c\u518d\u8fdb\u5165\u5bf9\u5e94\u7684\u4ed8\u6b3e\u9636\u6bb5\u3002",
    supportCta: "\u8054\u7cfb\u9500\u552e",
    items: [
      { tag: "\u6253\u6837", title: "\u6253\u6837\u5f00\u53d1\u8d39", amount: 199, desc: "\u7528\u4e8e\u4ed8\u8d39\u6253\u6837\uff0c\u5728\u9762\u6599\u5f00\u53d1\u548c\u7248\u578b\u5236\u4f5c\u524d\u786e\u8ba4\u652f\u4ed8\u3002" },
      { tag: "\u542f\u52a8", title: "OEM \u542f\u52a8\u5b9a\u91d1", amount: 500, desc: "\u7528\u4e8e\u62a5\u4ef7\u3001\u8303\u56f4\u548c\u6253\u6837\u65b9\u5411\u786e\u8ba4\u540e\u7684\u9879\u76ee\u542f\u52a8\u3002" }
    ],
    loadingLabel: "PayPal \u52a0\u8f7d\u4e2d...",
    unavailableLabel: "\u5f53\u524d\u8bbe\u5907\u6216\u6d4f\u89c8\u5668\u6682\u4e0d\u652f\u6301 PayPal\u3002",
    missingConfigLabel: "PayPal \u5c1a\u672a\u914d\u7f6e\uff0c\u8bf7\u586b\u5199 NEXT_PUBLIC_PAYPAL_CLIENT_ID\u3001PAYPAL_CLIENT_ID \u548c PAYPAL_CLIENT_SECRET\u3002"
  },
  es: {
    eyebrow: "Checkout Seguro",
    title: "Una pagina limpia para cobrar muestras y depositos OEM",
    desc: "Mantiene el flujo claro: elegir etapa del proyecto, elegir metodo de pago y completar PayPal con verificacion del servidor antes de marcar el pedido como pagado.",
    infoTitle: "Por que este diseno",
    infoBody: "Esta pagina esta pensada para checkout de sitio independiente. Reduce ruido visual, aclara el metodo de pago y facilita capturas para auditoria.",
    supportTitle: "Necesitas un importe personalizado?",
    supportBody: "Si el comprador necesita una cotizacion especial, un deposito parcial o una factura combinada, confirma el brief primero y luego usa la etapa de pago correcta.",
    supportCta: "Contactar Ventas",
    items: [
      { tag: "Muestra", title: "Tarifa de Desarrollo de Muestra", amount: 199, desc: "Para muestra pagada antes de materiales y patron." },
      { tag: "Inicio", title: "Deposito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y direccion de muestra ya estan confirmados." }
    ],
    loadingLabel: "Cargando PayPal...",
    unavailableLabel: "PayPal no esta disponible en este dispositivo o navegador.",
    missingConfigLabel: "PayPal no esta configurado todavia. Agrega NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET."
  }
};

export default function PaymentsPage() {
  const lang = getServerLang();
  const t = copy[lang];
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf6_0%,#f7ede4_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-14">
        <section className="rounded-[34px] border border-[rgba(191,144,118,0.18)] bg-[radial-gradient(circle_at_top_left,rgba(255,232,214,0.8),transparent_30%),linear-gradient(135deg,#fff8f1_0%,#fdf0e4_48%,#f5e0cf_100%)] p-7 shadow-[0_30px_80px_rgba(142,88,58,0.1)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b56e49]">{t.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#5f3123] md:text-5xl">{t.title}</h1>
            <p className="mt-4 text-base leading-8 text-[#7d4f3e] md:text-lg">{t.desc}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="rounded-[30px] border border-[rgba(191,144,118,0.18)] bg-white/92 p-6 shadow-[0_22px_50px_rgba(132,86,58,0.1)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">{t.infoTitle}</p>
            <p className="mt-4 text-base leading-8 text-[#7d4f3e]">{t.infoBody}</p>

            <div className="mt-8 rounded-[24px] bg-[linear-gradient(180deg,#fff8f2_0%,#fff0e4_100%)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">{t.supportTitle}</p>
              <p className="mt-3 text-sm leading-7 text-[#7d4f3e]">{t.supportBody}</p>
              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-[16px] border border-[rgba(217,119,69,0.22)] px-4 py-3 text-sm font-semibold text-[#b95f33] transition hover:bg-[rgba(230,126,61,0.08)]"
              >
                {t.supportCta}
              </Link>
            </div>
          </aside>

          <PayPalPaymentsPanel
            items={t.items}
            clientId={clientId}
            loadingLabel={t.loadingLabel}
            unavailableLabel={t.unavailableLabel}
            missingConfigLabel={t.missingConfigLabel}
          />
        </section>
      </div>
    </main>
  );
}

export const metadata: Metadata = buildMetadata({
  title: "Payments",
  description:
    "Pay sample development fees and OEM launch deposits for YiWu DiYaSi projects once scope, timing, and production stage are confirmed.",
  path: "/payments"
});
