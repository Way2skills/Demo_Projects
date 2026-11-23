'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const galleryImages = [
  {
    src: '/images/faq-bookmatch-marble-v2.jpg',
    alt: 'Bookmatched white marble-look tile panels with mirrored veining',
    name: 'BOOKMATCH MARBLE',
    subtitle: 'Timeless Elegance in Every Vein.',
  },
  {
    src: '/images/faq-outdoor-stone-v2.jpg',
    alt: 'Outdoor natural stone tiles with a textured surface',
    name: 'OUTDOOR STONE',
    subtitle: 'Natural Beauty Beyond Boundaries.',
  },
  {
    src: '/images/faq-designer-pattern-athangudi.jpg',
    alt: 'Authentic Athangudi handmade tiles in a traditional geometric and floral floor pattern',
    name: 'DESIGNER PATTERN',
    subtitle: 'Artistic Designs for Unique Spaces.',
  },
  {
    src: '/images/faq-terrazzo-v3.jpg',
    alt: 'Warm ivory terrazzo flooring with colorful natural stone chips in a sunlit interior',
    name: 'PREMIUM TERRAZZO',
    subtitle: 'Contemporary Style, Lasting Impression.',
  },
]

const faqs = [
  {
    question: 'How do I choose the right tiles for my home?',
    answer:
      'Our team helps you select the perfect tiles based on your space, design preferences, and lifestyle.',
  },
  {
    question: 'What makes premium tiles different from regular tiles?',
    answer:
      'Premium tiles combine elegant designs, quality finishes, durability, and a sophisticated appearance.',
  },
  {
    question: 'Which tiles are best for bathrooms and wet areas?',
    answer:
      'Anti-skid and textured tiles are ideal for wet areas as they provide better grip and improved safety.',
  },
  {
    question: 'Can I get matching tiles for walls and floors?',
    answer:
      'Yes! Explore coordinated tile collections to create a seamless and stylish look throughout your space.',
  },
  {
    question: 'Can I visit your showroom to explore the collections?',
    answer:
      'Absolutely! Visit THEMO TILE showroom to experience our collections, compare designs, and find the perfect tiles for your space.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="home-faq" aria-labelledby="faq-title">
      <div className="home-faq-gallery-section" role="group" aria-labelledby="tile-gallery-title">
        <div className="home-faq-gallery-heading">
          <h2 id="tile-gallery-title">EXPLORE OUR TILE COLLECTIONS</h2>
          <p>Discover timeless designs. Transform every space.</p>
        </div>
        <div className="home-faq-gallery">
          {galleryImages.map(({ src, alt, name, subtitle }, index) => (
            <figure className="home-faq-gallery-item" key={src}>
              <div className="home-faq-gallery-image">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1100px) 46vw, 24vw"
                />
              </div>
              {index === 2 && (
                <>
                  <span className="sr-only">
                    Photo by Rainer Halama via Wikimedia Commons, displayed with a square crop.
                  </span>
                  <a
                    className="sr-only focus:not-sr-only"
                    href="https://commons.wikimedia.org/wiki/File:Attangudi_Palace-Athangudi_Tiles-WUS04306.jpg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Original Athangudi tile photograph
                  </a>
                  <span className="sr-only"> Licensed under </span>
                  <a
                    className="sr-only focus:not-sr-only"
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Creative Commons Attribution-ShareAlike 4.0
                  </a>
                  <span className="sr-only">.</span>
                </>
              )}
              <figcaption className="home-faq-gallery-caption">
                <span className="home-faq-gallery-name">{name}</span>
                <span className="home-faq-gallery-subtitle">{subtitle}</span>
                {index === galleryImages.length - 1 && (
                  <Link className="home-faq-products-link" href="/product">
                    EXPLORE OUR PRODUCTS <span aria-hidden="true">→</span>
                  </Link>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="home-faq-inner">
        <div className="home-faq-intro reveal">
          <span className="eyebrow">HERE TO HELP</span>
          <h2 id="faq-title">EVERYTHING YOU NEED TO KNOW</h2>
          <p>Discover the perfect tiles for every corner of your space.</p>
        </div>

        <div className="home-faq-content reveal">
          <h3 className="home-faq-list-heading">PEOPLE FREQUENTLY ASKED QUESTIONS</h3>
          <div className="home-faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isOpen = openIndex === index
              const answerId = `home-faq-answer-${index + 1}`
              const questionId = `home-faq-question-${index + 1}`

              return (
                <article className={`home-faq-item${isOpen ? ' is-open' : ''}`} key={question}>
                  <h4>
                    <button
                      className="home-faq-trigger"
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="home-faq-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="home-faq-question">{question}</span>
                    </button>
                  </h4>
                  <div
                    className="home-faq-answer"
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!isOpen}
                  >
                    <div className="home-faq-answer-inner">
                      <p>{answer}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
