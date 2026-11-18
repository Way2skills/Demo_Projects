import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import "./ShopByWho.css";

const audiences = [
  {
    name: "For Him",
    imagePath: "/images/categories/for-him.jpg",
    imageAlt: "A watch styled for him",
    imagePosition: "73% center",
    href: "/categories/mens-watches",
  },
  {
    name: "For Her",
    imagePath: "/images/categories/for-her.jpg",
    imageAlt: "A watch styled for her",
    imagePosition: "68% center",
    href: "/categories/womens-watches",
  },
  {
    name: "Kids",
    imagePath: "/images/categories/kids.jpg",
    imageAlt: "A watch styled for kids",
    imagePosition: "63% center",
    href: "/kids",
  },
  {
    name: "Couple",
    imagePath: "/images/categories/couple.jpg",
    imageAlt: "Watches styled for couples",
    imagePosition: "75% center",
    href: "/couples",
  },
];

function AudienceCard({ audience, index }) {
  const card = (
    <>
      <Image
        src={audience.imagePath}
        alt={audience.imageAlt}
        fill
        sizes="(min-width: 1280px) calc((100vw - 156px) / 4), (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 640px) calc((100vw - 80px) / 2), (min-width: 360px) calc((100vw - 44px) / 2), calc(100vw - 32px)"
        className="watch-by-who-image scale-[1.04] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09] motion-reduce:transition-none"
        style={{ objectPosition: audience.imagePosition }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#24180F]/80 via-[#302219]/15 to-transparent"
      />
      <span className="watch-by-who-dial-reveal" aria-hidden="true">
        <span className="watch-by-who-dial-orbit" />
        <span className="watch-by-who-dial-markings" />
        <span className="watch-by-who-dial-hand" />
      </span>
      <span className="absolute inset-x-0 bottom-0 z-[3] flex flex-wrap items-end justify-between gap-2 p-4 sm:gap-3 sm:p-5 lg:p-6">
        <span
          className="watch-by-who-card-title font-serif text-xl font-medium tracking-wide text-[#FBF7F0] sm:text-2xl lg:text-3xl"
          data-title={audience.name}
        >
          {audience.name}
        </span>
        <span className="shrink-0 rounded-full border border-[#EBD5BD]/70 bg-[#302219]/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FBF7F0] backdrop-blur-sm sm:text-xs">
          {audience.href ? "Explore" : audience.status}
        </span>
      </span>
    </>
  );
  const cardClassName =
    "group watch-by-who-card relative block aspect-[4/5] overflow-hidden rounded-xl border border-[#EBD5BD] bg-[#EBD5BD] shadow-[0_8px_24px_rgba(48,34,25,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(48,34,25,0.16)] motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <li
      className="scroll-reveal-card min-w-0"
      style={{ "--scroll-reveal-delay": `${index * 250}ms` }}
    >
      {audience.href ? (
        <Link
          href={audience.href}
          aria-label={`Shop ${audience.name}`}
          className={cardClassName}
        >
          {card}
        </Link>
      ) : (
        <div className={`${cardClassName} cursor-default`}>
          {card}
        </div>
      )}
    </li>
  );
}

export default function ShopByWho() {
  return (
    <ScrollRevealSection
      aria-label="Shop by who"
      waitForScroll
      className="home-scroll-reveal shop-by-who-section border-b border-[#EBD5BD] bg-[#F7F2E8] px-4 py-12 text-[#302219] sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="w-full">
        <div className="scroll-reveal-heading">
          <SectionHeading
            tag="A PERSONAL TOUCH"
            title="SHOP BY WHO"
            subtitle="Find a considered timepiece for every wrist and every occasion."
            align="center"
            theme="light"
            className="!mb-8 md:!mb-10 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:tracking-wide"
          />
        </div>
        <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-5">
          {audiences.map((audience, index) => (
            <AudienceCard
              key={audience.name}
              audience={audience}
              index={index}
            />
          ))}
        </ul>
      </div>
    </ScrollRevealSection>
  );
}
