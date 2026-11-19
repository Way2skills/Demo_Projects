
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import products from "@/data/products";

const ITEMS_PER_PAGE = 8;

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const loadWishlist = useCallback(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("babyhunt-wishlist") || "[]"
      );

      const ids = Array.isArray(saved)
        ? saved
            .map((item) =>
              String(
                item && typeof item === "object" ? item.id : item
              )
            )
            .filter((id) => id && id !== "undefined" && id !== "null")
        : [];

      setWishlistIds([...new Set(ids)]);
    } catch {
      setWishlistIds([]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadWishlist();
    }, 0);

    window.addEventListener("storage", loadWishlist);
    window.addEventListener("babyhunt-wishlist-updated", loadWishlist);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", loadWishlist);
      window.removeEventListener("babyhunt-wishlist-updated", loadWishlist);
    };
  }, [loadWishlist]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(String(product.id))
  );

  const totalPages = Math.ceil(
    wishlistProducts.length / ITEMS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(1, totalPages)
  );

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const currentProducts = wishlistProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const removeProduct = (id) => {
    const updated = wishlistIds.filter(
      (item) => item !== String(id)
    );

    localStorage.setItem("babyhunt-wishlist", JSON.stringify(updated));
    setWishlistIds(updated);

    window.dispatchEvent(new Event("babyhunt-wishlist-updated"));
    setToast("Removed from your wishlist");
  };

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("babyhunt-cart") || "[]"
      );

      const existing = cart.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      let updated;

      if (existing >= 0) {
        updated = cart.map((item, index) =>
          index === existing
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updated = [...cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("babyhunt-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      setToast("Added to your bag");
    } catch {
      setToast("Unable to add product");
    }
  };

  if (!loaded) {
    return (
      <main className="bh-wishlist-loading">
        <div className="bh-wishlist-spinner" />
      </main>
    );
  }

  return (
    <main className="bh-wishlist">

      {/* HERO */}

      <section className="bh-wishlist-hero">
        <div className="bh-wishlist-hero-inner">

          <Link href="/shop" className="bh-wishlist-back">
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>

          <motion.div
            className="bh-wishlist-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bh-wishlist-eyebrow">
              <Heart size={14} />
              YOUR FAVOURITES
            </div>

            <h1>My Wishlist</h1>

            <p>
              All the little things you love, gathered in one lovely place.
            </p>
          </motion.div>

          <motion.div
            className="bh-wishlist-count"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bh-wishlist-count-icon">
              <Heart size={20} />
            </div>

            <div>
              <strong>{wishlistProducts.length}</strong>
              <span>Saved items</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* WISHLIST PRODUCTS */}

      <section className="bh-wishlist-content">

        {wishlistProducts.length > 0 ? (
          <>
            <div className="bh-wishlist-section-heading">
              <div>
                <span>YOUR COLLECTION</span>
                <h2>Favourite Picks</h2>
              </div>

              <Link href="/shop" className="bh-wishlist-shop-link">
                Explore More
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="bh-wishlist-grid">
              <AnimatePresence mode="popLayout">
                {currentProducts.map((product, index) => (
                  <motion.article
                    key={String(product.id)}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                    }}
                    className="bh-wishlist-card"
                  >

                    <div className="bh-wishlist-image-wrap">
                      <Link
                        href={`/products/${product.id}`}
                        className="bh-wishlist-image-link"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                        />
                      </Link>

                      {product.badge && (
                        <span className="bh-wishlist-badge">
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="bh-wishlist-heart"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Heart size={17} fill="currentColor" />
                      </button>
                    </div>

                    <div className="bh-wishlist-card-info">

                      <span className="bh-wishlist-category">
                        {product.category}
                      </span>

                      <Link href={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                      </Link>

                      <div className="bh-wishlist-price">
                        <strong>
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </strong>

                        {product.oldPrice && (
                          <del>
                            ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                          </del>
                        )}
                      </div>

                      <div className="bh-wishlist-card-actions">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="bh-wishlist-add"
                        >
                          <ShoppingBag size={15} />
                          Add to Bag
                        </button>

                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="bh-wishlist-remove"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>

                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}

            {totalPages >= 1 && (
              <div className="bh-wishlist-pagination">

                <button
                  type="button"
                  className="bh-wishlist-page-arrow"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`bh-wishlist-page-number ${
                      safePage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="bh-wishlist-page-arrow"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>

              </div>
            )}

            <div className="bh-wishlist-page-info">
              Showing {startIndex + 1}–{Math.min(
                startIndex + ITEMS_PER_PAGE,
                wishlistProducts.length
              )} of {wishlistProducts.length} saved items
            </div>
          </>
        ) : (
          <motion.div
            className="bh-wishlist-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bh-wishlist-empty-icon">
              <Heart size={38} strokeWidth={1.4} />
            </div>

            <span>YOUR LITTLE COLLECTION</span>

            <h2>Your Wishlist is Empty</h2>

            <p>
              Discover adorable essentials for your little one.
              Save your favourite products here and find them whenever
              you need them.
            </p>

            <Link href="/shop" className="bh-wishlist-discover">
              Discover Products
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

      </section>

      {/* TOAST */}

      <AnimatePresence>
        {toast && (
          <motion.div
            className="bh-wishlist-toast"
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
          >
            <Check size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
