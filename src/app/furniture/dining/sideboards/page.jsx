"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const sideboardProducts = [
  {
    id: "sideboard-1",
    name: "Modern Wooden Sideboard",
    description:
      "A timeless three-door wooden sideboard designed to keep your dining space organised and elegant.",
    shape:
      "A timeless three-door silhouette with a clean wooden finish and practical storage design.",
    price: 29999,
    type: "Wooden",
    size: "3-Door",
    material: "Engineered Wood with Laminated Finish",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/dining/sideboards/sideboard-1/natural-oak.jpeg", color: "#C89F6B" },
      { name: "Walnut Brown", image: "/images/furniture/dining/sideboards/sideboard-1/walnut.jpeg", color: "#6B4226" },
      { name: "Matte Black", image: "/images/furniture/dining/sideboards/sideboard-1/black.jpeg", color: "#242424" },
      { name: "White Oak", image: "/images/furniture/dining/sideboards/sideboard-1/white.jpeg", color: "#F4F2ED" },
    ],
    productDetails: [
      "Modern Three-Door Sideboard Design",
      "Spacious Internal Storage",
      "Engineered Wood Construction",
      "Premium Laminated Finish",
      "Multiple Storage Compartments",
      "Smooth Door Opening",
      "Practical Dining Storage Solution",
      "Contemporary Furniture Design",
    ],
    moreInformation: [
      ["Available Quantity", "20 Units"],
      ["SKU", "NLSB-WD-001"],
      ["Weight", "72.50 kg"],
      ["Dimensions", "60 x 18 x 30 Inches | 152 x 46 x 76 Cms"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Engineered Wood with Laminated Finish"],
    ],
  },
  {
    id: "sideboard-2",
    name: "Modern Fluted Sideboard",
    description:
      "A stylish fluted sideboard featuring textured vertical door details and a premium modern finish.",
    shape:
      "A contemporary three-door design featuring elegant vertical fluted detailing.",
    price: 34999,
    type: "Fluted",
    size: "3-Door",
    material: "Engineered Wood with Decorative Fluted Panels",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/dining/sideboards/sideboard-2/natural-oak.jpeg", color: "#C89F6B" },
      { name: "Walnut Brown", image: "/images/furniture/dining/sideboards/sideboard-2/walnut.jpeg", color: "#6B4226" },
      { name: "Matte Black", image: "/images/furniture/dining/sideboards/sideboard-2/black.jpeg", color: "#242424" },
      { name: "White Oak", image: "/images/furniture/dining/sideboards/sideboard-2/white.jpeg", color: "#F4F2ED" },
    ],
    productDetails: [
      "Elegant Vertical Fluted Door Design",
      "Modern Three-Door Configuration",
      "Spacious Internal Storage",
      "Engineered Wood Construction",
      "Decorative Fluted Panels",
      "Premium Contemporary Finish",
      "Multiple Storage Compartments",
      "Stylish Dining Room Furniture",
    ],
    moreInformation: [
      ["Available Quantity", "16 Units"],
      ["SKU", "NLSB-FL-002"],
      ["Weight", "78.20 kg"],
      ["Dimensions", "62 x 18 x 30 Inches | 157 x 46 x 76 Cms"],
      ["Warranty", "18 Months Service Warranty"],
      ["Assembly Details", "Professional on-site assembly"],
      ["Material", "Engineered Wood with Decorative Fluted Panels"],
    ],
  },
  {
    id: "sideboard-3",
    name: "Modern Glass Door Sideboard",
    description:
      "A contemporary storage cabinet combining glass display doors with practical wooden storage.",
    shape:
      "A refined four-door design combining elegant glass display panels and practical storage.",
    price: 39999,
    type: "Glass Door",
    size: "4-Door",
    material: "Engineered Wood with Glass Panels",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/dining/sideboards/sideboard-3/natural-oak.jpeg", color: "#C89F6B" },
      { name: "Walnut Brown", image: "/images/furniture/dining/sideboards/sideboards/sideboard-3/walnut.jpeg", color: "#6B4226" },
      { name: "Matte Black", image: "/images/furniture/dining/sideboards/sideboard-3/black.jpeg", color: "#242424" },
      { name: "White Oak", image: "/images/furniture/dining/sideboards/sideboard-3/white.jpeg", color: "#F4F2ED" },
    ],
    productDetails: [
      "Contemporary Four-Door Design",
      "Elegant Glass Display Panels",
      "Spacious Internal Storage",
      "Engineered Wood Construction",
      "Premium Glass Door Finish",
      "Display and Storage Combination",
      "Functional Internal Compartments",
      "Modern Dining Room Design",
    ],
    moreInformation: [
      ["Available Quantity", "12 Units"],
      ["SKU", "NLSB-GD-003"],
      ["Weight", "86.40 kg"],
      ["Dimensions", "70 x 18 x 30 Inches | 178 x 46 x 76 Cms"],
      ["Warranty", "18 Months Service Warranty"],
      ["Assembly Details", "Glass panel fitting and installation included"],
      ["Material", "Engineered Wood with Glass Panels"],
    ],
  },
  {
    id: "sideboard-4",
    name: "Modern Floating Sideboard",
    description:
      "A clean wall-mounted sideboard with handleless doors, perfect for modern dining interiors.",
    shape:
      "A minimalist wall-mounted silhouette with clean handleless doors and a space-saving profile.",
    price: 42999,
    type: "Floating",
    size: "4-Door",
    material: "Engineered Wood with Matte Finish",
    variants: [
      { name: "Natural Oak", image: "/images/furniture/dining/sideboards/sideboard-4/natural-oak.jpeg", color: "#C89F6B" },
      { name: "Walnut Brown", image: "/images/furniture/dining/sideboards/sideboard-4/walnut.jpeg", color: "#6B4226" },
      { name: "Matte Black", image: "/images/furniture/dining/sideboards/sideboard-4/black.jpeg", color: "#242424" },
      { name: "White Oak", image: "/images/furniture/dining/sideboards/sideboard-4/white.jpeg", color: "#F4F2ED" },
    ],
    productDetails: [
      "Modern Wall-Mounted Design",
      "Clean Handleless Door Profile",
      "Spacious Internal Storage",
      "Engineered Wood Construction",
      "Premium Matte Finish",
      "Space-Saving Furniture Design",
      "Multiple Storage Compartments",
      "Contemporary Dining Interior Solution",
    ],
    moreInformation: [
      ["Available Quantity", "10 Units"],
      ["SKU", "NLSB-FL-004"],
      ["Weight", "81.60 kg"],
      ["Dimensions", "72 x 18 x 28 Inches | 183 x 46 x 71 Cms"],
      ["Warranty", "24 Months Service Warranty"],
      ["Assembly Details", "Wall mounting and installation provided"],
      ["Material", "Engineered Wood with Matte Finish"],
    ],
  },
];

const colourGroups = [
  { name: "Natural Oak", color: "#C89F6B", variants: ["Natural Oak"] },
  { name: "Walnut", color: "#6B4226", variants: ["Walnut Brown"] },
  { name: "White", color: "#F4F2ED", variants: ["White Oak"] },
  { name: "Black", color: "#242424", variants: ["Matte Black"] },
];

const sideboardTypes = ["Wooden", "Fluted", "Glass Door", "Floating"];
const sizes = ["3-Door", "4-Door"];

const materials = [
  ...new Set(sideboardProducts.map((product) => product.material)),
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
          className="h-3.5 w-3.5 accent-[#713A1B]"
        />
        {label}
      </span>

      {count !== undefined && (
        <span className="text-[10px] text-[#A69A8E]">{count}</span>
      )}
    </label>
  );
}

/* SIDEBOARD PRODUCT CARD */
function SideboardCard({
  product,
  selectedVariant,
  onVariantChange,
  onAddToCart,
  onWishlist,
  productIsWishlisted,
  onViewProduct,
  animationIndex,
}) {
  const [imageRef, imageVisible] = useScrollReveal();

  const activeVariant =
    product.variants.find((variant) => variant.name === selectedVariant) ||
    product.variants[0];

  return (
    <article
      className="group flex h-full min-w-0 flex-col animate-[fadeUp_0.7s_ease_both]"
      style={{ animationDelay: `${animationIndex * 100}ms` }}
    >
      <div
        ref={imageRef}
        className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-sm bg-[#F1F0EB]"
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
          {product.type}
        </span>

        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] text-[#493326]">
          {activeVariant.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-2.5">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="min-h-[36px] text-left text-[13px] font-semibold leading-5 text-[#29231F] transition-colors hover:text-[#713A1B]"
        >
          {product.name}
        </button>

        <p className="mt-1 min-h-[30px] text-[11px] leading-5 text-[#756B62]">
          {product.material}
          <span className="px-1 text-[#B8AA9B]">|</span>
          {product.type}
        </p>

        <p className="mt-1.5 min-h-[20px] text-[13px] font-semibold text-[#29231F]">
          {formatPrice(product.price)}
        </p>

        {/* COLOUR SWATCHES */}
        <div className="mt-2 flex min-h-[32px] flex-wrap content-start items-center gap-2.5">
          {product.variants.map((variant) => (
            <button
              key={variant.name}
              type="button"
              title={variant.name}
              aria-label={`Select ${variant.name}`}
              aria-pressed={activeVariant.name === variant.name}
              onClick={() => onVariantChange(product.id, variant.name)}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                activeVariant.name === variant.name
                  ? "ring-2 ring-[#713A1B] ring-offset-2"
                  : "hover:scale-110"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: variant.color }}
              />
            </button>
          ))}
        </div>

        <p className="mt-0.5 min-h-[15px] text-[10px] text-[#918579]">
          Selected: {activeVariant.name}
        </p>

        {/* CART + WISHLIST + VIEW PRODUCT */}
        <div className="mt-auto pt-2">
          <div className="grid grid-cols-[1fr_42px] gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(product, activeVariant)}
              className="min-h-[40px] rounded-sm bg-black px-3 py-2 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#29231F] active:scale-95"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => onWishlist(product, activeVariant)}
              aria-label={
                productIsWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              aria-pressed={productIsWishlisted}
              className={`flex min-h-[40px] items-center justify-center rounded-sm border transition-all duration-300 ${
                productIsWishlisted
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-[#CFC3B7] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
              }`}
            >
              <span className="text-xl">
                {productIsWishlisted ? "♥" : "♡"}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onViewProduct(product)}
            className="mt-1.5 min-h-[40px] w-full rounded-sm border border-[#713A1B] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#713A1B] transition-colors duration-300 hover:bg-[#713A1B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D8C6A8]"
          >
            View Product
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SideboardsPage() {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      sideboardProducts.map((product) => [
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
  const [cartMessage, setCartMessage] = useState("");
  const [activeDetailTab, setActiveDetailTab] = useState("description");

  const cartTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (cartTimerRef.current) {
        window.clearTimeout(cartTimerRef.current);
      }
    };
  }, []);

  const priceRangeInvalid =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  /* GLOBAL COLOUR SELECTION */
  const handleGlobalColour = (colour) => {
    const nextColour = selectedColour === colour ? "" : colour;
    setSelectedColour(nextColour);

    if (!nextColour) return;

    const group = colourGroups.find((item) => item.name === nextColour);
    if (!group) return;

    setSelectedVariants((previous) => {
      const updated = { ...previous };

      sideboardProducts.forEach((product) => {
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

  /* INDIVIDUAL VARIANT SELECTION */
  const handleVariantChange = (productId, variantName) => {
    setSelectedVariants((previous) => ({
      ...previous,
      [productId]: variantName,
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

  /* FILTER AND SORT */
  const filteredProducts = useMemo(() => {
    if (priceRangeInvalid) return [];

    let result = sideboardProducts.filter((product) => {
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

    if (sortBy === "name-az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
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

  /* GLOBAL CART */
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

    setCartMessage(`${product.name} added to cart`);

    if (cartTimerRef.current) {
      window.clearTimeout(cartTimerRef.current);
    }

    cartTimerRef.current = window.setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  /* GLOBAL WISHLIST */
  const handleWishlist = (product, variant) => {
    const wishlistItem = {
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      category: "Sideboards",
      href: "/furniture/dining/sideboards",
    };

    toggleWishlist(wishlistItem);
  };

  /* ACTIVE VARIANT */
  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) =>
          variant.name === selectedVariants[activeProduct.id]
      ) || activeProduct.variants[0]
    : null;

  const openProduct = (product) => {
    setActiveProduct(product);
    setActiveDetailTab("description");
  };

  const closeProduct = () => {
    setActiveProduct(null);
    setActiveDetailTab("description");
  };

  /* CLEAR FILTERS */
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
        sideboardProducts.map((product) => [
          product.id,
          product.variants[0].name,
        ])
      )
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F6F3EE] text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-3 sm:px-8 sm:pt-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="h-fit max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain rounded-sm border border-[#E8E1D8] bg-[#FAF9F6] p-5 lg:sticky lg:top-24">
            <Link
              href="/furniture#dining"
              className="group mb-5 inline-flex items-center gap-2 rounded-sm border border-[#DCD3C9] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#713A1B] transition-all duration-300 hover:border-[#713A1B] hover:bg-[#713A1B] hover:text-white"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Dining
            </Link>

            <div className="mb-5 border-b border-[#E8E1D8] pb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
                NEOLEN FURNITURE
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#29231F]">
                Sideboards
              </h1>

              <span className="mt-3 block h-[2px] w-10 bg-[#A88955]" />
            </div>

            <div className="mb-5 flex items-center justify-between border-b border-[#E8E1D8] pb-4">
              <h2 className="text-sm font-semibold text-[#493326]">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-medium text-[#8B6A4E] underline underline-offset-4 transition-colors hover:text-[#713A1B]"
              >
                Clear all
              </button>
            </div>

            {/* COLOUR FILTER */}
            <div className="mb-7">
              <FilterHeading>Colour / Finish</FilterHeading>

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
                          ? "scale-110 ring-2 ring-[#713A1B] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: colour.color }}
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

            {/* SIDEBOARD TYPE */}
            <div className="mb-7">
              <FilterHeading>Sideboard Type</FilterHeading>

              {sideboardTypes.map((type) => (
                <FilterCheckbox
                  key={type}
                  label={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(type, setSelectedTypes)}
                  count={
                    sideboardProducts.filter(
                      (product) => product.type === type
                    ).length
                  }
                />
              ))}
            </div>

            {/* SIZE */}
            <div className="mb-7">
              <FilterHeading>Size</FilterHeading>

              {sizes.map((size) => (
                <FilterCheckbox
                  key={size}
                  label={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleFilter(size, setSelectedSizes)}
                  count={
                    sideboardProducts.filter(
                      (product) => product.size === size
                    ).length
                  }
                />
              ))}
            </div>

            {/* MATERIAL */}
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
                  count={
                    sideboardProducts.filter(
                      (product) => product.material === material
                    ).length
                  }
                />
              ))}
            </div>

            {/* PRICE RANGE */}
            <div>
              <FilterHeading>Price Range</FilterHeading>

              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(29999)} – {formatPrice(42999)}
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
                className="mb-3 w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none transition-colors focus:border-[#713A1B] focus:ring-1 focus:ring-[#D8C6A8]"
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
                className="w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none transition-colors focus:border-[#713A1B] focus:ring-1 focus:ring-[#D8C6A8]"
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
            <div className="mb-4 flex flex-col justify-between gap-3 border-b border-[#E8E1D8] pb-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  EXPLORE OUR COLLECTION
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#29231F]">
                  Our Sideboard Collection
                </h2>

                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover elegant storage solutions for your dining space.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">
                    {filteredProducts.length}
                  </span>{" "}
                  of {sideboardProducts.length} sideboards
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-sideboards"
                    className="text-[11px] text-[#756B62]"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort-sideboards"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="min-w-[145px] rounded-sm border border-[#DDD5CC] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#713A1B]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-az">Name: A to Z</option>
                    <option value="name-za">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product, index) => {
                  const variantName =
                    selectedVariants[product.id] ||
                    product.variants[0].name;

                  const currentVariant =
                    product.variants.find(
                      (variant) => variant.name === variantName
                    ) || product.variants[0];

                  const wishlistId =
                    `${product.id}-${currentVariant.name}`;

                  return (
                    <SideboardCard
                      key={product.id}
                      product={product}
                      selectedVariant={variantName}
                      onVariantChange={handleVariantChange}
                      onAddToCart={handleAddToCart}
                      onWishlist={handleWishlist}
                      productIsWishlisted={isWishlisted(wishlistId)}
                      onViewProduct={openProduct}
                      animationIndex={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-[#493326]">
                  No sideboards found
                </p>

                <p className="mt-2 text-xs text-[#756B62]">
                  Try changing your filters or price range.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-[#713A1B] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#49230F]"
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
        <div className="fixed bottom-5 right-5 z-[80] flex max-w-[calc(100%-40px)] items-center gap-3 rounded-sm bg-[#493326] px-5 py-4 text-white shadow-xl">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
            ✓
          </span>

          <span className="text-xs font-medium">{cartMessage}</span>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {activeProduct && activeVariant && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onClick={closeProduct}
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
              onClick={closeProduct}
              aria-label="Close details"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#493326] shadow transition-colors hover:bg-[#F0E7DE]"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* PRODUCT IMAGE */}
              <div className="flex min-h-[280px] items-center justify-center bg-[#F1F0EB] p-5 sm:p-8 md:min-h-[460px]">
                <div className="flex h-[260px] w-full max-w-[360px] items-center justify-center sm:h-[340px] md:h-[380px]">
                  <img
                    src={activeVariant.image}
                    alt={`${activeProduct.name} - ${activeVariant.name}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* PRODUCT CONTENT */}
              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN DINING COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>

                <p className="mt-4 text-xl font-semibold text-[#713A1B]">
                  {formatPrice(activeProduct.price)}
                </p>

                {/* DETAIL TABS */}
                <div className="mt-7 border-b border-[#DED5CA]">
                  <div className="flex items-center gap-5 overflow-x-auto">
                    {[
                      { id: "description", label: "Description" },
                      { id: "details", label: "Product Details" },
                      { id: "information", label: "More Information" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveDetailTab(tab.id)}
                        className={`relative shrink-0 pb-3 text-[11px] font-semibold transition-colors duration-300 ${
                          activeDetailTab === tab.id
                            ? "text-[#713A1B]"
                            : "text-[#95877A] hover:text-[#713A1B]"
                        }`}
                      >
                        {tab.label}

                        {activeDetailTab === tab.id && (
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#713A1B]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="min-h-[190px] pt-5">
                  {activeDetailTab === "description" && (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                        Product Description
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#756B62]">
                        {activeProduct.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                          Design
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#756B62]">
                          {activeProduct.shape}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeDetailTab === "details" && (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                        Product Features
                      </h3>

                      <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        {activeProduct.productDetails.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-[12px] leading-5 text-[#65594F]"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAE2D7] text-[10px] text-[#493326]">
                              ✓
                            </span>

                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeDetailTab === "information" && (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                        Additional Information
                      </h3>

                      <div className="overflow-hidden rounded-sm border border-[#DDD5CC] bg-white">
                        {activeProduct.moreInformation.map(
                          ([label, value]) => (
                            <div
                              key={label}
                              className="grid grid-cols-[42%_58%] border-b border-[#E8E1D8] last:border-b-0"
                            >
                              <div className="bg-[#F7F3ED] px-3 py-3 text-[10px] font-semibold text-[#493326] sm:px-4">
                                {label}
                              </div>

                              <div className="break-words px-3 py-3 text-[10px] leading-5 text-[#756B62] sm:px-4">
                                {value}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* COLOUR SELECTION */}
                <div className="mt-5 border-t border-[#E4DCD2] pt-5">
                  <p className="text-xs font-semibold text-[#493326]">
                    Select Colour: {activeVariant.name}
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
                          handleVariantChange(activeProduct.id, variant.name)
                        }
                        className={`h-8 w-8 rounded-full border border-black/10 transition-all ${
                          activeVariant.name === variant.name
                            ? "ring-2 ring-[#713A1B] ring-offset-2"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: variant.color }}
                      />
                    ))}
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(activeProduct, activeVariant);
                    closeProduct();
                  }}
                  className="mt-7 w-full rounded-sm bg-black px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#29231F] active:scale-[0.98]"
                >
                  Add to Cart
                </button>

                {/* WISHLIST */}
                <button
                  type="button"
                  onClick={() => handleWishlist(activeProduct, activeVariant)}
                  className={`mt-3 w-full rounded-sm border px-5 py-3 text-xs font-semibold transition-all ${
                    isWishlisted(`${activeProduct.id}-${activeVariant.name}`)
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-[#713A1B] bg-white text-[#713A1B] hover:bg-[#F4EEE7]"
                  }`}
                >
                  {isWishlisted(`${activeProduct.id}-${activeVariant.name}`)
                    ? "♥ Added to Wishlist"
                    : "♡ Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}