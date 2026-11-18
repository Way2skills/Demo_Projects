import SectionHeading from "@/components/common/SectionHeading";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import WatchCard from "@/components/watches/WatchCard";
import { watches } from "@/data/watches";

function stableShuffle(items, seed) {
  const shuffledItems = [...items];
  let state = seed >>> 0;

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffledItems[index], shuffledItems[swapIndex]] = [
      shuffledItems[swapIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

// The temporary labels and picks use a stable shuffle until real sales and product-added-date data are available.
const temporarySelection = stableShuffle(watches, 20261116);
const bestsellers = temporarySelection.slice(0, 5);
const newArrivals = temporarySelection.slice(5, 10);
const featuredProducts = [
  ...bestsellers.map((watch) => ({ watch, label: "BESTSELLER" })),
  ...newArrivals.map((watch) => ({ watch, label: "NEW ARRIVAL" })),
];

export default function FeaturedWatches() {
  return (
    <ScrollRevealSection
      aria-label="Featured products"
      className="home-scroll-reveal border-b border-[#EBD5BD] bg-[#F7F2E8] py-12 text-[#302219] sm:py-16 lg:py-20"
    >
      <div className="scroll-reveal-heading px-4 sm:px-8 lg:px-12">
        <SectionHeading
          title="FEATURED PRODUCTS"
          align="center"
          theme="light"
          className="!mb-8 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:tracking-wide"
        />
      </div>
      <div
        role="region"
        aria-label="Featured products"
        tabIndex={0}
        className="@container overflow-x-auto overscroll-x-contain px-4 pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A77B52] sm:px-8 lg:px-12"
      >
        <ul className="flex w-max min-w-full items-stretch gap-4 p-0 sm:gap-5">
          {featuredProducts.map(({ watch, label }, index) => (
            <li
              key={watch.id}
              className="scroll-reveal-card flex min-w-0 flex-[0_0_min(82vw,18rem)] sm:flex-[0_0_18rem] lg:flex-[0_0_calc((100cqw-5rem)/5)]"
              style={{
                "--scroll-reveal-delay": `${index * 220}ms`,
              }}
            >
              <WatchCard watch={watch} showcaseLabel={label} />
            </li>
          ))}
        </ul>
      </div>
    </ScrollRevealSection>
  );
}
