
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  CreditCard,
  Cookie,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    icon: UserRound,
    title: "Information We Collect",
    text: "When you browse or shop with BabyHunt, you may provide information such as your name, phone number, email address, delivery address and order details.",
  },
  {
    icon: LockKeyhole,
    title: "How We Use Your Information",
    text: "We use the information you provide to process orders, coordinate deliveries, respond to enquiries and improve your shopping experience.",
  },
  {
    icon: CreditCard,
    title: "Payments & Transactions",
    text: "Payment details are handled through the payment method or payment provider presented during checkout. Please do not share your passwords, OTPs or confidential banking details with anyone.",
  },
  {
    icon: ShieldCheck,
    title: "Information Protection",
    text: "We take reasonable steps to protect the information shared with us. However, no online platform or electronic transmission can be guaranteed to be completely secure.",
  },
  {
    icon: Cookie,
    title: "Cookies & Website Usage",
    text: "Our website may use cookies or similar technologies to support essential website functions and improve your browsing experience.",
  },
];

export default function PrivacyPolicyPage() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55 },
  };

  return (
    <main className="bh-privacy-page">
      <section className="bh-privacy-hero">
        <motion.div {...reveal}>
          <span className="bh-privacy-eyebrow">
            YOUR PRIVACY MATTERS
          </span>

          <h1>Privacy Policy</h1>

          <p>
            Your trust means everything to us. Learn how BabyHunt
            handles the information you share while shopping with us.
          </p>
        </motion.div>
      </section>

      <div className="bh-privacy-container">
        <motion.section
          className="bh-privacy-intro"
          {...reveal}
        >
          <div className="bh-privacy-main-icon">
            <ShieldCheck size={29} />
          </div>

          <h2>Your information, treated with care.</h2>

          <p>
            This Privacy Policy explains how BabyHunt may collect,
            use and protect information when you visit our website,
            contact us or place an order. By using our website, you
            acknowledge this policy.
          </p>
        </motion.section>

        <section className="bh-privacy-sections">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.article
                className="bh-privacy-card"
                key={section.title}
                {...reveal}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <div className="bh-privacy-card-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </motion.article>
            );
          })}
        </section>

        <motion.section
          className="bh-privacy-contact"
          {...reveal}
        >
          <h2>Have a privacy-related question?</h2>

          <p>
            If you have questions about the information you share
            with BabyHunt, please get in touch with our team.
          </p>

          <Link href="/contact">
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </motion.section>

        <div className="bh-privacy-links">
          <Link href="/shipping-policy">Shipping Policy</Link>
          <Link href="/return-policy">Return & Refund Policy</Link>
          <Link href="/faq">FAQs</Link>
        </div>
      </div>
    </main>
  );
}
