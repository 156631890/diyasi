"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface HeroSlide {
  src: string;
  alt: string;
  title: string;
  desc: string;
}

const slides: HeroSlide[] = [
  {
    src: "/media/home/banner-2-2-3.jpg",
    alt: "YiWu DiYaSi",
    title: "Professional OEM/ODM Underwear Manufacturer",
    desc: "Specializing in seamless underwear, bras, shapewear, and activewear since 2002"
  },
  {
    src: "/media/home/banner-2-2-3.jpg",
    alt: "YiWu DiYaSi",
    title: "Quality Manufacturing for Global Brands",
    desc: "23+ years of expertise delivering exceptional private-label production"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full aspect-[12/5] min-h-[240px] md:min-h-[420px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl -translate-y-6 text-white md:-translate-y-8 lg:-translate-y-10">
                <h1 className="text-2xl md:text-4xl font-bold mb-3">{slide.title}</h1>
                <p className="text-base md:text-lg text-white/90">{slide.desc}</p>
                <div className="mt-6 flex gap-3">
                  <Link href="/products" className="px-5 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-amber-400 transition-colors">
                    View Products
                  </Link>
                  <Link href="/contact" className="px-5 py-2 border border-white text-white text-sm font-semibold rounded hover:bg-white hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-amber-500" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
