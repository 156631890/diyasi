import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";
import { SiteLang } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: "Custom Underwear Packaging",
  description:
    "Private label underwear packaging options including waistband, care label, heat transfer logo, hangtag, polybag, gift box, barcode sticker, and carton mark.",
  path: "/packaging"
});

type PackagingRouteItem = {
  title: string;
  desc: string;
  icon: string;
};

type ShowcaseItem = {
  name: string;
  desc: string;
  icon: string;
};

const copy: Record<
  SiteLang,
  {
    heroKicker: string;
    heroTitle: string;
    heroDesc: string;
    optionsKicker: string;
    optionsTitle: string;
    cta: string;
    packagingRoutes: PackagingRouteItem[];
    options: ShowcaseItem[];
  }
> = {
  en: {
    heroKicker: "Private Label Packaging",
    heroTitle: "Custom labels and packaging for underwear brands",
    heroDesc: "Packaging decisions should be made before bulk production, not after. We help brands align label position, care label content, hangtag, polybag, gift box, barcode sticker, and carton mark early in the development route.",
    optionsKicker: "Packaging Options",
    optionsTitle: "Options buyers can combine by project",
    cta: "Start Packaging Discussion",
    packagingRoutes: [
      {
        title: "Starter Private Label",
        desc: "Use proven product bodies with custom care labels, size labels, simple polybags, and barcode stickers.",
        icon: "/media/generated/icons/input-style.png"
      },
      {
        title: "Retail-Ready Packaging",
        desc: "Add hangtags, branded polybags, outer carton marks, SKU labels, and packing rules for retail or marketplace workflows.",
        icon: "/media/generated/icons/planning.png"
      },
      {
        title: "Premium DTC Packaging",
        desc: "Develop coordinated waistband, heat transfer logo, hangtag, gift box, insert card, and launch-ready packaging presentation.",
        icon: "/media/generated/icons/packaging-box.png"
      }
    ],
    options: [
      { name: "Custom Waistband", desc: "Woven Jacquard or printed elastic bands with your brand logo.", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "Heat Transfer Label", desc: "Tagless comfort with screen-printed care labels inside.", icon: "/media/generated/icons/input-artwork.png" },
      { name: "Custom Hangtag", desc: "Premium cardstock hangtags with plastic or cotton strings.", icon: "/media/generated/icons/planning.png" },
      { name: "Premium Zip Bag", desc: "Frosted or clear EVA/PE zipper bags with custom artwork.", icon: "/media/generated/icons/input-channel.png" },
      { name: "Custom Gift Box", desc: "Rigid or folding cardboard boxes for premium retail packaging.", icon: "/media/generated/icons/packaging-box.png" },
      { name: "Barcode & Carton Mark", desc: "Retail-ready SKU barcodes, sticker marks, and shipping specs.", icon: "/media/generated/icons/qc-check.png" }
    ]
  },
  zh: {
    heroKicker: "贴牌定制包装",
    heroTitle: "写给内衣品牌的定制标签与包装设计",
    heroDesc: "包装决策应当在批量投产前，而不是在交货前决定。我们协助品牌在开发初期即对齐洗水唛位置、洗涤标识内容、吊牌、包装袋、礼盒、条码贴纸及外箱唛头。",
    optionsKicker: "包装配置选项",
    optionsTitle: "买家可根据项目要求组合的包装选项",
    cta: "开启包装设计讨论",
    packagingRoutes: [
      {
        title: "基础贴牌定制 (Starter)",
        desc: "使用成熟的产品版型，搭配定制 of 贴水唛、尺码标、简易自粘袋以及条形码贴纸。",
        icon: "/media/generated/icons/input-style.png"
      },
      {
        title: "线下零售包装 (Retail-Ready)",
        desc: "添加吊牌、印刷品牌包装袋、外箱唛头、SKU 标签，并按照零售或电商平台规范进行大货箱规规划。",
        icon: "/media/generated/icons/planning.png"
      },
      {
        title: "高端 DTC 电商包装 (Premium)",
        desc: "统一开发腰带、无感烫印 Logo、吊牌、品牌礼品盒、感谢卡/插卡，呈现极具高级感的电商品牌专属包装。",
        icon: "/media/generated/icons/packaging-box.png"
      }
    ],
    options: [
      { name: "专属定制提花腰带", desc: "提花织造或印花弹力松紧带，印刻您的品牌标志性设计。", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "无缝无感热转印洗水唛", desc: "免缝线无感舒适度，大货高清晰度丝网印刷内标。", icon: "/media/generated/icons/input-artwork.png" },
      { name: "高质感纸制/卡纸吊牌", desc: "可定制特种纸、卡纸厚度，搭配棉绳或塑料绳扣。", icon: "/media/generated/icons/planning.png" },
      { name: "定制磨砂拉链袋/PE包装袋", desc: "EVA或PE材质，可定制排气孔和单色/彩色图案。", icon: "/media/generated/icons/input-channel.png" },
      { name: "高档精美包装礼盒", desc: "折叠纸盒或天地盖硬纸盒，提升品牌零售溢价感。", icon: "/media/generated/icons/packaging-box.png" },
      { name: "SKU条形码与外箱贴纸", desc: "合规条码、尺码标以及符合全球亚马逊/海外仓唛头。", icon: "/media/generated/icons/qc-check.png" }
    ]
  },
  es: {
    heroKicker: "Empaque de Marca Propia",
    heroTitle: "Etiquetas y empaques personalizados para marcas de ropa interior",
    heroDesc: "Las decisiones de empaque deben tomarse antes de la producción a granel, no después. Ayudamos a las marcas a coordinar la posición de etiquetas, contenido de lavado, hangtags, bolsas, cajas de regalo y marcas de cartón.",
    optionsKicker: "Opciones de Empaque",
    optionsTitle: "Opciones que los compradores pueden combinar por proyecto",
    cta: "Iniciar Discusión de Empaque",
    packagingRoutes: [
      {
        title: "Marca Propia Básica",
        desc: "Utiliza moldes probados con etiquetas de cuidado y talla personalizadas, bolsas de polietileno básicas y etiquetas de código de barras.",
        icon: "/media/generated/icons/input-style.png"
      },
      {
        title: "Listo para Retail",
        desc: "Añade etiquetas colgantes, bolsas impresas con marca, marcas de cartón exterior, SKU y reglas de empaque para minoristas.",
        icon: "/media/generated/icons/planning.png"
      },
      {
        title: "Premium DTC",
        desc: "Desarrolla pretina coordinada, logotipo transferido por calor, etiqueta colgante, caja de regalo, tarjeta de inserto y presentación premium.",
        icon: "/media/generated/icons/packaging-box.png"
      }
    ],
    options: [
      { name: "Pretina Personalizada", desc: "Bandas elásticas tejidas en jacquard o impresas con su logotipo.", icon: "/media/generated/icons/sample-hanger.png" },
      { name: "Etiqueta Termotransferible", desc: "Comodidad sin etiquetas mediante impresión serigráfica de cuidado.", icon: "/media/generated/icons/input-artwork.png" },
      { name: "Etiqueta Colgante", desc: "Etiquetas de cartón premium con hilos de plástico o algodón.", icon: "/media/generated/icons/planning.png" },
      { name: "Bolsa de Cierre Premium", desc: "Bolsas de cremallera EVA/PE esmeriladas o transparentes.", icon: "/media/generated/icons/input-channel.png" },
      { name: "Caja de Regalo a Medida", desc: "Cajas de cartón rígidas o plegables para empaque minorista premium.", icon: "/media/generated/icons/packaging-box.png" },
      { name: "Código de Barras y Marca", desc: "Código de barras SKU listo para venta y especificaciones de envío.", icon: "/media/generated/icons/qc-check.png" }
    ]
  }
};

export default function PackagingPage() {
  const lang = getServerLang();
  const t = copy[lang];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Custom Packaging", path: "/packaging" }
  ]);

  return (
    <main className="container-shell page-shell page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="visual-hero page-hero">
        <div className="visual-hero-copy">
          <p className="kicker page-reference-subtitle">{t.heroKicker}</p>
          <h1 className="section-title mt-2 text-[#1d2521]">{t.heroTitle}</h1>
          <p className="page-reference-body mt-4 text-[#5f6b66]">
            {t.heroDesc}
          </p>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              {t.cta}
            </Link>
          </div>
        </div>
        <div className="visual-hero-media">
          <Image
            src="/media/generated/brand-launch/brand-identity-kit.png"
            alt="Private label underwear packaging and brand identity kit showcasing custom box, labels, and tags"
            width={1600}
            height={1000}
            priority
            className="visual-hero-image"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-3">
          {t.packagingRoutes.map((item) => (
            <article key={item.title} className="fabric-guide-card">
              <div className="showcase-icon-wrap">
                <img src={item.icon} alt={item.title} className="showcase-icon" loading="lazy" decoding="async" />
              </div>
              <h2 className="card-title-standard mt-2 text-[#1d2521]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-head">
          <p className="kicker page-reference-subtitle">{t.optionsKicker}</p>
          <h2 className="page-reference-subtitle mt-2 text-[#1d2521]">{t.optionsTitle}</h2>
        </div>
        <div className="editorial-showcase-grid mt-8">
          {t.options.map((item) => (
            <article key={item.name} className="showcase-card">
              <div className="showcase-icon-wrap">
                <img src={item.icon} alt={item.name} className="showcase-icon" loading="lazy" decoding="async" />
              </div>
              <h3 className="showcase-title">{item.name}</h3>
              <p className="showcase-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
