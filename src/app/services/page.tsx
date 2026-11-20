import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, Phone, MessageSquare } from "lucide-react";
import { services } from "@/data/services";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";
import PageVisual from "@/components/layout/PageVisual";

export const metadata = {
  title: "Our Architectural Expertise & Disciplines | Shinewood",
  description:
    "Explore Shinewood's 6 core interior architecture disciplines: Residential Interiors, Luxury Living Spaces, Modular Kitchens, Bedroom Suites, Commercial Architecture, and Custom Joinery.",
};

export default function ServicesPage() {
  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] pt-32 pb-24">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <SmoothReveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            Disciplines & Solutions
          </div>
        </SmoothReveal>

        <RevealText
          text="Six Pillars of Architectural Elegance."
          tag="h1"
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FCFAF6] max-w-4xl leading-[1.1]"
        />

        <SmoothReveal delay={0.2}>
          <p className="mt-8 text-lg sm:text-xl text-[#D8C8B2]/90 font-light max-w-2xl leading-relaxed">
            From expansive turnkey residences to millimeter-precise joinery, our services
            deliver bespoke sophistication, durable integrity, and timeless luxury.
          </p>
        </SmoothReveal>
      </section>

      <PageVisual variant="services" />

      {/* Services Comprehensive Deep-Dive */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-28 sm:space-y-36">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.slug}
              className="scroll-mt-32 pt-8 border-t border-[#D8C8B2]/15"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Images Column */}
                <div
                  className={`lg:col-span-6 relative ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="editorial-image editorial-image-soft relative aspect-[4/3] w-full overflow-hidden border border-[#D8C8B2]/15 shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Overlapping secondary image badge */}
                  <div className="editorial-image editorial-image-portrait hidden sm:block absolute -bottom-6 -right-6 w-1/2 aspect-[4/3] overflow-hidden border-2 border-[#171513] shadow-2xl">
                    <Image
                      src={service.secondaryImage}
                      alt={`${service.title} architectural detail`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </div>

                {/* Narrative & Specifications Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[#C5A880] tracking-widest">
                      {service.number} &mdash; DISCIPLINE
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light">
                    {service.title}
                  </h2>

                  <p className="text-base text-[#D8C8B2] font-light leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="p-4 bg-[#1B1815] border border-[#D8C8B2]/15 text-xs text-[#D8C8B2]/90 font-light italic">
                    &ldquo;{service.designPhilosophy}&rdquo;
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono tracking-widest uppercase text-[#C5A880]">
                      Scope & Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs text-[#FCFAF6]/90 font-light"
                        >
                          <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for tag */}
                  <div className="pt-2 text-xs text-[#D8C8B2]/70 font-mono">
                    <strong className="text-[#C5A880] uppercase tracking-wider">
                      Ideal For:
                    </strong>{" "}
                    {service.idealFor}
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href="tel:8610093520"
                      className="inline-flex items-center gap-2 px-4 py-3 bg-[#1B1815] hover:bg-[#30251F] text-xs font-mono text-[#D8C8B2] hover:text-[#FCFAF6] border border-[#D8C8B2]/20 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>8610093520</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global Consultation Section */}
      <section className="max-w-5xl mx-auto px-6 mt-32 text-center p-12 bg-[#1B1815] border border-[#D8C8B2]/20">
        <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto mb-4" />
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6]">
          Require a Multi-Discipline Architectural Commission?
        </h2>
        <p className="mt-4 text-sm text-[#D8C8B2]/80 max-w-xl mx-auto font-light leading-relaxed">
          Most Shinewood clients commission a comprehensive turnkey package encompassing
          spatial planning, modular kitchens, bedroom suites, and custom furniture.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>Book Master Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/918610093520?text=Hello%20Shinewood,%20I%20would%20like%20to%20discuss%20a%20turnkey%20interior%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-[#171513] font-semibold text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </main>
  );
}
