
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import products from "@/data/products";

const CLOTHING_SIZES = [
  "0-3 Months",
  "3-6 Months",
  "6-12 Months",
  "1-2 Years",
  "2-3 Years",
  "3-5 Years",
];

export default function ProductDetailsPage() {
  const params = useParams();
  const shouldReduceMotion = useReducedMotion();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  useEffect(() => {
    let isMounted = true;

    const loadProduct = () => {
      const selectedProduct = products.find(
        (item) => String(item.id) === String(params.id)
      );

      if (isMounted) {
        setProduct(selectedProduct || null);
        setLoading(false);
        setQuantity(1);
        setSelectedSize("");
      }
    };

    const timer = window.setTimeout(loadProduct, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [params.id]);

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => {
      setAdded(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [added]);

  const isClothing =
    product?.category === "Baby Clothing";

  const availableSizes =
    Array.isArray(product?.ageRange) &&
    product.ageRange.length > 0
      ? CLOTHING_SIZES.filter((size) =>
          product.ageRange.includes(size)
        )
      : CLOTHING_SIZES;

  const addToCart = () => {
    if (!product) return;

    if (isClothing && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("babyhunt-cart") || "[]"
      );

      const cart = Array.isArray(savedCart)
        ? savedCart
        : [];

      const cartItem = {
        ...product,
        quantity,
        selectedColor: null,
        selectedColorValue: null,
        selectedSize: isClothing
          ? selectedSize
          : null,
        cartItemId: [
          product.id,
          "default",
          isClothing ? selectedSize : "default",
        ].join("-"),
      };

      const existing = cart.find(
        (item) =>
          String(item.id) === String(product.id) &&
          (item.selectedColor || null) === null &&
          (item.selectedSize || null) ===
            cartItem.selectedSize
      );

      let updatedCart;

      if (existing) {
        updatedCart = cart.map((item) =>
          item.cartItemId === existing.cartItemId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) + quantity,
              }
            : item
        );
      } else {
        updatedCart = [...cart, cartItem];
      }

      localStorage.setItem(
        "babyhunt-cart",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(
        new Event("babyhunt-cart-updated")
      );

      window.dispatchEvent(
        new Event("babyhunt-open-cart")
      );

      setAdded(true);
    } catch (error) {
      console.error(
        "Unable to add product to cart:",
        error
      );
    }
  };

  if (loading) {
    return (
      <main className="product-details-loading">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          Loading your little favourite...
        </motion.p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-loading">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <h2>Product not found</h2>
          <p>
            Sorry, this little favourite is unavailable.
          </p>

          <Link href="/" className="product-back-link">
            <ArrowLeft size={18} />
            Back to Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: -25 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, duration: 0.5 }}
        >
          <Link href="/" className="product-back-link">
            <ArrowLeft size={18} />
            Back to Shopping
          </Link>
        </motion.div>

        <div className="product-details-grid">
          {/* PRODUCT IMAGE */}
          <motion.div
            className="product-details-image"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.88, y: 35 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...transition, duration: 0.9 }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -7,
                    transition: { duration: 0.3 },
                  }
            }
          >
            <motion.img
              key={product.image}
              src={product.image}
              alt={product.name}
              draggable="false"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />

            {product.badge && (
              <motion.span
                className="product-details-badge"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.7 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                }}
              >
                {product.badge}
              </motion.span>
            )}
          </motion.div>

          {/* PRODUCT INFORMATION */}
          <motion.div
            className="product-details-info"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, x: 55 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{
              ...transition,
              delay: 0.15,
            }}
          >
            <motion.p
              className="product-details-category"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 15 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.5,
              }}
            >
              {product.category}
            </motion.p>

            <motion.h1
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
            >
              {product.name}
            </motion.h1>

            <motion.p
              className="product-details-description"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.6,
              }}
            >
              {product.description}
            </motion.p>

            <motion.div
              className="product-details-price"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.9 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.55,
                duration: 0.5,
              }}
            >
              <strong>₹{product.price}</strong>

              {product.oldPrice && (
                <del>₹{product.oldPrice}</del>
              )}
            </motion.div>

            {product.oldPrice && (
              <motion.p
                className="product-details-offer"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: -15 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.65,
                  duration: 0.5,
                }}
              >
                You save ₹
                {product.oldPrice - product.price}
              </motion.p>
            )}

            {/* CLOTHING SIZE SELECTION */}
            {isClothing && (
              <motion.div
                className="bh-variant-section"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.72,
                  duration: 0.5,
                }}
              >
                <div className="bh-variant-heading">
                  <span>Choose Size</span>

                  {selectedSize && (
                    <strong>{selectedSize}</strong>
                  )}
                </div>

                <div className="bh-size-options">
                  {availableSizes.map((size) => (
                    <motion.button
                      key={size}
                      type="button"
                      className={`bh-size-option ${
                        selectedSize === size
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -3 }
                      }
                      whileTap={
                        shouldReduceMotion
                          ? undefined
                          : { scale: 0.95 }
                      }
                      aria-pressed={
                        selectedSize === size
                      }
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* QUANTITY */}
            <motion.div
              className="product-quantity"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.75,
                duration: 0.5,
              }}
            >
              <span>Quantity</span>

              <div>
                <motion.button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.1 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.85 }
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </motion.button>

                <AnimatePresence mode="popLayout">
                  <motion.strong
                    key={quantity}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {quantity}
                  </motion.strong>
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.1 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.85 }
                  }
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* ADD TO CART */}
            <motion.button
              type="button"
              className="product-add-button"
              onClick={addToCart}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.025, y: -3 }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : { scale: 0.96 }
              }
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
              }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                    }}
                  >
                    <Check size={19} />
                    Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                    }}
                  >
                    <ShoppingBag size={19} />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* BENEFITS */}
            <motion.div
              className="product-details-benefits"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 25 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 0.6,
              }}
            >
              {[
                {
                  icon: Truck,
                  label: "Careful Delivery",
                },
                {
                  icon: ShieldCheck,
                  label: "Quality Assured",
                },
                {
                  icon: Heart,
                  label: "Made with Love",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.label}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 15 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion
                        ? 0
                        : 1 + index * 0.12,
                      duration: 0.4,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -5, scale: 1.04 }
                    }
                  >
                    <Icon size={20} />
                    <span>{benefit.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SIZE STYLES */}
      <style jsx global>{`
        .bh-variant-section {
          margin: 22px 0;
        }

        .bh-variant-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 13px;
          color: #493b3d;
          font-size: 15px;
          font-weight: 700;
        }

        .bh-variant-heading strong {
          color: #315b46;
          font-size: 13px;
          font-weight: 600;
        }

        .bh-size-options {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .bh-size-option {
          padding: 10px 14px;
          border: 1px solid #e5e0d4;
          border-radius: 10px;
          background: #fffaf9;
          color: #57484b;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bh-size-option:hover,
        .bh-size-option.active {
          border-color: #54745c;
          background: #54745c;
          color: white;
        }

        @media (max-width: 480px) {
          .bh-size-options {
            gap: 7px;
          }

          .bh-size-option {
            padding: 9px 10px;
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  );
}
