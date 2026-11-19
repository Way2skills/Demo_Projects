
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

import {
  ShoppingBag,
  Heart,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Gift,
} from "lucide-react";

import categories from "@/data/categories";
import products from "@/data/products";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

const heroSlides = [
  {
    type: "image",
    src: "/images/hero-baby.jpg",
    eyebrow: "WELCOME TO BABYHUNT",
    title: "Tiny outfits, endless happiness.",
    description:
      "Discover adorable little essentials made with love for your little bundle of joy.",
  },
  {
    type: "image",
    src: "/images/hero-2.jpg",
    eyebrow: "MADE FOR LITTLE DREAMS",
    title: "Comfort meets cuteness.",
    description:
      "Thoughtfully selected outfits for every beautiful little moment.",
  },
  {
    type: "video",
    src: "/videos/hero-3.mp4",
    poster: "/images/hero-3.jpg",
    eyebrow: "A WORLD OF LITTLE WONDERS",
    title: "Beautiful beginnings start here.",
    description:
      "Explore a lovely collection made for your precious little ones.",
  },
];

const lifestyleImages = [
  {
    image: "/images/lifestyle-1.jpg",
    title: "Everyday Comfort",
    subtitle: "Softness for little adventures",
  },
  {
    image: "/images/lifestyle-2.jpeg",
    title: "Little Fashion",
    subtitle: "Adorable styles, endless smiles",
  },
  {
    image: "/images/lifestyle-3.jpg",
    title: "Precious Moments",
    subtitle: "Made for memories",
  },
  {
    image: "/images/lifestyle-4.jpg",
    title: "Little Essentials",
    subtitle: "Everything your baby needs",
  },
];

const promoBanners = [
  {
    image: "/images/promo-1.jpg",
    eyebrow: "THE EVERYDAY COLLECTION",
    title: "Little essentials, thoughtfully chosen.",
    description: "Discover everyday favourites for your little one.",
  },
  {
    image: "/images/promo-2.jpg",
    eyebrow: "SPECIAL LITTLE TREASURES",
    title: "Big smiles start with little things.",
    description: "Find something special for every precious moment.",
  },
];

const benefits = [
  {
    title: "Easy Shopping",
    description: "A happy shopping experience",
    Icon: ShoppingBag,
  },
  {
    title: "Quality Products",
    description: "Selected with care",
    Icon: ShieldCheck,
  },
  {
    title: "Customer Friendly",
    description: "Here for your little ones",
    Icon: Heart,
  },
  {
    title: "Made With Love",
    description: "For every precious moment",
    Icon: Gift,
  },
];

export default function Home() {
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleHeaderSearch(event: Event) {
      const customEvent = event as CustomEvent<string>;
      setSearch(customEvent.detail || "");

      window.setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }

    window.addEventListener("babyhunt-search", handleHeaderSearch);

    return () => {
      window.removeEventListener("babyhunt-search", handleHeaderSearch);
    };
  }, []);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("babyhunt-cart") || "[]"
      );

      const savedWishlist = JSON.parse(
        localStorage.getItem("babyhunt-wishlist") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);

      setWishlist(
        Array.isArray(savedWishlist)
          ? savedWishlist.map((item) =>
              typeof item === "object" && item !== null
                ? item.id
                : item
            )
          : []
      );
    } catch {
      setCart([]);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    function syncCart() {
      try {
        const saved = JSON.parse(
          localStorage.getItem("babyhunt-cart") || "[]"
        );

        setCart(Array.isArray(saved) ? saved : []);
      } catch {
        setCart([]);
      }
    }

    function syncWishlist() {
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

    window.addEventListener("storage", syncCart);
    window.addEventListener("storage", syncWishlist);
    window.addEventListener("babyhunt-cart-updated", syncCart);
    window.addEventListener("babyhunt-wishlist-updated", syncWishlist);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("babyhunt-cart-updated", syncCart);
      window.removeEventListener("babyhunt-wishlist-updated", syncWishlist);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = search.trim().toLowerCase();

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term);

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const featuredProducts = filteredProducts.slice(0, 8);

  function addToCart(product: any) {
    try {
      const saved = JSON.parse(
        localStorage.getItem("babyhunt-cart") || "[]"
      );

      const existingCart = Array.isArray(saved) ? saved : [];

      const existing = existingCart.find(
        (item: any) => String(item.id) === String(product.id)
      );

      const updated = existing
        ? existingCart.map((item: any) =>
            String(item.id) === String(product.id)
              ? {
                  ...item,
                  quantity: Number(item.quantity || 1) + 1,
                }
              : item
          )
        : [...existingCart, { ...product, quantity: 1 }];

      localStorage.setItem("babyhunt-cart", JSON.stringify(updated));
      setCart(updated);

      window.dispatchEvent(new Event("babyhunt-cart-updated"));
      window.dispatchEvent(new Event("babyhunt-open-cart"));
    } catch (error) {
      console.error("Unable to add product:", error);
    }
  }

  function toggleWishlist(id: string | number) {
    const isWishlisted = wishlist.some(
      (item) => String(item) === String(id)
    );

    const updated = isWishlisted
      ? wishlist.filter((item) => String(item) !== String(id))
      : [...wishlist, id];

    setWishlist(updated);

    try {
      localStorage.setItem(
        "babyhunt-wishlist",
        JSON.stringify(updated)
      );

      window.dispatchEvent(new Event("babyhunt-wishlist-updated"));
    } catch (error) {
      console.error("Unable to update wishlist:", error);
    }
  }

  function openProduct(id: string | number) {
    router.push(`/products/${id}`);
  }

  function openShop() {
    router.push("/shop");
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }

  function previousSlide() {
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }

  const currentSlide = heroSlides[activeSlide];

  return (
    <main className="babyhunt-home w-full min-w-0 overflow-x-hidden">

      {/* HERO CAROUSEL */}

      <section className="bh-hero relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            className="bh-hero-media"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentSlide.type === "video" ? (
              <video
                key={currentSlide.src}
                className="bh-hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={currentSlide.poster}
              >
                <source src={currentSlide.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                className="bh-hero-image"
                fetchPriority="high"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="bh-hero-overlay" />

        <motion.div
          key={activeSlide}
          className="bh-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">{currentSlide.eyebrow}</span>
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.description}</p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={openShop}>
              Explore Collection
              <ArrowRight size={17} />
            </button>

            <a href="#categories" className="secondary-button">
              Discover More
              <ChevronRight size={17} />
            </a>
          </div>

          <div className="bh-hero-note">
            <Heart size={15} />
            Made for little moments that matter
          </div>
        </motion.div>

        <div className="bh-hero-controls">
          <button onClick={previousSlide} aria-label="Previous slide">
            <ChevronLeft />
          </button>

          <div className="bh-hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <button onClick={nextSlide} aria-label="Next slide">
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* BENEFITS */}

      <motion.section
        className="benefits w-full"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          {benefits.map((benefit) => {
            const Icon = benefit.Icon;

            return (
              <motion.div
                className="benefit"
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <span className="benefit-icon">
                  <Icon size={25} strokeWidth={1.7} />
                </span>

                <div>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* SHOP BY CATEGORY */}

      <section
        id="categories"
        className="w-full overflow-hidden border-t border-[#EAE4D9] bg-[#FAF9F6] py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A18C72]">
              EXPLORE BABYHUNT
            </span>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#354638] sm:text-3xl">
              Shop by Category
            </h2>

            <motion.div
              className="mx-auto mt-5 h-[2px] rounded-full bg-[#C8B69C]"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-8 lg:gap-x-5"
            style={{ marginTop: "64px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {categories.map((category, index) => (
              <motion.button
                type="button"
                key={category.id}
                onClick={openShop}
                className="group flex w-full max-w-[140px] flex-col items-center text-center"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 45,
                    scale: 0.85,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.65,
                      delay: index * 0.03,
                      ease,
                    },
                  },
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-white bg-[#F1EDE5] shadow-[0_3px_15px_rgba(53,70,56,0.08)] sm:h-28 sm:w-28"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 10px 25px rgba(53,70,56,0.18)",
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

                <motion.span
                  className="mt-4 max-w-[125px] text-xs font-semibold leading-relaxed text-[#354638] transition-colors duration-300 group-hover:text-[#A18C72]"
                >
                  {category.name}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIFESTYLE IMAGE GALLERY */}

      <section className="section bh-lifestyle mx-auto w-full max-w-7xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">THE BABYHUNT EDIT</span>
                <h2>Little Moments, Beautiful Memories</h2>
                <p>
                  Discover the little things that make childhood special.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="bh-lifestyle-grid">
            {lifestyleImages.map((item, index) => (
              <motion.article
                className="bh-lifestyle-card"
                key={item.image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -7 }}
              >
                <img src={item.image} alt={item.title} />

                <div className="bh-lifestyle-overlay">
                  <span>{item.subtitle}</span>
                  <h3>{item.title}</h3>

                  <button onClick={openShop}>
                    Explore <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNERS */}

      <section className="section bh-promotions mx-auto w-full max-w-7xl">
        <div className="px-4 sm:px-6 lg:px-8">
          {promoBanners.map((banner, index) => (
            <motion.div
              key={banner.image}
              className={`bh-promo-card ${index === 1 ? "reverse" : ""}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bh-promo-image">
                <img src={banner.image} alt={banner.title} />
              </div>

              <div className="bh-promo-content">
                <span className="eyebrow">{banner.eyebrow}</span>
                <h2>{banner.title}</h2>
                <p>{banner.description}</p>

                <button className="primary-button" onClick={openShop}>
                  Shop Collection <ArrowRight size={17} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section
        className="section products-section mx-auto w-full max-w-7xl bg-white"
        id="products"
      >
        <div className="px-4 sm:px-6 lg:px-8">

          <Reveal>
            {/* Original heading layout and styling preserved */}
            <div className="section-heading">
              <div>
                <span className="eyebrow">HANDPICKED WITH LOVE</span>

                <div className="flex items-center gap-3">
                  <h2>Our Little Favourites</h2>

                  {/* Small dancing baby beside heading */}
                  <motion.div
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-[68px] sm:w-[68px]"
                    animate={{
                      y: [0, -4, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <video
                      src="/videos/dancing-baby.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="Cute dancing baby"
                      className="h-full w-full bg-white object-contain"
                    />
                  </motion.div>
                </div>

                <p>
                  A few adorable picks for your precious little ones.
                </p>
              </div>

              <button className="text-link" onClick={openShop}>
                View All Products <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>

          {/* PRODUCT FILTERS */}

          <Reveal>
            <div className="filter-list">
              {["All", ...categories.map((category) => category.name)].map(
                (category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? "filter-button active"
                        : "filter-button"
                    }
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </Reveal>

          {/* PRODUCT GRID */}

          <motion.div className="product-grid" layout>
            <AnimatePresence mode="popLayout">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <motion.article
                    className="product-card animated-product-card"
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease,
                    }}
                  >
                    <div className="product-image">
                      <button
                        type="button"
                        className="product-image-link"
                        onClick={() => openProduct(product.id)}
                      >
                        <img src={product.image} alt={product.name} />
                      </button>

                      {product.badge && (
                        <span className="product-tag">
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        className={
                          wishlist.some(
                            (id) => String(id) === String(product.id)
                          )
                            ? "wishlist-button selected"
                            : "wishlist-button"
                        }
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Toggle wishlist"
                      >
                        <Heart
                          size={19}
                          fill={
                            wishlist.some(
                              (id) => String(id) === String(product.id)
                            )
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <button
                        className="product-name-link"
                        onClick={() => openProduct(product.id)}
                      >
                        {product.name}
                      </button>

                      <div className="price-row">
                        <div className="price">
                          ₹{product.price}
                          {product.oldPrice && (
                            <del>₹{product.oldPrice}</del>
                          )}
                        </div>

                        <button
                          className="add-button"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag size={16} /> Add
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <p className="empty-message">
                  No products found. Try another search.
                </p>
              )}
            </AnimatePresence>
          </motion.div>

          <Reveal>
            <div className="home-view-all">
              <button className="primary-button" onClick={openShop}>
                Discover All Products <ArrowRight size={17} />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* FULL WIDTH VIDEO STORY */}

      <section className="bh-video-story relative w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/about-lifestyle.jpg"
        >
          <source src="/videos/babymom.mp4" type="video/mp4" />
        </video>

        <div className="bh-video-overlay" />

        <motion.div
          className="bh-video-content"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">A LITTLE ABOUT US</span>

          <h2>
            For every little dream and every big smile.
          </h2>

          <p>
            At BabyHunt, we believe every childhood deserves beautiful
            little moments. Discover a lovely collection of baby
            essentials, adorable outfits and playful treasures.
          </p>

          <a href="/about" className="primary-button">
            Know More <ArrowRight size={17} />
          </a>
        </motion.div>
      </section>

      {/* NEWSLETTER */}

      <Reveal>
        <section className="newsletter w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="eyebrow">A LITTLE NOTE FROM US</span>

            <h2>Stay close to the cuteness!</h2>

            <p>
              Follow our journey for more lovely little discoveries.
            </p>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="primary-button newsletter-social-button"
            >
              <FaInstagram size={19} /> Follow Us
            </a>
          </div>
        </section>
      </Reveal>

    </main>
  );
}
