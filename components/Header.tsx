'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import BrandMonogram from './BrandMonogram'
import { mapsUrl } from '../lib/siteData'

const links: Array<[string, string]> = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Product', '/product'],
  ['Showroom', '/showroom'],
  ['Contact Us', '/contact'],
]

function Header() {
  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = pathname !== '/' || scrollPosition > 24

  useEffect(() => {
    if (pathname !== '/') return undefined
    const updateHeader = () => setScrollPosition(window.scrollY)
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="brand" href="/" aria-label="Themo Tiles home" onClick={closeMenu}>
        <BrandMonogram />
        <span className="brand-wordmark" aria-hidden="true">
          <span className="brand-wordmark-name">THEMO</span>
          <span className="brand-wordmark-type">TILES</span>
          <span className="brand-tagline">PREMIUM TILE SHOWROOM</span>
        </span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
      <nav className={`main-nav${menuOpen ? ' menu-visible' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'is-active' : ''}
            aria-current={pathname === href ? 'page' : undefined}
            onClick={closeMenu}
          >
            {label}
          </Link>
        ))}
        <a
          className="nav-visit"
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <MapPin size={15} strokeWidth={1.8} />
          Visit Us
        </a>
      </nav>
    </header>
  )
}

export default Header
