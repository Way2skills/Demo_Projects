"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const accentChairProducts = [
  {
    id: "accent-1",
    name: "Modern Upholstered Accent Chair",
    description:
      "A Scandinavian-inspired accent chair with a curved wooden frame and comfortable cushioned seating.",
    price: 18999,
    type: "Upholstered",
    material: "Fabric & Wood",
    variants: [
      {
        name: "Beige Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-1/beige.jpeg",
        hex: "#D8C2A8",
      },
      {
        name: "Dark Brown Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-1/brown.jpeg",
        hex: "#5A3828",
      },
    ],
    productDetails: [
      "Scandinavian-Inspired Design",
      "Comfortable Cushioned Seating",
      "Curved Wooden Frame",
      "Premium Fabric Upholstery",
      "Supportive Backrest",
      "Elegant Wooden Legs",
      "Durable Construction",
      "Suitable for Living and Reading Spaces",
    ],
    moreInformation: [
      ["Available Quantity", "18 Units"],
      ["SKU", "NLAC-001"],
      ["Weight", "16.50 kg"],
      ["Dimensions", "28 x 30 x 32 Inches | 71 x 76 x 81 Cms"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Basic leg assembly required"],
      ["Material", "Fabric & Wood"],
    ],
  },

  {
    id: "accent-2",
    name: "Modern Swivel Accent Chair",
    description:
      "A contemporary rounded swivel chair featuring a soft upholstered seat and modern swivel base.",
    price: 22999,
    type: "Swivel",
    material: "Fabric & Metal",
    variants: [
      {
        name: "Beige Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-2/beige.jpeg",
        hex: "#D8C2A8",
      },
      {
        name: "Dark Brown Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-2/brown.jpeg",
        hex: "#5A3828",
      },
    ],
    productDetails: [
      "Modern Rounded Silhouette",
      "360-Degree Swivel Base",
      "Soft Upholstered Seating",
      "Comfortable Curved Backrest",
      "Durable Metal Swivel Mechanism",
      "Premium Fabric Finish",
      "Supportive Seating Design",
      "Ideal for Modern Living Spaces",
    ],
    moreInformation: [
      ["Available Quantity", "14 Units"],
      ["SKU", "NLAC-002"],
      ["Weight", "19.80 kg"],
      ["Dimensions", "30 x 31 x 30 Inches | 76 x 79 x 76 Cms"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Swivel base assembly required"],
      ["Material", "Fabric & Metal"],
    ],
  },

  {
    id: "accent-3",
    name: "Modern Wingback Accent Chair",
    description:
      "A stylish wingback chair with a supportive high backrest, comfortable seat and elegant wooden legs.",
    price: 24999,
    type: "Wingback",
    material: "Fabric & Wood",
    variants: [
      {
        name: "Beige Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-3/beige.jpeg",
        hex: "#D8C2A8",
      },
      {
        name: "Dark Brown Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-3/brown.jpeg",
        hex: "#5A3828",
      },
    ],
    productDetails: [
      "Elegant Wingback Design",
      "High Supportive Backrest",
      "Comfortable Cushioned Seat",
      "Premium Fabric Upholstery",
      "Strong Wooden Legs",
      "Ergonomic Seating Position",
      "Durable Frame Construction",
      "Perfect for Reading and Lounge Areas",
    ],
    moreInformation: [
      ["Available Quantity", "12 Units"],
      ["SKU", "NLAC-003"],
      ["Weight", "21.40 kg"],
      ["Dimensions", "30 x 32 x 38 Inches | 76 x 81 x 97 Cms"],
      ["Warranty", "18 Months Service Warranty"],
      ["Assembly Details", "Leg assembly required"],
      ["Material", "Fabric & Wood"],
    ],
  },

  {
    id: "accent-4",
    name: "Modern Wooden Frame Accent Chair",
    description:
      "A premium wooden-frame accent chair with open armrests and separate cushioned seating.",
    price: 27999,
    type: "Wooden Frame",
    material: "Fabric & Solid Wood",
    variants: [
      {
        name: "Beige Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-4/beige.jpeg",
        hex: "#D8C2A8",
      },
      {
        name: "Dark Brown Fabric",
        image:
          "/images/furniture/seating/accent-chairs/accent-4/brown.jpeg",
        hex: "#5A3828",
      },
    ],
    productDetails: [
      "Premium Wooden Frame Design",
      "Open Armrest Construction",
      "Separate Cushioned Seating",
      "Premium Fabric Upholstery",
      "Solid Wood Frame",
      "Comfortable Back Support",
      "Durable Construction",
      "Contemporary Accent Furniture",
    ],
    moreInformation: [
      ["Available Quantity", "10 Units"],
      ["SKU", "NLAC-004"],
      ["Weight", "23.60 kg"],
      ["Dimensions", "29 x 31 x 34 Inches | 74 x 79 x 86 Cms"],
      ["Warranty", "18 Months Service Warranty"],
      ["Assembly Details", "Basic frame assembly required"],
      ["Material", "Fabric & Solid Wood"],
    ],
  },
];

const colourGroups = [
  {
    name: "Beige",
    hex: "#D8C2A8",
    variants: ["Beige Fabric"],
  },
  {
    name: "Dark Brown",
    hex: "#5A3828",
    variants: ["Dark Brown Fabric"],
  },
];

const chairTypes = [
  "Upholstered",
  "Swivel",
  "Wingback",
  "Wooden Frame",
];

const materials = [
  ...new Set(
    accentChairProducts.map(
      (product) => product.material
    )
  ),
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
      { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
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

function AccentChairCard({
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
    <article className="group flex h-full min-w-0 flex-col animate-[fadeUp_0.7s_ease_both]">
      <div
        ref={imageRef}
        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm bg-[#F1F0EB]"
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
              transitionDelay: imageVisible ? `${animationIndex * 180}ms` : "0ms",
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

      <div className="flex flex-1 flex-col pt-3">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="min-h-[38px] text-left text-[13px] font-semibold leading-5 text-[#29231F] transition-colors hover:text-[#713A1B]"
        >
          {product.name}
        </button>
        <p className="mt-1 min-h-[18px] text-[11px] text-[#756B62]">
          {product.material}
          <span className="px-1 text-[#B8AA9B]">|</span>
          {product.type}
        </p>
        <p className="mt-2 min-h-[20px] text-[13px] font-semibold text-[#29231F]">
          {formatPrice(product.price)}
        </p>

        <div className="mt-3 flex min-h-[38px] flex-wrap content-start items-center gap-2.5">
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
                style={{ backgroundColor: variant.hex }}
              />
            </button>
          ))}
        </div>
        <p className="mt-1 min-h-[16px] text-[10px] text-[#918579]">
          Selected: {activeVariant.name}
        </p>

        <div className="mt-auto pt-3">
          <div className="grid grid-cols-[1fr_42px] gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(product, activeVariant)}
              className="min-h-[42px] rounded-sm bg-black px-3 py-2.5 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#29231F] active:scale-95"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => onWishlist(product, activeVariant)}
              aria-label={productIsWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={productIsWishlisted}
              className={`flex min-h-[42px] items-center justify-center rounded-sm border transition-all duration-300 ${
                productIsWishlisted
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-[#CFC3B7] bg-white text-[#493326] hover:border-red-400 hover:text-red-500"
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${productIsWishlisted ? "scale-110" : ""}`}>
                {productIsWishlisted ? "♥" : "♡"}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => onViewProduct(product)}
            className="mt-2 min-h-[42px] w-full rounded-sm border border-[#713A1B] bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#713A1B] transition-colors duration-300 hover:bg-[#713A1B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D8C6A8]"
          >
            View Product
          </button>
        </div>
      </div>
    </article>
  );
}

export default function AccentChairsPage() {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      accentChairProducts.map((product) => [product.id, product.variants[0].name])
    )
  );
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
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
      if (cartTimerRef.current) window.clearTimeout(cartTimerRef.current);
    };
  }, []);

  const priceRangeInvalid =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);

  const handleGlobalColour = (colour) => {
    const nextColour = selectedColour === colour ? "" : colour;
    setSelectedColour(nextColour);
    if (!nextColour) return;

    const group = colourGroups.find((item) => item.name === nextColour);
    if (!group) return;

    setSelectedVariants((previous) => {
      const updated = { ...previous };
      accentChairProducts.forEach((product) => {
        const matchingVariant = product.variants.find((variant) =>
          group.variants.includes(variant.name)
        );
        if (matchingVariant) updated[product.id] = matchingVariant.name;
      });
      return updated;
    });
  };

  const handleVariantChange = (productId, variantName) => {
    setSelectedVariants((previous) => ({ ...previous, [productId]: variantName }));
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

    let result = accentChairProducts.filter((product) => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const materialMatch =
        selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
      const minMatch = minPrice === "" || product.price >= Number(minPrice);
      const maxMatch = maxPrice === "" || product.price <= Number(maxPrice);
      return typeMatch && materialMatch && minMatch && maxMatch;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-za") result.sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [selectedTypes, selectedMaterials, minPrice, maxPrice, sortBy, priceRangeInvalid]);

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

    if (cartTimerRef.current) window.clearTimeout(cartTimerRef.current);
    cartTimerRef.current = window.setTimeout(() => setCartMessage(""), 2500);
  };

  const handleWishlist = (product, variant) => {
    toggleWishlist({
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      category: "Accent Chairs",
      href: "/furniture/seating/accent-chairs",
    });
  };

  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) => variant.name === selectedVariants[activeProduct.id]
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

  const clearFilters = () => {
    setSelectedColour("");
    setSelectedTypes([]);
    setSelectedMaterials([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
    setSelectedVariants(
      Object.fromEntries(
        accentChairProducts.map((product) => [product.id, product.variants[0].name])
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-5 sm:px-8 sm:pt-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">
          {/* LEFT SIDEBAR */}
          <aside className="h-fit rounded-sm border border-[#E8E1D8] bg-[#FAF9F6] p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto custom-scrollbar">
            <Link
              href="/furniture#seating"
              className="group mb-5 inline-flex items-center gap-2 rounded-sm border border-[#DCD3C9] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#713A1B] transition-all duration-300 hover:border-[#713A1B] hover:bg-[#713A1B] hover:text-white"
            >
              <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">←</span>
              Back to Seating
            </Link>

            <div className="mb-5 border-b border-[#E8E1D8] pb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
                NEOLEN FURNITURE
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#29231F]">
                Accent Chairs
              </h1>
              <span className="mt-3 block h-[2px] w-10 bg-[#A88955]" />
            </div>

            <div className="mb-5 flex items-center justify-between border-b border-[#E8E1D8] pb-4">
              <h2 className="text-sm font-semibold text-[#493326]">Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-medium text-[#8B6A4E] underline underline-offset-4 transition-colors hover:text-[#713A1B]"
              >
                Clear all
              </button>
            </div>

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
                      style={{ backgroundColor: colour.hex }}
                    >
                      {selectedColour === colour.name && (
                        <span className="text-xs font-bold text-white drop-shadow">✓</span>
                      )}
                    </span>
                    <span className="text-[10px] text-[#756B62]">{colour.name}</span>
                  </button>
                ))}
              </div>
              {selectedColour && (
                <p className="mt-3 text-[10px] text-[#756B62]">Selected: {selectedColour}</p>
              )}
            </div>

            <div className="mb-7">
              <FilterHeading>Chair Type</FilterHeading>
              {chairTypes.map((type) => (
                <FilterCheckbox
                  key={type}
                  label={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(type, setSelectedTypes)}
                  count={accentChairProducts.filter((product) => product.type === type).length}
                />
              ))}
            </div>

            <div className="mb-7">
              <FilterHeading>Material</FilterHeading>
              {materials.map((material) => (
                <FilterCheckbox
                  key={material}
                  label={material}
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleFilter(material, setSelectedMaterials)}
                  count={accentChairProducts.filter((product) => product.material === material).length}
                />
              ))}
            </div>

            <div>
              <FilterHeading>Price Range</FilterHeading>
              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(18999)} – {formatPrice(27999)}
              </p>
              <label className="mb-1 block text-[10px] text-[#756B62]">From</label>
              <input
                type="number"
                min="0"
                placeholder="Minimum price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="mb-3 w-full rounded-sm border border-[#DCD3C9] bg-white px-3 py-2.5 text-xs text-[#29231F] outline-none transition-colors focus:border-[#713A1B] focus:ring-1 focus:ring-[#D8C6A8]"
              />
              <label className="mb-1 block text-[10px] text-[#756B62]">To</label>
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

          {/* PRODUCT COLLECTION */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E8E1D8] pb-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  EXPLORE OUR COLLECTION
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#29231F]">
                  Our Accent Chair Collection
                </h2>
                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover elegant accent chairs designed for comfort and character.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">{filteredProducts.length}</span>
                  {" "}of {accentChairProducts.length} accent chairs
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-accent-chairs" className="text-[11px] text-[#756B62]">
                    Sort by:
                  </label>
                  <select
                    id="sort-accent-chairs"
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

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product, index) => {
                  const variantName =
                    selectedVariants[product.id] || product.variants[0].name;
                  const currentVariant =
                    product.variants.find((variant) => variant.name === variantName) ||
                    product.variants[0];
                  const wishlistId = `${product.id}-${currentVariant.name}`;
                  return (
                    <AccentChairCard
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
                <p className="font-serif text-2xl text-[#493326]">No accent chairs found</p>
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

      {cartMessage && (
        <div className="fixed bottom-5 right-5 z-[80] flex max-w-[calc(100%-40px)] items-center gap-3 rounded-sm bg-[#493326] px-5 py-4 text-white shadow-xl">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">✓</span>
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
              <div className="flex min-h-[300px] items-center justify-center bg-[#F1F0EB] p-6">
                <img
                  src={activeVariant.image}
                  alt={`${activeProduct.name} - ${activeVariant.name}`}
                  className="h-full max-h-[420px] w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN SEATING COLLECTION
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>
                <p className="mt-4 text-xl font-semibold text-[#713A1B]">
                  {formatPrice(activeProduct.price)}
                </p>

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
                          {activeProduct.name}
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
                          <li key={detail} className="flex items-start gap-2 text-[12px] leading-5 text-[#65594F]">
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
                        {activeProduct.moreInformation.map(([label, value]) => (
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
                        ))}
                      </div>
                    </div>
                  )}
                </div>

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
                        onClick={() => handleVariantChange(activeProduct.id, variant.name)}
                        className={`h-8 w-8 rounded-full border border-black/10 transition-all ${
                          activeVariant.name === variant.name
                            ? "ring-2 ring-[#713A1B] ring-offset-2"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      />
                    ))}
                  </div>
                </div>

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

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a89b8d transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a89b8d;
          border-radius: 10px;
        }
      `}</style>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
