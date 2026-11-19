
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ShoppingBag,
  Heart,
  ChevronDown,
  PackageOpen,
  RotateCcw,
  Check,
  Tag,
  ArrowRight,
  Sparkles,
  Baby,
  Users,
  IndianRupee,
} from "lucide-react";

import products from "../../data/products";
import categories from "../../data/categories";

// PRODUCT SEARCH FUNCTION
function searchProducts(productList = [], searchTerm = "") {
  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const query = normalize(searchTerm);

  if (!query) return productList;

  const words = query.split(" ");

  return productList.filter((product) => {
    const searchableText = normalize(
      [
        product.name,
        product.category,
        product.subcategory,
        product.description,
        product.badge,
        product.brand,
        product.sku,
      ].join(" ")
    );

    return (
      searchableText.includes(query) ||
      words.every((word) => searchableText.includes(word))
    );
  });
}

// GENDER OPTIONS
const genderOptions = [
  { value: "All", label: "All Babies" },
  { value: "boy", label: "Baby Boy" },
  { value: "girl", label: "Baby Girl" },
  { value: "unisex", label: "Unisex" },
];

// AGE OPTIONS
const ageOptions = [
  { value: "All", label: "All Ages" },
  { value: "0-3 Months", label: "0–3 Months" },
  { value: "3-6 Months", label: "3–6 Months" },
  { value: "6-12 Months", label: "6–12 Months" },
  { value: "1-2 Years", label: "1–2 Years" },
  { value: "2-3 Years", label: "2–3 Years" },
  { value: "3-5 Years", label: "3–5 Years" },
];

// GET PRICE
function getPrice(product) {
  return Number(product?.price || 0);
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [activeAge, setActiveAge] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const prices = useMemo(
    () => products.map(getPrice).filter((price) => price > 0),
    []
  );

  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const highestPrice = prices.length ? Math.max(...prices) : 10000;

  // READ SEARCH FROM URL AND LISTEN TO HEADER SEARCH
  useEffect(() => {
    function syncSearchFromUrl() {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("search") || "");
    }

    function handleShopSearch(event) {
      const keyword = event.detail || "";
      setSearch(keyword);

      const url = new URL(window.location.href);

      if (keyword.trim()) {
        url.searchParams.set("search", keyword);
      } else {
        url.searchParams.delete("search");
      }

      window.history.replaceState({}, "", url);
    }

    syncSearchFromUrl();

    window.addEventListener("popstate", syncSearchFromUrl);
    window.addEventListener("babyhunt-shop-search", handleShopSearch);

    return () => {
      window.removeEventListener("popstate", syncSearchFromUrl);
      window.removeEventListener("babyhunt-shop-search", handleShopSearch);
    };
  }, []);

  // WISHLIST SYNCHRONIZATION
  useEffect(() => {
    function loadWishlist() {
      try {
        const saved = JSON.parse(
          localStorage.getItem("babyhunt-wishlist") || "[]"
        );

        setWishlist(
          Array.isArray(saved)
            ? saved.map((item) =>
                typeof item === "object" && item !== null
                  ? item.id
                  : item
              )
            : []
        );
      } catch {
        setWishlist([]);
      }
    }

    loadWishlist();

    window.addEventListener("storage", loadWishlist);
    window.addEventListener("babyhunt-wishlist-updated", loadWishlist);

    return () => {
      window.removeEventListener("storage", loadWishlist);
      window.removeEventListener("babyhunt-wishlist-updated", loadWishlist);
    };
  }, []);

  const selectedCategory = categories.find(
    (category) => category.name === activeCategory
  );

  // SEARCH, CATEGORY, SUBCATEGORY, GENDER, AGE, PRICE AND SORTING
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = searchProducts(result, search);
    }

    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    if (activeSubcategory !== "All") {
      result = result.filter(
        (product) => product.subcategory === activeSubcategory
      );
    }

    if (activeGender !== "All") {
      result = result.filter(
        (product) =>
          String(product.gender || "").toLowerCase() ===
          activeGender.toLowerCase()
      );
    }

    if (activeAge !== "All") {
      result = result.filter((product) => {
        const productAges = Array.isArray(product.ageRange)
          ? product.ageRange
          : product.ageRange
          ? [product.ageRange]
          : [];

        return productAges.includes(activeAge);
      });
    }

    if (minPrice !== "") {
      result = result.filter(
        (product) => getPrice(product) >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (product) => getPrice(product) <= Number(maxPrice)
      );
    }

    if (sort === "low") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "high") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sort === "name-desc") {
      result.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    } else if (sort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    }

    return result;
  }, [
    search,
    activeCategory,
    activeSubcategory,
    activeGender,
    activeAge,
    minPrice,
    maxPrice,
    sort,
  ]);

  // RESET PAGE WHEN FILTERS OR SORTING CHANGE
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentPage(1);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    search,
    activeCategory,
    activeSubcategory,
    activeGender,
    activeAge,
    minPrice,
    maxPrice,
    sort,
  ]);

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // WISHLIST
  function toggleWishlist(id) {
    try {
      const saved = JSON.parse(
        localStorage.getItem("babyhunt-wishlist") || "[]"
      );

      const current = Array.isArray(saved)
        ? saved.map((item) =>
            typeof item === "object" && item !== null
              ? item.id
              : item
          )
        : [];

      const isSelected = current.some(
        (item) => String(item) === String(id)
      );

      const updated = isSelected
        ? current.filter((item) => String(item) !== String(id))
        : [...current, id];

      localStorage.setItem(
        "babyhunt-wishlist",
        JSON.stringify(updated)
      );

      setWishlist(updated);
      window.dispatchEvent(new Event("babyhunt-wishlist-updated"));
    } catch (error) {
      console.error("Wishlist update failed:", error);
    }
  }

  // ADD TO CART
  function addToCart(product) {
    try {
      const saved = JSON.parse(
        localStorage.getItem("babyhunt-cart") || "[]"
      );

      const existingCart = Array.isArray(saved) ? saved : [];

      const existingItem = existingCart.find(
        (item) =>
          String(item.id) === String(product.id) &&
          !item.selectedColor &&
          !item.selectedSize
      );

      const updated = existingItem
        ? existingCart.map((item) =>
            String(item.id) === String(product.id) &&
            !item.selectedColor &&
            !item.selectedSize
              ? {
                  ...item,
                  quantity: Number(item.quantity || 1) + 1,
                }
              : item
          )
        : [
            ...existingCart,
            {
              ...product,
              quantity: 1,
              selectedColor: null,
              selectedColorValue: null,
              selectedSize: null,
              cartItemId: `${product.id}-default-default`,
            },
          ];

      localStorage.setItem(
        "babyhunt-cart",
        JSON.stringify(updated)
      );

      window.dispatchEvent(new Event("babyhunt-cart-updated"));
      window.dispatchEvent(new Event("babyhunt-open-cart"));
      setCartMessage(`${product.name} added to your bag`);
    } catch (error) {
      console.error("Cart update failed:", error);
      setCartMessage("Unable to add product. Please try again.");
    }
  }

  // CART TOAST
  useEffect(() => {
    if (!cartMessage) return;

    const timer = setTimeout(() => {
      setCartMessage("");
    }, 2200);

    return () => clearTimeout(timer);
  }, [cartMessage]);

  // CLEAR SEARCH
  function clearSearch() {
    setSearch("");

    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url);

    window.dispatchEvent(
      new CustomEvent("babyhunt-shop-search", {
        detail: "",
      })
    );
  }

  // CLEAR ALL FILTERS
  function clearFilters() {
    setSearch("");
    setActiveCategory("All");
    setActiveSubcategory("All");
    setActiveGender("All");
    setActiveAge("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");

    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url);

    window.dispatchEvent(
      new CustomEvent("babyhunt-shop-search", {
        detail: "",
      })
    );
  }

  const activeFilterCount = [
    activeCategory !== "All",
    activeSubcategory !== "All",
    activeGender !== "All",
    activeAge !== "All",
    minPrice !== "",
    maxPrice !== "",
  ].filter(Boolean).length;

  const hasActiveFilters =
    search.trim() !== "" ||
    activeFilterCount > 0 ||
    sort !== "featured";

  // SCROLL TO PRODUCTS
  function scrollToProducts() {
    document.getElementById("shop-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // SIDEBAR FILTER CONTENT
  const filterContent = (
    <>
      <div className="bh-sidebar-heading">
        <div>
          <span>FIND YOUR PERFECT MATCH</span>
          <h3>Filters</h3>
        </div>

        <button
          type="button"
          className="bh-sidebar-clear"
          onClick={clearFilters}
        >
          <RotateCcw size={13} />
          Clear All
        </button>
      </div>

      {/* CATEGORY */}
      <div className="bh-sidebar-group">
        <h4>Category</h4>

        <div className="bh-sidebar-list">
          <button
            type="button"
            className={activeCategory === "All" ? "active" : ""}
            onClick={() => {
              setActiveCategory("All");
              setActiveSubcategory("All");
            }}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={
                activeCategory === category.name ? "active" : ""
              }
              onClick={() => {
                setActiveCategory(category.name);
                setActiveSubcategory("All");
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* AGE */}
      <div className="bh-sidebar-group">
        <h4>
          <Baby size={16} />
          Baby Age
        </h4>

        <div className="bh-sidebar-list">
          {ageOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={activeAge === option.value ? "active" : ""}
              onClick={() => setActiveAge(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* GENDER */}
      <div className="bh-sidebar-group">
        <h4>
          <Users size={16} />
          Gender
        </h4>

        <div className="bh-sidebar-list">
          {genderOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={
                activeGender === option.value ? "active" : ""
              }
              onClick={() => setActiveGender(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="bh-sidebar-group">
        <h4>
          <IndianRupee size={16} />
          Price Range
        </h4>

        <div className="bh-price-inputs">
          <label>
            <span>Min Price</span>
            <input
              type="number"
              min="0"
              placeholder={String(lowestPrice)}
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </label>

          <label>
            <span>Max Price</span>
            <input
              type="number"
              min="0"
              placeholder={String(highestPrice)}
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>
        </div>

        <div className="bh-price-hint">
          ₹{lowestPrice.toLocaleString("en-IN")} – ₹
          {highestPrice.toLocaleString("en-IN")}
        </div>
      </div>

      <button
        type="button"
        className="bh-sidebar-apply"
        onClick={() => setShowFilters(false)}
      >
        Show {filteredProducts.length} Products
        <ArrowRight size={16} />
      </button>
    </>
  );

  return (
    <main className="shop-page">

      {/* ANIMATED VIDEO BANNER */}
      <section className="bh-video-banner">
        <video
          className="bh-banner-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/shop.jpg"
        >
          <source
            src="/videos/shop-banner.mp4"
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>

        <div className="bh-video-overlay" />

        <motion.div
          className="bh-video-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>THE LITTLE THINGS COLLECTION</span>

          <h2>
            Made for Little
            <br />
            <span>Moments of Joy</span>
          </h2>

          <p>
            Discover beautiful essentials made with love for
            every little milestone.
          </p>

          <button
            type="button"
            className="bh-video-shop-button"
            onClick={scrollToProducts}
          >
            Explore Collection
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      <div className="shop-container">

        {/* SEARCH TOOLBAR */}
        <motion.section
          className="shop-toolbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="shop-search">
            <Search size={19} />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for baby essentials..."
              aria-label="Search products"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="shop-toolbar-actions">
            <button
              type="button"
              className={`shop-filter-toggle ${
                showFilters ? "active" : ""
              }`}
              onClick={() => setShowFilters(true)}
            >
              <SlidersHorizontal size={17} />
              Filters
              {activeFilterCount > 0 && (
                <span className="shop-filter-count">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <label className="shop-sort">
              <ArrowUpDown size={16} />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>

              <ChevronDown size={15} />
            </label>
          </div>
        </motion.section>

        {/* ANIMATED CATEGORIES */}
        <section className="shop-category-section bh-category-section">
          <motion.div
            className="shop-section-heading"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <span className="shop-small-label">
                FIND YOUR FAVOURITES
              </span>
              <h2>Explore Our Little World</h2>
              <p>
                Everything your little one needs, all in one place.
              </p>
            </div>

            <span className="shop-category-count">
              {categories.length} Collections
            </span>
          </motion.div>

          <div className="bh-category-grid">

            {/* ALL PRODUCTS CARD */}
            <motion.button
              type="button"
              className={`bh-category-card bh-all-category ${
                activeCategory === "All" ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory("All");
                setActiveSubcategory("All");
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              <div className="bh-category-image">
                <Image
                  src="/images/all.jpg"
                  alt="All baby products"
                  fill
                  sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                />
              </div>

              <div className="bh-category-caption">
                <span>Explore everything</span>
                <h3>All Products</h3>
                <ArrowRight size={19} />
              </div>
            </motion.button>

            {/* CATEGORY CARDS */}
            {categories.map((category, index) => (
              <motion.button
                type="button"
                key={category.id}
                className={`bh-category-card ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setActiveSubcategory("All");
                }}
                initial={{ opacity: 0, y: 45, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: (index % 4) * 0.12,
                }}
                whileHover={{ y: -12, scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="bh-category-image">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                  />
                </div>

                <div className="bh-category-caption">
                  <span>{category.description}</span>
                  <h3>{category.name}</h3>
                  <ArrowRight size={19} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* SUBCATEGORIES */}
        <AnimatePresence>
          {selectedCategory?.subcategories?.length > 0 && (
            <motion.section
              className="shop-subcategory-section"
              initial={{ opacity: 0, height: 0, y: 15 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 15 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Explore {selectedCategory.name}</h3>

              <div className="shop-subcategory-list">
                <button
                  type="button"
                  onClick={() => setActiveSubcategory("All")}
                  className={
                    activeSubcategory === "All" ? "active" : ""
                  }
                >
                  All
                </button>

                {selectedCategory.subcategories.map((subcategory) => (
                  <button
                    type="button"
                    key={subcategory}
                    onClick={() => setActiveSubcategory(subcategory)}
                    className={
                      activeSubcategory === subcategory ? "active" : ""
                    }
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* DESKTOP SIDEBAR + PRODUCT GRID */}
        <div className="bh-shop-layout">
          <aside className="bh-filter-sidebar">
            {filterContent}
          </aside>

          <section
            className="shop-products-section"
            id="shop-products"
          >
            <div className="shop-products-heading">
              <div>
                <span className="shop-small-label">
                  LITTLE THINGS, BIG JOY
                </span>

                <h2>
                  {activeCategory === "All"
                    ? "Our Products"
                    : activeCategory}
                </h2>

                <p>
                  Showing{" "}
                  <strong>
                    {filteredProducts.length === 0
                      ? 0
                      : startIndex + 1}
                    {filteredProducts.length > 0 &&
                      `–${Math.min(
                        startIndex + productsPerPage,
                        filteredProducts.length
                      )}`}
                  </strong>{" "}
                  of <strong>{filteredProducts.length}</strong> products
                  {search.trim() ? ` for "${search.trim()}"` : ""}
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="shop-reset-button"
                  onClick={clearFilters}
                >
                  <X size={15} />
                  Reset filters
                </button>
              )}
            </div>

            {/* ACTIVE FILTERS */}
            {hasActiveFilters && (
              <div className="bh-active-filters">
                {activeGender !== "All" && (
                  <button
                    type="button"
                    onClick={() => setActiveGender("All")}
                  >
                    {activeGender} <X size={13} />
                  </button>
                )}

                {activeAge !== "All" && (
                  <button
                    type="button"
                    onClick={() => setActiveAge("All")}
                  >
                    {activeAge} <X size={13} />
                  </button>
                )}

                {(minPrice !== "" || maxPrice !== "") && (
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                  >
                    Price <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <>
                <motion.div layout className="shop-product-grid">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product, index) => {
                      const isWishlisted = wishlist.some(
                        (id) => String(id) === String(product.id)
                      );

                      return (
                        <motion.article
                          layout
                          key={product.id}
                          className="shop-product-card"
                          initial={{
                            opacity: 0,
                            y: 35,
                            scale: 0.96,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 15,
                            scale: 0.92,
                          }}
                          whileHover={{
                            y: -9,
                            scale: 1.015,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                            delay: Math.min(index * 0.045, 0.25),
                          }}
                        >
                          <div className="shop-product-image-wrap">
                            <Link
                              href={`/products/${product.id}`}
                              className="shop-product-image-link"
                              aria-label={`View ${product.name}`}
                            >
                              <motion.img
                                src={product.image}
                                alt={product.name}
                                loading={index < 8 ? "eager" : "lazy"}
                                whileHover={{ scale: 1.09 }}
                                transition={{
                                  duration: 0.65,
                                  ease: [0.22, 1, 0.36, 1] as [
                                    number,
                                    number,
                                    number,
                                    number
                                  ],
                                }}
                              />
                            </Link>

                            {product.badge && (
                              <span className="shop-product-badge">
                                <Tag size={11} />
                                {product.badge}
                              </span>
                            )}

                            <motion.button
                              type="button"
                              className={`shop-wishlist-button ${
                                isWishlisted ? "selected" : ""
                              }`}
                              onClick={() => toggleWishlist(product.id)}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
                              aria-label={
                                isWishlisted
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"
                              }
                            >
                              <Heart
                                size={18}
                                fill={
                                  isWishlisted ? "currentColor" : "none"
                                }
                              />
                            </motion.button>
                          </div>

                          <div className="shop-product-info">
                            <p className="shop-product-category">
                              {product.category}
                            </p>

                            <Link
                              href={`/products/${product.id}`}
                              className="shop-product-name"
                            >
                              {product.name}
                            </Link>

                            <div className="shop-product-price">
                              <strong>₹{product.price}</strong>

                              {product.oldPrice && (
                                <del>₹{product.oldPrice}</del>
                              )}
                            </div>

                            <motion.button
                              type="button"
                              className="shop-add-button"
                              onClick={() => addToCart(product)}
                              whileHover={{
                                scale: 1.035,
                                y: -2,
                              }}
                              whileTap={{ scale: 0.96 }}
                            >
                              <ShoppingBag size={15} />
                              Add to Bag
                            </motion.button>

                            <div className="shop-wishlist-status">
                              {isWishlisted && (
                                <span>
                                  <Check size={12} />
                                  Added to wishlist
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="shop-pagination">
                    <button
                      type="button"
                      className="shop-page-button shop-page-arrow"
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {pageNumbers.map((page) => (
                      <button
                        type="button"
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`shop-page-button ${
                          currentPage === page ? "active" : ""
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      className="shop-page-button shop-page-arrow"
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        )
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                className="shop-empty-state"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PackageOpen size={45} />

                <h3>No products found</h3>

                <p>
                  We couldn&apos;t find anything matching your selection.
                  Try another search or explore all products.
                </p>

                <button type="button" onClick={clearFilters}>
                  View All Products
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="bh-filter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />

            <motion.aside
              className="bh-mobile-filter-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="bh-mobile-filter-header">
                <h3>Filters</h3>

                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close filters"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="bh-mobile-filter-content">
                {filterContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CART NOTIFICATION */}
      <AnimatePresence>
        {cartMessage && (
          <motion.div
            className="shop-cart-toast"
            initial={{ opacity: 0, y: 25, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
          >
            <Check size={17} />
            <span>{cartMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALL STYLES */}
      <style jsx global>{`

        /* VIDEO BANNER */
        .bh-video-banner {
          position: relative;
          width: 100%;
          min-height: 420px;
          overflow: hidden;
          display: flex;
          align-items: center;
          isolation: isolate;
          background: #493b3d;
          margin-bottom: 20px;
        }

        .bh-banner-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: -2;
        }

        .bh-video-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            90deg,
            rgba(40, 34, 34, 0.78) 0%,
            rgba(40, 34, 34, 0.48) 48%,
            rgba(40, 34, 34, 0.12) 100%
          );
        }

        .bh-video-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
          padding: 65px 8%;
          color: #fff;
        }

        .bh-video-content > span {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 700;
          color: #f4d7dc;
        }

        .bh-video-content h2 {
          font-size: clamp(32px, 5vw, 55px);
          line-height: 1.15;
          margin: 20px 0;
          font-weight: 700;
        }

        .bh-video-content h2 span {
          color: #f2c9ce;
        }

        .bh-video-content p {
          max-width: 420px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
        }

        .bh-video-shop-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
          padding: 14px 24px;
          border: none;
          background: #fff;
          color: #493b3d;
          text-decoration: none;
          border-radius: 5px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bh-video-shop-button:hover {
          background: #f2c9ce;
          transform: translateY(-3px);
        }

        /* CATEGORY GRID */
        .bh-category-section {
          padding-top: 55px;
          padding-bottom: 35px;
        }

        .bh-category-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          margin-top: 28px;
        }

        .bh-category-card {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          overflow: hidden;
          border: 1px solid #e6e1d6;
          border-radius: 17px;
          background: #fff;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(80, 48, 57, 0.06);
          transition:
            border-color 0.3s,
            box-shadow 0.3s;
        }

        .bh-category-card:hover,
        .bh-category-card.active {
          border-color: #54745c;
          box-shadow: 0 16px 35px rgba(189, 113, 138, 0.17);
        }

        .bh-category-image {
          position: relative;
          height: 205px;
          overflow: hidden;
          background: #e8eee6;
        }

        .bh-category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .bh-category-card:hover .bh-category-image img {
          transform: scale(1.13);
        }

        .bh-category-caption {
          position: relative;
          min-height: 112px;
          padding: 17px;
          background: linear-gradient(135deg, #fff, #f7f5ef);
        }

        .bh-category-caption span {
          display: block;
          margin-bottom: 7px;
          color: #827c70;
          font-size: 10px;
          line-height: 1.5;
        }

        .bh-category-caption h3 {
          margin: 0;
          padding-right: 25px;
          color: #493b3d;
          font-size: 16px;
          font-weight: 750;
          transition:
            transform 0.3s,
            color 0.3s;
        }

        .bh-category-card:hover .bh-category-caption h3 {
          color: #54745c;
          transform: translateX(4px);
        }

        .bh-category-caption > svg {
          position: absolute;
          right: 16px;
          bottom: 18px;
          color: #54745c;
          transition: transform 0.3s;
        }

        .bh-category-card:hover .bh-category-caption > svg {
          transform: translateX(6px);
        }

        .bh-category-card.active .bh-category-caption {
          background: #e8eee6;
        }

        /* FILTER SIDEBAR */
        .bh-shop-layout {
          display: grid;
          grid-template-columns: 255px minmax(0, 1fr);
          gap: 28px;
          align-items: start;
          margin-top: 28px;
        }

        .bh-filter-sidebar {
          position: sticky;
          top: 105px;
          max-height: calc(100vh - 125px);
          overflow-y: auto;
          padding: 21px 18px;
          background: #fff;
          border: 1px solid #f0e5e8;
          border-radius: 17px;
          box-shadow: 0 8px 28px rgba(80, 48, 57, 0.045);
          scrollbar-width: thin;
          scrollbar-color: #c6d0bf transparent;
        }

        .bh-sidebar-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e8e4d9;
        }

        .bh-sidebar-heading span {
          color: #54745c;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .bh-sidebar-heading h3 {
          margin: 4px 0 0;
          color: #493b3d;
          font-size: 21px;
        }

        .bh-sidebar-clear {
          display: flex;
          align-items: center;
          gap: 5px;
          border: 0;
          background: transparent;
          color: #54745c;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .bh-sidebar-group {
          padding: 19px 0;
          border-bottom: 1px solid #e8e4d9;
        }

        .bh-sidebar-group:last-of-type {
          border-bottom: 0;
        }

        .bh-sidebar-group h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 13px;
          color: #493b3d;
          font-size: 14px;
          font-weight: 750;
        }

        .bh-sidebar-group h4 svg {
          color: #54745c;
        }

        .bh-sidebar-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .bh-sidebar-list button {
          width: 100%;
          padding: 8px 10px;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: #76666a;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bh-sidebar-list button:hover,
        .bh-sidebar-list button.active {
          background: #e8eee6;
          color: #315b46;
          font-weight: 700;
        }

        /* PRICE FILTER */
        .bh-price-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .bh-price-inputs label {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .bh-price-inputs label span {
          color: #8c777d;
          font-size: 10px;
          font-weight: 600;
        }

        .bh-price-inputs input {
          width: 100%;
          min-width: 0;
          padding: 9px 8px;
          border: 1px solid #e5e0d4;
          border-radius: 8px;
          outline: none;
          background: #fffaf9;
          color: #493b3d;
          font-size: 12px;
        }

        .bh-price-inputs input:focus {
          border-color: #54745c;
        }

        .bh-price-hint {
          margin-top: 9px;
          color: #a18c92;
          font-size: 10px;
        }

        .bh-sidebar-apply {
          display: none;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          padding: 13px;
          border: 0;
          border-radius: 9px;
          background: #54745c;
          color: white;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ACTIVE FILTER TAGS */
        .bh-active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 0 0 17px;
        }

        .bh-active-filters button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 9px;
          border: 1px solid #f0dce3;
          border-radius: 20px;
          background: #f7f5ef;
          color: #315b46;
          font-size: 10px;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .bh-active-filters button:hover {
          background: #e8eee6;
          transform: translateY(-2px);
        }

        /* PRODUCT CARD ANIMATIONS */
        .shop-product-card {
          overflow: hidden;
          border-radius: 16px;
          transition: box-shadow 0.35s ease;
          will-change: transform;
        }

        .shop-product-card:hover {
          box-shadow: 0 18px 38px rgba(189, 113, 138, 0.17);
        }

        .shop-product-image-wrap {
          position: relative;
          overflow: hidden;
        }

        .shop-product-image-wrap img {
          transition:
            transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
            filter 0.5s ease;
        }

        .shop-product-card:hover .shop-product-image-wrap img {
          filter: brightness(1.04);
        }

        .shop-product-badge {
          animation: bhBadgeFloat 3s ease-in-out infinite;
        }

        @keyframes bhBadgeFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        /* ADD TO BAG */
        .shop-add-button {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .shop-add-button:hover {
          box-shadow: 0 8px 18px rgba(189, 113, 138, 0.22);
        }

        /* WISHLIST */
        .shop-wishlist-button {
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .shop-wishlist-button.selected {
          animation: bhHeartPop 0.35s ease;
        }

        @keyframes bhHeartPop {
          0% {
            transform: scale(0.7);
          }
          70% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* MOBILE FILTER DRAWER */
        .bh-filter-overlay {
          display: none;
        }

        .bh-mobile-filter-drawer {
          display: none;
        }

        /* PRODUCTS SCROLL OFFSET */
        #shop-products {
          scroll-margin-top: 90px;
        }

        /* RESPONSIVE */
        @media (max-width: 1000px) {
          .bh-category-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .bh-shop-layout {
            grid-template-columns: 220px minmax(0, 1fr);
            gap: 17px;
          }

          .bh-filter-sidebar {
            padding: 17px 13px;
          }
        }

        @media (max-width: 700px) {
          .bh-shop-layout {
            display: block;
          }

          .bh-filter-sidebar {
            display: none;
          }

          .bh-filter-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(35, 24, 28, 0.48);
            backdrop-filter: blur(3px);
          }

          .bh-mobile-filter-drawer {
            display: flex;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1001;
            width: min(88vw, 370px);
            height: 100dvh;
            flex-direction: column;
            background: #fff;
            box-shadow: -10px 0 35px rgba(0, 0, 0, 0.12);
          }

          .bh-mobile-filter-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 19px;
            border-bottom: 1px solid #e8e4d9;
          }

          .bh-mobile-filter-header h3 {
            margin: 0;
            color: #493b3d;
            font-size: 19px;
          }

          .bh-mobile-filter-header button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            border: 0;
            border-radius: 50%;
            background: #e8eee6;
            color: #315b46;
            cursor: pointer;
          }

          .bh-mobile-filter-content {
            flex: 1;
            overflow-y: auto;
            padding: 0 18px 25px;
          }

          .bh-mobile-filter-content .bh-sidebar-heading {
            display: none;
          }

          .bh-sidebar-apply {
            display: flex;
          }

          .bh-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 13px;
          }

          .bh-category-image {
            height: 155px;
          }

          .bh-category-caption {
            min-height: 105px;
            padding: 12px;
          }

          .bh-category-caption h3 {
            font-size: 13px;
          }

          /* MOBILE VIDEO BANNER */
          .bh-video-banner {
            min-height: 340px;
          }

          .bh-video-overlay {
            background: rgba(40, 34, 34, 0.58);
          }

          .bh-video-content {
            padding: 45px 25px;
          }

          .bh-video-content h2 {
            font-size: 34px;
          }

          .bh-video-content p {
            font-size: 13px;
          }
        }

        @media (min-width: 701px) {
          .shop-filter-toggle {
            display: none;
          }
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .bh-category-image img,
          .shop-product-card,
          .shop-product-image-wrap img,
          .shop-add-button {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
