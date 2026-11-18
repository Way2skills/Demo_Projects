import Image from "next/image";
import WatchListing from "@/components/watches/WatchListing";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import { watches } from "@/data/watches";
import "./watches.css";

export default function WatchesPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#35332F]">
      <section
        aria-label="Watches Catalogue"
        className="relative isolate h-[clamp(20rem,36vw,36rem)] overflow-hidden border-b border-[#EBD5BD] bg-[#24180F]"
      >
        <Image
          src="/images/timepieces/timepieces-hero.png"
          alt="A selection of luxury watches in a warmly lit showroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_center] sm:object-center"
        />
        <div
          className="absolute inset-y-0 left-0 w-[90%] bg-[linear-gradient(90deg,rgba(27,16,9,0.9)_0%,rgba(36,24,15,0.68)_55%,rgba(36,24,15,0.28)_88%,transparent_100%)] sm:w-[72%] sm:bg-[linear-gradient(90deg,rgba(27,16,9,0.84)_0%,rgba(36,24,15,0.64)_55%,rgba(36,24,15,0.18)_90%,transparent_100%)] lg:w-[56%] lg:bg-[linear-gradient(90deg,rgba(27,16,9,0.82)_0%,rgba(36,24,15,0.62)_58%,rgba(36,24,15,0.18)_88%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-5 sm:px-8 lg:px-12">
          <div className="watches-hero-copy w-full max-w-[18rem] py-6 sm:max-w-2xl sm:py-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#EBD5BD] [text-shadow:0_1px_6px_rgba(27,16,9,0.65)] sm:mb-5 sm:text-xs">
              THE COLLECTION
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#FBF7F0] [text-shadow:0_2px_8px_rgba(27,16,9,0.65)] sm:text-5xl md:text-6xl">
              Watches Catalogue
            </h1>
            <div
              className="my-4 h-px w-14 bg-[#D2AD86]/80 sm:my-6"
              aria-hidden="true"
            />
            <p className="max-w-lg text-sm leading-6 text-[#F8EBDD]/95 [text-shadow:0_1px_6px_rgba(27,16,9,0.7)] sm:text-base sm:leading-relaxed">
              Explore a considered selection of timepieces, from enduring
              classics to contemporary icons. Refine the collection to find the
              watch that speaks to you.
            </p>
          </div>
        </div>
      </section>

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section aria-label="Catalogue results">
            <ScrollRevealSection className="mb-6">
              <div className="scroll-reveal-heading flex flex-wrap items-baseline justify-between gap-3 border-b border-[#DED8CD] pb-4">
                <h2
                  id="catalogue-results-title"
                  className="font-serif text-xl text-[#35332F]"
                >
                  Explore the Collection
                </h2>
              </div>
            </ScrollRevealSection>
            <WatchListing
              watches={watches}
              enableEntranceAnimations
              contextualFilters
            />
          </section>
        </div>
      </div>
    </main>
  );
}
