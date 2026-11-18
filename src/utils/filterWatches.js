/**
 * Filter and search watches by catalogue attributes, category, price range, and search query.
 */
const isActiveFilterValue = (value) =>
  value !== "" &&
  value !== null &&
  value !== undefined &&
  value !== "all";

const normalizeStr = (value) =>
  typeof value === "string" || typeof value === "number"
    ? String(value).trim().toLowerCase()
    : "";

const matchesFilterValue = (value, expected) => {
  const normalizedExpected = normalizeStr(expected);
  return Array.isArray(value)
    ? value.some((entry) => normalizeStr(entry) === normalizedExpected)
    : normalizeStr(value) === normalizedExpected;
};

export function getWatchAvailability(watch) {
  if (typeof watch?.availability === "string" && watch.availability.trim()) {
    const value = watch.availability.trim().toLowerCase().replace(/\s+/g, "-");
    if (value === "instock") return "in-stock";
    if (value === "outofstock") return "out-of-stock";
    return value;
  }

  if (typeof watch?.inStock === "boolean") {
    return watch.inStock ? "in-stock" : "out-of-stock";
  }

  if (typeof watch?.isAvailable === "boolean") {
    return watch.isAvailable ? "in-stock" : "out-of-stock";
  }

  return "";
}

export function countActiveWatchFilters(filters = {}, fixedFilters = {}) {
  const currentFilters = filters || {};
  const fixed = fixedFilters || {};
  const activeKeys = Object.entries(currentFilters)
    .filter(
      ([key, value]) =>
        key !== "searchQuery" &&
        key !== "minPrice" &&
        key !== "maxPrice" &&
        isActiveFilterValue(value) &&
        !Object.prototype.hasOwnProperty.call(fixed, key),
    )
    .map(([key]) => key);
  const hasPriceRange =
    isActiveFilterValue(currentFilters.minPrice) ||
    isActiveFilterValue(currentFilters.maxPrice);

  return activeKeys.length + (hasPriceRange ? 1 : 0);
}

export function filterWatches(watches = [], filters = {}) {
  const isActive = isActiveFilterValue;
  const watchList = Array.isArray(watches) ? watches : [];
  const currentFilters = filters || {};

  const minPriceActive = isActive(currentFilters.minPrice);
  const maxPriceActive = isActive(currentFilters.maxPrice);
  const minPrice = minPriceActive ? Number(currentFilters.minPrice) : null;
  const maxPrice = maxPriceActive ? Number(currentFilters.maxPrice) : null;
  const searchQuery = isActive(currentFilters.searchQuery)
    ? normalizeStr(currentFilters.searchQuery)
    : "";

  return watchList.filter((watch) => {
    if (!watch) return false;

    // 1. Text Search Filter (name, brand, model/slug, description, badge)
    if (searchQuery) {
      const name = normalizeStr(watch.name);
      const brand = normalizeStr(watch.brand);
      const slug = normalizeStr(watch.slug);
      const shortDesc = normalizeStr(watch.shortDescription);
      const badge = normalizeStr(watch.badge);
      const diameter = normalizeStr(watch.caseDiameter);

      const matchesSearch =
        name.includes(searchQuery) ||
        brand.includes(searchQuery) ||
        slug.includes(searchQuery) ||
        shortDesc.includes(searchQuery) ||
        badge.includes(searchQuery) ||
        diameter.includes(searchQuery);

      if (!matchesSearch) return false;
    }

    // 2. Category Filter
    if (isActive(currentFilters.category)) {
      if (
        !Array.isArray(watch.categorySlugs) ||
        !watch.categorySlugs.some((slug) =>
          matchesFilterValue(slug, currentFilters.category),
        )
      ) {
        return false;
      }
    }

    // 3. Brand Filter
    if (isActive(currentFilters.brand)) {
      if (!matchesFilterValue(watch.brandSlug, currentFilters.brand)) {
        return false;
      }
    }

    // 4. Movement Filter (handles Automatic, Quartz, Mechanical / Manual, Digital)
    if (isActive(currentFilters.movement)) {
      const watchMvt = normalizeStr(watch.movement);
      const filterMvt = normalizeStr(currentFilters.movement);

      if (filterMvt === "mechanical") {
        if (
          watchMvt !== "mechanical" &&
          watchMvt !== "manual" &&
          watchMvt !== "manual-wind"
        ) {
          return false;
        }
      } else if (
        filterMvt === "manual" ||
        filterMvt === "manual-wind"
      ) {
        if (watchMvt !== "manual" && watchMvt !== "manual-wind") {
          return false;
        }
      } else if (watchMvt !== filterMvt) {
        return false;
      }
    }

    // 5. Gender Filter (Men, Women, Kids, Couples)
    if (isActive(currentFilters.gender)) {
      if (!matchesFilterValue(watch.gender, currentFilters.gender)) {
        return false;
      }
    }

    // 6. Watch Type Filter
    if (isActive(currentFilters.watchType)) {
      if (!matchesFilterValue(watch.watchType, currentFilters.watchType)) {
        return false;
      }
    }

    // 7. Dial Size Filter
    if (isActive(currentFilters.dialSize)) {
      if (!matchesFilterValue(watch.dialSize, currentFilters.dialSize)) {
        return false;
      }
    }

    // 8. Dial Shape Filter
    if (isActive(currentFilters.dialShape)) {
      if (!matchesFilterValue(watch.dialShape, currentFilters.dialShape)) {
        return false;
      }
    }

    // 9. Dial Colour Filter
    if (isActive(currentFilters.dialColour)) {
      if (!matchesFilterValue(watch.dialColour, currentFilters.dialColour)) {
        return false;
      }
    }

    // 10. Strap Material Filter
    if (isActive(currentFilters.strapMaterial)) {
      if (!matchesFilterValue(watch.strapMaterial, currentFilters.strapMaterial)) {
        return false;
      }
    }

    // 11. Case Material Filter
    if (isActive(currentFilters.caseMaterial)) {
      if (!matchesFilterValue(watch.caseMaterial, currentFilters.caseMaterial)) {
        return false;
      }
    }

    // 12. Water Resistance Filter
    if (isActive(currentFilters.waterResistance)) {
      if (!matchesFilterValue(watch.waterResistance, currentFilters.waterResistance)) {
        return false;
      }
    }

    // 13. Availability Filter (In Stock, Out of Stock)
    if (isActive(currentFilters.availability)) {
      if (
        getWatchAvailability(watch) !==
        String(currentFilters.availability)
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
      ) {
        return false;
      }
    }

    // 14. Occasion Filter
    if (isActive(currentFilters.occasion)) {
      const watchOccasions = [
        ...(Array.isArray(watch.occasions) ? watch.occasions : []),
        ...(typeof watch.occasion === "string" ? [watch.occasion] : []),
      ];
      const matchesOccasion = watchOccasions.some((occasion) =>
        matchesFilterValue(occasion, currentFilters.occasion),
      );

      if (!matchesOccasion) {
        return false;
      }
    }

    // 15. Smart & Digital Attributes
    if (isActive(currentFilters.displayType)) {
      if (!matchesFilterValue(watch.displayType, currentFilters.displayType)) {
        return false;
      }
    }
    if (isActive(currentFilters.screenSize)) {
      if (!matchesFilterValue(watch.screenSize, currentFilters.screenSize)) {
        return false;
      }
    }
    if (isActive(currentFilters.connectivity)) {
      if (!matchesFilterValue(watch.connectivity, currentFilters.connectivity)) {
        return false;
      }
    }
    if (isActive(currentFilters.batteryLife)) {
      if (!matchesFilterValue(watch.batteryLife, currentFilters.batteryLife)) {
        return false;
      }
    }
    if (isActive(currentFilters.sensors)) {
      if (!matchesFilterValue(watch.sensors, currentFilters.sensors)) {
        return false;
      }
    }

    // 16. Price Range Filter; both endpoints are inclusive.
    if (minPriceActive || maxPriceActive) {
      const price = watch.price;
      if (
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        (minPriceActive && (!Number.isFinite(minPrice) || price < minPrice)) ||
        (maxPriceActive && (!Number.isFinite(maxPrice) || price > maxPrice))
      ) {
        return false;
      }
    }

    return true;
  });
}
