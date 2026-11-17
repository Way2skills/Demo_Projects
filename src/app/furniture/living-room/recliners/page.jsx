
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

const reclinerProducts = [
  {
    id: "recliner-01",
    name: "Single Seater Recliner",
    description:
      "A comfortable single seater recliner designed to bring effortless relaxation and everyday comfort to your living space.",
    price: 35990,
    configuration: "Single Seater",
    size: "1-Seater",
    badge: "Best Seller",
    variants: [
      {
        name: "Beige",
        image:
          "/images/furniture/living-room/recliners/recliner-01/beige.jpeg",
        hex: "#D8C6A8",
      },
      {
        name: "Brown",
        image:
          "/images/furniture/living-room/recliners/recliner-01/brown.jpeg",
        hex: "#76513B",
      },
      {
        name: "Grey",
        image:
          "/images/furniture/living-room/recliners/recliner-01/grey.jpeg",
        hex: "#929292",
      },
      {
        name: "Black",
        image:
          "/images/furniture/living-room/recliners/recliner-01/black.jpeg",
        hex: "#292929",
      },
    ],
    productDetails: [
      "Premium Upholstered Seating",
      "Comfortable Reclining Mechanism",
      "High Density Foam Cushion",
      "Strong Internal Frame",
      "Soft Fabric Finish",
      "Ergonomic Back Support",
      "Comfortable Armrests",
      "Single Seater Relaxation Design",
    ],
    moreInformation: [
      ["Available Quantity", "20"],
      ["SKU", "NL-RC-1001"],
      ["Weight", "42.50 Kg"],
      ["Dimensions", "W 36 X D 38 X H 40 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Frame + Premium Upholstery"],
    ],
  },
  {
    id: "recliner-02",
    name: "Modern 2 Seater Recliner",
    description:
      "A spacious two seater recliner designed for shared comfort with a contemporary look and relaxing seating experience.",
    price: 58990,
    configuration: "Double Seater",
    size: "2-Seater",
    badge: "Popular Choice",
    variants: [
      {
        name: "Cream",
        image:
          "/images/furniture/living-room/recliners/recliner-02/cream.jpeg",
        hex: "#E8DDC9",
      },
      {
        name: "Walnut",
        image:
          "/images/furniture/living-room/recliners/recliner-02/walnut.jpeg",
        hex: "#76513B",
      },
      {
        name: "Charcoal",
        image:
          "/images/furniture/living-room/recliners/recliner-02/charcoal.jpeg",
        hex: "#414141",
      },
      {
        name: "Navy Blue",
        image:
          "/images/furniture/living-room/recliners/recliner-02/navy-blue.jpeg",
        hex: "#263B59",
      },
    ],
    productDetails: [
      "Premium Upholstered Seating",
      "Dual Reclining Seats",
      "High Density Foam Cushion",
      "Strong Internal Frame",
      "Soft Fabric Finish",
      "Comfortable Back Support",
      "Wide Armrests",
      "Spacious Two Seater Design",
    ],
    moreInformation: [
      ["Available Quantity", "16"],
      ["SKU", "NL-RC-1002"],
      ["Weight", "76.80 Kg"],
      ["Dimensions", "W 72 X D 38 X H 40 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Frame + Premium Upholstery"],
    ],
  },
  {
    id: "recliner-03",
    name: "Modern 3 Seater Recliner",
    description:
      "A spacious family recliner offering comfortable seating and a relaxing experience for your everyday living.",
    price: 72990,
    configuration: "Triple Seater",
    size: "3-Seater",
    badge: "Family Favourite",
    variants: [
      {
        name: "Tan",
        image:
          "/images/furniture/living-room/recliners/recliner-03/tan.jpeg",
        hex: "#B68A61",
      },
      {
        name: "Dark Brown",
        image:
          "/images/furniture/living-room/recliners/recliner-03/dark-brown.jpeg",
        hex: "#493329",
      },
      {
        name: "Grey",
        image:
          "/images/furniture/living-room/recliners/recliner-03/grey.jpeg",
        hex: "#929292",
      },
      {
        name: "Burgundy",
        image:
          "/images/furniture/living-room/recliners/recliner-03/burgundy.jpeg",
        hex: "#713B45",
      },
    ],
    productDetails: [
      "Premium Upholstered Seating",
      "Multiple Reclining Seats",
      "High Density Foam Cushion",
      "Durable Internal Frame",
      "Soft Fabric Finish",
      "Comfortable Back Support",
      "Wide Comfortable Armrests",
      "Spacious Three Seater Design",
    ],
    moreInformation: [
      ["Available Quantity", "12"],
      ["SKU", "NL-RC-1003"],
      ["Weight", "98.50 Kg"],
      ["Dimensions", "W 92 X D 38 X H 40 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Frame + Premium Upholstery"],
    ],
  },
  {
    id: "recliner-04",
    name: "Premium Leather Recliner",
    description:
      "A premium recliner with a sophisticated leather finish, designed to add elegance and comfort to your living room.",
    price: 64990,
    configuration: "Single Seater",
    size: "1-Seater",
    badge: "Premium Design",
    variants: [
      {
        name: "Black",
        image:
          "/images/furniture/living-room/recliners/recliner-04/black.jpeg",
        hex: "#292929",
      },
      {
        name: "Chocolate",
        image:
          "/images/furniture/living-room/recliners/recliner-04/chocolate.jpeg",
        hex: "#50372C",
      },
      {
        name: "Cognac",
        image:
          "/images/furniture/living-room/recliners/recliner-04/cognac.jpeg",
        hex: "#A56A43",
      },
      {
        name: "Cream",
        image:
          "/images/furniture/living-room/recliners/recliner-04/cream.jpeg",
        hex: "#E8DDC9",
      },
    ],
    productDetails: [
      "Premium Leather Finish",
      "Smooth Reclining Mechanism",
      "High Density Foam Cushion",
      "Strong Internal Frame",
      "Comfortable Head Support",
      "Ergonomic Backrest",
      "Premium Stitching",
      "Luxury Single Seater Design",
    ],
    moreInformation: [
      ["Available Quantity", "10"],
      ["SKU", "NL-RC-1004"],
      ["Weight", "48.20 Kg"],
      ["Dimensions", "W 38 X D 39 X H 41 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Premium Leather + Solid Frame"],
    ],
  },
  {
    id: "recliner-05",
    name: "Power Recliner",
    description:
      "A modern power recliner designed for effortless relaxation with a premium appearance and comfortable seating.",
    price: 79990,
    configuration: "Power Recliner",
    size: "1-Seater",
    badge: "New Arrival",
    variants: [
      {
        name: "Ivory",
        image:
          "/images/furniture/living-room/recliners/recliner-05/ivory.jpeg",
        hex: "#E9E1D1",
      },
      {
        name: "Taupe",
        image:
          "/images/furniture/living-room/recliners/recliner-05/taupe.jpeg",
        hex: "#A99B88",
      },
      {
        name: "Olive",
        image:
          "/images/furniture/living-room/recliners/recliner-05/olive.jpeg",
        hex: "#747957",
      },
      {
        name: "Slate Blue",
        image:
          "/images/furniture/living-room/recliners/recliner-05/slate-blue.jpeg",
        hex: "#53677B",
      },
    ],
    productDetails: [
      "Electric Power Reclining System",
      "Premium Upholstered Seating",
      "High Density Foam Cushion",
      "Smooth Reclining Operation",
      "Comfortable Head and Back Support",
      "Strong Internal Frame",
      "Premium Soft Touch Finish",
      "Modern Power Recliner Design",
    ],
    moreInformation: [
      ["Available Quantity", "8"],
      ["SKU", "NL-RC-1005"],
      ["Weight", "56.40 Kg"],
      ["Dimensions", "W 38 X D 40 X H 42 Inches"],
      ["Warranty", "12 Months Service Warranty"],
      ["Assembly Details", "Installation provided by Neolen"],
      ["Material", "Solid Frame + Premium Upholstery"],
    ],
  },
];

const colourGroups = [
  {
    name: "Beige",
    hex: "#D8C6A8",
    variants: ["Beige", "Cream", "Ivory"],
  },
  {
    name: "Brown",
    hex: "#76513B",
    variants: ["Brown", "Walnut", "Dark Brown", "Chocolate"],
  },
  {
    name: "Grey",
    hex: "#929292",
    variants: ["Grey", "Charcoal"],
  },
  {
    name: "Black",
    hex: "#292929",
    variants: ["Black"],
  },
  {
    name: "Tan",
    hex: "#B68A61",
    variants: ["Tan", "Cognac"],
  },
  {
    name: "Blue",
    hex: "#263B59",
    variants: ["Navy Blue", "Slate Blue"],
  },
  {
    name: "Burgundy",
    hex: "#713B45",
    variants: ["Burgundy"],
  },
  {
    name: "Taupe",
    hex: "#A99B88",
    variants: ["Taupe"],
  },
  {
    name: "Olive",
    hex: "#747957",
    variants: ["Olive"],
  },
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
    <label className="flex cursor-pointer items-center justify-between gap-2 py-1.5 text-[12px] text-[#65594F] hover:text-[#493326]">
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

/* RECLINER PRODUCT CARD */
function ReclinerCard({
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
    product.variants.find(
      (variant) => variant.name === selectedVariant
    ) || product.variants[0];

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <div
        ref={imageRef}
        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm bg-[#F1F2EC]"
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

        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-sm bg-[#DCE7DC] px-2 py-1 text-[9px] font-semibold text-[#405344]">
          {product.badge}
        </span>

        <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] text-[#493326]">
          {activeVariant.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <button
          type="button"
          onClick={() => onViewProduct(product)}
          className="min-h-[38px] text-left text-[13px] font-semibold leading-5 text-[#29231F] transition-colors hover:text-[#493326]"
        >
          {product.name}
        </button>

        <p className="mt-1 min-h-[18px] text-[11px] text-[#756B62]">
          {product.size}, {product.configuration}
        </p>

        <p className="mt-2 min-h-[20px] text-[13px] font-semibold text-[#29231F]">
          {formatPrice(product.price)}
        </p>

        {/* COLOUR VARIANTS */}
        <div className="mt-3 flex min-h-[38px] flex-wrap content-start items-center gap-2.5">
          {product.variants.map((variant) => (
            <button
              key={variant.name}
              type="button"
              title={variant.name}
              aria-label={`Select ${variant.name}`}
              aria-pressed={activeVariant.name === variant.name}
              onClick={() =>
                onVariantChange(product.id, variant.name)
              }
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
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

        {/* CARD BUTTONS */}
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
              onClick={() =>
                onWishlist(product, activeVariant)
              }
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              className={`flex min-h-[42px] items-center justify-center rounded-sm border transition-all duration-300 ${
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
            className="mt-2 min-h-[42px] w-full rounded-sm border border-[#493326] bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#493326] transition-colors duration-300 hover:bg-[#493326] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D8C6A8]"
          >
            View Product
          </button>
        </div>
      </div>
    </article>
  );
}

/* MAIN RECLINERS PAGE */
export default function ReclinersPage() {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedVariants, setSelectedVariants] = useState(() =>
    Object.fromEntries(
      reclinerProducts.map((product) => [
        product.id,
        product.variants[0].name,
      ])
    )
  );

  const [selectedColour, setSelectedColour] = useState("");
  const [selectedConfigurations, setSelectedConfigurations] =
    useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeDetailTab, setActiveDetailTab] =
    useState("description");
  const [cartMessage, setCartMessage] = useState("");

  const priceRangeInvalid =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  /* GLOBAL COLOUR FILTER */
  const handleGlobalColour = (colour) => {
    const nextColour =
      selectedColour === colour ? "" : colour;

    setSelectedColour(nextColour);

    if (!nextColour) return;

    const group = colourGroups.find(
      (item) => item.name === nextColour
    );

    if (!group) return;

    setSelectedVariants((previous) => {
      const updated = { ...previous };

      reclinerProducts.forEach((product) => {
        const matchingVariant = product.variants.find(
          (variant) =>
            group.variants.includes(variant.name)
        );

        if (matchingVariant) {
          updated[product.id] = matchingVariant.name;
        }
      });

      return updated;
    });
  };

  /* INDIVIDUAL VARIANT */
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

  /* FILTER AND SORT */
  const filteredProducts = useMemo(() => {
    if (priceRangeInvalid) return [];

    let result = reclinerProducts.filter((product) => {
      const configurationMatch =
        selectedConfigurations.length === 0 ||
        selectedConfigurations.includes(
          product.configuration
        );

      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.includes(product.size);

      const minMatch =
        minPrice === "" ||
        product.price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return (
        configurationMatch &&
        sizeMatch &&
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
    selectedConfigurations,
    selectedSizes,
    minPrice,
    maxPrice,
    sortBy,
    priceRangeInvalid,
  ]);

  /* SHARED CART */
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
      category: "Recliners",
      href: "/furniture/living-room/recliners",
    };

    addToCart(cartItem);
    openCart();

    setCartMessage(
      `${product.name} added to cart`
    );

    window.setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  /* SHARED WISHLIST */
  const handleWishlist = (product, variant) => {
    const wishlistItem = {
      id: `${product.id}-${variant.name}`,
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: variant.image,
      colour: variant.name,
      variant: variant.name,
      category: "Recliners",
      href: "/furniture/living-room/recliners",
    };

    toggleWishlist(wishlistItem);
  };

  /* ACTIVE PRODUCT VARIANT */
  const activeVariant = activeProduct
    ? activeProduct.variants.find(
        (variant) =>
          variant.name ===
          selectedVariants[activeProduct.id]
      ) || activeProduct.variants[0]
    : null;

  /* OPEN PRODUCT */
  const openProduct = (product) => {
    setActiveProduct(product);
    setActiveDetailTab("description");
  };

  /* CLOSE PRODUCT */
  const closeProduct = () => {
    setActiveProduct(null);
    setActiveDetailTab("description");
  };

  /* CLEAR FILTERS */
  const clearFilters = () => {
    setSelectedColour("");
    setSelectedConfigurations([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");

    setSelectedVariants(
      Object.fromEntries(
        reclinerProducts.map((product) => [
          product.id,
          product.variants[0].name,
        ])
      )
    );
  };

  /* ESCAPE KEY */
  useEffect(() => {
    if (!activeProduct) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeProduct();
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [activeProduct]);

  return (
    <main className="min-h-screen bg-white text-[#29231F]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-5 sm:px-8 sm:pt-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">

          {/* LEFT SIDEBAR */}
          <aside
            className="
              h-fit
              rounded-sm
              border border-[#E8E1D8]
              bg-[#FAF9F6]
              p-5
              lg:sticky
              lg:top-24
              lg:max-h-[calc(100vh-7rem)]
              lg:overflow-y-auto
              lg:overscroll-contain
              lg:scrollbar-thin
              lg:scrollbar-track-[#F1ECE6]
              lg:scrollbar-thumb-[#C8B9AA]
              lg:[scrollbar-width:thin]
            "
          >

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
                Recliners
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
                    onClick={() =>
                      handleGlobalColour(
                        colour.name
                      )
                    }
                    aria-pressed={
                      selectedColour ===
                      colour.name
                    }
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 ${
                        selectedColour ===
                        colour.name
                          ? "scale-110 ring-2 ring-[#493326] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor:
                          colour.hex,
                      }}
                    >
                      {selectedColour ===
                        colour.name && (
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

            {/* CONFIGURATION FILTER */}
            <div className="mb-7">
              <FilterHeading>
                Configuration
              </FilterHeading>

              {[
                "Single Seater",
                "Double Seater",
                "Triple Seater",
                "Power Recliner",
              ].map((configuration) => (
                <FilterCheckbox
                  key={configuration}
                  label={configuration}
                  checked={selectedConfigurations.includes(
                    configuration
                  )}
                  onChange={() =>
                    toggleFilter(
                      configuration,
                      setSelectedConfigurations
                    )
                  }
                  count={
                    reclinerProducts.filter(
                      (product) =>
                        product.configuration ===
                        configuration
                    ).length
                  }
                />
              ))}
            </div>

            {/* SIZE FILTER */}
            <div className="mb-7">
              <FilterHeading>
                Size
              </FilterHeading>

              {[
                "1-Seater",
                "2-Seater",
                "3-Seater",
              ].map((size) => (
                <FilterCheckbox
                  key={size}
                  label={size}
                  checked={selectedSizes.includes(
                    size
                  )}
                  onChange={() =>
                    toggleFilter(
                      size,
                      setSelectedSizes
                    )
                  }
                  count={
                    reclinerProducts.filter(
                      (product) =>
                        product.size === size
                    ).length
                  }
                />
              ))}
            </div>

            {/* PRICE FILTER */}
            <div>
              <FilterHeading>
                Price Range
              </FilterHeading>

              <p className="mb-3 text-[10px] text-[#8B7D70]">
                {formatPrice(
                  Math.min(
                    ...reclinerProducts.map(
                      (p) => p.price
                    )
                  )
                )}{" "}
                –{" "}
                {formatPrice(
                  Math.max(
                    ...reclinerProducts.map(
                      (p) => p.price
                    )
                  )
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
                onChange={(event) =>
                  setMinPrice(
                    event.target.value
                  )
                }
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
                onChange={(event) =>
                  setMaxPrice(
                    event.target.value
                  )
                }
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

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#29231F]">
                  Our Recliner Collection
                </h2>

                <p className="mt-1 text-[11px] text-[#756B62]">
                  Discover comfort and relaxation with our recliner collection.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#756B62]">
                  Showing{" "}
                  <span className="font-semibold text-[#29231F]">
                    {filteredProducts.length}
                  </span>{" "}
                  of {reclinerProducts.length} recliners
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-recliners"
                    className="text-[11px] text-[#756B62]"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort-recliners"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value
                      )
                    }
                    className="min-w-[145px] rounded-sm border border-[#DDD5CC] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#493326]"
                  >
                    <option value="featured">
                      Featured
                    </option>
                    <option value="price-low">
                      Price: Low to High
                    </option>
                    <option value="price-high">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map(
                  (product, index) => {
                    const variantName =
                      selectedVariants[
                        product.id
                      ] ||
                      product.variants[0].name;

                    const currentVariant =
                      product.variants.find(
                        (variant) =>
                          variant.name ===
                          variantName
                      ) ||
                      product.variants[0];

                    const wishlistId = `${product.id}-${currentVariant.name}`;

                    return (
                      <ReclinerCard
                        key={product.id}
                        product={product}
                        selectedVariant={
                          variantName
                        }
                        onVariantChange={
                          handleVariantChange
                        }
                        onAddToCart={
                          handleAddToCart
                        }
                        onWishlist={
                          handleWishlist
                        }
                        isWishlisted={isWishlisted(
                          wishlistId
                        )}
                        onViewProduct={
                          openProduct
                        }
                        animationIndex={
                          index
                        }
                      />
                    );
                  }
                )}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl text-[#493326]">
                  No recliners found
                </p>

                <p className="mt-2 text-xs text-[#756B62]">
                  Try changing your filters or price range.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-black px-5 py-2.5 text-xs text-white transition-colors hover:bg-[#29231F]"
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

          <span className="text-xs font-medium">
            {cartMessage}
          </span>
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
            onClick={(event) =>
              event.stopPropagation()
            }
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
              <div className="flex min-h-[300px] items-center justify-center bg-[#F1F2EC] p-6">
                <img
                  key={activeVariant.image}
                  src={activeVariant.image}
                  alt={`${activeProduct.name} in ${activeVariant.name}`}
                  className="h-full max-h-[420px] w-full object-cover"
                />
              </div>

              {/* PRODUCT CONTENT */}
              <div className="p-6 sm:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88955]">
                  NEOLEN RECLINER COLLECTION
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#29231F]">
                  {activeProduct.name}
                </h2>

                <p className="mt-4 text-xl font-semibold text-[#493326]">
                  {formatPrice(
                    activeProduct.price
                  )}
                </p>

                {/* HORIZONTAL DETAIL TABS */}
                <div className="mt-7 border-b border-[#DED5CA]">
                  <div className="flex items-center gap-5 overflow-x-auto">
                    {[
                      {
                        id: "description",
                        label: "Description",
                      },
                      {
                        id: "details",
                        label: "Product Details",
                      },
                      {
                        id: "information",
                        label: "More Information",
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          setActiveDetailTab(
                            tab.id
                          )
                        }
                        className={`relative shrink-0 pb-3 text-[11px] font-semibold transition-colors duration-300 ${
                          activeDetailTab ===
                          tab.id
                            ? "text-[#493326]"
                            : "text-[#95877A] hover:text-[#493326]"
                        }`}
                      >
                        {tab.label}

                        {activeDetailTab ===
                          tab.id && (
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#493326]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="min-h-[190px] pt-5">

                  {/* DESCRIPTION */}
                  {activeDetailTab ===
                    "description" && (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                        Product Description
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#756B62]">
                        {
                          activeProduct.description
                        }
                      </p>
                    </div>
                  )}

                  {/* PRODUCT DETAILS */}
                  {activeDetailTab ===
                    "details" && (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#493326]">
                        Product Features
                      </h3>

                      <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        {activeProduct.productDetails.map(
                          (detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 text-[12px] leading-5 text-[#65594F]"
                            >
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAE2D7] text-[10px] text-[#493326]">
                                ✓
                              </span>

                              <span>
                                {detail}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* MORE INFORMATION */}
                  {activeDetailTab ===
                    "information" && (
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

                              <div className="px-3 py-3 text-[10px] leading-5 text-[#756B62] sm:px-4">
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
                    Select Colour:{" "}
                    {activeVariant.name}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {activeProduct.variants.map(
                      (variant) => (
                        <button
                          key={variant.name}
                          type="button"
                          title={variant.name}
                          aria-label={`Select ${variant.name}`}
                          aria-pressed={
                            activeVariant.name ===
                            variant.name
                          }
                          onClick={() =>
                            handleVariantChange(
                              activeProduct.id,
                              variant.name
                            )
                          }
                          className={`h-8 w-8 rounded-full border border-black/10 transition-all ${
                            activeVariant.name ===
                            variant.name
                              ? "ring-2 ring-[#493326] ring-offset-2"
                              : "hover:scale-110"
                          }`}
                          style={{
                            backgroundColor:
                              variant.hex,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(
                      activeProduct,
                      activeVariant
                    );
                    closeProduct();
                  }}
                  className="mt-7 w-full rounded-sm bg-black px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#29231F] active:scale-[0.98]"
                >
                  Add to Cart
                </button>

                {/* ADD TO WISHLIST */}
                <button
                  type="button"
                  onClick={() =>
                    handleWishlist(
                      activeProduct,
                      activeVariant
                    )
                  }
                  aria-pressed={isWishlisted(
                    `${activeProduct.id}-${activeVariant.name}`
                  )}
                  className={`mt-3 w-full rounded-sm border px-5 py-3 text-xs font-semibold transition-all ${
                    isWishlisted(
                      `${activeProduct.id}-${activeVariant.name}`
                    )
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-[#493326] bg-white text-[#493326] hover:bg-[#F4EEE7]"
                  }`}
                >
                  {isWishlisted(
                    `${activeProduct.id}-${activeVariant.name}`
                  )
                    ? "♥ Added to Wishlist"
                    : "♡ Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
