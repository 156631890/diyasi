"use client";

import Link from "next/link";

const heroSlide = {
  src: "/media/home/banner-2-3-4-1.jpg",
  alt: "YiWu DiYaSi underwear factory and private label manufacturing",
  title: "Private Label Intimates Manufacturer for DTC, Retail & Wholesale Brands",
  desc:
    "We help underwear brands develop premium collections from fabric selection, fit sampling, custom labels and packaging to bulk production and global delivery."
};

export default function HeroCarousel() {
  return (
    <section className="relative w-full aspect-[12/5] min-h-[440px] overflow-hidden bg-gray-900 md:min-h-[560px]">
      <img src={heroSlide.src} alt={heroSlide.alt} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,20,18,0.82)_0%,rgba(25,20,18,0.54)_44%,rgba(25,20,18,0.08)_100%)]" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#f7d7b8]">
              Factory Direct / Private Label / Fast Sampling / WhatsApp
            </p>
            <h1 className="heading-font mb-5 text-4xl font-semibold leading-[1.02] md:text-6xl">{heroSlide.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-white/90 md:text-lg">{heroSlide.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded bg-white px-5 py-3 text-sm font-semibold text-[#5a2f1e] transition-colors hover:bg-[#f4d4bd]"
              >
                Start a Private Label Project
              </Link>
              <Link
                href="/products"
                className="rounded border border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#5a2f1e]"
              >
                View Launch-Ready Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
