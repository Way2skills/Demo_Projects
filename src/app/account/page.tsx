
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingBag,
  ArrowLeft,
  Save,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const getOrderStatus = (status) => {
  const value = String(status || "Confirmed").toLowerCase();

  if (value === "delivered") return "Delivered";
  if (value === "cancelled") return "Cancelled";
  if (value === "shipped") return "Shipped";
  if (value === "processing") return "Processing";

  return "Confirmed";
};

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-[#edf2ed] text-[#78917d]";
    case "Cancelled":
      return "bg-[#fce8e8] text-[#bd6666]";
    case "Shipped":
      return "bg-[#eaf0fa] text-[#6682ad]";
    case "Processing":
      return "bg-[#f3f1e9] text-[#b8874c]";
    default:
      return "bg-[#e8eee6] text-[#54745c]";
  }
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

export default function AccountPage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [originalProfile, setOriginalProfile] = useState(emptyProfile);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const loadAccount = () => {
      try {
        const savedProfile = JSON.parse(
          localStorage.getItem("babyhunt-user") || "null"
        );

        const lastOrder = JSON.parse(
          localStorage.getItem("babyhunt-last-order") || "null"
        );

        const savedOrders = JSON.parse(
          localStorage.getItem("babyhunt-orders") || "[]"
        );

        let allOrders = Array.isArray(savedOrders)
          ? savedOrders.filter(
              (order) => order && typeof order === "object"
            )
          : [];

        if (
          lastOrder &&
          lastOrder.orderId &&
          !allOrders.some(
            (order) => order.orderId === lastOrder.orderId
          )
        ) {
          allOrders = [lastOrder, ...allOrders];
        }

        const customer = lastOrder?.customer || {};

        const loadedProfile = {
          name:
            savedProfile?.name ||
            customer.name ||
            lastOrder?.name ||
            "",
          email:
            savedProfile?.email ||
            customer.email ||
            lastOrder?.email ||
            "",
          phone:
            savedProfile?.phone ||
            customer.phone ||
            lastOrder?.phone ||
            "",
          address:
            savedProfile?.address ||
            customer.address ||
            lastOrder?.address ||
            "",
        };

        setOrders(allOrders);
        setProfile(loadedProfile);
        setOriginalProfile(loadedProfile);
      } catch (error) {
        console.error("Unable to load account:", error);
      }
    };

    const timer = window.setTimeout(loadAccount, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedProfile = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
    };

    try {
      localStorage.setItem(
        "babyhunt-user",
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setEditing(false);
      setSaved(true);
    } catch (error) {
      console.error("Unable to save profile:", error);
      alert("Unable to save your profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditing(false);
    setSaved(false);
  };

  const latestOrder = orders[0];

  const totalItems = orders.reduce((total, order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return (
      total +
      items.reduce(
        (itemTotal, item) =>
          itemTotal + Number(item?.quantity || 1),
        0
      )
    );
  }, 0);

  return (
    <motion.main
      className="min-h-screen bg-[#f7f5ef] text-[#443a38]"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e6e1d6] bg-[#f7f5ef]/95 px-5 py-5 backdrop-blur-md sm:px-10"
        initial={
          shouldReduceMotion
            ? false
            : {
                y: -50,
                opacity: 0,
              }
        }
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#827c70] transition-colors hover:text-[#234634]"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-[#234634]"
        >
          BabyHunt
        </Link>

        <span className="text-sm font-medium text-[#827c70]">
          My Account
        </span>
      </motion.header>

      <motion.div
        className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Heading */}
        <motion.div
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="mb-10"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#234634]">
            Your Personal Space
          </p>

          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            My Account
          </h1>

          <p className="text-sm text-[#827c70] sm:text-base">
            Manage your profile and keep track of your BabyHunt orders.
          </p>
        </motion.div>

        {/* Welcome Banner */}
        <motion.section
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#e8eee6] via-[#edf0e8] to-[#f1f0e9] p-7 sm:p-10"
        >
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-[#54745c]">
                Welcome to BabyHunt
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Hello, {profile.name || "Lovely Customer"}!
              </h2>

              <p className="mt-2 text-sm text-[#827c70]">
                Your little one&apos;s happiness starts here.
              </p>
            </div>

            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-[#234634] shadow-sm"
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -7, 0] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <UserRound size={38} strokeWidth={1.5} />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/30" />
          <div className="pointer-events-none absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-[#c6d0bf]/20" />
        </motion.section>

        {/* Stats */}
        <motion.div
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="flex items-center gap-4 rounded-2xl border border-[#e8e4d9] bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8eee6] text-[#234634]">
              <ShoppingBag size={23} />
            </div>

            <div>
              <p className="text-sm text-[#827c70]">
                Total Orders
              </p>

              <p className="text-2xl font-bold">
                {orders.length}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="flex items-center gap-4 rounded-2xl border border-[#e8e4d9] bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf2ed] text-[#78917d]">
              <Package size={23} />
            </div>

            <div>
              <p className="text-sm text-[#827c70]">
                Total Items Purchased
              </p>

              <p className="text-2xl font-bold">
                {totalItems}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Profile and Orders */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.5fr_1fr]">
          {/* Profile Card */}
          <motion.section
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="rounded-3xl border border-[#e8e4d9] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-[#827c70]">
                  Your profile details
                </p>
              </div>

              {!editing && (
                <motion.button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setSaved(false);
                  }}
                  whileHover={
                    shouldReduceMotion ? {} : { scale: 1.05 }
                  }
                  whileTap={
                    shouldReduceMotion ? {} : { scale: 0.95 }
                  }
                  className="flex items-center gap-2 rounded-xl bg-[#e8eee6] px-4 py-2.5 text-sm font-semibold text-[#54745c] transition-colors hover:bg-[#dce5d8]"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </motion.button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="account-name"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  >
                    <UserRound size={16} className="text-[#234634]" />
                    Full Name
                  </label>

                  <input
                    id="account-name"
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[#e4dfd3] bg-[#fbfaf5] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#969184] focus:border-[#315b46] focus:ring-2 focus:ring-[#e8eee6] disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="account-email"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  >
                    <Mail size={16} className="text-[#234634]" />
                    Email Address
                  </label>

                  <input
                    id="account-email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-[#e4dfd3] bg-[#fbfaf5] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#969184] focus:border-[#315b46] focus:ring-2 focus:ring-[#e8eee6] disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="account-phone"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  >
                    <Phone size={16} className="text-[#234634]" />
                    Phone Number
                  </label>

                  <input
                    id="account-phone"
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10 digit phone number"
                    placeholder="Enter 10 digit phone number"
                    className="w-full rounded-xl border border-[#e4dfd3] bg-[#fbfaf5] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#969184] focus:border-[#315b46] focus:ring-2 focus:ring-[#e8eee6] disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="account-address"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  >
                    <MapPin size={16} className="text-[#234634]" />
                    Delivery Address
                  </label>

                  <textarea
                    id="account-address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!editing}
                    rows={3}
                    placeholder="Enter your delivery address"
                    className="w-full resize-none rounded-xl border border-[#e4dfd3] bg-[#fbfaf5] px-4 py-3 text-sm outline-none transition-all placeholder:text-[#969184] focus:border-[#315b46] focus:ring-2 focus:ring-[#e8eee6] disabled:cursor-not-allowed disabled:opacity-75"
                  />
                </div>
              </div>

              {/* Save and Cancel */}
              <AnimatePresence>
                {editing && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-7 flex flex-wrap gap-3"
                  >
                    <motion.button
                      type="submit"
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { scale: 1.03, y: -2 }
                      }
                      whileTap={
                        shouldReduceMotion ? {} : { scale: 0.97 }
                      }
                      className="flex items-center gap-2 rounded-xl bg-[#234634] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#234634]/20 transition-colors hover:bg-[#45694f]"
                    >
                      <Save size={17} />
                      Save Changes
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-xl border border-[#e4dfd3] px-6 py-3 text-sm font-semibold text-[#827c70] transition-colors hover:bg-[#f7f5ef]"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Saved Message */}
              <AnimatePresence>
                {saved && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-center gap-2 text-sm font-medium text-[#78917d]"
                  >
                    <CheckCircle2 size={18} />
                    Profile saved successfully!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.section>

          {/* Orders Card */}
          <motion.section
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="rounded-3xl border border-[#e8e4d9] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  My Orders
                </h2>

                <p className="mt-1 text-sm text-[#827c70]">
                  Your shopping history
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8eee6] text-[#234634]">
                <Package size={22} />
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-2xl bg-[#fbfaf5] px-5 py-9 text-center">
                <ShoppingBag
                  size={34}
                  className="mx-auto mb-3 text-[#315b46]"
                />

                <p className="font-semibold">
                  No orders yet
                </p>

                <p className="mt-1 text-sm text-[#827c70]">
                  Your orders will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order, index) => {
                  const status = getOrderStatus(order.status);

                  const itemCount = Array.isArray(order.items)
                    ? order.items.reduce(
                        (total, item) =>
                          total + Number(item?.quantity || 1),
                        0
                      )
                    : 0;

                  return (
                    <motion.div
                      key={order.orderId || index}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: 20 }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                      }}
                      className="rounded-2xl border border-[#e8e4d9] p-4 transition-colors hover:bg-[#fbfaf5]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-[#827c70]">
                            Order ID
                          </p>

                          <p className="mt-1 break-all text-sm font-bold">
                            {order.orderId || "Order details"}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                        <span className="text-[#827c70]">
                          {itemCount} Items
                        </span>

                        <strong>
                          ₹{formatPrice(order.total)}
                        </strong>
                      </div>

                      <p className="mt-2 text-xs text-[#a89995]">
                        {formatDate(order.date)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="mt-6"
            >
              <Link
                href="/my-orders"
                className="flex w-full items-center justify-center rounded-xl border border-[#315b46] px-5 py-3 text-sm font-semibold text-[#234634] transition-all hover:bg-[#e8eee6]"
              >
                View All Orders
              </Link>
            </motion.div>
          </motion.section>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="mt-8 rounded-2xl border border-[#e8e4d9] bg-white p-6 text-center"
        >
          <h3 className="text-lg font-bold">
            Thank you for choosing BabyHunt
          </h3>

          <p className="mt-2 text-sm text-[#827c70]">
            Making little moments more special, one purchase at a time.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#234634] transition-colors hover:text-[#294b39]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
