
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const sideTableProducts = [
  {
    id: "side-table-01",
    name: "Modern Round Side Table",
    description:
      "A simple round side table with three elegant wooden legs, perfect for modern living spaces.",
    price: 12990,
    shape: "Round",
    size: "Compact",
    badge: "Best seller",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/living-room/side-tables/side-table-01/natural-oak.jpeg", hex: "#C9A879" },
      { name: "Walnut Brown", image: "/images/furniture/living-room/side-tables/side-table-01/walnut.jpeg", hex: "#68452F" },
      { name: "Black", image: "/images/furniture/living-room/side-tables/side-table-01/black.jpeg", hex: "#292929" },
      { name: "White Oak", image: "/images/furniture/living-room/side-tables/side-table-01/white-oak.jpeg", hex: "#E6D9BD" },
    ],
    productDetails: [
      "Elegant Round Tabletop",
      "Three Solid Wooden Legs",
      "Premium Wood Finish",
      "Smooth and Durable Surface",
      "Stable Construction",
      "Compact Space-Saving Design",
    ],
    moreInformation: [
      ["Available Quantity", "25"],
      ["SKU", "NL-ST-1001"],
      ["Weight", "8.50 Kg"],
      ["Dimensions", "W 18 X D 18 X H 22 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Wood"],
    ],
  },
  {
    id: "side-table-02",
    name: "Modern Square Side Table",
    description:
      "A clean square tabletop with four straight tapered legs for everyday convenience.",
    price: 14990,
    shape: "Square",
    size: "Medium",
    badge: "Modern design",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/living-room/side-tables/side-table-02/natural-oak.jpeg", hex: "#C9A879" },
      { name: "Walnut Brown", image: "/images/furniture/living-room/side-tables/side-table-02/walnut.jpeg", hex: "#68452F" },
      { name: "Black", image: "/images/furniture/living-room/side-tables/side-table-02/black.jpeg", hex: "#292929" },
      { name: "White Oak", image: "/images/furniture/living-room/side-tables/side-table-02/white-oak.jpeg", hex: "#E6D9BD" },
    ],
    productDetails: [
      "Contemporary Square Tabletop",
      "Four Tapered Wooden Legs",
      "Premium Wood Finish",
      "Smooth Surface",
      "Strong and Stable Structure",
      "Versatile Everyday Use",
    ],
    moreInformation: [
      ["Available Quantity", "20"],
      ["SKU", "NL-ST-1002"],
      ["Weight", "10.20 Kg"],
      ["Dimensions", "W 20 X D 20 X H 22 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Wood"],
    ],
  },
  {
    id: "side-table-03",
    name: "Modern Pedestal Side Table",
    description:
      "An elegant round side table with a sculptural central pedestal base.",
    price: 17990,
    shape: "Pedestal",
    size: "Medium",
    badge: "Premium design",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/living-room/side-tables/side-table-03/natural-oak.jpeg", hex: "#C9A879" },
      { name: "Walnut Brown", image: "/images/furniture/living-room/side-tables/side-table-03/walnut.jpeg", hex: "#68452F" },
      { name: "Black", image: "/images/furniture/living-room/side-tables/side-table-03/black.jpeg", hex: "#292929" },
      { name: "White Oak", image: "/images/furniture/living-room/side-tables/side-table-03/white-oak.jpeg", hex: "#E6D9BD" },
    ],
    productDetails: [
      "Elegant Round Tabletop",
      "Sculptural Pedestal Base",
      "Premium Wood Finish",
      "Contemporary Silhouette",
      "Strong and Stable Structure",
      "Easy-to-Maintain Surface",
    ],
    moreInformation: [
      ["Available Quantity", "15"],
      ["SKU", "NL-ST-1003"],
      ["Weight", "12.40 Kg"],
      ["Dimensions", "W 20 X D 20 X H 23 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Engineered Wood + Solid Wood Base"],
    ],
  },
  {
    id: "side-table-04",
    name: "Modern Drawer Side Table",
    description:
      "A practical side table featuring one handleless drawer and four tapered wooden legs.",
    price: 19990,
    shape: "Storage",
    size: "Medium",
    badge: "Functional pick",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/living-room/side-tables/side-table-04/natural-oak.jpeg", hex: "#C9A879" },
      { name: "Walnut Brown", image: "/images/furniture/living-room/side-tables/side-table-04/walnut.jpeg", hex: "#68452F" },
      { name: "Black", image: "/images/furniture/living-room/side-tables/side-table-04/black.jpeg", hex: "#292929" },
      { name: "White Oak", image: "/images/furniture/living-room/side-tables/side-table-04/white-oak.jpeg", hex: "#E6D9BD" },
    ],
    productDetails: [
      "One Spacious Storage Drawer",
      "Handleless Drawer Design",
      "Four Tapered Wooden Legs",
      "Premium Wood Finish",
      "Smooth Drawer Movement",
      "Practical Bedside or Sofa Storage",
    ],
    moreInformation: [
      ["Available Quantity", "18"],
      ["SKU", "NL-ST-1004"],
      ["Weight", "14.80 Kg"],
      ["Dimensions", "W 18 X D 16 X H 23 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Engineered Wood + Solid Wood Legs"],
    ],
  },
  {
    id: "side-table-05",
    name: "C-Shaped Sofa Side Table",
    description:
      "A space-saving C-shaped side table designed to slide conveniently beside your sofa.",
    price: 9990,
    shape: "C-Shape",
    size: "Compact",
    badge: "Space saver",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/living-room/side-tables/side-table-05/natural-oak.jpeg", hex: "#C9A879" },
      { name: "Walnut Brown", image: "/images/furniture/living-room/side-tables/side-table-05/walnut.jpeg", hex: "#68452F" },
      { name: "Black", image: "/images/furniture/living-room/side-tables/side-table-05/black.jpeg", hex: "#292929" },
      { name: "White Oak", image: "/images/furniture/living-room/side-tables/side-table-05/white-oak.jpeg", hex: "#E6D9BD" },
    ],
    productDetails: [
      "Space-Saving C-Shaped Design",
      "Convenient Sofa-Side Placement",
      "Premium Wood Finish",
      "Strong Metal Support Structure",
      "Easy to Move",
      "Ideal for Compact Living Spaces",
    ],
    moreInformation: [
      ["Available Quantity", "30"],
      ["SKU", "NL-ST-1005"],
      ["Weight", "6.80 Kg"],
      ["Dimensions", "W 12 X D 18 X H 25 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Wooden Top + Metal Frame"],
    ],
  },
];

const colourGroups = [
  { name: "Natural Oak", hex: "#C9A879", variants: ["Natural Oak"] },
  { name: "Walnut", hex: "#68452F", variants: ["Walnut Brown"] },
  { name: "Black", hex: "#292929", variants: ["Black"] },
  { name: "White Oak", hex: "#E6D9BD", variants: ["White Oak"] },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

/* REPEATABLE SCROLL REVEAL */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.18,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function FilterHeading({ children }) {
  return (
    <h3 className="mb-3 border-b border-[#E8E1D8] pb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#493326]">
      {children}
    </h3>
  );
}

function FilterCheckbox({ label, checked, onChange, count }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 py-1.5 text-[12px] text-[#65594F] transition-colors hover:text-[#493326]">
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

function SideTableCard({
  product,
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
    product.variants.find((variant) => variant.name === selectedVariant) ||
    product.variants[0];

  return (
    <article className="group min-w-0">
      <div
        ref={imageRef}
        className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#F1F2EC]"
      >
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="absolute inset-0 z-0 h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <img
            key={activeVariant.image}
            src={activeVariant.image}
            alt={`${product.name} in ${activeVariant.name}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.opacity = "0";
            }}
            style={{
              transitionDelay: imageVisible
                ? `${animationIndex * 180}ms`
                : "0ms",
            }}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${
              imageVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-5 scale-[0.94] opacity-0"
            } group-hover:scale-105`}
          />
        </button>

        <span className="absolute left-3 top-3 z-10 rounded-sm bg-[#DCE7DC] px-2 py-1 text-[9px] font-semibold text-[#405344]">
          {product.badge}
        </span>

        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] text-[#493326]">
          {activeVariant.name}
        </span>
      </div>

      <div className="pt-3">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="block text-left text-[13px] font-semibold text-[#29231F] transition-colors hover:text-[#8B6A4E]"
        >
          {product.name}
        </button>

        <p className="mt-1 text-[11px] text-[#756B62]">
          {product.size}, {product.shape}
        </p>

        <p className="mt-2 text-[13px] font-semibold text-[#29231F]">
          {formatPrice(product.price)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {product.variants.map((variant) => (
            <button
              key={variant.name}
              type="button"
              title={variant.name}
              aria-label={`Select ${variant.name}`}
              aria-pressed={activeVariant.name === variant.name}
              onClick={() => onVariantChange(product.id, variant.name)}
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                activeVariant.name === variant.name
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

        <p className="mt-2 text-[10px] text-[#756B62]">
          {activeVariant.name}
        </p>

        <div className="mt-4 grid grid-cols-[1fr_42px] gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(product, activeVariant)}
            className="rounded-sm bg-black px-3 py-2.5 text-[11px] font-semibold text-white"
          >
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => onWishlist(product, activeVariant)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            className={`flex items-center justify-center rounded-sm border transition-all duration-300 ${
              isWishlisted
                ? "border-red-500 bg-red-500 text-white"
                : "border-[#CFC3B7] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
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
          onClick={() => onViewProduct(product)}
          className="mt-2 w-full rounded-sm border border-[#493326] bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-colors duration-300 hover:bg-[#493326] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D8C6A8]"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

export default function SideTablesPage() {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted: checkWishlisted } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      sideTableProducts.map((product) => [
        product.id,
        product.variants[0].name,
      ])
    )
  );

  const [selectedColour, setSelectedColour] = useState("");
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [cartMessage, setCartMessage] = useState("");

  const priceRangeInvalid =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  const handleGlobalColour = (colour) => {
    const nextColour = selectedColour === colour ? "" : colour;
    setSelectedColour(nextColour);

    if (!nextColour) return;

    const group = colourGroups.find((item) => item.name === nextColour);
    if (!group) return;

    setSelectedVariants((previous) => {
      const updated = { ...previous };

      sideTableProducts.forEach((product) => {
        const matchingVariant = product.variants.find((variant) =>
          group.variants.includes(variant.name)
        );

        if (matchingVariant) {
          updated[product.id] = matchingVariant.name;
        }
      });

      return updated;
    });
  };

  const handleVariantChange = (productId, colour) => {
    setSelectedVariants((previous) => ({
      ...previous,
      [productId]: colour,
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

    let result = sideTableProducts.filter((product) => {
      const shapeMatch =
        selectedShapes.length === 0 ||
        selectedShapes.includes(product.shape);

      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.includes(product.size);

      const minMatch =
        minPrice === "" || product.price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" || product.price <= Number(maxPrice);

      return shapeMatch && sizeMatch && minMatch && maxMatch;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    selectedShapes,
    selectedSizes,
    minPrice,
    maxPrice,
    sortBy,
    priceRangeInvalid,
  ]);

  const handleAddToCart = (product, variant) => {
    const cartItem = {
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
      quantity: 1,
    };

    addToCart(cartItem);
    openCart();
    setCartMessage(`${product.name} added to cart`);

    window.setTimeout(() => setCartMessage(""), 2500);
  };

  const handleWishlist = (product, variant) => {
    const wishlistItem = {
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
    };

    toggleWishlist(wishlistItem);
  };

  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) => variant.name === selectedVariants[activeProduct.id]
      ) || activeProduct.variants[0]
    : null;

  const activeWishlistItem =
    activeProduct && activeVariant
      ? `${activeProduct.id}-${activeVariant.name}`
      : "";

  const activeProductWishlisted = activeWishlistItem
    ? checkWishlisted(activeWishlistItem)
    : false;

  const clearFilters = () => {
    setSelectedColour("");
    setSelectedShapes([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");

    setSelectedVariants(
      Object.fromEntries(
        sideTableProducts.map((product) => [
          product.id,
          product.variants[0].name,
        ])
      )
    );
  };

  const closeModal = () => {
    setActiveProduct(null);
    setActiveTab("description");
  };

  return (
    <main className="min-h-screen bg-white text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-5 sm:px-8 sm:pt-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">
          {/* LEFT SIDEBAR */}
          <aside className="h-fit max-h-[70vh] overflow-y-auto overscroll-contain rounded-sm border border-[#E8E1D8] bg-[#FAF9F6] p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <Link
              href="/furniture?category=living-room#furniture-categories"
              className="group mb-5 inline-flex items-center gap-2 rounded-sm border border-[#DCD3C9] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-all duration-300 hover:border-[#493326] hover:bg-[#493326] hover:text-white"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Living Room
            </Link>

            <div className="mb-5 border-b border-[#E8E1D8] pb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
                NEOLEN FURNITURE
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#29231F]">
                Side Tables
              </h1>

              <span className="mt-3 block h-[2px] w-10 bg-[#A88955]" />
            </div>

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#493326]">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-medium text-[#8B6A4E] underline underline-offset-4 hover:text-[#493326]"
              >
                Clear all
              </button>
            </div>

            {/* COLOUR FILTER */}
            <div className="mb-7">
              <FilterHeading>Colour</FilterHeading>

              <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                {colourGroups.map((colour) => (
                  <button
                    key={colour.name}
                    type="button"
                    onClick={() => handleGlobalColour(colour.name)}
                    aria-pressed={selectedColour === colour.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 ${
                        selectedColour === colour.name
                          ? "scale-110 ring-2 ring-[#493326] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: colour.hex }}
                    >
                      {selectedColour === colour.name && (
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
                  Selected: {selectedColour}
                </p>
              )}
            </div>

            {/* SHAPE FILTER */}
            <div className="mb-7">
              <FilterHeading>Shape / Design</FilterHeading>

              {["Round", "Square", "Pedestal", "Storage", "C-Shape"].map(
                (shape) => (
                  <FilterCheckbox
                    key={shape}
                    label={shape}
                    checked={selectedShapes.includes(shape)}
                    onChange={() =>
                      toggleFilter(shape, setSelectedShapes)
                    }
                    count={
                      sideTableProducts.filter(
                        (product) => product.shape === shape
                      ).length
                    }
                  />
                )
              )}
            </div>

            {/* SIZE FILTER */}
            <div className="mb-7">
              <FilterHeading>Size</FilterHeading>

              {["Compact", "Medium"].map((size) => (
                <FilterCheckbox
                  key={size}
                  label={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleFilter(size, setSelectedSizes)}
                  count={
                    sideTableProducts.filter(
                      (product) => product.size === size
                    ).length
                  }
                />
              ))}
            </div>

            {/* PRICE FILTER */}
            <div>
              <FilterHeading>Price Range</FilterHeading>

              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(9990)} – {formatPrice(19990)}
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
                className="mb-3 w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none focus:border-[#493326] focus:ring-1 focus:ring-[#D8C6A8]"
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
                className="w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none focus:border-[#493326] focus:ring-1 focus:ring-[#D8C6A8]"
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
                  Our Side Table Collection
                </h2>

                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover thoughtfully designed side tables for your living space.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">
                    {filteredProducts.length}
                  </span>{" "}
                  of {sideTableProducts.length} side tables
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-side-tables"
                    className="text-[11px] text-[#756B62]"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort-side-tables"
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

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product, index) => {
                  const variantName =
                    selectedVariants[product.id] ||
                    product.variants[0].name;

                  const currentVariant =
                    product.variants.find(
                      (variant) => variant.name === variantName
                    ) || product.variants[0];

                  const wishlistId = `${product.id}-${currentVariant.name}`;
                  const productIsWishlisted = checkWishlisted(wishlistId);

                  return (
                    <SideTableCard
                      key={product.id}
                      product={product}
                      selectedVariant={variantName}
                      onVariantChange={handleVariantChange}
                      onAddToCart={handleAddToCart}
                      onWishlist={handleWishlist}
                      isWishlisted={productIsWishlisted}
                      onViewProduct={(item) => {
                        setActiveProduct(item);
                        setActiveTab("description");
                      }}
                      animationIndex={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-[#493326]">
                  No side tables found
                </p>

                <p className="mt-2 text-xs text-[#756B62]">
                  Try changing your filters or price range.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-[#493326] px-5 py-2.5 text-xs text-white transition-colors hover:bg-[#29231F]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CART MESSAGE */}
      {cartMessage && (
        <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-3 rounded-sm bg-[#493326] px-5 py-4 text-white shadow-xl">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            ✓
          </span>

          <span className="text-xs font-medium">{cartMessage}</span>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {activeProduct && activeVariant && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProduct.name} details`}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-sm bg-[#FAF8F4] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close details"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#493326] shadow transition-colors hover:bg-[#F0E7DE]"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* MODAL IMAGE */}
              <div className="flex min-h-[300px] items-center justify-center bg-[#F1F2EC] p-6 md:min-h-[560px]">
                <img
                  key={activeVariant.image}
                  src={activeVariant.image}
                  alt={`${activeProduct.name} - ${activeVariant.name}`}
                  className="h-full max-h-[500px] w-full object-contain"
                />
              </div>

              {/* MODAL CONTENT */}
              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN SIDE TABLE COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>

                <p className="mt-2 text-xs text-[#756B62]">
                  {activeProduct.size} · {activeProduct.shape}
                </p>

                <p className="mt-4 text-xl font-semibold text-[#493326]">
                  {formatPrice(activeProduct.price)}
                </p>

                {/* HORIZONTAL DETAIL TABS */}
                <div className="mt-7 flex border-b border-[#DDD5CC]">
                  {[
                    { id: "description", label: "Description" },
                    { id: "details", label: "Product Details" },
                    { id: "information", label: "More Information" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 whitespace-nowrap px-2 py-3 text-[10px] font-semibold transition-colors sm:px-3 sm:text-[11px] ${
                        activeTab === tab.id
                          ? "text-[#493326]"
                          : "text-[#93877C] hover:text-[#493326]"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#A88955]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* DESCRIPTION TAB */}
                {activeTab === "description" && (
                  <div className="min-h-[230px] py-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Product Description
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#756B62]">
                      {activeProduct.description}
                    </p>

                    <p className="mt-4 text-xs leading-6 text-[#756B62]">
                      Thoughtfully designed to complement your living space,
                      this side table combines practical functionality with
                      a refined furniture finish.
                    </p>
                  </div>
                )}

                {/* PRODUCT DETAILS TAB */}
                {activeTab === "details" && (
                  <div className="min-h-[230px] py-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Product Features
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {activeProduct.productDetails.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-[12px] leading-5 text-[#65594F]"
                        >
                          <span className="mt-0.5 text-[#A88955]">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MORE INFORMATION TAB */}
                {activeTab === "information" && (
                  <div className="min-h-[230px] py-5">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Additional Information
                    </h3>

                    <div className="overflow-hidden rounded-sm border border-[#DDD5CC] bg-white">
                      {activeProduct.moreInformation.map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-[42%_58%] border-b border-[#E8E1D8] last:border-b-0"
                        >
                          <div className="bg-[#F7F3ED] px-3 py-3 text-[10px] font-semibold text-[#493326]">
                            {label}
                          </div>

                          <div className="px-3 py-3 text-[10px] leading-5 text-[#756B62]">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FINISH SELECTION */}
                <div className="mt-3 border-t border-[#E4DCD2] pt-5">
                  <p className="text-xs font-semibold text-[#493326]">
                    Select Finish:{" "}
                    <span className="font-normal text-[#756B62]">
                      {activeVariant.name}
                    </span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {activeProduct.variants.map((variant) => (
                      <button
                        key={variant.name}
                        type="button"
                        title={variant.name}
                        aria-label={`Select ${variant.name}`}
                        aria-pressed={activeVariant.name === variant.name}
                        onClick={() =>
                          handleVariantChange(
                            activeProduct.id,
                            variant.name
                          )
                        }
                        className={`h-8 w-8 rounded-full border border-black/10 transition-all ${
                          activeVariant.name === variant.name
                            ? "ring-2 ring-[#493326] ring-offset-2"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-7 grid grid-cols-[1fr_48px] gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(activeProduct, activeVariant);
                      closeModal();
                    }}
                    className="rounded-sm bg-black px-5 py-3 text-xs font-semibold text-white"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleWishlist(activeProduct, activeVariant)
                    }
                    aria-label={
                      activeProductWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`flex items-center justify-center rounded-sm border transition-all ${
                      activeProductWishlisted
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-[#CFC3B7] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
                    }`}
                  >
                    <span className="text-2xl">
                      {activeProductWishlisted ? "♥" : "♡"}
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
