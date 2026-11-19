
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Truck,
  Package,
  MapPin,
  Clock3,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const shippingSections = [
  {
    icon: Package,
    number: "01",
    title: "Order Processing",
    description:
      "Once your order is placed, our team will review the order details and prepare it for dispatch. Processing time may depend on product availability and order confirmation.",
  },
  {
    icon: Truck,
    number: "02",
    title: "Shipping & Delivery",
    description:
      "Delivery availability and estimated delivery timelines depend on your location and the shipping option available at checkout.",
  },
  {
    icon: MapPin,
    number: "03",
    title: "Delivery Address",
    description:
      "Please provide a complete and accurate delivery address and contact number while placing your order to help avoid delivery issues.",
  },
  {
    icon: Clock3,
    number: "04",
    title: "Delivery Delays",
    description:
      "Unexpected circumstances, courier operations, weather conditions or incorrect address details may affect delivery timelines.",
  },
];

export default function ShippingPolicyPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bh-shipping-page">
      <section className="bh-shipping-hero">
        <div className="bh-shipping-container">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bh-shipping-eyebrow">
              DELIVERY WITH CARE
            </span>

            <h1>
              Shipping <span>Policy</span>
            </h1>

            <p>
              Every little order matters to us. Here&apos;s what you
              need to know about getting your BabyHunt favourites
              delivered to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bh-shipping-intro">
        <div className="bh-shipping-container">
          <div className="bh-shipping-intro-card">
            <div className="bh-shipping-intro-icon">
              <Truck size={28} />
            </div>

            <div>
              <span>OUR DELIVERY PROMISE</span>
              <h2>Little essentials, delivered with care.</h2>
              <p>
                We aim to make your shopping experience simple
                and convenient, from placing your order to
                receiving your package.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bh-shipping-details">
        <div className="bh-shipping-container">
          <div className="bh-shipping-section-heading">
            <span>GOOD TO KNOW</span>
            <h2>Shipping Information</h2>
            <p>
              A few important details to help you shop with confidence.
            </p>
          </div>

          <div className="bh-shipping-grid">
            {shippingSections.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="bh-shipping-card"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <div className="bh-shipping-card-top">
                    <div className="bh-shipping-card-icon">
                      <Icon size={23} />
                    </div>
                    <span>{item.number}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bh-shipping-checkout">
        <div className="bh-shipping-container">
          <div className="bh-shipping-checkout-inner">
            <div className="bh-shipping-checkout-icon">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h2>Shipping Charges & Delivery Estimates</h2>
              <p>
                Applicable shipping charges and estimated delivery
                information should be checked at checkout or
                confirmed with our team before placing an order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bh-shipping-help">
        <div className="bh-shipping-container">
          <div className="bh-shipping-help-inner">
            <div>
              <span>WE&apos;RE HERE TO HELP</span>
              <h2>Questions about your delivery?</h2>
              <p>
                Our BabyHunt team will be happy to assist you
                with shipping and order-related questions.
              </p>
            </div>

            <a
              href="https://wa.me/91812233694"
              target="_blank"
              rel="noopener noreferrer"
              className="bh-shipping-whatsapp"
            >
              <MessageCircle size={18} />
              Chat with us
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="bh-shipping-bottom">
        <Link href="/track-order">
          Track Your Order <ArrowRight size={17} />
        </Link>
        <Link href="/contact">
          Contact BabyHunt
        </Link>
      </section>
    </main>
  );
}
