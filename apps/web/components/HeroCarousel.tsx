"use client";

import Link from "next/link";

const heroSlide = {
  src: "/media/home/banner-2-3-4-1.jpg",
  alt: "YiWu DiYaSi",
  title: "Professional OEM/ODM Underwear Manufacturer",
  desc: "Specializing in seamless underwear, bras, shapewear, and activewear since 2002"
};

export default function HeroCarousel() {
  return (
    <section className="relative w-full aspect-[12/5] min-h-[240px] overflow-hidden bg-gray-900 md:min-h-[420px]">
      <img src={heroSlide.src} alt={heroSlide.alt} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl -translate-y-6 text-white md:-translate-y-8 lg:-translate-y-10">
            <h1 className="mb-3 text-2xl font-bold md:text-4xl">{heroSlide.title}</h1>
            <p className="text-base text-white/90 md:text-lg">{heroSlide.desc}</p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/products"
                className="rounded bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="rounded border border-white px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
