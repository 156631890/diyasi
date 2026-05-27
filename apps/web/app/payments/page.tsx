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

const SAMPLE_SHIPPING_FEE_USD = 20;

const copy: Record<
  SiteLang,
  {
    eyebrow: string;
    title: string;
    titleFromProduct: string;
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
    title: "PayPal checkout for Starter Kit and launch deposits",
    titleFromProduct: "Complete your custom Starter Kit payment with PayPal.",
    desc:
      "Use this live checkout only after your Starter Kit recommendation, quote, or launch deposit has been confirmed by the Diyasi team.",
    infoTitle: "How this fits the launch path",
    infoBody:
      "The payment step comes after validation planning, so each payment is tied to a practical Starter Kit, recommendation, or next launch stage.",
    supportTitle: "Need a custom amount?",
    supportBody:
      "If your quote, kit path, or launch deposit is not listed, send the launch brief first and Diyasi will confirm the correct payment stage.",
    supportCta: "Request Recommendation",
    items: [
      { tag: "Starter Kit", title: "Starter Kit Reservation", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "Used for a confirmed Starter Kit path before product and packaging validation begins. Includes $20 shipping." },
      { tag: "Launch", title: "Launch Validation Deposit", amount: 500, desc: "Used after the recommendation is confirmed and the next validation or reorder stage is ready to begin." }
    ],
    loadingLabel: "Loading PayPal checkout...",
    unavailableLabel: "PayPal is not available on this device or browser.",
    missingConfigLabel:
      "PayPal production credentials are not configured in the running server. If you just updated .env.local, restart Next.js, then hard refresh this page."
  },
  zh: {
    eyebrow: "安全收银台",
    title: "使用 PayPal 支付 Starter Kit 与启动验证定金",
    titleFromProduct: "请使用 PayPal 完成这笔 Starter Kit 相关付款。",
    desc: "请在 Diyasi 已确认 Starter Kit 推荐、报价或启动定金后，再使用此正式收款页完成支付。",
    infoTitle: "它在启动路径中的位置",
    infoBody: "付款发生在验证规划之后，每一笔付款都应对应清晰的 Starter Kit、推荐方案或下一步启动阶段。",
    supportTitle: "需要自定义金额？",
    supportBody: "如果你的报价、套装路径或启动定金不在列表中，请先提交启动 brief，Diyasi 会确认正确的付款阶段。",
    supportCta: "获取推荐",
    items: [
      { tag: "Starter Kit", title: "Starter Kit 预留付款", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "用于已确认的 Starter Kit 路径，在产品与包装验证开始前支付，含 20 美金运费。" },
      { tag: "启动", title: "启动验证定金", amount: 500, desc: "用于推荐方案确认后，进入下一步验证或复购路径。" }
    ],
    loadingLabel: "PayPal 加载中...",
    unavailableLabel: "当前设备或浏览器暂不支持 PayPal。",
    missingConfigLabel: "PayPal 正式收款尚未配置，请填写 NEXT_PUBLIC_PAYPAL_CLIENT_ID、PAYPAL_CLIENT_ID、PAYPAL_CLIENT_SECRET，并将 PAYPAL_ENV 设为 live。"
  },
  es: {
    eyebrow: "Checkout Seguro",
    title: "Checkout PayPal para Starter Kits y depositos de lanzamiento",
    titleFromProduct: "Complete este pago de Starter Kit con PayPal.",
    desc: "Use este checkout solo despues de que el equipo Diyasi confirme la recomendacion, cotizacion o deposito de lanzamiento.",
    infoTitle: "Como encaja en el lanzamiento",
    infoBody: "El pago ocurre despues de la planificacion de validacion, para que cada cobro corresponda a un Starter Kit, recomendacion o siguiente etapa clara.",
    supportTitle: "Necesitas un importe personalizado?",
    supportBody: "Si tu cotizacion, kit o deposito no aparece aqui, envia primero el brief de lanzamiento y Diyasi confirmara la etapa correcta de pago.",
    supportCta: "Solicitar recomendacion",
    items: [
      { tag: "Starter Kit", title: "Reserva de Starter Kit", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "Para una ruta Starter Kit confirmada antes de validar producto y empaque. Incluye 20 USD de envio." },
      { tag: "Lanzamiento", title: "Deposito de validacion de lanzamiento", amount: 500, desc: "Para avanzar despues de confirmar la recomendacion y la siguiente etapa de validacion o recompra." }
    ],
    loadingLabel: "Cargando checkout de PayPal...",
    unavailableLabel: "PayPal no esta disponible en este dispositivo o navegador.",
    missingConfigLabel:
      "Las credenciales de produccion de PayPal no estan configuradas. Agrega NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET y PAYPAL_ENV=live."
  }
};

export default function PaymentsPage({
  searchParams
}: {
  searchParams?: {
    product_title?: string;
    product_amount?: string;
    product_qty?: string;
    product_shipping_usd?: string;
  };
}) {
  const lang = getServerLang();
  const t = copy[lang];
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const productTitle = searchParams?.product_title ? decodeURIComponent(searchParams.product_title) : "";
  const productAmount = Number(searchParams?.product_amount || "0");
  const productQty = Math.max(1, Math.floor(Number(searchParams?.product_qty || "1")));
  const productShippingUsd = Number(searchParams?.product_shipping_usd || String(SAMPLE_SHIPPING_FEE_USD));

  const productItem =
    productTitle && Number.isFinite(productAmount) && productAmount > 0
      ? {
          tag: lang === "zh" ? "启动套装" : lang === "es" ? "Starter Kit" : "Starter Kit",
          title: productTitle,
          amount: Number((productAmount + productShippingUsd).toFixed(2)),
          desc:
            lang === "zh"
              ? `来自确认报价的 PayPal 收款入口，数量 ${productQty}，项目金额 $${productAmount.toFixed(2)}，物流费 $${productShippingUsd.toFixed(2)}。`
              : lang === "es"
                ? `Entrada de cobro PayPal desde una cotizacion confirmada, cantidad ${productQty}, importe $${productAmount.toFixed(2)} y envio $${productShippingUsd.toFixed(2)}.`
                : `PayPal checkout entry from a confirmed quote, quantity ${productQty}, project amount $${productAmount.toFixed(2)} and shipping $${productShippingUsd.toFixed(2)}.`
        }
      : null;
  const paymentItems = productItem ? [productItem] : t.items;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf6_0%,#f7ede4_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-14">
        <section className="rounded-[34px] border border-[rgba(191,144,118,0.18)] bg-[radial-gradient(circle_at_top_left,rgba(255,232,214,0.8),transparent_30%),linear-gradient(135deg,#fff8f1_0%,#fdf0e4_48%,#f5e0cf_100%)] p-7 shadow-[0_30px_80px_rgba(142,88,58,0.1)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b56e49]">{t.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#5f3123] md:text-5xl">
              {productItem ? t.titleFromProduct : t.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-[#7d4f3e] md:text-lg">{t.desc}</p>
            {productItem ? (
              <div className="mt-6 rounded-[20px] border border-[rgba(191,144,118,0.18)] bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b56e49]">
                  {lang === "zh" ? "来自确认报价" : lang === "es" ? "Desde una cotizacion confirmada" : "From confirmed quote"}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#5f3123]">{productItem.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#7d4f3e]">
                  {lang === "zh"
                    ? `数量 ${productQty}，项目金额 $${productAmount.toFixed(2)}，物流费 $${productShippingUsd.toFixed(2)}，合计 $${productItem.amount.toFixed(2)}。`
                    : lang === "es"
                      ? `Cantidad ${productQty}, importe $${productAmount.toFixed(2)}, envio $${productShippingUsd.toFixed(2)} y total $${productItem.amount.toFixed(2)}.`
                      : `Quantity ${productQty}, project amount $${productAmount.toFixed(2)}, shipping $${productShippingUsd.toFixed(2)}, total $${productItem.amount.toFixed(2)}.`}
                </p>
              </div>
            ) : null}
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
            items={paymentItems}
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
  description: "Live PayPal checkout for confirmed Starter Kit reservations, launch validation deposits, and custom Diyasi founder payments.",
  path: "/payments"
});



