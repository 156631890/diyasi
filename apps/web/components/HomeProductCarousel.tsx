"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FeaturedProduct = {
  title: string;
  image: string;
  link: string;
};

type HomeProductCarouselProps = {
  items: FeaturedProduct[];
};

export default function HomeProductCarousel({ items }: HomeProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const visibleCount = 2;

  const slides = useMemo(() => {
    if (items.length <= visibleCount) {
      return [items];
    }

    const grouped: FeaturedProduct[][] = [];
    for (let i = 0; i < items.length; i += visibleCount) {
      grouped.push(items.slice(i, i + visibleCount));
    }
    return grouped;
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const currentSlide = slides[index] || [];

  return (
    <div className="home-product-carousel">
      <div className="home-product-carousel-track">
        {currentSlide.map((item) => (
          <Link key={item.link} href={item.link} className="factory-product-tile">
            <img src={item.image} alt={item.title} className="factory-product-image" />
            <div className="factory-product-caption">
              <p className="factory-home-title text-white">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="home-product-carousel-controls">
          <button
            type="button"
            className="home-product-carousel-btn"
            onClick={() => setIndex((current) => (current === 0 ? slides.length - 1 : current - 1))}
          >
            Prev
          </button>
          <div className="home-product-carousel-dots">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                className={`home-product-carousel-dot ${slideIndex === index ? "home-product-carousel-dot-active" : ""}`}
                onClick={() => setIndex(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="home-product-carousel-btn"
            onClick={() => setIndex((current) => (current === slides.length - 1 ? 0 : current + 1))}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
