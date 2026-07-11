import { moqRoutes } from "./moq-routes";
import { companyInfo, qualitySteps } from "./site-info";

export type LocalizedPageSection = {
  title: string;
  body: string;
  items?: readonly string[];
};

export type LocalizedFaq = {
  question: string;
  answer: string;
};

export type LocalizedCta = {
  href: string;
  label: string;
};

export type LocalizedFactSource = "company" | "moq" | "quality";

export type LocalizedPage = {
  path: string;
  englishPath: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  sections: readonly LocalizedPageSection[];
  factSources: readonly LocalizedFactSource[];
  faqs: readonly LocalizedFaq[];
  rfqCta: LocalizedCta;
  whatsAppCta: LocalizedCta;
  priorityCta?: LocalizedCta;
};

export const localizedCompanyFacts = [
  { label: "Empresa", value: companyInfo.name },
  { label: "Fundada", value: companyInfo.establishedYear },
  { label: "Área de fábrica", value: companyInfo.factoryArea },
  { label: "Equipo", value: companyInfo.employees },
  { label: "Capacidad mensual", value: companyInfo.monthlyCapacity },
  { label: "Dirección", value: companyInfo.address },
  { label: "Correo electrónico", value: companyInfo.emailPrimary },
  { label: "Teléfono", value: companyInfo.phone }
] as const;

const moqTranslations = {
  "ready-stock": {
    title: "Estilo de stock disponible o consolidado",
    label: "MOQ de stock disponible",
    summary: "El MOQ bajo solo está disponible para estilos de stock o consolidados cuando están disponibles."
  },
  "private-label": {
    title: "Marca propia",
    label: "MOQ de marca propia",
    summary: "Los programas de etiqueta de logo y cintura usan un MOQ independiente según los componentes requeridos."
  },
  "custom-color": {
    title: "Color personalizado",
    label: "MOQ de color personalizado",
    summary: "El MOQ de color personalizado depende del tejido, la ruta de teñido y el desarrollo del color."
  },
  "full-oem": {
    title: "OEM completo",
    label: "MOQ de OEM completo",
    summary: "El MOQ de OEM completo depende del patrón, el tejido y el empaque."
  }
} as const;

const moqValueTranslations = {
  "ready-stock": "desde 100 unidades por estilo cuando esté disponible",
  "private-label": "500 unidades por estilo para programas de etiqueta de logo o cintura",
  "custom-color": "1.000 unidades por color según el tejido y la ruta de teñido",
  "full-oem": "1.000-3.000 unidades por estilo según el patrón, el tejido y el empaque"
} as const;

export const localizedMoqRoutes = moqRoutes.map((route) => ({
  ...route,
  ...moqTranslations[route.id],
  value: moqValueTranslations[route.id]
}));

const qualityTranslations = [
  {
    title: "Inspección de tejido entrante",
    desc: "Antes de cortar o tejer se revisan el gramaje, la diferencia de color, la elasticidad, el encogimiento, el tacto y el estado de la superficie del tejido."
  },
  {
    title: "Inspección durante la producción",
    desc: "Durante la producción se revisan las costuras, la tolerancia de talla, la posición de la cintura, la construcción de la entrepierna, la colocación del logo y los hilos sueltos."
  },
  {
    title: "Inspección final",
    desc: "Antes de la entrega se revisan la talla final, el color, la cantidad, la etiqueta, el empaque, la marca de cartón y los detalles de envío."
  }
] as const;

export const localizedQualitySteps = qualitySteps.map((step, index) => ({
  ...step,
  ...qualityTranslations[index]!
}));

const rfqCta: LocalizedCta = { href: "/es/contacto", label: "Solicitar cotización" };
const whatsAppCta: LocalizedCta = { href: companyInfo.whatsapp, label: "Hablar por WhatsApp" };

type LocalizedPageContent = Omit<LocalizedPage, "rfqCta" | "whatsAppCta"> &
  Partial<Pick<LocalizedPage, "rfqCta" | "whatsAppCta">>;

function page(
  content: LocalizedPageContent
): LocalizedPage {
  return { ...content, rfqCta: content.rfqCta ?? rfqCta, whatsAppCta: content.whatsAppCta ?? whatsAppCta };
}

export const localizedPages: Readonly<Record<string, LocalizedPage>> = {
  "/es": page({
    path: "/es",
    englishPath: "/",
    title: "Fabricante de ropa interior de marca propia",
    description:
      "YiWu DiYaSi apoya a marcas, minoristas y compradores mayoristas con desarrollo de ropa interior de marca propia.",
    eyebrow: "Fabricante de ropa interior de marca propia",
    headline: "Desarrolle su colección de ropa interior con una fábrica en China",
    intro:
      "Converse con nuestro equipo sobre categoría, tejidos, muestras, etiquetado, empaque y volumen antes de definir su programa.",
    sections: [
      {
        title: "Programas para marcas y compradores",
        body: "Apoyamos colecciones de ropa interior, sujetadores, shapewear, activewear y homewear para marcas privadas, retail y mayoristas.",
        items: ["Selección de categoría y tejido", "Muestras y revisión de ajuste", "Etiquetas, empaque y producción"]
      },
      {
        title: "Planificación basada en requisitos",
        body: "Comparta mercado objetivo, cantidades, referencias y necesidades de empaque para revisar una ruta de desarrollo adecuada."
      }
    ],
    factSources: ["company", "moq"],
    faqs: [
      {
        question: "¿Cómo se define el pedido mínimo?",
        answer: "El MOQ depende de la disponibilidad del estilo, los componentes de marca, el color, el patrón, el tejido y el empaque."
      },
      {
        question: "¿Qué información debo enviar para solicitar una cotización?",
        answer: "Comparta categoría, estilos de referencia, cantidad prevista, tejido, color, necesidades de marca y empaque."
      }
    ],
    priorityCta: { href: "/es/minimo-pedido-ropa-interior", label: "Ver opciones de pedido mínimo" }
  }),
  "/es/productos/ropa-interior-marca-privada": page({
    path: "/es/productos/ropa-interior-marca-privada",
    englishPath: "/products",
    title: "Ropa interior de marca propia",
    description:
      "Explore categorías de ropa interior para programas de marca propia, retail y mayoristas con YiWu DiYaSi.",
    eyebrow: "Colecciones de ropa interior",
    headline: "Ropa interior de marca propia para su colección",
    intro:
      "Revise categorías y defina el programa con información sobre tejido, ajuste, etiqueta, empaque y cantidad antes de solicitar una cotización.",
    sections: [
      {
        title: "Categorías disponibles",
        body: "La gama incluye ropa interior femenina y masculina, sujetadores, shapewear, ropa interior sin costuras, activewear, homewear y opciones para periodos.",
        items: ["Braguitas, bóxers y básicos", "Sujetadores y bralettes", "Shapewear y ropa interior sin costuras"]
      },
      {
        title: "Defina el alcance de su programa",
        body: "La disponibilidad, los detalles de producto y los requisitos de producción se confirman según su proyecto antes de cotizar."
      }
    ],
    factSources: ["company"],
    faqs: [
      {
        question: "¿Qué categorías de ropa interior puedo consultar?",
        answer: "Puede consultar ropa interior femenina y masculina, sujetadores, shapewear, ropa interior sin costuras, activewear, homewear y opciones para periodos."
      },
      {
        question: "¿La disponibilidad se confirma antes de cotizar?",
        answer: "Sí. La disponibilidad, los detalles de producto y los requisitos de producción se confirman según cada proyecto antes de cotizar."
      }
    ]
  }),
  "/es/minimo-pedido-ropa-interior": page({
    path: "/es/minimo-pedido-ropa-interior",
    englishPath: "/low-moq",
    title: "Pedido mínimo de ropa interior",
    description:
      "Revise los rangos de pedido mínimo de YiWu DiYaSi para programas de ropa interior de marca propia y OEM.",
    eyebrow: "Pedido mínimo",
    headline: "Planifique su pedido mínimo de ropa interior según el programa",
    intro:
      "El pedido mínimo depende de si el estilo está disponible, de los componentes de marca, del color y de la complejidad del producto. Revise cada nivel antes de planificar su pedido.",
    sections: [
      {
        title: "El MOQ depende de la ruta de producción",
        body: "Los estilos disponibles, los programas de etiqueta, los colores personalizados y el OEM completo tienen condiciones distintas."
      },
      {
        title: "Información útil para la primera consulta",
        body: "Incluya categoría, estilo de referencia, cantidad prevista, tejido, color y necesidades de etiqueta o empaque."
      }
    ],
    factSources: ["moq"],
    faqs: [
      {
        question: "¿Hay MOQ bajo para todos los estilos?",
        answer: "No. El MOQ bajo solo está disponible para estilos de stock o consolidados cuando están disponibles."
      },
      {
        question: "¿Qué define el MOQ de OEM completo?",
        answer: "El MOQ de OEM completo depende del patrón, el tejido y el empaque."
      }
    ]
  }),
  "/es/ropa-interior-sin-costuras": page({
    path: "/es/ropa-interior-sin-costuras",
    englishPath: "/products/seamless-underwear",
    title: "Ropa interior sin costuras de marca propia",
    description:
      "Desarrolle ropa interior sin costuras de marca propia con YiWu DiYaSi para colecciones de retail, DTC y mayoristas.",
    eyebrow: "Ropa interior sin costuras",
    headline: "Desarrolle una colección de ropa interior sin costuras",
    intro:
      "Hable con el equipo sobre estilo, tejido, ajuste, colores, marca y empaque para definir un programa de ropa interior sin costuras.",
    sections: [
      {
        title: "Opciones de producto",
        body: "Las colecciones pueden incluir braguitas sin costuras, tangas, boyshorts, sujetadores sin costuras y básicos coordinados.",
        items: ["Dirección de ajuste y cobertura", "Tejido y tacto", "Marca de cintura y etiquetas"]
      },
      {
        title: "Revise los requisitos antes de producir",
        body: "La ruta de muestra y producción se revisa según el estilo, el color, los componentes y la cantidad solicitada."
      }
    ],
    factSources: ["company"],
    faqs: [
      {
        question: "¿Qué productos sin costuras se pueden consultar?",
        answer: "Las colecciones pueden incluir braguitas sin costuras, tangas, boyshorts, sujetadores sin costuras y básicos coordinados."
      },
      {
        question: "¿Qué requisitos afectan la ruta de muestra?",
        answer: "El estilo, el color, los componentes y la cantidad solicitada determinan la ruta de muestra y producción."
      }
    ]
  }),
  "/es/fabricante-ropa-interior-china": page({
    path: "/es/fabricante-ropa-interior-china",
    englishPath: "/oem-odm",
    title: "Fabricante de ropa interior en China",
    description:
      "YiWu DiYaSi apoya el desarrollo OEM y ODM de ropa interior de marca propia desde la muestra hasta el empaque.",
    eyebrow: "Fabricante OEM y ODM",
    headline: "Un fabricante de ropa interior en China para programas de marca propia",
    intro:
      "Coordine diseño, tejido, muestras, marca y empaque con un equipo de fábrica antes de programar la producción.",
    sections: [
      {
        title: "Desarrollo de marca propia",
        body: "El programa puede incluir dirección de diseño, selección de tejido, desarrollo de muestras, componentes de marca y empaque personalizado.",
        items: ["Diseño y referencia de producto", "Muestras y revisión de ajuste", "Etiquetas, cintura y empaque"]
      },
      {
        title: "Defina una ruta práctica",
        body: "Los requisitos de patrón, tejido, empaque y cantidad determinan la ruta de desarrollo y el pedido mínimo aplicable."
      }
    ],
    factSources: ["company"],
    faqs: [
      {
        question: "¿Qué puede incluir un programa de marca propia?",
        answer: "Puede incluir dirección de diseño, selección de tejido, desarrollo de muestras, componentes de marca y empaque personalizado."
      },
      {
        question: "¿Qué determina la ruta de desarrollo?",
        answer: "Los requisitos de patrón, tejido, empaque y cantidad determinan la ruta de desarrollo y el pedido mínimo aplicable."
      }
    ]
  }),
  "/es/empaque-personalizado": page({
    path: "/es/empaque-personalizado",
    englishPath: "/packaging",
    title: "Empaque personalizado para ropa interior",
    description:
      "Revise opciones de empaque personalizado para programas de ropa interior de marca propia con YiWu DiYaSi.",
    eyebrow: "Empaque personalizado",
    headline: "Empaque personalizado que acompaña su programa de ropa interior",
    intro:
      "Planifique las opciones de marca y empaque junto con el producto para que las etiquetas, códigos y marcas de cartón se definan antes de producción.",
    sections: [
      {
        title: "Opciones de marca y empaque",
        body: "Las opciones compartidas por la fábrica incluyen cintura personalizada, etiqueta de cuidado, logo por transferencia, hangtag, bolsa, caja de regalo y etiquetas de código.",
        items: ["Etiqueta de cuidado y logo", "Hangtag, bolsa o caja", "Etiqueta de talla, SKU y marca de cartón"]
      },
      {
        title: "Alinee empaque y producto",
        body: "El alcance de empaque se revisa junto con los componentes, la cantidad y la ruta de producción de cada programa."
      }
    ],
    factSources: ["company"],
    faqs: [
      {
        question: "¿Qué opciones de empaque se pueden consultar?",
        answer: "Se pueden consultar cintura personalizada, etiqueta de cuidado, logo por transferencia, hangtag, bolsa, caja de regalo y etiquetas de código."
      },
      {
        question: "¿Cuándo se revisa el alcance de empaque?",
        answer: "El alcance de empaque se revisa junto con los componentes, la cantidad y la ruta de producción de cada programa."
      }
    ]
  }),
  "/es/fabrica-y-control-de-calidad": page({
    path: "/es/fabrica-y-control-de-calidad",
    englishPath: "/factory",
    title: "Fábrica y control de calidad de ropa interior",
    description:
      "Conozca la fábrica y el proceso de control de calidad de YiWu DiYaSi para programas de ropa interior de marca propia.",
    eyebrow: "Fábrica y calidad",
    headline: "Fábrica y control de calidad para su programa de ropa interior",
    intro:
      "Revise la información de fábrica y los puntos de inspección utilizados durante la producción de ropa interior.",
    sections: [
      {
        title: "Control durante la producción",
        body: "Los puntos de inspección cubren el tejido entrante, la producción en curso y la revisión final antes de entrega."
      },
      {
        title: "Converse sobre su requisito de calidad",
        body: "Comparta su categoría, especificaciones de producto y requisitos de empaque para revisar los puntos de control relevantes."
      }
    ],
    factSources: ["company", "quality"],
    faqs: [
      {
        question: "¿Qué se revisa antes de cortar o tejer?",
        answer: "Se revisan el gramaje, la diferencia de color, la elasticidad, el encogimiento, el tacto y el estado de la superficie del tejido."
      },
      {
        question: "¿Qué se revisa en la inspección final?",
        answer: "Se revisan la talla final, el color, la cantidad, la etiqueta, el empaque, la marca de cartón y los detalles de envío."
      }
    ]
  }),
  "/es/contacto": page({
    path: "/es/contacto",
    englishPath: "/contact",
    title: "Contacto para ropa interior de marca propia",
    description:
      "Contacte a YiWu DiYaSi para hablar sobre proyectos de ropa interior de marca propia, OEM/ODM, muestras y empaque.",
    eyebrow: "Contacto de fábrica",
    headline: "Hable con el equipo sobre su proyecto de ropa interior",
    intro:
      "Incluya categoría, mercado objetivo, cantidad, necesidades de marca y empaque para iniciar una conversación sobre su programa.",
    sections: [
      {
        title: "Qué incluir en su consulta",
        body: "Para orientar la primera respuesta, comparta categoría, estilos de referencia, cantidad prevista, tejido, color, etiqueta, empaque y calendario objetivo."
      },
      {
        title: "Datos de contacto",
        body: "Puede enviar la solicitud mediante el formulario de cotización o contactar al equipo por WhatsApp."
      }
    ],
    factSources: ["company"],
    rfqCta: { href: "#cotizacion", label: "Solicitar cotización" },
    faqs: [
      {
        question: "¿Qué debo incluir en mi solicitud de cotización?",
        answer: "Comparta categoría, estilos de referencia, cantidad prevista, tejido, color, etiqueta, empaque y calendario objetivo."
      },
      {
        question: "¿Puedo contactar al equipo por WhatsApp?",
        answer: "Sí. Puede contactar al equipo por WhatsApp mediante el enlace de esta página."
      }
    ]
  })
};

export const spanishStaticParams = Object.keys(localizedPages)
  .filter((path) => path !== "/es")
  .map((path) => ({ slug: path.slice("/es/".length).split("/") }));

export function getLocalizedPage(path: string): LocalizedPage | undefined {
  return localizedPages[path];
}
