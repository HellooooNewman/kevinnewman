"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's horizon: three mountain ridges that fall away at different
 * rates as the page scrolls. The terrain hangs below the hero's edge
 * and fades out, so the valley floor dissolves into the page.
 */
export default function Mountains() {
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGPathElement>(null);
  const nearRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let y = target;
    let raf = 0;

    const onScroll = () => {
      target = window.scrollY;
    };

    const tick = () => {
      y += (target - y) * 0.08;
      // Distant peaks sink fastest as you scroll; the foothills hold.
      // Kept very subtle - just a hint of depth.
      farRef.current?.setAttribute("transform", `translate(0 ${y * 0.035})`);
      midRef.current?.setAttribute("transform", `translate(0 ${y * 0.02})`);
      nearRef.current?.setAttribute("transform", `translate(0 ${y * 0.0075})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <svg
      className="no-print"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: -50,
        left: 0,
        width: "100%",
        height: 160,
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="mountain-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.72" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="mountain-mask">
          <rect x="-120" y="0" width="1680" height="200" fill="url(#mountain-fade)" />
        </mask>
      </defs>

      <g mask="url(#mountain-mask)">
        {/* Far ridge: sharp alpine peaks, dipping into a valley right of center */}
        <g ref={farRef}>
          <path
            fill="var(--mountain-far)"
            d="M-80,200 L-80,90 L60,38 L150,74 L260,18 L340,60 L430,34 L520,84 L640,10 L720,58 L810,30 L900,78 L1000,96 L1090,64 L1180,100 L1300,44 L1400,80 L1520,52 L1520,200 Z"
          />
          {/* Snow caps on the two tallest peaks */}
          <path
            fill="var(--mountain-snow)"
            d="M229,34 L260,18 L290,34 L276,29 L262,37 L246,30 Z"
          />
          <path
            fill="var(--mountain-snow)"
            d="M611,28 L640,10 L670,28 L655,24 L640,32 L625,23 Z"
          />
        </g>

        {/* Mid ridge: a mix of angular slopes and rounded shoulders */}
        <path
          ref={midRef}
          fill="var(--mountain-mid)"
          d="M-80,200 L-80,110 Q10,86 90,96 L200,60 L290,102 Q380,74 470,98 L560,54 L650,96 Q740,116 830,102 L920,124 Q1010,138 1100,120 L1190,132 Q1280,108 1370,116 L1450,84 L1520,104 L1520,200 Z"
        />

        {/* Near foothills: soft rolling curves that sink below the hero edge */}
        <path
          ref={nearRef}
          fill="var(--mountain-near)"
          d="M-80,200 L-80,140 Q40,116 160,132 Q280,148 400,130 Q520,112 640,134 Q760,154 880,146 Q1000,158 1120,150 Q1240,142 1360,128 Q1440,120 1520,134 L1520,200 Z"
        />
      </g>
    </svg>
  );
}
