"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#1B1815] text-[#FCFAF6] relative border-t border-[#D8C8B2]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <SmoothReveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
                <span className="w-8 h-[1px] bg-[#C5A880]" />
                Our Disciplines
              </div>
            </SmoothReveal>

            <RevealText
              text="Our Architectural Expertise"
              tag="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6]"
            />
          </div>

          <SmoothReveal delay={0.2}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-mono text-[#D8C8B2] hover:text-[#C5A880] transition-colors"
            >
              <span>View All 06 Disciplines</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </SmoothReveal>
        </div>

        {/* Editorial discipline rows: every story stays beside its own image. */}
        <div className="space-y-5 sm:space-y-6">
          {services.map((service, index) => {
            const isSelected = activeIndex === index;
            return (
              <SmoothReveal key={service.id} delay={index * 0.04}>
                <article
                  id={service.slug}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch p-3 sm:p-5 border transition-all duration-500 group ${isSelected ? "border-[#C5A880]/50 bg-[#241C17]/60" : "border-[#D8C8B2]/12 hover:border-[#C5A880]/35 bg-[#171513]/20"}`}
                >
                  <div className="lg:col-span-5 flex flex-col justify-center py-3 sm:py-5 lg:pl-4">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-xs text-[#C5A880] tracking-widest">{service.number}</span>
                      <span className="h-px w-10 bg-[#C5A880]/50" />
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D8C8B2]/60">Discipline</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={`font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight transition-colors ${isSelected ? "text-[#FCFAF6]" : "text-[#D8C8B2] group-hover:text-[#FCFAF6]"}`}>{service.title}</h3>
                      <ArrowUpRight className={`w-5 h-5 shrink-0 mt-1 transition-all ${isSelected ? "text-[#C5A880]" : "text-[#C5A880]/50 group-hover:text-[#C5A880]"}`} />
                    </div>
                    <p className="mt-4 text-sm text-[#D8C8B2]/85 leading-relaxed font-light max-w-md">{service.shortDescription}</p>
                    <Link href={`/services#${service.slug}`} className="mt-5 text-xs font-mono tracking-widest text-[#C5A880] hover:text-[#FCFAF6] uppercase inline-flex items-center gap-1.5 w-fit"><span>Explore Details</span><ArrowUpRight className="w-3.5 h-3.5" /></Link>
                  </div>
                  <div className="lg:col-span-7 editorial-image relative min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] overflow-hidden border border-[#D8C8B2]/20">
                    <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 58vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/65 via-transparent to-transparent" />
                    <span className="absolute left-4 bottom-4 text-[10px] font-mono tracking-[0.2em] uppercase text-[#FCFAF6]/75">Shinewood / {service.number}</span>
                  </div>
                </article>
              </SmoothReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
