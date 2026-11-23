'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { ArrowUpRight, ChevronDown, MapPin, Phone } from 'lucide-react'
import BrandMonogram from './BrandMonogram'
import { categories, mapsUrl, phoneLink, showroomAddress } from '../lib/siteData'

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-icon-dot" cx="17.7" cy="6.8" r="1" />
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-8h2.8l.4-3.1h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.1 21H3l7.3-8.4L2.6 3h6.5l4.5 5.9L18.9 3Zm-1.1 16h1.7L8.1 4.9H6.3L17.8 19Z" />
    </svg>
  )
}

function FooterSection({
  id,
  title,
  expanded,
  onToggle,
  className = '',
  children,
}: {
  id: string
  title: string
  expanded: boolean
  onToggle: () => void
  className?: string
  children: ReactNode
}) {
  const contentId = `footer-${id}-content`

  return (
    <section className={`footer-column ${className}${expanded ? ' is-expanded' : ''}`}>
      <h3>{title}</h3>
      <button
        className="footer-accordion-trigger"
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <div className={`footer-accordion-panel${expanded ? ' is-open' : ''}`} id={contentId}>
        <div className="footer-accordion-content">{children}</div>
      </div>
    </section>
  )
}

type FooterSectionKey = 'explore' | 'collections' | 'findUs'

function Footer() {
  const [expandedSections, setExpandedSections] = useState({
    explore: false,
    collections: false,
    findUs: false,
  })

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'X', href: 'https://x.com/' },
  ]

  const toggleSection = (section: FooterSectionKey) => {
    setExpandedSections((current) => ({ ...current, [section]: !current[section] }))
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand footer-logo" href="/" aria-label="Themo Tiles home">
            <BrandMonogram />
          </Link>
          <p>Thoughtful surfaces for the spaces you call home. Visit us in Namakkal to find a finish that feels like yours.</p>
          <div className="footer-socials" aria-label="Social media">
            {socialLinks.map(({ name, href }) => (
              <a className={`footer-social footer-social-${name.toLowerCase()}`} key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>
        <FooterSection
          id="explore"
          title="Explore"
          expanded={expandedSections.explore}
          onToggle={() => toggleSection('explore')}
        >
          <Link href="/about">About Us</Link>
          <Link href="/product">Our Collections</Link>
          <Link href="/product#inspiration">Interior Inspiration</Link>
          <Link href="/showroom">Visit the Showroom</Link>
          <Link href="/contact">Contact Us</Link>
        </FooterSection>
        <FooterSection
          id="collections"
          title="Collections"
          expanded={expandedSections.collections}
          onToggle={() => toggleSection('collections')}
        >
          {categories.slice(0, 5).map((category) => <Link key={category.title} href={`/product#categories`}>{category.title}</Link>)}
        </FooterSection>
        <FooterSection
          id="find-us"
          title="Find us"
          className="footer-contact"
          expanded={expandedSections.findUs}
          onToggle={() => toggleSection('findUs')}
        >
          <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /><span>Location: {showroomAddress}</span></a>
          <a href={phoneLink}><Phone size={16} />63812 43416</a>
          <a className="footer-directions" href={mapsUrl} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight size={14} /></a>
        </FooterSection>
      </div>
      <div className="footer-bottom">
        <span>© 2026 <strong>THEMO TILE.</strong> ALL RIGHTS RESERVED.</span>
        <span>MADE FOR CONSIDERED LIVING.</span>
      </div>
    </footer>
  )
}

export default Footer
