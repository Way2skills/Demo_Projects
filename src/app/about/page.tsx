import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Compass, HeartHandshake, Sparkles } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";
import PageVisual from "@/components/layout/PageVisual";

export const metadata = {
  title: "About Studio | Shinewood Interior Architecture",
  description:
    "Learn about Shinewood's heritage, artisanal woodcraft, design philosophy, and commitment to creating timeless spaces in Covai.",
};

const milestones = [
  { year: "2012", title: "Atelier Genesis", desc: "Founded in Covai with a focused vision: crafting bespoke timber furniture with zero-compromise precision." },
  { year: "2016", title: "Full Architecture Expansion", desc: "Integrated end-to-end interior architecture, spatial planning, and turnkey site execution." },
  { year: "2020", title: "German Precision Joinery", desc: "Commissioned precision computer-controlled tooling while retaining artisanal hand-finishing." },
  { year: "2025", title: "Over 250 Sanctuaries", desc: "Recognized as South India's premier luxury studio for private villas and high-impact corporate spaces." },
];

const teamPillars = [
  {
    role: "Principal Architect & Founder",
    name: "A. R. Senthil Nathan",
    bio: "With over 16 years leading architectural transformations, Senthil balances structural clarity with poetic atmospheric light.",
  },
  {
    role: "Head of Interior Design",
    name: "Elena V. Thomas",
    bio: "Trained in Milan and Mumbai, Elena curates tactile palettes of travertine, bouclé, and smoked walnut for Shinewood residences.",
  },
  {
    role: "Master Woodcraft Director",
    name: "K. Murugesan",
    bio: "Carrying four decades of generational joinery heritage, directing our atelier's custom veneer matching and timber curing.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] pt-32 pb-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <SmoothReveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            About Shinewood
          </div>
        </SmoothReveal>

        <RevealText
          text="Crafting Timeless Sanctuaries Where Matter Meets Spirit."
          tag="h1"
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FCFAF6] max-w-4xl leading-[1.1]"
        />

        <SmoothReveal delay={0.2}>
          <p className="mt-8 text-lg sm:text-xl text-[#D8C8B2]/90 font-light max-w-2xl leading-relaxed">
            We are a Covai-based interior architecture studio committed to creating
            spaces that speak — environments defined not by ostentation, but by serene
            confidence, tactile honesty, and immaculate proportion.
          </p>
        </SmoothReveal>
      </section>

      <PageVisual variant="about" />

      {/* Cinematic Full-Bleed Architectural Feature */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="editorial-image editorial-image-wide relative aspect-[16/9] w-full overflow-hidden border border-[#D8C8B2]/15 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
            alt="Shinewood Studio Architecture"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 sm:max-w-md p-6 bg-[#171513]/90 backdrop-blur-md border border-[#D8C8B2]/20">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
              STUDIO LOCATION
            </span>
            <p className="font-serif text-xl text-[#FCFAF6] mt-1">
              8th Cross, Balaji Nagar, Covai
            </p>
            <p className="text-xs text-[#D8C8B2]/80 mt-1">
              Where materials are curated, mockups assembled, and spatial dreams engineered.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Philosophy & The Shinewood Standard */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light leading-snug">
              Architecture that listens before it speaks.
            </h2>
            <p className="text-sm text-[#D8C8B2] leading-relaxed font-light">
              We begin each commission not with pre-packaged catalog designs, but with an
              archaeological investigation of how our clients move, meditate, entertain, and
              unwind. Every wall angle, door weight, and illumination temperature is deliberately
              calibrated.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
              <Compass className="w-6 h-6 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#FCFAF6]">Spatial Flow</h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                Circulation that creates effortless movement between public hospitality
                and intimate family solitude.
              </p>
            </div>

            <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
              <Sparkles className="w-6 h-6 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#FCFAF6]">Tactile Truth</h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                Authentic materials: genuine fluted walnut, honed travertine, cast bronze,
                and linen that gain character over decades.
              </p>
            </div>

            <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
              <Award className="w-6 h-6 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#FCFAF6]">Millimetric Rigor</h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                Custom shadow lines, zero-gap flush skirting, and hidden hinges built
                to millimeter precision.
              </p>
            </div>

            <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#C5A880]" />
              <h3 className="font-serif text-xl text-[#FCFAF6]">Turnkey Assurance</h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                Single-point responsibility from initial demolition to white-glove styling
                and lifetime hardware warranties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship & Atelier Deep-Dive */}
      <section className="bg-[#12100E] py-24 border-y border-[#D8C8B2]/10 mb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="editorial-image editorial-image-soft lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-[#D8C8B2]/20">
              <Image
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85"
                alt="Shinewood Master Joinery Woodcraft"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/70 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                OUR JOINERY ATELIER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light">
                Where Artisanal Woodcraft Meets High Engineering.
              </h2>
              <p className="text-sm text-[#D8C8B2] font-light leading-relaxed">
                Unlike agencies that outsource fabrication to random vendors, Shinewood maintains
                its own specialized timber and joinery atelier. Here, seasoned timber logs are
                climate-stabilized, grain-matched by hand, and crafted into seamless architectural
                surfaces.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#D8C8B2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Moisture-regulated Burma Teak & American Walnut</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#D8C8B2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Eco-friendly organic oils and non-yellowing matte lacquers</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#D8C8B2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>Certified Austrian Blum & German Hettich integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Timeline / Milestones */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
            STUDIO EVOLUTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-2">
            A Legacy of Refined Living
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="p-6 bg-[#1B1815] border-t-2 border-[#C5A880] space-y-3">
              <span className="font-mono text-2xl text-[#C5A880]">{m.year}</span>
              <h3 className="font-serif text-lg text-[#FCFAF6]">{m.title}</h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Studio Leadership */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
            THE LEADERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-2">
            Guiding Vision & Artisans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamPillars.map((member) => (
            <div key={member.name} className="p-8 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                {member.role}
              </span>
              <h3 className="font-serif text-2xl text-[#FCFAF6] font-light">
                {member.name}
              </h3>
              <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Contact */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-12 border-t border-[#D8C8B2]/15">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6]">
          Experience Shinewood in Person
        </h2>
        <p className="mt-4 text-sm text-[#D8C8B2]/80 max-w-lg mx-auto font-light">
          Visit our Covai studio to explore physical stone slabs, wood finishes, and discuss
          your upcoming architectural residence.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>Schedule Studio Visit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
