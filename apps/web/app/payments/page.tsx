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
    title: "Live PayPal checkout for deposits and sample fees",
    titleFromProduct: "Please complete this payment with PayPal.",
    desc:
      "This checkout is live-only: choose a project stage, review the amount, and complete PayPal payment with server-side capture before the order is marked paid.",
    infoTitle: "Why this layout",
    infoBody:
      "This page is intentionally focused on a single live payment flow so buyers can complete checkout quickly and your team can verify payment records easily.",
    supportTitle: "Need a custom amount?",
    supportBody:
      "If a buyer needs a custom quote, split deposit, or combined invoice, confirm the brief first and then direct them to the correct payment stage.",
    supportCta: "Contact Sales",
    items: [
      { tag: "Sample", title: "Sample Development Fee", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "Used for paid sampling before material sourcing and pattern work begin. Includes $20 shipping." },
      { tag: "Launch", title: "OEM Launch Deposit", amount: 500, desc: "Used once scope, pricing, and sample direction are confirmed for production launch." }
    ],
    loadingLabel: "Loading PayPal checkout...",
    unavailableLabel: "PayPal is not available on this device or browser.",
    missingConfigLabel:
      "PayPal production credentials are not configured in the running server. If you just updated .env.local, restart Next.js, then hard refresh this page."
  },
  zh: {
    eyebrow: "安全收银台",
    title: "使用 PayPal 正式收款完成打样费与 OEM 启动定金支付",
    titleFromProduct: "请使用 PayPal 完成这笔正式收款。",
    desc: "这是正式收款页：先选择项目阶段，确认金额，再通过 PayPal 完成支付，服务端捕获成功后才标记为已付款。",
    infoTitle: "这个布局的目的",
    infoBody: "这个页面只保留一条正式收款路径，方便买家快速完成付款，也方便团队核对订单与回款记录。",
    supportTitle: "需要自定义金额？",
    supportBody: "如果买家需要定制报价、分阶段定金或合并账单，请先确认需求，再进入对应的付款阶段。",
    supportCta: "联系销售",
    items: [
      { tag: "打样", title: "打样开发费", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "用于付费打样，在面料开发和版型制作前确认支付，含 20 美金运费。" },
      { tag: "启动", title: "OEM 启动定金", amount: 500, desc: "用于报价、范围和打样方向确认后的项目启动。" }
    ],
    loadingLabel: "PayPal 加载中...",
    unavailableLabel: "当前设备或浏览器暂不支持 PayPal。",
    missingConfigLabel: "PayPal 正式收款尚未配置，请填写 NEXT_PUBLIC_PAYPAL_CLIENT_ID、PAYPAL_CLIENT_ID、PAYPAL_CLIENT_SECRET，并将 PAYPAL_ENV 设为 live。"
  },
  es: {
    eyebrow: "Checkout Seguro",
    title: "Checkout oficial de PayPal para depositos y muestras",
    titleFromProduct: "Complete este pago con PayPal.",
    desc: "Esta pagina es solo para cobro en vivo: elija la etapa, revise el importe y complete PayPal con captura en servidor antes de marcar el pedido como pagado.",
    infoTitle: "Por que este diseno",
    infoBody: "Esta pagina mantiene un unico flujo de pago en vivo para que el comprador complete el checkout rapido y el equipo pueda auditar el cobro facilmente.",
    supportTitle: "Necesitas un importe personalizado?",
    supportBody: "Si el comprador necesita una cotizacion especial, un deposito parcial o una factura combinada, confirma primero el brief y luego dirige al cliente a la etapa correcta.",
    supportCta: "Contactar Ventas",
    items: [
      { tag: "Muestra", title: "Tarifa de Desarrollo de Muestra", amount: 199 + SAMPLE_SHIPPING_FEE_USD, desc: "Para muestra pagada antes de materiales y patron. Incluye 20 USD de envio." },
      { tag: "Inicio", title: "Deposito de Lanzamiento OEM", amount: 500, desc: "Para iniciar el proyecto cuando alcance, precio y direccion de muestra ya estan confirmados." }
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
          tag: lang === "zh" ? "产品" : lang === "es" ? "Producto" : "Product",
          title: productTitle,
          amount: Number((productAmount + productShippingUsd).toFixed(2)),
          desc:
            lang === "zh"
              ? `来自产品页面的 PayPal 收款入口，数量 ${productQty}，样品价 $${productAmount.toFixed(2)}，物流费 $${productShippingUsd.toFixed(2)}。`
              : lang === "es"
                ? `Entrada de cobro PayPal desde la pagina de producto, cantidad ${productQty}, precio de muestra $${productAmount.toFixed(2)} y envio $${productShippingUsd.toFixed(2)}.`
                : `PayPal checkout entry from the product page, quantity ${productQty}, sample price $${productAmount.toFixed(2)} and shipping $${productShippingUsd.toFixed(2)}.`
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
                  {lang === "zh" ? "来自产品页面" : lang === "es" ? "Desde la pagina de producto" : "From product page"}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#5f3123]">{productItem.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#7d4f3e]">
                  {lang === "zh"
                    ? `数量 ${productQty}，样品价 $${productAmount.toFixed(2)}，物流费 $${productShippingUsd.toFixed(2)}，合计 $${productItem.amount.toFixed(2)}。`
                    : lang === "es"
                      ? `Cantidad ${productQty}, precio de muestra $${productAmount.toFixed(2)}, envio $${productShippingUsd.toFixed(2)} y total $${productItem.amount.toFixed(2)}.`
                      : `Quantity ${productQty}, sample price $${productAmount.toFixed(2)}, shipping $${productShippingUsd.toFixed(2)}, total $${productItem.amount.toFixed(2)}.`}
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
  description: "Live PayPal checkout for sample development fees and OEM launch deposits.",
  path: "/payments"
});



