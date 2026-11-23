//---- HEADER ----
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useInstitutionSettings } from "../context/SettingsContext";
import "./Header.css";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Courses", "/courses"],
  ["Internships & Workshops", "/internships"],
  ["Contact Us", "/contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { settings } = useInstitutionSettings();
  const { pathname } = useLocation();

  const handleBrandClick = () => {
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={handleBrandClick}>
          {settings.logo_url ? <img className="brand-image" src={settings.logo_url} alt="" /> : <span className="brand-mark"><img src="/logos/decode-mark.svg" width="30" height="30" alt="" /></span>}
          <span>{settings.institution_name}<small>LEARN · BUILD · GROW</small></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {links.map(([label, to]) => (
            <NavLink key={label} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
        {open && <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)} />}
      </div>
    </header>
  );
}
