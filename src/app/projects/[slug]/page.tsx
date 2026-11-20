import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin, Calendar, Layers, Ruler } from "lucide-react";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Shinewood",
    };
  }

  return {
    title: `${project.title} | Shinewood Portfolio`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] pt-32 pb-24">
      {/* Top Breadcrumb & Return Link */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C5A880] hover:text-[#FCFAF6] uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Works</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
          <span className="w-8 h-[1px] bg-[#C5A880]" />
          {project.category}
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FCFAF6] max-w-4xl leading-[1.1]">
          {project.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#D8C8B2]/90 font-light max-w-3xl leading-relaxed">
          {project.subtitle}
        </p>

        {/* Project Metrics Summary Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5 py-6 border-y border-[#D8C8B2]/15">
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#D8C8B2]/60">
              Location
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-sm text-[#FCFAF6]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{project.location}</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#D8C8B2]/60">
              Built-up Footprint
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-sm text-[#FCFAF6]">
              <Ruler className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{project.area}</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#D8C8B2]/60">
              Completion
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-sm text-[#FCFAF6]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{project.year} ({project.duration})</span>
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#D8C8B2]/60">
              Category
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-sm text-[#C5A880]">
              <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{project.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Full-Bleed Hero Image */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="editorial-image relative aspect-[16/7] sm:aspect-[16/7] w-full overflow-hidden border border-[#D8C8B2]/20 shadow-2xl">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/60 via-transparent to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute right-6 bottom-6 w-36 lg:w-48 aspect-[3/4] editorial-image overflow-hidden border-2 border-[#171513] shadow-2xl rotate-2">
            <Image src={project.gallery[0]?.url || project.heroImage} alt={`${project.title} detail`} fill className="object-cover" sizes="192px" />
          </div>
        </div>
      </section>

      {/* Narrative: The Brief, Concept, Challenge & Solution */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
              THE COMMISSION BRIEF
            </span>
            <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/15 space-y-3">
              <p className="font-serif text-lg text-[#FCFAF6] font-light italic">
                &ldquo;{project.brief}&rdquo;
              </p>
              <div className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                — Client Vision
              </div>
            </div>

            {/* Inquire CTA */}
            <div className="p-6 bg-[#241C17] border border-[#C5A880]/30 space-y-4">
              <h4 className="font-serif text-xl text-[#FCFAF6]">
                Love this aesthetic?
              </h4>
              <p className="text-xs text-[#D8C8B2] font-light leading-relaxed">
                Our architects can tailor a similar bespoke concept for your floor plan in Covai.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase transition-colors"
              >
                <span>Discuss Your Space</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                SPATIAL NARRATIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-2 mb-6">
                Architectural Execution
              </h2>
              <p className="text-base text-[#D8C8B2] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                  THE SPATIAL CHALLENGE
                </span>
                <p className="text-xs text-[#D8C8B2] leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                  SHINEWOOD&apos;S SOLUTION
                </span>
                <p className="text-xs text-[#D8C8B2] leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Materials & Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#D8C8B2]/15">
              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-[#C5A880] mb-4">
                  Material Palette:
                </h4>
                <ul className="space-y-2">
                  {project.materials.map((mat) => (
                    <li key={mat} className="flex items-center gap-2 text-xs text-[#FCFAF6]/90 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-[#C5A880] mb-4">
                  Signature Features:
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-[#FCFAF6]/90 font-light">
                      <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
            PHOTO REPERTOIRE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-2">
            Spatial Detailing & Perspectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="editorial-image editorial-image-gallery relative aspect-[4/3] w-full overflow-hidden border border-[#D8C8B2]/15 bg-[#1B1815]">
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-xs font-mono text-[#D8C8B2]/70">
                <span>&bull; </span>
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Projects */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 border-t border-[#D8C8B2]/15">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
              NEXT COMMISSIONS
            </span>
            <h3 className="font-serif text-3xl text-[#FCFAF6] font-light">
              Explore More Selected Works
            </h3>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono tracking-widest uppercase text-[#C5A880] hover:underline"
          >
            All Works →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProjects.map((rel) => (
            <Link key={rel.id} href={`/projects/${rel.slug}`} className="group block">
              <div className="editorial-image editorial-image-gallery-alt relative aspect-[4/3] w-full overflow-hidden border border-[#D8C8B2]/15 bg-[#1B1815]">
                <Image
                  src={rel.coverImage}
                  alt={rel.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase">
                  {rel.category}
                </span>
                <h4 className="font-serif text-xl text-[#FCFAF6] group-hover:text-[#D8C8B2] transition-colors">
                  {rel.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
