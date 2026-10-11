"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { HomeFeaturedProduct } from "@/lib/home-featured-product";
import { useSampleList } from "./SampleList";
import s from "./HomeCollection.module.css";

const HomeQuickView = dynamic(() => import("./HomeQuickView"));

function preloadQuickView() {
  void import("./HomeQuickView").catch(() => { /* A later click still owns loading. */ });
}

export default function HomeFeaturedCollection({ products }: { products: HomeFeaturedProduct[] }) {
  const [filter, setFilter] = useState("All");
  const { selected, toggle } = useSampleList();
  const [quick, setQuick] = useState<HomeFeaturedProduct | null>(null);
  const quickDialog = useRef<HTMLDialogElement>(null);
  const shown = products.filter(p => filter === "All" || p.collection === `${filter.toLowerCase()}-underwear`).slice(0, 4);

  function openQuick(product: HomeFeaturedProduct) {
    setQuick(product);
    quickDialog.current?.showModal();
    trackAnalyticsEvent("product_quick_view", undefined, product.slug);
  }

  return <>
    <section className={`${s.section} ${s.edit}`} id="featured">
      <div className={s.heading}><div><p className={s.eyebrow}>A GOOD PLACE TO BEGIN</p><h2>The everyday edit.</h2></div><div className={s.filters} role="group" aria-label="Filter featured styles">{["All", "Cotton", "Lace", "Seamless"].map(label => <button key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div></div>
      <div className={s.productGrid}>{shown.map(p => <article className={s.card} key={p.slug}>
        <div className={s.productImage}><a href={`/products/${p.slug}`} aria-label={`View ${p.product_name}`}><Image src={p.image_url} alt={`${p.product_name}, style ${p.model_number}`} fill sizes="(max-width:700px) 46vw, 23vw" /><Image src={p.gallery_images[1] || p.image_url} alt="" fill sizes="(max-width:700px) 46vw, 23vw" className={s.alternate} /></a><button className={s.save} aria-label={`${selected.includes(p.slug) ? "Remove" : "Add"} ${p.model_number} ${selected.includes(p.slug) ? "from" : "to"} sample list`} aria-pressed={selected.includes(p.slug)} onClick={() => toggle(p.slug)}>{selected.includes(p.slug) ? "✓" : "+"}</button><button className={s.quick} onClick={() => openQuick(p)} onMouseEnter={preloadQuickView} onFocus={preloadQuickView}>Quick view <span>↗</span></button></div>
        <div className={s.meta}><span>{p.material_label}</span><span>{p.model_number}</span></div><h3><a href={`/products/${p.slug}`}>{p.product_name}</a></h3><p>{p.fit} · {p.rise}</p><button className={s.cardAction} onClick={() => toggle(p.slug)}>{selected.includes(p.slug) ? "✓ Added to sample list" : "+ Add to sample list"}</button>
      </article>)}</div>
      <div className={s.browseAll}><Link className={s.outlineButton} href="/products/womens-panties" prefetch={false}>Discover all women’s styles ↗</Link><p>Available colors, quantities and customization are confirmed for your brief.</p></div>
    </section>
    <dialog ref={quickDialog} className={s.dialog} aria-labelledby="quick-title" onClose={() => setQuick(null)}>
      <button className={s.close} aria-label="Close quick view" onClick={() => quickDialog.current?.close()}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      {quick && <HomeQuickView key={quick.slug} product={quick} />}
    </dialog>
  </>;
}
