"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import BrandMark from "./BrandMark";

const navLinks = [
  { href: "/", label: "The Residence" },
  { href: "/about", label: "Our Studio" },
  { href: "/services", label: "Expertise" },
  { href: "/projects", label: "Portfolio" },
  { href: "/contact", label: "Let’s Connect" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#171513]/90 backdrop-blur-md py-4 border-b border-[#D8C8B2]/10 shadow-2xl"
            : "bg-gradient-to-b from-[#171513]/80 via-[#171513]/40 to-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <Link href="/" className="group flex items-center gap-3 tracking-tight shrink-0">
            <BrandMark className="w-9 h-9 sm:w-10 sm:h-10 text-[#C5A880] transition-transform duration-500 group-hover:rotate-3" />
            <span className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.22em] text-[#FCFAF6] font-medium transition-colors group-hover:text-[#D8C8B2]">
              SHINEWOOD
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#C5A880] uppercase -mt-0.5 font-light">
              Interior Architecture
            </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-5 lg:gap-7 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[11px] lg:text-xs tracking-[0.13em] uppercase transition-colors py-1 whitespace-nowrap ${
                    isActive
                      ? "text-[#C5A880] font-medium"
                      : "text-[#FCFAF6]/80 hover:text-[#FCFAF6]"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A880] transition-[width] duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Contact */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            <a
              href="tel:8610093520"
              className="flex items-center gap-2 text-xs tracking-wider text-[#D8C8B2] hover:text-[#FCFAF6] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-mono">8610093520</span>
            </a>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 bg-[#76533D]/90 hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 border border-[#C5A880]/30 shadow-md whitespace-nowrap"
            >
              <span>Consult Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 text-[#FCFAF6] hover:text-[#C5A880] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
