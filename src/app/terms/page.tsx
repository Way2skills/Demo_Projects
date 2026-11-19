
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCcw,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const terms = [
  {
    icon: ShoppingBag,
    title: "Using Our Website",
    text: "By accessing BabyHunt, you agree to use our website responsibly and provide accurate information when placing an order or contacting our team.",
  },
  {
    icon: FileText,
    title: "Product Information",
    text: "We aim to display accurate product descriptions, images and prices. Colours and appearance may vary slightly depending on your screen and device.",
  },
  {
    icon: CreditCard,
    title: "Orders & Payments",
    text: "Orders are subject to availability and confirmation. Applicable prices, delivery charges and payment options will be shown during checkout.",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    text: "Delivery arrangements and estimated timelines may vary depending on your location and order. Please refer to our Shipping Policy for more information.",
  },
  {
    icon: RefreshCcw,
    title: "Returns & Refunds",
    text: "Return and refund requests are handled according to our Return & Refund Policy. Please review the policy before placing your order.",
  },
  {
    icon: ShieldCheck,
    title: "Website Content",
    text: "Website content, branding, images and design elements should not be copied, reproduced or used commercially without appropriate permission.",
  },
];

export default function TermsPage() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5 },
  };

  return (
    <main className="bh-terms-page">
      <section className="bh-terms-hero">
        <motion.div {...reveal}>
          <span className="bh-terms-eyebrow">
            A LITTLE CLARITY, A BETTER EXPERIENCE
          </span>

          <h1>Terms & Conditions</h1>

          <p>
            Please read these terms before shopping with BabyHunt.
            We want every shopping experience to be clear and enjoyable.
          </p>
        </motion.div>
      </section>

      <div className="bh-terms-container">
        <motion.section className="bh-terms-intro" {...reveal}>
          <div className="bh-terms-main-icon">
            <FileText size={28} />
          </div>

          <h2>Welcome to BabyHunt</h2>

          <p>
            These Terms & Conditions apply to your use of the BabyHunt
            website and shopping services. By browsing our website or
            placing an order, you agree to these terms.
          </p>
        </motion.section>

        <section className="bh-terms-grid">
          {terms.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="bh-terms-card"
                key={item.title}
                {...reveal}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
              >
                <div className="bh-terms-card-icon">
                  <Icon size={22} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </section>

        <motion.section className="bh-terms-contact" {...reveal}>
          <h2>Need help understanding something?</h2>

          <p>
            Our team is happy to help with questions about your orders
            or shopping experience.
          </p>

          <Link href="/contact">
            Contact BabyHunt
            <ArrowRight size={16} />
          </Link>
        </motion.section>

        <div className="bh-terms-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/shipping-policy">Shipping Policy</Link>
          <Link href="/return-policy">Return & Refund Policy</Link>
          <Link href="/faq">FAQs</Link>
        </div>
      </div>
    </main>
  );
}
