"use client";

import { useState } from "react";
import Link from "next/link";

const announcements = [
  "Discover distinctive timepieces.",
  "Explore Indian and international watchmakers.",
  "Find a timepiece that reflects your style.",
  "Explore watches across different collections.",
];

function AnnouncementMessages() {
  return announcements.map((message) => (
    <span key={message} className="announcement-message">
      {message}
      <span className="mx-4 text-[#D2AD86]" aria-hidden="true">
        &bull;
      </span>
    </span>
  ));
}

/**
 * Subtle discovery-focused announcement marquee with a dismiss control.
 */
export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Showroom Announcement"
      className="border-b border-[#6B4933] bg-[#302219] px-4 py-2 text-xs text-[#F8EBDD]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <div className="hidden shrink-0 text-[11px] uppercase tracking-widest text-[#F8EBDD] sm:block">
          Crueze TimeLine
        </div>

        <div
          className="announcement-marquee min-w-0 flex-1 text-center text-[11px] font-normal tracking-wide text-[#F8EBDD] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#D2AD86] sm:text-xs"
          aria-label="Discover distinctive timepieces, Indian and international watchmakers, and collections"
          tabIndex={0}
        >
          <div className="announcement-marquee-track">
            <div className="announcement-marquee-copy">
              <AnnouncementMessages />
            </div>
            <div className="announcement-marquee-copy" aria-hidden="true">
              <AnnouncementMessages />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/contact"
            className="text-[11px] text-[#D2AD86] underline underline-offset-4 transition-colors hover:text-[#F8EBDD] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2AD86]"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement banner"
            className="rounded p-1 text-[#F8EBDD] transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2AD86]"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .announcement-marquee {
          overflow: hidden;
        }

        .announcement-marquee-track {
          display: flex;
          width: max-content;
          animation: announcement-marquee-scroll 36s linear infinite;
        }

        .announcement-marquee:hover .announcement-marquee-track,
        .announcement-marquee:focus-within .announcement-marquee-track {
          animation-play-state: paused;
        }

        .announcement-marquee-copy {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: space-around;
          min-width: max-content;
          padding-right: 2rem;
          white-space: nowrap;
        }

        .announcement-message {
          display: inline-flex;
          align-items: center;
        }

        @keyframes announcement-marquee-scroll {
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .announcement-marquee-track {
            width: 100%;
            animation: none;
            transform: none;
          }

          .announcement-marquee-copy {
            width: 100%;
            min-width: 0;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.25rem 0;
            padding-right: 0;
            white-space: normal;
          }

          .announcement-marquee-copy[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
