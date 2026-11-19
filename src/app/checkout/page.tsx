
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const CART_KEY = "babyhunt-cart";
const ORDERS_KEY = "babyhunt-orders";
const LAST_ORDER_KEY = "babyhunt-last-order";
const FREE_DELIVERY_LIMIT = 999;
const DELIVERY_CHARGE = 50;

export default function CheckoutPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.7,
        ease: [0.22, 1, 1, 1] as [number, number, number, number],
      };

  // Load cart and sync cart changes
  useEffect(() => {
    let isMounted = true;

    const readCart = () => {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem(CART_KEY) || "[]"
        );

        if (isMounted) {
          setCart(Array.isArray(savedCart) ? savedCart : []);
        }
      } catch (error) {
        console.error("Unable to load cart:", error);

        if (isMounted) {
          setCart([]);
        }
      } finally {
        if (isMounted) {
          setLoaded(true);
        }
      }
    };

    const timer = window.setTimeout(readCart, 0);

    function syncCart() {
      readCart();
    }

    window.addEventListener("storage", syncCart);
    window.addEventListener("babyhunt-cart-updated", syncCart);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("babyhunt-cart-updated", syncCart);
    };
  }, []);

  // Save cart
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  // Price calculations
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

  const delivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT
      ? 0
      : DELIVERY_CHARGE;

  const total = subtotal + delivery;

  // Quantity update
  const updateQuantity = (id, change) => {
    const updated = cart.map((item) => {
      if (String(item.id) !== String(id)) {
        return item;
      }

      return {
        ...item,
        quantity: Math.max(
          1,
          Number(item.quantity || 1) + change
        ),
      };
    });

    setCart(updated);

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));

      window.dispatchEvent(
        new Event("babyhunt-cart-updated")
      );
    } catch (error) {
      console.error("Unable to update cart:", error);
    }
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    setCart(updated);

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updated));

      window.dispatchEvent(
        new Event("babyhunt-cart-updated")
      );
    } catch (error) {
      console.error("Unable to remove item:", error);
    }
  };

  // Form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pincode") {
      updatedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setForm((current) => ({
      ...current,
      [name]: updatedValue,
    }));
  };

  // Place order
  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0 || placingOrder) {
      return;
    }

    setPlacingOrder(true);

    const order = {
      orderId: "BH" + Date.now(),
      name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim(),
      address: `${form.address.trim()}, ${form.city.trim()} - ${form.pincode}`,
      customer: {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
      },
      items: cart,
      subtotal,
      delivery,
      total,
      status: "Confirmed",
      paymentMethod: "Cash on Delivery",
      date: new Date().toISOString(),
    };

    try {
      // Save latest order
      localStorage.setItem(
        LAST_ORDER_KEY,
        JSON.stringify(order)
      );

      // Save order history
      const existingOrders = JSON.parse(
        localStorage.getItem(ORDERS_KEY) || "[]"
      );

      const orders = Array.isArray(existingOrders)
        ? existingOrders
        : [];

      orders.unshift(order);

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
      );

      // Clear cart
      localStorage.removeItem(CART_KEY);

      setCart([]);

      window.dispatchEvent(
        new Event("babyhunt-cart-updated")
      );

      router.push("/order-success");
    } catch (error) {
      console.error("Order error:", error);
      setPlacingOrder(false);
      alert("Unable to place order. Please try again.");
    }
  };

  // Loading screen
  if (!loaded) {
    return (
      <main className="checkout-page">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          Preparing your checkout...
        </motion.p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {/* Header */}
      <motion.header
        className="checkout-header"
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: -25 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <Link href="/cart" className="checkout-back">
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <motion.h1
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, scale: 0.8 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          BabyHunt
        </motion.h1>

        <span>Checkout</span>
      </motion.header>

      <div className="checkout-container">
        {/* Title */}
        <motion.div
          className="checkout-title"
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 30 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.15 }}
        >
          <h2>Checkout</h2>
          <p>
            Complete your details to place your order.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            /* Empty cart */
            <motion.div
              key="empty-cart"
              className="checkout-empty"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.85, y: 25 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={transition}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -9, 0] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ShoppingBag size={45} />
              </motion.div>

              <h2>Your cart is empty</h2>

              <p>
                Add some lovely products before checkout.
              </p>

              <Link
                href="/shop"
                className="checkout-button"
              >
                Explore Products
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="checkout-layout"
              className="checkout-layout"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 30 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              {/* Customer Form */}
              <motion.form
                className="checkout-form"
                onSubmit={placeOrder}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: -40 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transition, delay: 0.2 }}
              >
                <motion.h3
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Delivery Information
                </motion.h3>

                {/* Name */}
                <motion.div
                  className="checkout-animated-field"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label htmlFor="name">Full Name</label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    minLength={2}
                    required
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="checkout-animated-field"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                >
                  <label htmlFor="phone">Phone Number</label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  className="checkout-animated-field"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.49 }}
                >
                  <label htmlFor="email">Email Address</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </motion.div>

                {/* Address */}
                <motion.div
                  className="checkout-animated-field"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56 }}
                >
                  <label htmlFor="address">Full Address</label>

                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street and area"
                    rows={4}
                    autoComplete="street-address"
                    minLength={5}
                    required
                  />
                </motion.div>

                {/* City and PIN */}
                <motion.div
                  className="checkout-form-row"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.63 }}
                >
                  <div className="checkout-animated-field">
                    <label htmlFor="city">City</label>

                    <input
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  <div className="checkout-animated-field">
                    <label htmlFor="pincode">PIN Code</label>

                    <input
                      id="pincode"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="PIN Code"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      title="Enter a valid 6-digit PIN code"
                      required
                    />
                  </div>
                </motion.div>

                {/* Payment Information */}
                <div className="checkout-payment-info">
                  <div className="checkout-payment-icon">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>
                      This demo checkout does not collect online
                      payments.
                    </p>
                  </div>
                </div>

                {/* Place Order */}
                <motion.button
                  type="submit"
                  className="checkout-place-order"
                  disabled={placingOrder || cart.length === 0}
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
                >
                  {placingOrder ? (
                    "Placing Your Order..."
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Place Order - ₹{total.toFixed(2)}
                    </>
                  )}
                </motion.button>

                <p className="checkout-demo-note">
                  Demo checkout only. No real payment will be
                  collected.
                </p>
              </motion.form>

              {/* Order Summary */}
              <motion.aside
                className="checkout-summary"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, x: 45 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transition, delay: 0.35 }}
              >
                <h3>Order Summary</h3>

                <AnimatePresence initial={false}>
                  {cart.map((item, index) => (
                    <motion.div
                      className="checkout-item"
                      key={item.id}
                      layout={!shouldReduceMotion}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: 25 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              x: -25,
                              height: 0,
                              marginBottom: 0,
                            }
                      }
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion
                          ? 0
                          : index * 0.06,
                      }}
                    >
                      <div className="checkout-item-info">
                        <h4>{item.name}</h4>

                        <p>
                          ₹{Number(item.price || 0).toFixed(2)}
                        </p>

                        <div className="checkout-quantity">
                          <motion.button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                            disabled={
                              Number(item.quantity || 1) <= 1
                            }
                            whileHover={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 1.15 }
                            }
                            whileTap={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 0.85 }
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </motion.button>

                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={item.quantity}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { opacity: 0, y: 8 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={
                                shouldReduceMotion
                                  ? undefined
                                  : { opacity: 0, y: -8 }
                              }
                              transition={{ duration: 0.2 }}
                            >
                              {Number(item.quantity || 1)}
                            </motion.span>
                          </AnimatePresence>

                          <motion.button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                            whileHover={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 1.15 }
                            }
                            whileTap={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 0.85 }
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </motion.button>

                          <motion.button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="checkout-remove"
                            whileHover={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 1.15 }
                            }
                            whileTap={
                              shouldReduceMotion
                                ? undefined
                                : { scale: 0.85 }
                            }
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>

                      <strong>
                        ₹
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toFixed(2)}
                      </strong>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Price Details */}
                <motion.div
                  className="checkout-total-row"
                  layout
                >
                  <span>Subtotal ({totalItems} items)</span>

                  <motion.span key={subtotal}>
                    ₹{subtotal.toFixed(2)}
                  </motion.span>
                </motion.div>

                <motion.div
                  className="checkout-total-row"
                  layout
                >
                  <span>Delivery</span>

                  <span>
                    {delivery === 0
                      ? "Free"
                      : `₹${delivery.toFixed(2)}`}
                  </span>
                </motion.div>

                <motion.div
                  className="checkout-grand-total"
                  layout
                >
                  <span>Total</span>

                  <motion.strong
                    key={total}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.9 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ₹{total.toFixed(2)}
                  </motion.strong>
                </motion.div>

                <p className="checkout-delivery-note">
                  Free delivery on orders of ₹999 or more.
                </p>

                {/* Trust Information */}
                <motion.div
                  className="checkout-trust"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div>
                    <Truck size={19} />
                    <span>Careful Delivery</span>
                  </div>

                  <div>
                    <ShieldCheck size={19} />
                    <span>Secure Demo Checkout</span>
                  </div>

                  <div>
                    <Check size={19} />
                    <span>Quality Assured</span>
                  </div>
                </motion.div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
