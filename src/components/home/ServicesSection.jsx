
"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01.",
    title: "CUSTOM FURNITURE DESIGN",
    description:
      "Bring your vision to life with thoughtfully designed furniture. We focus on creating pieces that complement your style, space and everyday needs.",
    image: "/images/home/services/custom-design.jpeg",
    imageAlt: "Custom designed luxury furniture",
  },
  {
    number: "02.",
    title: "SPACE PLANNING",
    description:
      "Make every corner count. Discover furniture solutions that bring balance, comfort and functionality to your living spaces.",
    image: "/images/home/services/space-planning.jpeg",
    imageAlt: "Modern interior space planning",
  },
  {
    number: "03.",
    title: "MATERIAL & FINISH SELECTION",
    description:
      "Explore beautiful materials, rich wood finishes and carefully selected details that bring lasting character to your furniture.",
    image: "/images/home/services/material-selection.jpeg",
    imageAlt: "Premium furniture materials and finishes",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F7F4EF] text-[#2C1F17]"
    >
      {/* Main Heading */}
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div
          className={`service-reveal ${
            visible ? "service-visible" : ""
          }`}
        >
          <span className="mb-7 block h-[2px] w-14 bg-[#A88955]" />

          <p className="mb-5 text-xs font-medium tracking-[0.28em] text-[#8A5A36]">
            THE NEOLEN EXPERIENCE
          </p>

          <h2 className="max-w-[650px] font-serif text-3xl leading-[1.2] tracking-wide md:text-5xl lg:text-[56px]">
            EXPLORE OUR
            <br />
            EXCEPTIONAL
            <br />
            FURNITURE SERVICES
          </h2>
        </div>

        <div
          className={`service-main-image service-reveal ${
            visible ? "service-visible" : ""
          }`}
        >
          <div className="overflow-hidden rounded-[18px]">
            <img
              src="/images/home/services/services-main.jpeg"
              alt="Neolen luxury furniture interior"
              className="h-[280px] w-full object-cover transition-transform duration-1000 hover:scale-105 md:h-[390px]"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
        {services.map((service, index) => (
          <div
            key={service.number}
            className={`service-row service-reveal ${
              visible ? "service-visible" : ""
            } ${
              index % 2 === 1
                ? "md:grid-flow-dense"
                : ""
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div
              className={`overflow-hidden rounded-[16px] ${
                index % 2 === 1 ? "md:col-start-2" : ""
              }`}
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                className="h-[260px] w-full object-cover transition-transform duration-1000 hover:scale-105 md:h-[340px]"
              />
            </div>

            <div
              className={`flex items-start gap-5 py-8 md:items-center md:py-0 ${
                index % 2 === 1
                  ? "md:col-start-1 md:row-start-1"
                  : ""
              }`}
            >
              <span className="shrink-0 font-serif text-3xl text-[#A88955]">
                {service.number}
              </span>

              <div>
                <h3 className="font-serif text-xl leading-snug md:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-[470px] text-sm leading-7 text-[#71665D]">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .service-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .service-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 55px;
        }

        .service-row:last-child {
          margin-bottom: 0;
        }

        @media (min-width: 768px) {
          .service-row {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            margin-bottom: 85px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
