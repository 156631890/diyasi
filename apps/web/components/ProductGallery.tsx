"use client";
import Image from "next/image";
import { useState } from "react";
export default function ProductGallery({
  productName,
  images,
  emptyLabel = "No photograph available",
}: {
  productName: string;
  images: string[];
  emptyLabel?: string;
}) {
  const [selected, setSelected] = useState(0);
  if (!images.length) return <div>{emptyLabel}</div>;
  return (
    <div className="d-gallery">
      <div className="d-gallery-main">
        <Image
          src={images[selected]}
          alt={`${productName} — photograph ${selected + 1} of ${images.length}`}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 52vw"
        />
      </div>
      <div className="d-gallery-thumbs" aria-label="Product photographs">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelected(index)}
            aria-label={`Show product photograph ${index + 1}`}
            aria-pressed={index === selected}
          >
            <Image src={image} alt="" width={88} height={88} sizes="88px" />
          </button>
        ))}
      </div>
      <p className="d-fineprint">
        Original DIYASI style photographs. Confirm colors and measurements on
        your sample.
      </p>
    </div>
  );
}
