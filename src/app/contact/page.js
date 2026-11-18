import Image from "next/image";
import Link from "next/link";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactForm from "@/components/contact/ContactForm";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import "./contact.css";

const showroomAddress = "No. 14, Crosscut Road, Coimbatore";

const contactDetails = [
  { label: "Showroom Name", value: "Crueze TimeLine", icon: "showroom" },
  {
    label: "Address",
    value: showroomAddress,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroomAddress)}`,
    icon: "location",
    external: true,
  },
  {
    label: "Phone",
    value: "8122339694",
    href: "tel:8122339694",
    icon: "phone",
  },
  {
    label: "WhatsApp",
    value: "8122339694",
    href: "https://wa.me/918122339694",
    icon: "whatsapp",
    external: true,
  },
  { label: "Opening Hours", value: "10:00 AM – 8:00 PM", icon: "clock" },
  { label: "Working Days", value: "Monday – Saturday", icon: "calendar" },
  { label: "Sunday", value: "Closed", icon: "closed" },
];

const contactIcons = {
  showroom: (
    <>
      <path d="M4 10h16v10H4zM7 10V6h10v4" />
      <path d="M9 14h6M9 17h6" />
    </>
  ),
  location: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  phone: (
    <path d="m7 3 3 3-2 2a14 14 0 0 0 8 8l2-2 3 3-1.5 2a2 2 0 0 1-2.2.8A18 18 0 0 1 4.2 6.7 2 2 0 0 1 5 4.5L7 3Z" />
  ),
  whatsapp: (
    <>
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M9 9c.4 2 2 3.6 4 4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M8 3v6m8-6v6M4 10h16" />
    </>
  ),
  closed: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M8 3v6m8-6v6M4 10h16m3 4-6 6" />
    </>
  ),
};

function ContactIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      {contactIcons[name]}
    </svg>
  );
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

export const metadata = {
  title: "Contact Us | Crueze TimeLine",
  description:
    "Get in touch with Crueze TimeLine. Reach out to our showroom for inquiries, consultations, and watch care.",
};

export default function ContactPage() {
  return (
    <main className="contact-page flex-1 bg-[#F5EBE1] text-[#302219]">
      {/* Hero Section */}
      <section
        aria-labelledby="contact-hero-title"
        className="relative isolate overflow-hidden border-b border-[#D2AD86]/40 bg-[#1F140D]"
      >
        <div className="relative h-[clamp(16rem,28vw,28rem)] w-full">
          <Image
            src="/images/contact/contact-hero.png"
            alt="Luxury gold watch on rich dark silk fabric"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_center] sm:object-right"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#170E08]/90 via-[#1F140D]/65 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
            <div className="contact-hero-copy max-w-2xl py-8">
              <nav aria-label="Breadcrumb" className="mb-3">
                <ol className="flex items-center space-x-2 text-xs font-medium tracking-wide text-[#D2AD86]">
                  <li>
                    <Link href="/" className="transition-colors hover:text-[#FBF7F0]">
                      Home
                    </Link>
                  </li>
                  <li className="text-[#D2AD86]/60">/</li>
                  <li className="text-[#F8EBDD]" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>

              <h1
                id="contact-hero-title"
                className="contact-hero-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#FBF7F0]"
              >
                Let&apos;s Talk <span className="text-[#D2AD86]">Timepieces</span>
              </h1>
              <p className="contact-hero-subtitle mt-3 font-serif text-sm sm:text-base md:text-lg leading-relaxed text-[#D2AD86]/90">
                We&apos;re here to help you find your perfect timepiece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid (Contact Information & Send a Message) */}
      <ScrollRevealSection
        id="contact-enquiry-form"
        aria-labelledby="contact-section-title"
        className="mx-auto grid max-w-7xl scroll-mt-24 items-stretch gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-8 lg:py-20"
      >
        {/* Left Column: Contact Information Card with Full Background get-in-touch Image */}
        <aside
          className="scroll-reveal-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#3D281B] bg-[#23170F] p-6 sm:p-8 text-[#FBF7F0] shadow-[0_12px_36px_rgba(27,16,9,0.22)]"
          style={{ "--scroll-reveal-delay": "0ms" }}
        >
          {/* Full background get-in-touch image covering the entire card */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Image
              src="/images/contact/get-in-touch.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
            {/* Subtle dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#20140C]/92 via-[#23170F]/88 to-[#1A1009]/82" />
          </div>

          {/* Original Content Preserved Inside the Information Box */}
          <div className="relative z-10">
            <h2
              id="contact-section-title"
              className="scroll-reveal-heading font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#FBF7F0]"
            >
              Get in Touch
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#D2AD86]/90">
              Reach out to us — we&apos;d love to hear from you.
            </p>

            <ul className="mt-6 space-y-4 divide-y divide-[#3D281B]/60">
              {contactDetails.map(({ label, value, href, icon, external }, index) => (
                <li
                  key={label}
                  className="flex items-center gap-3.5 pt-3.5 first:pt-0"
                  style={{ "--scroll-reveal-delay": `${(index + 1) * 80}ms` }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D2AD86]/50 bg-[#D2AD86]/10 text-[#D2AD86] shadow-sm">
                    <ContactIcon name={icon} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D2AD86]/80">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="mt-0.5 inline-block text-sm font-medium text-[#FBF7F0] underline decoration-[#D2AD86]/60 underline-offset-4 transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2AD86]"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-0.5 block text-sm font-medium text-[#FBF7F0]">
                        {value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Footer inside the Card */}
          <div className="relative z-10 mt-7 pt-5 border-t border-[#3D281B]/80 flex items-center gap-3">
            <span className="text-xs font-medium tracking-wider text-[#D2AD86]">
              Follow Us
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Crueze TimeLine on ${social.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D2AD86]/40 bg-[#D2AD86]/10 text-[#D2AD86] transition-all hover:border-[#D2AD86] hover:bg-[#D2AD86]/25 hover:text-[#FBF7F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2AD86]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Send a Message Form */}
        <ContactForm />
      </ScrollRevealSection>

      {/* Frequently Asked Questions Section */}
      <ContactFaq />

      {/* Every Great Timepiece CTA Section with Full Background enquire Image */}
      <ScrollRevealSection
        aria-labelledby="contact-cta-title"
        className="contact-cta relative isolate overflow-hidden border-t border-[#D2AD86]/40 bg-[#1E130B] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 text-[#FBF7F0]"
      >
        {/* Full Background Image: enquire.png */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src="/images/contact/enquire.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right sm:object-[80%_center]"
            priority={false}
          />
          {/* Subtle dark gradient overlay across the left for crisp text contrast while keeping the watch movement clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#170E08]/95 via-[#1E130B]/80 to-[#1E130B]/20 sm:via-[#1E130B]/75 sm:to-transparent" />
        </div>

        {/* Foreground Content Positioned Directly Above the Background Image */}
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-xl text-left">
            <h2
              id="contact-cta-title"
              className="scroll-reveal-heading font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.2] text-[#FBF7F0]"
            >
              Every Great <span className="text-[#FBF7F0]">Timepiece Deserves</span>
              <br />
              a Conversation.
            </h2>
            <p
              className="scroll-reveal-card mt-2.5 text-xs sm:text-sm leading-relaxed text-[#D2AD86]"
              style={{ "--scroll-reveal-delay": "120ms" }}
            >
              Discover timeless craftsmanship with Cruze Timeline.
            </p>
            <div
              className="scroll-reveal-card mt-5"
              style={{ "--scroll-reveal-delay": "240ms" }}
            >
              <Link
                href="/watches"
                className="inline-flex min-h-10 items-center justify-center rounded-sm border border-[#D2AD86] bg-[#1E130B]/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBF7F0] backdrop-blur-sm transition-colors hover:border-[#F8EBDD] hover:bg-[#D2AD86]/20 hover:text-[#FBF7F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]"
              >
                <span>EXPLORE OUR COLLECTION</span>
                <span className="ml-2 font-normal" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
