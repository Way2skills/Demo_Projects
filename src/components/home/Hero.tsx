"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90", alt: "Warm contemporary living room" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90", alt: "Layered luxury lounge" },
    { src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2200&q=90", alt: "Bookmatched stone kitchen" },
    { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2200&q=90", alt: "Quiet bedroom sanctuary" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=90", alt: "Warm architectural workspace" },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveImage((current) => (current + 1) % heroImages.length), 5200);
    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] flex items-center justify-center overflow-hidden bg-[#171513]">
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div key={heroImages[activeImage].src} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: "easeInOut" }} className="absolute inset-0">
            <Image src={heroImages[activeImage].src} alt={heroImages[activeImage].alt} fill priority={activeImage === 0} className="object-cover brightness-[1.12] saturate-[1.08]" sizes="100vw" />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered cinematic overlays */}
        {/* Vignette & Contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-[#171513]/30 to-[#171513]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,21,19,0.3)_100%)]" />

        {/* Subtle architectural grid lines */}
        <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-24 pb-24 sm:pt-28 sm:pb-28 flex flex-col justify-center items-center text-center">
        {/* Top small label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171513]/80 backdrop-blur-md border border-[#D8C8B2]/25 mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono text-[#D8C8B2]">
            SHINEWOOD | INTERIOR ARCHITECTURE
          </span>
        </motion.div>

        {/* Main Heading with line-by-line editorial reveal */}
        <div className="max-w-5xl mx-auto overflow-hidden px-3 py-2">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-copy font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FCFAF6] tracking-tight leading-[1.08] sm:leading-[1.05]"
          >
            Spaces That Speak. <br />
            <span className="italic font-normal text-[#D8C8B2] tracking-normal">
              Living Beyond Ordinary.
            </span>
          </motion.h1>
        </div>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="hero-copy mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#FCFAF6]/95 max-w-2xl mx-auto font-light leading-relaxed"
        >
          We create timeless interiors where thoughtful design meets exceptional
          craftsmanship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            href="/projects"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 shadow-xl border border-[#C5A880]/30"
          >
            <span>Explore Our Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            href="/contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-[#FCFAF6]/10 text-[#FCFAF6] text-xs sm:text-sm tracking-[0.18em] uppercase font-medium transition-all duration-300 border border-[#D8C8B2]/30 backdrop-blur-sm"
          >
            <span>Let&apos;s Discuss Your Space</span>
            <span className="w-2 h-2 rounded-full bg-[#C5A880] group-hover:scale-125 transition-transform" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
