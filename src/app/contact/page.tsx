
"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock3,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Sparkles,
  Mail,
} from "lucide-react";

const WHATSAPP_NUMBER = "91812233694";
const BUSINESS_EMAIL = "nithucutie03@gmail.com";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw5vTpOXpJ6Rdul5MTLgWlm-5yMfV9-FlTf_k4UI3qN5F_huqYJe437bU3yn_oCL604Lw/exec";

const contactImage = "/images/contact.webp";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "sendContact",
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject || "General Enquiry",
          message: form.message,
        }),
      });

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Unable to send your enquiry right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  const imageReveal = {
    initial: reduceMotion
      ? false
      : { opacity: 0, scale: 0.96, y: 18 },
    whileInView: reduceMotion
      ? {}
      : { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <main className="bh-contact-page">
      {/* Contact Hero - Animated Video Background */}
      <section className="bh-contact-hero bh-contact-video-hero">
        <video
          className="bh-contact-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/videos/contact-banner.mp4"
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>

        <div className="bh-contact-video-overlay" />

        <div className="bh-contact-container bh-contact-hero-inner">
          <div className="bh-contact-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>

          <div className="bh-contact-hero-grid">
            <motion.div
              {...reveal}
              className="bh-contact-hero-content"
            >
              <span className="bh-contact-eyebrow">
                <Sparkles size={14} /> WE ARE HERE TO HELP
              </span>

              <h1>
                Little questions,
                <br />
                <span>big smiles.</span>
              </h1>

              <p>
                Need a hand with an order or choosing something special
                for your little one? Our BabyHunt team is just a message
                away.
              </p>

              <a
                className="bh-contact-hero-cta"
                href="#contact-form"
              >
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Details and Form */}
      <section className="bh-contact-main">
        <div className="bh-contact-container">
          <div className="bh-contact-layout">
            <motion.aside
              {...reveal}
              className="bh-contact-details"
            >
              <span className="bh-contact-eyebrow">
                GET IN TOUCH
              </span>

              <h2>
                Let&apos;s make things <span>easy.</span>
              </h2>

              <p className="bh-contact-details-intro">
                From product questions to order support, we’re happy
                to help you find the right answer.
              </p>

              <div className="bh-contact-detail-item">
                <div className="bh-contact-detail-icon">
                  <Phone size={19} />
                </div>

                <div>
                  <span>PHONE</span>
                  <a href="tel:8122339694">
                    8122339694 <ArrowUpRight size={14} />
                  </a>
                  <small>Call us for assistance</small>
                </div>
              </div>

              <div className="bh-contact-detail-item">
                <div className="bh-contact-detail-icon">
                  <MessageCircle size={19} />
                </div>

                <div>
                  <span>WHATSAPP</span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us <ArrowUpRight size={14} />
                  </a>
                  <small>Send us your questions</small>
                </div>
              </div>

              <div className="bh-contact-detail-item">
                <div className="bh-contact-detail-icon">
                  <Mail size={19} />
                </div>

                <div>
                  <span>EMAIL</span>
                  <a href={`mailto:${BUSINESS_EMAIL}`}>
                    {BUSINESS_EMAIL}
                    <ArrowUpRight size={14} />
                  </a>
                  <small>Send us an email anytime</small>
                </div>
              </div>

              <div className="bh-contact-detail-item">
                <div className="bh-contact-detail-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <span>OUR STORE</span>
                  <strong>BabyHunt</strong>
                  <small>
                    Nehru Bridge, First Cut Cross, Trichy,
                    Tamil Nadu.
                  </small>
                </div>
              </div>

              <div className="bh-contact-detail-item">
                <div className="bh-contact-detail-icon">
                  <Clock3 size={19} />
                </div>

                <div>
                  <span>STORE HOURS</span>
                  <strong>Visit BabyHunt</strong>
                  <small>
                    Please contact us to confirm store timings.
                  </small>
                </div>
              </div>

              <motion.div
                {...imageReveal}
                className="bh-contact-side-image-wrap"
              >
                <Image
                  src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=900&q=85"
                  alt="Soft baby clothing and essentials"
                  width={900}
                  height={700}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 40vw"
                />

                <div>
                  <span>A LITTLE NOTE</span>
                  <strong>
                    We love helping you choose the best.
                  </strong>
                </div>
              </motion.div>

              <div className="bh-contact-social-note">
                <span>Have a quick question?</span>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us on WhatsApp{" "}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.aside>

            <motion.div
              {...reveal}
              className="bh-contact-form-panel"
              id="contact-form"
            >
              {submitted ? (
                <div className="bh-contact-success">
                  <CheckCircle2 size={48} />

                  <h2>Thank you for reaching out!</h2>

                  <p>
                    Your enquiry has been submitted. Thank you for
                    contacting BabyHunt. Our team will get back to
                    you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError("");
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="bh-contact-form-heading">
                    <span className="bh-contact-eyebrow">
                      SEND AN ENQUIRY
                    </span>

                    <h2>How can we help?</h2>

                    <p>
                      Share a few details and our team will get
                      back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="bh-contact-fields-grid">
                      <div className="bh-contact-field">
                        <label htmlFor="bh-name">
                          Full name *
                        </label>

                        <input
                          id="bh-name"
                          name="name"
                          value={form.name}
                          onChange={updateField}
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div className="bh-contact-field">
                        <label htmlFor="bh-email">
                          Email address *
                        </label>

                        <input
                          id="bh-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={updateField}
                          placeholder="you@gmail.com"
                          pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                          title="Please enter a valid Gmail address (example@gmail.com)"
                          required
                        />
                      </div>

                      <div className="bh-contact-field">
                        <label htmlFor="bh-phone">
                          Phone number *
                        </label>

                        <input
                          id="bh-phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          value={form.phone}
                          onChange={updateField}
                          placeholder="Enter 10 digits"
                          required
                        />
                      </div>

                      <div className="bh-contact-field">
                        <label htmlFor="bh-subject">
                          Subject
                        </label>

                        <input
                          id="bh-subject"
                          name="subject"
                          value={form.subject}
                          onChange={updateField}
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="bh-contact-field bh-contact-message-field">
                      <label htmlFor="bh-message">
                        Your message *
                      </label>

                      <textarea
                        id="bh-message"
                        name="message"
                        value={form.message}
                        onChange={updateField}
                        placeholder="Write your message here..."
                        rows={5}
                        required
                      />
                    </div>

                    <button
                      className="bh-contact-submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}{" "}
                      <Send size={16} />
                    </button>

                    {submitError && (
                      <p className="bh-contact-privacy" role="alert">
                        {submitError}
                      </p>
                    )}

                    <p className="bh-contact-privacy">
                      Your enquiry will be sent to the BabyHunt team by email.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="bh-contact-location">
        <div className="bh-contact-container">
          <motion.div
            {...imageReveal}
            className="bh-contact-location-card"
          >
            <div className="bh-contact-location-copy">
              <span className="bh-contact-eyebrow">
                FIND US HERE
              </span>

              <h2>
                Come visit <span>BabyHunt.</span>
              </h2>

              <p>
                We’d love to welcome you to our store. Drop by
                and explore our collection for your little ones.
              </p>

              <div className="bh-contact-location-address">
                <MapPin size={18} />
                <span>
                  Nehru Bridge, First Cut Cross, Trichy,
                  Tamil Nadu.
                </span>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Nehru+Bridge+First+Cut+Cross+Trichy"
                target="_blank"
                rel="noopener noreferrer"
                className="bh-contact-map-button"
                style={{ marginTop: "24px" }}
              >
                Get Directions <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="bh-contact-location-image">
              <Image
                src={contactImage}
                alt="A warm and welcoming family moment"
                width={900}
                height={700}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
