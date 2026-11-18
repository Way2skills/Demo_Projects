"use client";

import { useEffect, useRef, useState } from "react";
import WatchCard from "@/components/watches/WatchCard";
import Button from "@/components/common/Button";

export default function WatchGrid({
  watches,
  onClearFilters,
  enableEntranceAnimations = false,
}) {
  const watchList = Array.isArray(watches) ? watches : [];
  const gridRef = useRef(null);
  const revealedWatchIdsRef = useRef(new Set());
  const [revealedWatchIds, setRevealedWatchIds] = useState(new Set());
  const [gridRevealState, setGridRevealState] = useState("animated");
  const watchListSignature = JSON.stringify(
    watchList.map((watch) => String(watch.id)),
  );

  useEffect(() => {
    if (!enableEntranceAnimations) return undefined;

    const grid = gridRef.current;
    if (!grid) return undefined;

    const cards = Array.from(grid.querySelectorAll("[data-watch-card]"));
    if (cards.length === 0) return undefined;

    if (!("IntersectionObserver" in window)) {
      const fallbackFrame = window.requestAnimationFrame(() => {
        setGridRevealState("static");
      });
      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    const revealCards = (watchIds) => {
      const newWatchIds = watchIds.filter(
        (watchId) => !revealedWatchIdsRef.current.has(watchId),
      );
      if (newWatchIds.length === 0) return;

      newWatchIds.forEach((watchId) =>
        revealedWatchIdsRef.current.add(watchId),
      );
      setRevealedWatchIds((currentIds) => {
        const nextIds = new Set(currentIds);
        newWatchIds.forEach((watchId) => nextIds.add(watchId));
        return nextIds;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleWatchIds = [];
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          visibleWatchIds.push(entry.target.dataset.watchId);
          observer.unobserve(entry.target);
        });
        revealCards(visibleWatchIds);
      },
      { threshold: 0.1 },
    );

    cards.forEach((card, index) => {
      const watchId = card.dataset.watchId;
      card.style.setProperty(
        "--watch-card-reveal-delay",
        `${(index % 4) * 110}ms`,
      );
      if (!revealedWatchIdsRef.current.has(watchId)) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [enableEntranceAnimations, watchListSignature]);

  if (watchList.length === 0) {
    return (
      <div className="rounded-xl border border-[#DED8CD] bg-[#FBFAF7] px-6 py-14 text-center sm:px-10">
        <p className="font-serif text-2xl text-[#35332F]">
          No timepieces found
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6D6961]">
          No watches match your selected criteria. Try adjusting your search or clearing your filters to discover more pieces from the collection.
        </p>
        {typeof onClearFilters === "function" && (
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClearFilters}
              className="text-xs uppercase tracking-[0.14em]"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      data-reveal-state={gridRevealState}
      className="watch-card-grid grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {watchList.map((watch) => (
        <div
          key={watch.id}
          data-watch-card
          data-watch-id={String(watch.id)}
          data-revealed={revealedWatchIds.has(String(watch.id))}
          className={enableEntranceAnimations ? "watch-grid-card" : undefined}
        >
          <WatchCard
            watch={watch}
            enableListingHover={enableEntranceAnimations}
          />
        </div>
      ))}
      <style jsx>{`
        .watch-grid-card {
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          transition:
            opacity 750ms cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: var(--watch-card-reveal-delay, 0ms);
        }

        .watch-grid-card[data-revealed="true"] {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .watch-card-grid[data-reveal-state="static"] .watch-grid-card {
          opacity: 1;
          transform: none;
          transition: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .watch-grid-card {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
