import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, MapPin, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-[#12100E] border-t border-[#D8C8B2]/10 text-[#FCFAF6] relative overflow-hidden pt-20 pb-12">
      {/* Subtle architectural background line */}
      <div className="absolute inset-0 pointer-events-none architectural-grid opacity-30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Section: Brand Statement & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D8C8B2]/10">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#30251F]/80 border border-[#76533D]/40 text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-mono">
              Bespoke Architecture & Interiors
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FCFAF6] leading-tight">
              Spaces That Speak. <br />
              <span className="italic font-normal text-[#D8C8B2]">
                Living Beyond Ordinary.
              </span>
            </h2>
            <p className="text-sm text-[#D8C8B2]/80 max-w-lg leading-relaxed">
              Shinewood is a premier interior architecture studio crafting timeless,
              emotionally resonant environments. From private estates to curated
              corporate headquarters, every detail is treated as an enduring work of art.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:8610093520"
                className="group p-5 bg-[#1B1815] border border-[#D8C8B2]/15 hover:border-[#C5A880]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-mono mb-2">
                  <span>DIRECT INQUIRY</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="flex items-center gap-2 text-base font-medium text-[#FCFAF6]">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>8610093520</span>
                </div>
              </a>

              <a
                href="https://wa.me/918610093520?text=Hello%20Shinewood,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-[#1B1815] border border-[#D8C8B2]/15 hover:border-[#C5A880]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between text-xs text-[#C5A880] font-mono mb-2">
                  <span>WHATSAPP CHAT</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="flex items-center gap-2 text-base font-medium text-[#FCFAF6]">
                  <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  <span>+91 8610093520</span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#1B1815]/60 border border-[#D8C8B2]/10 text-xs text-[#D8C8B2]/90">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Studio Address: 8th Cross, Balaji Nagar, Covai</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation & Services Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-[#D8C8B2]/10">
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-[#C5A880] mb-6">
              Studio Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors">
                  About Shinewood
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors">
                  Our Expertise
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors">
                  Portfolio Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-[#C5A880] mb-6">
              Core Disciplines
            </h3>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-[#C5A880] mb-6">
              Bespoke Craft
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services#custom-furniture-woodwork"
                  className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors"
                >
                  Custom Woodwork
                </Link>
              </li>
              <li>
                <Link
                  href="/services#modular-kitchen-design"
                  className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors"
                >
                  Italian Quartz Islands
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors"
                >
                  Material Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#D8C8B2]/80 hover:text-[#FCFAF6] transition-colors"
                >
                  Turnkey Execution
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-mono text-[#C5A880] mb-6">
              Studio Hours
            </h3>
            <div className="space-y-2 text-sm text-[#D8C8B2]/80">
              <p>Monday – Saturday</p>
              <p className="text-[#FCFAF6] font-medium font-mono text-xs">
                09:30 AM – 07:30 PM
              </p>
              <p className="pt-2">Sunday</p>
              <p className="text-[#C5A880] text-xs">By Prior Appointment Only</p>
              <p className="text-xs text-[#D8C8B2]/60 pt-3">
                Covai, Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* Large Editorial Wordmark */}
        <div className="py-12 border-b border-[#D8C8B2]/10 text-center select-none overflow-hidden">
          <div className="font-serif text-[12vw] leading-none tracking-[0.18em] text-[#D8C8B2]/10 uppercase font-light pointer-events-none hover:text-[#D8C8B2]/15 transition-colors">
            SHINEWOOD
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8C8B2]/60">
          <div>
            © {new Date().getFullYear()} SHINEWOOD Interior Architecture. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Covai Studio</span>
            <span>•</span>
            <span>Residential & Commercial</span>
            <span>•</span>
            <span className="text-[#C5A880]">Spaces That Speak</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
