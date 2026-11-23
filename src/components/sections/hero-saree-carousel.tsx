"use client";

import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroSarees } from "@/data/hero-sarees";

export default function HeroSareeCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [imageVisible, setImageVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  const selectedSaree = heroSarees[selectedIndex];
  const previousSaree =
    previousIndex === null ? null : heroSarees[previousIndex];
  const isPaused = isHovered || isFocused;

  function selectSaree(index: number) {
    const nextIndex = (index + heroSarees.length) % heroSarees.length;
    if (nextIndex !== selectedIndex) {
      setPreviousIndex(selectedIndex);
      setImageVisible(false);
      setSelectedIndex(nextIndex);
    }
    setTimerReset((value) => value + 1);
  }

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const nextIndex = (selectedIndex + 1) % heroSarees.length;
      setPreviousIndex(selectedIndex);
      setImageVisible(false);
      setSelectedIndex(nextIndex);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [isPaused, selectedIndex, timerReset]);

  useEffect(() => {
    if (previousIndex === null || !imageVisible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [imageVisible, previousIndex]);

  return (
    <div
      className="relative mx-auto w-full max-w-[400px] md:max-w-[460px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          selectSaree(selectedIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          selectSaree(selectedIndex + 1);
        }
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[1.25rem] border border-[#b89962]/45"
      />
      <div className="group relative aspect-[5/6] w-full overflow-hidden rounded-2xl border border-[#e2d5c3] bg-[#f4ece1] shadow-[0_24px_60px_rgba(27,30,38,0.18)]">
        <Link
          aria-label={`View ${selectedSaree.name} product`}
          className="absolute inset-0"
          href={`/products/${selectedSaree.productId}`}
        >
          {previousSaree && (
            <Image
              alt=""
              aria-hidden="true"
              className="absolute inset-0 object-cover transition-opacity duration-500 ease-in-out"
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 850px) 45vw, 40vw"
              src={previousSaree.modelImage}
              style={{
                opacity: imageVisible ? 0 : 1,
                transition: "opacity 500ms ease-in-out, transform 650ms ease-out",
              }}
            />
          )}
          <Image
            key={selectedSaree.id}
            alt={selectedSaree.modelAlt}
            className="absolute inset-0 object-cover transition-opacity duration-500 ease-in-out"
            fill
            priority
            sizes="(max-width: 600px) 90vw, (max-width: 850px) 45vw, 40vw"
            onLoad={() => setImageVisible(true)}
            src={selectedSaree.modelImage}
            style={{
              opacity: imageVisible ? 1 : 0,
              transition: "opacity 500ms ease-in-out, transform 650ms ease-out",
            }}
          />
        </Link>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c1527]/35 via-transparent to-transparent"
        />
        <button
          aria-label="Previous saree"
          className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#fdfbf7]/90 text-[#0D1B2A] shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b89962]"
          onClick={() => selectSaree(selectedIndex - 1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={19} />
        </button>
        <button
          aria-label="Next saree"
          className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#fdfbf7]/90 text-[#0D1B2A] shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b89962]"
          onClick={() => selectSaree(selectedIndex + 1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={19} />
        </button>
      </div>

      <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 rounded-lg border border-[#e8dacb] bg-[#fdfbf7]/[0.97] p-2 shadow-2xl backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:gap-3 sm:p-3">
        <div
          aria-live="polite"
          className="w-[31%] max-w-[140px] min-w-0 shrink-0 pr-2 sm:pr-3"
        >
          <div className="min-w-0">
            <span
              className="block text-[8px] font-semibold tracking-[0.12em] text-[#b89962] uppercase sm:text-[9px]"
              style={{ fontFamily: "var(--hero-sans)" }}
            >
              Drape
            </span>
            <span
              className="mt-1 block h-[2.4em] break-words text-[12px] italic leading-tight text-[#0D1B2A] sm:text-base"
              style={{ fontFamily: "var(--hero-serif)" }}
            >
              {selectedSaree.name}
            </span>
          </div>
          <div className="mt-2 border-t border-[#e8dacb] pt-2">
            <span
              className="block text-[7px] font-semibold tracking-[0.1em] text-slate-500 uppercase sm:text-[8px]"
              style={{ fontFamily: "var(--hero-sans)" }}
            >
              Loom Reserve
            </span>
            <strong
              className="mt-0.5 block text-lg leading-tight text-[#0D1B2A] sm:text-xl"
              style={{ fontFamily: "var(--hero-serif)" }}
            >
              {selectedSaree.price}
            </strong>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <div
            aria-label="Choose a saree fabric"
            className="grid w-full min-w-0 grid-cols-4 gap-1 sm:gap-2"
            role="group"
          >
            {heroSarees.map((saree, index) => {
              const isSelected = index === selectedIndex;

              return (
                <button
                  aria-label={`Show ${saree.name}`}
                  aria-pressed={isSelected}
                  className={`group/thumb relative flex min-w-0 flex-col items-center gap-1 rounded-md p-1 transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#f4ece1] text-[#0D1B2A]"
                      : "text-slate-600 hover:bg-[#f4ece1]/70"
                  }`}
                  key={saree.id}
                  onClick={() => selectSaree(index)}
                  type="button"
                >
                  <span
                    className={`relative block aspect-square w-full overflow-hidden rounded-md border-2 transition-colors ${
                      isSelected
                        ? "border-[#b89962]"
                        : "border-transparent group-hover/thumb:border-[#cbb279]/70"
                    }`}
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="object-cover"
                      fill
                      sizes="72px"
                      src={saree.fabricImage}
                    />
                  </span>
                  <span
                    className="line-clamp-2 min-h-[2.2em] w-full text-center text-[7px] leading-tight sm:text-[9px]"
                    style={{ fontFamily: "var(--hero-sans)" }}
                  >
                    {saree.name}
                  </span>
                  {isSelected && (
                    <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full border border-white bg-[#b89962] text-white shadow-sm">
                      <Check aria-hidden="true" size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div aria-label="Carousel position" className="flex justify-center gap-1.5">
          {heroSarees.map((saree, index) => (
            <span
              aria-current={index === selectedIndex ? "true" : undefined}
              className={`size-1.5 rounded-full ${
                index === selectedIndex ? "bg-[#b89962]" : "bg-[#d9cbb8]"
              }`}
              key={saree.id}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
