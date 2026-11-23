//---- FOOTER ----
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Youtube,
} from "lucide-react";
import { useInstitutionSettings } from "../context/SettingsContext";

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Courses", "/courses"],
  ["Internships & Workshops", "/internships"],
  ["Contact Us", "/contact"],
];

const socialNetworks = [
  ["instagram", "Instagram", Instagram],
  ["facebook", "Facebook", Facebook],
  ["linkedin", "LinkedIn", Linkedin],
  ["youtube", "YouTube", Youtube],
  ["whatsapp", "WhatsApp", MessageCircle],
];

function getSocialUrls(value) {
  if (!value) return {};
  let links = value;
  if (typeof links === "string") {
    try {
      links = JSON.parse(links);
    } catch {
      return {};
    }
  }
  if (!links || typeof links !== "object" || Array.isArray(links)) return {};

  return Object.fromEntries(
    socialNetworks.flatMap(([key]) => {
      const rawUrl = links[key];
      if (typeof rawUrl !== "string" || !rawUrl.trim()) return [];
      try {
        const url = new URL(rawUrl);
        return ["https:", "http:"].includes(url.protocol) ? [[key, url.href]] : [];
      } catch {
        return [];
      }
    }),
  );
}

function FooterLinks({ links }) {
  return (
    <ul className="footer-link-list">
      {links.map(([label, to]) => (
        <li key={label}>
          <Link to={to}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const { settings } = useInstitutionSettings();
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState({
    quickLinks: false,
    contact: false,
  });
  const socialUrls = getSocialUrls(settings.social_links);
  const defaultAddress = "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia";
  const address = !settings.address || settings.address.startsWith("4th Cut, Near New Bus Stand")
    ? defaultAddress
    : settings.address;
  const phone = !settings.phone || settings.phone === "+91 6381243416"
    ? "+91 63812 43416"
    : settings.phone;
  const email = settings.email || "infodecode@code.com";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const toggleAccordion = (name) => {
    setOpenAccordions((current) => ({ ...current, [name]: !current[name] }));
  };

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.slice(1);
    const scrollToTarget = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(scrollToTarget);
    else window.setTimeout(scrollToTarget, 0);
  }, [location.pathname, location.hash]);

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <section className="footer-brand-column" aria-label="Decode Institution">
          <div className="footer-brand-lockup">
            <img className="footer-brand-logo" src={settings.logo_url || "/logos/decode-mark.svg"} alt="" />
            <div>
              <h2 className="footer-institution">DECODE INSTITUTION</h2>
              <p className="footer-tagline">LEARN · BUILD · GROW</p>
            </div>
          </div>
          <p className="footer-description">
            Empowering students with industry-ready skills, practical learning, and career-focused training.
          </p>
        </section>

        <nav className="footer-column" aria-label="Quick links">
          <h2 className="footer-accordion-desktop-heading">QUICK LINKS</h2>
          <button
            className="footer-accordion-trigger"
            type="button"
            aria-expanded={openAccordions.quickLinks}
            aria-controls="footer-quick-links-panel"
            onClick={() => toggleAccordion("quickLinks")}
          >
            <span>QUICK LINKS</span>
            {openAccordions.quickLinks
              ? <Minus size={18} aria-hidden="true" />
              : <Plus size={18} aria-hidden="true" />}
          </button>
          <div
            className={`footer-accordion-panel${openAccordions.quickLinks ? " is-open" : ""}`}
            id="footer-quick-links-panel"
          >
            <div className="footer-accordion-panel-inner">
              <FooterLinks links={quickLinks} />
            </div>
          </div>
        </nav>

        <section className="footer-column footer-contact-column" aria-labelledby="footer-contact-heading">
          <h2 className="footer-accordion-desktop-heading" id="footer-contact-heading">GET IN TOUCH</h2>
          <button
            className="footer-accordion-trigger"
            type="button"
            aria-expanded={openAccordions.contact}
            aria-controls="footer-contact-panel"
            onClick={() => toggleAccordion("contact")}
          >
            <span>GET IN TOUCH</span>
            {openAccordions.contact
              ? <Minus size={18} aria-hidden="true" />
              : <Plus size={18} aria-hidden="true" />}
          </button>
          <div
            className={`footer-accordion-panel${openAccordions.contact ? " is-open" : ""}`}
            id="footer-contact-panel"
          >
            <div className="footer-accordion-panel-inner">
              <div className="footer-contact">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={17} aria-hidden="true" />
                  <span>{address}</span>
                </a>
                <a href={`mailto:${email}`}>
                  <Mail size={17} aria-hidden="true" />
                  <span>{email}</span>
                </a>
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  <Phone size={17} aria-hidden="true" />
                  <span>{phone}</span>
                </a>
              </div>
              <div className="footer-socials" aria-label="Social media">
                {socialNetworks.map(([key, label, Icon]) => {
                  const url = socialUrls[key];
                  return url ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  ) : (
                    <span key={key} className="footer-social-unconfigured" aria-label={`${label} link not configured`} title={`${label} link not configured`}>
                      <Icon size={17} aria-hidden="true" />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Decode Institution. All rights reserved.</p>
        <p className="footer-credit">Built by the Pillars of Decode Student ❤️ | Proudly Developed by Decode Team</p>
      </div>
    </footer>
  );
}
