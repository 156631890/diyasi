import type { Metadata } from "next";
import Link from "next/link";

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
  certTitle: string;
  certDesc: string;
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
    certTitle: "Our Certificate",
    certDesc: "Your trusted source for sustainable intimates. Our factory has certifications including BSCI, SEDEX, ISO 9001, and OEKO-TEX.",
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
    certTitle: "我们的证书",
    certDesc: "您值得信赖的可持续内衣来源。我们的工厂拥有BSCI、SEDEX、ISO 9001和OEKO-TEX认证。",
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
    certTitle: "Nuestros Certificados",
    certDesc: "Su fuente confiable de ropa interior sostenible. Certificaciones BSCI, SEDEX, ISO 9001, OEKO-TEX.",
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
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
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

      {/* Certificates */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t.certTitle}</h2>
          <p className="text-gray-600 text-center mb-10">{t.certDesc}</p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['BSCI', 'SEDEX', 'ISO 9001', 'OEKO-TEX'].map((cert, idx) => (
              <div key={idx} className="bg-white px-8 py-6 rounded-lg shadow-sm flex items-center justify-center min-w-[150px]">
                <span className="text-xl font-bold text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t.serviceTitle}</h2>
          <p className="text-gray-600 text-center mb-10">{t.serviceDesc}</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.services.map((service, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
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
      <section className="py-16 md:py-24 bg-amber-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{t.contactTitle}</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{t.contactDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-amber-600 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              Send Message
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-amber-600 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
