"use client";

import { useState } from "react";

type ProductGalleryProps = {
  productName: string;
  images: string[];
  emptyLabel: string;
};

export default function ProductGallery({ productName, images, emptyLabel }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || "";

  return (
    <div className="catalog-gallery">
      <div className="catalog-detail-media">
        {activeImage ? (
          <img src={activeImage} alt={productName} className="catalog-detail-image" />
        ) : (
          <div className="catalog-detail-fallback">{emptyLabel}</div>
        )}
      </div>

      {images.length > 1 ? (
        <div className="catalog-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`catalog-gallery-thumb ${index === activeIndex ? "catalog-gallery-thumb-active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image} alt={`${productName} view ${index + 1}`} className="catalog-gallery-thumb-image" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
