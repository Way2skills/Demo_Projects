"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

const showcaseSlides = [
  {
    id: "showcase-1",
    slug: "contemporary-luxury-residence",
    title: "The Sovereign Villa",
    location: "Race Course, Covai",
    type: "Private Estate",
    area: "6,800 SQ.FT",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90",
    quote: "A monolithic sanctuary of Italian travertine, acoustic fluted timber, and continuous courtyards.",
    metrics: [
      { label: "Execution Timeline", value: "10 Months" },
      { label: "Bespoke Millwork", value: "100% In-house" },
      { label: "Acoustic Rating", value: "NC-25 Ambient" },
    ],
  },
  {
    id: "showcase-2",
    slug: "luxury-living-room",
    title: "Elysian Grand Salon",
    location: "Kovaipudur, Covai",
    type: "Double-Height Lounge",
    area: "1,850 SQ.FT",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
    quote: "Sculptural volumes framing natural daylight, anchored by a low-slung bouclé seating island.",
    metrics: [
      { label: "Ceiling Volume", value: "14 Feet Clear" },
      { label: "Stone Cladding", value: "Nero Marquina" },
      { label: "Lighting Scenes", value: "4 Pre-sets" },
    ],
  },
];

export default function SignatureShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = showcaseSlides[activeSlide];

  return (
    <section className="py-24 sm:py-32 bg-[#12100E] text-[#FCFAF6] relative overflow-hidden border-t border-[#D8C8B2]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <SmoothReveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
                <span className="w-8 h-[1px] bg-[#C5A880]" />
                Signature Showcase
              </div>
            </SmoothReveal>

            <RevealText
              text="Curated Architectural Masterpieces"
              tag="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6]"
            />
          </div>

          {/* Slide Switchers */}
          <div className="flex items-center gap-3">
            {showcaseSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
                  activeSlide === idx
                    ? "bg-[#C5A880] text-[#171513] border-[#C5A880] font-medium"
                    : "bg-transparent text-[#D8C8B2]/60 border-[#D8C8B2]/20 hover:text-[#FCFAF6]"
                }`}
              >
                0{idx + 1} &mdash; {slide.type}
              </button>
            ))}
          </div>
        </div>

        {/* Full-width Immersive Showcase Container */}
        <div className="editorial-image relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[360px] sm:min-h-[460px] overflow-hidden border border-[#D8C8B2]/20 bg-[#171513] shadow-2xl">
          <Image
            key={current.id}
            src={current.image}
            alt={current.title}
            fill
            priority
            className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
            sizes="100vw"
          />

          {/* Multi-layered cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/80 via-transparent to-transparent hidden md:block" />
          <div className="absolute top-6 right-6 hidden sm:flex gap-3 z-10">
            <div className="editorial-image relative w-24 h-32 lg:w-32 lg:h-40 overflow-hidden border border-[#D8C8B2]/40 shadow-xl rotate-2"><Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=85" alt="Dining room detail from the residence" fill className="object-cover" sizes="128px" /></div>
            <div className="editorial-image relative w-24 h-32 lg:w-32 lg:h-40 overflow-hidden border border-[#D8C8B2]/40 shadow-xl -rotate-2 mt-8"><Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=85" alt="Bespoke interior detail from the residence" fill className="object-cover" sizes="128px" /></div>
          </div>

          {/* Foreground Overlay Content */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                <span>{current.location}</span>
                <span>•</span>
                <span>{current.area}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FCFAF6]">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#D8C8B2] font-light max-w-xl leading-relaxed">
                {current.quote}
              </p>

              {/* Metrics bar */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#D8C8B2]/20 max-w-lg">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="block text-[9px] uppercase tracking-wider font-mono text-[#D8C8B2]/70">
                      {m.label}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#C5A880] font-medium">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href={`/projects/${current.slug}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-all duration-300"
                >
                  <span>Explore Project Case Study</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
