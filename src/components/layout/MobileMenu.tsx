"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import BrandMark from "./BrandMark";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const navLinks = [
  { href: "/", label: "The Residence", num: "01" },
  { href: "/about", label: "Our Studio", num: "02" },
  { href: "/services", label: "Expertise", num: "03" },
  { href: "/projects", label: "Portfolio", num: "04" },
  { href: "/contact", label: "Let’s Connect", num: "05" },
];

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#171513]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
        >
          {/* Header bar inside menu */}
          <div className="flex items-center justify-between border-b border-[#D8C8B2]/15 pb-6">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <BrandMark className="w-10 h-10 text-[#C5A880]" />
              <span className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] text-[#FCFAF6] font-semibold">
                SHINEWOOD
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#C5A880] uppercase">
                Interior Architecture
              </span>
              </span>
            </Link>

            <button
              onClick={onClose}
              aria-label="Close Navigation Menu"
              className="w-11 h-11 rounded-full border border-[#D8C8B2]/20 flex items-center justify-center text-[#FCFAF6] hover:bg-[#76533D]/20 transition-colors"
            >
              <X className="w-5 h-5 text-[#FCFAF6]" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="my-auto py-8">
            <ul className="space-y-4">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.href || (link.href !== "/" && currentPath.startsWith(link.href));
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-baseline justify-between py-2 text-2xl sm:text-3xl font-serif tracking-wide transition-colors ${
                        isActive ? "text-[#C5A880]" : "text-[#FCFAF6] hover:text-[#D8C8B2]"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-sans font-mono tracking-widest text-[#C5A880]">
                          {link.num}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C5A880]" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Contact & Quick CTAs */}
          <div className="border-t border-[#D8C8B2]/15 pt-6 space-y-4">
            <div className="flex items-start gap-3 text-xs text-[#D8C8B2]/80">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>8th Cross, Balaji Nagar, Covai</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:8610093520"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#30251F] border border-[#76533D]/50 text-xs font-medium text-[#FCFAF6] hover:bg-[#76533D] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call Studio</span>
              </a>

              <a
                href="https://wa.me/918610093520?text=Hello%20Shinewood,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#76533D] text-xs font-medium text-[#FCFAF6] hover:bg-[#C5A880] hover:text-[#171513] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
