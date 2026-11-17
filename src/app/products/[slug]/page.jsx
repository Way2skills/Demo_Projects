
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { newArrivals } from "@/data/homeData";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug;

  const product = newArrivals.find(
    (item) => item.href.split("/").filter(Boolean).pop() === slug
  );

  const variants = product?.variants?.slice(0, 2) || [];

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted: checkWishlisted,
  } = useWishlist();

  if (!product || variants.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-5">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A7656]">
            NEOLEN FURNITURE
          </p>

          <h1 className="mt-4 font-serif text-3xl text-[#29231F]">
            Product Not Found
          </h1>

          <Link
            href="/"
            className="mt-7 inline-flex bg-[#302219] px-8 py-3 text-[10px] uppercase tracking-widest text-white transition hover:bg-[#805638]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const activeVariant = variants[selectedVariant] || variants[0];

  const numericPrice =
    Number(String(product.price || "").replace(/[^\d.]/g, "")) || 0;

  const wishlistId = `${slug}-${activeVariant.name}`;

  const isProductWishlisted = checkWishlisted(wishlistId);

  const handleWishlist = () => {
    toggleWishlist({
      id: wishlistId,
      product_id: slug,
      name: product.name,
      price: numericPrice,
      image: activeVariant.image,
      colour: activeVariant.name,
      variant: activeVariant.name,
    });
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: slug,
      name: product.name,
      price: numericPrice,
      image: activeVariant.image,
      variant: activeVariant.name,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F4]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1250px] px-5 pt-7 md:px-10">
        <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.12em] text-[#91867C]">
          <Link href="/" className="transition hover:text-[#805638]">
            HOME
          </Link>

          <span>/</span>
          <span>NEW ARRIVALS</span>
          <span>/</span>

          <span className="font-semibold text-[#5C493B]">
            {product.name.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-[1250px] px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-10">

        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1fr_0.88fr] lg:gap-14 xl:gap-[72px]">

          {/* LEFT - Product Image */}
          <div className="product-image-enter mx-auto w-full max-w-[560px]">

            <div className="group relative overflow-hidden bg-[#F0ECE5]">

              <div className="absolute left-4 top-4 z-10 bg-white/90 px-3 py-2 text-[8px] font-semibold tracking-[0.2em] text-[#5B493A] backdrop-blur-sm md:left-5 md:top-5">
                NEOLEN COLLECTION
              </div>

              <img
                key={activeVariant.image}
                src={activeVariant.image}
                alt={`${product.name} - ${activeVariant.name}`}
                className="aspect-[5/4] max-h-[560px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />

              <div className="pointer-events-none absolute inset-0 border border-black/[0.04]" />
            </div>

            {/* Finish Thumbnails */}
            <div className="mt-4 grid grid-cols-2 gap-3">

              {variants.map((variant, index) => (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => setSelectedVariant(index)}
                  className={`flex items-center gap-3 border p-2 text-left transition-all duration-300 ${
                    selectedVariant === index
                      ? "border-[#7D5A40] bg-[#F0E9E0]"
                      : "border-[#E9E2D9] bg-white hover:border-[#B99A7D]"
                  }`}
                >
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="h-14 w-14 shrink-0 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-[8px] uppercase tracking-[0.16em] text-[#9A897A]">
                      FINISH
                    </p>

                    <p className="mt-1 truncate text-[11px] font-semibold text-[#38291F]">
                      {variant.name}
                    </p>
                  </div>

                  {selectedVariant === index && (
                    <span className="ml-auto text-sm text-[#8A5A36]">
                      ✓
                    </span>
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="product-info-enter flex w-full flex-col lg:pt-1">

            {/* Heading */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9A7656]">
                THOUGHTFULLY DESIGNED
              </p>

              <h1 className="mt-3 max-w-lg font-serif text-[29px] font-medium leading-[1.2] tracking-tight text-[#30251E] sm:text-[34px] lg:text-[38px] xl:text-[40px]">
                {product.name}
              </h1>
            </div>

            {/* Price and Wishlist */}
            <div className="mt-5 flex items-center justify-between gap-4">

              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#958577]">
                  PRICE
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <span className="text-[24px] font-semibold tracking-tight text-[#6D4932]">
                    ₹{numericPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="border-l border-[#D9CEC1] pl-3 text-[9px] uppercase tracking-[0.12em] text-[#938579]">
                    Premium Design
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  isProductWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                aria-pressed={isProductWishlisted}
                className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-all duration-300 hover:scale-105 ${
                  isProductWishlisted
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-[#DED5CA] bg-white text-[#6D4932] hover:border-red-300 hover:text-red-500"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={isProductWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                >
                  <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </div>

            <div className="my-5 h-px bg-[#E5DDD3]" />

            {/* Description */}
            <p className="max-w-lg text-[12px] leading-[1.9] text-[#75685D]">
              Bring timeless elegance into your home with this beautifully
              designed {product.name.toLowerCase()}. Thoughtful detailing,
              elegant styling and a refined finish make it a beautiful
              addition to your living space.
            </p>

            {/* Finish Selection */}
            <div className="mt-6">

              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B2C22]">
                  Choose Your Finish
                </h3>

                <span className="text-[10px] text-[#8C7C6E]">
                  {activeVariant.name}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-4">

                {variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => setSelectedVariant(index)}
                    aria-label={`Select ${variant.name}`}
                    aria-pressed={selectedVariant === index}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        selectedVariant === index
                          ? "scale-110 border-[#6E4A32]"
                          : "border-transparent group-hover:border-[#B89A7E]"
                      }`}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: variant.color }}
                      />
                    </span>

                    <span className="text-[9px] text-[#75685D]">
                      {variant.name}
                    </span>
                  </button>
                ))}

              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">

              <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B2C22]">
                Quantity
              </h3>

              <div className="inline-flex h-10 items-center border border-[#DED5CA] bg-white">

                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-full w-10 text-lg text-[#594536] transition-colors hover:bg-[#F0E9E0]"
                >
                  −
                </button>

                <span className="w-10 text-center text-xs font-medium text-[#38291F]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="h-full w-10 text-lg text-[#594536] transition-colors hover:bg-[#F0E9E0]"
                >
                  +
                </button>

              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="group mt-6 flex h-[50px] w-full items-center justify-center gap-3 bg-[#302219] text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:bg-[#805638] hover:shadow-xl hover:shadow-[#302219]/15 active:scale-[0.99]"
            >
              Add to Cart

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>

            <p className="mt-3 text-center text-[9px] tracking-[0.15em] text-[#998B7D]">
              ELEGANCE • COMFORT • CRAFTSMANSHIP
            </p>

            {/* Product Information */}
            <div className="mt-5 border-t border-[#E5DDD3] pt-3">

              <div className="flex items-center justify-between py-1.5">
                <span className="text-[10px] text-[#76685D]">
                  Collection
                </span>

                <span className="text-[10px] font-medium text-[#3B2C22]">
                  Neolen Furniture
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-[10px] text-[#76685D]">
                  Selected Finish
                </span>

                <span className="text-[10px] font-medium text-[#3B2C22]">
                  {activeVariant.name}
                </span>
              </div>

            </div>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-3 self-start text-[9px] font-semibold uppercase tracking-[0.18em] text-[#80664F] transition-all hover:gap-5 hover:text-[#302219]"
            >
              <span>←</span>
              Continue Exploring
            </Link>

          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes productImageReveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes productInfoReveal {
          from {
            opacity: 0;
            transform: translateX(25px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .product-image-enter {
          animation: productImageReveal 0.8s
            cubic-bezier(.22,1,.36,1) both;
        }

        .product-info-enter {
          animation: productInfoReveal 0.8s
            cubic-bezier(.22,1,.36,1) 0.12s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .product-image-enter,
          .product-info-enter {
            animation: none;
          }
        }
      `}</style>

    </main>
  );
}
