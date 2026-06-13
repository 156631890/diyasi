import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { fabricOptions } from "@/lib/site-info";
import { getServerLang } from "@/lib/server-lang";
import { SiteLang } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Fabrics Guide — Cotton, Modal, Bamboo, Recycled Nylon",
  description:
    "Explore our underwear fabric options: organic cotton, modal, bamboo viscose, recycled nylon, seamless yarn, and leakproof lining. Sustainable sourcing for intimate apparel brands.",
  path: "/fabrics"
});

type FabricDetailItem = {
  icon: string;
  title: string;
  desc: string;
  bestFor: string;
  check: string;
};

const copy: Record<
  SiteLang,
  {
    kicker: string;
    title: string;
    desc: string;
    cta: string;
    bestForLabel: string;
    checkLabel: string;
    reviewKicker: string;
    reviewTitle: string;
    fabricDetails: FabricDetailItem[];
  }
> = {
  en: {
    kicker: "Fabrics",
    title: "Underwear fabric options for private label collections",
    desc: "Fabric selection affects hand feel, fit, MOQ, sample timing, wash performance, and final price. We help buyers choose the right material route before sample development starts.",
    cta: "Discuss Fabric Direction",
    bestForLabel: "Best for:",
    checkLabel: "Buyer check:",
    reviewKicker: "Material Review",
    reviewTitle: "What to confirm before sampling",
    fabricDetails: [
      {
        icon: "/media/generated/icons/cotton.png",
        title: "Cotton",
        desc: "A practical everyday underwear fabric for breathable basics, multipacks, and retail programs where comfort and familiar hand feel matter.",
        bestFor: "Everyday briefs, multipacks, basics",
        check: "Shrinkage, weight, softness, colorfastness"
      },
      {
        icon: "/media/generated/icons/modal.png",
        title: "Modal",
        desc: "Soft, smooth, and suitable for premium basics, men's boxer briefs, lounge underwear, and DTC collections positioned around comfort.",
        bestFor: "Premium basics, boxer briefs, loungewear",
        check: "Hand feel, pilling, stretch recovery"
      },
      {
        icon: "/media/generated/icons/bamboo.png",
        title: "Bamboo",
        desc: "Often selected for soft touch and responsible material positioning. Best reviewed together with target price and certification needs.",
        bestFor: "Soft-touch underwear and comfort programs",
        check: "Supplier file, positioning, target price"
      },
      {
        icon: "/media/generated/icons/recycled-nylon.png",
        title: "Recycled Nylon",
        desc: "Useful for seamless underwear, activewear, and brands that want a sustainability-led material story with stretch performance.",
        bestFor: "Seamless underwear and activewear",
        check: "Stretch, recovery, certification route"
      },
      {
        icon: "/media/generated/icons/seamless-yarn.png",
        title: "Seamless Yarn",
        desc: "Used for no-show underwear, bralettes, sports bras, and activewear where stretch recovery and clean edges are important.",
        bestFor: "No-show panties, bralettes, sports bras",
        check: "Edge finish, opacity, recovery"
      },
      {
        icon: "/media/generated/icons/leakproof-lining.png",
        title: "Leakproof Lining",
        desc: "Used in period underwear and absorbent gusset programs. Absorbency, layer structure, and testing expectations must be confirmed early.",
        bestFor: "Period underwear and absorbent gussets",
        check: "Layer structure, absorbency, test method"
      }
    ]
  },
  zh: {
    kicker: "面料",
    title: "贴牌定制内衣的面料选择",
    desc: "面料选择会直接影响手感、版型、MOQ、打样交期、水洗性能和最终大货价格。我们协助买家在打样开发前，确定最合适的操作路线。",
    cta: "讨论面料方向",
    bestForLabel: "最适合:",
    checkLabel: "买家核对点:",
    reviewKicker: "材料评估",
    reviewTitle: "打样前需要确认什么",
    fabricDetails: [
      {
        icon: "/media/generated/icons/cotton.png",
        title: "纯棉 (Cotton)",
        desc: "适用于透气基础款、多件装以及注重舒适与熟悉触感的零售项目的实用日常内衣面料。",
        bestFor: "日常三角裤、多件装、基础款",
        check: "缩水率、克重、柔软度、色牢度"
      },
      {
        icon: "/media/generated/icons/modal.png",
        title: "莫代尔 (Modal)",
        desc: "柔软、平滑，适用于中高端基础款、男士平角裤、家居内衣以及围绕舒适性定位的 DTC 系列。",
        bestFor: "高端基础款、男士平角裤、家居服",
        check: "手感、起毛起球、拉伸回弹"
      },
      {
        icon: "/media/generated/icons/bamboo.png",
        title: "竹纤维 (Bamboo)",
        desc: "通常因其柔软的触感和环保材质定位而被选中。建议结合目标价格和认证需求进行评估。",
        bestFor: "柔顺触感内衣与舒适系列",
        check: "供应商档案、产品定位、目标价格"
      },
      {
        icon: "/media/generated/icons/recycled-nylon.png",
        title: "再生尼龙 (Recycled Nylon)",
        desc: "适用于无缝内衣、运动服，以及希望借助高弹回弹性能讲述可持续环保故事的品牌。",
        bestFor: "无缝内衣与运动服",
        check: "拉伸性、回弹率、认证途径"
      },
      {
        icon: "/media/generated/icons/seamless-yarn.png",
        title: "无缝针织纱线 (Seamless Yarn)",
        desc: "适用于一片式/无痕内衣、胸衣、运动文胸和注重回弹和无痕边缘的运动休闲服。",
        bestFor: "无痕内裤、胸衣、运动文胸",
        check: "边缘处理、透光度、回弹性"
      },
      {
        icon: "/media/generated/icons/leakproof-lining.png",
        title: "生理防漏层 (Leakproof Lining)",
        desc: "适用于生理裤和吸水内衣项目。吸水性、层数结构和测试标准必须提前予以确认。",
        bestFor: "生理期内裤与吸水底裆",
        check: "层结构、吸水量、测试方法"
      }
    ]
  },
  es: {
    kicker: "Tejidos",
    title: "Opciones de tejidos de ropa interior para marcas propias",
    desc: "La selección del tejido influye en el tacto, ajuste, MOQ, tiempos de muestra, durabilidad del lavado y precio final. Ayudamos a los compradores a elegir el material correcto antes del muestreo.",
    cta: "Discutir Dirección de Tejido",
    bestForLabel: "Ideal para:",
    checkLabel: "Control de compra:",
    reviewKicker: "Revisión de Material",
    reviewTitle: "Qué confirmar antes del muestreo",
    fabricDetails: [
      {
        icon: "/media/generated/icons/cotton.png",
        title: "Algodón",
        desc: "Un tejido práctico para el uso diario en básicos transpirables, multipacks y programas minoristas donde la comodidad importa.",
        bestFor: "Bragas de diario, multipacks, básicos",
        check: "Encogimiento, peso, suavidad, solidez del color"
      },
      {
        icon: "/media/generated/icons/modal.png",
        title: "Modal",
        desc: "Suave, liso y adecuado para básicos premium, boxers de hombre, ropa interior de descanso y colecciones DTC centradas en el confort.",
        bestFor: "Básicos premium, boxers, ropa de descanso",
        check: "Tacto, pilling, recuperación de elasticidad"
      },
      {
        icon: "/media/generated/icons/bamboo.png",
        title: "Bambú",
        desc: "Elegido a menudo por su tacto suave y posicionamiento sostenible. Se evalúa mejor junto con el precio objetivo y necesidades de certificación.",
        bestFor: "Ropa interior de tacto suave y líneas de confort",
        check: "Archivo del proveedor, posicionamiento, precio objetivo"
      },
      {
        icon: "/media/generated/icons/recycled-nylon.png",
        title: "Nailon Reciclado",
        desc: "Ideal para ropa interior sin costuras, activewear y marcas que buscan una historia de material sustentable con alto rendimiento.",
        bestFor: "Ropa interior seamless y activewear",
        check: "Elasticidad, recuperación, ruta de certificación"
      },
      {
        icon: "/media/generated/icons/seamless-yarn.png",
        title: "Hilo Sin Costuras",
        desc: "Usado para bragas sin costuras visibles, bralettes, sujetadores deportivos y ropa activa donde importa el borde limpio y el estiramiento.",
        bestFor: "Bragas invisibles, bralettes, sujetadores deportivos",
        check: "Acabado de bordes, opacidad, recuperación"
      },
      {
        icon: "/media/generated/icons/leakproof-lining.png",
        title: "Capa Antifugas",
        desc: "Utilizado en ropa interior para el periodo y líneas absorbentes. La absorción, estructura de capas y pruebas deben confirmarse temprano.",
        bestFor: "Bragas menstruales y puentes absorbentes",
        check: "Estructura de capas, absorción, método de prueba"
      }
    ]
  }
};

export default function FabricsPage() {
  const lang = getServerLang();
  const t = copy[lang];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Fabrics", path: "/fabrics" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="visual-hero page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle">{t.kicker}</p>
          <h1 className="section-title mt-2 text-[#1d2521]">{t.title}</h1>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            {t.desc}
          </p>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              {t.cta}
            </Link>
          </div>
        </div>
        <div className="visual-hero-media">
          <Image
            src="/media/generated/pages/fabric-swatch-lab.jpg"
            alt="Underwear fabric swatches including cotton, modal, bamboo, nylon, seamless yarn, and lace"
            width={1600}
            height={1000}
            priority
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.fabricDetails.map((item) => (
            <article key={item.title} className="fabric-guide-card">
              <img src={item.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="service-step-icon" />
              <h2 className="card-title-standard mt-5 text-[#1d2521]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
              <div className="fabric-guide-facts">
                <p>
                  <strong>{t.bestForLabel}</strong> {item.bestFor}
                </p>
                <p>
                  <strong>{t.checkLabel}</strong> {item.check}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">{t.reviewKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.reviewTitle}</h2>
          <div className="chip-list mt-5">
            {fabricOptions.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
