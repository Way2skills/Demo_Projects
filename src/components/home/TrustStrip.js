import ScrollRevealSection from "@/components/home/ScrollRevealSection";

/**
 * TrustStrip Component for Crueze TimeLine.
 * Compact four-pillar showroom trust strip.
 */

export default function TrustStrip() {
  const pillars = [
    {
      title: "Curated Multi-Brand Selection",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      title: "Authenticity & Transparency",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      title: "Personalised Assistance",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      title: "Customer Support",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      ),
    },
  ];

  return (
    <ScrollRevealSection
      aria-label="Showroom Trust Pillars"
      className="home-scroll-reveal border-b border-[#EBD5BD] bg-[#EBD5BD] py-3 text-[#302219] sm:py-4"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className={`scroll-reveal-card flex min-w-0 items-center justify-center gap-3 px-3 py-4 sm:gap-4 sm:px-6 lg:py-3 ${
                index < 2 ? "border-b border-[#D2AD86]" : ""
              } ${
                index % 2 === 0
                  ? "border-r border-[#D2AD86]"
                  : "border-r-0"
              } lg:border-b-0 ${
                index < pillars.length - 1
                  ? "lg:border-r lg:border-[#D2AD86]"
                  : "lg:border-r-0"
              }`}
              style={{ "--scroll-reveal-delay": `${index * 220}ms` }}
            >
              <span className="shrink-0 text-[#6B4933]">{pillar.icon}</span>
              <h3 className="text-sm font-medium leading-snug text-[#302219] sm:text-base">
                {pillar.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </ScrollRevealSection>
  );
}
