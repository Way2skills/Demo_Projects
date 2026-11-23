"use client";

import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Pin,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { footerColumns } from "@/config/site";

export default function SiteFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  function toggleSection(section: string) {
    setOpenSection((current) => (current === section ? null : section));
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main section-shell">
        {footerColumns.map((column) => {
          const sectionId = column.title.toLowerCase().replace(/\s+/g, "-");
          const headingId = `footer-${sectionId}-title`;
          const panelId = `footer-${sectionId}-links`;
          const isOpen = openSection === column.title;

          return (
            <section
              aria-labelledby={headingId}
              className={`footer-column footer-accordion${isOpen ? " is-open" : ""}`}
              key={column.title}
            >
              <h2 className="footer-accordion-heading" id={headingId}>
                {column.title}
              </h2>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="footer-accordion-toggle"
                onClick={() => toggleSection(column.title)}
                type="button"
              >
                {column.title}
                <ChevronDown aria-hidden="true" size={16} />
              </button>
              <ul className="footer-accordion-panel" id={panelId}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <section
          aria-labelledby="footer-help-title"
          className={`footer-column footer-accordion footer-help-accordion${openSection === "Need Help" ? " is-open" : ""}`}
        >
          <h2 className="footer-accordion-heading" id="footer-help-title">
            Need Help
          </h2>
          <button
            aria-controls="footer-help-links"
            aria-expanded={openSection === "Need Help"}
            className="footer-accordion-toggle"
            onClick={() => toggleSection("Need Help")}
            type="button"
          >
            Need Help
            <ChevronDown aria-hidden="true" size={16} />
          </button>
          <ul
            className="footer-help-list footer-accordion-panel"
            id="footer-help-links"
          >
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chepauk%20Stadium%2C%20Chennai"
                rel="noreferrer"
                target="_blank"
              >
                <MapPin aria-hidden="true" size={16} />
                Store Location
              </a>
            </li>
            <li>
              <a href="mailto:shoponline@noolzaari.com">
                <Mail aria-hidden="true" size={16} />
                shoponline@noolzaari.com
              </a>
            </li>
            <li>
              <a href="tel:9876543210">
                <Phone aria-hidden="true" size={16} />
                9876543210
              </a>
            </li>
          </ul>
        </section>
        <section aria-labelledby="footer-brand-title" className="footer-brand">
          <h2 className="footer-brand-name" id="footer-brand-title">
            <Link aria-label="Nool & Zari home" href="/">
              <span>Nool</span>
              <span aria-hidden="true">&amp;</span>
              <span>Zari</span>
            </Link>
          </h2>
          <p className="footer-motto">
            Celebrating the art of Indian craftsmanship through timeless silks,
            intricate zari and contemporary elegance.
          </p>
          <nav aria-label="Social media" className="footer-social">
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden="true" size={17} />
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook aria-hidden="true" size={17} />
            </a>
            <a
              aria-label="Pinterest"
              href="https://www.pinterest.com/"
              rel="noreferrer"
              target="_blank"
            >
              <Pin aria-hidden="true" size={17} />
            </a>
            <a
              aria-label="YouTube"
              href="https://www.youtube.com/"
              rel="noreferrer"
              target="_blank"
            >
              <Youtube aria-hidden="true" size={17} />
            </a>
          </nav>
        </section>
      </div>
      <div className="footer-legal">
        <p>
          <span>© 2026 - Nool&amp;Zari</span>
        </p>
      </div>
    </footer>
  );
}
