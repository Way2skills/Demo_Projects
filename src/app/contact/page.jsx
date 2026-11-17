
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ContactSections from "./ContactSections";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const contactRef = useRef(null);
  const formRef = useRef(null);

  // GOOGLE APPS SCRIPT URL - UNCHANGED
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxGAUef9iXdtmhyw4RRe3pIlZg0CmC27Al5Ilm_i10Kihb2QpQWKMUBgtkI6BX3QJDK0w/exec";

  // HERO ANIMATION
  useEffect(() => {
    const handleScroll = () => {
      setHeroVisible(window.scrollY < 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // CONTACT ANIMATION
  useEffect(() => {
    const element = contactRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // FORM VALIDATION + GOOGLE APPS SCRIPT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atCount = (email.match(/@/g) || []).length;

    if (atCount !== 1 || !emailPattern.test(email)) {
      setFormStatus(
        "Please enter a valid email address with only one @ symbol."
      );
      return;
    }

    // PHONE VALIDATION
    if (phone && !/^\d{10}$/.test(phone)) {
      setFormStatus("Please enter a valid 10-digit phone number.");
      return;
    }

    // CUSTOMER FORM DATA
    const formDataToSend = {
      name: String(formData.get("name") || "").trim(),
      email: email,
      phone: phone,
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || "").trim(),
    };

    setIsSubmitting(true);
    setFormStatus("");

    try {
      // GOOGLE APPS SCRIPT - UNCHANGED
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formDataToSend),
      });

      // RESET FORM
      form.reset();

      // SHOW SUCCESS SCREEN
      setFormStatus("success");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form submission error:", error);

      setFormStatus(
        "Unable to submit your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // SEND ANOTHER RESPONSE
  const handleAnotherResponse = () => {
    setIsSubmitted(false);
    setFormStatus("");

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const revealClass = `
    transform transition-all duration-1000 ease-out
    ${
      contactVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-10 opacity-0"
    }
  `;

  // COMMON FONT STYLE
  const fontClass = "font-sans";

  // FORM INPUT STYLE
  const inputClass =
    "w-full border-0 border-b border-[#D8D0C7] bg-transparent px-0 py-3 font-sans text-[14px] font-normal leading-6 tracking-normal text-[#29231F] outline-none transition-colors placeholder:font-sans placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#A69B90] focus:border-[#A88955]";

  // FORM LABEL STYLE
  const labelClass =
    "mb-2 block font-sans text-[14px] font-normal tracking-normal text-[#29231F]";

  // FORM HEADING
  const formHeadingClass =
    "font-sans text-[clamp(34px,4vw,54px)] font-normal leading-[1.04] tracking-[-0.045em] text-[#29231F]";

  // BUTTON STYLE
  const submitButtonClass =
    "mt-5 inline-flex min-h-12 w-full items-center justify-between border border-[#493326] bg-[#493326] px-6 font-sans text-[15px] font-medium tracking-normal text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#493326] sm:w-auto sm:min-w-[190px]";

  return (
    <main className={`${fontClass} overflow-hidden bg-[#F6F3EE] text-[#29231F]`}>

      {/* HERO SECTION */}
      <section className="relative flex h-[68vh] min-h-[540px] max-h-[680px] items-center overflow-hidden">

        <Image
          src="/images/contact/hero.jpeg"
          alt="Luxury Neolen furniture interior"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-transform duration-[1800ms] ease-out ${
            heroVisible ? "scale-100" : "scale-110"
          }`}
        />

        <div className="absolute inset-y-0 left-0 w-full bg-[#29231F]/95 sm:w-[62%] lg:w-[46%]" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#29231F]/95 via-[#29231F]/75 to-transparent sm:from-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">

          <div className="w-full max-w-[560px] sm:w-[62%] lg:w-[46%] lg:pr-8">

            <span
              className={`inline-block font-sans text-[9px] font-semibold tracking-[0.28em] text-[#E4C38E] transition-all duration-700 ease-out sm:text-[10px] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              CONTACT NEOLEN
            </span>

            <h1
              className={`mt-5 font-sans text-[clamp(34px,4vw,54px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#FDF9F3] transition-all delay-150 duration-1000 ease-out ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Let's Create a Space
              <br />
              <span className="italic text-[#DFBF89]">
                That Feels Like You.
              </span>
            </h1>

            <p
              className={`mt-5 max-w-[430px] font-sans text-[12px] leading-7 text-white/85 transition-all delay-300 duration-1000 ease-out sm:text-[13px] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Have a question about our furniture, an order,
              <br className="hidden sm:block" />
              or finding the right piece for your home?
            </p>

            <a
              href="#contact-form"
              className={`mt-7 inline-flex min-h-12 items-center gap-6 border border-white/55 px-6 font-sans text-[9px] font-bold tracking-[0.2em] text-white transition-all delay-500 duration-1000 hover:-translate-y-1 hover:border-[#F8F2E9] hover:bg-[#F8F2E9] hover:text-[#29231F] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              GET IN TOUCH
              <span className="font-sans text-base">↓</span>
            </a>

          </div>
        </div>
      </section>

      {/* INTRO + CONTACT FORM */}
      <section
        id="contact-form"
        className="mx-auto grid w-[90%] max-w-[1300px] grid-cols-1 items-stretch gap-10 pt-20 pb-8 sm:pt-24 sm:pb-10 lg:grid-cols-2 lg:gap-12 lg:pt-28 lg:pb-12"
      >

        {/* LEFT SIDE CONTACT CONTENT */}
        <div ref={contactRef}>

          <div className={`${revealClass} delay-0`}>
            <span className="font-sans text-[10px] font-bold tracking-[0.24em] text-[#A88955]">
              WE'D LOVE TO HEAR FROM YOU
            </span>

            <h2 className="mt-5 font-sans text-[clamp(38px,5vw,64px)] font-normal leading-[1.04] tracking-[-0.045em]">
              Let's Talk About
              <br />
              <span className="italic text-[#A88955]">
                Your Space.
              </span>
            </h2>
          </div>

          <p
            className={`${revealClass} mt-7 max-w-[490px] font-sans text-[15px] leading-8 text-[#756B62] delay-150`}
          >
            Whether you're looking for the perfect sofa, planning
            a complete room, or simply have a question, we're here
            to help.
          </p>

          {/* CONTACT DETAILS */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">

            {/* EMAIL */}
            <div className={`${revealClass} border-t border-[#DDD5CC] pt-5 delay-200`}>
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#A18E7D]">
                EMAIL
              </span>

              <a
                href="mailto:hello@neolenfurniture.com"
                className="mt-3 block break-all font-sans text-[15px] font-normal transition-colors hover:text-[#A88955]"
              >
                hello@neolenfurniture.com
              </a>
            </div>

            {/* PHONE */}
            <div className={`${revealClass} border-t border-[#DDD5CC] pt-5 delay-300`}>
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#A18E7D]">
                PHONE
              </span>

              <a
                href="tel:+916381243416"
                className="mt-3 block font-sans text-[15px] font-normal transition-colors hover:text-[#A88955]"
              >
                +91 63812 43416
              </a>
            </div>

            {/* LOCATION */}
            <div className={`${revealClass} border-t border-[#DDD5CC] pt-5 delay-[400ms]`}>
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#A18E7D]">
                LOCATION
              </span>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Near+N.+Pudupatty+Bus+Stop%2C+Namakkal+637001%2C+Tamil+Nadu%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-sans text-[15px] font-normal leading-7 transition-colors hover:text-[#A88955]"
              >
                Near N. Pudupatty Bus Stop,
                <br />
                Namakkal - 637001,
                <br />
                Tamil Nadu, India.
              </a>
            </div>

            {/* BUSINESS HOURS */}
            <div className={`${revealClass} border-t border-[#DDD5CC] pt-5 delay-500`}>
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#A18E7D]">
                BUSINESS HOURS
              </span>

              <p className="mt-3 font-sans text-[15px] font-normal leading-7">
                Monday – Saturday
                <br />
                10:00 AM – 7:00 PM
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div
          ref={formRef}
          className="h-full border border-[#E5DED6] bg-[#FFFDFA] p-6 text-[#29231F] shadow-[0_20px_55px_rgba(50,38,28,0.07)] transition-all duration-700 hover:shadow-[0_25px_65px_rgba(50,38,28,0.10)] sm:p-7 lg:p-8"
        >

          {isSubmitted ? (

            /* SUCCESS MESSAGE */
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#A88955] bg-[#F6F3EE]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#493326"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <span className="mb-4 font-sans text-[10px] font-bold tracking-[0.24em] text-[#A88955]">
                NEOLEN FURNITURE
              </span>

              <h3 className="font-sans text-[clamp(30px,4vw,42px)] font-normal leading-tight tracking-[-0.04em] text-[#29231F]">
                Submitted
                <br />
                Successfully!
              </h3>

              <p className="mt-5 max-w-[380px] font-sans text-[14px] leading-7 text-[#756B62]">
                Thank you for contacting Neolen Furniture.
                Your message has been received. We'll get
                back to you soon.
              </p>

              <button
                type="button"
                onClick={handleAnotherResponse}
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-5 border border-[#493326] bg-[#493326] px-7 font-sans text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#493326]"
              >
                SEND ANOTHER RESPONSE
                <span className="text-base">→</span>
              </button>

            </div>

          ) : (

            /* CONTACT FORM */
            <>
              {/* FORM HEADING */}
              <div className="mb-5">
                <span className="mb-4 block font-sans text-[10px] font-bold tracking-[0.24em] text-[#A88955]">
                  SEND US A MESSAGE
                </span>

                <div className="flex items-center gap-5">
                  <h3 className={formHeadingClass}>
                    Get in touch
                  </h3>

                  <div className="h-px flex-1 bg-[#DDD5CC]" />
                </div>

                <p className="mt-3 max-w-[420px] font-sans text-[14px] leading-7 text-[#756B62]">
                  Tell us what you have in mind. We'd love to hear from you.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">

                  {/* NAME */}
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      maxLength={254}
                      placeholder="Enter your email"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter your 10-digit phone number"
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                      }}
                      className={inputClass}
                    />
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      How can we help?
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      defaultValue=""
                      required
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" disabled className="bg-white text-[#29231F]">
                        Select an option
                      </option>

                      <option value="product" className="bg-white text-[#29231F]">
                        Product Enquiry
                      </option>

                      <option value="order" className="bg-white text-[#29231F]">
                        Order Support
                      </option>

                      <option value="design" className="bg-white text-[#29231F]">
                        Design Assistance
                      </option>

                      <option value="delivery" className="bg-white text-[#29231F]">
                        Delivery Enquiry
                      </option>

                      <option value="other" className="bg-white text-[#29231F]">
                        Other
                      </option>
                    </select>
                  </div>

                </div>

                {/* MESSAGE */}
                <div className="mt-4">
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Tell us how we can help..."
                    required
                    className={`${inputClass} min-h-[85px] resize-y`}
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${submitButtonClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {isSubmitting ? "Sending..." : "Send message"}

                  <span className="font-sans text-base font-normal">
                    {isSubmitting ? "..." : "→"}
                  </span>
                </button>

                {/* ERROR MESSAGE */}
                {formStatus && formStatus !== "success" && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="mt-5 border-l-2 border-red-600 bg-red-50 p-4"
                  >
                    <p className="font-sans text-[13px] leading-6 text-red-700">
                      {formStatus}
                    </p>
                  </div>
                )}

              </form>
            </>
          )}

        </div>
      </section>

      {/* OTHER CONTACT SECTIONS */}
      <ContactSections />

    </main>
  );
}
