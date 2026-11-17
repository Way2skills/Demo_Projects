
"use client";

import Link from "next/link";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.product_id
        ? `${product.product_id}-${product.colour || product.variant || ""}`
        : product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image,
      variant: product.colour || product.variant || "",
    });

    removeFromWishlist(product.id);
  };

  return (
    <main className="min-h-screen bg-white px-5 py-12 text-[#29231F] sm:px-8">
      <section className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#E8E1D8] pb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A88955]">
              NEOLEN FURNITURE
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold">
              My Wishlist
            </h1>

            <p className="mt-2 text-sm text-[#756B62]">
              Your favourite furniture, saved in one place.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold text-[#8B6A4E] underline underline-offset-4 hover:text-[#493326]"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <span className="text-6xl text-[#D8CEC3]">♡</span>

            <h2 className="mt-5 font-serif text-2xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-[#756B62]">
              Save your favourite furniture and find it here later.
            </p>

            <Link
              href="/furniture"
              className="mt-6 bg-[#493326] px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#2F2119]"
            >
              Explore Furniture
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-xs text-[#756B62]">
              {wishlistItems.length} saved item(s)
            </p>

            <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => (
                <article
                  key={product.id}
                  className="group min-w-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F1EC]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#756B62]">
                        Image unavailable
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-red-500 shadow transition hover:scale-110"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="pt-3">
                    <h2 className="text-sm font-semibold text-[#29231F]">
                      {product.name}
                    </h2>

                    {(product.colour || product.variant) && (
                      <p className="mt-1 text-[11px] text-[#756B62]">
                        {product.colour || product.variant}
                      </p>
                    )}

                    <p className="mt-2 text-sm font-semibold text-[#493326]">
                      {formatPrice(product.price)}
                    </p>

                    <div className="mt-4 grid grid-cols-[1fr_42px] gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#493326] px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#2F2119]"
                      >
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromWishlist(product.id)
                        }
                        aria-label="Remove item"
                        className="border border-[#D8CEC3] text-lg text-[#493326] transition hover:border-red-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
