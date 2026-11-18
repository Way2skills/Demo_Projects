"use client";

import Link from "next/link";
import { useId, useState } from "react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

const questions = [
  {
    question: "Where can I browse the watch collection?",
    answer: (
      <>
        Visit the{" "}
        <Link
          href="/watches"
          className="font-medium text-[#8A6038] underline decoration-[#C09363]/60 underline-offset-4 hover:text-[#5E3E20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
        >
          watches collection
        </Link>{" "}
        to explore the timepieces currently listed on Crueze TimeLine.
      </>
    ),
  },
  {
    question: "Can I save watches to view later?",
    answer: (
      <>
        Yes. Use the wishlist heart on a watch card or its product page, then
        visit your{" "}
        <Link
          href="/wishlist"
          className="font-medium text-[#8A6038] underline decoration-[#C09363]/60 underline-offset-4 hover:text-[#5E3E20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
        >
          wishlist
        </Link>{" "}
        to review saved timepieces.
      </>
    ),
  },
  {
    question: "Where can I review watches I have selected?",
    answer: (
      <>
        Your selected items are available in the{" "}
        <Link
          href="/cart"
          className="font-medium text-[#8A6038] underline decoration-[#C09363]/60 underline-offset-4 hover:text-[#5E3E20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
        >
          shopping bag
        </Link>
        .
      </>
    ),
  },
];

export default function ContactFaq() {
  const accordionId = useId();
  const [openItems, setOpenItems] = useState(() => new Set());

  const toggleItem = (index) => {
    setOpenItems((currentItems) => {
      const nextItems = new Set(currentItems);
      if (nextItems.has(index)) {
        nextItems.delete(index);
      } else {
        nextItems.add(index);
      }
      return nextItems;
    });
  };

  return (
    <ScrollRevealSection
      aria-labelledby="contact-faq-heading"
      className="contact-faq relative isolate overflow-hidden bg-transparent px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="contact-faq-content relative z-10 mx-auto max-w-7xl">
        {/* Title with decorative gold horizontal lines flanking as in reference image */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <span className="h-[1.5px] w-12 sm:w-28 bg-[#C8A27A]/80" aria-hidden="true" />
          <h2
            id="contact-faq-heading"
            className="scroll-reveal-heading text-center font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#24180F]"
          >
            Frequently Asked Questions
          </h2>
          <span className="h-[1.5px] w-12 sm:w-28 bg-[#C8A27A]/80" aria-hidden="true" />
        </div>

        {/* Questions Accordion List matching reference image design */}
        <div className="space-y-2.5 sm:space-y-3">
          {questions.map(({ question, answer }, index) => {
            const isOpen = openItems.has(index);
            return (
              <div
                key={question}
                className="contact-faq-item scroll-reveal-card overflow-hidden rounded-md border border-[#E5D7C7] bg-[#FDF9F3]/90 transition-colors duration-200 hover:bg-[#FAF4EB] px-4 sm:px-6 shadow-[0_1px_4px_rgba(48,34,25,0.03)]"
                style={{ "--scroll-reveal-delay": `${(index + 1) * 80}ms` }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${accordionId}-answer-${index}`}
                  onClick={() => toggleItem(index)}
                  className="flex min-h-12 sm:min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B8055]"
                >
                  <span className="pr-2 font-bold text-sm sm:text-base leading-snug text-[#24180F]">
                    {question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-[#B88B58] text-[#FDF9F3] shadow-sm transition-all duration-200 hover:bg-[#A57847]"
                  >
                    {isOpen ? (
                      <svg
                        className="h-3 w-3 stroke-current"
                        viewBox="0 0 12 12"
                        fill="none"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <line x1="2.5" y1="6" x2="9.5" y2="6" />
                      </svg>
                    ) : (
                      <svg
                        className="h-3 w-3 stroke-current"
                        viewBox="0 0 12 12"
                        fill="none"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <line x1="6" y1="2.5" x2="6" y2="9.5" />
                        <line x1="2.5" y1="6" x2="9.5" y2="6" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  id={`${accordionId}-answer-${index}`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="border-t border-[#E5D7C7]/60 pb-3.5 pt-2.5 pr-2 text-xs sm:text-sm leading-relaxed text-[#6D6961] sm:pr-8">
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
