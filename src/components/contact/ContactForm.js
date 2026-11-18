"use client";

import { useRef, useState } from "react";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const inputClassName =
  "min-h-11 w-full rounded-md border border-[#E5D7C7] bg-[#FBFAF7] px-3.5 py-2.5 text-sm text-[#35332F] outline-none transition-colors placeholder:text-[#A29B91] focus:border-[#9B8055] focus:ring-2 focus:ring-[#9B8055]/25";

function isValidEmail(value) {
  const email = value.trim();
  const [localPart, domain, extraPart] = email.split("@");

  if (
    !localPart ||
    !domain ||
    extraPart !== undefined ||
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)
  ) {
    return false;
  }

  const domainLabels = domain.split(".");
  const topLevelDomain = domainLabels[domainLabels.length - 1];

  return (
    domain.length <= 253 &&
    domainLabels.length > 1 &&
    domainLabels.every(
      (label) =>
        label.length <= 63 &&
        /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i.test(label),
    ) &&
    /^[A-Z]{2,63}$/i.test(topLevelDomain)
  );
}

function validateContactField(name, value) {
  if (name === "email" && !isValidEmail(value)) {
    return "Enter a valid email address.";
  }

  if (name === "phone" && value && !/^[6-9]\d{9}$/.test(value)) {
    return "Enter a valid 10-digit mobile number.";
  }

  return undefined;
}

function validate(values) {
  const errors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  const emailError = validateContactField("email", values.email);
  if (emailError) errors.email = emailError;

  if (values.phone.trim()) {
    const phoneError = validateContactField("phone", values.phone);
    if (phoneError) errors.phone = phoneError;
  }

  if (values.subject.trim().length < 2) {
    errors.subject = "Enter a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Enter your message.";
  }

  return errors;
}

function formatInquiryMessage(values) {
  const details = [
    `Subject: ${values.subject}`,
    values.phone && `Phone number: ${values.phone}`,
  ].filter(Boolean);

  return [...details, values.message].join("\n\n");
}

async function submitInquiry(values) {
  const body = new URLSearchParams({
    name: values.fullName,
    email: values.email,
    message: formatInquiryMessage(values),
  });
  const response = await fetch("/api/inquire", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("We couldn't send your message. Please try again later.");
  }

  if (!response.ok || result?.ok !== true) {
    throw new Error(
      result?.error || "We couldn't send your message. Please try again later.",
    );
  }

  return result;
}

export default function ContactForm({ onSubmitMessage }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const submissionLock = useRef(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }

    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      if (name === "email" || name === "phone") {
        if (currentErrors[name]) {
          const error = validateContactField(name, value);
          if (error) {
            nextErrors[name] = error;
          } else {
            delete nextErrors[name];
          }
        }
      } else {
        nextErrors[name] = undefined;
      }

      return nextErrors;
    });
    setStatus(null);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name !== "email" && name !== "phone") return;

    const error = validateContactField(name, value);
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (error) {
        nextErrors[name] = error;
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionLock.current) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus(null);

    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);

    try {
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()]),
      );
      const result =
        typeof onSubmitMessage === "function"
          ? await onSubmitMessage(trimmedValues)
          : await submitInquiry(trimmedValues);

      if (result?.ok !== true) {
        throw new Error("We couldn't confirm that your message was sent.");
      }

      setValues(initialValues);
      setStatus({
        type: "success",
        message: "Your message has been sent successfully. We will be in touch shortly.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error && error.message.trim()
            ? error.message
            : "We couldn't send your message. Please try again later.",
      });
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="scroll-reveal-card flex h-full flex-col justify-between rounded-2xl border border-[#EBD5BD] bg-[#FBFAF7] p-6 sm:p-8 lg:p-9 shadow-[0_8px_24px_rgba(48,34,25,0.06)]"
      style={{ "--scroll-reveal-delay": "0ms" }}
    >
      <div>
        <div className="mb-6">
          <h2 className="scroll-reveal-heading font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#302219]">
            Send a Message
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#6D6961]">
            Drop us a message and we&apos;ll get back to you shortly.
          </p>
        </div>

        <fieldset disabled={isSubmitting} className="space-y-4">
          {/* Row 1: Full Name & Email Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name *"
                value={values.fullName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.fullName)}
                className={inputClassName}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-[#8A4B3A]" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email Address *"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                className={inputClassName}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[#8A4B3A]" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Number & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Phone Number *"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                className={inputClassName}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-[#8A4B3A]" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Subject *"
                value={values.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                className={inputClassName}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-[#8A4B3A]" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Your Message */}
          <div>
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Your Message *"
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              className={`${inputClassName} min-h-28 resize-y`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-[#8A4B3A]" role="alert">
                {errors.message}
              </p>
            )}
          </div>
        </fieldset>

        {status && (
          <p
            className={`mt-4 rounded border px-4 py-2.5 text-xs sm:text-sm ${
              status.type === "success"
                ? "border-[#9B8055]/50 bg-[#EEEAE2] text-[#4D6048]"
                : "border-[#8A4B3A]/30 bg-[#F7EEEA] text-[#8A4B3A]"
            }`}
            role={status.type === "success" ? "status" : "alert"}
          >
            {status.message}
          </p>
        )}
      </div>

      <div className="mt-6 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#24180F] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBF7F0] transition-colors hover:bg-[#3D281B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] disabled:cursor-wait disabled:opacity-70"
        >
          <span>{isSubmitting ? "Sending..." : "SEND MESSAGE"}</span>
          <span className="ml-2 font-normal" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
