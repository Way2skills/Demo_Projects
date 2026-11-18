"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import { categories } from "@/data/categories";
import { getWatchesByCategory } from "@/data/watches";

/**
 * Category carousel for browsing Crueze TimeLine collections.
 */
export default function CategoryGrid() {
  const viewportRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const availableStyleCategories = categories.filter(
    (category) =>
      category.isStyleCategory &&
      getWatchesByCategory(category.slug).length > 0,
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const updateArrowState = () => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      setCanScrollPrev(viewport.scrollLeft > 1);
      setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 1);
    };

    const resizeObserver = new ResizeObserver(updateArrowState);
    resizeObserver.observe(viewport);
    resizeObserver.observe(viewport.firstElementChild);
    viewport.addEventListener("scroll", updateArrowState, { passive: true });
    updateArrowState();

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", updateArrowState);
    };
  }, []);

  const scrollByCard = (direction) => {
    const viewport = viewportRef.current;
    const firstCard = viewport?.querySelector(".category-carousel-card");
    if (!viewport || !firstCard) return;

    const track = firstCard.parentElement;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + (gap || 0)),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <ScrollRevealSection
      aria-label="Shop by Style"
      className="home-scroll-reveal home-style-reveal overflow-hidden border-b border-[#EBD5BD] bg-[#EFE4D3] py-6 text-[#302219] sm:py-8 lg:py-10"
    >
      <div className="scroll-reveal-heading mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="CURATED STYLES"
          title="SHOP BY STYLE"
          subtitle="Explore timeless classics, expressive designs, sporty adventures, and watches inspired by heritage."
          align="center"
          theme="light"
          className="!mb-8 md:!mb-10 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:tracking-wide"
        />
      </div>

      <div className="category-carousel-viewport">
        <button
          type="button"
          aria-label="Show previous categories"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#302219] text-[#F8EBDD] shadow-md transition duration-200 hover:scale-105 hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8EBDD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302219] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Show next categories"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#302219] text-[#F8EBDD] shadow-md transition duration-200 hover:scale-105 hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8EBDD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302219] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="m9 18 6-6-6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div ref={viewportRef} className="category-carousel-scroller">
          <ul className="category-carousel-track">
            {availableStyleCategories.map((category, index) => (
              <li
                key={category.id}
                className="category-carousel-card scroll-reveal-card"
                style={{ "--scroll-reveal-delay": `${index * 220}ms` }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="category-carousel-link group relative flex aspect-[3/2] w-full flex-col justify-end overflow-hidden rounded-xl border border-[#EBD5BD] bg-[#EBD5BD] px-4 pb-2 pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86] sm:px-5 sm:pb-3 sm:pt-5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.imagePath}
                    alt={`${category.landingTitle || category.name} watches`}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    loading="lazy"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#302219]/70 via-[#302219]/25 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 block w-full">
                    <span className="line-clamp-2 block max-w-[95%] font-serif text-base font-bold leading-tight text-white sm:text-lg lg:text-xl">
                      {category.landingTitle || category.name}
                    </span>
                    <span className="mt-0.5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#EBD5BD] sm:text-sm">
                      Explore
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .category-carousel-viewport {
          position: relative;
          width: 100%;
        }

        .category-carousel-scroller {
          container-type: inline-size;
          width: 100%;
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }

        .category-carousel-scroller::-webkit-scrollbar {
          display: none;
        }

        .category-carousel-track {
          display: flex;
          width: 100%;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .category-carousel-card {
          flex: 0 0 100cqw;
          min-width: 0;
          scroll-snap-align: start;
        }

        @media (min-width: 640px) {
          .category-carousel-card {
            flex-basis: calc((100cqw - 1.5rem) / 2);
          }
        }

        @media (min-width: 1024px) {
          .category-carousel-card {
            flex-basis: calc((100cqw - 4.5rem) / 4);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .category-carousel-scroller {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </ScrollRevealSection>
  );
}
