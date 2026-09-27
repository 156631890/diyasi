"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog-source";
import s from "./HomeCollection.module.css";
import { useSampleList } from "./SampleList";
import { trackAnalyticsEvent } from "@/lib/analytics";

const live = "";
const materialStories = [
  { name: "Cotton, naturally.", category: "THE COTTON EDIT", image: "cotton-editorial.webp", alt: "Cotton material mood: sculptural folds of ivory jersey on pale stone", description: "A familiar starting point for an everyday collection.", href: "/products/cotton-underwear" },
  { name: "A little lace.", category: "THE LACE EDIT", image: "lace-editorial.webp", alt: "Lace material mood: burgundy floral lace with a scalloped edge", description: "Delicate details. A different kind of expression.", href: "/products/lace-underwear" },
  { name: "Less, beautifully.", category: "THE SEAMLESS EDIT", image: "seamless-editorial.webp", alt: "Seamless collection mood: smooth rose-taupe fabric in flowing folds", description: "Explore clean lines and considered silhouettes.", href: "/products/seamless-underwear" },
];
function Icon({ kind }: { kind: "search" | "bag" | "menu" | "close" }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
    {kind === "search" ? <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></> : kind === "bag" ? <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></> : kind === "menu" ? <path d="M3 7h18M3 12h18M3 17h18" /> : <path d="m6 6 12 12M6 18 18 6" />}
  </svg>;
}

export default function HomeCollection({ products }: { products: CatalogProduct[] }) {
  const [filter, setFilter] = useState("All");
  const { selected, toggle } = useSampleList();
  const [quick, setQuick] = useState<CatalogProduct | null>(null);
  const [photo, setPhoto] = useState(0);
  const quickDialog = useRef<HTMLDialogElement>(null);
  const byModel = (model: string) => products.find(p => p.model_number === model)!;
  const shown = products.filter(p => p.gender === "women" && (filter === "All" || p.collection === `${filter.toLowerCase()}-underwear`)).slice(0, 4);
  const shapes = [
    { name: "Bikini", detail: "The everyday essential", model: "DYS201", href: "/products?q=bikini" },
    { name: "Brazilian", detail: "A little less coverage", model: "LS006", href: "/products?q=brazilian" },
    { name: "Thong", detail: "A minimal silhouette", model: "DYS224", href: "/products/thongs" },
    { name: "High waist", detail: "A higher-rise fit", model: "DYS219", href: "/products/high-waist" },
    { name: "Seamless", detail: "Considered, clean edges", model: "DYS323", href: "/products/seamless-underwear" },
    { name: "For him", detail: "Explore the men’s edit", model: "M001", href: "/products/mens-underwear" },
  ];
  function openQuick(p: CatalogProduct) {
    setQuick(p); setPhoto(0); quickDialog.current?.showModal(); trackAnalyticsEvent("product_quick_view", undefined, p.slug);
  }
  return <div className={s.page}>

      <section className={s.hero}>
        <Image src="/media/preview/softness-campaign.webp" alt="Concept still life of ivory cotton and lace in warm natural light" fill preload sizes="100vw" className={s.heroImage} />
        <div className={s.heroCopy}><p className={s.eyebrow}>UNDERWEAR MANUFACTURER · YIWU, CHINA</p><h1>Underwear, made<br />for <em>your brand.</em></h1><p>Cotton, lace &amp; seamless underwear for brands and wholesale buyers.<br />Compare styles. Approve samples. Create your collection.</p><a className={s.button} href="#collection">Explore the collection <span>↗</span></a><a className={s.heroSecondary} href={`${live}/oem-odm`}>Explore private-label manufacturing ↗</a></div>
        <div className={s.heroCaption}><span>COTTON · LACE · SEAMLESS</span><span>THE MATERIAL MOOD / 01</span></div>
      </section>
      <div className={s.benefits}><span>Original DIYASI styles</span><span>Samples before production</span><span>Labels & packaging, your way</span></div>
      <section className={s.section} id="collection">
        <div className={s.heading}><div><p className={s.eyebrow}>FIND YOUR FIT</p><h2>Every shape. <em>Your signature.</em></h2></div><a className={s.textLink} href={`${live}/products`}>View all 45 styles ↗</a></div>
        <div className={s.shapes}>{shapes.map(shape => <a href={live + shape.href} className={s.shape} key={shape.name}><div><Image src={byModel(shape.model).image_url} alt={`${shape.name}: original DIYASI ${shape.model} photograph`} fill sizes="(max-width:700px) 34vw, 15vw" /></div><h3>{shape.name}</h3><p>{shape.detail}</p></a>)}</div>
      </section>
      <section className={`${s.section} ${s.edit}`} id="featured">
        <div className={s.heading}><div><p className={s.eyebrow}>A GOOD PLACE TO BEGIN</p><h2>The everyday edit.</h2></div><div className={s.filters} role="group" aria-label="Filter featured styles">{["All", "Cotton", "Lace", "Seamless"].map(label => <button key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div></div>
        <div className={s.productGrid}>{shown.map(p => <article className={s.card} key={p.slug}>
          <div className={s.productImage}><a href={`${live}/products/${p.slug}`} aria-label={`View ${p.product_name}`}><Image src={p.image_url} alt={`${p.product_name}, style ${p.model_number}`} fill sizes="(max-width:700px) 46vw, 23vw" /><Image src={p.gallery_images[1] || p.image_url} alt="" fill sizes="(max-width:700px) 46vw, 23vw" className={s.alternate} /></a><button className={s.save} aria-label={`${selected.includes(p.slug) ? "Remove" : "Add"} ${p.model_number} ${selected.includes(p.slug) ? "from" : "to"} sample list`} aria-pressed={selected.includes(p.slug)} onClick={() => toggle(p.slug)}>{selected.includes(p.slug) ? "✓" : "+"}</button><button className={s.quick} onClick={() => openQuick(p)}>Quick view <span>↗</span></button></div>
          <div className={s.meta}><span>{p.material_label}</span><span>{p.model_number}</span></div><h3><a href={`${live}/products/${p.slug}`}>{p.product_name}</a></h3><p>{p.fit} · {p.rise}</p><button className={s.cardAction} onClick={() => toggle(p.slug)}>{selected.includes(p.slug) ? "✓ Added to sample list" : "+ Add to sample list"}</button>
        </article>)}</div>
        <div className={s.browseAll}><a className={s.outlineButton} href={`${live}/products/womens-panties`}>Discover all women’s styles ↗</a><p>Available colors, quantities and customization are confirmed for your brief.</p></div>
      </section>
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
      <section className={s.journal}><div><p className={s.eyebrow}>BEFORE YOUR FIRST SAMPLE</p><h2>A little guidance.<br /><em>A clearer beginning.</em></h2></div><a href={`${live}/news/bikini-vs-brazilian-underwear-buying-notes`}><span>THE FIT NOTES</span><h3>Bikini or Brazilian?</h3><p>Start with coverage, rise and the right sample.</p><span>Read the guide ↗</span></a><a href={`${live}/resources/private-label-underwear-moq-guide`}><span>THE BUYER’S GUIDE</span><h3>Your first collection.</h3><p>Understand quantities, branding and development.</p><span>Read the guide ↗</span></a></section>
    <dialog ref={quickDialog} className={s.dialog} aria-labelledby="quick-title"><button className={s.close} aria-label="Close quick view" onClick={() => quickDialog.current?.close()}><Icon kind="close" /></button>{quick && <div className={s.quickContent}><div className={s.quickGallery}><div className={s.quickPhoto}><Image src={quick.gallery_images[photo]} alt={`${quick.product_name}, photo ${photo + 1}`} fill sizes="(max-width:700px) 85vw, 45vw" /></div><div className={s.photoControls}><button aria-label="Previous photo" onClick={() => setPhoto((photo - 1 + quick.gallery_images.length) % quick.gallery_images.length)}>←</button><span>{photo + 1} / {quick.gallery_images.length}</span><button aria-label="Next photo" onClick={() => setPhoto((photo + 1) % quick.gallery_images.length)}>→</button></div></div><div className={s.quickInfo}><p className={s.eyebrow}>{quick.model_number} · {quick.material_label}</p><h2 id="quick-title">{quick.product_name}</h2><p>{quick.description}</p><dl><dt>Composition</dt><dd>{quick.fabric}</dd><dt>Fit</dt><dd>{quick.fit} · {quick.rise}</dd><dt>Sizes</dt><dd>{quick.size}</dd><dt>Starting quantity</dt><dd>{quick.moq}</dd></dl><button className={s.button} onClick={() => toggle(quick.slug)}>{selected.includes(quick.slug) ? "✓ Added — remove from list" : "Add to sample list +"}</button><a href={`${live}/products/${quick.slug}`} className={s.textLink}>Full details & size guide ↗</a></div></div>}</dialog>
  </div>;
}
