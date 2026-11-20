"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

export default function StudioIntro() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#FCFAF6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Tag & Editorial Heading */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <SmoothReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              Studio Introduction
            </div>
          </SmoothReveal>

          <RevealText
            text="Designing Spaces. Creating Experiences."
            tag="h2"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6] leading-[1.15]"
          />
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Imagery Collage */}
          <div className="lg:col-span-7 relative">
            <SmoothReveal duration={1} className="relative z-10">
              <div className="editorial-image relative aspect-[4/3] w-full overflow-hidden border border-[#D8C8B2]/15 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                  alt="Shinewood Luxury Living Architecture"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </SmoothReveal>

            <div className="mt-5 grid grid-cols-[1.2fr_.8fr] gap-4 sm:absolute sm:-bottom-16 sm:left-8 sm:right-16 sm:mt-0 sm:z-20">
              <SmoothReveal delay={0.18} yOffset={24}>
                <div className="editorial-image relative aspect-[16/9] overflow-hidden border border-[#D8C8B2]/20 shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" alt="Warm timber and stone interior detail" fill className="object-cover" sizes="(max-width: 640px) 60vw, 30vw" />
                </div>
              </SmoothReveal>
              <SmoothReveal delay={0.3} yOffset={32}>
                <div className="editorial-image relative aspect-[4/5] -mt-6 overflow-hidden border border-[#D8C8B2]/20 shadow-xl sm:-mt-10">
                  <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85" alt="Quietly composed contemporary living room" fill className="object-cover" sizes="(max-width: 640px) 40vw, 18vw" />
                </div>
              </SmoothReveal>
            </div>

            {/* Floating Overlapping Secondary Detail Card */}
            <SmoothReveal
              delay={0.3}
              yOffset={40}
              className="sm:absolute sm:-bottom-10 sm:-right-8 z-30 mt-6 sm:mt-0 sm:max-w-xs"
            >
              <div className="p-6 bg-[#241C17]/95 backdrop-blur-md border border-[#D8C8B2]/20 shadow-2xl space-y-3">
                <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CRAFT SANCTUARY</span>
                </div>
                <p className="text-xs text-[#D8C8B2] leading-relaxed font-light">
                  &ldquo;A home should resonate with the quiet rhythm of those who inhabit it,
                  composed through tactile timber, stone, and silence.&rdquo;
                </p>
                <div className="text-[10px] tracking-widest uppercase font-mono text-[#FCFAF6]/60 pt-1">
                  — Shinewood Design Ethos
                </div>
              </div>
            </SmoothReveal>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-5 space-y-8 lg:pt-8">
            <SmoothReveal delay={0.2}>
              <p className="text-base sm:text-lg text-[#D8C8B2] leading-relaxed font-light">
                At <strong className="text-[#FCFAF6] font-medium">SHINEWOOD</strong>, we believe
                architecture is not merely about decorating walls; it is the art of sculpting
                light, volume, and texture into living poems.
              </p>
            </SmoothReveal>

            <SmoothReveal delay={0.3}>
              <p className="text-sm text-[#D8C8B2]/80 leading-relaxed font-light">
                Based in Covai, our studio merges contemporary European spatial sensibilities
                with traditional artisanal woodcraft. Whether designing a grand multi-level villa
                or a precision modular culinary atelier, our process balances quiet luxury with
                meticulous engineering.
              </p>
            </SmoothReveal>

            {/* Studio Core Badges */}
            <SmoothReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#D8C8B2]/15">
                <div className="space-y-1">
                  <span className="font-serif text-3xl font-light text-[#C5A880]">250+</span>
                  <p className="text-xs text-[#D8C8B2]/80 tracking-wide uppercase font-mono">
                    Spaces Delivered
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-3xl font-light text-[#C5A880]">12+</span>
                  <p className="text-xs text-[#D8C8B2]/80 tracking-wide uppercase font-mono">
                    Years of Mastery
                  </p>
                </div>
              </div>
            </SmoothReveal>

            <SmoothReveal delay={0.5}>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium text-[#FCFAF6] hover:text-[#C5A880] transition-colors"
                >
                  <span>Discover Our Story & Philosophy</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C5A880]" />
                </Link>
              </div>
            </SmoothReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
