import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedFurnitureSection from "@/components/home/FeaturedFurnitureSection";
import ProductSection from "@/components/home/ProductSection";
import ArtOfMakingSection from "@/components/home/ArtOfMakingSection";
import NewArrivalsShowcase from "@/components/home/NewArrivalsShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BestSellers from "@/components/home/BestSellers";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <CategorySection />

      <FeaturedFurnitureSection />

      <ProductSection />
      <ArtOfMakingSection />
      <NewArrivalsShowcase />
      <BestSellers />
      <WhyChooseUs />

    
    </main>
  );
}