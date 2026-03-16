import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import HeroCarousel from "@/components/HeroCarousel";
import { fallbackCatalogCategories } from "@/lib/catalog";
import { getCatalogCategories, getCatalogProducts } from "@/lib/catalog-source";
import { SiteLang } from "@/lib/i18n";
import { resolveDisplayProductId, resolveDisplayTitle, resolvePrimaryImage, topFamily, type DisplayProduct } from "@/lib/product-display";
import { buildMetadata } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";

export const metadata: Metadata = buildMetadata({
  title: "Private Label Underwear Manufacturer",
  description: "YiWu DiYaSi manufactures underwear, bras, shapewear, and activewear for wholesalers, retailers, and DTC brands.",
  path: "/"
});

type ProductCategory = {
  category: string;
  count: number;
};

type DisplayProductWithImage = DisplayProduct & { image: string };

function AdvantageIcon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex h-20 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#d8c2b0_0%,#c9ae98_100%)] text-[#5f3123]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,250,242,0.82)] shadow-[inset_0_0_0_1px_rgba(95,49,35,0.08)]">
        {children}
      </div>
    </div>
  );
}

function resolveHomeProductTitle(product: DisplayProduct): string {
  const family = topFamily(product.category);
  if (family === "Women's Panties") return "Women's Panties";
  if (family === "Bras") return "Bras";
  if (family === "Men's Underwear") return "Men's Underwear";
  if (family === "Activewear") return "Activewear";
  return resolveDisplayTitle(product)
    .replace(/\b(?:women's|womens|men's|mens)\b/gi, "")
    .replace(/\b(?:underwear|panties|bra|bras|activewear|wear)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const copy: Record<SiteLang, {
  heroTitle: string;
  heroDesc: string;
  mainProducts: string;
  mainProductsDesc: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutStats: Array<{ value: string; label: string }>;
  factoryTitle: string;
  factoryDesc: string;
  serviceTitle: string;
  serviceDesc: string;
  services: Array<{ title: string; desc: string; icon: string }>;
  contactTitle: string;
  contactDesc: string;
}> = {
  en: {
    heroTitle: "Professional OEM/ODM Underwear Manufacturer",
    heroDesc: "Specializing in seamless underwear, bras, shapewear, and activewear since 2002",
    mainProducts: "Main Products",
    mainProductsDesc: "We have sufficient ready-to-ship stock products with varieties of designs and colors to satisfy your needs.",
    aboutTitle: "About YiWu DiYaSi",
    aboutDesc: "Founded in 2002, YiWu DiYaSi is located in Yiwu City, Zhejiang Province — China's renowned hub for underwear manufacturing. With over 20,000㎡ of factory space and more than 100 skilled employees, we are a modern factory specializing in the design, development, and production of women's underwear, bras, period underwear, and shapewear. We provide full-service OEM and ODM solutions to global brands.",
    aboutStats: [
      { value: "23+", label: "Years Experience" },
      { value: "20,000㎡", label: "Factory Space" },
      { value: "100+", label: "Skilled Employees" },
      { value: "600K+", label: "Monthly Output" }
    ],
    factoryTitle: "Our Factory",
    factoryDesc: "Tour our state-of-the-art manufacturing facility",
    serviceTitle: "Our Service",
    serviceDesc: "Professional underwear manufacturer supplying OEM designs and supporting OEM orders.",
    services: [
      { title: "Customized Logo", desc: "MOQ: 500PCS, Lead Time 14-24 Days", icon: "🏷️" },
      { title: "Customized Design", desc: "MOQ: 1000PCS, Lead Time 60 Days", icon: "✏️" },
      { title: "Customized Package", desc: "MOQ: 1000PCS, Lead Time 14-21 Days", icon: "📦" }
    ],
    contactTitle: "Contact Us",
    contactDesc: "If you are interested in our products and looking for wholesale, or looking to customize your design, please leave a message here."
  },
  zh: {
    heroTitle: "专业 OEM/ODM 内衣制造商",
    heroDesc: "自2002年起专注于无缝内衣、文胸、塑形衣和运动服饰",
    mainProducts: "主要产品",
    mainProductsDesc: "我们有充足的现货产品，款式和颜色多样，满足您的需求。",
    aboutTitle: "关于迪雅斯",
    aboutDesc: "义乌迪雅斯成立于2002年，位于浙江省义乌市——中国知名的内衣制造中心。拥有超过20,000平方米的工厂空间和100多名熟练员工，我们是一家现代化工厂，专业从事女士内衣、文胸、经期内衣和塑形衣的设计、开发和生产。我们为全球品牌提供全方位的OEM和ODM解决方案。",
    aboutStats: [
      { value: "23+", label: "年经验" },
      { value: "20,000㎡", label: "工厂面积" },
      { value: "100+", label: "熟练员工" },
      { value: "60万+", label: "月产量" }
    ],
    factoryTitle: "我们的工厂",
    factoryDesc: "参观我们最先进的制造设施",
    serviceTitle: "我们的服务",
    serviceDesc: "专业内衣制造商，提供OEM设计和OEM订单支持。",
    services: [
      { title: "定制Logo", desc: "起订量:500件，交期14-24天", icon: "🏷️" },
      { title: "定制设计", desc: "起订量:1000件，交期60天", icon: "✏️" },
      { title: "定制包装", desc: "起订量:1000件，交期14-21天", icon: "📦" }
    ],
    contactTitle: "联系我们",
    contactDesc: "如果您对我们的产品感兴趣，寻求批发或定制设计，请在此留言。"
  },
  es: {
    heroTitle: "Fabricante Profesional de Ropa Interior OEM/ODM",
    heroDesc: "Especializados en ropa interior sin costuras, sostenes y ropa deportiva desde 2002",
    mainProducts: "Productos Principales",
    mainProductsDesc: "Tenemos suficientes productos stock con variedad de diseños y colores.",
    aboutTitle: "Sobre YiWu DiYaSi",
    aboutDesc: "Fundada en 2002, YiWu DiYaSi se encuentra en Yiwu, provincia de Zhejiang. Con más de 20,000㎡ de fábrica y más de 100 empleados especializados, somos una fábrica moderna especializada en diseño y producción de ropa interior.",
    aboutStats: [
      { value: "23+", label: "Años Experiencia" },
      { value: "20,000㎡", label: "Espacio Fábrica" },
      { value: "100+", label: "Empleados" },
      { value: "600K+", label: "Producción Mensual" }
    ],
    factoryTitle: "Nuestra Fábrica",
    factoryDesc: "Visite nuestras instalaciones de fabricación",
    serviceTitle: "Nuestro Servicio",
    serviceDesc: "Fabricante profesional de ropa interior con diseños OEM.",
    services: [
      { title: "Logo Personalizado", desc: "MOQ: 500 unidades, 14-24 días", icon: "🏷️" },
      { title: "Diseño Personalizado", desc: "MOQ: 1000 unidades, 60 días", icon: "✏️" },
      { title: "Empaque Personalizado", desc: "MOQ: 1000 unidades, 14-21 días", icon: "📦" }
    ],
    contactTitle: "Contáctenos",
    contactDesc: "Si está interesado en nuestros productos, deje un mensaje aquí."
  }
};

async function getCategories(): Promise<ProductCategory[]> {
  const categories = await getCatalogCategories();
  return categories.length > 0 ? categories : fallbackCatalogCategories;
}

async function getFeaturedShowcase(): Promise<DisplayProductWithImage[]> {
  const products = (await getCatalogProducts()) as DisplayProduct[];
  const targetFamilies = ["Women's Panties", "Bras", "Men's Underwear", "Activewear"];
  const selected = targetFamilies
    .map((family) => products.find((item) => topFamily(item.category) === family))
    .filter((item): item is DisplayProduct => Boolean(item));

  const source = selected.length >= 8 ? selected.slice(0, 8) : products.slice(0, 8);

  return source.map((product) => ({
    ...product,
    image: resolvePrimaryImage(product)
  }));
}

export default async function HomePage() {
  const lang = getServerLang();
  const t = copy[lang];
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedShowcase()
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YiWu DiYaSi Dress CO., LTD",
    url: "https://www.yiwudiyasidress.com",
    description: "Premium sustainable underwear manufacturing partner.",
    areaServed: "Worldwide",
    knowsLanguage: ["en", "zh", "es"]
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t.mainProducts}</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">{t.mainProductsDesc}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.product_id}
                href={`/products/${encodeURIComponent(product.product_id)}`}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[5/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={resolveDisplayTitle(product)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                      {resolveHomeProductTitle(product)}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {resolveDisplayProductId(product)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7dd_0%,#f4e2b8_55%,#ead09a_100%)] py-14 md:py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <p className="text-3xl font-bold uppercase tracking-[0.14em] text-[#6a3524] md:text-4xl">OUR ADVANTAGES</p>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#7d4f3e] md:text-lg">
            YiWu DiYaSi Dress CO., LTD. 23+ Years Professional Underwear Manufacturer for Supplying OEM Designs And
            Support OEM Order.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "24H Design Service",
                desc: "We transform your initial idea into a professional design concept and provide a solution within 24 hours.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5Z" />
                    <path d="M13.5 7 17 10.5" />
                    <path d="M8 20h12" />
                  </svg>
                )
              },
              {
                title: "7 Day Sample Delivery",
                desc: "Your custom-made samples will be ready for your evaluation in just 7 days, accelerating your time to market.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="5" width="16" height="15" rx="2.5" />
                    <path d="M8 3v4M16 3v4M4 10h16" />
                    <path d="M10 14h4l-3 4" />
                  </svg>
                )
              },
              {
                title: "Flexible Customization",
                desc: "Low MOQ starts from 100pcs per SKU, providing the flexibility you need to grow your brand with minimal risk.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 8.5C6 6.57 7.57 5 9.5 5c1.14 0 2.15.54 2.79 1.39A3.47 3.47 0 0 1 15.5 5C17.43 5 19 6.57 19 8.5c0 3.57-7 8.5-7 8.5s-6-4.93-6-8.5Z" />
                    <path d="M8 19h8" />
                  </svg>
                )
              },
              {
                title: "Express Delivery",
                desc: "Our strategic location and reliable logistics network ensure your orders are delivered swiftly and securely.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 7h11v8H3z" />
                    <path d="M14 10h3l3 3v2h-6z" />
                    <circle cx="7.5" cy="18" r="1.5" />
                    <circle cx="17.5" cy="18" r="1.5" />
                    <path d="M5 18H4m16 0h-1" />
                  </svg>
                )
              }
            ].map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-[rgba(163,116,80,0.18)] bg-[rgba(255,250,242,0.88)] p-5 text-left shadow-[0_18px_34px_rgba(125,79,62,0.10)] backdrop-blur"
              >
                <AdvantageIcon>{item.icon}</AdvantageIcon>
                <h3 className="text-lg font-bold text-[#5f3123]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#7d4f3e]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Video Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Video */}
            <div className="order-2 lg:order-1">
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                <video
                  src="/media/home/factory-video.mp4"
                  controls
                  poster="/media/home/banner-2.png"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.aboutTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t.aboutDesc}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {t.aboutStats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-2xl md:text-3xl font-bold text-amber-600">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t.factoryTitle}</h2>
          <p className="text-gray-600 text-center mb-10">{t.factoryDesc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img src="/media/home/factory-1.jpg" alt="Factory" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <img src="/media/home/factory-2.jpg" alt="Factory" className="w-full h-40 md:h-48 object-cover rounded-lg" />
            </div>
            <div>
              <img src="/media/home/factory-3.jpg" alt="Factory" className="w-full h-40 md:h-48 object-cover rounded-lg" />
            </div>
            <div>
              <img src="/media/home/factory-4.jpg" alt="Factory" className="w-full h-40 md:h-48 object-cover rounded-lg" />
            </div>
            <div>
              <img src="/media/home/factory-5.jpg" alt="Factory" className="w-full h-40 md:h-48 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(210,157,104,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(156,104,72,0.28),transparent_32%),linear-gradient(135deg,#241714_0%,#34221b_52%,#1e1512_100%)] py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,228,201,0.72),transparent)]" />
          <div className="absolute left-[8%] top-8 h-28 w-28 rounded-full border border-white/10" />
          <div className="absolute right-[10%] top-16 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-[24%] h-24 w-24 rounded-full border border-white/10" />
        </div>
        <div className="container relative mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">Product Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.category}
                href={`/products?category=${encodeURIComponent(cat.category)}`}
                className="bg-gray-800 p-6 text-center rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <span className="text-white font-medium group-hover:text-amber-400">{cat.category}</span>
                <span className="block text-sm text-gray-400 mt-1">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,243,228,0.42),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(191,114,75,0.24),transparent_28%),linear-gradient(135deg,#c9835e_0%,#bb714b_42%,#a45a3b_100%)] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <div className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#f7d0b5]/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,245,236,0.8),transparent)]" />
        </div>
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid gap-8 overflow-hidden rounded-[28px] bg-white/10 p-6 shadow-[0_24px_60px_rgba(91,45,19,0.18)] backdrop-blur-sm md:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <div className="relative min-h-[300px] overflow-hidden rounded-[24px] bg-[#f6dfcf]">
              <iframe
                title="YiWu DiYaSi location map"
                src="https://www.google.com/maps?q=NO%2016%20DaShi%20Road%2C%20FoTang%20Town%2C%20Yiwu%2C%20Zhejiang%2C%20China&z=15&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/88 px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b15d39]">Location</p>
                <p className="mt-1 text-sm font-semibold text-[#6e3924]">FoTang Town, Yiwu, Zhejiang, China</p>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#fff7f1] p-6 text-[#6e3924] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c46d45]">Contact Us</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">YiWu DiYaSi Dress Co.. LTD</h2>
              <div className="mt-6 space-y-5 text-sm leading-7 md:text-base">
                <div>
                  <p className="font-semibold text-[#b15d39]">Company Adderss / Manufacturing Locations:</p>
                  <p>NO 16 DaShi Road ,FoTang Town ,Yiwu, Zhejiang</p>
                  <p>China</p>
                </div>
                <div>
                  <p className="font-semibold text-[#b15d39]">Email:</p>
                  <p>
                    <a
                      href="mailto:imbella.annie@diyasidress.com"
                      className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]"
                    >
                      imbella.annie@diyasidress.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:imbella.vicky@diyasidress.com"
                      className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]"
                    >
                      imbella.vicky@diyasidress.com
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#b15d39]">Mobie/whatsApp:</p>
                  <p className="flex flex-wrap gap-4">
                    <a
                      href="tel:+8618042579030"
                      className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]"
                    >
                      +86 18042579030
                    </a>
                    <a
                      href="https://wa.me/8618042579030"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]"
                    >
                      Open WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
