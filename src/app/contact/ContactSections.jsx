
"use client";

import { useEffect, useRef } from "react";

function Reveal({ children, className = "" }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("opacity-100", "translate-y-0");
          element.classList.remove("opacity-0", "translate-y-10");
        } else {
          element.classList.remove("opacity-100", "translate-y-0");
          element.classList.add("opacity-0", "translate-y-10");
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`translate-y-10 opacity-0 transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function ContactSections() {
  const mapQuery =
    "Near N. Pudupatty Bus Stop, Namakkal 637001, Tamil Nadu, India";

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <>
      {/* VISIT NEOLEN - COMPANY LOCATION */}
      <section className="mx-auto grid w-[90%] max-w-[1200px] grid-cols-1 items-center gap-12 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <div>
            <span className="text-[9px] font-bold tracking-[0.24em] text-[#A88955]">
              VISIT NEOLEN
            </span>

            <h2 className="mt-5 text-[clamp(38px,5vw,62px)] font-normal leading-[1.04] tracking-[-0.045em] text-[#29231F]">
              Come Experience
              <br />
              <span className="italic text-[#A88955]">
                It In Person.
              </span>
            </h2>

            <p className="mt-6 max-w-[460px] text-sm leading-8 text-[#756B62]">
              Discover our furniture, explore different materials
              and experience the comfort and character of Neolen
              pieces in person.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-t border-[#DDD5CC] pt-4">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#A18E7D]">
                  LOCATION
                </span>

                <p className="mt-3 text-[13px] leading-7 text-[#29231F]">
                  Near N. Pudupatty Bus Stop,
                  <br />
                  Namakkal - 637001,
                  <br />
                  Tamil Nadu, India.
                </p>
              </div>

              <div className="border-t border-[#DDD5CC] pt-4">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#A18E7D]">
                  BUSINESS HOURS
                </span>

                <p className="mt-3 text-[13px] leading-7 text-[#29231F]">
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-12 items-center gap-6 border border-[#493326] px-6 text-[9px] font-bold tracking-[0.18em] text-[#493326] transition-all duration-300 hover:-translate-y-1 hover:bg-[#493326] hover:text-white"
            >
              GET DIRECTIONS
              <span className="text-base">↗</span>
            </a>
          </div>
        </Reveal>

        {/* LIVE GOOGLE MAP */}
        <Reveal>
          <div className="overflow-hidden border-[8px] border-[#E8E1D8] bg-white shadow-[0_20px_60px_rgba(50,38,28,0.10)]">
            <div className="flex items-center justify-between bg-[#493326] px-5 py-4">
              <div>
                <span className="block text-[9px] font-semibold tracking-[0.2em] text-[#D9B97F]">
                  FIND OUR LOCATION
                </span>

                <span className="mt-1 block text-sm text-white">
                  Neolen Furniture
                </span>
              </div>

              <span className="text-2xl text-[#D9B97F]">
                ⌖
              </span>
            </div>

            <div className="relative h-[350px] w-full sm:h-[450px]">
              <iframe
                title="Neolen Furniture location - Namakkal"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  mapQuery
                )}&output=embed`}
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-3 bg-[#FFFDFA] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[300px] text-[11px] leading-6 text-[#756B62]">
                Near N. Pudupatty Bus Stop,
                Namakkal - 637001
              </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[9px] font-bold tracking-[0.15em] text-[#A88955] transition-colors hover:text-[#493326]"
              >
                OPEN IN GOOGLE MAPS ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
