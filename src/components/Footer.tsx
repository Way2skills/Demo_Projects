
"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const shopLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

const supportLinks = [
  { label: "Track Your Order", href: "/track-order" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return & Refund", href: "/return-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bh-footer">
      <div className="bh-footer-container">
        <div className="bh-footer-main">
          <div className="bh-footer-brand">
            <Link href="/" className="bh-footer-logo">
              BabyHunt<span>.</span>
            </Link>

            <p className="bh-footer-tagline">
              Little Things, Big Happiness.
            </p>

            <p className="bh-footer-description">
              Discover adorable little essentials, thoughtful
              collections and everyday favourites for your
              little one&apos;s happy moments.
            </p>

            <a
              href="https://wa.me/91812233694"
              target="_blank"
              rel="noopener noreferrer"
              className="bh-footer-whatsapp"
            >
              <MessageCircle size={17} />
              Chat with us
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="bh-footer-column">
            <h3>Explore</h3>

            {shopLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="bh-footer-column">
            <h3>Customer Care</h3>

            {supportLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="bh-footer-column bh-footer-contact">
            <h3>Get in Touch</h3>

            <a href="tel:8122339694">
              <Phone size={16} />
              <span>8122339694</span>
            </a>

            <a
              href="https://wa.me/91812233694"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us</span>
            </a>

            <div className="bh-footer-address">
              <MapPin size={17} />
              <span>
                Nehru Bridge, First Cut Cross,
                Trichy, Tamil Nadu.
              </span>
            </div>
          </div>
        </div>

        <div className="bh-footer-bottom">
          <p>
            © {new Date().getFullYear()} BabyHunt. All rights
            reserved.
          </p>

          <p className="bh-footer-made">
            Made with <Heart size={13} fill="currentColor" /> for little ones.
          </p>
        </div>
      </div>
    </footer>
  );
}
