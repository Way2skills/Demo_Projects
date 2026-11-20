import React from "react";
import Hero from "@/components/home/Hero";
import StudioIntro from "@/components/home/StudioIntro";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import DesignPhilosophy from "@/components/home/DesignPhilosophy";
import ProcessSection from "@/components/home/ProcessSection";
import SignatureShowcase from "@/components/home/SignatureShowcase";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata = {
  title: "SHINEWOOD | Luxury Interior Design & Architecture Studio in Covai",
  description:
    "Spaces That Speak. Living Beyond Ordinary. Shinewood creates bespoke luxury interiors, architectural joinery, and turnkey residential and commercial sanctuaries in Covai.",
};

export default function HomePage() {
  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] overflow-x-hidden">
      <Hero />
      <StudioIntro />
      <ServicesSection />
      <FeaturedProjects />
      <DesignPhilosophy />
      <ProcessSection />
      <SignatureShowcase />
      <ContactCTA />
    </main>
  );
}
