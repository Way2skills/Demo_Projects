"use client";

import { useState } from "react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import WatchFilters from "@/components/watches/WatchFilters";
import WatchGrid from "@/components/watches/WatchGrid";
import {
  countActiveWatchFilters,
  filterWatches,
} from "@/utils/filterWatches";

const defaultFilters = {
  category: "all",
  searchQuery: "",
  minPrice: "",
  maxPrice: "",
  availability: "all",
  gender: "all",
  brand: "all",
  movement: "all",
  watchType: "all",
  dialColour: "all",
  dialSize: "all",
  dialShape: "all",
  strapMaterial: "all",
  caseMaterial: "all",
  waterResistance: "all",
  occasion: "all",
  displayType: "all",
  screenSize: "all",
  connectivity: "all",
  batteryLife: "all",
  sensors: "all",
};

export default function WatchListing({
  watches = [],
  fixedFilters = {},
  hiddenFilters = [],
  showSorting = true,
  enableEntranceAnimations = false,
  contextualFilters = false,
}) {
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    ...fixedFilters,
  }));
  const [sortBy, setSortBy] = useState("featured");
  const [areMobileFiltersOpen, setAreMobileFiltersOpen] = useState(false);

  const availableWatches = Array.isArray(watches) ? watches : [];
  const safeFixedFilters = fixedFilters || {};
  const safeHiddenFilters = Array.isArray(hiddenFilters) ? hiddenFilters : [];
  const effectiveFilters = { ...filters, ...safeFixedFilters };
  const filteredWatches = filterWatches(availableWatches, effectiveFilters);
  const sortedWatches = [...filteredWatches];

  if (sortBy === "price-low-to-high" || sortBy === "price-high-to-low") {
    sortedWatches.sort((first, second) => {
      const firstHasPrice =
        typeof first.price === "number" && Number.isFinite(first.price);
      const secondHasPrice =
        typeof second.price === "number" && Number.isFinite(second.price);

      if (!firstHasPrice || !secondHasPrice) {
        return firstHasPrice === secondHasPrice ? 0 : firstHasPrice ? -1 : 1;
      }

      return sortBy === "price-low-to-high"
        ? first.price - second.price
        : second.price - first.price;
    });
  } else if (sortBy === "newest") {
    sortedWatches.reverse();
  } else if (sortBy === "featured") {
    sortedWatches.sort((a, b) => {
      if (a.isFeatured === b.isFeatured) return 0;
      return a.isFeatured ? -1 : 1;
    });
  }

  const handleClearAll = () => {
    setFilters({
      ...defaultFilters,
      ...safeFixedFilters,
    });
  };

  const activeFilterCount = countActiveWatchFilters(
    filters,
    safeFixedFilters,
  );

  const FilterPanel = enableEntranceAnimations ? ScrollRevealSection : "div";
  const SearchToolbar = enableEntranceAnimations ? ScrollRevealSection : "div";

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
      {/* Sidebar Filters */}
      <div className="lg:sticky lg:top-6">
        <button
          type="button"
          aria-expanded={areMobileFiltersOpen}
          aria-controls="watch-listing-filters"
          onClick={() => setAreMobileFiltersOpen((isOpen) => !isOpen)}
          className="mb-4 inline-flex min-h-11 w-full items-center justify-between rounded-sm border border-[#DED8CD] bg-[#FBFAF7] px-4 py-2.5 text-sm font-medium text-[#35332F] transition-colors hover:bg-[#F5F2EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] lg:hidden"
        >
          <span className="flex items-center gap-2">
            <span>
              {areMobileFiltersOpen ? "Hide filters" : "Filter Timepieces"}
            </span>
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#9B8055] text-[10px] font-semibold text-[#FBFAF7]">
                {activeFilterCount}
              </span>
            )}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className={`h-4 w-4 transition-transform ${
              areMobileFiltersOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <FilterPanel
          id="watch-listing-filters"
          aria-label={enableEntranceAnimations ? "Timepiece filters" : undefined}
          className={`${areMobileFiltersOpen ? "block" : "hidden"} lg:block`}
        >
          <WatchFilters
            filters={filters}
            onFilterChange={setFilters}
            availableWatches={availableWatches}
            hiddenFilters={safeHiddenFilters}
            fixedFilters={safeFixedFilters}
            enableEntranceAnimation={enableEntranceAnimations}
            contextualFilters={contextualFilters}
          />
        </FilterPanel>
      </div>

      {/* Main Results Column */}
      <div className="min-w-0">
        {/* Controls Bar: Search, Counter, Sort */}
        <SearchToolbar
          aria-label={enableEntranceAnimations ? "Search and sorting" : undefined}
          className="mb-6 flex flex-col gap-4 border-b border-[#E8E2D8] pb-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search Box */}
          <div
            className={`relative w-full max-w-sm ${
              enableEntranceAnimations ? "scroll-reveal-card" : ""
            }`}
            style={
              enableEntranceAnimations
                ? { "--scroll-reveal-delay": "0ms" }
                : undefined
            }
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-[#8C867D]"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="m17.5 17.5-4.5-4.5m1.5-4.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search by name, brand, model..."
              value={filters.searchQuery ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full rounded-sm border border-[#DED8CD] bg-[#FBFAF7] py-2 pl-9 pr-8 text-sm text-[#35332F] placeholder:text-[#8C867D] focus:border-[#9B8055] focus:outline-none focus:ring-2 focus:ring-[#9B8055]/25"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, searchQuery: "" }))
                }
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-[#8C867D] hover:text-[#35332F]"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Result Counter & Sort Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.14em] text-[#6D6961] ${
                enableEntranceAnimations ? "scroll-reveal-card" : ""
              }`}
              style={
                enableEntranceAnimations
                  ? { "--scroll-reveal-delay": "110ms" }
                  : undefined
              }
              aria-live="polite"
              aria-atomic="true"
            >
              {sortedWatches.length}{" "}
              {sortedWatches.length === 1 ? "timepiece" : "timepieces"}
            </p>

            {showSorting && (
              <label
                className={`inline-flex items-center gap-2 text-xs font-medium text-[#6D6961] ${
                  enableEntranceAnimations ? "scroll-reveal-card" : ""
                }`}
                style={
                  enableEntranceAnimations
                    ? { "--scroll-reveal-delay": "220ms" }
                    : undefined
                }
              >
                <span className="uppercase tracking-[0.12em]">Sort by</span>
                <select
                  aria-label="Sort products"
                  className="min-h-9 rounded-sm border border-[#DED8CD] bg-[#FBFAF7] px-3 text-sm text-[#35332F] focus:border-[#9B8055] focus:outline-none focus:ring-2 focus:ring-[#9B8055]/25"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
            )}
          </div>
        </SearchToolbar>

        <WatchGrid
          watches={sortedWatches}
          onClearFilters={handleClearAll}
          enableEntranceAnimations={enableEntranceAnimations}
        />
      </div>
    </div>
  );
}
