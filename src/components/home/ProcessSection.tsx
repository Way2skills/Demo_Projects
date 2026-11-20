"use client";

import React from "react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

const processSteps = [
  {
    step: "01",
    name: "Consultation",
    phase: "Discovery & Spatial Brief",
    description:
      "We begin with an in-depth dialogue at our Covai studio or on-site to understand your lifestyle aspirations, spatial requirements, budget parameters, and architectural vision.",
    deliverables: "Site Measurement, Client Lifestyle Matrix, Scope Definition",
  },
  {
    step: "02",
    name: "Concept & Planning",
    phase: "Spatial Choreography",
    description:
      "Our architects develop 2D zoning schemes, circulation layouts, and conceptual mood palettes exploring material pairings, timber finishes, and lighting strategies.",
    deliverables: "Floor Layouts, Moodboards, Zoning Schemes",
  },
  {
    step: "03",
    name: "Design Development",
    phase: "Photorealistic 3D & Detailing",
    description:
      "We build high-fidelity 3D visualizations down to millimetric tolerances. Detailed joinery drawings, MEP routing, stone selections, and finish schedules are finalized.",
    deliverables: "Photorealistic 3D Renders, Shop Drawings, Material Samples",
  },
  {
    step: "04",
    name: "Execution",
    phase: "Artisanal Turnkey Fabrication",
    description:
      "Our master joiners and site engineers initiate construction. We supervise civil works, custom millwork fabrication, stone installation, and acoustic paneling.",
    deliverables: "Weekly Milestone Reports, Dedicated Site Engineer, Quality Audits",
  },
  {
    step: "05",
    name: "Final Transformation",
    phase: "Styling & Handover",
    description:
      "Furniture placement, art styling, lighting scene programming, and thorough deep-cleaning culminating in an extraordinary turnkey reveal of your bespoke sanctuary.",
    deliverables: "Comprehensive As-Built Manual, Lifetime Hardware Warranty, White-Glove Handover",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#FCFAF6] relative border-t border-[#D8C8B2]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <SmoothReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              The Journey
            </div>
          </SmoothReveal>

          <RevealText
            text="Our Design Process"
            tag="h2"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6]"
          />

          <SmoothReveal delay={0.2}>
            <p className="mt-4 text-sm sm:text-base text-[#D8C8B2]/80 font-light max-w-xl">
              From the initial pencil sketch to the final styling cushion, our five-step
              curated roadmap ensures absolute transparency and flawless execution.
            </p>
          </SmoothReveal>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        {/* Horizontal Desktop Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-8 right-8 h-[1px] bg-gradient-to-r from-[#C5A880]/60 via-[#76533D]/60 to-[#C5A880]/20 z-0" />

          {processSteps.map((step, idx) => (
            <SmoothReveal key={step.step} delay={idx * 0.1} className="relative z-10">
              <div className="space-y-6 flex flex-col h-full group">
                {/* Number circle indicator */}
                <div className="w-14 h-14 rounded-full bg-[#1B1815] border border-[#C5A880]/40 flex items-center justify-center font-mono text-sm text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#171513] transition-colors shadow-lg">
                  {step.step}
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                    {step.phase}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FCFAF6] font-normal group-hover:text-[#D8C8B2] transition-colors">
                    {step.name}
                  </h3>
                </div>

                <p className="text-xs text-[#D8C8B2]/70 leading-relaxed font-light flex-grow">
                  {step.description}
                </p>

                <div className="p-3 bg-[#1B1815] border border-[#D8C8B2]/10 text-[11px] font-mono text-[#C5A880]/90">
                  <span className="block text-[9px] uppercase tracking-wider text-[#D8C8B2]/60 mb-1">
                    Key Milestone:
                  </span>
                  {step.deliverables}
                </div>
              </div>
            </SmoothReveal>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-8 relative pl-6 border-l border-[#C5A880]/30 ml-4">
          {processSteps.map((step, idx) => (
            <SmoothReveal key={step.step} delay={idx * 0.08} className="relative">
              {/* Node dot */}
              <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-[#171513] border-2 border-[#C5A880] flex items-center justify-center text-[10px] font-mono text-[#C5A880]">
                {step.step}
              </div>

              <div className="space-y-3 bg-[#1B1815] p-6 border border-[#D8C8B2]/15">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  {step.phase}
                </span>
                <h3 className="font-serif text-2xl text-[#FCFAF6]">
                  {step.name}
                </h3>
                <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
                  {step.description}
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#C5A880]">
                  <strong className="text-[#D8C8B2]/70 font-normal">Milestones:</strong>{" "}
                  {step.deliverables}
                </div>
              </div>
            </SmoothReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
