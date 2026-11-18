import Link from "next/link";
import { companyInfo } from "@/lib/site-info";
import { localeHref } from "@/lib/locale-routes";
import type { SiteLang } from "@/lib/i18n";
export default function SiteFooter({ initialLang }: { initialLang: SiteLang | "ru" }) {
  const ru = initialLang === "ru";
  const locale = ru ? "ru" : initialLang === "es" ? "es" : "en";
  const spanish = initialLang === "es";
  const russianLabels: Record<string,string> = {"Sourcing": "Закупки", "Manufacturers": "Производители", "Buying guides": "Руководства", "The collections": "Коллекции", "Women's underwear": "Женское белье", "Cotton essentials": "Хлопковое белье", "Lace intimates": "Кружевное белье", "Seamless underwear": "Бесшовное белье", "Men's essentials": "Мужское белье", "Your brand, our craft": "Для вашего бренда", "Private label & OEM": "Собственная марка и OEM", "Fabrics & finishes": "Ткани и отделка", "Labels & packaging": "Этикетки и упаковка", "Factory & quality": "Фабрика и качество", "Sourcing guides": "Материалы для закупок", "News & insights": "Статьи", "About DIYASI": "О DIYASI", "Our story": "Наша история", "Responsible choices": "Ответственное производство", "Contact the atelier": "Связаться с командой", "Privacy": "Конфиденциальность", "Samples & returns": "Образцы и возвраты"};
  const labels: Record<string, string> = {
    Sourcing: "Compras", Manufacturers: "Fabricantes", "Buying guides": "Guías de compra",
    "The collections": "Las colecciones",
    "Women's underwear": "Ropa interior femenina",
    "Cotton essentials": "Básicos de algodón",
    "Lace intimates": "Lencería de encaje",
    "Seamless underwear": "Ropa interior sin costuras",
    "Men's essentials": "Básicos masculinos",
    "Your brand, our craft": "Tu marca, nuestro oficio",
    "Private label & OEM": "Servicios de marca propia",
    "Fabrics & finishes": "Tejidos y acabados",
    "Labels & packaging": "Etiquetas y empaque",
    "Factory & quality": "Fábrica y calidad",
    "Sourcing guides": "Guías para compradores",
    "News & insights": "Noticias y novedades",
    "About DIYASI": "Sobre DIYASI",
    "Our story": "Nuestra historia",
    "Responsible choices": "Decisiones responsables",
    "Contact the atelier": "Contactar al equipo",
    Privacy: "Privacidad",
    "Samples & returns": "Muestras y devoluciones",
  };
  const localizedHref = (path: string) =>
    localeHref(locale, path) ?? path;
  const groups = [
    { title: "Sourcing", links: [["Manufacturers", "/manufacturers"],["Buying guides", "/guides"],["Private label & OEM", "/oem-odm"],["Factory & quality", "/factory"],["Fabrics & finishes", "/fabrics"],["Labels & packaging", "/packaging"],["Responsible choices", "/sustainability"],["Sourcing guides", "/resources"],["Contact the atelier", "/contact"]] },
    {
      title: "The collections",
      links: [
        ["Women's underwear", "/products/womens-panties"],
        ["Cotton essentials", "/products/cotton-underwear"],
        ["Lace intimates", "/products/lace-underwear"],
        ["Seamless underwear", "/products/seamless-underwear"],
        ["Men's essentials", "/products/mens-underwear"],
      ],
    },
    {
      title: "Your brand, our craft",
      links: [
        ["Private label & OEM", "/oem-odm"],
        ["Fabrics & finishes", "/fabrics"],
        ["Labels & packaging", "/packaging"],
        ["Factory & quality", "/factory"],
        ["Sourcing guides", "/resources"],
      ],
    },
    {
      title: "About DIYASI",
      links: [
        ["Our story", "/about"],
        ["News & insights", "/news"],
        ["Responsible choices", "/sustainability"],
        ["Contact the atelier", "/contact"],
        ["Privacy", "/privacy-policy"],
        ["Samples & returns", "/return-policy"],
      ],
    },
  ];
  return (
    <footer className="d-footer">
      <section className="d-footer-invitation">
        <div>
          <p className="d-eyebrow">
            {ru ? "Новая коллекция начинается здесь" : spanish ? "Algo bonito empieza aquí"
              : "Something beautiful starts here"}
          </p>
          <h2>
            {ru ? "Ваша следующая коллекция." : spanish ? "Tu próxima colección." : "Your next collection."}
            <br />
            <em>
              {ru ? "Создадим ее вместе." : spanish ? "Un comienzo compartido." : "Our shared beginning."}
            </em>
          </h2>
        </div>
        <Link
          href={localizedHref("/contact")}
          className="d-button d-button-light"
        >
          {ru ? "Обсудить коллекцию" : spanish ? "Creemos tu colección" : "Let’s make it yours"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <div className="d-footer-grid">
        <div className="d-footer-brand">
          <Link href={localizedHref("/")} className="d-wordmark">
            DIYASI<span>INTIMATES, THOUGHTFULLY MADE</span>
          </Link>
          <p>
            {ru ? "От выбора ткани до финальной отделки. Нижнее белье на каждый день, произведенное в Иу для брендов разных стран." : spanish ? "Desde el primer tejido hasta el último detalle. Ropa interior para cada día, fabricada en Yiwu para marcas de todo el mundo."
              : "From the first fabric choice to the finishing touch. A family of everyday intimates, made in Yiwu for brands around the world."}
          </p>
          <a href={`mailto:${companyInfo.emailPrimary}`}>
            {companyInfo.emailPrimary}
          </a>
          <a href={companyInfo.phoneHref}>{companyInfo.phone}</a>
          <p className="d-fineprint">{companyInfo.address}</p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3>{ru ? (russianLabels[group.title] ?? group.title) : spanish ? (labels[group.title] ?? group.title) : group.title}</h3>
            {group.links.map(([label, href]) => (
              <Link key={href} href={localizedHref(href)}>
                {ru ? (russianLabels[label] ?? label) : spanish ? (labels[label] ?? label) : label}{locale !== "en" && !localeHref(locale,href) ? " (EN)" : ""}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="d-footer-bottom">
        <p>© {new Date().getFullYear()} YiWu DiYaSi Dress Co., Ltd.</p>
        <div>
          <a
            href="https://www.diyasiunderwear.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ru ? "Сайт производителя DIYASI (EN)" : spanish ? "Sitio del fabricante DIYASI (EN)" : "DIYASI manufacturer site"} ↗
          </a>
          <a
            href={companyInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href={companyInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
