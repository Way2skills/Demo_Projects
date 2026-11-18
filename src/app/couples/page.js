import SectionHeading from "@/components/common/SectionHeading";
import WatchListing from "@/components/watches/WatchListing";
import { watchSources } from "@/data/watchSources";
import { watches } from "@/data/watches";

const coupleWatches = watches.filter(
  (watch) =>
    watch.gender === "Couples" &&
    watchSources[watch.slug]?.verifiedCoupleSet === true,
);

export default function CouplesPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-16 text-[#35332F] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="MADE TO BE SHARED"
          title="TIME, TOGETHER"
          subtitle="Discover official watch sets selected for moments shared."
          align="center"
          as="h1"
          className="mb-10 md:mb-12"
        />
        <WatchListing
          watches={coupleWatches}
          fixedFilters={{ gender: "Couples" }}
          hiddenFilters={["gender"]}
        />
      </div>
    </main>
  );
}
