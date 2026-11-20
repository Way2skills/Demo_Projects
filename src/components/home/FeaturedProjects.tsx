"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";

export default function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#FCFAF6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <SmoothReveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
                <span className="w-8 h-[1px] bg-[#C5A880]" />
                Selected Works
              </div>
            </SmoothReveal>

            <RevealText
              text="Architectural Portfolio"
              tag="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FCFAF6]"
            />
          </div>

          <SmoothReveal delay={0.2}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-mono text-[#D8C8B2] hover:text-[#C5A880] transition-colors"
            >
              <span>Explore Complete Archive</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </SmoothReveal>
        </div>

        {/* Asymmetrical Editorial Projects Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {projects.map((project, index) => {
            // Asymmetric rhythm: project 1 is 7 cols, project 2 is 5 cols, project 3 is 5 cols, project 4 is 7 cols...
            const colSpan =
              index === 0
                ? "md:col-span-7"
                : index === 1
                ? "md:col-span-5"
                : index === 2
                ? "md:col-span-5"
                : index === 3
                ? "md:col-span-7"
                : index === 4
                ? "md:col-span-7"
                : "md:col-span-5";

            const aspectClass =
              index % 2 === 0
                ? "aspect-[16/11]"
                : "aspect-[4/3] md:aspect-[3/4]";

            return (
              <div key={project.id} className={`${colSpan} group`}>
                <SmoothReveal delay={0.1 * (index % 2)}>
                  <Link href={`/projects/${project.slug}`} className="block">
                    {/* Image Card Container */}
                    <div
                      className={`editorial-image relative w-full ${aspectClass} overflow-hidden border border-[#D8C8B2]/15 bg-[#1B1815] transition-all duration-500 group-hover:border-[#C5A880]/50`}
                    >
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/85 via-[#171513]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="px-3 py-1 bg-[#171513]/80 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-[#C5A880] border border-[#D8C8B2]/20">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-[#FCFAF6]/80 bg-[#171513]/60 px-2 py-0.5 backdrop-blur-sm">
                          {project.year}
                        </span>
                      </div>

                      {/* Hover Pill CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        <div className="px-5 py-2.5 rounded-full bg-[#FCFAF6] text-[#171513] text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span>View Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#D8C8B2]/80">
                        <div className="flex items-center gap-1.5 font-mono">
                          <MapPin className="w-3 h-3 text-[#C5A880]" />
                          <span>{project.location}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#C5A880]">
                          {project.area}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FCFAF6] group-hover:text-[#D8C8B2] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#D8C8B2]/70 line-clamp-2 font-light">
                        {project.subtitle}
                      </p>

                      {project.slug === "premium-modular-kitchen" && project.gallery[1] && (
                        <div className="editorial-image relative mt-5 aspect-[16/8] w-full overflow-hidden border border-[#D8C8B2]/15 bg-[#1B1815]">
                          <Image
                            src={project.gallery[1].url}
                            alt="Premium modular kitchen material detail"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 42vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/55 to-transparent" />
                          <span className="absolute bottom-3 left-3 text-[9px] font-mono tracking-[0.18em] uppercase text-[#FCFAF6]/80">
                            Kitchen material study
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </SmoothReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
