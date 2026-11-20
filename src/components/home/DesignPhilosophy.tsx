"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Layers, Sun, Gem, Armchair, Sliders } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

const philosophyPillars = [
  {
    icon: Layers,
    title: "Natural Wood Textures",
    description: "Hand-selected American Walnut, cured Burma Teak, and European White Oak offering tactile organic warmth.",
  },
  {
    icon: Gem,
    title: "Premium Stone Materials",
    description: "Bookmatched Navona Travertine, Calacatta quartzites, and fluted marble slabs handpicked from Italian quarries.",
  },
  {
    icon: Sun,
    title: "Architectural Lighting",
    description: "Concealed 2700K warm cove channels, museum-grade optic lenses, and circadian lighting tuned to human biorhythms.",
  },
  {
    icon: Sparkles,
    title: "Fine Craftsmanship",
    description: "Zero-tolerance joinery, precision shadow lines, and concealed hinges created in our dedicated bespoke atelier.",
  },
  {
    icon: Armchair,
    title: "Bespoke Furniture",
    description: "Proportionally scaled low-profile sofas, monolithic stone tables, and ergonomic chairs wrapped in bouclé and nubuck.",
  },
  {
    icon: Sliders,
    title: "Thoughtful Detailing",
    description: "Flush floor transitions, invisible magnetic latches, acoustic wall batting, and motorized quiet hardware.",
  },
];

export default function DesignPhilosophy() {
  return (
    <section className="py-24 sm:py-32 bg-[#12100E] text-[#FCFAF6] relative overflow-hidden border-t border-[#D8C8B2]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <SmoothReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              Material & Spatial Integrity
            </div>
          </SmoothReveal>

          <RevealText
            text="Beyond Interiors. A Reflection of You."
            tag="h2"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6] leading-tight"
          />

          <SmoothReveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg text-[#D8C8B2]/80 font-light leading-relaxed">
              We reject transient trends in favor of timeless materials that age gracefully.
              Our spaces are composed with a sculptor&apos;s reverence for proportion, daylight,
              and tactile honesty.
            </p>
          </SmoothReveal>
        </div>

        {/* Visual Composition: Big Tactile Imagery + 6-Pillar Luxury Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Tactile Material Imagery Composition */}
          <div className="lg:col-span-5 relative">
            <SmoothReveal duration={0.9}>
              <div className="editorial-image relative aspect-[3/4] w-full overflow-hidden border border-[#D8C8B2]/20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                  alt="Shinewood Tactile Materials and Craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-80" />
                
                {/* Embedded Quote Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#171513]/90 backdrop-blur-md border border-[#D8C8B2]/20">
                  <p className="font-serif text-sm italic text-[#FCFAF6] leading-snug">
                    &ldquo;When timber, stone, and shadow collaborate without pretense,
                    luxury ceases to be loud — it becomes an aura.&rdquo;
                  </p>
                </div>
              </div>
            </SmoothReveal>
            <div className="grid grid-cols-3 gap-3 mt-4" aria-label="Material studies">
              {[
                ["https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=500&q=85", "Natural wood grain"],
                ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=85", "Sculptural lighting"],
                ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=85", "Stone and furniture"],
              ].map(([src, alt], index) => <SmoothReveal key={alt} delay={index * 0.08}><div className="editorial-image relative aspect-[4/3] overflow-hidden border border-[#D8C8B2]/15"><Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 30vw, 14vw" /></div></SmoothReveal>)}
            </div>
          </div>

          {/* Right Column: 6 Philosophy Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {philosophyPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <SmoothReveal key={pillar.title} delay={index * 0.08}>
                  <div className="p-6 bg-[#171513]/70 border border-[#D8C8B2]/10 hover:border-[#C5A880]/40 transition-colors duration-300 space-y-3 group">
                    <div className="w-10 h-10 rounded-none bg-[#30251F] border border-[#76533D]/40 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#171513] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-xl text-[#FCFAF6] font-normal group-hover:text-[#D8C8B2] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-[#D8C8B2]/70 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </SmoothReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
