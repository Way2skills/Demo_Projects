
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Package,
  ArrowRight,
  ShoppingBag,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

export default function OrderSuccessPage() {
  const shouldReduceMotion = useReducedMotion();

  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOrder = () => {
      try {
        const savedOrder = localStorage.getItem("babyhunt-last-order");

        if (savedOrder) {
          const parsedOrder = JSON.parse(savedOrder);

          if (
            parsedOrder &&
            typeof parsedOrder === "object" &&
            !Array.isArray(parsedOrder)
          ) {
            if (isMounted) {
              setOrder(parsedOrder);
            }
          }
        }
      } catch (error) {
        console.error("Unable to load order:", error);

        if (isMounted) {
          setOrder(null);
        }
      } finally {
        if (isMounted) {
          setLoaded(true);
        }
      }
    };

    const timer = window.setTimeout(loadOrder, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  const reveal = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  const formatPrice = (value) =>
    `₹${Number(value || 0).toFixed(2)}`;

  const formattedDate = (() => {
    if (!order?.date) return "Not available";

    const date = new Date(order.date);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  })();

  const items = Array.isArray(order?.items)
    ? order.items
    : [];

  const subtotal = Number(
    order?.subtotal ??
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      )
  );

  const delivery = Number(order?.delivery || 0);

  const total = Number(
    order?.total ?? subtotal + delivery
  );

  if (!loaded) {
    return (
      <main className="order-success-page">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          Preparing your order details...
        </motion.p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="order-success-page">
        <motion.div
          className="order-success-card"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 30, scale: 0.95 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={transition}
        >
          <div className="order-success-icon">
            <ShoppingBag size={48} strokeWidth={1.5} />
          </div>

          <h1>No Order Found</h1>

          <p>
            Please place an order before viewing this page.
          </p>

          <Link
            href="/shop"
            className="order-success-button"
          >
            <ShoppingBag size={19} />
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="order-success-page">
      <motion.div
        className="order-success-card"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 45, scale: 0.94 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          ...transition,
          duration: shouldReduceMotion ? 0 : 0.9,
        }}
      >
        {/* Success Icon */}

        <motion.div
          className="order-success-icon"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, scale: 0.3, rotate: -35 }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 160,
                  damping: 12,
                  delay: 0.25,
                }
          }
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.12, 1] }
            }
            transition={{
              duration: 1.8,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <CheckCircle size={54} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Heading */}

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="order-success-eyebrow"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.45,
            }}
          >
            <CheckCircle size={15} />
            Order Confirmed
          </motion.p>

          <h1>Thank You for Your Order!</h1>

          <p className="order-success-message">
            Your order has been placed successfully.
            Thank you for shopping with BabyHunt.
          </p>
        </motion.div>

        {/* Order Information */}

        <motion.div
          className="order-success-details"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: -30 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...transition,
            delay: shouldReduceMotion ? 0 : 0.55,
          }}
        >
          <div className="order-detail-heading">
            <Package size={20} />
            <h2>Order Information</h2>
          </div>

          {[
            ["Order ID", order.orderId],
            ["Customer", order.name],
            ["Phone", order.phone],
            ["Email", order.email],
            ["Order Date", formattedDate],
            ["Order Status", order.status || "Confirmed"],
          ].map(([label, value], index) => (
            <motion.div
              className="order-detail-row"
              key={label}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion
                  ? 0
                  : 0.65 + index * 0.08,
              }}
            >
              <span>{label}</span>
              <strong>{value || "Not available"}</strong>
            </motion.div>
          ))}
        </motion.div>

        {/* Purchased Products */}

        <motion.div
          className="order-success-details"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: 30 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...transition,
            delay: shouldReduceMotion ? 0 : 0.7,
          }}
        >
          <div className="order-detail-heading">
            <ShoppingBag size={20} />
            <h2>Purchased Products</h2>
          </div>

          {items.length > 0 ? (
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div
                  className="order-detail-row"
                  key={`${item.id || item.name || "item"}-${index}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: 20 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: shouldReduceMotion
                      ? 0
                      : 0.8 + index * 0.08,
                  }}
                >
                  <span>
                    {item.name || "Product"} ×{" "}
                    {Number(item.quantity || 1)}
                  </span>

                  <strong>
                    {formatPrice(
                      Number(item.price || 0) *
                        Number(item.quantity || 1)
                    )}
                  </strong>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p>No product details available.</p>
          )}

          <motion.div
            className="order-detail-row"
            layout
          >
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </motion.div>

          <motion.div
            className="order-detail-row"
            layout
          >
            <span>Delivery</span>
            <strong>
              {delivery === 0
                ? "Free"
                : formatPrice(delivery)}
            </strong>
          </motion.div>

          <motion.div
            className="order-detail-row order-final-total"
            layout
          >
            <span>Total Amount</span>

            <motion.strong
              initial={
                shouldReduceMotion
                  ? false
                  : { scale: 0.8 }
              }
              animate={{ scale: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 1,
              }}
            >
              {formatPrice(total)}
            </motion.strong>
          </motion.div>
        </motion.div>

        {/* Delivery Address */}

        <motion.div
          className="order-success-details"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: shouldReduceMotion ? 0 : 0.9,
          }}
        >
          <div className="order-detail-heading">
            <MapPin size={20} />
            <h2>Delivery Address</h2>
          </div>

          <p>
            {order.address || "Address not available"}
          </p>

          {order.customer?.city && (
            <p>{order.customer.city}</p>
          )}

          {order.customer?.pincode && (
            <p>PIN Code: {order.customer.pincode}</p>
          )}
        </motion.div>

        {/* Payment Information */}

        <motion.div
          className="order-success-details"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...transition,
            delay: shouldReduceMotion ? 0 : 1,
          }}
        >
          <div className="order-detail-heading">
            <ShieldCheck size={20} />
            <h2>Payment Information</h2>
          </div>

          <div className="order-detail-row">
            <span>Payment Method</span>
            <strong>
              {order.paymentMethod || "Demo Checkout"}
            </strong>
          </div>

          <div className="order-detail-row">
            <span>Payment Status</span>
            <strong>Not Collected</strong>
          </div>
        </motion.div>

        {/* Note */}

        <motion.p
          className="order-success-note"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{
            delay: shouldReduceMotion ? 0 : 1.05,
          }}
        >
          Demo order confirmation only. No actual payment
          or delivery booking has been made.
        </motion.p>

        {/* Continue Shopping */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 1.1,
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
        >
          <Link
            href="/shop"
            className="order-success-button"
          >
            <ShoppingBag size={19} />
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
