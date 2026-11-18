import { notFound } from "next/navigation";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryEditorialHero from "@/components/categories/CategoryEditorialHero";
import WatchListing from "@/components/watches/WatchListing";
import { getCategoryBySlug } from "@/data/categories";
import { getWatchesByCategory } from "@/data/watches";

const genderContextByCategory = {
  "mens-watches": "Men",
  "womens-watches": "Women",
};

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryWatches = getWatchesByCategory(slug);
  const categoryTitle = category.landingTitle || category.name;
  const isEditorialLanding = Boolean(category.editorialHero);
  const fixedGender = genderContextByCategory[slug];
  const hiddenFilters = [
    "category",
    ...(fixedGender ? ["gender"] : []),
    ...(slug === "automatic-watches" ? ["movement"] : []),
    ...(slug === "smart-and-digital-watches"
      ? ["watchType", "movement", "dialSize", "dialShape"]
      : []),
  ];

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#35332F]">
      {category.editorialHero ? (
        <CategoryEditorialHero category={category} />
      ) : (
        <HeroBanner
          imageSrc={category.imagePath}
          imageAlt={`${categoryTitle} watch collection`}
          eyebrow="CATEGORY COLLECTION"
          title={categoryTitle}
          description={category.heroDescription || category.shortDescription}
          showActions={false}
          ariaLabel={`${categoryTitle} category`}
        />
      )}

      <section
        id={isEditorialLanding ? "category-products" : undefined}
        className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {!isEditorialLanding && (
            <header className="mb-9 max-w-3xl border-b border-[#DED8CD] pb-6 sm:mb-12 sm:pb-8">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A77B52]">
                Discover the collection
              </p>
              <h2 className="font-serif text-2xl font-normal tracking-wide text-[#302219] sm:text-3xl">
                {categoryTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#6D6961] sm:text-base">
                {category.shortDescription}
              </p>
            </header>
          )}

          <WatchListing
            watches={categoryWatches}
            fixedFilters={{
              category: slug,
              ...(fixedGender ? { gender: fixedGender } : {}),
            }}
            hiddenFilters={hiddenFilters}
            showSorting
          />
        </div>
      </section>
    </main>
  );
}
