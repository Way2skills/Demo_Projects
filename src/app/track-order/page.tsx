
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Search,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderId.trim()) return;

    const message = `Hello BabyHunt! I would like to check my order status.\nOrder ID: ${orderId.trim()}`;

    window.open(
      `https://wa.me/91812233694?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="bh-track-page">
      <section className="bh-track-hero">
        <div className="bh-track-container">
          <motion.div
            className="bh-track-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bh-track-eyebrow">
              YOUR ORDER, YOUR HAPPINESS
            </span>

            <h1>
              Track Your <span>Order</span>
            </h1>

            <p>
              Your little one&apos;s happiness is on its way.
              Enter your order ID to get an update from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bh-track-content">
        <div className="bh-track-container">
          <motion.div
            className="bh-track-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bh-track-icon">
              <Package size={30} />
            </div>

            <h2>Where is your order?</h2>

            <p>
              Enter your order ID below and our team will help
              you with the latest order status.
            </p>

            <form onSubmit={handleTrackOrder}>
              <label htmlFor="orderId">Order ID</label>

              <div className="bh-track-input-wrap">
                <Search size={19} />

                <input
                  id="orderId"
                  type="text"
                  placeholder="Enter your order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="bh-track-submit">
                Track My Order
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="bh-track-note">
              <ShieldCheck size={17} />
              Your order information is handled securely.
            </div>
          </motion.div>

          <div className="bh-track-support">
            <div className="bh-track-support-icon">
              <Truck size={23} />
            </div>

            <div>
              <h3>Need help with your delivery?</h3>
              <p>
                Our team is happy to help you with your order.
              </p>
            </div>

            <a
              href="https://wa.me/91812233694"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
