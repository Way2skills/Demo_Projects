"use client";

import { useEffect, useRef, useState } from "react";
import "./ScrollRevealSection.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export default function ScrollRevealSection({
  children,
  className = "",
  replay = false,
  waitForScroll = false,
  ...sectionProps
}) {
  const sectionRef = useRef(null);
  const hasRevealedRef = useRef(false);
  const [revealState, setRevealState] = useState("waiting");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealImmediately =
      window.matchMedia(reducedMotionQuery).matches ||
      !("IntersectionObserver" in window);

    if (revealImmediately) {
      hasRevealedRef.current = true;
      const fallbackFrame = window.requestAnimationFrame(() => {
        setRevealState("static");
      });
      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    if (replay) {
      let isIntersecting = false;
      let observer;
      let touchStart = null;
      const stopScrollIntentListeners = () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
      };
      const armReveal = () => {
        stopScrollIntentListeners();
        section.setAttribute("data-reveal-enabled", "true");
        setRevealState("waiting");
        observer.observe(section);
      };
      const handleWheel = (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) armReveal();
      };
      const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
      };
      const handleTouchMove = (event) => {
        const touch = event.touches[0];
        if (!touch || !touchStart) return;

        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        if (Math.abs(deltaY) > Math.abs(deltaX)) armReveal();
      };
      const handleKeyDown = (event) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            " ",
            "Home",
            "End",
          ].includes(event.key)
        ) {
          armReveal();
        }
      };

      try {
        observer = new IntersectionObserver(
          (entries) => {
            const isNowIntersecting = entries.some(
              (entry) => entry.isIntersecting,
            );
            if (isNowIntersecting === isIntersecting) return;

            isIntersecting = isNowIntersecting;
            setRevealState(isIntersecting ? "revealed" : "waiting");
          },
          { threshold: 0.01 },
        );
      } catch {
        observer?.disconnect();
        const fallbackFrame = window.requestAnimationFrame(() => {
          setRevealState("static");
        });
        return () => window.cancelAnimationFrame(fallbackFrame);
      }

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        observer.disconnect();
        stopScrollIntentListeners();
      };
    }

    let observer;
    let revealIfInViewport = () => {};
    let revealWhenPageReturns = () => {};
    const stopViewportChecks = () => {
      window.removeEventListener("scroll", revealIfInViewport);
      window.removeEventListener("resize", revealIfInViewport);
      document.removeEventListener(
        "visibilitychange",
        revealWhenPageReturns,
      );
    };
    const revealOnce = () => {
      if (hasRevealedRef.current) return;

      hasRevealedRef.current = true;
      section.setAttribute("data-reveal-enabled", "true");
      setRevealState("revealed");
      observer?.disconnect();
      stopViewportChecks();
    };
    const isInViewport = () => {
      const bounds = section.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    };
    revealIfInViewport = () => {
      if (isInViewport()) revealOnce();
    };

    if (waitForScroll) {
      let scrollIntentStarted = false;
      let touchStart = null;
      const stopScrollIntentListeners = () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
      };
      const startObservingAfterScroll = () => {
        if (scrollIntentStarted) return;

        scrollIntentStarted = true;
        stopScrollIntentListeners();
        observer.observe(section);
        revealIfInViewport();
      };
      const handleWheel = (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          startObservingAfterScroll();
        }
      };
      const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
      };
      const handleTouchMove = (event) => {
        const touch = event.touches[0];
        if (!touch || !touchStart) return;

        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          startObservingAfterScroll();
        }
      };
      const handleKeyDown = (event) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            " ",
            "Home",
            "End",
          ].includes(event.key)
        ) {
          startObservingAfterScroll();
        }
      };

      try {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              revealOnce();
            }
          },
          { threshold: 0.01 },
        );
      } catch {
        observer?.disconnect();
        section.removeAttribute("data-reveal-enabled");
        hasRevealedRef.current = true;
        const fallbackFrame = window.requestAnimationFrame(() => {
          setRevealState("static");
        });
        return () => window.cancelAnimationFrame(fallbackFrame);
      }

      section.setAttribute("data-reveal-enabled", "true");
      const readyFrame = window.requestAnimationFrame(() => {
        section.setAttribute("data-reveal-ready", "true");
      });
      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.cancelAnimationFrame(readyFrame);
        observer.disconnect();
        stopScrollIntentListeners();
        section.removeAttribute("data-reveal-ready");
      };
    }

    if (isInViewport()) {
      section.setAttribute("data-reveal-enabled", "true");
      let initialRevealFrame = window.requestAnimationFrame(() => {
        initialRevealFrame = window.requestAnimationFrame(revealOnce);
      });
      return () => window.cancelAnimationFrame(initialRevealFrame);
    }

    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            revealOnce();
          }
        },
        { threshold: 0.01 },
      );
      observer.observe(section);
      section.setAttribute("data-reveal-enabled", "true");
    } catch {
      observer?.disconnect();
      section.removeAttribute("data-reveal-enabled");
      hasRevealedRef.current = true;
      const fallbackFrame = window.requestAnimationFrame(() => {
        setRevealState("static");
      });
      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    revealWhenPageReturns = () => {
      if (document.visibilityState === "visible") revealIfInViewport();
    };

    window.addEventListener("scroll", revealIfInViewport, { passive: true });
    window.addEventListener("resize", revealIfInViewport, { passive: true });
    document.addEventListener("visibilitychange", revealWhenPageReturns);
    return () => {
      observer.disconnect();
      stopViewportChecks();
    };
  }, [replay, waitForScroll]);

  return (
    <section
      {...sectionProps}
      ref={sectionRef}
      data-reveal-state={revealState}
      className={`scroll-reveal-section ${className}`}
    >
      {children}
    </section>
  );
}
