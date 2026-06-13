import type { Metadata } from "next";
import Link from "next/link";

import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { privateLabelOptions } from "@/lib/site-info";
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
        desc: "Use proven product bodies with custom care labels, size labels, simple polybags, and barcode stickers."
      },
      {
        title: "Retail-Ready Packaging",
        desc: "Add hangtags, branded polybags, outer carton marks, SKU labels, and packing rules for retail or marketplace workflows."
      },
      {
        title: "Premium DTC Packaging",
        desc: "Develop coordinated waistband, heat transfer logo, hangtag, gift box, insert card, and launch-ready packaging presentation."
      }
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
        desc: "使用成熟的产品版型，搭配定制的洗水唛、尺码标、简易自粘袋以及条形码贴纸。"
      },
      {
        title: "线下零售包装 (Retail-Ready)",
        desc: "添加吊牌、印刷品牌包装袋、外箱唛头、SKU 标签，并按照零售或电商平台规范进行大货箱规规划。"
      },
      {
        title: "高端 DTC 电商包装 (Premium)",
        desc: "统一开发腰带、无感烫印 Logo、吊牌、品牌礼品盒、感谢卡/插卡，呈现极具高级感的电商品牌专属包装。"
      }
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
        desc: "Utiliza moldes probados con etiquetas de cuidado y talla personalizadas, bolsas de polietileno básicas y etiquetas de código de barras."
      },
      {
        title: "Listo para Retail",
        desc: "Añade etiquetas colgantes, bolsas impresas con marca, marcas de cartón exterior, SKU y reglas de empaque para minoristas."
      },
      {
        title: "Premium DTC",
        desc: "Desarrolla pretina coordinada, logotipo transferido por calor, etiqueta colgante, caja de regalo, tarjeta de inserto y presentación premium."
      }
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

      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">{t.heroKicker}</p>
        <h1 className="section-title mt-2 text-[#1d2521]">{t.heroTitle}</h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">
          {t.heroDesc}
        </p>
      </section>

      <section className="page-section">
        <div className="grid gap-5 md:grid-cols-3">
          {t.packagingRoutes.map((item) => (
            <article key={item.title} className="rounded-lg border border-[#d9e2dc] bg-[#fffdf8] p-5">
              <h2 className="card-title-standard text-[#1d2521]">{item.title}</h2>
              <p className="page-reference-body mt-3 text-[#5f6b66]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-strip page-section">
        <div className="page-copy-wide">
          <p className="kicker page-reference-subtitle">{t.optionsKicker}</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">{t.optionsTitle}</h2>
          <div className="chip-list mt-5">
            {privateLabelOptions.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/contact" className="btn btn-primary">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
