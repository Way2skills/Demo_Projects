
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Truck,
  ShieldCheck,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CART_KEY = "babyhunt-cart";
const FREE_DELIVERY_LIMIT = 999;
const PRODUCTS_PER_PAGE = 6;

const getItemKey = (item) =>
  String(
    item.cartItemId ||
      [
        item.id,
        item.selectedColor || "default",
        item.selectedSize || "default",
      ].join("-")
  );

// PRODUCT COLOUR IMAGE PREVIEW
function CartColorPreview({ src, color, alt }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !src) return;

    let cancelled = false;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      if (cancelled) return;

      const width = image.naturalWidth;
      const height = image.naturalHeight;

      if (!width || !height) return;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);

      if (!color || !/^#[0-9a-f]{6}$/i.test(color)) return;

      try {
        const imageData = ctx.getImageData(
          0,
          0,
          width,
          height
        );

        const pixels = imageData.data;
        const pixelCount = width * height;

        const cornerIndexes = [
          0,
          (width - 1) * 4,
          (height - 1) * width * 4,
          (pixelCount - 1) * 4,
        ];

        const background = [0, 0, 0];

        cornerIndexes.forEach((index) => {
          for (let channel = 0; channel < 3; channel++) {
            background[channel] += pixels[index + channel] / 4;
          }
        });

        const visited = new Uint8Array(pixelCount);
        const queue = new Int32Array(pixelCount);

        let head = 0;
        let tail = 0;

        const addBackgroundPixel = (index) => {
          if (
            index < 0 ||
            index >= pixelCount ||
            visited[index]
          ) {
            return;
          }

          const p = index * 4;

          const distance =
            Math.abs(pixels[p] - background[0]) +
            Math.abs(pixels[p + 1] - background[1]) +
            Math.abs(pixels[p + 2] - background[2]);

          if (pixels[p + 3] === 0 || distance < 75) {
            visited[index] = 1;
            queue[tail++] = index;
          }
        };

        for (let x = 0; x < width; x++) {
          addBackgroundPixel(x);
          addBackgroundPixel((height - 1) * width + x);
        }

        for (let y = 0; y < height; y++) {
          addBackgroundPixel(y * width);
          addBackgroundPixel(y * width + width - 1);
        }

        while (head < tail) {
          const index = queue[head++];

          const x = index % width;
          const y = Math.floor(index / width);

          if (x > 0) addBackgroundPixel(index - 1);
          if (x < width - 1) addBackgroundPixel(index + 1);
          if (y > 0) addBackgroundPixel(index - width);
          if (y < height - 1) addBackgroundPixel(index + width);
        }

        const target = [
          parseInt(color.slice(1, 3), 16),
          parseInt(color.slice(3, 5), 16),
          parseInt(color.slice(5, 7), 16),
        ];

        for (let i = 0; i < pixelCount; i++) {
          if (visited[i]) continue;

          const p = i * 4;

          if (pixels[p + 3] === 0) continue;

          const brightness =
            (pixels[p] * 0.299 +
              pixels[p + 1] * 0.587 +
              pixels[p + 2] * 0.114) /
            255;

          const factor = 0.35 + brightness * 0.85;

          pixels[p] = Math.min(255, target[0] * factor);
          pixels[p + 1] = Math.min(255, target[1] * factor);
          pixels[p + 2] = Math.min(255, target[2] * factor);
        }

        ctx.putImageData(imageData, 0, 0);
      } catch (error) {
        console.error("Cart colour preview failed:", error);
      }
    };

    image.onerror = () => {
      console.error("Cart image could not load:", src);
    };

    return () => {
      cancelled = true;
    };
  }, [src, color]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
}

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // READ CART FROM LOCAL STORAGE
  const readCart = useCallback(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      setCart(Array.isArray(saved) ? saved : []);
    } catch {
      setCart([]);
    }

    setReady(true);
  }, []);

  // SAVE CART
  const saveCart = useCallback((nextCart) => {
    setCart(nextCart);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(nextCart)
    );

    window.dispatchEvent(
      new Event("babyhunt-cart-updated")
    );
  }, []);

  // INITIAL CART LOAD + STORAGE EVENTS
  useEffect(() => {
    const handleStorage = () => {
      readCart();
    };

    // Defer initial read until after the effect setup.
    const initialRead = window.setTimeout(() => {
      readCart();
    }, 0);

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "babyhunt-cart-updated",
      handleStorage
    );

    return () => {
      window.clearTimeout(initialRead);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "babyhunt-cart-updated",
        handleStorage
      );
    };
  }, [readCart]);

  // PAGINATION
  const totalPages = Math.ceil(
    cart.length / PRODUCTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(1, totalPages)
  );

  const paginatedCart = useMemo(() => {
    const startIndex =
      (safePage - 1) * PRODUCTS_PER_PAGE;

    return cart.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [cart, safePage]);

  const goToPage = (page) => {
    const nextPage = Math.max(
      1,
      Math.min(page, Math.max(1, totalPages))
    );

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateQuantity = (item, change) => {
    const key = getItemKey(item);

    const updated = cart.map((cartItem) => {
      if (getItemKey(cartItem) !== key) {
        return cartItem;
      }

      return {
        ...cartItem,
        quantity: Math.max(
          1,
          Number(cartItem.quantity || 1) + change
        ),
      };
    });

    saveCart(updated);
  };

  const removeItem = (item) => {
    const key = getItemKey(item);

    saveCart(
      cart.filter(
        (cartItem) => getItemKey(cartItem) !== key
      )
    );
  };

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  const totalItems = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_LIMIT - subtotal
  );

  const hasFreeDelivery =
    subtotal >= FREE_DELIVERY_LIMIT;

  if (!ready) {
    return (
      <div className="bh-cart-loading">
        Loading your bag...
      </div>
    );
  }

  return (
    <main className="bh-cart-page">
      <div className="bh-cart-container">
        <motion.div
          className="bh-cart-breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Shopping Bag</span>
        </motion.div>

        <motion.div
          className="bh-cart-heading"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <span className="bh-cart-eyebrow">
              YOUR LITTLE ONE&apos;S PICKS
            </span>

            <h1>Shopping Bag</h1>

            <p>
              Everything you love, gathered in one lovely
              place.
            </p>
          </div>

          <span className="bh-cart-count">
            {totalItems}{" "}
            {totalItems === 1 ? "Item" : "Items"}
          </span>
        </motion.div>

        {cart.length === 0 ? (
          <motion.section
            className="bh-cart-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bh-cart-empty-icon">
              <ShoppingBag size={36} strokeWidth={1.4} />
            </div>

            <h2>
              Your bag is waiting for something lovely
            </h2>

            <p>
              You haven&apos;t added anything to your shopping
              bag yet. Explore our collection and find
              something special.
            </p>

            <Link
              href="/shop"
              className="bh-cart-primary-btn"
            >
              Explore Products <ArrowRight size={17} />
            </Link>

            <Link
              href="/"
              className="bh-cart-back-link"
            >
              Back to Home
            </Link>
          </motion.section>
        ) : (
          <div className="bh-cart-layout">
            <section className="bh-cart-items-section">
              <div className="bh-cart-section-title">
                <h2>Your Items</h2>
                <span>{cart.length} products</span>
              </div>

              <div className="bh-cart-items">
                <AnimatePresence initial={false}>
                  {paginatedCart.map((item) => (
                    <motion.article
                      key={getItemKey(item)}
                      className="bh-cart-item"
                      layout
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -25,
                        height: 0,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <Link
                        href={`/products/${item.id}`}
                        className="bh-cart-product-image"
                      >
                        <CartColorPreview
                          src={
                            item.image ||
                            "/images/placeholder.jpg"
                          }
                          color={
                            item.selectedColorValue || null
                          }
                          alt={`${item.name || "Baby product"} ${
                            item.selectedColor || ""
                          }`}
                        />
                      </Link>

                      <div className="bh-cart-product-info">
                        <div className="bh-cart-product-top">
                          <div>
                            <span className="bh-cart-category">
                              {item.category || "Baby Collection"}
                            </span>

                            <Link href={`/products/${item.id}`}>
                              <h3>{item.name}</h3>
                            </Link>
                          </div>

                          <button
                            type="button"
                            className="bh-cart-remove"
                            onClick={() => removeItem(item)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        {(item.selectedColor ||
                          item.selectedSize) && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: "12px",
                              marginTop: "10px",
                              marginBottom: "12px",
                              fontSize: "13px",
                              color: "#686868",
                            }}
                          >
                            {item.selectedColor && (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "7px",
                                }}
                              >
                                <span>Color:</span>

                                <span
                                  style={{
                                    width: "17px",
                                    height: "17px",
                                    borderRadius: "50%",
                                    background:
                                      item.selectedColorValue ||
                                      "#d8b5a5",
                                    border: "1px solid #ddd",
                                    display: "inline-block",
                                  }}
                                />

                                <strong style={{ color: "#333" }}>
                                  {item.selectedColor}
                                </strong>
                              </span>
                            )}

                            {item.selectedSize && (
                              <span>
                                Size:{" "}
                                <strong style={{ color: "#333" }}>
                                  {item.selectedSize}
                                </strong>
                              </span>
                            )}
                          </div>
                        )}

                        <div className="bh-cart-product-bottom">
                          <div className="bh-cart-quantity">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item, -1)}
                              disabled={
                                Number(item.quantity || 1) <= 1
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span>
                              {Number(item.quantity || 1)}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <strong>
                            ₹
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 1)
                            ).toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <p className="bh-cart-unit-price">
                          ₹
                          {Number(item.price || 0).toLocaleString(
                            "en-IN"
                          )}{" "}
                          per item
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <motion.div
                  className="bh-cart-pagination"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button
                    type="button"
                    className="bh-cart-page-arrow"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={19} />
                    <span>Previous</span>
                  </button>

                  <div className="bh-cart-page-numbers">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        className={
                          safePage === page
                            ? "bh-cart-page-number active"
                            : "bh-cart-page-number"
                        }
                        aria-current={
                          safePage === page ? "page" : undefined
                        }
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="bh-cart-page-arrow"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight size={19} />
                  </button>
                </motion.div>
              )}

              <div className="bh-cart-page-info">
                Showing{" "}
                {Math.min(
                  (safePage - 1) * PRODUCTS_PER_PAGE + 1,
                  cart.length
                )}{" "}
                -{" "}
                {Math.min(
                  safePage * PRODUCTS_PER_PAGE,
                  cart.length
                )}{" "}
                of {cart.length} products
              </div>

              <Link
                href="/shop"
                className="bh-cart-continue"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </section>

            <aside className="bh-cart-summary">
              <h2>Order Summary</h2>

              <div className="bh-cart-delivery-box">
                <div className="bh-cart-delivery-icon">
                  <Truck size={21} />
                </div>

                <div>
                  {hasFreeDelivery ? (
                    <>
                      <strong>
                        You&apos;ve unlocked free delivery!
                      </strong>

                      <p>
                        Your order qualifies for free delivery.
                      </p>
                    </>
                  ) : (
                    <>
                      <strong>
                        You&apos;re close to free delivery
                      </strong>

                      <p>
                        Add ₹
                        {remainingForFreeDelivery.toLocaleString(
                          "en-IN"
                        )}{" "}
                        more to unlock free delivery.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="bh-cart-progress">
                <div
                  className="bh-cart-progress-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / FREE_DELIVERY_LIMIT) * 100
                    )}%`,
                  }}
                />
              </div>

              <div className="bh-cart-summary-line">
                <span>Subtotal ({totalItems} items)</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="bh-cart-summary-line">
                <span>Delivery</span>

                <strong
                  className={
                    hasFreeDelivery ? "bh-cart-free" : ""
                  }
                >
                  {hasFreeDelivery
                    ? "FREE"
                    : "Calculated at checkout"}
                </strong>
              </div>

              <div className="bh-cart-summary-divider" />

              <div className="bh-cart-total">
                <span>Subtotal</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <p className="bh-cart-tax-note">
                Final delivery charges, if applicable, will
                be shown at checkout.
              </p>

              <Link
                href="/checkout"
                className="bh-cart-checkout-btn"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              <div className="bh-cart-trust">
                <div>
                  <ShieldCheck size={18} />
                  <span>Secure Checkout</span>
                </div>

                <div>
                  <PackageCheck size={18} />
                  <span>Carefully Packed</span>
                </div>
              </div>

              <p className="bh-cart-help">
                Need help with your order?{" "}
                <Link href="/account">
                  Visit your account
                </Link>
              </p>
            </aside>
          </div>
        )}
      </div>

      {/* PAGINATION STYLE */}
      <style jsx global>{`
        .bh-cart-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 28px 0 10px;
        }

        .bh-cart-page-numbers {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .bh-cart-page-number,
        .bh-cart-page-arrow {
          min-width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 12px;
          border: 1px solid #e6e1d6;
          border-radius: 8px;
          background: #fff;
          color: #493b37;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .bh-cart-page-number:hover,
        .bh-cart-page-arrow:not(:disabled):hover {
          border-color: #54745c;
          color: #54745c;
          transform: translateY(-2px);
        }

        .bh-cart-page-number.active {
          border-color: #54745c;
          background: #54745c;
          color: #fff;
          box-shadow: 0 5px 14px #54745c33;
        }

        .bh-cart-page-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .bh-cart-page-info {
          margin: 10px 0 20px;
          color: #887974;
          font-size: 12px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .bh-cart-pagination {
            gap: 7px;
          }

          .bh-cart-page-arrow {
            min-width: 38px;
            padding: 0 8px;
            font-size: 12px;
          }

          .bh-cart-page-number {
            min-width: 34px;
            height: 36px;
            padding: 0 8px;
          }

          .bh-cart-page-numbers {
            gap: 5px;
          }
        }
      `}</style>
    </main>
  );
}
