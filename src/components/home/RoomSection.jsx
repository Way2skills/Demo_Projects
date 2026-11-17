
import Link from "next/link";
import { rooms } from "@/data/homeData";

export default function RoomSection() {
  return (
    <section className="overflow-hidden bg-[#F6F3EE] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 text-center animate-[fadeUp_0.8s_ease-out_both]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A88955]">
            FIND YOUR STYLE
          </p>

          <h2 className="text-3xl font-semibold text-[#29231F] md:text-4xl">
            Shop by Room
          </h2>

          <p className="mt-4 text-sm text-[#756B62]">
            Furniture ideas for every space in your home.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Link
              href={room.href}
              key={room.name}
              className="group relative block h-[300px] overflow-hidden bg-[#DDD5CC] animate-[fadeUp_0.9s_ease-out_both] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:h-[350px]"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Room Image */}
              <img
                src={room.image}
                alt={room.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-all duration-700 group-hover:from-black/75 group-hover:via-black/20" />

              {/* Room Content */}
              <div className="absolute bottom-0 left-0 w-full p-7 text-white transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="translate-y-2 text-2xl font-semibold opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {room.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm underline underline-offset-4 transition-all duration-300 group-hover:tracking-wider">
                    Explore Room
                  </span>

                  <span className="inline-block translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>

              {/* Border Hover Effect */}
              <div className="pointer-events-none absolute inset-3 border border-white/0 transition-all duration-500 group-hover:border-white/50" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
