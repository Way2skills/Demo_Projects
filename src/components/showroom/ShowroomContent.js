import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import ShowroomCollections from "@/components/showroom/ShowroomCollections";
import "./ShowroomAnimations.css";

const highlights = [
  {
    title: "Curated Collections",
    description:
      "Browse a considered selection of watch styles and makers in one place.",
    image: "/images/showroom/curated-collection.jpg",
  },
  {
    title: "Attention to Detail",
    description:
      "Explore the design, materials and movement information provided for each watch.",
    image: "/images/showroom/watchmaking.jpg",
  },
  {
    title: "Personal Assistance",
    description:
      "Find the Contact page and its inquiry form whenever you have a question.",
    image: "/images/showroom/personal-assistance.jpg",
  },
  {
    title: "A Thoughtful Experience",
    description:
      "Take your time exploring categories, brands and individual timepieces.",
    image: "/images/showroom/showroom-interior.jpg",
  },
];

function SectionIntro({
  eyebrow,
  title,
  titleId,
  description,
  centered = false,
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className="scroll-reveal-heading text-[10px] font-bold uppercase tracking-[0.24em] text-[#A77B52] sm:text-xs"
        style={{ transitionDelay: "0ms" }}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="scroll-reveal-heading mt-3 font-serif text-3xl font-normal leading-tight text-[#302219] sm:text-4xl lg:text-5xl"
        style={{ transitionDelay: "120ms" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="scroll-reveal-card mt-4 text-sm leading-7 text-[#6B4933] sm:text-base"
          style={{ "--scroll-reveal-delay": "240ms" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function WatchMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className="h-10 w-10"
    >
      <path d="M12 3h8l1 6a9 9 0 0 1 0 14l-1 6h-8l-1-6a9 9 0 0 1 0-14l1-6Z" />
      <circle cx="16" cy="16" r="6" />
      <path d="M16 12v4l3 2" />
    </svg>
  );
}

export default function ShowroomContent() {
  return (
    <main className="showroom-page flex-1 bg-[#F5F2EC] text-[#35332F]">
      <ScrollRevealSection
        aria-labelledby="showroom-hero-title"
        className="showroom-hero relative isolate flex min-h-[660px] items-center overflow-hidden bg-[#302219] sm:min-h-[700px] lg:min-h-[min(780px,90vh)]"
      >
        <Image
          src="/images/showroom/showroom-hero.jpg"
          alt="An elegant watch display in a warm, softly lit setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#24180F]/85 via-[#302219]/55 to-[#302219]/10"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p
              className="showroom-cinematic-line text-[10px] font-semibold uppercase tracking-[0.28em] text-[#EBD5BD] sm:text-xs"
              style={{ "--showroom-reveal-delay": "0ms" }}
            >
              The Crueze TimeLine online showroom
            </p>
            <h1
              id="showroom-hero-title"
              className="showroom-cinematic-line mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-tight text-[#FBF7F0] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ "--showroom-reveal-delay": "140ms" }}
            >
              Experience Timeless Elegance
            </h1>
            <p
              className="showroom-cinematic-line mt-6 max-w-xl text-sm leading-7 text-[#FBF7F0]/90 sm:text-base sm:leading-8"
              style={{ "--showroom-reveal-delay": "280ms" }}
            >
              Discover distinctive timepieces, explore thoughtful design and
              learn about the craftsmanship behind every detail.
            </p>
            <div
              className="showroom-cinematic-line mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--showroom-reveal-delay": "420ms" }}
            >
              <Button
                href="/watches"
                variant="primary"
                size="lg"
                className="w-full !bg-[#A77B52] hover:!bg-[#8A6342] sm:w-auto"
              >
                Explore Our Collection
              </Button>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center px-5 text-sm font-semibold text-[#FBF7F0] underline decoration-[#D2AD86] underline-offset-4 transition-colors hover:text-[#EBD5BD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBD5BD] sm:justify-start"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-about-title"
        className="showroom-about border-b border-[#DED8CD] bg-[#F8EBDD] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="showroom-image-frame showroom-mask-reveal relative aspect-[4/3] overflow-hidden border border-[#D2AD86]/50 bg-[#EBD5BD] shadow-[0_16px_40px_rgba(48,34,25,0.10)]">
            <Image
              src="/images/showroom/showroom-interior.jpg"
              alt="A warm, refined display of timepieces and watch details"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03] motion-reduce:transition-none"
            />
          </div>
          <div className="showroom-about-copy">
            <p
              className="scroll-reveal-heading text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A77B52] sm:text-xs"
              style={{ transitionDelay: "100ms" }}
            >
              A considered way to discover
            </p>
            <h2
              id="showroom-about-title"
              className="scroll-reveal-heading mt-3 font-serif text-3xl font-normal leading-tight text-[#302219] sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "220ms" }}
            >
              About Our Showroom
            </h2>
            <p
              className="scroll-reveal-card mt-5 text-sm leading-7 text-[#6B4933] sm:text-base"
              style={{ "--scroll-reveal-delay": "340ms" }}
            >
              Crueze TimeLine brings timepieces from Indian and international
              watchmakers together in one online destination. Explore different
              styles, compare product details and discover the design choices
              behind each collection at your own pace.
            </p>
            <p
              className="scroll-reveal-card mt-4 text-sm leading-7 text-[#6B4933] sm:text-base"
              style={{ "--scroll-reveal-delay": "460ms" }}
            >
              From the movement within to the materials and proportions on the
              outside, every detail offers another way to connect with a watch.
            </p>
            <Button
              href="/watches"
              variant="outline"
              size="md"
              className="scroll-reveal-card mt-7"
              style={{ "--scroll-reveal-delay": "580ms" }}
            >
              Browse Timepieces
            </Button>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-highlights-title"
        className="showroom-highlights px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="The Crueze approach"
            title="Why Choose Us"
            titleId="showroom-highlights-title"
            description="A clear, considered way to explore timepieces and the details that make each one distinctive."
            centered
          />
          <ul className="mt-9 grid grid-cols-1 items-stretch gap-4 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {highlights.map((highlight, index) => (
              <li
                key={highlight.title}
                className="scroll-reveal-card showroom-highlight-card relative min-w-0 overflow-hidden border border-[#D2AD86]/35 bg-gradient-to-br from-[#FBFAF7] via-[#FBFAF7] to-[#F3E9DA] p-5 shadow-[0_8px_24px_rgba(48,34,25,0.04)] sm:p-6"
                style={{ "--scroll-reveal-delay": `${1080 + index * 140}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="showroom-highlight-image pointer-events-none absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${highlight.image}")` }}
                />
                <span
                  aria-hidden="true"
                  className="showroom-highlight-overlay pointer-events-none absolute inset-0 bg-[#302219]/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-30 h-px w-20 bg-gradient-to-r from-[#A77B52] to-transparent"
                />
                <div className="relative z-20">
                  <div className="flex items-center justify-between text-[#A77B52]">
                    <span className="showroom-highlight-icon flex h-14 w-14 items-center justify-center rounded-full border border-[#D2AD86]/40 bg-[#F5F2EC]/90 backdrop-blur-sm">
                      <WatchMark />
                    </span>
                    <span className="showroom-highlight-number flex items-center gap-2 font-serif text-lg tracking-[0.1em] text-[#A77B52]">
                      <span
                        aria-hidden="true"
                        className="h-px w-5 bg-[#D2AD86]/70"
                      />
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="showroom-highlight-title mt-5 font-serif text-lg leading-snug text-[#302219] sm:text-xl">
                    {highlight.title}
                  </h3>
                  <p className="showroom-highlight-description mt-3 text-sm leading-6 text-[#6D6961]">
                    {highlight.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-collections-title"
        replay
        className="showroom-collections-section border-y border-[#DED8CD] bg-[#EEEAE2] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="showroom-collections-inner mx-auto w-full max-w-[90rem]">
          <ShowroomCollections />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-watchmaking-title"
        className="showroom-watchmaking bg-[#302219] px-4 py-14 text-[#F8EBDD] sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="showroom-watchmaking-copy order-2 lg:order-1">
            <p
              className="scroll-reveal-heading text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D2AD86] sm:text-xs"
              style={{ transitionDelay: "0ms" }}
            >
              Inside every timepiece
            </p>
            <h2
              id="showroom-watchmaking-title"
              className="scroll-reveal-heading mt-3 font-serif text-3xl font-normal leading-tight text-[#FBF7F0] sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "120ms" }}
            >
              The Art of Watchmaking
            </h2>
            <p
              className="scroll-reveal-card mt-5 text-sm leading-7 text-[#F8EBDD]/80 sm:text-base"
              style={{ "--scroll-reveal-delay": "240ms" }}
            >
              A watch movement is a carefully arranged system for measuring
              time. Mechanical movements use a sequence of springs, gears and
              components; quartz movements regulate time electronically.
            </p>
            <p
              className="scroll-reveal-card mt-4 text-sm leading-7 text-[#F8EBDD]/80 sm:text-base"
              style={{ "--scroll-reveal-delay": "360ms" }}
            >
              Case materials, dial finishes, proportions and small design
              decisions shape how each timepiece looks and feels. Explore the
              product details to learn what is specified for each watch.
            </p>
            <Link
              href="/watches"
              className="scroll-reveal-card mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#EBD5BD] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]"
              style={{ "--scroll-reveal-delay": "480ms" }}
            >
              Explore timepieces <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="showroom-image-frame showroom-mask-reveal showroom-watchmaking-image relative order-1 aspect-[4/3] overflow-hidden border border-[#D2AD86]/40 lg:order-2">
            <Image
              src="/images/showroom/watchmaking.jpg"
              alt="A close view of gears and components inside a mechanical watch movement"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span aria-hidden="true" className="showroom-image-reflection" />
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-experience-title"
        className="showroom-experience border-t border-[#DED8CD] bg-[#F8EBDD] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="showroom-image-frame showroom-mask-reveal relative aspect-[4/3] overflow-hidden border border-[#D2AD86]/50 bg-[#EBD5BD]">
            <Image
              src="/images/showroom/personal-assistance.jpg"
              alt="A customer looking closely at a watch during a product discussion"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03] motion-reduce:transition-none"
            />
          </div>
          <div className="showroom-experience-copy">
            <p
              className="scroll-reveal-heading text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A77B52] sm:text-xs"
              style={{ transitionDelay: "760ms" }}
            >
              Browse at your own pace
            </p>
            <h2
              id="showroom-experience-title"
              className="scroll-reveal-heading mt-3 font-serif text-3xl font-normal leading-tight text-[#302219] sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "880ms" }}
            >
              Your Experience, Our Priority
            </h2>
            <p
              className="scroll-reveal-card mt-5 text-sm leading-7 text-[#6B4933] sm:text-base"
              style={{ "--scroll-reveal-delay": "1000ms" }}
            >
              Explore by category or watchmaker, compare the product details
              available and take the time to find a design that feels right for
              you.
            </p>
            <p
              className="scroll-reveal-card mt-4 text-sm leading-7 text-[#6B4933] sm:text-base"
              style={{ "--scroll-reveal-delay": "1120ms" }}
            >
              Visit Contact Us to review the available contact information and
              inquiry form.
            </p>
            <Button
              href="/contact"
              variant="outline"
              size="md"
              className="scroll-reveal-card mt-7"
              style={{ "--scroll-reveal-delay": "1240ms" }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        aria-labelledby="showroom-cta-title"
        className="showroom-final-cta relative isolate flex min-h-[460px] items-center overflow-hidden bg-[#302219] sm:min-h-[500px]"
      >
        <div className="showroom-cta-image-mask absolute inset-0">
          <Image
            src="/images/showroom/showroom-cta.jpg"
            alt="A refined watch with a warm-toned dial and leather strap"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#24180F]/85 via-[#302219]/65 to-[#302219]/20"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 text-center sm:px-8 lg:px-12">
          <p
            className="scroll-reveal-heading text-[10px] font-semibold uppercase tracking-[0.28em] text-[#EBD5BD] sm:text-xs"
            style={{ transitionDelay: "200ms" }}
          >
            Find a timepiece that feels like yours
          </p>
          <h2
            id="showroom-cta-title"
            className="scroll-reveal-heading mt-4 font-serif text-4xl font-normal leading-tight text-[#FBF7F0] sm:text-5xl lg:text-6xl"
            style={{ transitionDelay: "320ms" }}
          >
            Every Second Tells a Story
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/watches"
              variant="primary"
              size="lg"
              className="scroll-reveal-card w-full !bg-[#A77B52] hover:!bg-[#8A6342] sm:w-auto"
              style={{ "--scroll-reveal-delay": "440ms" }}
            >
              Explore Watches
            </Button>
            <Button
              href="/contact"
              variant="ivory"
              size="lg"
              className="scroll-reveal-card w-full sm:w-auto"
              style={{ "--scroll-reveal-delay": "580ms" }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
