"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, Clock, CheckCircle2, Send, AlertCircle } from "lucide-react";
import SmoothReveal from "@/components/animations/SmoothReveal";
import RevealText from "@/components/animations/RevealText";
import PageVisual from "@/components/layout/PageVisual";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "Residential Interiors",
    projectLocation: "",
    approxFootprint: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your name.";
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your contact phone number.";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please share a brief note about your space or questions.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulating verified instant processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleWhatsAppRedirect = () => {
    const msg = `*New Shinewood Design Inquiry*%0A%0A*Name:* ${encodeURIComponent(formData.fullName)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email || "N/A")}%0A*Discipline:* ${encodeURIComponent(formData.serviceType)}%0A*Location:* ${encodeURIComponent(formData.projectLocation || "Covai")}%0A*Area:* ${encodeURIComponent(formData.approxFootprint || "Not specified")}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/918610093520?text=${msg}`, "_blank");
  };

  return (
    <main className="w-full bg-[#171513] text-[#FCFAF6] pt-32 pb-24">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <SmoothReveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            Direct Engagement
          </div>
        </SmoothReveal>

        <RevealText
          text="Initiate Your Architectural Dialogue."
          tag="h1"
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#FCFAF6] max-w-4xl leading-[1.1]"
        />

        <SmoothReveal delay={0.2}>
          <p className="mt-6 text-base sm:text-lg text-[#D8C8B2]/90 font-light max-w-2xl leading-relaxed">
            Whether preparing for a new villa build, kitchen overhaul, or executive headquarters,
            our studio team in Covai is prepared to guide your transformation.
          </p>
        </SmoothReveal>
      </section>

      <PageVisual variant="contact" />

      {/* Main Two-Column Contact Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#1B1815] border border-[#D8C8B2]/15 space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                STUDIO HEADQUARTERS
              </span>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#30251F] border border-[#76533D]/50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D8C8B2]/60">
                      Telephone
                    </span>
                    <a
                      href="tel:8610093520"
                      className="text-lg font-serif text-[#FCFAF6] hover:text-[#C5A880] transition-colors"
                    >
                      8610093520
                    </a>
                    <p className="text-xs text-[#D8C8B2]/60 mt-0.5">
                      Direct line to Principal Architect
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#30251F] border border-[#76533D]/50 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D8C8B2]/60">
                      WhatsApp Studio Chat
                    </span>
                    <a
                      href="https://wa.me/918610093520?text=Hello%20Shinewood,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-serif text-[#FCFAF6] hover:text-[#C5A880] transition-colors"
                    >
                      +91 8610093520
                    </a>
                    <p className="text-xs text-[#D8C8B2]/60 mt-0.5">
                      Instant response & floor plan reviews
                    </p>
                  </div>
                </div>

                {/* Studio Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#30251F] border border-[#76533D]/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D8C8B2]/60">
                      Studio Address
                    </span>
                    <p className="text-base text-[#FCFAF6] font-medium">
                      8th Cross, Balaji Nagar, Covai
                    </p>
                    <p className="text-xs text-[#D8C8B2]/60 mt-0.5">
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#30251F] border border-[#76533D]/50 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#D8C8B2]/60">
                      Studio Hours
                    </span>
                    <p className="text-sm text-[#FCFAF6]">
                      Mon – Sat: 09:30 AM – 07:30 PM
                    </p>
                    <p className="text-xs text-[#C5A880] mt-0.5">
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="p-6 bg-[#241C17] border border-[#C5A880]/30 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                ON-SITE VISITS
              </span>
              <h3 className="font-serif text-xl text-[#FCFAF6]">
                Site Feasibility Assessments
              </h3>
              <p className="text-xs text-[#D8C8B2] leading-relaxed font-light">
                Our architectural team conducts on-site measurements and structural evaluations
                across Covai, Tiruppur, Coimbatore district, and surrounding regions.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Project Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#1B1815] border border-[#D8C8B2]/15 shadow-2xl relative">
              {isSubmitted ? (
                /* Submission Confirmation State */
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#76533D]/30 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6]">
                    Inquiry Received with Distinction.
                  </h3>

                  <p className="text-sm text-[#D8C8B2] max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-[#FCFAF6]">{formData.fullName}</strong>.
                    Our principal architectural team will review your specifications and contact
                    you at <strong className="text-[#C5A880]">{formData.phone}</strong> within
                    24 hours.
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-[#171513] font-semibold text-xs font-mono tracking-widest uppercase transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward Directly to WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          phone: "",
                          email: "",
                          serviceType: "Residential Interiors",
                          projectLocation: "",
                          approxFootprint: "",
                          message: "",
                        });
                      }}
                      className="text-xs font-mono tracking-wider text-[#D8C8B2] hover:text-[#FCFAF6] underline underline-offset-4"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
                      PROJECT CONSULTATION FORM
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] font-light">
                      Tell Us About Your Vision
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Rajesh Kumar"
                        className={`w-full px-4 py-3 bg-[#171513] border text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none transition-colors ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#D8C8B2]/20 focus:border-[#C5A880]"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. 98420 12345"
                        className={`w-full px-4 py-3 bg-[#171513] border text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none transition-colors ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#D8C8B2]/20 focus:border-[#C5A880]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. rajesh@company.com"
                        className={`w-full px-4 py-3 bg-[#171513] border text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#D8C8B2]/20 focus:border-[#C5A880]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Discipline Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Discipline / Service *
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceType: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#171513] border border-[#D8C8B2]/20 text-sm text-[#FCFAF6] focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        <option value="Residential Interiors">Residential Interiors</option>
                        <option value="Luxury Living Spaces">Luxury Living Spaces</option>
                        <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                        <option value="Bedroom Interiors">Bedroom Interiors</option>
                        <option value="Commercial Interiors">Commercial Interiors</option>
                        <option value="Custom Furniture & Woodwork">Custom Furniture & Woodwork</option>
                        <option value="Complete Turnkey Villa">Complete Turnkey Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Project Location
                      </label>
                      <input
                        type="text"
                        value={formData.projectLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, projectLocation: e.target.value })
                        }
                        placeholder="e.g. Race Course / RS Puram, Covai"
                        className="w-full px-4 py-3 bg-[#171513] border border-[#D8C8B2]/20 text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    {/* Footprint */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                        Approx. Area (SQ.FT)
                      </label>
                      <input
                        type="text"
                        value={formData.approxFootprint}
                        onChange={(e) =>
                          setFormData({ ...formData, approxFootprint: e.target.value })
                        }
                        placeholder="e.g. 4,500 sq.ft"
                        className="w-full px-4 py-3 bg-[#171513] border border-[#D8C8B2]/20 text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono tracking-wider text-[#D8C8B2] uppercase">
                      Tell Us About Your Project & Timeline *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your architectural thoughts, timeline preferences, or specific material requirements..."
                      className={`w-full px-4 py-3 bg-[#171513] border text-sm text-[#FCFAF6] placeholder-[#D8C8B2]/30 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                            : "border-[#D8C8B2]/20 focus:border-[#C5A880]"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#76533D] hover:bg-[#C5A880] text-[#FCFAF6] hover:text-[#171513] text-xs font-mono tracking-widest uppercase font-medium transition-all duration-300 shadow-xl border border-[#C5A880]/30 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Specification...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Design Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Inquiries Section */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 border-t border-[#D8C8B2]/15 pt-20">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
            STUDIO TRANSPARENCY
          </span>
          <h2 className="font-serif text-3xl text-[#FCFAF6] font-light mt-2">
            Frequently Addressed Inquiries
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-2">
            <h3 className="font-serif text-lg text-[#FCFAF6]">
              How does the initial consultation proceed?
            </h3>
            <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
              We begin with a complimentary exploration session at our Covai studio or directly at your site. We review architectural drawings, understand your spatial routine, and formulate a customized feasibility proposal.
            </p>
          </div>

          <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-2">
            <h3 className="font-serif text-lg text-[#FCFAF6]">
              Do you take projects outside Covai?
            </h3>
            <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
              Yes. While our primary studio and joinery workshop are rooted in Balaji Nagar, Covai, we frequently execute high-end villas and commercial headquarters in Coimbatore, Tiruppur, Salem, Ooty, Chennai, and Bengaluru.
            </p>
          </div>

          <div className="p-6 bg-[#1B1815] border border-[#D8C8B2]/10 space-y-2">
            <h3 className="font-serif text-lg text-[#FCFAF6]">
              What warranties are provided on Shinewood joinery?
            </h3>
            <p className="text-xs text-[#D8C8B2]/80 leading-relaxed font-light">
              All our modular kitchens and wardrobes feature certified European hardware (Blum, Hettich) backed by lifetime replacement warranties, complemented by a 10-year Shinewood structural craftsmanship warranty.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
