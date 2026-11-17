
import Image from "next/image";
import Link from "next/link";

const styles = [
  {
    number: "01",
    title: "Modern Minimal",
    description: "Clean lines, calm colours and beautifully simple spaces.",
    image: "/images/rooms/living-room-inspiration/modern-minimal.jpeg",
  },
  {
    number: "02",
    title: "Contemporary Luxury",
    description: "Elegant details and sophisticated living spaces.",
    image: "/images/rooms/living-room-inspiration/contemporary-luxury.jpeg",
  },
  {
    number: "03",
    title: "Natural & Warm",
    description: "Natural textures, warm tones and wooden accents.",
    image: "/images/rooms/living-room-inspiration/natural-warm.jpeg",
  },
  {
    number: "04",
    title: "Modern Classic",
    description: "Timeless elegance with a contemporary touch.",
    image: "/images/rooms/living-room-inspiration/modern-classic.jpeg",
  },
];

const spaceIdeas = [
  {
    title: "Small Space Living",
    description: "Smart ideas to make compact living rooms feel spacious.",
    image: "/images/rooms/small-space.jpeg",
  },
  {
    title: "Open Living Spaces",
    description: "Create a seamless connection between your living areas.",
    image: "/images/rooms/complete-home.jpeg",
  },
];

const tips = [
  {
    number: "01",
    title: "Furniture Placement",
    description: "Arrange furniture to create a comfortable and balanced layout.",
  },
  {
    number: "02",
    title: "Colour Combinations",
    description: "Bring harmony into your room with thoughtfully selected colours.",
  },
  {
    number: "03",
    title: "Lighting & Details",
    description: "Use lighting and simple accents to complete your space.",
  },
];

function ImageCard({ image, title, description, number }) {
  return (
    <article className="group">
      <div className="relative h-[260px] overflow-hidden bg-[#E9E3DA] sm:h-[320px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <span className="absolute bottom-5 left-5 text-xs tracking-[0.2em] text-white">
          {number}
        </span>

        <span className="absolute bottom-5 right-5 text-2xl text-white transition-transform duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </div>

      <div className="pt-5">
        <h3 className="text-xl font-medium text-[#29231F]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#756B62]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function LivingRoomInspirationPage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EE] text-[#29231F]">

      {/* HERO */}
      <section className="px-4 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A88955]">
              Neolen Interiors
            </p>

            <h1 className="mt-4 text-3xl font-light tracking-wide sm:text-5xl">
              Living Room Inspiration
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#756B62] sm:text-base">
              Discover thoughtful interiors, beautiful details and ideas
              to create a living room that feels like home.
            </p>
          </div>

          <div className="relative h-[300px] overflow-hidden sm:h-[430px] lg:h-[560px]">
            <Image
              src="/images/rooms/living-room.jpeg"
              alt="Living room interior inspiration"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-8 left-6 text-white sm:bottom-14 sm:left-12">
              <p className="text-xs uppercase tracking-[0.25em]">
                Spaces made for living
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-light sm:text-5xl">
                Make Room for Living
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* LIVING ROOM STYLES */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-9">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A88955]">
              Find Your Style
            </p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">
              Explore Living Room Styles
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#756B62]">
              Explore different design moods and discover the look
              that feels right for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2">
            {styles.map((style) => (
              <ImageCard
                key={style.number}
                image={style.image}
                title={style.title}
                description={style.description}
                number={style.number}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SPACE IDEAS */}
      <section className="bg-[#EDE8E0] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-9">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A88955]">
              Ideas for Every Home
            </p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">
              Spaces & Possibilities
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {spaceIdeas.map((space, index) => (
              <ImageCard
                key={space.title}
                image={space.image}
                title={space.title}
                description={space.description}
                number={`0${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN TIPS */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A88955]">
              The Art of Living
            </p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">
              Design & Styling Tips
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#756B62]">
              Small design decisions can make a beautiful difference
              to your everyday living space.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tips.map((tip) => (
              <article
                key={tip.number}
                className="border-t border-[#D8CFC3] pt-6"
              >
                <span className="text-sm tracking-widest text-[#A88955]">
                  {tip.number}
                </span>
                <h3 className="mt-5 text-xl font-medium">{tip.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#756B62]">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FURNITURE CTA */}
      <section className="bg-[#29231F] px-5 py-16 text-center text-white sm:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C5A77A]">
          Complete Your Space
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light sm:text-4xl">
          Find the Perfect Furniture for Your Living Room
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
          Explore thoughtfully designed furniture pieces made
          for comfort, beauty and everyday living.
        </p>

        <Link
          href="/furniture/living-room"
          className="mt-8 inline-flex items-center gap-3 border border-[#C5A77A] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#C5A77A] hover:text-[#29231F]"
        >
          Explore Furniture <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
