"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

/**
 * A compact, continuously scrolling showcase of featured watchmakers.
 */
export default function BrandScroller() {
  return (
    <ScrollRevealSection
      id="esteemed-brands"
      aria-label="Our esteemed brands"
      className="home-scroll-reveal home-brand-marquee scroll-mt-24 overflow-hidden border-b border-[#EBD5BD] bg-[#F7F2E8] py-7 pb-3 text-[#302219] sm:py-9 sm:pb-4"
    >
      <h2 className="scroll-reveal-heading mx-auto mb-6 flex max-w-3xl items-center justify-center gap-4 px-4 text-center font-serif text-lg font-bold uppercase tracking-[0.14em] sm:mb-8 sm:gap-6 sm:text-2xl sm:tracking-[0.18em]">
        <span
          className="h-px min-w-5 flex-1 bg-[#A77B52]"
          aria-hidden="true"
        />
        <span className="whitespace-nowrap">OUR ESTEEMED BRANDS</span>
        <span
          className="h-px min-w-5 flex-1 bg-[#A77B52]"
          aria-hidden="true"
        />
      </h2>
      <div className="brand-marquee-viewport">
        <div className="brand-marquee-track">
          {[false, true].map((isDuplicate) => (
            <ul
              key={isDuplicate ? "duplicate" : "original"}
              className="brand-marquee-group"
              aria-hidden={isDuplicate}
            >
              {brands.map((brand, index) => (
                <li
                  key={brand.id}
                  className="brand-marquee-item scroll-reveal-card"
                  style={{ "--scroll-reveal-delay": `${index * 220}ms` }}
                >
                  <Link
                    href={`/brands/${brand.slug}`}
                    aria-label={`View ${brand.name} brand profile`}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="flex shrink-0 items-center whitespace-nowrap text-[#302219] transition-colors duration-200 hover:text-[#A77B52] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77B52] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F2E8]"
                  >
                    <span className="relative block h-12 w-48 shrink-0 sm:h-16 sm:w-64">
                      <Image
                        src={`/images/brands/logos/${brand.slug}.png`}
                        alt={`${brand.name} logo`}
                        fill
                        sizes="(min-width: 640px) 256px, 192px"
                        className="object-contain"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-marquee-viewport {
          overflow: hidden;
        }

        .brand-marquee-track {
          display: flex;
          width: max-content;
          animation: brand-marquee-scroll 44s linear infinite;
        }

        .brand-marquee-viewport:hover .brand-marquee-track,
        .brand-marquee-viewport:focus-within .brand-marquee-track {
          animation-play-state: paused;
        }

        .brand-marquee-group {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 2.75rem;
          margin: 0;
          padding: 0 2.75rem 0 0;
          list-style: none;
        }

        .brand-marquee-item {
          flex: 0 0 auto;
        }

        @keyframes brand-marquee-scroll {
          to {
            transform: translateX(-50%);
          }
        }

        @media (min-width: 640px) {
          .brand-marquee-group {
            gap: 4.5rem;
            padding-right: 4.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-marquee-viewport {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .brand-marquee-viewport::-webkit-scrollbar {
            display: none;
          }

          .brand-marquee-track {
            animation: none;
          }

          .brand-marquee-group[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </ScrollRevealSection>
  );
}
