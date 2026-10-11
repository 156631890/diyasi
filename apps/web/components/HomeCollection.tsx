import Image from "next/image";
import type { CatalogProduct } from "@/lib/catalog-source";
import s from "./HomeCollection.module.css";
import HomeFeaturedCollection from "./HomeFeaturedCollection";

const live = "";
const materialStories = [
  { name: "Cotton, naturally.", category: "THE COTTON EDIT", image: "cotton-editorial.webp", alt: "Cotton material mood: sculptural folds of ivory jersey on pale stone", description: "A familiar starting point for an everyday collection.", href: "/products/cotton-underwear" },
  { name: "A little lace.", category: "THE LACE EDIT", image: "lace-editorial.webp", alt: "Lace material mood: burgundy floral lace with a scalloped edge", description: "Delicate details. A different kind of expression.", href: "/products/lace-underwear" },
  { name: "Less, beautifully.", category: "THE SEAMLESS EDIT", image: "seamless-editorial.webp", alt: "Seamless collection mood: smooth rose-taupe fabric in flowing folds", description: "Explore clean lines and considered silhouettes.", href: "/products/seamless-underwear" },
];
export default function HomeCollection({ products }: { products: CatalogProduct[] }) {
  const byModel = (model: string) => products.find(p => p.model_number === model)!;
  const shapes = [
    { name: "Bikini", detail: "The everyday essential", model: "DYS201", href: "/products?q=bikini" },
    { name: "Brazilian", detail: "A little less coverage", model: "LS006", href: "/products?q=brazilian" },
    { name: "Thong", detail: "A minimal silhouette", model: "DYS224", href: "/products/thongs" },
    { name: "High waist", detail: "A higher-rise fit", model: "DYS219", href: "/products/high-waist" },
    { name: "Seamless", detail: "Considered, clean edges", model: "DYS323", href: "/products/seamless-underwear" },
    { name: "For him", detail: "Explore the men’s edit", model: "M001", href: "/products/mens-underwear" },
  ];
  return <div className={s.page}>

      <section className={s.hero}>
        <Image src="/media/preview/softness-campaign.webp" alt="Concept still life of ivory cotton and lace in warm natural light" fill preload sizes="100vw" className={s.heroImage} />
        <div className={s.heroCopy}><p className={s.eyebrow}>YIWU, CHINA · 120 PIECES PER STYLE</p><h1>Low MOQ underwear<br /><em>manufacturer.</em></h1><p>A low MOQ underwear manufacturer for your brand.<br />Cotton, lace and seamless styles. Sample guidance: 5–7 days.</p><a className={s.button} href="#collection">Explore the collection <span>↗</span></a><a className={s.heroSecondary} href={`${live}/oem-odm`}>White label underwear manufacturer ↗</a></div>
        <div className={s.heroCaption}><span>COTTON · LACE · SEAMLESS</span><span>THE MATERIAL MOOD / 01</span></div>
      </section>
      <div className={s.benefits}><span>Original DIYASI styles</span><span>Samples before production</span><span>Labels & packaging, your way</span></div>
      <section className={s.section} id="collection">
        <div className={s.heading}><div><p className={s.eyebrow}>FIND YOUR FIT</p><h2>Underwear manufacturer <em>for boutiques.</em></h2></div><a className={s.textLink} href={`${live}/products`}>Underwear manufacturer China OEM ↗</a></div>
        <div className={s.shapes}>{shapes.map(shape => <a href={live + shape.href} className={s.shape} key={shape.name}><div><Image src={byModel(shape.model).image_url} alt={`${shape.name}: original DIYASI ${shape.model} photograph`} fill sizes="(max-width:700px) 34vw, 15vw" /></div><h3>{shape.name}</h3><p>{shape.detail}</p></a>)}</div>
      </section>
      <HomeFeaturedCollection products={products.filter(p => p.gender === "women").map(({ slug, model_number, product_name, collection, material_label, image_url, gallery_images, description, fabric, fit, rise, size, moq }) => ({ slug, model_number, product_name, collection, material_label, image_url, gallery_images, description, fabric, fit, rise, size, moq }))} />
      <section className={`${s.section} ${s.material}`} aria-labelledby="material-title">
        <div className={s.heading}><div><p className={s.eyebrow}>GOOD DESIGN STARTS WITH THE FEELING</p><h2 id="material-title">A world of <em>softness.</em></h2></div><a className={s.textLink} href={`${live}/fabrics`}>Explore fabrics & finishes ↗</a></div>
        <div className={s.materialGrid}>{materialStories.map(story => <a href={live + story.href} className={s.materialStory} key={story.category}>
          <div className={s.materialPhoto}><Image src={`/media/preview/${story.image}`} alt={story.alt} fill sizes="(max-width:700px) 78vw, 29vw" /></div>
          <div className={s.materialDetails}><p className={s.eyebrow}>{story.category}</p><h3>{story.name}<span aria-hidden="true">↗</span></h3><p>{story.description}</p></div>
        </a>)}</div>
        <p className={s.materialNote}>Material mood imagery. Explore each collection for actual styles and specifications.</p>
      </section>
      <section className={`${s.section} ${s.brand}`} aria-labelledby="brand-title">
        <figure className={s.brandVisual}><div className={s.packagingPhoto}><Image src="/media/preview/packaging-concept.webp" alt="Packaging concept with a blank ivory box, tissue, hangtags, woven label and burgundy ribbon" width={1536} height={1024} sizes="(max-width:700px) 100vw, 48vw" /></div><figcaption><span className={s.eyebrow}>THE FINISHING TOUCH / PACKAGING CONCEPT</span><span>A direction to make your own.</span><p>Concept illustration. Final materials and details are confirmed with your brief.</p></figcaption></figure>
        <div className={s.brandCopy}><p className={s.eyebrow}>YOUR COLLECTION STARTS HERE</p><h2 id="brand-title">Thoughtfully made.<br /><em>Personally yours.</em></h2><p>We work with brands, retailers and wholesale buyers to turn a considered selection into a collection with their own identity.</p><div className={s.steps}><div><span>01</span><h3>Find your starting point</h3><p>Choose silhouettes and fabrics. Build your sample shortlist.</p></div><div><span>02</span><h3>Make the details yours</h3><p>Review fit, colors, labels and packaging with our team.</p></div><div><span>03</span><h3>Approve, then create</h3><p>Confirm your sample and specifications before planning production.</p></div></div><a href={`${live}/contact#quote-form`} className={s.button}>Request samples & quote <span>↗</span></a><a className={s.textLink} href={`${live}/factory`}>Meet the factory behind the collection ↗</a></div>
      </section>
      <section className={s.journal}><div><p className={s.eyebrow}>BEFORE YOUR FIRST SAMPLE</p><h2>Underwear MOQ<br /><em>explained.</em></h2></div><a href={`${live}/news/bikini-vs-brazilian-underwear-buying-notes`}><span>THE FIT NOTES</span><h3>Bikini vs Brazilian underwear sample measurements</h3><p>Start with coverage, rise and the right sample.</p><span>Read the guide ↗</span></a><a href={`${live}/resources/private-label-underwear-moq-guide`}><span>THE BUYER’S GUIDE</span><h3>Underwear MOQ explained</h3><p>Understand quantities, branding and development.</p><span>Read the guide ↗</span></a></section>
  </div>;
}
