"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    title: "Bedroom Retreats",
    subtitle:
      "Our signature bedroom collection — calming, cozy, and thoughtfully designed",
    cta: "Shop Now",
    image: "/images/rooms/bedroom.jpeg",
    href: "/rooms/bedroom-retreats",
  },
  {
    title: "Dining",
    subtitle: "Gathering spaces for everyday moments",
    cta: "Explore",
    image: "/images/rooms/dining-room.jpeg",
    href: "/rooms/dining-experiences",
  },
  {
    title: "Small Space",
    subtitle: "Smart solutions for compact living",
    cta: "Explore",
    image: "/images/rooms/small-space.jpeg",
    href: "/rooms/small-space-living",
  },
];

function RoomCard({ room, large = false, visible, delay = 0 }) {
  return (
    <Link
      href={room.href}
      className={`group relative block w-full overflow-hidden rounded-[16px] bg-[#F5F5F5] transition-all duration-1000 ease-out ${
        large
          ? "h-[520px] md:h-[720px]"
          : "h-[250px] md:h-[350px]"
      } ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-12 scale-[0.97] opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* IMAGE */}
      <Image
        src={room.image}
        alt={room.title}
        fill
        sizes={
          large
            ? "(max-width: 768px) 100vw, 60vw"
            : "(max-width: 768px) 100vw, 40vw"
        }
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-80" />

      {/* CONTENT */}
      <div className="absolute bottom-4 left-4 max-w-[85%] rounded-[14px] bg-black/70 px-4 py-3 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 md:bottom-5 md:left-5">
        <h2 className="text-[15px] font-medium text-white md:text-[17px]">
          {room.title}
        </h2>

        <p className="mt-1 text-[11px] leading-snug text-white/80 md:text-[13px]">
          {room.subtitle} •
        </p>

        <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-white md:text-xs">
          {room.cta} →
        </span>
      </div>
    </Link>
  );
}

export default function RoomsPage() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* =========================
          CENTER HEADING
      ========================= */}
      <section
        ref={sectionRef}
        className="px-6 pb-8 pt-14 md:pt-16"
      >
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="font-serif text-4xl font-medium tracking-tight text-black md:text-[56px]">
            Explore Our Rooms
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[14px] text-black/60 md:text-[16px]">
            Curated spaces designed for calm, comfort, and modern living
          </p>

          {/* SMALL LINE */}
          <div
            className={`mx-auto mt-5 h-px bg-[#B89570] transition-all duration-1000 ${
              visible ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? "350ms" : "0ms",
            }}
          />
        </div>
      </section>

      {/* =========================
          ROOM IMAGES
      ========================= */}
      <section className="px-4 pb-20 md:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 md:grid-cols-[1.6fr_1fr]">

          {/* =========================
              BEDROOM
              720px HEIGHT
          ========================= */}
          <RoomCard
            room={rooms[0]}
            large
            visible={visible}
            delay={450}
          />

          {/* =========================
              RIGHT SIDE
              2 EQUAL IMAGES
          ========================= */}
          <div className="grid grid-rows-2 gap-5">

            {/* DINING */}
            <RoomCard
              room={rooms[1]}
              visible={visible}
              delay={700}
            />

            {/* SMALL SPACE */}
            <RoomCard
              room={rooms[2]}
              visible={visible}
              delay={950}
            />

          </div>
        </div>
      </section>

    </main>
  );
}