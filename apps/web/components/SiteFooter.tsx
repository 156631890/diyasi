import Link from "next/link";
import { companyInfo } from "@/lib/site-info";
import { localeHref } from "@/lib/locale-routes";
import type { SiteLang } from "@/lib/i18n";
export default function SiteFooter({ initialLang }: { initialLang: SiteLang }) {
  const spanish = initialLang === "es";
  const labels: Record<string, string> = {
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
    "News & insights": "Noticias y novedades (EN)",
    "About DIYASI": "Sobre DIYASI",
    "Our story": "Nuestra historia",
    "Responsible choices": "Decisiones responsables",
    "Contact the atelier": "Contactar al equipo",
    Privacy: "Privacidad",
    "Samples & returns": "Muestras y devoluciones",
  };
  const localizedHref = (path: string) =>
    initialLang === "es" ? (localeHref("es", path) ?? path) : path;
  const groups = [
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
            {spanish
              ? "Algo bonito empieza aquí"
              : "Something beautiful starts here"}
          </p>
          <h2>
            {spanish ? "Tu próxima colección." : "Your next collection."}
            <br />
            <em>
              {spanish ? "Un comienzo compartido." : "Our shared beginning."}
            </em>
          </h2>
        </div>
        <Link
          href={localizedHref("/contact")}
          className="d-button d-button-light"
        >
          {spanish ? "Creemos tu colección" : "Let’s make it yours"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <div className="d-footer-grid">
        <div className="d-footer-brand">
          <Link href={spanish ? "/es" : "/"} className="d-wordmark">
            DIYASI<span>INTIMATES, THOUGHTFULLY MADE</span>
          </Link>
          <p>
            {spanish
              ? "Desde el primer tejido hasta el último detalle. Ropa interior para cada día, fabricada en Yiwu para marcas de todo el mundo."
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
            <h3>{spanish ? labels[group.title] : group.title}</h3>
            {group.links.map(([label, href]) => (
              <Link key={href} href={localizedHref(href)}>
                {spanish ? labels[label] : label}
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
            DIYASI manufacturer site ↗
          </a>
          <a
            href="https://www.linkedin.com/company/111228105/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61586239027302"
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
