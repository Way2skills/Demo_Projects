
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  CalendarDays,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const formatPrice = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getOrderStatus = (status) => {
  if (!status) return "Confirmed";

  const normalized = String(status).toLowerCase();

  if (normalized === "delivered") return "Delivered";
  if (normalized === "cancelled") return "Cancelled";
  if (normalized === "shipped") return "Shipped";
  if (normalized === "processing") return "Processing";

  return "Confirmed";
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("babyhunt-orders") || "[]"
        );

        const lastOrder = JSON.parse(
          localStorage.getItem("babyhunt-last-order") || "null"
        );

        let allOrders = Array.isArray(savedOrders)
          ? savedOrders
          : [];

        if (
          lastOrder &&
          lastOrder.orderId &&
          !allOrders.some(
            (order) => order?.orderId === lastOrder.orderId
          )
        ) {
          allOrders = [lastOrder, ...allOrders];
        }

        allOrders = allOrders.filter(
          (order) => order && typeof order === "object"
        );

        if (isMounted) {
          setOrders(allOrders);
        }
      } catch (error) {
        console.error("Unable to load orders:", error);

        if (isMounted) {
          setOrders([]);
        }
      }
    };

    const timer = window.setTimeout(loadOrders, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  const toggleOrder = (orderKey) => {
    setExpandedOrder((current) =>
      current === orderKey ? null : orderKey
    );
  };

  const animationProps = shouldReduceMotion
    ? {}
    : {
        variants: pageVariants,
        initial: "hidden",
        animate: "visible",
      };

  return (
    <motion.main
      className="my-orders-page"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="my-orders-header"
        initial={shouldReduceMotion ? false : {
          y: -30,
          opacity: 0,
        }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
      >
        <Link href="/" className="my-orders-back">
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <h1>BabyHunt</h1>

        <span>My Orders</span>
      </motion.header>

      {/* Main Content */}
      <motion.div
        className="my-orders-container"
        {...animationProps}
      >
        <motion.div
          className="my-orders-title"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <h2>My Orders</h2>
          <p>
            View your previous purchases and order details.
          </p>
        </motion.div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <motion.div
            className="my-orders-empty"
            initial={shouldReduceMotion ? false : {
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag size={48} />
            </motion.div>

            <h2>No Orders Yet</h2>

            <p>
              You haven&apos;t placed any orders yet.
              Start shopping to see your orders here.
            </p>

            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { scale: 1.04, y: -3 }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : { scale: 0.97 }
              }
            >
              <Link
                href="/shop"
                className="my-orders-button"
              >
                Start Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          /* Orders List */
          <motion.div
            className="my-orders-list"
            variants={shouldReduceMotion ? undefined : pageVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
          >
            {orders.map((order, index) => {
              const orderKey =
                order.orderId || `order-${index}`;

              const isExpanded =
                expandedOrder === orderKey;

              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const totalQuantity = items.reduce(
                (total, item) =>
                  total + Number(item?.quantity || 1),
                0
              );

              const subtotal =
                order.subtotal ??
                items.reduce(
                  (total, item) =>
                    total +
                    Number(item?.price || 0) *
                      Number(item?.quantity || 1),
                  0
                );

              const delivery = Number(order.delivery || 0);

              const total =
                order.total ??
                Number(subtotal) + delivery;

              return (
                <motion.div
                  className="my-order-card"
                  key={orderKey}
                  variants={
                    shouldReduceMotion ? undefined : itemVariants
                  }
                  layout={!shouldReduceMotion}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -4,
                          transition: { duration: 0.25 },
                        }
                  }
                >
                  {/* Order Header */}
                  <div className="my-order-top">
                    <div>
                      <span className="my-order-label">
                        Order ID
                      </span>

                      <h3>
                        {order.orderId || "Order details"}
                      </h3>
                    </div>

                    <motion.span
                      className="my-order-status"
                      initial={shouldReduceMotion ? false : {
                        opacity: 0,
                        scale: 0.85,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      {getOrderStatus(order.status)}
                    </motion.span>
                  </div>

                  {/* Order Information */}
                  <div className="my-order-info">
                    <div>
                      <CalendarDays size={17} />

                      <span>{formatDate(order.date)}</span>
                    </div>

                    <div>
                      <Package size={17} />

                      <span>
                        {totalQuantity} Items
                      </span>
                    </div>

                    <motion.strong
                      key={total}
                      initial={shouldReduceMotion ? false : {
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      ₹{formatPrice(total)}
                    </motion.strong>
                  </div>

                  {/* Expand Button */}
                  <motion.button
                    type="button"
                    className="my-order-toggle"
                    onClick={() => toggleOrder(orderKey)}
                    whileHover={
                      shouldReduceMotion ? {} : { x: 3 }
                    }
                    whileTap={
                      shouldReduceMotion ? {} : { scale: 0.98 }
                    }
                    aria-expanded={isExpanded}
                  >
                    {isExpanded
                      ? "Hide Order Details"
                      : "View Order Details"}

                    <motion.span
                      animate={{
                        rotate: isExpanded ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </motion.span>
                  </motion.button>

                  {/* Expanded Order Details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="my-order-details"
                        key="order-details"
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <h4>Purchased Products</h4>

                        {items.length > 0 ? (
                          items.map((item, itemIndex) => {
                            const quantity = Number(
                              item?.quantity || 1
                            );

                            const itemTotal =
                              Number(item?.price || 0) *
                              quantity;

                            return (
                              <motion.div
                                className="my-order-product"
                                key={
                                  item.id ||
                                  `${item.name || "product"}-${itemIndex}`
                                }
                                initial={
                                  shouldReduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        x: -15,
                                      }
                                }
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                  delay: shouldReduceMotion
                                    ? 0
                                    : itemIndex * 0.06,
                                }}
                              >
                                <div>
                                  <strong>
                                    {item?.name || "Product"}
                                  </strong>

                                  <p>
                                    Quantity: {quantity}
                                  </p>
                                </div>

                                <strong>
                                  ₹{formatPrice(itemTotal)}
                                </strong>
                              </motion.div>
                            );
                          })
                        ) : (
                          <p>No product details available.</p>
                        )}

                        {/* Price Summary */}
                        <motion.div
                          className="my-order-price"
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 12 }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{ duration: 0.35 }}
                        >
                          <div>
                            <span>Subtotal</span>
                            <strong>
                              ₹{formatPrice(subtotal)}
                            </strong>
                          </div>

                          <div>
                            <span>Delivery</span>
                            <strong>
                              {delivery === 0
                                ? "Free"
                                : `₹${formatPrice(delivery)}`}
                            </strong>
                          </div>

                          <div className="my-order-final-total">
                            <span>Total Amount</span>
                            <strong>
                              ₹{formatPrice(total)}
                            </strong>
                          </div>
                        </motion.div>

                        {/* Delivery Address */}
                        <motion.div
                          className="my-order-address"
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 12 }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{ duration: 0.35 }}
                        >
                          <MapPin size={18} />

                          <div>
                            <strong>Delivery Address</strong>

                            <p>
                              {order.address ||
                                order.customer?.address ||
                                "Address unavailable"}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </motion.main>
  );
}
