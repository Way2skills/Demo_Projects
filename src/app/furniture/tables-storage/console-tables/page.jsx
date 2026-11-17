"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const consoleTables = [
  {
    id: "console-01",
    name: "Modern Minimalist Console Table",
    description:
      "A sleek minimalist console table with a rectangular wooden top and elegant tapered legs, perfect for hallways and living spaces.",
    price: 14999,
    type: "Minimalist",
    material: "Engineered Wood",
    variants: [
      {
        name: "Natural Oak",
        value: "natural-oak",
        image:
          "/images/furniture/tables-storage/console-tables/console-1/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        value: "walnut",
        image:
          "/images/furniture/tables-storage/console-tables/console-1/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Clean Minimalist Design",
      "Rectangular Wooden Tabletop",
      "Elegant Tapered Wooden Legs",
      "Practical Everyday Surface",
      "Suitable for Hallways and Living Spaces",
    ],
    moreInformation: [
      ["SKU", "NLT-CT-001"],
      ["Product Type", "Minimalist Console Table"],
      ["Material", "Engineered Wood"],
      ["Finish", "Natural Oak / Walnut"],
      ["Dimensions", "Contact for dimensions"],
      ["Warranty", "Contact for warranty details"],
    ],
  },
  {
    id: "console-02",
    name: "Modern Drawer Console Table",
    description:
      "A practical console table featuring two storage drawers, a clean tabletop and stylish tapered wooden legs.",
    price: 18999,
    type: "Drawer Console",
    material: "Engineered Wood",
    variants: [
      {
        name: "Natural Oak",
        value: "natural-oak",
        image:
          "/images/furniture/tables-storage/console-tables/console-2/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        value: "walnut",
        image:
          "/images/furniture/tables-storage/console-tables/console-2/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Modern Two-Drawer Design",
      "Convenient Storage Drawers",
      "Spacious Tabletop",
      "Stylish Tapered Wooden Legs",
      "Suitable for Hallways and Entryways",
    ],
    moreInformation: [
      ["SKU", "NLT-CT-002"],
      ["Product Type", "Drawer Console Table"],
      ["Material", "Engineered Wood"],
      ["Storage", "Two Storage Drawers"],
      ["Finish", "Natural Oak / Walnut"],
      ["Dimensions", "Contact for dimensions"],
      ["Warranty", "Contact for warranty details"],
    ],
  },
  {
    id: "console-03",
    name: "Modern Half-Moon Console Table",
    description:
      "An elegant half-moon console table with a curved front edge and slim wooden legs for a refined entrance or hallway.",
    price: 16999,
    type: "Half-Moon Console",
    material: "Engineered Wood",
    variants: [
      {
        name: "Natural Oak",
        value: "natural-oak",
        image:
          "/images/furniture/tables-storage/console-tables/console-3/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        value: "walnut",
        image:
          "/images/furniture/tables-storage/console-tables/console-3/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Elegant Half-Moon Shape",
      "Curved Front Tabletop",
      "Slim Wooden Legs",
      "Space-Saving Design",
      "Ideal for Entryways and Hallways",
    ],
    moreInformation: [
      ["SKU", "NLT-CT-003"],
      ["Product Type", "Half-Moon Console Table"],
      ["Material", "Engineered Wood"],
      ["Shape", "Half-Moon"],
      ["Finish", "Natural Oak / Walnut"],
      ["Dimensions", "Contact for dimensions"],
      ["Warranty", "Contact for warranty details"],
    ],
  },
  {
    id: "console-04",
    name: "Modern Console Table with Lower Shelf",
    description:
      "A versatile wooden console table with a spacious open lower shelf for displaying books, baskets and decorative accessories.",
    price: 21999,
    type: "Shelf Console",
    material: "Engineered Wood",
    variants: [
      {
        name: "Natural Oak",
        value: "natural-oak",
        image:
          "/images/furniture/tables-storage/console-tables/console-4/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        value: "walnut",
        image:
          "/images/furniture/tables-storage/console-tables/console-4/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Modern Console Table Design",
      "Spacious Open Lower Shelf",
      "Practical Display and Storage Space",
      "Durable Wooden Construction",
      "Suitable for Living Rooms and Hallways",
    ],
    moreInformation: [
      ["SKU", "NLT-CT-004"],
      ["Product Type", "Console Table with Lower Shelf"],
      ["Material", "Engineered Wood"],
      ["Storage", "Open Lower Shelf"],
      ["Finish", "Natural Oak / Walnut"],
      ["Dimensions", "Contact for dimensions"],
      ["Warranty", "Contact for warranty details"],
    ],
  },
];

const colourGroups = [
  { name: "Natural Oak", value: "natural-oak", hex: "#C89F6B" },
  { name: "Walnut", value: "walnut", hex: "#6B4226" },
];

const consoleTypes = [...new Set(consoleTables.map((table) => table.type))];

const materials = [...new Set(consoleTables.map((table) => table.material))];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function FilterHeading({ children }) {
  return (
    <h3 className="mb-3 border-b border-[#E8E1D8] pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#493326]">
      {children}
    </h3>
  );
}

function FilterCheckbox({ label, checked, onChange, count }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 py-1.5 text-[11px] text-[#65594F] transition-colors hover:text-[#493326]">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-3.5 w-3.5 accent-[#493326]"
        />
        {label}
      </span>

      {count !== undefined && (
        <span className="text-[10px] text-[#A69A8E]">{count}</span>
      )}
    </label>
  );
}

function ConsoleTableCard({
  table,
  selectedVariant,
  onVariantChange,
  onAddToCart,
  onWishlist,
  isWishlisted,
  onViewProduct,
  animationIndex,
}) {
  const [imageRef, imageVisible] = useScrollReveal();

  const activeVariant =
    table.variants.find((variant) => variant.value === selectedVariant) ||
    table.variants[0];

  return (
    <article
      className="group flex h-full min-w-0 flex-col"
      style={{ transitionDelay: `${animationIndex * 80}ms` }}
    >
      <div
        ref={imageRef}
        className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#F3F1EC]"
      >
        <button
          type="button"
          onClick={() => onViewProduct(table)}
          className="absolute inset-0 z-0 h-full w-full"
          aria-label={`View ${table.name}`}
        >
          <img
            key={activeVariant.image}
            src={activeVariant.image}
            alt={`${table.name} in ${activeVariant.name}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.opacity = "0";
            }}
            className={`h-full w-full object-cover transition-all duration-700 ease-out ${
              imageVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-5 scale-[0.96] opacity-0"
            } group-hover:scale-105`}
          />
        </button>

        <span className="absolute left-3 top-3 z-10 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#493326]">
          {table.type}
        </span>

        <span className="absolute bottom-3 right-3 z-10 bg-white/90 px-3 py-1.5 text-[10px] text-[#493326]">
          {activeVariant.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div>
          <button
            type="button"
            onClick={() => onViewProduct(table)}
            className="block text-left text-[13px] font-semibold text-[#29231F] transition-colors hover:text-[#8B6A4E]"
          >
            {table.name}
          </button>

          <p className="mt-1 text-[10px] text-[#756B62]">
            {table.type}
            <span className="px-1 text-[#B8AA9B]">|</span>
            {table.material}
          </p>

          <p className="mt-2 text-[13px] font-semibold text-[#493326]">
            {formatPrice(table.price)}
          </p>
        </div>

        <div className="mt-3">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#756B62]">
            Choose Wood Finish
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {table.variants.map((variant) => (
              <button
                key={variant.value}
                type="button"
                title={variant.name}
                aria-label={`Select ${variant.name}`}
                aria-pressed={activeVariant.value === variant.value}
                onClick={() => onVariantChange(table.id, variant.value)}
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                  activeVariant.value === variant.value
                    ? "ring-2 ring-[#493326] ring-offset-2"
                    : "hover:scale-110"
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ backgroundColor: variant.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-[1fr_42px] gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(table, activeVariant)}
              className="min-h-[38px] rounded-sm bg-black px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#29231F] active:scale-[0.97]"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => onWishlist(table, activeVariant)}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              className={`flex min-h-[38px] items-center justify-center rounded-sm border transition-all duration-300 ${
                isWishlisted
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-[#D8CEC3] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
              }`}
            >
              <span
                className={`text-xl transition-transform duration-300 ${
                  isWishlisted ? "scale-110" : ""
                }`}
              >
                {isWishlisted ? "♥" : "♡"}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onViewProduct(table)}
            className="mt-2 min-h-[34px] w-full border border-[#493326] bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-all duration-300 hover:bg-[#493326] hover:text-white"
          >
            View Product
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ConsoleTablesPage() {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted: checkWishlisted } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      consoleTables.map((table) => [table.id, table.variants[0].value])
    )
  );

  const [selectedColour, setSelectedColour] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const [activeProduct, setActiveProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [modalQuantity, setModalQuantity] = useState(1);

  const priceRangeInvalid =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  const handleGlobalColour = (colour) => {
    const nextColour = selectedColour === colour ? "" : colour;

    setSelectedColour(nextColour);

    if (!nextColour) return;

    setSelectedVariants((previous) => {
      const updated = { ...previous };

      consoleTables.forEach((table) => {
        const matchingVariant = table.variants.find(
          (variant) => variant.value === nextColour
        );

        if (matchingVariant) {
          updated[table.id] = matchingVariant.value;
        }
      });

      return updated;
    });
  };

  const handleVariantChange = (tableId, colour) => {
    setSelectedVariants((previous) => ({
      ...previous,
      [tableId]: colour,
    }));

    setSelectedColour("");
  };

  const toggleFilter = (value, setter) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  const filteredProducts = useMemo(() => {
    if (priceRangeInvalid) return [];

    let result = consoleTables.filter((table) => {
      const colourMatch =
        !selectedColour ||
        table.variants.some((variant) => variant.value === selectedColour);

      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(table.type);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(table.material);

      const minMatch = minPrice === "" || table.price >= Number(minPrice);
      const maxMatch = maxPrice === "" || table.price <= Number(maxPrice);

      return (
        colourMatch &&
        typeMatch &&
        materialMatch &&
        minMatch &&
        maxMatch
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    selectedColour,
    selectedTypes,
    selectedMaterials,
    minPrice,
    maxPrice,
    sortBy,
    priceRangeInvalid,
  ]);

  const handleAddToCart = (table, variant, quantity = 1) => {
    const cartItem = {
      id: `console-table-${table.id}-${variant.value}`,
      product_id: table.id,
      name: table.name,
      price: table.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      quantity,
      category: "Console Tables",
    };

    addToCart(cartItem);
    openCart();
  };

  const handleWishlist = (table, variant) => {
    const wishlistItem = {
      id: `console-table-${table.id}-${variant.value}`,
      product_id: table.id,
      name: table.name,
      price: table.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      category: "Console Tables",
      href: "/furniture/tables-storage/console-tables",
    };

    toggleWishlist(wishlistItem);
  };

  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) => variant.value === selectedVariants[activeProduct.id]
      ) || activeProduct.variants[0]
    : null;

  const openProductModal = (table) => {
    setActiveProduct(table);
    setActiveTab("description");
    setModalQuantity(1);
  };

  const closeProductModal = () => {
    setActiveProduct(null);
    setActiveTab("description");
    setModalQuantity(1);
  };

  const clearFilters = () => {
    setSelectedColour("");
    setSelectedTypes([]);
    setSelectedMaterials([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");

    setSelectedVariants(
      Object.fromEntries(
        consoleTables.map((table) => [table.id, table.variants[0].value])
      )
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">
          {/* LEFT FILTER SIDEBAR - SCROLLABLE */}
          <aside className="h-fit max-h-[calc(100vh-110px)] overflow-y-auto overscroll-contain rounded-sm border border-[#E8E1D8] bg-[#FAF9F6] p-5 [scrollbar-width:thin] [scrollbar-color:#c5b8a8_#f5f1eb] lg:sticky lg:top-24">
            <Link
              href="/furniture#tables-storage"
              className="group mb-5 inline-flex items-center gap-2 rounded-sm border border-[#DCD3C9] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-all duration-300 hover:border-[#493326] hover:bg-[#493326] hover:text-white"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Tables & Storage
            </Link>

            <div className="mb-5 border-b border-[#E8E1D8] pb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
                NEOLEN FURNITURE
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#29231F]">
                Console Tables
              </h1>

              <span className="mt-3 block h-[2px] w-10 bg-[#A88955]" />
            </div>

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#493326]">Filters</h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-medium text-[#8B6A4E] underline underline-offset-4 transition-colors hover:text-[#493326]"
              >
                Clear all
              </button>
            </div>

            {/* WOOD FINISH FILTER */}
            <div className="mb-7">
              <FilterHeading>Wood Finish</FilterHeading>

              <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                {colourGroups.map((colour) => (
                  <button
                    key={colour.value}
                    type="button"
                    onClick={() => handleGlobalColour(colour.value)}
                    aria-pressed={selectedColour === colour.value}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 ${
                        selectedColour === colour.value
                          ? "scale-110 ring-2 ring-[#493326] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: colour.hex }}
                    >
                      {selectedColour === colour.value && (
                        <span className="text-xs font-bold text-white drop-shadow">
                          ✓
                        </span>
                      )}
                    </span>

                    <span className="text-[10px] text-[#756B62]">
                      {colour.name}
                    </span>
                  </button>
                ))}
              </div>

              {selectedColour && (
                <p className="mt-3 text-[10px] text-[#756B62]">
                  Selected:{" "}
                  {colourGroups.find((item) => item.value === selectedColour)
                    ?.name}
                </p>
              )}
            </div>

            {/* CONSOLE TYPE FILTER */}
            <div className="mb-7">
              <FilterHeading>Console Table Type</FilterHeading>

              {consoleTypes.map((type) => (
                <FilterCheckbox
                  key={type}
                  label={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(type, setSelectedTypes)}
                  count={
                    consoleTables.filter((table) => table.type === type).length
                  }
                />
              ))}
            </div>

            {/* MATERIAL FILTER */}
            <div className="mb-7">
              <FilterHeading>Material</FilterHeading>

              {materials.map((material) => (
                <FilterCheckbox
                  key={material}
                  label={material}
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleFilter(material, setSelectedMaterials)}
                  count={
                    consoleTables.filter(
                      (table) => table.material === material
                    ).length
                  }
                />
              ))}
            </div>

            {/* PRICE FILTER */}
            <div>
              <FilterHeading>Price Range</FilterHeading>

              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(
                  Math.min(...consoleTables.map((item) => item.price))
                )}{" "}
                –{" "}
                {formatPrice(
                  Math.max(...consoleTables.map((item) => item.price))
                )}
              </p>

              <label className="mb-1 block text-[10px] text-[#756B62]">
                From
              </label>

              <input
                type="number"
                min="0"
                placeholder="Minimum price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="mb-3 w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none transition-colors focus:border-[#493326] focus:ring-1 focus:ring-[#D8C6A8]"
              />

              <label className="mb-1 block text-[10px] text-[#756B62]">
                To
              </label>

              <input
                type="number"
                min="0"
                placeholder="Maximum price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none transition-colors focus:border-[#493326] focus:ring-1 focus:ring-[#D8C6A8]"
              />

              {priceRangeInvalid && (
                <p className="mt-2 text-[10px] text-red-600">
                  From price should be less than To price.
                </p>
              )}
            </div>
          </aside>

          {/* RIGHT PRODUCT SECTION */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E8E1D8] pb-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  EXPLORE OUR COLLECTION
                </p>

                <h2 className="mt-1 font-serif text-3xl font-semibold text-[#29231F]">
                  Console Tables
                </h2>

                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover elegant console tables for your home.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">
                    {filteredProducts.length}
                  </span>{" "}
                  of {consoleTables.length} console tables
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-console-tables"
                    className="text-[11px] text-[#756B62]"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort-console-tables"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="min-w-[145px] rounded-sm border border-[#DDD5CC] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#493326]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((table, index) => {
                  const variantValue =
                    selectedVariants[table.id] || table.variants[0].value;

                  const currentVariant =
                    table.variants.find(
                      (variant) => variant.value === variantValue
                    ) || table.variants[0];

                  const wishlistId = `console-table-${table.id}-${currentVariant.value}`;

                  return (
                    <ConsoleTableCard
                      key={table.id}
                      table={table}
                      selectedVariant={variantValue}
                      onVariantChange={handleVariantChange}
                      onAddToCart={handleAddToCart}
                      onWishlist={handleWishlist}
                      isWishlisted={checkWishlisted(wishlistId)}
                      onViewProduct={openProductModal}
                      animationIndex={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-[#493326]">
                  No console tables found
                </p>

                <p className="mt-2 text-xs text-[#756B62]">
                  Try changing your filters or price range.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-black px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#29231F]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {activeProduct && activeVariant && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onClick={closeProductModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProduct.name} details`}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm bg-[#FAF8F4] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProductModal}
              aria-label="Close details"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#493326] shadow transition-colors hover:bg-[#F0E7DE]"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* MODAL IMAGE */}
              <div className="flex min-h-[300px] items-center justify-center bg-[#F1F0EB] p-6">
                <img
                  src={activeVariant.image}
                  alt={`${activeProduct.name} - ${activeVariant.name}`}
                  className="h-full max-h-[480px] w-full object-contain"
                />
              </div>

              {/* MODAL DETAILS */}
              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN CONSOLE TABLE COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>

                <p className="mt-4 text-xl font-semibold text-[#493326]">
                  {formatPrice(activeProduct.price)}
                </p>

                {/* HORIZONTAL PRODUCT TABS */}
                <div className="mt-6 border-b border-[#E4DCD2]">
                  <div className="flex items-center gap-5 overflow-x-auto whitespace-nowrap">
                    {[
                      { id: "description", label: "Description" },
                      { id: "details", label: "Product Details" },
                      { id: "information", label: "More Information" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative shrink-0 pb-3 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                          activeTab === tab.id
                            ? "text-[#493326]"
                            : "text-[#9A8D80] hover:text-[#493326]"
                        }`}
                      >
                        {tab.label}

                        {activeTab === tab.id && (
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#493326]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="min-h-[180px] pt-5">
                  {activeTab === "description" && (
                    <div>
                      <p className="text-sm leading-7 text-[#756B62]">
                        {activeProduct.description}
                      </p>
                    </div>
                  )}

                  {activeTab === "details" && (
                    <ul className="space-y-3">
                      {activeProduct.productDetails.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-[12px] leading-5 text-[#65594F]"
                        >
                          <span className="mt-1 text-[#A88955]">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "information" && (
                    <div className="overflow-hidden rounded-sm border border-[#DDD5CC] bg-white">
                      {activeProduct.moreInformation.map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-[42%_58%] border-b border-[#E8E1D8] last:border-b-0"
                        >
                          <div className="bg-[#F7F3ED] px-3 py-3 text-[10px] font-semibold text-[#493326]">
                            {label}
                          </div>

                          <div className="break-words px-3 py-3 text-[10px] leading-5 text-[#756B62]">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* WOOD FINISH */}
                <p className="mt-5 text-xs font-semibold text-[#493326]">
                  Select Wood Finish: {activeVariant.name}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {activeProduct.variants.map((variant) => (
                    <button
                      key={variant.value}
                      type="button"
                      title={variant.name}
                      aria-label={`Select ${variant.name}`}
                      aria-pressed={activeVariant.value === variant.value}
                      onClick={() =>
                        handleVariantChange(activeProduct.id, variant.value)
                      }
                      className={`h-8 w-8 rounded-full border border-black/10 transition-all ${
                        activeVariant.value === variant.value
                          ? "ring-2 ring-[#493326] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: variant.hex }}
                    />
                  ))}
                </div>

                {/* QUANTITY */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#493326]">
                    Quantity
                  </span>

                  <div className="flex items-center border border-[#DCD3C9] bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        setModalQuantity((previous) =>
                          Math.max(1, previous - 1)
                        )
                      }
                      className="h-8 w-8 text-[#493326] hover:bg-[#F3EEE8]"
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center text-[11px]">
                      {modalQuantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setModalQuantity((previous) => previous + 1)
                      }
                      className="h-8 w-8 text-[#493326] hover:bg-[#F3EEE8]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CART AND WISHLIST */}
                <div className="mt-5 grid grid-cols-[1fr_46px] gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(
                        activeProduct,
                        activeVariant,
                        modalQuantity
                      );
                      closeProductModal();
                    }}
                    className="w-full rounded-sm bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#29231F] active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWishlist(activeProduct, activeVariant)}
                    aria-label="Toggle wishlist"
                    aria-pressed={checkWishlisted(
                      `console-table-${activeProduct.id}-${activeVariant.value}`
                    )}
                    className={`flex items-center justify-center rounded-sm border transition-all ${
                      checkWishlisted(
                        `console-table-${activeProduct.id}-${activeVariant.value}`
                      )
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-[#D8CEC3] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
                    }`}
                  >
                    <span className="text-2xl">
                      {checkWishlisted(
                        `console-table-${activeProduct.id}-${activeVariant.value}`
                      )
                        ? "♥"
                        : "♡"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}