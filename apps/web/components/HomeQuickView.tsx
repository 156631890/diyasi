"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomeFeaturedProduct } from "@/lib/home-featured-product";
import { useSampleList } from "./SampleList";
import s from "./HomeCollection.module.css";

export default function HomeQuickView({ product: quick }: { product: HomeFeaturedProduct }) {
  const [photo, setPhoto] = useState(0);
  const { selected, toggle } = useSampleList();

  return <div className={s.quickContent}>
    <div className={s.quickGallery}><div className={s.quickPhoto}><Image src={quick.gallery_images[photo]} alt={`${quick.product_name}, photo ${photo + 1}`} fill sizes="(max-width:700px) 85vw, 45vw" /></div><div className={s.photoControls}><button aria-label="Previous photo" onClick={() => setPhoto(current => (current - 1 + quick.gallery_images.length) % quick.gallery_images.length)}>←</button><span>{photo + 1} / {quick.gallery_images.length}</span><button aria-label="Next photo" onClick={() => setPhoto(current => (current + 1) % quick.gallery_images.length)}>→</button></div></div>
    <div className={s.quickInfo}><p className={s.eyebrow}>{quick.model_number} · {quick.material_label}</p><h2 id="quick-title">{quick.product_name}</h2><p>{quick.description}</p><dl><dt>Composition</dt><dd>{quick.fabric}</dd><dt>Fit</dt><dd>{quick.fit} · {quick.rise}</dd><dt>Sizes</dt><dd>{quick.size}</dd><dt>Starting quantity</dt><dd>{quick.moq}</dd></dl><button className={s.button} onClick={() => toggle(quick.slug)}>{selected.includes(quick.slug) ? "✓ Added — remove from list" : "Add to sample list +"}</button><a href={`/products/${quick.slug}`} className={s.textLink}>Full details & size guide ↗</a></div>
  </div>;
}
