
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import {
  Heart,
  ShieldCheck,
  Sparkles,
  Baby,
  Gift,
  ArrowRight,
  MapPin,
} from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --------------------------------------
// IMAGES
// --------------------------------------

const photos = {
  hero: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85",
  heroSmall: "/images/little2.jpg",
  story: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000&q=85",
  storySmall: "/images/story.jpg",
  mission: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&q=85",
  vision: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=900&q=85",
  values: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85",
  care: "/images/made-with-love.png",
  happy:  "/images/quality-first.png",
  banner: "/images/foot.jpg",
};

// --------------------------------------
// VALUES
// --------------------------------------

const values = [
  {
    number: "01",
    icon: Heart,
    title: "Made with Love",
    description:
      "Every little choice is made with love, care and attention to what matters most.",
    image: photos.values,
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "Thoughtfully selected products and dependable quality for little ones.",
    image: photos.mission,
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Thoughtful Choices",
    description:
      "Useful, lovely and comfortable essentials for every little milestone.",
    image: photos.care,
  },
  {
    number: "04",
    icon: Gift,
    title: "Little Moments",
    description:
      "From everyday essentials to special gifts, we celebrate every little moment.",
    image: photos.happy,
  },
];

// --------------------------------------
// REVEAL ANIMATION
// --------------------------------------

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const reduceMotion = useReducedMotion();

  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: -45, y: 0 },
    right: { x: 45, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, ...directions[direction] }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

// --------------------------------------
// FLOATING IMAGE
// --------------------------------------

function FloatingImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  duration = 6,
  distance = 10,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`bh-about-floating-image ${className}`}
      animate={
        reduceMotion
          ? {}
          : {
              y: [0, -distance, 0, distance, 0],
              rotate: [0, 0.6, 0, -0.6, 0],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="bh-about-image-inner">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className={imageClassName}
        />
      </div>
    </motion.div>
  );
}

// --------------------------------------
// SECTION HEADING
// --------------------------------------

function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
}) {
  return (
    <div className="bh-about-section-heading is-centered">
      <motion.span
        className="bh-about-eyebrow"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {title} <span>{highlight}</span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// ======================================
// ABOUT PAGE
// ======================================

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bh-about-page">

      {/* =================================
          1. HERO SECTION
      ================================= */}

      <section className="bh-about-hero">
        <div className="bh-about-hero-bg-circle circle-one" />
        <div className="bh-about-hero-bg-circle circle-two" />

        <div className="bh-about-container bh-about-hero-grid">

          <div className="bh-about-hero-content">

            <Reveal>
              <span className="bh-about-eyebrow">
                <Sparkles size={15} />
                WELCOME TO BABYHUNT
              </span>
            </Reveal>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              Little Things,
              <br />
              <span>Big Happiness.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At BabyHunt, we bring together lovely baby essentials
              and thoughtful finds to make every little moment
              special, comfortable and full of happiness.
            </motion.p>

            <motion.div
              className="bh-about-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <Link
                href="/shop"
                className="bh-about-btn bh-about-btn-primary"
              >
                Explore Collection
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="bh-about-btn bh-about-btn-light"
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.div
              className="bh-about-handwritten"
              animate={
                reduceMotion
                  ? {}
                  : {
                      rotate: [-3, 2, -3],
                      y: [0, -4, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              Made for little smiles
              <Heart size={16} />
            </motion.div>

          </div>

          <div className="bh-about-hero-visual">

            <FloatingImage
              src={photos.hero}
              alt="BabyHunt baby lifestyle"
              className="bh-about-hero-main-image"
              duration={7}
              distance={14}
            />

            <FloatingImage
              src={photos.heroSmall}
              alt="Little baby moments"
              className="bh-about-hero-small-image"
              duration={5.5}
              distance={9}
              delay={0.5}
            />

            <motion.div
              className="bh-about-floating-note"
              animate={
                reduceMotion
                  ? {}
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Heart size={20} />
              <span>Full of love</span>
            </motion.div>

            <motion.div
              className="bh-about-hero-star"
              animate={
                reduceMotion
                  ? {}
                  : {
                      rotate: 360,
                      scale: [1, 1.15, 1],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✳
            </motion.div>

          </div>
        </div>
      </section>

      {/* =================================
          2. OUR STORY
      ================================= */}

      <section className="bh-about-intro bh-about-container">

        <Reveal
          className="bh-about-intro-text"
          direction="left"
        >
          <span className="bh-about-eyebrow">
            OUR STORY
          </span>

          <h2>
            A little world of
            <span> baby happiness.</span>
          </h2>

          <p>
            BabyHunt was created around the sweetest part of life.
            We understand that choosing things for little ones
            is more than shopping. It is about comfort, care,
            love and beautiful memories.
          </p>

          <p>
            Our aim is to bring families lovely baby essentials
            and delightful finds that make everyday moments
            more comfortable, colourful and memorable.
          </p>

          <Link
            href="/shop"
            className="bh-about-text-link"
          >
            Discover BabyHunt
            <ArrowRight size={17} />
          </Link>

          <div className="bh-about-story-quote">
            “Little moments become the biggest memories.”
          </div>
        </Reveal>

        <Reveal
          className="bh-about-intro-gallery"
          direction="right"
        >
          <FloatingImage
            src={photos.story}
            alt="BabyHunt story"
            className="bh-about-intro-main-image"
            duration={6.5}
            distance={11}
          />

          <FloatingImage
            src={photos.storySmall}
            alt="Baby essentials"
            className="bh-about-intro-small-image"
            duration={5}
            distance={8}
            delay={0.4}
          />

          <div className="bh-about-image-sticker">
            <Heart size={17} fill="currentColor" />
            <span>Little joys, endless love</span>
          </div>
        </Reveal>

      </section>

      {/* =================================
          3. MISSION & VISION
      ================================= */}

      <section className="bh-about-beliefs bh-about-container">

        <SectionHeading
          eyebrow="WHAT WE BELIEVE"
          title="Our purpose,"
          highlight="our dream."
          description="Everything we do begins with care for little ones and the families who love them."
        />

        <div className="bh-about-belief-grid">

          <Reveal direction="left">
            <motion.article
              className="bh-about-belief-card"
              whileHover={{ y: -7 }}
            >
              <FloatingImage
                src={photos.mission}
                alt="BabyHunt mission"
                className="bh-about-belief-image"
                duration={6}
                distance={8}
              />

              <div className="bh-about-belief-card-content">

                <span className="bh-about-number">
                  01 / OUR MISSION
                </span>

                <div className="bh-about-belief-icon">
                  <Heart size={23} />
                </div>

                <h3>Our Mission</h3>

                <p>
                  To make finding lovely, useful and thoughtful
                  baby essentials an easy and happy experience
                  for every family.
                </p>

              </div>
            </motion.article>
          </Reveal>

          <Reveal direction="right" delay={0.12}>
            <motion.article
              className="bh-about-belief-card"
              whileHover={{ y: -7 }}
            >
              <FloatingImage
                src={photos.vision}
                alt="BabyHunt vision"
                className="bh-about-belief-image"
                duration={6.5}
                distance={9}
                delay={0.3}
              />

              <div className="bh-about-belief-card-content">

                <span className="bh-about-number">
                  02 / OUR VISION
                </span>

                <div className="bh-about-belief-icon">
                  <Sparkles size={23} />
                </div>

                <h3>Our Vision</h3>

                <p>
                  To become a trusted destination where families
                  discover beautiful products and celebrate
                  every little milestone.
                </p>

              </div>
            </motion.article>
          </Reveal>

        </div>
      </section>

      {/* =================================
          4. OUR VALUES
      ================================= */}

      <section className="bh-about-values-section">

        <div className="bh-about-container">

          <SectionHeading
            eyebrow="THE BABYHUNT PROMISE"
            title="What makes us"
            highlight="special."
            description="The little things that shape everything we do."
          />

          <div className="bh-about-values-grid">

            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.number}
                  delay={index * 0.1}
                >
                  <motion.article
                    className="bh-about-value-card"
                    whileHover={{ y: -8 }}
                  >
                    <FloatingImage
                      src={item.image}
                      alt={item.title}
                      className="bh-about-value-image"
                      duration={6 + index * 0.3}
                      distance={7}
                      delay={index * 0.2}
                    />

                    <div className="bh-about-value-card-content">

                      <div className="bh-about-value-top">
                        <span>{item.number}</span>
                        <Icon size={22} />
                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                    </div>
                  </motion.article>
                </Reveal>
              );
            })}

          </div>
        </div>
      </section>

      {/* =================================
          5. VISIT & FINAL CTA
      ================================= */}

      <section className="bh-about-visit-section">

        <div className="bh-about-container bh-about-visit-grid">

          <Reveal
            direction="left"
            className="bh-about-visit-content"
          >
            <span className="bh-about-eyebrow">
              COME SAY HELLO
            </span>

            <h2>
              We&apos;d love to
              <span> see you.</span>
            </h2>

            <p>
              Visit BabyHunt and discover lovely little finds
              for the special ones in your life.
            </p>

            <div className="bh-about-visit-detail">
              <MapPin size={22} />

              <div>
                <strong>Visit Our Store</strong>
                <span>
                  Nehru Bridge, First Cut Cross, Trichy
                </span>
              </div>
            </div>

            <div className="bh-about-hero-buttons">

              <Link
                href="/contact"
                className="bh-about-btn bh-about-btn-primary"
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/shop"
                className="bh-about-btn bh-about-btn-light"
              >
                Explore Shop
              </Link>

            </div>

            <motion.div
              className="bh-about-handwritten"
              animate={
                reduceMotion
                  ? {}
                  : { y: [0, -4, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              Thank you for choosing BabyHunt
              <Heart size={16} />
            </motion.div>

          </Reveal>

          <Reveal
            direction="right"
            className="bh-about-visit-image-wrap"
          >
            <FloatingImage
              src={photos.banner}
              alt="Visit BabyHunt"
              className="bh-about-visit-image"
              duration={7}
              distance={10}
            />

            <div className="bh-about-visit-bubble">
              <Heart size={19} fill="currentColor" />
              <span>See you soon!</span>
            </div>
          </Reveal>

        </div>
      </section>

    </main>
  );
}
