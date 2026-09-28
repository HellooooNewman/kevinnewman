"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Move only the distant scenery; the server-rendered campsite stays anchored. */
export default function FooterParallax({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector("svg");
    if (!root || !svg) return;

    const layers = Array.from(
      root.querySelectorAll<SVGGElement>("[data-parallax-depth]")
    ).map((element) => ({
      element,
      depth: Number(element.dataset.parallaxDepth),
    }));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const reset = () => {
      stop();
      layers.forEach(({ element }) => element.style.removeProperty("transform"));
    };

    const update = () => {
      frame = 0;
      if (!visible || reducedMotion.matches) return;

      const rect = root.getBoundingClientRect();
      const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / rect.height
      ));

      // Settle into the original composition when the footer reaches the
      // bottom of the viewport. Depth is capped in screen pixels at any size.
      layers.forEach(({ element, depth }) => {
        const offset = ((progress - 1) * depth) / scale;
        element.style.transform = `translateY(${offset.toFixed(2)}px)`;
      });
    };

    const schedule = () => {
      if (visible && !reducedMotion.matches && !frame) {
        frame = requestAnimationFrame(update);
      }
    };

    const onMotionChange = () => {
      if (reducedMotion.matches) reset();
      else schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else stop();
    });
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", onMotionChange);
      reset();
    };
  }, []);

  return <div ref={rootRef} className="footer-parallax">{children}</div>;
}
