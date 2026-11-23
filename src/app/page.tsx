import CraftsmanshipSection from "@/components/sections/craftsmanship-section";
import CategorySection from "@/components/sections/category-section";
import HeroSection from "@/components/sections/hero-section";
import OccasionSection from "@/components/sections/occasion-section";
import SalonInvitation from "@/components/sections/salon-invitation";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { categories } from "@/data/catalog";
import { testimonials } from "@/data/homepage";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategorySection categories={categories} />
      <OccasionSection />
      <CraftsmanshipSection />
      <TestimonialsSection testimonials={testimonials} />
      <SalonInvitation />
    </main>
  );
}
