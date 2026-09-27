import { companyInfo } from "./site-info";

export type ServicePageContent = {
  title: string;
  eyebrow: string;
  metaTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  introTitle: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
    link?: string[];
  }>;
  sources?: string[][];
  sourceNote?: string;
  faqs?: string[][];
  gallery?: Array<{ src: string; alt: string; caption: string }>;
};
export const servicePages: Record<string, ServicePageContent> = {
  "oem-odm": {
    title: "Private-label underwear manufacturer in Yiwu",
    eyebrow: "Private label & OEM",
    metaTitle: "Private Label Underwear Manufacturer in Yiwu, China",
    description:
      "Work with DIYASI in Yiwu, China on private-label women's and men's underwear. Compare real cotton, lace, seamless and boxer-brief styles before sampling, labeling and packaging.",
    image: "/media/editorial/cotton-lace-story.png",
    imageAlt: "Cotton, lace and fabric details for collection planning",
    introTitle: "A thoughtful route from idea to underwear.",
    intro:
      "Start with a style you can see, touch and evaluate. Our Yiwu team works with emerging brands, retailers and wholesale buyers to turn a fabric and fit direction into an approved sample and a written production brief.",
    sections: [
      {
        title: "Begin with a real style",
        body: "Choose from our current cotton, lace and seamless underwear catalogue. Compare the silhouette, composition and source size range before narrowing the sample selection.",
        items: [
          "Define your intended wearer and market.",
          "Select model numbers and a quantity range.",
          "Confirm available colors, sizes and stock.",
        ],
        link: ["Explore the collections", "/products"],
      },
      {
        title: "Give it your signature",
        body: "Custom waistband artwork, heat-transfer logos, care labels, hangtags and packaging can be reviewed against the selected style. Component minimums may differ from the garment quantity.",
        items: [
          "Supply vector logo artwork and color references.",
          "Agree logo dimensions and placement.",
          "Check label language and packaging requirements.",
        ],
        link: ["Consider the finishing details", "/packaging"],
      },
      {
        title: "Approve the sample",
        body: "Confirm the finished measurements, fit, fabric, seams, gusset and labeling on a physical sample. Keep an approved reference sample and document revisions before moving into production.",
        items: [
          "Review the size chart and measurement method.",
          "Agree tolerance and fit corrections.",
          "Confirm wash and colorfastness testing needed for your market.",
        ],
      },
      {
        title: "Plan the production run",
        body: "Most current catalogue specifications list 120 pieces per style, with mixed sizes and colors subject to confirmation. A custom fabric, color or new pattern needs a separate quantity and schedule review.",
        items: [
          "Confirm a written quotation and specification.",
          "Set an inspection and packing plan.",
          "Agree delivery terms and production milestones.",
        ],
      },
    ],
    faqs: [
      [
        "What is the difference between white-label and private-label underwear?",
        "A catalogue style with your approved labels and packaging is a common white-label starting point. Private-label development may also change fabric, fit, color or components. Both require a sample and written approval of the actual specification and minimums.",
      ],
      [
        "Can you develop private-label men's boxer briefs?",
        "The current catalogue includes plain and printed boxer-brief models. Choose a model, then confirm its pouch construction, inseam, waistband, artwork and order-specific customization with the team before sampling.",
      ],
      [
        "Can I start with an existing design?",
        "Yes. An existing catalogue style can be the starting point for sampling and label development. The factory confirms the available fabric, sizes, colors and customization options.",
      ],
      [
        "Is every customized order available at 120 pieces?",
        "No. The catalogue quantity is a starting reference for most listed styles. Custom materials, components, colors and new designs can require different quantities.",
      ],
    ],
  },
  about: {
    title: "About DIYASI: underwear made in Yiwu",
    eyebrow: "The DIYASI story",
    metaTitle: "About Our Yiwu Underwear Manufacturing Company",
    description:
      "Meet DIYASI, a Yiwu underwear manufacturer established in 2003. Explore our 28,000 m² facility, OEM/ODM development, quality control and small-batch options.",
    image: "/media/home/factory-1.jpg",
    imageAlt: "DIYASI factory premises in Yiwu",
    introTitle: "Underwear manufacturing in Yiwu since 2003.",
    intro:
      "YiWu DiYaSi Dress Co., Ltd. is based in Fotang, Yiwu, China. Established in 2003, DIYASI makes underwear, loungewear and knitted activewear for brands and wholesale buyers. This site presents our reviewed underwear collection, with model-specific details to help you plan sampling.",
    sections: [
      {
        title: "Scale & flexibility",
        body: `Our ${companyInfo.facilityAreaSquareMeters.toLocaleString("en-US")}-square-meter facility has a stated production capacity of more than ${companyInfo.monthlyCapacityPieces.toLocaleString("en-US")} pieces per month. We handle volume programs and can evaluate small-batch customization from ${companyInfo.smallBatchMoqPerStyle} pieces per style. Most styles in the current online catalogue list 120 pieces; the final minimum depends on the style, fabric, color, branding and packaging.`,
        link: ["Compare current styles", "/products"],
      },
      {
        title: "OEM/ODM development",
        body: "Our in-house R&D team supports material selection, pattern and sample development, labels and packaging. For suitable briefs, a prototype can be ready in around seven days. Actual sample timing and cost are confirmed after we review the design, fabric and components.",
        link: ["Plan a private-label project", "/oem-odm"],
      },
      {
        title: "Materials & quality control",
        body: "Our quality-control team works across material selection, bulk production and final inspection. We work with combed cotton, lace and modal, among other materials. Composition, test requirements and the inspection plan are agreed for each order rather than assumed from a category description.",
        link: ["Factory & quality", "/factory"],
      },
      {
        title: "Partnership across markets",
        body: `DIYASI works with clients in more than ${companyInfo.countriesServed} countries, including the United States, United Kingdom, Germany, France and Australia. Tell our team your target market, style, quantity and delivery window so we can confirm a workable production plan. Our address is ${companyInfo.address}.`,
        link: ["Contact DIYASI", "/contact"],
      },
    ],
    sourceNote: "This collection website, the original underwear catalogue and the wider DIYASI apparel site describe the same company. Check the individual model page and confirm order-specific details with our team.",
    sources: [
      [
        "DIYASI manufacturer profile",
        "https://www.diyasiunderwear.com/about-us",
      ],
      [
        "DIYASI apparel company site",
        "https://diyasiapparel.com/about/",
      ],
      [
        "DIYASI company on LinkedIn",
        "https://www.linkedin.com/company/111228105/",
      ],
    ],
    faqs: [
      [
        "Can DIYASI make 100 pieces per style?",
        "Some small-batch customization programs can start from 100 pieces per style. Most current catalogue styles list 120 pieces. The applicable MOQ depends on the chosen style, fabric, color, logo and packaging and is confirmed in a written quotation.",
      ],
      [
        "Is a prototype always ready in seven days?",
        "No. Around seven days is possible for suitable briefs. New patterns, custom materials, colors and components can take longer; the team confirms the schedule and sample cost after reviewing your requirements.",
      ],
      [
        "How are the three DIYASI websites related?",
        "YiWu DiYaSi Dress Co., Ltd. uses yiwudiyasidress.com for its reviewed underwear collection and buyer guides. diyasiunderwear.com hosts the original manufacturer product listings; diyasiapparel.com presents the wider company catalogue. Contact DIYASI to confirm the current specification for an order.",
      ],
    ],
  },
  factory: {
    gallery: [
      {
        src: "/media/home/factory-3.jpg",
        alt: "Sewing workstations and hanging garments in the DIYASI production workshop",
        caption:
          "Production workshop · sewing workstations and garment handling",
      },
      {
        src: "/media/home/factory-4.jpg",
        alt: "Storage racks, plastic crates and cartons in the DIYASI factory",
        caption: "Storage area · crates, racks and packed cartons",
      },
      {
        src: "/media/home/factory-5.jpg",
        alt: "Cartons being loaded into a shipping container outside the DIYASI factory",
        caption: "Dispatch area · carton loading for shipment",
      },
    ],
    title: "Underwear factory & quality control",
    eyebrow: "Our atelier · Yiwu, China",
    metaTitle: "Underwear Factory in Yiwu, China & Quality Control",
    description:
      "Review DIYASI's underwear sampling, fabric checks, fit approval and production inspection process. Plan product-specific quality requirements with the factory.",
    image: "/media/home/factory-2.jpg",
    imageAlt: "DIYASI production and manufacturing workspace",
    introTitle: "Quality starts before the first stitch.",
    intro:
      "The factory photographs supplied by DIYASI show sewing workstations, storage and dispatch. For your underwear order, use an approved sample and written specification to define fabric, construction, dimensions and inspection requirements. Ask for current records for the line and style you choose.",
    sections: [
      {
        title: "What the workshop photographs show",
        body: "The visible sewing stations are used for garment assembly; the overhead rails hold work in progress. Storage racks and crates organize materials and cartons, while the dispatch image shows container loading. These images do not establish the date, equipment inventory or production route for a particular underwear style.",
        items: [
          "Ask which steps for your model are completed in this facility.",
          "Request dated photographs or a live walkthrough of the relevant line.",
          "Confirm the equipment and process used for any laser-cut or bonded style.",
        ],
      },
      {
        title: "Fabric & components",
        body: "Check composition, fabric weight where specified, hand feel, stretch and color against the agreed sample. Review lace, elastic, labels and packaging as individual components.",
        items: [
          "Agree test requirements for the intended market.",
          "Record approved fabric and color references.",
          "Check material documentation against the actual order.",
        ],
      },
      {
        title: "Pattern & fit",
        body: "Review finished garment measurements, rise, coverage, leg openings and waistband tension. A standard size label is not a complete size specification.",
        items: [
          "Define measuring points and tolerances.",
          "Review a size set where appropriate.",
          "Keep the approved fit sample for comparison.",
        ],
      },
      {
        title: "Construction & finishing",
        body: "Inspect seam placement, stitching, gusset attachment and elastic application. Check whether the seamless style uses a stitched or bonded cotton gusset.",
        items: [
          "Review workmanship during production.",
          "Check labels and artwork placement.",
          "Compare wash-test results to the specification.",
        ],
      },
      {
        title: "Before dispatch",
        body: "Confirm quantity, size and color ratios, labeling, individual packaging and carton marks. Agree any independent inspection before final shipment.",
        items: [
          "Set the sampling and defect criteria in writing.",
          "Retain inspection and packing records.",
          "Confirm shipment documents and delivery terms.",
        ],
      },
      {
        title: "Plan a buyer audit",
        body: "A buyer or appointed inspector can request a current walkthrough and order-specific evidence before placing a bulk order. Agree access, scope and timing with the factory, then record what was actually inspected.",
        items: [
          "Ask for a current factory address, site contact and the line for your selected model.",
          "Review a dated sample approval, material records and inspection checklist for the order.",
          "Verify any certificate by number, holder, site, validity dates and product scope before using it in a claim.",
        ],
        link: ["Request samples or an audit discussion", "/contact#quote-form"],
      },
    ],
    sources: [
      [
        "OEKO-TEX STANDARD 100: what the product standard covers",
        "https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100",
      ],
      [
        "Sedex SMETA: understanding a social audit",
        "https://www.sedex.com/solutions/smeta-audit/",
      ],
    ],
    sourceNote:
      "These links explain the standards. They do not establish that a specific DIYASI product or facility currently holds a certificate. Request current documents and verify their scope.",
  },
  fabrics: {
    title: "Underwear fabrics: cotton, lace & seamless",
    eyebrow: "Fabrics & finishes",
    metaTitle: "Cotton, Lace & Seamless Underwear Fabric Guide",
    description:
      "Compare cotton-spandex, cotton-lace and polyamide-spandex underwear. Understand material composition, coverage and stitched or bonded cotton gussets before sampling.",
    image: "/media/editorial/cotton-lace-story.png",
    imageAlt: "Illustrative cotton, lace and fabric still life",
    introTitle: "The right fabric starts with the right brief.",
    intro:
      "Choose a material against the intended fit and use. Composition alone does not tell you the fabric weight, finish, stretch recovery or performance after washing. Check those details on the sample you approve.",
    sections: [
      {
        title: "Cotton, with room to move",
        body: "Most current cotton styles list 95% cotton and 5% spandex. The cotton-rich body and added stretch appear across bikinis, thongs, high-waisted briefs and boyshorts.",
        items: [
          "Compare rise, leg coverage and waistband construction.",
          "Review shrinkage and colorfastness expectations.",
          "Confirm the exact composition on the final care label.",
        ],
        link: ["Explore cotton styles", "/products/cotton-underwear"],
      },
      {
        title: "A delicate touch of lace",
        body: "The LS006, LS005 and LS005-142 specifications combine a 95% cotton / 5% spandex body with 80% polyamide / 20% spandex lace. Component composition matters when creating the finished label.",
        items: [
          "Inspect lace edges and elastic recovery.",
          "Evaluate the hand feel where lace touches the skin.",
          "Approve the actual lace pattern and color.",
        ],
        link: ["Explore lace styles", "/products/lace-underwear"],
      },
      {
        title: "A smooth, seamless finish",
        body: "Current seamless styles list an 80% polyamide / 20% spandex body and a cotton gusset. Some gussets are bonded and others stitched; the two construction routes should be reviewed separately.",
        items: [
          "Check edge stability after washing.",
          "Compare bonded and stitched gusset attachment.",
          "Review fit under the intended outer clothing.",
        ],
        link: ["Explore seamless styles", "/products/seamless-underwear"],
      },
      {
        title: "Care, claims & documentation",
        body: "Use the actual order's material and test records when writing care instructions or environmental claims. A fiber name or generic supplier statement does not establish product certification.",
        items: [
          "Confirm finished-garment care instructions.",
          "Request evidence for any recycled-content claim.",
          "Match certificate holder, product scope and validity.",
        ],
      },
    ],
    sources: [
      [
        "GINETEX: textile care symbols",
        "https://www.ginetex.net/GB/labelling/care-symbols.asp",
      ],
      [
        "FTC: complying with the Care Labeling Rule",
        "https://www.ftc.gov/business-guidance/resources/clothes-captioning-complying-care-labeling-rule",
      ],
    ],
  },
  packaging: {
    title: "Custom underwear labels & packaging",
    eyebrow: "Labels & packaging",
    metaTitle: "Custom Underwear Labels, Waistbands & Packaging",
    description:
      "Plan private-label underwear logos, waistbands, care labels, hangtags and packaging with DIYASI. Match your artwork and market requirements to the selected style.",
    image: "/media/editorial/cotton-lace-story.png",
    imageAlt: "Material and finishing inspiration for an underwear collection",
    introTitle: "Small details make it your collection.",
    intro:
      "Plan the garment and packaging together. A label's size, language and position can influence the fit, production route and minimum quantity just as much as the garment color.",
    sections: [
      {
        title: "Logo & waistband",
        body: "Discuss heat-transfer, printed or other suitable logo applications for the selected fabric. For branded waistbands, approve artwork scale, repeat, color and elasticity before production.",
        items: [
          "Provide vector artwork with clear dimensions.",
          "Review placement on the physical garment.",
          "Check wash durability and skin-contact comfort.",
        ],
      },
      {
        title: "Care & fiber labels",
        body: "Prepare the required fiber composition, care instructions, origin information and responsible-business details for your target market. Use the confirmed product specification, including relevant components.",
        items: [
          "Choose the languages required for sale.",
          "Check legibility after washing.",
          "Confirm the legal requirements for your destination.",
        ],
      },
      {
        title: "Packaging that makes sense",
        body: "Consider a protective bag, paper band, hangtag or gift box around your sales channel. Approve material, print, barcode and packing method rather than relying on a generic mockup.",
        items: [
          "Confirm barcode content and scan quality.",
          "Set the size/color identification system.",
          "Review the packed garment and carton arrangement.",
        ],
      },
      {
        title: "Approval before repetition",
        body: "Check the physical packaging sample and garment together. Record approved artwork versions, suppliers, dimensions and tolerances so a reorder can match the original brief.",
        items: [
          "Agree packaging component minimums.",
          "Sign off artwork and the packed sample.",
          "Retain reference files for future orders.",
        ],
      },
    ],
    sources: [
      [
        "FTC: textile and wool labeling requirements",
        "https://www.ftc.gov/business-guidance/resources/threading-your-way-through-labeling-requirements-under-textile-wool-acts",
      ],
      [
        "EU Regulation 1007/2011: textile fiber names and labeling",
        "https://eur-lex.europa.eu/eli/reg/2011/1007/oj",
      ],
    ],
  },
  sustainability: {
    title: "Responsible underwear sourcing",
    eyebrow: "Responsible material decisions",
    metaTitle: "Responsible Underwear Sourcing & Material Claims",
    description:
      "Make evidence-based underwear sourcing decisions. Review composition, recycled-content documentation, product testing, packaging and factory audit scope with DIYASI.",
    image: "/media/editorial/cotton-lace-story.png",
    imageAlt: "Textile material study in ivory and muted rose",
    introTitle: "Start with evidence, then make the claim.",
    intro:
      "Responsible sourcing is a series of specific decisions. Review the actual material, process and order documentation. We do not treat a material name, an audit logo or a supplier statement as a blanket guarantee.",
    sections: [
      {
        title: "Know the composition",
        body: "Ask for the composition of the body, lace, lining, waistband and gusset where relevant. Compare those records with the garment you approve and the label you plan to use.",
        link: ["Understand the current fabrics", "/fabrics"],
      },
      {
        title: "Check recycled-content claims",
        body: "Some source descriptions mention recycled polyester. The catalogue avoids treating that as a verified certificate. Request documentation for the specific material and order before making a recycled-content claim.",
      },
      {
        title: "Understand certification scope",
        body: "Product testing and social audits answer different questions. Check who issued a document, its holder, validity, listed location and product scope. A factory audit does not certify every material or every finished garment.",
      },
      {
        title: "Design for fewer avoidable mistakes",
        body: "Approve fit, care instructions, labeling and packaging early. Clear specifications and a retained reference sample help reduce rework and unnecessary material changes between sampling and production.",
      },
    ],
    sources: [
      [
        "Textile Exchange: recycled material standards",
        "https://textileexchange.org/recycled-claim-global-recycled-standard/",
      ],
      [
        "OEKO-TEX STANDARD 100",
        "https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100",
      ],
      [
        "Sedex: SMETA audit scope",
        "https://www.sedex.com/solutions/smeta-audit/",
      ],
    ],
  },
};
