"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

export default function ContactCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#FCFAF6] relative overflow-hidden border-t border-[#D8C8B2]/10">
      {/* Background Architectural Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#76533D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <SmoothReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B1815] border border-[#D8C8B2]/20 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Transformation</span>
          </div>
        </SmoothReveal>

        <RevealText
          text="Let's Create Something Extraordinary."
          tag="h2"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6] leading-tight"
        />

        <SmoothReveal delay={0.2}>
          <p className="mt-6 text-base sm:text-lg text-[#D8C8B2]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Every iconic space starts with an honest conversation. Share your floor plan,
            timeline, or design questions with our lead architectural team in Covai.
          </p>
        </SmoothReveal>

        {/* Address and Direct Contact Signals */}
        <SmoothReveal delay={0.3}>
          <div className="my-8 p-6 bg-[#1B1815]/90 border border-[#D8C8B2]/15 inline-block max-w-xl mx-auto text-left sm:text-center space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
              SHINEWOOD STUDIO HEADQUARTERS
            </div>
            <div className="text-xl sm:text-2xl font-serif text-[#FCFAF6]">
              8610093520
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#D8C8B2]/80">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span>8th Cross, Balaji Nagar, Covai</span>
            </div>
          </div>
        </SmoothReveal>

        {/* 3 Prominent Required Buttons: CALL NOW, WHATSAPP, GET IN TOUCH */}
        <SmoothReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="tel:8610093520"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#30251F] hover:bg-[#76533D] text-[#FCFAF6] text-xs font-mono tracking-widest uppercase transition-all duration-300 border border-[#76533D]/60 shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Call Now</span>
            </a>

            <a
              href="https://wa.me/918610093520?text=Hello%20Shinewood,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366]/90 hover:bg-[#25D366] text-[#171513] font-semibold text-xs font-mono tracking-widest uppercase transition-all duration-300 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 text-[#171513]" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-all duration-300 shadow-lg border border-[#C5A880]/30"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </SmoothReveal>
      </div>
    </section>
  );
}
