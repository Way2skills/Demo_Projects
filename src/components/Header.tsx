
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Trash2,
  ArrowRight,
} from "lucide-react";

import products from "@/data/products";
import categories from "@/data/categories";

const CART_KEY = "babyhunt-cart";
const WISHLIST_KEY = "babyhunt-wishlist";

// --------------------------------------
// External store subscriptions
// --------------------------------------

function subscribeToCart(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("babyhunt-cart-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("babyhunt-cart-updated", callback);
  };
}

function subscribeToWishlist(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("babyhunt-wishlist-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("babyhunt-wishlist-updated", callback);
  };
}

function getCartSnapshot() {
  return localStorage.getItem(CART_KEY) || "[]";
}

function getWishlistSnapshot() {
  return localStorage.getItem(WISHLIST_KEY) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

// --------------------------------------
// Data parsing
// --------------------------------------

function parseCart(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseWishlist(value) {
  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) return [];

    const ids = parsed
      .map((item) =>
        typeof item === "object" && item !== null
          ? item.id
          : item
      )
      .filter(
        (id) =>
          id !== undefined &&
          id !== null &&
          String(id) !== ""
      )
      .map(String);

    return [...new Set(ids)];
  } catch {
    return [];
  }
}

// --------------------------------------
// Header component
// --------------------------------------

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerSnapshot
  );

  const wishlistSnapshot = useSyncExternalStore(
    subscribeToWishlist,
    getWishlistSnapshot,
    getServerSnapshot
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const cart = parseCart(cartSnapshot);
  const wishlist = parseWishlist(wishlistSnapshot);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const searchTerm = searchParams.get("search") || "";

  // --------------------------------------
  // Cart count
  // --------------------------------------

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  // --------------------------------------
  // Wishlist products
  // --------------------------------------

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(String(product.id))
  );

  // --------------------------------------
  // Remove wishlist product
  // --------------------------------------

  function removeWishlistProduct(id) {
    const updated = wishlist.filter(
      (item) => item !== String(id)
    );

    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("babyhunt-wishlist-updated")
    );
  }

  // --------------------------------------
  // Search functionality
  // --------------------------------------

  function submitSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const term = String(formData.get("search") || "").trim();

    setMobileMenu(false);

    if (!term) {
      router.push("/shop");
      return;
    }

    const destination = `/shop?search=${encodeURIComponent(term)}`;

    if (pathname === "/shop") {
      window.dispatchEvent(
        new CustomEvent("babyhunt-shop-search", {
          detail: term,
        })
      );

      router.replace(destination);
      return;
    }

    router.push(destination);
  }

  // --------------------------------------
  // Menu controls
  // --------------------------------------

  function closeMenu() {
    setMobileMenu(false);
  }

  // --------------------------------------
  // Home click - scroll to top
  // --------------------------------------

  function handleHomeClick(event) {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // --------------------------------------
  // Cart and wishlist controls
  // --------------------------------------

  function openCart() {
    window.dispatchEvent(
      new Event("babyhunt-open-cart")
    );
  }

  function openWishlist() {
    setWishlistOpen(true);
  }

  function closeWishlist() {
    setWishlistOpen(false);
  }

  // --------------------------------------
  // Escape key
  // --------------------------------------

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setWishlistOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // --------------------------------------
  // Prevent background scrolling
  // --------------------------------------

  useEffect(() => {
    if (wishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [wishlistOpen]);

  // --------------------------------------
  // UI
  // --------------------------------------

  return (
    <>
      <motion.div
        className="announcement"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        A little love for your little ones
        <span className="announcement-divider">|</span>
        Enjoy shopping at BabyHunt!
      </motion.div>

      {/* FIXED NAVBAR */}

      <motion.header
        className="header"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          paddingTop: "6px",
          paddingBottom: "6px",
          alignItems: "center",
          marginBottom: 0,
          position: "sticky",
          top: 0,
          width: "100%",
          boxSizing: "border-box",
          zIndex: 1000,
          background: "#fbfaf5",
        }}
      >
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu((value) => !value)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Header Logo */}

        <Link
          href="/"
          className="logo"
          onClick={handleHomeClick}
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
            gap: 0,
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src="/images/logo.jpg"
            alt="BabyHunt"
            width={140}
            height={60}
            priority
            className="logo-img"
            style={{
              display: "block",
              width: "140px",
              height: "auto",
              margin: 0,
              padding: 0,
            }}
          />

          <small
            style={{
              display: "block",
              margin: 0,
              padding: 0,
              marginTop: "1px",
              fontSize: "10px",
              lineHeight: 1,
            }}
          >
            Little things. Big happiness.
          </small>
        </Link>

        {/* Navigation */}

        <nav className={mobileMenu ? "nav open" : "nav"}>
          <Link href="/" onClick={handleHomeClick}>
            The Little World
          </Link>

          <div className="nav-mega-wrap">
            <Link
              href="/#categories"
              onClick={(event) => {
                closeMenu();
                if (pathname === "/") {
                  event.preventDefault();
                  document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Discover
            </Link>
            <div className="nav-mega-panel">
              <div className="nav-mega-intro">
                <span>THE BABYHUNT EDIT</span>
                <h3>Little things, thoughtfully found.</h3>
                <p>Explore considered essentials for every little milestone.</p>
                <Link href="/shop" onClick={closeMenu}>Explore everything <ArrowRight size={14} /></Link>
              </div>
              <div className="nav-mega-grid">
                {categories.slice(0, 6).map((category) => (
                  <Link key={category.id} href={`/shop?search=${encodeURIComponent(category.name)}`} onClick={closeMenu}>
                    <Image src={category.image} alt="" width={84} height={84} />
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/shop" onClick={closeMenu}>
            Shop All
          </Link>

          <Link href="/about" onClick={closeMenu}>
            Our Story
          </Link>

          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        {/* Header Actions */}

        <div className="header-actions">
          
          {/* Search */}

          <form className="search-box" onSubmit={submitSearch}>
            <button
              type="submit"
              className="search-submit"
              aria-label="Search products"
              title="Search"
            >
              <Search size={19} className="search-icon" />
            </button>

            <input
              key={searchTerm}
              type="search"
              name="search"
              placeholder="Search little treasures..."
              defaultValue={searchTerm}
              aria-label="Search products"
            />
          </form>

          {/* Wishlist Icon */}

          <motion.button
            type="button"
            className="icon-button"
            aria-label="Open Wishlist"
            title="Wishlist"
            onClick={openWishlist}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={21} width={21} height={21} />

            {mounted && wishlist.length > 0 && (
              <span className="count">
                {wishlist.length}
              </span>
            )}
          </motion.button>

          {/* Cart Icon */}

          <motion.button
            type="button"
            className="icon-button cart-button"
            aria-label="Open Shopping Cart"
            title="Cart"
            onClick={openCart}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={21} width={21} height={21} />

            <span className="count">
              {mounted ? cartCount : 0}
            </span>
          </motion.button>
        </div>
      </motion.header>

      {/* WISHLIST DRAWER */}

      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              className="bh-wishlist-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeWishlist}
            />

            <motion.aside
              className="bh-wishlist-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
              }}
              aria-label="Wishlist drawer"
            >
              <div className="bh-wishlist-drawer-header">
                <div>
                  <span>YOUR FAVOURITES</span>

                  <h2>
                    My Wishlist

                    <span className="bh-wishlist-drawer-count">
                      {wishlist.length}
                    </span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeWishlist}
                  className="bh-wishlist-drawer-close"
                  aria-label="Close wishlist"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="bh-wishlist-drawer-content">
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((product) => (
                    <div
                      className="bh-wishlist-drawer-item"
                      key={String(product.id)}
                    >
                      <Link
                        href={`/products/${product.id}`}
                        onClick={closeWishlist}
                        className="bh-wishlist-drawer-image"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          sizes="100px"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>

                      <div className="bh-wishlist-drawer-details">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeWishlist}
                        >
                          <h3>{product.name}</h3>
                        </Link>

                        <strong>
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </strong>

                        <button
                          type="button"
                          onClick={() =>
                            removeWishlistProduct(product.id)
                          }
                          className="bh-wishlist-drawer-remove"
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bh-wishlist-drawer-empty">
                    <Heart size={40} strokeWidth={1.3} />

                    <h3>Your Wishlist is Empty</h3>

                    <p>
                      Save your favourite little treasures here.
                    </p>
                  </div>
                )}
              </div>

              <div className="bh-wishlist-drawer-footer">
                <Link
                  href="/wishlist"
                  className="bh-wishlist-view-button"
                  onClick={closeWishlist}
                >
                  View Wishlist
                  <ArrowRight size={16} />
                </Link>

                <button
                  type="button"
                  className="bh-wishlist-continue-button"
                  onClick={closeWishlist}
                >
                  Continue Shopping
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
