
import Link from "next/link";

const furnitureLinks = [
  { name: "Sofas", href: "/furniture/living-room/sofas" },
  { name: "Beds", href: "/furniture/bedroom/beds" },
  { name: "Dining Tables", href: "/furniture/dining/dining-tables" },
  { name: "Chairs", href: "/furniture/seating/accent-chairs" },
  { name: "Wardrobes", href: "/furniture/bedroom/wardrobes" },
  { name: "TV Units", href: "/furniture/living-room/tv-units" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "New Arrivals", href: "/#new-arrivals" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#29231F] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-10 sm:py-10 lg:px-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">

          {/* Brand */}
          <div className="min-w-0">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-semibold tracking-[0.2em] sm:text-2xl">
                NEOLEN
              </h2>

              <p className="mt-1 text-[8px] tracking-[0.48em] text-[#C5A77B] sm:text-[9px]">
                FURNITURE
              </p>
            </Link>

            <p className="mt-3 max-w-xs text-[11px] leading-5 text-white/65 sm:mt-4 sm:text-xs sm:leading-6">
              Thoughtfully designed furniture that brings comfort,
              elegance and timeless beauty to your living spaces.
            </p>
          </div>

          {/* Furniture */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
              FURNITURE
            </h3>

            <ul className="space-y-2.5">
              {furnitureLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-block text-[11px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-[#C5A77B] sm:text-xs"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
              COMPANY
            </h3>

            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-block text-[11px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-[#C5A77B] sm:text-xs"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="min-w-0">
            <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
              GET IN TOUCH
            </h3>

            <div className="space-y-3 text-[11px] leading-5 text-white/60 sm:text-xs sm:leading-6">

              {/* Address */}
              <p>
                Near N. Pudupatty Bus Stop,
                <br />
                Namakkal - 637001,
                <br />
                Tamil Nadu, India.
              </p>

              {/* Phone */}
              <a
                href="tel:+916381243416"
                className="block w-fit transition-colors duration-300 hover:text-[#C5A77B]"
              >
                +91 63812 43416
              </a>

              {/* Contact */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-b border-[#C5A77B] pb-1 text-[11px] text-white transition-all duration-300 hover:gap-3 hover:text-[#C5A77B] sm:text-xs"
              >
                Contact Our Team
                <span>→</span>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:px-10 md:flex-row md:gap-4 lg:px-12">

          <p className="text-[10px] text-white/50 sm:text-[11px]">
            © {new Date().getFullYear()} Neolen Furniture. All rights reserved.
          </p>

          <p className="text-[10px] tracking-wide text-white/50 sm:text-[11px]">
            Designed for Better Living
          </p>

        </div>
      </div>
    </footer>
  );
}
