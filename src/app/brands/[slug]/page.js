import { notFound } from "next/navigation";
import SectionHeading from "@/components/common/SectionHeading";
import WatchListing from "@/components/watches/WatchListing";
import { getBrandBySlug } from "@/data/brands";
import { getWatchesByBrand } from "@/data/watches";

export default async function BrandDetailPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const brandWatches = getWatchesByBrand(slug);

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-16 text-[#35332F] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="The Collection"
          title={brand.name}
          subtitle={brand.shortDescription}
          align="left"
          as="h1"
          className="mb-10 md:mb-12"
        />
        <WatchListing
          watches={brandWatches}
          fixedFilters={{ brand: slug }}
          hiddenFilters={["brand"]}
        />
      </div>
    </main>
  );
}
