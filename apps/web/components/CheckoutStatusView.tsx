"use client";

import Link from "next/link";
import { SiteLang } from "@/lib/i18n";

type CheckoutMode = "success" | "cancel";

type CheckoutStatusViewProps = {
  mode: CheckoutMode;
  refCode: string;
  syncState: string;
  lang: SiteLang;
};

const copy: Record<
  SiteLang,
  Record<
    CheckoutMode,
    {
      kicker: string;
      title: string;
      desc: string;
      asideTitle: string;
      asideDesc: string;
      statusLabel: string;
      refLabel: string;
      noteTitle: string;
      noteBody: string;
      briefTitle: string;
      briefBody: string;
      primaryCta: string;
      secondaryCta: string;
    }
  >
> = {
  en: {
    success: {
      kicker: "Payments",
      title: "Payment confirmed",
      desc: "Your payment is recorded. Continue with sample review, material confirmation, and production scheduling for this project stage.",
      asideTitle: "Current stage confirmed",
      asideDesc: "Use this reference when following up on sample development, material approval, and delivery planning.",
      statusLabel: "Status Sync",
      refLabel: "Reference",
      noteTitle: "Next Step",
      noteBody: "Our team will continue from this paid stage. If product category, quantity range, or delivery timing changes, contact us to update the project plan.",
      briefTitle: "Stage Summary",
      briefBody: "This payment matches the current stage and supports the next step in sample execution or project launch.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    },
    cancel: {
      kicker: "Payments",
      title: "Payment not completed",
      desc: "No payment was recorded. Review project scope, quantity, and timing before restarting the payment step.",
      asideTitle: "Payment still pending",
      asideDesc: "Confirm product category, quantity range, and delivery schedule first, then return to the matching payment item.",
      statusLabel: "Status Sync",
      refLabel: "Reference",
      noteTitle: "Before Paying Again",
      noteBody: "Check product category, expected volume, sample timing, and launch plan before starting payment again.",
      briefTitle: "Stage Summary",
      briefBody: "Return after confirming the brief so the payment matches the correct sample or launch stage.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    }
  },
  zh: {
    success: {
      kicker: "支付",
      title: "支付已确认",
      desc: "这笔付款已经记录成功，当前项目可以继续推进样品确认、面料沟通和生产排期。",
      asideTitle: "当前阶段已完成付款确认",
      asideDesc: "请使用当前参考编号继续跟进样品、面料确认和交付安排。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "下一步",
      noteBody: "团队会从当前已支付阶段继续推进。如果品类、数量区间或交付时间有变动，请直接联系团队更新项目安排。",
      briefTitle: "阶段说明",
      briefBody: "这笔付款对应当前项目阶段，可继续进入打样执行或项目启动准备。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    },
    cancel: {
      kicker: "支付",
      title: "支付未完成",
      desc: "本次付款没有完成，请先确认项目范围、数量区间和时间安排后再重新支付。",
      asideTitle: "付款仍待完成",
      asideDesc: "请先确认产品品类、数量范围和交付计划，再返回对应的支付项目。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "再次支付前",
      noteBody: "请先检查产品品类、预估数量、打样时间和上市计划，再重新进入支付流程。",
      briefTitle: "阶段说明",
      briefBody: "确认项目 brief 后，再返回处理对应的打样费或启动定金。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    }
  },
  es: {
    success: {
      kicker: "Pagos",
      title: "Pago confirmado",
      desc: "El pago ya fue registrado. Ahora puedes continuar con muestra, confirmacion de materiales y programacion de produccion.",
      asideTitle: "Etapa actual confirmada",
      asideDesc: "Usa esta referencia para continuar con muestra, aprobacion de material y plan de entrega.",
      statusLabel: "Estado de Sincronizacion",
      refLabel: "Referencia",
      noteTitle: "Siguiente Paso",
      noteBody: "El equipo seguira desde esta etapa pagada. Si cambian categoria, volumen o timing, contactanos para actualizar el proyecto.",
      briefTitle: "Resumen de Etapa",
      briefBody: "Este pago corresponde a la etapa actual y permite avanzar hacia muestra o preparacion de lanzamiento.",
      primaryCta: "Ver Productos",
      secondaryCta: "Iniciar Conversacion"
    },
    cancel: {
      kicker: "Pagos",
      title: "Pago no completado",
      desc: "No se registro ningun pago. Revisa alcance, volumen y timing antes de volver a intentarlo.",
      asideTitle: "Pago pendiente",
      asideDesc: "Confirma categoria, rango de volumen y plan de entrega antes de regresar al item de pago correspondiente.",
      statusLabel: "Estado de Sincronizacion",
      refLabel: "Referencia",
      noteTitle: "Antes de Pagar Otra Vez",
      noteBody: "Revisa categoria, volumen estimado, timing de muestra y plan de lanzamiento antes de reiniciar el pago.",
      briefTitle: "Resumen de Etapa",
      briefBody: "Vuelve despues de confirmar el brief para que el pago coincida con la etapa correcta de muestra o lanzamiento.",
      primaryCta: "Ver Productos",
      secondaryCta: "Iniciar Conversacion"
    }
  }
};

export default function CheckoutStatusView({ mode, refCode, syncState, lang }: CheckoutStatusViewProps) {
  const t = copy[lang][mode];

  return (
    <main className="container-shell py-10">
      <section className="hero-panel p-7 md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h1 className="section-title mt-2 text-[#122744]">{t.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#51627d]">{t.desc}</p>
          </div>
          <div className="contact-aside">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2c]">{t.kicker}</p>
            <p className="mt-4 text-lg leading-8 text-[#44546d]">{t.asideTitle}</p>
            <p className="mt-3 leading-8 text-[#5d6e89]">{t.asideDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 editorial-strip">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="kicker">{t.refLabel}</p>
            <p className="mt-3 text-lg leading-8 text-[#43536c]">{refCode}</p>
          </div>
          <div>
            <p className="kicker">{t.statusLabel}</p>
            <p className="mt-3 text-lg leading-8 text-[#43536c]">{syncState}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="contact-panel">
          <p className="kicker">{t.noteTitle}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4f607d]">{t.noteBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              {t.primaryCta}
            </Link>
            <Link href="/contact" className="btn btn-soft">
              {t.secondaryCta}
            </Link>
          </div>
        </article>

        <aside className="dark-band rounded-[28px] px-6 py-7">
          <p className="kicker text-[#f3d7a1]">{t.briefTitle}</p>
          <p className="mt-4 text-lg leading-8 text-[#d9e4f4]">{t.briefBody}</p>
        </aside>
      </section>
    </main>
  );
}
