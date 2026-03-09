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
      title: "The payment checkpoint has been confirmed.",
      desc: "This step should now hand the project back to product direction, sampling rhythm, and execution planning instead of keeping attention on checkout itself.",
      asideTitle: "A confirmed payment should narrow the project, not complicate it.",
      asideDesc: "The next useful move is to return to material choices, sample review, and delivery timing with a cleaner stage definition in place.",
      statusLabel: "Status Sync",
      refLabel: "Reference",
      noteTitle: "What happens next",
      noteBody: "Our team will treat this payment as stage confirmation. If category, quantity range, or delivery timing still need adjustment, continue the conversation before moving deeper into execution.",
      briefTitle: "Brief Perspective",
      briefBody: "A completed payment is most useful when it confirms a stage that is already understood. It should reduce ambiguity, not create a new one.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    },
    cancel: {
      kicker: "Payments",
      title: "The payment checkpoint was left open.",
      desc: "No payment was finalized. That usually means the project stage still needs a cleaner brief around scope, timing, or internal alignment before the next attempt.",
      asideTitle: "A paused payment is still a useful project signal.",
      asideDesc: "If the stage is not fully clear yet, stepping back to category, volume, and timing is the right move. A cleaner brief makes the next payment step simpler.",
      statusLabel: "Status Sync",
      refLabel: "Reference",
      noteTitle: "Before you restart payment",
      noteBody: "Review product category, expected volume, sample timing, and launch expectations first. Once the stage is clearly defined, the payment step becomes straightforward.",
      briefTitle: "Brief Perspective",
      briefBody: "Leaving payment unfinished is often a sign that the project still needs more clarity. Resolve the brief first, then come back to the transaction.",
      primaryCta: "View Products",
      secondaryCta: "Start a Conversation"
    }
  },
  zh: {
    success: {
      kicker: "支付",
      title: "当前支付节点已确认。",
      desc: "这一步确认之后，页面重点不该继续停留在结算本身，而应该重新回到产品方向、打样节奏与执行安排。",
      asideTitle: "一次已确认的支付，应该让项目更收敛，而不是更复杂。",
      asideDesc: "接下来更有价值的动作，是回到面料选择、样品评估与交付时间判断，并在更清楚的阶段定义下继续推进。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "接下来怎么推进",
      noteBody: "团队会把这次支付视为阶段确认。如果品类、数量区间或交付时间仍需调整，建议先继续沟通，再进入更深的执行环节。",
      briefTitle: "Brief 视角",
      briefBody: "一笔完成的支付，最有价值的时候，是它确认了一个已经被理解清楚的阶段。它应该减少不确定性，而不是制造新的不确定性。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    },
    cancel: {
      kicker: "支付",
      title: "当前支付节点尚未完成。",
      desc: "本次没有实际完成支付。这通常意味着项目阶段在范围、时间或内部判断上，仍然需要一个更清楚的 brief。",
      asideTitle: "暂停支付，本身也是一个有效的项目信号。",
      asideDesc: "如果阶段还不够清楚，先回到品类、数量与时间判断上是对的。brief 越清晰，下一次支付动作就越直接。",
      statusLabel: "状态同步",
      refLabel: "参考编号",
      noteTitle: "再次支付前建议先确认",
      noteBody: "先把产品品类、预估数量、打样时间和上市预期讨论清楚。阶段定义越明确，支付步骤本身就越简单。",
      briefTitle: "Brief 视角",
      briefBody: "支付没有完成，往往不是坏事，而是在提醒项目还需要更清楚的判断。先把 brief 收干净，再回来处理交易动作。",
      primaryCta: "查看产品",
      secondaryCta: "开始沟通"
    }
  },
  es: {
    success: {
      kicker: "Pagos",
      title: "El punto de pago ya quedó confirmado.",
      desc: "Después de esta confirmación, la atención debería volver a dirección de producto, ritmo de muestra y planificación de ejecución, no quedarse en el checkout.",
      asideTitle: "Un pago confirmado debe acotar la etapa, no volverla más compleja.",
      asideDesc: "El siguiente movimiento útil es volver a materiales, revisión de muestra y timing de entrega con una definición de etapa mucho más limpia.",
      statusLabel: "Estado de Sincronización",
      refLabel: "Referencia",
      noteTitle: "Qué sigue ahora",
      noteBody: "Nuestro equipo tomará este pago como confirmación de etapa. Si categoría, rango de volumen o timing de entrega aún necesitan ajuste, conviene seguir la conversación antes de profundizar la ejecución.",
      briefTitle: "Perspectiva del Brief",
      briefBody: "Un pago completado es más valioso cuando confirma una etapa que ya se entiende bien. Debe reducir ambigüedad, no abrir una nueva.",
      primaryCta: "Ver Productos",
      secondaryCta: "Iniciar Conversación"
    },
    cancel: {
      kicker: "Pagos",
      title: "El punto de pago quedó abierto.",
      desc: "No se confirmó ningún pago. Normalmente eso indica que la etapa del proyecto todavía necesita un brief más claro en alcance, timing o alineación interna.",
      asideTitle: "Un pago pausado también es una señal útil del proyecto.",
      asideDesc: "Si la etapa aún no está del todo clara, volver a categoría, volumen y timing es lo correcto. Cuanto más limpio esté el brief, más simple será el siguiente pago.",
      statusLabel: "Estado de Sincronización",
      refLabel: "Referencia",
      noteTitle: "Antes de intentar pagar otra vez",
      noteBody: "Revisa primero categoría, volumen estimado, timing de muestra y expectativa de lanzamiento. Cuando la etapa está bien definida, el pago se vuelve mucho más directo.",
      briefTitle: "Perspectiva del Brief",
      briefBody: "Dejar el pago sin completar no siempre es negativo; muchas veces solo indica que el proyecto aún necesita más claridad. Ordena el brief primero y luego vuelve a la transacción.",
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
          <p className="kicker text-[#f3d7a1]">{t.briefTitle}</p>
          <p className="mt-4 text-lg leading-8 text-[#d9e4f4]">{t.briefBody}</p>
        </aside>
      </section>
    </main>
  );
}
