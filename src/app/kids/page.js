import SectionHeading from "@/components/common/SectionHeading";
import WatchListing from "@/components/watches/WatchListing";
import { watches } from "@/data/watches";

const kidsWatches = watches.filter((watch) => watch.gender === "Kids");

export default function KidsPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-16 text-[#35332F] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="A LITTLE TIMELESS"
          title="WATCHES FOR LITTLE MOMENTS"
          subtitle="Thoughtful timepieces for younger wrists, selected from the verified collection."
          align="center"
          as="h1"
          className="mb-10 md:mb-12"
        />
        <WatchListing
          watches={kidsWatches}
          fixedFilters={{ gender: "Kids" }}
          hiddenFilters={["gender"]}
        />
      </div>
    </main>
  );
}
