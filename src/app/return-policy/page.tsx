
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  RefreshCcw,
  PackageCheck,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

const returnSections = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Return Requests",
    description:
      "If you have an issue with a product, contact our team with your order details. We will review your request and explain the available options.",
  },
  {
    icon: PackageCheck,
    number: "02",
    title: "Product Condition",
    description:
      "Please keep the product, original packaging, tags and accessories in their received condition until our team advises you on the next steps.",
  },
  {
    icon: AlertCircle,
    number: "03",
    title: "Damaged or Incorrect Items",
    description:
      "If you receive a damaged or incorrect item, contact us as soon as possible with your order details and clear photographs of the product.",
  },
  {
    icon: RefreshCcw,
    number: "04",
    title: "Refunds & Exchanges",
    description:
      "Refund or exchange availability will be assessed based on the product, order status and applicable store policy. Our team will confirm the next steps.",
  },
];

export default function ReturnPolicyPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bh-return-page">
      {/* HERO */}
      <section className="bh-return-hero">
        <div className="bh-return-container">
          <motion.div
            className="bh-return-hero-content"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bh-return-eyebrow">
              SHOP WITH CONFIDENCE
            </span>

            <h1>
              Return &amp; <span>Refund Policy</span>
            </h1>

            <p>
              Your satisfaction matters to us. Find out how BabyHunt
              handles return requests, exchanges and product-related
              concerns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bh-return-intro">
        <div className="bh-return-container">
          <div className="bh-return-intro-card">
            <div className="bh-return-intro-icon">
              <ShieldCheck size={28} strokeWidth={1.7} />
            </div>

            <div className="bh-return-intro-content">
              <span>OUR COMMITMENT</span>
              <h2>We&apos;re here to make things right.</h2>
              <p>
                If something isn&apos;t right with your order, reach
                out to our team. We&apos;ll review your concern and
                help you understand the available resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RETURN DETAILS */}
      <section className="bh-return-details">
        <div className="bh-return-container">
          <motion.div
            className="bh-return-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span>IMPORTANT INFORMATION</span>
            <h2>How Returns Work</h2>
            <p>
              Please review the following information before
              requesting a return or exchange.
            </p>
          </motion.div>

          <div className="bh-return-grid">
            {returnSections.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="bh-return-card"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                >
                  <div className="bh-return-card-top">
                    <div className="bh-return-card-icon">
                      <Icon size={23} strokeWidth={1.7} />
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

      {/* RETURN PROCESS */}
      <section className="bh-return-process">
        <div className="bh-return-container">
          <div className="bh-return-process-inner">
            <div className="bh-return-process-icon">
              <MessageCircle size={25} strokeWidth={1.7} />
            </div>

            <div className="bh-return-process-content">
              <span>GETTING STARTED</span>
              <h2>How to Request a Return</h2>
              <p>
                Contact BabyHunt with your order ID, a description
                of the issue and supporting photos if applicable.
                Our team will review your request and guide you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HELP */}
      <section className="bh-return-help">
        <div className="bh-return-container">
          <div className="bh-return-help-inner">
            <div className="bh-return-help-content">
              <span>NEED ASSISTANCE?</span>
              <h2>We&apos;re happy to help.</h2>
              <p>
                Have a question about a return, exchange or refund?
                Talk to our friendly team.
              </p>
            </div>

            <a
              href="https://wa.me/91812233694"
              target="_blank"
              rel="noopener noreferrer"
              className="bh-return-whatsapp"
            >
              <MessageCircle size={18} />
              Chat with us
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <section className="bh-return-bottom">
        <Link href="/track-order">
          Track Your Order <ArrowRight size={16} />
        </Link>

        <Link href="/contact">
          Contact BabyHunt
        </Link>
      </section>
    </main>
  );
}
