import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import TrustStrip from "@/components/home/TrustStrip";
import ShopByWho from "@/components/home/ShopByWho";
import BrandScroller from "@/components/home/BrandScroller";
import CategoryGrid from "@/components/home/CategoryGrid";
import ShopByBrand from "@/components/ShopByBrand";
import FeaturedWatches from "@/components/home/FeaturedWatches";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HomeHeroCarousel />
      <TrustStrip />
      <ShopByWho />
      <CategoryGrid />
      <BrandScroller />
      <ShopByBrand />
      <FeaturedWatches />
    </main>
  );
}
