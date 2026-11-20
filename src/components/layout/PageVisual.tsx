"use client";

import Image from "next/image";
import SmoothReveal from "@/components/animations/SmoothReveal";

type PageVisualProps = { variant: "about" | "services" | "projects" | "contact" };

const visuals = {
  about: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85", "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85", "MATERIAL / MEMORY / MAKING", "A studio where quiet ideas become enduring rooms."],
  services: ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=85", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85", "THE SHINEWOOD METHOD", "One vocabulary, six ways to shape a life."],
  projects: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85", "THE ARCHIVE / 2012—2025", "Rooms with a point of view."],
  contact: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85", "THE FIRST CONVERSATION", "Bring us the feeling you want to come home to."],
} as const;

export default function PageVisual({ variant }: PageVisualProps) {
  const [primary, secondary, eyebrow, title] = visuals[variant];
  return <section className={`page-visual page-visual-${variant} max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28`}>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
      <SmoothReveal className="lg:col-span-8 editorial-image relative aspect-[16/9] overflow-hidden border border-[#D8C8B2]/20 shadow-2xl">
        <Image src={primary} alt={title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/65 via-transparent to-transparent" />
        <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 max-w-sm"><span className="text-[10px] font-mono tracking-[0.24em] text-[#C5A880]">{eyebrow}</span><p className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] leading-tight mt-2">{title}</p></div>
      </SmoothReveal>
      <SmoothReveal delay={0.18} yOffset={42} className="lg:col-span-4 lg:-mb-10"><div className="editorial-image relative aspect-[3/4] overflow-hidden border border-[#C5A880]/30 shadow-2xl rotate-1"><Image src={secondary} alt={`${title} detail`} fill className="object-cover" sizes="(max-width: 1024px) 70vw, 30vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#171513]/45 to-transparent" /><span className="absolute bottom-5 left-5 text-[10px] font-mono tracking-[0.2em] text-[#FCFAF6]/80 uppercase">Shinewood visual study</span></div></SmoothReveal>
    </div>
  </section>;
}
