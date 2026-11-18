import Image from "next/image";
import Link from "next/link";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import { brands } from "@/data/brands";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/watches" },
  { label: "Watchmaker", href: "/#esteemed-brands" },
  { label: "Contact Us", href: "/contact" },
  { label: "Showroom", href: "/showroom" },
];

const brandLinks = brands.map(({ name, slug }) => ({
  label: name,
  href: `/brands/${slug}`,
}));

const twoLineBrandLabels = new Set([
  "Bangalore Watch Company",
  "Jaipur Watch Company",
]);

const linkClassName =
  "inline-flex max-w-full break-words rounded text-sm leading-6 text-[#EBDCC7] decoration-[#B9966C] underline-offset-4 transition-colors duration-200 hover:text-[#F8EBDD] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]";

function FooterHeading({ children, id }) {
  return (
    <h2
      id={id}
      className="mb-3 font-serif text-base font-medium tracking-wide text-[#D2AD86] sm:mb-5 sm:text-lg"
    >
      {children}
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#A77B52]/30 bg-[#38271F] text-[#F8EBDD]">
      <ScrollRevealSection
        aria-label="Footer information"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      >
        <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-6 border-b border-[#A77B52]/30 pb-7 sm:gap-x-8 sm:gap-y-10 sm:pb-10 lg:grid-cols-[1.15fr_1fr_0.8fr_1.25fr] lg:gap-10 lg:pb-12">
          <section
            aria-label="Crueze TimeLine"
            className="scroll-reveal-heading col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1 sm:block"
          >
            <Link
              href="/"
              aria-label="Crueze TimeLine home"
              className="inline-flex max-w-full rounded-lg border border-[#D2AD86]/50 bg-[#FBF7F0] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86] focus-visible:ring-offset-2 focus-visible:ring-offset-[#38271F] sm:p-4"
            >
              <Image
                src="/images/logo/logo.png"
                alt="Crueze TimeLine"
                width={2172}
                height={724}
                unoptimized
                className="h-auto w-28 object-contain sm:w-64 lg:w-60"
              />
            </Link>
            <p className="mt-0 min-w-0 max-w-sm flex-1 text-xs leading-5 text-[#EBDCC7] sm:mt-5 sm:flex-none sm:text-sm sm:leading-7">
              Discover thoughtfully curated timepieces shaped by timeless
              design, enduring craft, and a lasting appreciation for watchmaking.
            </p>
          </section>

          <address
            aria-labelledby="footer-get-in-touch"
            className="scroll-reveal-card min-w-0 not-italic"
            style={{ "--scroll-reveal-delay": "800ms" }}
          >
            <FooterHeading id="footer-get-in-touch">Get in Touch</FooterHeading>
            <dl className="space-y-2.5 text-sm leading-6 text-[#EBDCC7] sm:space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-[#B9966C]">
                  Showroom
                </dt>
                <dd className="mt-1">Crueze TimeLine</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-[#B9966C]">
                  Address
                </dt>
                <dd className="mt-1">No. 14, Crosscut Road, Coimbatore</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-[#B9966C]">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href="tel:8122339694"
                    className={linkClassName}
                    aria-label="Call Crueze TimeLine at 8122339694"
                  >
                    8122339694
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <nav
            aria-labelledby="footer-quick-links"
            className="scroll-reveal-card min-w-0"
            style={{ "--scroll-reveal-delay": "940ms" }}
          >
            <FooterHeading id="footer-quick-links">Quick Links</FooterHeading>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={linkClassName}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-labelledby="footer-shop-by-brand"
            className="scroll-reveal-card col-span-2 min-w-0 sm:col-span-1"
            style={{ "--scroll-reveal-delay": "1080ms" }}
          >
            <FooterHeading id="footer-shop-by-brand">
              Shop by Brand
            </FooterHeading>
            <ul className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-5 sm:gap-y-3">
              {brandLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={linkClassName}>
                    {twoLineBrandLabels.has(label) ? (
                      <>
                        {label.replace(" Company", "")}
                        <br />
                        Company
                      </>
                    ) : (
                      label
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="scroll-reveal-card border-t border-[#A77B52]/25 pt-6 text-center text-xs tracking-wide text-[#C9B89F]"
          style={{ "--scroll-reveal-delay": "1220ms" }}
        >
          <p>© 2026 Crueze TimeLine. All Rights Reserved.</p>
        </div>
      </ScrollRevealSection>
    </footer>
  );
}
