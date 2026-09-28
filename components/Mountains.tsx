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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let target = window.scrollY;
    let y = target;
    let raf = 0;

    // Distant peaks sink fastest as you scroll; the foothills hold.
    // Kept very subtle - just a hint of depth.
    const apply = () => {
      farRef.current?.setAttribute("transform", `translate(0 ${y * 0.035})`);
      midRef.current?.setAttribute("transform", `translate(0 ${y * 0.02})`);
      nearRef.current?.setAttribute("transform", `translate(0 ${y * 0.0075})`);
    };

    // Ease toward the scroll position, then stop: no frames run while the
    // page sits still.
    const tick = () => {
      y += (target - y) * 0.08;
      if (Math.abs(target - y) < 0.5) {
        y = target;
        apply();
        raf = 0;
        return;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = window.scrollY;
      if (reducedMotion.matches || raf) return;
      raf = requestAnimationFrame(tick);
    };

    if (!reducedMotion.matches) apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <svg
      className="no-print hero-mountains"
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-alpine-face" x2="0.2" y2="1">
          <stop stopColor="var(--alpine-peak)" />
          <stop offset="1" stopColor="var(--alpine-ridge)" />
        </linearGradient>
        <linearGradient id="hero-alpine-snow" x2="0.6" y2="1">
          <stop stopColor="var(--alpine-snow)" />
          <stop offset="1" stopColor="var(--alpine-peak)" />
        </linearGradient>
        <linearGradient id="mountain-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.7" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="mountain-mask">
          <rect x="-120" y="0" width="1680" height="240" fill="url(#mountain-fade)" />
        </mask>
      </defs>

      <g mask="url(#mountain-mask)">
        {/* Echo the footer's peaks and lighting, with a lower left horizon
            to leave the introduction and contact links in open sky. */}
        <g ref={farRef}>
          <path
            fill="var(--alpine-distant)"
            d="M-80,240 V130 L22,111 68,126 112,106 154,124 208,97 251,119 294,111 341,138 399,112 435,125 479,103 522,135 564,119 608,149 652,125 708,146 748,124 791,141 843,100 871,118 924,84 968,110 1015,69 1052,92 1094,57 1130,90 1171,66 1214,97 1257,78 1303,112 1352,86 1403,112 1520,83 V240 Z"
          />
          <path
            fill="url(#hero-alpine-face)"
            d="M-80,240 V144 L27,118 66,126 111,108 171,78 199,101 220,108 258,139 303,122 344,139 379,103 405,85 440,117 464,122 507,154 551,139 595,160 633,152 688,174 731,158 777,169 828,140 863,151 904,115 942,129 976,91 1014,107 1061,62 1090,83 1125,51 1167,18 1201,57 1230,67 1252,104 1281,91 1321,124 1350,106 1390,131 1440,111 1520,128 V240 Z"
          />
          <g fill="var(--alpine-shadow)">
            <path d="M171,78 182,115 210,143 229,177 275,182 258,139 220,108 199,101 Z" />
            <path d="M405,85 419,128 441,147 466,182 524,188 507,154 464,122 440,117 Z" />
            <path d="M1061,62 1070,112 1097,137 1133,187 1166,194 1090,83 Z" />
            <path d="M1167,18 1181,86 1204,115 1198,138 1241,184 1281,183 1252,104 1230,67 1201,57 Z" />
          </g>
          <g fill="url(#hero-alpine-snow)">
            <path d="M171,78 143,96 135,110 158,99 169,88 177,110 191,119 182,99 Z" />
            <path d="M405,85 382,100 370,119 392,106 401,95 412,125 427,136 417,113 Z" />
            <path d="M1061,62 1040,87 1021,102 1040,96 1032,117 1054,93 1060,81 1074,104 1067,82 Z" />
            <path d="M1167,18 1125,51 1109,74 1133,61 1122,85 1143,68 1137,94 1155,69 1151,53 1163,40 1159,64 1178,89 1170,57 1182,75 Z" />
          </g>
          <g fill="none" stroke="var(--alpine-facet)" strokeWidth="1" opacity="0.4">
            <path d="M157,118 140,140 116,157 M387,124 364,151 338,169 M1046,114 1026,140 1001,154 M1144,101 1129,129 1099,149 M1188,113 1200,143 1218,157" />
          </g>
        </g>

        {/* Overlapping foothills use the same blue shadows as the footer. */}
        <path
          ref={midRef}
          fill="var(--alpine-ridge)"
          d="M-80,240 V157 L28,149 86,163 142,143 202,157 259,148 315,169 376,155 433,171 491,163 555,182 614,172 679,192 737,180 798,187 861,164 918,173 982,143 1043,158 1101,129 1161,151 1224,166 1284,155 1340,137 1395,156 1451,141 1520,151 V240 Z"
        />

        {/* Near foothills: soft rolling curves that sink below the hero edge */}
        <path
          ref={nearRef}
          fill="var(--alpine-foreground)"
          d="M-80,240 V187 Q40,174 160,186 T400,184 Q520,169 640,191 T880,196 Q1000,200 1120,188 T1360,185 Q1440,175 1520,186 V240 Z"
        />
      </g>
    </svg>
  );
}
