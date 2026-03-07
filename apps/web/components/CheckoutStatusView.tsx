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
      primaryCta: string;
      secondaryCta: string;
    }
  >
> = {
  en: {
    success: {
      kicker: "Payments",
      title: "The payment step has been confirmed.",
      desc: "This confirmation marks the current project stage clearly so the next conversation can focus on product direction, sample timing, and execution.",
      asideTitle: "Payment should support momentum, not replace it.",
      asideDesc: "Use this step to confirm direction that has already been discussed, then move back into development with clear timing and scope.",
      statusLabel: "Status sync",
      refLabel: "Reference",
      noteTitle: "What happens next",
      noteBody: "Our team will treat this payment as stage confirmation. If material direction, quantities, or delivery timing still need adjustment, continue the conversation before moving deeper into execution.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    },
    cancel: {
      kicker: "Payments",
      title: "The payment step was left incomplete.",
      desc: "No payment was finalized. That is usually a signal that timing, scope, or internal alignment needs one more round of discussion before the project moves forward.",
      asideTitle: "A paused payment is still useful information.",
      asideDesc: "If the project stage is not fully clear yet, it is better to slow down, confirm direction, and restart from a cleaner brief.",
      statusLabel: "Status sync",
      refLabel: "Reference",
      noteTitle: "Before you restart payment",
      noteBody: "Review product category, estimated volume, target timing, and sample expectations first. Once the stage is clear, the payment step becomes straightforward.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    }
  },
  zh: {
    success: {
      kicker: "支付",
      title: "当前支付阶段已确认。",
      desc: "这一步的作用，是把当前项目阶段明确下来，让后续沟通重新回到产品方向、打样节奏与执行细节本身。",
      asideTitle: "支付应该服务推进，而不是代替沟通。",
      asideDesc: "当方向已经讨论清楚后，支付才是确认阶段的动作。之后的重点仍然是样品、节奏和执行落地。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "接下来怎么推进",
      noteBody: "团队会把这次支付视为阶段确认。如果面料方向、数量区间或交期仍需调整，建议先继续沟通，再进入更深的执行环节。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    },
    cancel: {
      kicker: "支付",
      title: "当前支付步骤尚未完成。",
      desc: "本次没有实际完成支付。这通常意味着时间、范围或内部判断还需要再确认一次，再推进会更稳妥。",
      asideTitle: "暂停支付，本身也是有效信息。",
      asideDesc: "如果项目阶段还不够清楚，先放慢一步、重新确认方向，通常比仓促付款更合理。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "再次支付前建议先确认",
      noteBody: "先把产品品类、预估数量、目标时间和打样预期讨论清楚。阶段明确之后，支付动作本身会更直接。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    }
  },
  es: {
    success: {
      kicker: "Pagos",
      title: "La etapa de pago ya quedó confirmada.",
      desc: "Esta confirmación deja clara la fase actual del proyecto para que la siguiente conversación se centre en dirección de producto, timing de muestra y ejecución.",
      asideTitle: "El pago debe sostener el avance, no sustituir la conversación.",
      asideDesc: "Usa este paso para confirmar una dirección ya discutida y vuelve al desarrollo con alcance y tiempos más claros.",
      statusLabel: "Estado de sincronización",
      refLabel: "Referencia",
      noteTitle: "Qué sigue ahora",
      noteBody: "Nuestro equipo tomará este pago como confirmación de etapa. Si aún falta ajustar materiales, volúmenes o timing de entrega, conviene seguir la conversación antes de profundizar la ejecución.",
      primaryCta: "Ver Productos",
      secondaryCta: "Iniciar Conversación"
    },
    cancel: {
      kicker: "Pagos",
      title: "La etapa de pago quedó sin completar.",
      desc: "No se confirmó ningún pago. Normalmente eso indica que el timing, el alcance o la alineación interna todavía necesitan una conversación más clara antes de avanzar.",
      asideTitle: "Un pago pausado también aporta información útil.",
      asideDesc: "Si la etapa real del proyecto aún no está del todo definida, es mejor frenar, aclarar la dirección y retomar desde un brief más limpio.",
      statusLabel: "Estado de sincronización",
      refLabel: "Referencia",
      noteTitle: "Antes de intentar pagar otra vez",
      noteBody: "Revisa primero categoría, volumen estimado, timing objetivo y expectativa de muestra. Cuando la etapa está clara, el pago resulta mucho más directo.",
      primaryCta: "Ver Productos",
      secondaryCta: "Iniciar Conversación"
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
          <p className="kicker text-[#f3d7a1]">{t.kicker}</p>
          <p className="mt-4 text-lg leading-8 text-[#d9e4f4]">
            {mode === "success"
              ? lang === "zh"
                ? "如果你已经确认项目方向，可以直接继续样品、面料与交付节奏的沟通。"
                : lang === "es"
                  ? "Si la dirección del proyecto ya está clara, el siguiente paso es afinar muestra, materiales y ritmo de entrega."
                  : "If project direction is already clear, the next step is to sharpen sample, material, and delivery planning."
              : lang === "zh"
                ? "如果你暂停了支付，建议先回到品类、数量与时间判断上，把项目阶段重新梳理清楚。"
                : lang === "es"
                  ? "Si pausaste el pago, conviene volver a categoría, volumen y timing para ordenar bien la etapa real del proyecto."
                  : "If you paused payment, step back to category, volume, and timing so the project stage is clear again."}
          </p>
        </aside>
      </section>
    </main>
  );
}
