"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types/homepage";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  const renderTestimonials = (suffix = "") =>
    testimonials.map((testimonial) => (
      <article
        className="testimonial-card"
        key={`${testimonial.initials}${suffix}`}
      >
        <div>
          <div className="rating" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => (
              <Star fill="currentColor" key={index} size={15} />
            ))}
          </div>
          <blockquote>“{testimonial.quote}”</blockquote>
        </div>
        <div className="patron">
          <span className="patron-avatar">{testimonial.initials}</span>
          <div>
            <h3>{testimonial.name}</h3>
            <p>{testimonial.details}</p>
          </div>
        </div>
      </article>
    ));

  return (
    <section className="stories-section section-shell" id="stories">
      <div className="stories-heading">
        <span className="section-kicker">Customer Reviews</span>
        <h2>What Our Customers Say</h2>
      </div>
      <div
        aria-label="Customer testimonials"
        aria-roledescription="carousel"
        className={
          isTouchPaused
            ? "testimonial-marquee is-touch-paused"
            : "testimonial-marquee"
        }
        onTouchStart={() => {
          if (window.matchMedia("(max-width: 760px)").matches) {
            setIsTouchPaused(true);
          }
        }}
        onTouchEnd={() => setIsTouchPaused(false)}
        onTouchCancel={() => setIsTouchPaused(false)}
      >
        <div className="testimonial-track">
          <div className="testimonial-group">{renderTestimonials()}</div>
          <div aria-hidden="true" className="testimonial-group">
            {renderTestimonials("-duplicate")}
          </div>
        </div>
      </div>
    </section>
  );
}
