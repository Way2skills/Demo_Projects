"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";
import PageVisual from "@/components/layout/PageVisual";

const categories = [
  { label: "All Works", slug: "all" },
  { label: "Residential", slug: "residential" },
  { label: "Kitchens", slug: "kitchen" },
  { label: "Private Suites", slug: "bedroom" },
  { label: "Living Salons", slug: "living" },
  { label: "Commercial", slug: "commercial" },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.categorySlug === selectedCategory);

  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] pt-32 pb-24">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-20">
        <SmoothReveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            Studio Archive
          </div>
        </SmoothReveal>

        <RevealText
          text="Selected Works & Architectural Commissions."
          tag="h1"
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FCFAF6] max-w-4xl leading-[1.1]"
        />

        <SmoothReveal delay={0.2}>
          <p className="mt-6 text-base sm:text-lg text-[#D8C8B2]/90 font-light max-w-2xl leading-relaxed">
            A curated portfolio of private residences, minimalist villas, and corporate
            destinations crafted with enduring materials and thoughtful spatial rhythm.
          </p>
        </SmoothReveal>

        {/* Category Filters */}
        <div className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3 border-y border-[#D8C8B2]/15 py-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#C5A880] text-[#171513] border-[#C5A880] font-medium"
                    : "bg-transparent text-[#D8C8B2]/70 border-[#D8C8B2]/20 hover:border-[#D8C8B2]/60 hover:text-[#FCFAF6]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      <PageVisual variant="projects" />

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <SmoothReveal key={project.id} delay={index * 0.08}>
              <Link href={`/projects/${project.slug}`} className="group block">
                {/* Project Image Card */}
                <div className="editorial-image editorial-image-project relative aspect-[4/3] w-full overflow-hidden border border-[#D8C8B2]/15 bg-[#1B1815] transition-all duration-500 group-hover:border-[#C5A880]/50 shadow-xl">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#171513]/80 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-[#C5A880] border border-[#D8C8B2]/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-xs text-[#FCFAF6]/80 bg-[#171513]/60 px-2 py-0.5 backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* View indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-4 py-2 bg-[#FCFAF6] text-[#171513] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#D8C8B2]/80 font-mono">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C5A880]" />
                      <span>{project.location}</span>
                    </div>
                    <span className="text-[#C5A880]">{project.area}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#FCFAF6] group-hover:text-[#D8C8B2] transition-colors font-light">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#D8C8B2]/70 line-clamp-2 font-light">
                    {project.subtitle}
                  </p>
                </div>
              </Link>
            </SmoothReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-[#D8C8B2]/20">
            <p className="text-sm font-mono text-[#D8C8B2]">
              No commissions found in this discipline category.
            </p>
          </div>
        )}
      </section>

      {/* Inquiry Banner */}
      <section className="max-w-4xl mx-auto px-6 text-center mt-32 pt-16 border-t border-[#D8C8B2]/15">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6]">
          Have a Custom Property in Covai or Beyond?
        </h2>
        <p className="mt-4 text-sm text-[#D8C8B2]/80 max-w-lg mx-auto font-light">
          We invite you to share your project aspirations with our architectural team.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>Initiate Project Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
