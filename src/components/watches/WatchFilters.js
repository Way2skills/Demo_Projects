"use client";

import { useRef } from "react";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import Button from "@/components/common/Button";
import {
  countActiveWatchFilters,
  filterWatches,
  getWatchAvailability,
} from "@/utils/filterWatches";

// Curated 8 categories per specification
const curatedCategories = [
  { slug: "all", name: "All Watches" },
  { slug: "chronograph-watches", name: "Chronograph" },
  { slug: "dress-and-classic-watches", name: "Dress & Classic" },
  { slug: "diver-watches", name: "Sports & Adventure" },
  { slug: "luxury-watches", name: "Luxury" },
  { slug: "fashion-watches", name: "Fashion & Statement" },
  { slug: "heritage-collection", name: "Heritage" },
  { slug: "smart-and-digital-watches", name: "Smart & Digital" },
];

// Relevant filters per category specification
const categoryFilterMap = {
  all: [
    "price",
    "availability",
    "gender",
    "category",
    "brand",
    "movement",
    "dialColour",
    "dialSize",
    "dialShape",
    "strapMaterial",
    "caseMaterial",
    "waterResistance",
    "occasion",
  ],
  "chronograph-watches": [
    "category",
    "movement",
    "dialColour",
    "dialSize",
    "dialShape",
    "strapMaterial",
    "caseMaterial",
    "waterResistance",
  ],
  "dress-and-classic-watches": [
    "category",
    "movement",
    "dialColour",
    "dialSize",
    "dialShape",
    "strapMaterial",
    "caseMaterial",
    "waterResistance",
  ],
  "diver-watches": [
    "category",
    "movement",
    "dialSize",
    "strapMaterial",
    "caseMaterial",
    "waterResistance",
  ],
  "luxury-watches": [
    "price",
    "category",
    "brand",
    "movement",
    "dialColour",
    "dialSize",
    "dialShape",
    "caseMaterial",
  ],
  "fashion-watches": [
    "price",
    "gender",
    "category",
    "dialColour",
    "strapMaterial",
  ],
  "heritage-collection": [
    "category",
    "brand",
    "movement",
    "dialColour",
    "dialSize",
    "dialShape",
    "caseMaterial",
  ],
  "smart-and-digital-watches": [
    "category",
    "displayType",
    "screenSize",
    "connectivity",
    "batteryLife",
    "sensors",
  ],
};

const allManageableFilterKeys = [
  "category",
  "price",
  "minPrice",
  "maxPrice",
  "availability",
  "gender",
  "brand",
  "movement",
  "watchType",
  "dialColour",
  "dialSize",
  "dialShape",
  "strapMaterial",
  "caseMaterial",
  "waterResistance",
  "occasion",
  "displayType",
  "screenSize",
  "connectivity",
  "batteryLife",
  "sensors",
];

const contextFilterKeys = ["category", "gender", "brand"];

const legacyMovementOptions = [
  { value: "Automatic", label: "Automatic" },
  { value: "Quartz", label: "Quartz" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Digital", label: "Digital" },
];

const legacyAvailabilityOptions = [
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

const legacyGenderOptions = [
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Kids", label: "Kids" },
  { value: "Couples", label: "Couples" },
];

const occasionOptionDefinitions = [
  { value: "Formal", label: "Formal" },
  { value: "Everyday", label: "Everyday" },
  { value: "Party", label: "Party" },
  { value: "Wedding", label: "Wedding" },
];

const isActiveFilterValue = (value) =>
  value !== "" &&
  value !== null &&
  value !== undefined &&
  value !== "all";

function hasExplicitOccasion(watch, occasion) {
  const values = [
    ...(Array.isArray(watch?.occasions) ? watch.occasions : []),
    ...(typeof watch?.occasion === "string" ? [watch.occasion] : []),
  ];

  return values.some(
    (value) =>
      typeof value === "string" &&
      value.trim().toLowerCase() === occasion.toLowerCase(),
  );
}

const filterDefaults = {
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

// Dynamic attribute value extractor with normalization
function getNormalizedDistinctValues(watches, key) {
  if (!Array.isArray(watches)) return [];
  const map = new Map();

  watches.forEach((watch) => {
    const rawValues = Array.isArray(watch?.[key])
      ? watch[key]
      : [watch?.[key]];
    rawValues.forEach((val) => {
      if (
        (typeof val === "string" || typeof val === "number") &&
        String(val).trim() !== ""
      ) {
        const trimmed = String(val).trim();
        const lower = trimmed.toLowerCase();
        if (!map.has(lower)) {
          map.set(lower, trimmed);
        } else {
          const existing = map.get(lower);
          if (/[A-Z]/.test(trimmed) && !/[A-Z]/.test(existing)) {
            map.set(lower, trimmed);
          }
        }
      }
    });
  });

  const values = [...map.values()];

  if (key === "dialSize") {
    return values.sort((a, b) => parseFloat(a) - parseFloat(b));
  }

  return values.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}

function formatCurrencyINR(amount) {
  if (amount === "" || amount === null || amount === undefined) return "";
  const num = Number(amount);
  if (!Number.isFinite(num)) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) {
  const sliderRef = useRef(null);
  const activeHandle = useRef(null);
  const range = max - min;
  const step = 1000;
  const minPosition = range ? ((minValue - min) / range) * 100 : 0;
  const maxPosition = range ? ((maxValue - min) / range) * 100 : 100;

  function valueFromPointer(clientX, startX, startValue) {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds || !bounds.width || !range) return min;
    if (clientX <= bounds.left) return min;
    if (clientX >= bounds.right) return max;

    const change = ((clientX - startX) / bounds.width) * range;
    const steppedValue =
      min + Math.round((startValue + change - min) / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  }

  function updateFromPointer(clientX, drag) {
    const value = valueFromPointer(clientX, drag.startX, drag.startValue);
    onChange(
      drag.handle === "min"
        ? { min: Math.min(value, maxValue), max: maxValue }
        : { min: minValue, max: Math.max(value, minValue) },
    );
  }

  function handleKeyDown(event, handle) {
    const currentValue = handle === "min" ? minValue : maxValue;
    const boundary = handle === "min" ? maxValue : minValue;
    let nextValue = currentValue;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextValue -= step;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextValue += step;
    } else if (event.key === "PageDown") {
      nextValue -= step * 10;
    } else if (event.key === "PageUp") {
      nextValue += step * 10;
    } else if (event.key === "Home") {
      nextValue = handle === "min" ? min : boundary;
    } else if (event.key === "End") {
      nextValue = handle === "max" ? max : boundary;
    } else {
      return;
    }

    event.preventDefault();
    nextValue = Math.min(max, Math.max(min, nextValue));
    onChange(
      handle === "min"
        ? { min: Math.min(nextValue, maxValue), max: maxValue }
        : { min: minValue, max: Math.max(nextValue, minValue) },
    );
  }

  function renderHandle(handle, value, position, zIndex) {
    const isMinHandle = handle === "min";
    return (
      <button
        key={handle}
        type="button"
        role="slider"
        aria-label={isMinHandle ? "Minimum price" : "Maximum price"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${isMinHandle ? "Minimum" : "Maximum"} price ${formatCurrencyINR(value)}`}
        disabled={!range}
        onKeyDown={(event) => handleKeyDown(event, handle)}
        onPointerDown={(event) => {
          activeHandle.current = {
            handle,
            startX: event.clientX,
            startValue: value,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (activeHandle.current?.handle === handle) {
            updateFromPointer(event.clientX, activeHandle.current);
          }
        }}
        onPointerUp={() => {
          activeHandle.current = null;
        }}
        onLostPointerCapture={() => {
          activeHandle.current = null;
        }}
        className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full border-2 border-[#FBFAF7] bg-[#9B8055] shadow transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] active:cursor-grabbing disabled:cursor-not-allowed"
        style={{
          left: `${position}%`,
          top:
            minValue === maxValue
              ? `calc(50% ${isMinHandle ? "- 8px" : "+ 8px"})`
              : "50%",
          zIndex,
        }}
      >
        <span className="sr-only">
          {isMinHandle ? "Minimum price" : "Maximum price"}
        </span>
      </button>
    );
  }

  return (
    <div
      ref={sliderRef}
      role="group"
      aria-label="Price range"
      className="relative mx-2 h-10 touch-none"
    >
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#DED8CD]">
        <div
          className="absolute h-full rounded-full bg-[#9B8055]"
          style={{
            left: `${minPosition}%`,
            right: `${100 - maxPosition}%`,
          }}
        />
      </div>
      {renderHandle(
        "min",
        minValue,
        minPosition,
        minValue > min ? 4 : 2,
      )}
      {renderHandle(
        "max",
        maxValue,
        maxPosition,
        maxValue < max ? 4 : 3,
      )}
    </div>
  );
}

export default function WatchFilters({
  filters = {},
  onFilterChange,
  availableWatches = [],
  hiddenFilters = [],
  fixedFilters = {},
  enableEntranceAnimation = false,
  contextualFilters = false,
}) {
  const currentFilters = filters || {};
  const fixed = fixedFilters || {};
  const hidden = Array.isArray(hiddenFilters) ? hiddenFilters : [];
  const watchesList = Array.isArray(availableWatches) ? availableWatches : [];

  const selectedCategory =
    fixed.category ?? currentFilters.category ?? "all";
  const allowedKeys =
    contextualFilters
      ? allManageableFilterKeys
      : categoryFilterMap[selectedCategory] || categoryFilterMap.all;

  function getFacetWatches(filterName) {
    if (!contextualFilters) return watchesList;

    if (contextFilterKeys.includes(filterName)) {
      const contextFilters = {
        category: currentFilters.category ?? "all",
        gender: currentFilters.gender ?? "all",
        brand: currentFilters.brand ?? "all",
        [filterName]: "all",
        ...fixed,
      };
      return filterWatches(watchesList, contextFilters);
    }

    const facetFilters = { ...currentFilters };
    if (
      filterName === "price" ||
      filterName === "minPrice" ||
      filterName === "maxPrice"
    ) {
      facetFilters.minPrice = "";
      facetFilters.maxPrice = "";
    } else {
      facetFilters[filterName] = filterDefaults[filterName] ?? "all";
    }

    return filterWatches(watchesList, { ...facetFilters, ...fixed });
  }

  const parentPriceContext = contextualFilters
    ? filterWatches(watchesList, {
        category: currentFilters.category ?? "all",
        gender: currentFilters.gender ?? "all",
        brand: currentFilters.brand ?? "all",
        ...fixed,
      })
    : watchesList;
  const priceContextWatches = parentPriceContext.length
    ? parentPriceContext
    : watchesList;

  const prices = priceContextWatches
    .map((watch) => watch?.price)
    .filter((price) => typeof price === "number" && Number.isFinite(price));
  const catalogueMinPrice = prices.length ? Math.min(...prices) : 0;
  const catalogueMaxPrice = prices.length ? Math.max(...prices) : 0;
  const normalizePrice = (value, fallback) => {
    const numericValue = Number(value);
    return value !== "" &&
      value !== null &&
      value !== undefined &&
      Number.isFinite(numericValue)
      ? Math.min(catalogueMaxPrice, Math.max(catalogueMinPrice, numericValue))
      : fallback;
  };
  const selectedMinPrice = normalizePrice(
    currentFilters.minPrice,
    catalogueMinPrice,
  );
  const selectedMaxPrice = normalizePrice(
    currentFilters.maxPrice,
    catalogueMaxPrice,
  );
  const currentMinPrice = Math.min(selectedMinPrice, selectedMaxPrice);
  const currentMaxPrice = Math.max(selectedMinPrice, selectedMaxPrice);
  function updateFilter(filterName, newValue) {
    if (
      typeof onFilterChange === "function" &&
      !Object.prototype.hasOwnProperty.call(fixed, filterName)
    ) {
      onFilterChange({
        ...currentFilters,
        ...fixed,
        [filterName]: newValue,
      });
    }
  }

  function updateContextFilter(filterName, newValue) {
    if (
      typeof onFilterChange !== "function" ||
      Object.prototype.hasOwnProperty.call(fixed, filterName)
    ) {
      return;
    }

    const nextFilters = {
      ...currentFilters,
      ...fixed,
      [filterName]: newValue,
    };
    const changedContextWatches = filterWatches(watchesList, {
      ...fixed,
      [filterName]: newValue,
    });

    contextFilterKeys.forEach((contextKey) => {
      if (
        contextKey === filterName ||
        Object.prototype.hasOwnProperty.call(fixed, contextKey) ||
        !isActiveFilterValue(nextFilters[contextKey])
      ) {
        return;
      }

      if (
        filterWatches(changedContextWatches, {
          [contextKey]: nextFilters[contextKey],
        }).length === 0
      ) {
        nextFilters[contextKey] = "all";
      }
    });

    const parentContextWatches = filterWatches(watchesList, {
      category: nextFilters.category ?? "all",
      gender: nextFilters.gender ?? "all",
      brand: nextFilters.brand ?? "all",
      ...fixed,
    });
    const childFilterKeys = allManageableFilterKeys.filter(
      (key) =>
        !["category", "gender", "brand", "price", "minPrice", "maxPrice"].includes(
          key,
        ),
    );

    childFilterKeys.forEach((key) => {
      if (
        isActiveFilterValue(nextFilters[key]) &&
        filterWatches(parentContextWatches, {
          [key]: nextFilters[key],
        }).length === 0
      ) {
        nextFilters[key] = "all";
      }
    });

    if (
      (isActiveFilterValue(nextFilters.minPrice) ||
        isActiveFilterValue(nextFilters.maxPrice)) &&
      filterWatches(parentContextWatches, {
        minPrice: nextFilters.minPrice,
        maxPrice: nextFilters.maxPrice,
      }).length === 0
    ) {
      nextFilters.minPrice = "";
      nextFilters.maxPrice = "";
    }

    onFilterChange(nextFilters);
  }

  function handleCategoryChange(newCategory) {
    if (contextualFilters) {
      updateContextFilter("category", newCategory);
      return;
    }

    if (typeof onFilterChange !== "function") return;

    const nextAllowedKeys =
      categoryFilterMap[newCategory] || categoryFilterMap.all;
    const nextFilters = {
      ...currentFilters,
      ...fixed,
      category: newCategory,
    };

    allManageableFilterKeys.forEach((key) => {
      if (key !== "category" && !nextAllowedKeys.includes(key)) {
        if (key === "price" || key === "minPrice" || key === "maxPrice") {
          nextFilters.minPrice = "";
          nextFilters.maxPrice = "";
        } else {
          nextFilters[key] = "all";
        }
      }
    });

    onFilterChange(nextFilters);
  }

  function handleFilterChange(filterName, newValue) {
    if (contextualFilters && ["gender", "brand"].includes(filterName)) {
      updateContextFilter(filterName, newValue);
      return;
    }

    updateFilter(filterName, newValue);
  }

  function clearFilters() {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        ...filterDefaults,
        ...fixed,
        category: fixed.category || "all",
      });
    }
  }

  const activeCount = countActiveWatchFilters(currentFilters, fixed);
  const availableCategoryWatches = contextualFilters
    ? getFacetWatches("category")
    : watchesList;
  const categorySlugs = new Set(
    getNormalizedDistinctValues(availableCategoryWatches, "categorySlugs"),
  );
  const categoryOptions = contextualFilters
    ? [
        { slug: "all", name: "All categories" },
        ...categories
          .filter((category) => categorySlugs.has(category.slug))
          .map(({ slug, name }) => ({ slug, name })),
      ]
    : curatedCategories;

  function appendSelectedOption(options, filterName, selectedValue) {
    if (
      isActiveFilterValue(selectedValue) &&
      !options.some((option) => option.value === selectedValue)
    ) {
      const definition =
        filterName === "category"
          ? categories.find((category) => category.slug === selectedValue)
          : filterName === "brand"
            ? brands.find((brand) => brand.slug === selectedValue)
            : null;
      options.push({
        value: selectedValue,
        label: definition?.name || String(selectedValue),
      });
    }

    return options;
  }

  function getAttributeOptions(filterName, legacyWatches = watchesList) {
    const source = contextualFilters
      ? getFacetWatches(filterName)
      : legacyWatches;
    const options = getNormalizedDistinctValues(source, filterName).map(
      (value) => ({ value, label: value }),
    );
    return appendSelectedOption(
      options,
      filterName,
      currentFilters[filterName],
    );
  }

  const availabilityOptions = contextualFilters
    ? [
        ...new Set(
          getFacetWatches("availability")
            .map(getWatchAvailability)
            .filter(Boolean),
        ),
      ]
        .sort()
        .map((value) => ({
          value,
          label:
            value === "in-stock"
              ? "In Stock"
              : value === "out-of-stock"
                ? "Out of Stock"
                : value,
        }))
    : [...legacyAvailabilityOptions];
  const contextualAvailabilityOptions = appendSelectedOption(
    availabilityOptions,
    "availability",
    currentFilters.availability,
  );
  const genderOptions = contextualFilters
    ? getAttributeOptions("gender")
    : legacyGenderOptions;
  const contextualMovementOptions = contextualFilters
    ? getAttributeOptions("movement")
    : legacyMovementOptions;
  const watchTypeOptions = getAttributeOptions("watchType");

  const availableBrandSlugs = new Set(
    getNormalizedDistinctValues(
      contextualFilters ? getFacetWatches("brand") : watchesList,
      "brandSlug",
    ).map((value) => value.toLowerCase()),
  );
  const availableBrands = brands
    .filter((brand) => availableBrandSlugs.has(brand.slug.toLowerCase()))
    .map(({ slug, name }) => ({ value: slug, label: name }));
  const contextualBrandOptions = appendSelectedOption(
    availableBrands,
    "brand",
    currentFilters.brand,
  );

  const resolvedCategoryOptions = appendSelectedOption(
    categoryOptions
      .filter((category) => category.slug !== "all")
      .map(({ slug, name }) => ({ value: slug, label: name })),
    "category",
    selectedCategory,
  );
  const resolvedDialSizeOptions = getAttributeOptions("dialSize");
  const resolvedDialShapeOptions = getAttributeOptions("dialShape");
  const resolvedDialColourOptions = getAttributeOptions("dialColour");
  const resolvedStrapMaterialOptions = getAttributeOptions("strapMaterial");
  const resolvedCaseMaterialOptions = getAttributeOptions("caseMaterial");
  const resolvedWaterResistanceOptions =
    getAttributeOptions("waterResistance");

  const occasionSource = contextualFilters
    ? getFacetWatches("occasion")
    : watchesList;
  const contextualOccasionOptions = contextualFilters
    ? [
        ...new Map(
          [
            ...getNormalizedDistinctValues(occasionSource, "occasions"),
            ...getNormalizedDistinctValues(occasionSource, "occasion"),
          ].map((value) => [value.toLowerCase(), value]),
        ).values(),
      ]
        .sort((first, second) =>
          first.localeCompare(second, undefined, { sensitivity: "base" }),
        )
        .map((value) => ({ value, label: value }))
    : occasionOptionDefinitions.filter((option) =>
        watchesList.some((watch) =>
          hasExplicitOccasion(watch, option.value),
        ),
      );
  appendSelectedOption(
    contextualOccasionOptions,
    "occasion",
    currentFilters.occasion,
  );

  const smartWatches = watchesList.filter((watch) =>
    watch?.categorySlugs?.includes("smart-and-digital-watches"),
  );
  const displayTypeOptions = getAttributeOptions("displayType", smartWatches);
  const screenSizeOptions = getAttributeOptions("screenSize", smartWatches);
  const connectivityOptions = getAttributeOptions(
    "connectivity",
    smartWatches,
  );
  const batteryLifeOptions = getAttributeOptions("batteryLife", smartWatches);
  const sensorsOptions = getAttributeOptions("sensors", smartWatches);

  const controlStyles =
    "mt-1.5 w-full rounded-sm border border-[#DED8CD] bg-[#FBFAF7] px-3 py-2 text-sm text-[#35332F] outline-none transition-colors placeholder:text-[#6D6961] focus:border-[#9B8055] focus:ring-2 focus:ring-[#9B8055]/25 disabled:cursor-not-allowed disabled:opacity-70";
  const labelStyles =
    "block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6D6961]";

  // Helper to check if a filter should render
  const isFilterVisible = (key) =>
    !hidden.includes(key) && allowedKeys.includes(key);

  return (
    <aside
      aria-labelledby="watch-filters-title"
      className={`rounded-sm border border-[#DED8CD] bg-[#FBFAF7] p-5 sm:p-6 ${
        enableEntranceAnimation ? "scroll-reveal-card" : ""
      }`}
      style={
        enableEntranceAnimation
          ? { "--scroll-reveal-delay": "0ms" }
          : undefined
      }
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-[#E8E2D8] pb-4">
        <div>
          <h2
            id="watch-filters-title"
            className="font-serif text-xl font-normal text-[#35332F]"
          >
            Refine Timepieces
          </h2>
          <p className="mt-1 text-xs text-[#6D6961]">
            {activeCount > 0
              ? `${activeCount} filter${activeCount === 1 ? "" : "s"} applied`
              : "Discover watches by category, design, and details."}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={activeCount === 0}
          className="text-xs font-semibold text-[#9B8055] hover:text-[#7E6848] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* 1. Price Range */}
        {isFilterVisible("price") && (
          <div className="rounded-sm border border-[#E8E2D8] bg-[#F5F2EC]/50 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <span className={labelStyles}>Price</span>
              {(currentFilters.minPrice || currentFilters.maxPrice) && (
                <button
                  type="button"
                  onClick={() =>
                    typeof onFilterChange === "function" &&
                    onFilterChange({
                      ...currentFilters,
                      ...fixed,
                      minPrice: "",
                      maxPrice: "",
                    })
                  }
                  className="text-[11px] font-medium text-[#9B8055] underline transition-colors hover:text-[#7E6848]"
                >
                  Reset
                </button>
              )}
            </div>

            <div
              className="mb-3 flex items-center justify-between gap-2 text-xs font-medium text-[#35332F]"
              aria-live="polite"
            >
              <span>{formatCurrencyINR(currentMinPrice)}</span>
              <span className="text-[#9B8055]" aria-hidden="true">
                —
              </span>
              <span>{formatCurrencyINR(currentMaxPrice)}</span>
            </div>

            <PriceRangeSlider
              min={catalogueMinPrice}
              max={catalogueMaxPrice}
              minValue={currentMinPrice}
              maxValue={currentMaxPrice}
              onChange={({ min, max }) => {
                if (typeof onFilterChange !== "function") return;
                onFilterChange({
                  ...currentFilters,
                  ...fixed,
                  minPrice: min === catalogueMinPrice ? "" : String(min),
                  maxPrice: max === catalogueMaxPrice ? "" : String(max),
                });
              }}
            />
          </div>
        )}

        {/* 2. Availability Filter */}
        {isFilterVisible("availability") && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-availability">
              Availability
            </label>
            <select
              id="watch-filter-availability"
              className={controlStyles}
              value={currentFilters.availability ?? "all"}
              onChange={(e) =>
                handleFilterChange("availability", e.target.value)
              }
            >
              <option value="all">All availability</option>
              {contextualAvailabilityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 3. Gender Filter */}
        {isFilterVisible("gender") && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-gender">
              Gender
            </label>
            <select
              id="watch-filter-gender"
              className={controlStyles}
              value={currentFilters.gender ?? "all"}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
            >
              <option value="all">All genders</option>
              {genderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 4. Category Filter */}
        {!hidden.includes("category") && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-category">
              Category
            </label>
            <select
              id="watch-filter-category"
              className={controlStyles}
              value={selectedCategory}
              disabled={fixed.category !== undefined}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">
                {contextualFilters ? "All categories" : "All Watches"}
              </option>
              {resolvedCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 5. Brand Filter (only brands with products) */}
        {isFilterVisible("brand") && availableBrands.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-brand">
              Brand
            </label>
            <select
              id="watch-filter-brand"
              className={controlStyles}
              value={currentFilters.brand ?? "all"}
              disabled={fixed.brand !== undefined}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            >
              <option value="all">All brands</option>
              {contextualBrandOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 6. Movement Filter */}
        {isFilterVisible("movement") && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-movement">
              Movement
            </label>
            <select
              id="watch-filter-movement"
              className={controlStyles}
              value={currentFilters.movement ?? "all"}
              onChange={(e) => handleFilterChange("movement", e.target.value)}
            >
              <option value="all">All movements</option>
              {contextualMovementOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFilterVisible("watchType") && watchTypeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-watchType">
              Watch Type
            </label>
            <select
              id="watch-filter-watchType"
              className={controlStyles}
              value={currentFilters.watchType ?? "all"}
              onChange={(event) =>
                updateFilter("watchType", event.target.value)
              }
            >
              <option value="all">All watch types</option>
              {watchTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 7. Dial Colour Filter */}
        {isFilterVisible("dialColour") &&
          resolvedDialColourOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-dialColour">
              Dial Colour
            </label>
            <select
              id="watch-filter-dialColour"
              className={controlStyles}
              value={currentFilters.dialColour ?? "all"}
              onChange={(e) => updateFilter("dialColour", e.target.value)}
            >
              <option value="all">All dial colours</option>
              {resolvedDialColourOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 8. Dial Size Filter */}
        {isFilterVisible("dialSize") && resolvedDialSizeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-dialSize">
              Dial Size
            </label>
            <select
              id="watch-filter-dialSize"
              className={controlStyles}
              value={currentFilters.dialSize ?? "all"}
              onChange={(e) => updateFilter("dialSize", e.target.value)}
            >
              <option value="all">All dial sizes</option>
              {resolvedDialSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 9. Dial Shape Filter */}
        {isFilterVisible("dialShape") &&
          resolvedDialShapeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-dialShape">
              Dial Shape
            </label>
            <select
              id="watch-filter-dialShape"
              className={controlStyles}
              value={currentFilters.dialShape ?? "all"}
              onChange={(e) => updateFilter("dialShape", e.target.value)}
            >
              <option value="all">All dial shapes</option>
              {resolvedDialShapeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 10. Strap Material Filter */}
        {isFilterVisible("strapMaterial") &&
          resolvedStrapMaterialOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-strapMaterial">
              Strap Material
            </label>
            <select
              id="watch-filter-strapMaterial"
              className={controlStyles}
              value={currentFilters.strapMaterial ?? "all"}
              onChange={(e) => updateFilter("strapMaterial", e.target.value)}
            >
              <option value="all">All strap materials</option>
              {resolvedStrapMaterialOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 11. Case Material Filter */}
        {isFilterVisible("caseMaterial") &&
          resolvedCaseMaterialOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-caseMaterial">
              Case Material
            </label>
            <select
              id="watch-filter-caseMaterial"
              className={controlStyles}
              value={currentFilters.caseMaterial ?? "all"}
              onChange={(e) => updateFilter("caseMaterial", e.target.value)}
            >
              <option value="all">All case materials</option>
              {resolvedCaseMaterialOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 12. Water Resistance Filter */}
        {isFilterVisible("waterResistance") &&
          resolvedWaterResistanceOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-waterResistance">
              Water Resistance
            </label>
            <select
              id="watch-filter-waterResistance"
              className={controlStyles}
              value={currentFilters.waterResistance ?? "all"}
              onChange={(e) => updateFilter("waterResistance", e.target.value)}
            >
              <option value="all">All water resistance</option>
              {resolvedWaterResistanceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 13. Occasion Filter */}
        {isFilterVisible("occasion") &&
          contextualOccasionOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-occasion">
              Occasion
            </label>
            <select
              id="watch-filter-occasion"
              className={controlStyles}
              value={currentFilters.occasion ?? "all"}
              onChange={(e) => updateFilter("occasion", e.target.value)}
            >
              <option value="all">All occasions</option>
              {contextualOccasionOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Smart & Digital attributes - only rendered if catalogue contains matching data */}
        {isFilterVisible("displayType") && displayTypeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-displayType">
              Display Type
            </label>
            <select
              id="watch-filter-displayType"
              className={controlStyles}
              value={currentFilters.displayType ?? "all"}
              onChange={(e) => updateFilter("displayType", e.target.value)}
            >
              <option value="all">All display types</option>
              {displayTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFilterVisible("screenSize") && screenSizeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-screenSize">
              Screen Size
            </label>
            <select
              id="watch-filter-screenSize"
              className={controlStyles}
              value={currentFilters.screenSize ?? "all"}
              onChange={(e) => updateFilter("screenSize", e.target.value)}
            >
              <option value="all">All screen sizes</option>
              {screenSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFilterVisible("connectivity") && connectivityOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-connectivity">
              Connectivity
            </label>
            <select
              id="watch-filter-connectivity"
              className={controlStyles}
              value={currentFilters.connectivity ?? "all"}
              onChange={(e) => updateFilter("connectivity", e.target.value)}
            >
              <option value="all">All connectivity</option>
              {connectivityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFilterVisible("batteryLife") && batteryLifeOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-batteryLife">
              Battery Life
            </label>
            <select
              id="watch-filter-batteryLife"
              className={controlStyles}
              value={currentFilters.batteryLife ?? "all"}
              onChange={(e) => updateFilter("batteryLife", e.target.value)}
            >
              <option value="all">All battery life</option>
              {batteryLifeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isFilterVisible("sensors") && sensorsOptions.length > 0 && (
          <div>
            <label className={labelStyles} htmlFor="watch-filter-sensors">
              Sensors
            </label>
            <select
              id="watch-filter-sensors"
              className={controlStyles}
              value={currentFilters.sensors ?? "all"}
              onChange={(e) => updateFilter("sensors", e.target.value)}
            >
              <option value="all">All sensors</option>
              {sensorsOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </aside>
  );
}
