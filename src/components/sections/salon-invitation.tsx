"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function SalonInvitation() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function requestPass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSuccess(true);
    setEmail("");

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setIsSuccess(false);
    }, 1800);
  }

  return (
    <section className="salon-section section-shell" id="salon">
      <div className="salon-panel">
        <div className="salon-glow" aria-hidden="true" />
        <div className="salon-content">
          <span className="salon-badge">By Invitation Only</span>
          <h2>Request Entry to the Private Loom Salon</h2>
          <p>
            Subscribers receive priority allocation for limited loom
            unveilings, private bridal concierge bookings, and invitations to
            international trunk shows.
          </p>
          <form className="salon-form" onSubmit={requestPass}>
            <label className="visually-hidden" htmlFor="salon-email">
              Your email address
            </label>
            <input
              autoComplete="email"
              id="salon-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={
                isSuccess
                  ? "Invitation dispatched to your inbox"
                  : "Enter your personal email address"
              }
              required
              type="email"
              value={email}
            />
            <button type="submit">
              {isSuccess ? (
                <>
                  Pass Requested <Check size={15} />
                </>
              ) : (
                <>
                  Request Pass <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
          <small>
            Complete privacy assured. We respect the sanctity of your private
            salon correspondence.
          </small>
        </div>
      </div>
    </section>
  );
}
