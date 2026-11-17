
import Image from "next/image";
import Link from "next/link";

const workspaceStyles = [
  {
    number: "01",
    title: "Modern Workspace",
    subtitle: "Clean lines. Focused living.",
    description:
      "Create a productive environment with minimalist furniture, clean layouts and thoughtfully designed workspace essentials.",
    image: "/images/rooms/workspace-styles/modern-workspace.jpeg",
  },
  {
    number: "02",
    title: "Luxury Home Office",
    subtitle: "Work with elegance.",
    description:
      "Bring sophistication to your home office with premium finishes, refined furniture and timeless design details.",
    image: "/images/rooms/workspace-styles/luxury-office.jpeg",
  },
  {
    number: "03",
    title: "Natural & Warm",
    subtitle: "Inspired by natural comfort.",
    description:
      "Design a calming workspace with warm wooden furniture, natural textures and earthy tones.",
    image: "/images/rooms/workspace-styles/natural-workspace.jpeg",
  },
  {
    number: "04",
    title: "Compact Workspace",
    subtitle: "Smart ideas for smaller spaces.",
    description:
      "Make the most of every corner with space-saving furniture and practical layouts designed for modern living.",
    image: "/images/rooms/workspace-styles/compact-workspace.jpeg",
  },
];

function WorkspaceStyleCard({ style }) {
  return (
    <article className="group">
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden rounded-lg bg-[#E9E3DA] sm:h-[320px] lg:h-[370px]">
        <Image
          src={style.image}
          alt={style.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute left-5 top-5 text-xs tracking-[0.2em] text-white">
          {style.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start pt-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#A88955]">
          Workspace Collection
        </p>

        <h2 className="mt-2 text-xl font-medium text-[#29231F] md:text-2xl">
          {style.title}
        </h2>

        <p className="mt-2 text-sm font-medium text-[#756B62]">
          {style.subtitle}
        </p>

        <p className="mt-3 max-w-md text-xs leading-6 text-[#756B62] md:text-sm">
          {style.description}
        </p>

        <Link
          href="/furniture"
          className="mt-5 inline-flex items-center gap-3 border-b border-[#4A3528] pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4A3528] transition-colors hover:border-[#A88955] hover:text-[#A88955]"
        >
          Shop Now
          <span className="text-base">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default function WorkFromHomePage() {
  return (
    <main className="min-h-screen bg-[#F6F3EE]">

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[580px]">
        <Image
          src="/images/rooms/home-office.jpeg"
          alt="Neolen home office interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E2C9A5] md:text-xs">
              Neolen Room Inspirations
            </p>

            <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-7xl">
              Work From Home
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-white/85 md:text-sm md:leading-7">
              Discover inspiring workspaces designed to bring
              comfort, creativity and productivity into your home.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 pb-8 pt-16 text-center md:px-10 md:pb-12 md:pt-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A88955] md:text-xs">
          Find Your Style
        </p>

        <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#29231F] sm:text-4xl md:text-5xl">
          Explore Workspace Styles
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[#756B62] md:text-sm md:leading-7">
          From modern minimalism to elegant luxury,
          discover a workspace that inspires your everyday work.
        </p>
      </section>

      {/* Workspace Style Cards */}
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {workspaceStyles.map((style) => (
            <WorkspaceStyleCard
              key={style.number}
              style={style}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#29231F] px-5 py-16 text-center md:py-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A582] md:text-xs">
          Complete Your Workspace
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-tight text-white md:text-5xl">
          Create Your Perfect Workspace
        </h2>

        <p className="mt-4 text-xs text-[#D8CEC3] md:text-sm">
          Explore thoughtfully designed furniture for your home office.
        </p>

        <Link
          href="/furniture"
          className="mt-8 inline-flex items-center gap-3 bg-[#C5A582] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#29231F] transition-colors hover:bg-white"
        >
          Explore Office Furniture
          <span className="text-base">↗</span>
        </Link>
      </section>

    </main>
  );
}
