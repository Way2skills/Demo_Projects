"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const dressingProducts = [
  {
    id: "dressing-01",
    name: "Modern Minimalist Dressing Table",
    description:
      "A minimalist dressing table with a clean design, practical drawers and an elegant mirror.",
    price: 14999,
    type: "Minimalist",
    size: "Compact",
    material: "Engineered Wood with Laminated Finish",
    variants: [
      {
        name: "Natural Oak",
        image: "/images/furniture/bedroom/dressing-tables/dressing-01/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        image: "/images/furniture/bedroom/dressing-tables/dressing-01/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Modern Minimalist Design",
      "Elegant Dressing Mirror",
      "Spacious Storage Drawer",
      "Engineered Wood Construction",
      "Premium Laminated Finish",
      "Compact Bedroom Furniture",
      "Smooth Drawer Mechanism",
      "Practical Everyday Storage",
    ],
    moreInformation: [
      ["Available Quantity", "25"],
      ["SKU", "NLDT-MM-001"],
      ["Weight", "28 kg"],
      ["Dimensions", "36 x 16 x 58 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Engineered Wood with Laminated Finish"],
    ],
  },
  {
    id: "dressing-02",
    name: "Modern Round Mirror Dressing Table",
    description:
      "A contemporary dressing table featuring a stylish round mirror and convenient storage.",
    price: 16499,
    type: "Round Mirror",
    size: "Medium",
    material: "Engineered Wood with Wood Grain Finish",
    variants: [
      {
        name: "Natural Oak",
        image: "/images/furniture/bedroom/dressing-tables/dressing-02/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        image: "/images/furniture/bedroom/dressing-tables/dressing-02/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Stylish Round Mirror Design",
      "Contemporary Dressing Table",
      "Convenient Storage Drawers",
      "Engineered Wood Construction",
      "Premium Wood Grain Finish",
      "Functional Tabletop Space",
      "Smooth Drawer Mechanism",
      "Elegant Bedroom Styling",
    ],
    moreInformation: [
      ["Available Quantity", "20"],
      ["SKU", "NLDT-RM-002"],
      ["Weight", "30 kg"],
      ["Dimensions", "38 x 16 x 56 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Professional on-site assembly"],
      ["Material", "Engineered Wood with Wood Grain Finish"],
    ],
  },
  {
    id: "dressing-03",
    name: "Modern Floating Dressing Table",
    description:
      "A space-saving wall-mounted dressing table designed for modern and compact bedrooms.",
    price: 18999,
    type: "Floating",
    size: "Compact",
    material: "Engineered Wood with Laminated Finish",
    variants: [
      {
        name: "Natural Oak",
        image: "/images/furniture/bedroom/dressing-tables/dressing-03/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        image: "/images/furniture/bedroom/dressing-tables/dressing-03/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Modern Wall-Mounted Design",
      "Space-Saving Construction",
      "Functional Storage Drawer",
      "Engineered Wood Construction",
      "Premium Laminated Finish",
      "Minimalist Appearance",
      "Easy-to-Maintain Surface",
      "Ideal for Compact Bedrooms",
    ],
    moreInformation: [
      ["Available Quantity", "18"],
      ["SKU", "NLDT-FL-003"],
      ["Weight", "22 kg"],
      ["Dimensions", "32 x 15 x 48 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Wall mounting and installation provided"],
      ["Material", "Engineered Wood with Laminated Finish"],
    ],
  },
  {
    id: "dressing-04",
    name: "Premium Vanity Dressing Table",
    description:
      "A premium vanity dressing table with generous storage and a sophisticated bedroom look.",
    price: 21999,
    type: "Vanity",
    size: "Large",
    material: "Engineered Wood with Premium Finish",
    variants: [
      {
        name: "Natural Oak",
        image: "/images/furniture/bedroom/dressing-tables/dressing-04/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        image: "/images/furniture/bedroom/dressing-tables/dressing-04/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Premium Vanity Design",
      "Elegant Dressing Mirror",
      "Multiple Storage Drawers",
      "Engineered Wood Construction",
      "Premium Surface Finish",
      "Spacious Tabletop",
      "Functional Storage Compartments",
      "Sophisticated Bedroom Furniture",
    ],
    moreInformation: [
      ["Available Quantity", "15"],
      ["SKU", "NLDT-PV-004"],
      ["Weight", "35 kg"],
      ["Dimensions", "42 x 18 x 60 Inches"],
      ["Warranty", "18 Months Service Warranty"],
      ["Assembly Details", "Professional installation provided"],
      ["Material", "Engineered Wood with Premium Finish"],
    ],
  },
  {
    id: "dressing-05",
    name: "Fluted Dressing Table with Oval Mirror",
    description:
      "A luxury dressing table featuring decorative fluted detailing and an elegant oval mirror.",
    price: 23999,
    type: "Fluted Design",
    size: "Large",
    material: "Engineered Wood with Decorative Fluted Panels",
    variants: [
      {
        name: "Natural Oak",
        image: "/images/furniture/bedroom/dressing-tables/dressing-05/natural-oak.jpeg",
        hex: "#C89F6B",
      },
      {
        name: "Walnut Brown",
        image: "/images/furniture/bedroom/dressing-tables/dressing-05/walnut.jpeg",
        hex: "#6B4226",
      },
    ],
    productDetails: [
      "Elegant Oval Mirror",
      "Decorative Vertical Fluted Panels",
      "Premium Dressing Table Design",
      "Engineered Wood Construction",
      "Multiple Storage Compartments",
      "Premium Decorative Finish",
      "Functional Tabletop Space",
      "Luxury Bedroom Styling",
    ],
    moreInformation: [
      ["Available Quantity", "9"],
      ["SKU", "NLDT-FO-005"],
      ["Weight", "38 kg"],
      ["Dimensions", "40 x 18 x 58 Inches"],
      ["Warranty", "24 Months Service Warranty"],
      ["Assembly Details", "Installation and mirror fitting provided"],
      ["Material", "Engineered Wood with Decorative Fluted Panels"],
    ],
  },
];

const colourGroups = [
  { name: "Natural Oak", hex: "#C89F6B", variants: ["Natural Oak"] },
  { name: "Walnut Brown", hex: "#6B4226", variants: ["Walnut Brown"] },
];

const dressingTypes = [
  "Minimalist",
  "Round Mirror",
  "Floating",
  "Vanity",
  "Fluted Design",
];

const sizes = ["Compact", "Medium", "Large"];

const materials = [
  ...new Set(dressingProducts.map((product) => product.material)),
];

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
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
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

function DressingTableCard({
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
    <article
      className="group min-w-0"
      style={{
        transitionDelay: `${animationIndex * 80}ms`,
      }}
    >
      <div
        ref={imageRef}
        className="relative aspect-[4/3] overflow-hidden bg-[#F3F1EC]"
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
            className={`h-full w-full object-cover transition-all duration-700 ease-out ${
              imageVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-5 scale-[0.96] opacity-0"
            } group-hover:scale-105`}
          />
        </button>

        <span className="absolute left-3 top-3 z-10 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#493326]">
          {product.type}
        </span>

        <span className="absolute bottom-3 right-3 z-10 bg-white/90 px-3 py-1.5 text-[10px] text-[#493326]">
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

        <p className="mt-1 text-[10px] text-[#756B62]">
          {product.size}
          <span className="px-1 text-[#B8AA9B]">|</span>
          {product.type}
        </p>

        <p className="mt-2 text-[13px] font-semibold text-[#493326]">
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

        <div className="mt-4 grid grid-cols-[1fr_42px] gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(product, activeVariant)}
            className="rounded-sm bg-black px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-none hover:bg-black active:bg-black"
          >
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => onWishlist(product, activeVariant)}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            className={`flex items-center justify-center rounded-sm border transition-all duration-300 ${
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
          onClick={() => onViewProduct(product)}
          className="mt-2 w-full border border-[#493326] bg-white px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-all duration-300 hover:bg-[#493326] hover:text-white"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

export default function DressingTablesPage() {
  const { addToCart, openCart } = useCart();
  const {
    toggleWishlist,
    isWishlisted: checkWishlisted,
  } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      dressingProducts.map((product) => [
        product.id,
        product.variants[0].name,
      ])
    )
  );

  const [selectedColour, setSelectedColour] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const [activeProduct, setActiveProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

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

      dressingProducts.forEach((product) => {
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

    let result = dressingProducts.filter((product) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);

      const sizeMatch =
        selectedSizes.length === 0 || selectedSizes.includes(product.size);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      const minMatch =
        minPrice === "" || product.price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        typeMatch &&
        sizeMatch &&
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
    selectedTypes,
    selectedSizes,
    selectedMaterials,
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
      variant: variant.name,
      quantity: 1,
    };

    addToCart(cartItem);
    openCart();
  };

  const handleWishlist = (product, variant) => {
    const wishlistItem = {
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      category: "Dressing Tables",
      href: "/furniture/bedroom/dressing-tables",
    };

    toggleWishlist(wishlistItem);
  };

  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) => variant.name === selectedVariants[activeProduct.id]
      ) || activeProduct.variants[0]
    : null;

  const closeProductModal = () => {
    setActiveProduct(null);
    setActiveTab("description");
  };

  const clearFilters = () => {
    setSelectedColour("");
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");

    setSelectedVariants(
      Object.fromEntries(
        dressingProducts.map((product) => [
          product.id,
          product.variants[0].name,
        ])
      )
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">
          {/* LEFT FILTER SIDEBAR */}
          <aside className="h-fit max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain rounded-sm border border-[#E8E1D8] bg-[#FAF9F6] p-5 lg:sticky lg:top-24">
            <Link
              href="/furniture#bedroom"
              className="group mb-5 inline-flex items-center gap-2 rounded-sm border border-[#DCD3C9] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-all duration-300 hover:border-[#493326] hover:bg-[#493326] hover:text-white"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Bedroom
            </Link>

            <div className="mb-5 border-b border-[#E8E1D8] pb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
                NEOLEN FURNITURE
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#29231F]">
                Dressing Tables
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
                className="text-[10px] font-medium text-[#8B6A4E] underline underline-offset-4 transition-colors hover:text-[#493326]"
              >
                Clear all
              </button>
            </div>

            {/* COLOUR FILTER */}
            <div className="mb-7">
              <FilterHeading>Colour</FilterHeading>

              <div className="grid grid-cols-2 gap-x-2 gap-y-4">
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

            {/* DESIGN TYPE FILTER */}
            <div className="mb-7">
              <FilterHeading>Design Type</FilterHeading>

              {dressingTypes.map((type) => (
                <FilterCheckbox
                  key={type}
                  label={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(type, setSelectedTypes)}
                  count={
                    dressingProducts.filter(
                      (product) => product.type === type
                    ).length
                  }
                />
              ))}
            </div>

            {/* SIZE FILTER */}
            <div className="mb-7">
              <FilterHeading>Size</FilterHeading>

              {sizes.map((size) => (
                <FilterCheckbox
                  key={size}
                  label={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleFilter(size, setSelectedSizes)}
                  count={
                    dressingProducts.filter(
                      (product) => product.size === size
                    ).length
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
                  onChange={() =>
                    toggleFilter(material, setSelectedMaterials)
                  }
                />
              ))}
            </div>

            {/* PRICE FILTER */}
            <div>
              <FilterHeading>Price Range</FilterHeading>

              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(14999)} – {formatPrice(23999)}
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
                  Dressing Tables
                </h2>

                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover elegant dressing tables for your bedroom.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">
                    {filteredProducts.length}
                  </span>{" "}
                  of {dressingProducts.length} dressing tables
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-dressing-tables"
                    className="text-[11px] text-[#756B62]"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort-dressing-tables"
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
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product, index) => {
                  const variantName =
                    selectedVariants[product.id] ||
                    product.variants[0].name;

                  const currentVariant =
                    product.variants.find(
                      (variant) => variant.name === variantName
                    ) || product.variants[0];

                  const wishlistId = `${product.id}-${currentVariant.name}`;

                  return (
                    <DressingTableCard
                      key={product.id}
                      product={product}
                      selectedVariant={variantName}
                      onVariantChange={handleVariantChange}
                      onAddToCart={handleAddToCart}
                      onWishlist={handleWishlist}
                      isWishlisted={checkWishlisted(wishlistId)}
                      onViewProduct={(selectedProduct) => {
                        setActiveProduct(selectedProduct);
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
                  No dressing tables found
                </p>

                <p className="mt-2 text-xs text-[#756B62]">
                  Try changing your filters or price range.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-[#493326] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2F2119]"
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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-sm bg-[#FAF8F4] shadow-2xl"
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
              <div className="flex min-h-[320px] items-center justify-center bg-[#F1F0EB] p-6 sm:p-9">
                <img
                  key={activeVariant.image}
                  src={activeVariant.image}
                  alt={`${activeProduct.name} - ${activeVariant.name}`}
                  className="h-full max-h-[520px] w-full object-contain"
                />
              </div>

              {/* MODAL CONTENT */}
              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN DRESSING TABLE COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>

                <p className="mt-4 text-xl font-semibold text-[#493326]">
                  {formatPrice(activeProduct.price)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-[10px] text-[#756B62]">
                  <span className="border border-[#DDD5CC] bg-white px-3 py-2">
                    {activeProduct.type}
                  </span>
                  <span className="border border-[#DDD5CC] bg-white px-3 py-2">
                    {activeProduct.size}
                  </span>
                  <span className="border border-[#DDD5CC] bg-white px-3 py-2">
                    {activeProduct.material}
                  </span>
                </div>

                {/* COLOUR SELECTION */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-[#493326]">
                    Select Colour: {activeVariant.name}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {activeProduct.variants.map((variant) => (
                      <button
                        key={variant.name}
                        type="button"
                        title={variant.name}
                        aria-label={`Select ${variant.name}`}
                        aria-pressed={activeVariant.name === variant.name}
                        onClick={() =>
                          handleVariantChange(activeProduct.id, variant.name)
                        }
                        className="flex items-center gap-2"
                      >
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border border-black/10 transition-all ${
                            activeVariant.name === variant.name
                              ? "ring-2 ring-[#493326] ring-offset-2"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: variant.hex }}
                        />

                        <span className="text-[10px] text-[#756B62]">
                          {variant.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DETAIL TABS */}
                <div className="mt-7 border-b border-[#DDD5CC]">
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {[
                      { id: "description", label: "Description" },
                      { id: "details", label: "Product Details" },
                      { id: "information", label: "More Information" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative pb-3 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                          activeTab === tab.id
                            ? "text-[#493326]"
                            : "text-[#9A8E82] hover:text-[#493326]"
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

                {/* DESCRIPTION TAB */}
                {activeTab === "description" && (
                  <div className="min-h-[190px] py-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Product Description
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#756B62]">
                      {activeProduct.description}
                    </p>

                    <p className="mt-4 text-xs leading-6 text-[#756B62]">
                      Designed to complement modern bedrooms, this dressing
                      table combines practical everyday functionality with
                      an elegant furniture finish.
                    </p>
                  </div>
                )}

                {/* PRODUCT DETAILS TAB */}
                {activeTab === "details" && (
                  <div className="min-h-[190px] py-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Product Features
                    </h3>

                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeProduct.productDetails.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-[11px] leading-5 text-[#65594F]"
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
                  <div className="min-h-[190px] py-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                      Additional Information
                    </h3>

                    <div className="mt-4 overflow-hidden rounded-sm border border-[#DDD5CC] bg-white">
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
                  </div>
                )}

                {/* MODAL ACTIONS */}
                <div className="mt-5 grid grid-cols-[1fr_48px] gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(activeProduct, activeVariant);
                      closeProductModal();
                    }}
                    className="rounded-sm bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-none hover:bg-black active:bg-black"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleWishlist(activeProduct, activeVariant)
                    }
                    aria-label={
                      checkWishlisted(
                        `${activeProduct.id}-${activeVariant.name}`
                      )
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`flex items-center justify-center rounded-sm border transition-all duration-300 ${
                      checkWishlisted(
                        `${activeProduct.id}-${activeVariant.name}`
                      )
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-[#D8CEC3] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
                    }`}
                  >
                    <span className="text-2xl">
                      {checkWishlisted(
                        `${activeProduct.id}-${activeVariant.name}`
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