"use client";

import { useEffect } from "react";

/**
 * Reveal-on-scroll: adds .revealed to [data-reveal] elements as they enter
 * the viewport. CSS in globals.css handles the transition. Respects
 * prefers-reduced-motion. Also home to the v1 console easter eggs.
 */
export default function RevealInit() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Oh hey....what are you doing here :P");
    // eslint-disable-next-line no-console
    console.log("Try putting your mouse on the stars up top. ^");

    const els = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -32px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
