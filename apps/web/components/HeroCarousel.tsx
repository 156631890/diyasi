"use client";

import Image from "next/image";
import Link from "next/link";

const heroSlide = {
  src: "/media/home/banner-2-3-4-1.jpg",
  alt: "YiWu DiYaSi underwear factory and private label manufacturing",
  title: "Private Label Underwear Manufacturer for Brands, Retailers & Wholesalers",
  desc:
    "We help underwear buyers develop private label collections from fabric selection, fit sampling, custom labels, packaging and bulk production to global delivery."
};

export default function HeroCarousel() {
  return (
    <section className="relative aspect-[12/5] min-h-[460px] w-full overflow-hidden bg-[#162520] md:min-h-[590px]">
      <Image
        src={heroSlide.src}
        alt={heroSlide.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,28,24,0.88)_0%,rgba(16,44,38,0.68)_46%,rgba(16,44,38,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(11,28,24,0)_0%,rgba(11,28,24,0.36)_100%)]" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-[#d7eee8]">
              Factory direct private label underwear
            </p>
            <h1 className="heading-font mb-5 text-4xl font-bold leading-[1.02] md:text-6xl">{heroSlide.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-white/88 md:text-lg">{heroSlide.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#173e38] shadow-[0_18px_38px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#e7f2ef]"
              >
                Start a Private Label Project
              </Link>
              <Link
                href="/products"
                className="rounded-lg border border-white/70 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#173e38]"
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
