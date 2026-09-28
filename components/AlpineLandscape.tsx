import { LAKE_SURFACE_PATH } from "@/lib/alpine-scene";

// Deterministic vector detail keeps the server render and SVG export identical.
const scatter = (index: number, seed: number) => {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

function Forest({ start, end, y, count, height, seed = 1 }: {
  start: number; end: number; y: number; count: number; height: number; seed?: number;
}) {
  return <g>{Array.from({ length: count }, (_, i) => {
    const x = start + (end - start) * i / (count - 1);
    const scale = height * (0.45 + scatter(i, seed) * 0.55) / 125;
    return <use key={i} href="#alpine-pine" transform={`translate(${x.toFixed(2)} ${(y + scatter(i, seed + 1) * 5).toFixed(2)}) scale(${(scale * 0.75).toFixed(3)} ${scale.toFixed(3)})`} />;
  })}</g>;
}

export default function AlpineLandscape() {
  return (
    <g>
      <defs>
        <clipPath id="alpine-water-clip">
          <path d={LAKE_SURFACE_PATH} />
        </clipPath>
        <linearGradient id="alpine-mountain" x2="0.2" y2="1">
          <stop stopColor="var(--alpine-peak)" />
          <stop offset="1" stopColor="var(--alpine-ridge)" />
        </linearGradient>
        <linearGradient id="alpine-snow" x2="0.6" y2="1">
          <stop stopColor="var(--alpine-snow)" />
          <stop offset="1" stopColor="var(--alpine-peak)" />
        </linearGradient>
        <linearGradient id="alpine-lake" gradientUnits="userSpaceOnUse" x1="0" y1="403" x2="0" y2="600">
          <stop stopColor="var(--alpine-water-light)" />
          <stop offset="1" stopColor="var(--alpine-water)" />
        </linearGradient>
        <radialGradient id="alpine-reflection">
          <stop stopColor="var(--alpine-snow)" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="var(--alpine-snow)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--alpine-snow)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="alpine-mist" x2="0" y2="1">
          <stop stopColor="var(--alpine-mist)" stopOpacity="0" />
          <stop offset="0.55" stopColor="var(--alpine-mist)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--alpine-mist)" stopOpacity="0" />
        </linearGradient>
        <g id="alpine-pine">
          <path d="M-2,0 L-1,-111 1,-111 3,0 Z" />
          <path d="M0,-125 -5,-110 -2,-112 -10,-100 -5,-102 -15,-89 -8,-92 -21,-76 -13,-80 -25,-66 -18,-70 -31,-53 -22,-58 -35,-42 -24,-47 -40,-28 -29,-33 -45,-14 -32,-18 -47,-7 -29,-10 -20,-8 -7,-11 0,-8 10,-10 23,-7 33,-10 45,-7 31,-20 40,-17 26,-33 36,-29 23,-45 32,-41 18,-58 28,-53 16,-70 23,-66 11,-82 19,-77 7,-95 13,-91 3,-109 7,-105 Z" />
        </g>
      </defs>

      {/* Continuous water behind every shore and slope prevents transparent
          wedges between independently drawn terrain silhouettes. */}
      <path d="M0,403 H1440 V600 H0 Z" fill="url(#alpine-lake)" />

      {/* Distant peaks remain pale, while successive ridges deepen to navy. */}
      <g data-parallax-depth="18">
        <path data-sky-occluder="" d="M0,341 49,303 91,323 147,264 176,279 230,251 270,298 303,277 355,325 408,294 452,326 488,308 533,347 574,329 616,355 661,329 695,350 737,310 758,329 806,282 830,311 863,299 907,341 953,296 982,311 1030,259 1067,283 1111,222 1150,261 1193,230 1238,289 1274,265 1312,292 1363,249 1440,290 V470 H0 Z" fill="var(--alpine-distant)" />
      </g>
      <g data-parallax-depth="12">
        <path data-sky-occluder="" d="M0,325 48,285 82,303 132,247 171,215 198,249 220,257 256,300 283,283 312,309 367,258 405,237 439,278 464,286 501,331 535,315 573,357 614,343 659,375 704,362 745,385 784,367 815,379 861,349 901,325 931,298 967,315 1001,260 1038,245 1061,209 1090,226 1127,184 1167,137 1202,194 1230,206 1252,250 1280,234 1312,270 1343,247 1384,286 1440,253 V463 H0 Z" fill="url(#alpine-mountain)" />
        {/* Broad shadow faces and narrow snow gullies break up each summit. */}
        <g fill="var(--alpine-shadow)">
          <path d="M171,215 192,272 210,286 225,337 273,363 256,300 220,257 198,249 Z" />
          <path d="M405,237 425,300 452,323 475,378 534,395 501,331 464,286 439,278 Z" />
          <path d="M1167,137 1182,216 1207,250 1197,288 1230,337 1272,362 1252,250 1230,206 1202,194 Z" />
          <path d="M1061,209 1072,267 1104,297 1090,326 1137,378 1160,383 1090,226 Z" />
          <path d="M1312,270 1328,320 1368,349 1397,389 1440,417 1440,302 1384,286 1343,247 Z" />
        </g>
        <g fill="url(#alpine-snow)">
          <path d="M1167,137 1127,184 1105,208 1131,195 1120,221 1144,203 1136,234 1155,207 1151,185 1165,171 1158,200 1177,222 1170,188 1181,208 Z" />
          <path d="M1128,219 1105,249 1085,265 1107,258 1094,280 1120,258 1142,243 1154,216 1137,235 Z" opacity="0.7" />
          <path d="M1061,209 1038,245 1019,255 1036,252 1026,274 1048,249 1058,235 1075,256 1065,227 Z" />
          <path d="M171,215 147,237 135,252 157,242 168,227 177,254 193,266 184,242 Z" />
          <path d="M405,237 382,253 371,270 391,259 401,246 413,279 426,291 418,266 Z" />
        </g>
        <g fill="none" stroke="var(--alpine-facet)" strokeWidth="1.2" opacity="0.45">
          <path d="M168,251 142,282 118,320 M182,280 169,309 182,345 M384,278 356,316 322,340 M419,313 433,339 426,361 M1146,259 1130,289 1099,316 M1190,280 1201,316 1221,340 M1028,283 1003,324 965,351" />
        </g>
      </g>
      <g data-parallax-depth="6">
        <path data-sky-occluder="" d="M0,370 84,341 133,349 190,318 248,340 304,331 359,365 421,349 487,378 535,366 596,389 666,378 743,400 811,382 866,395 934,358 986,365 1049,327 1081,340 1122,307 1184,333 1229,351 1275,339 1341,316 1382,334 1440,324 V467 H0 Z" fill="var(--alpine-ridge)" />
        <path d="M0,386 Q148,359 284,383 T533,404 Q681,437 812,406 T1082,389 Q1272,354 1440,384 V443 H0 Z" fill="url(#alpine-mist)" />

      </g>

      {/* The lake winds into the valley, widening toward the viewer. */}
      <path d={LAKE_SURFACE_PATH} fill="url(#alpine-lake)" />
      <path d="M887,423 820,459 842,490 780,600 H1017 L916,507 940,462 908,428 Z" fill="url(#alpine-reflection)" />
      <ellipse cx="862" cy="493" rx="133" ry="131" fill="url(#alpine-reflection)" />
      <g fill="var(--alpine-ridge)" opacity="0.3">
        <path d="M990,436 1027,474 1070,485 1118,540 1171,499 1201,459 1258,443 Z" />
        <path d="M493,443 581,484 628,515 677,478 719,444 Z" />
      </g>
      <g fill="none" stroke="var(--alpine-water-light)" strokeLinecap="round">
        {Array.from({ length: 45 }, (_, i) => {
          const y = 429 + scatter(i, 12) * 150;
          const x = 485 + scatter(i, 13) * 855;
          return <path key={i} d={`M${x.toFixed(1)},${y.toFixed(1)} h${(8 + scatter(i, 14) * 90).toFixed(1)}`} strokeWidth={i % 4 === 0 ? 1.2 : 0.6} opacity={0.12 + scatter(i, 15) * 0.28} />;
        })}
      </g>
      <g fill="none" stroke="var(--alpine-snow)" opacity="0.22" strokeWidth="0.8">
        <path d="M850,431 h30 M842,437 h36 M857,443 h22 M831,453 h49 M841,462 h27 M822,478 h51 M846,490 h31 M813,507 h67 M827,522 h35 M802,543 h79 M823,566 h46" />
      </g>

      {/* The sky controller updates these SVG strokes; shores and trees
          paint over them so reflected light cannot cross onto land. */}
      <g data-star-reflections="" clipPath="url(#alpine-water-clip)" fill="none" stroke="#c5dbff" strokeLinecap="round">
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} data-water-glint="" opacity="0">
            <path strokeWidth="2.8" opacity="0.15" />
            <path strokeWidth="0.85" />
            <path strokeWidth="0.6" opacity="0.35" />
          </g>
        ))}
      </g>

      {/* Forested shores overlap the reflections and low valley mist. */}
      <g fill="var(--alpine-shore)">
        <path data-water-occluder="" d="M0,410 Q169,368 301,397 L434,422 589,431 715,449 794,453 745,462 628,458 499,452 346,438 0,452 Z" />
        <Forest start={266} end={731} y={442} count={76} height={22} seed={17} />
        <path data-water-occluder="" d="M1440,397 1343,407 1271,429 1200,438 1129,447 1040,459 950,460 874,468 953,471 1080,466 1210,457 1440,448 Z" />
        <Forest start={934} end={1096} y={463} count={38} height={26} seed={21} />
        <Forest start={1244} end={1440} y={437} count={37} height={36} seed={25} />
      </g>
      <path d="M342,430 Q507,414 674,439 T850,450 L750,468 Q576,442 379,451 Z M1036,418 Q1215,404 1440,416 V441 Q1267,421 1124,439 Z" fill="url(#alpine-mist)" />

      {/* The campsite sits on a rocky overlook rather than on the lakeshore. */}
      <path data-water-occluder="" d="M0,332 66,353 124,385 182,402 226,425 285,432 347,434 397,444 427,465 470,479 516,515 562,527 599,566 650,580 682,600 H0 Z" fill="var(--alpine-foreground)" />
      <g fill="var(--alpine-rock)">
        <path d="M0,346 61,366 98,408 77,426 100,491 43,449 20,389 Z" />
        <path d="M113,392 167,416 197,468 184,488 220,550 161,502 142,442 Z" />
        <path d="M229,435 282,441 313,475 323,527 367,589 300,554 273,474 Z" />
        <path d="M371,451 400,458 418,495 457,521 475,570 438,548 390,504 Z" />
        <path d="M499,518 541,539 570,581 611,600 H566 L533,570 Z" />
      </g>
      <g fill="none" stroke="var(--alpine-facet)" strokeWidth="1" opacity="0.25">
        <path d="M15,356 50,381 64,411 M129,411 158,435 168,470 M243,445 275,459 292,492 M390,467 405,495 441,530" />
      </g>
      {/* A broad, level surface continues beneath the tent and fire. The
          exposed front edge ties the clearing into the cliff face below. */}
      <path d="M223,429 Q259,426 290,430 L346,432 Q379,434 402,444 L412,451 392,459 348,455 304,452 270,444 236,441 Z" fill="var(--alpine-rock)" />
      <path d="M223,429 Q259,426 290,430 L346,432 Q379,434 402,444 L412,451 392,459 348,455 304,452 270,444 236,441 Z" fill="var(--alpine-facet)" opacity="0.18" />
      <path d="M270,444 304,452 348,455 392,459 412,451 408,458 392,465 348,461 302,459 Z" fill="var(--alpine-rock)" />
      <g fill="var(--alpine-facet)" opacity="0.4">
        <path d="M297,447 l4,-1 3,2 -5,1 Z M349,451 l3,-2 4,2 -3,1 Z M377,455 l3,-1 4,2 -5,1 Z" />
      </g>
      <path data-water-occluder="" d="M1072,600 1114,568 1164,565 1197,539 1244,551 1283,514 1315,507 1364,473 1440,467 V600 Z" fill="var(--alpine-foreground)" />
      <path d="M1151,600 1200,552 1244,559 1285,529 1316,522 1284,547 1250,566 1225,600 Z M1371,486 1334,534 1345,552 1322,600 H1344 L1365,550 1379,529 1390,482 Z" fill="var(--alpine-rock)" />
      <g fill="var(--alpine-foreground)">
        <use href="#alpine-pine" transform="translate(31 363) scale(.8 1.65)" />
        <use href="#alpine-pine" transform="translate(91 393) scale(1.25 2.5)" />
        <use href="#alpine-pine" transform="translate(177 418) scale(.62 1.45)" />
        <use href="#alpine-pine" transform="translate(242 437) scale(.43 .85)" />
        <use href="#alpine-pine" transform="translate(406 456) scale(.48 1.05)" />
        <use href="#alpine-pine" transform="translate(469 495) scale(.35 .7)" />
        <use href="#alpine-pine" transform="translate(528 536) scale(.42 .8)" />
        <use href="#alpine-pine" transform="translate(1344 517) scale(.6 1.2)" />
        <use href="#alpine-pine" transform="translate(1410 492) scale(.75 1.6)" />
        <Forest start={705} end={1060} y={608} count={23} height={86} seed={34} />
      </g>
    </g>
  );
}
