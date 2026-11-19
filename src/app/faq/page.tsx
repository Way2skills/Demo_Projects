
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import {
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCcw,
} from "lucide-react";

const faqGroups = [
  {
    title: "Orders & Shopping",
    icon: ShoppingBag,
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Browse our shop, select your favourite products, add them to your cart and proceed to checkout to place your order.",
      },
      {
        question: "Can I change my order after placing it?",
        answer:
          "Please contact our support team as soon as possible. Order changes depend on the current order processing status.",
      },
      {
        question: "How can I cancel my order?",
        answer:
          "Contact our team with your order details. Cancellation depends on whether your order has already been processed or dispatched.",
      },
    ],
  },
  {
    title: "Products & Payments",
    icon: CreditCard,
    questions: [
      {
        question: "Are the products shown on the website available?",
        answer:
          "Product availability is displayed on the product page. Availability may change depending on stock.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "Available payment methods will be displayed during checkout.",
      },
      {
        question: "How can I know the product details?",
        answer:
          "Visit the product page to view its description, images, price and available information.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        question: "Do you provide home delivery?",
        answer:
          "Delivery availability depends on your location. Please check the delivery options during checkout.",
      },
      {
        question: "How long will delivery take?",
        answer:
          "Delivery time depends on your location and order processing. Please contact our team for an update on your order.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Contact our support team with your order details to get the latest delivery information.",
      },
    ],
  },
  {
    title: "Returns & Support",
    icon: RefreshCcw,
    questions: [
      {
        question: "Can I return or exchange a product?",
        answer:
          "Return and exchange eligibility depends on the product and our store policy. Please contact us before sending an item back.",
      },
      {
        question: "What if I receive a damaged product?",
        answer:
          "Please contact us with your order details and clear photos of the damaged product so our team can assist you.",
      },
      {
        question: "How can I contact BabyHunt?",
        answer:
          "You can reach us by phone or WhatsApp at 8122339694. We will be happy to help you.",
      },
    ],
  },
];

function FAQItem({ item, isOpen, onClick, reduceMotion }) {
  return (
    <div className={`bh-faq-item ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="bh-faq-question"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>

        <span className="bh-faq-toggle">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="bh-faq-answer"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const reduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const currentGroup = faqGroups[activeCategory];

  return (
    <main className="bh-faq-page">
      <section className="bh-faq-hero">
        <div className="bh-faq-container">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bh-faq-eyebrow">
              WE ARE HERE TO HELP
            </span>

            <h1>
              Frequently Asked
              <span> Questions</span>
            </h1>

            <p>
              Everything you need to know about shopping with BabyHunt.
              Find quick answers to your questions below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bh-faq-content">
        <div className="bh-faq-container">
          <div className="bh-faq-layout">
            <aside className="bh-faq-sidebar">
              <h3>Browse by topic</h3>

              <div className="bh-faq-categories">
                {faqGroups.map((group, index) => {
                  const Icon = group.icon;

                  return (
                    <button
                      type="button"
                      key={group.title}
                      className={`bh-faq-category ${
                        activeCategory === index ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveCategory(index);
                        setActiveQuestion(0);
                      }}
                    >
                      <Icon size={19} />

                      <span>{group.title}</span>

                      <ArrowRight size={16} />
                    </button>
                  );
                })}
              </div>

              <div className="bh-faq-help-card">
                <div className="bh-faq-help-icon">
                  <MessageCircle size={22} />
                </div>

                <h3>Still need help?</h3>

                <p>
                  Our friendly team is always happy to help you.
                </p>

                <a
                  href="https://wa.me/91812233694"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us <ArrowRight size={16} />
                </a>
              </div>
            </aside>

            <div className="bh-faq-main">
              <div className="bh-faq-section-heading">
                <span>HELP CENTRE</span>
                <h2>{currentGroup.title}</h2>
                <p>
                  Find answers to the most common questions.
                </p>
              </div>

              <div className="bh-faq-list">
                {currentGroup.questions.map((item, index) => (
                  <FAQItem
                    key={`${activeCategory}-${index}`}
                    item={item}
                    isOpen={activeQuestion === index}
                    onClick={() =>
                      setActiveQuestion(
                        activeQuestion === index ? -1 : index
                      )
                    }
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bh-faq-bottom">
        <div className="bh-faq-container">
          <div className="bh-faq-bottom-inner">
            <div>
              <span>NEED PERSONAL ASSISTANCE?</span>
              <h2>We are just a message away.</h2>
              <p>
                Have another question? Get in touch with our BabyHunt team.
              </p>
            </div>

            <Link href="/contact" className="bh-faq-contact-link">
              Contact Us <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
