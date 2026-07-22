// Homage to the old site's camping footer: hill, pines, tent, campfire,
// and a backpacker taking it all in. Every shape uses theme variables so
// the scene adapts to light mode (where the fire is out, just smoldering).
export default function CampsiteScene() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        // Track the viewBox ratio (320/1440 ≈ 22.3vw) on wide screens so the
        // tree tops never get sliced off; floor of 260px keeps mobile cozy.
        height: "max(260px, 22.3vw)",
        display: "block",
        pointerEvents: "none",
      }}
    >
      <defs>
        <radialGradient id="campfire-glow-grad">
          <stop offset="0%" stopColor="#ff9a3c" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#ff9a3c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ff9a3c" stopOpacity="0" />
        </radialGradient>
        {/* soft-edged smoke, like the header's clouds */}
        <radialGradient id="campfire-smoke-grad">
          <stop offset="0%" stopColor="#8f9ab8" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#8f9ab8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#8f9ab8" stopOpacity="0" />
        </radialGradient>
        <g id="scene-pine">
          <rect x="-6" y="-20" width="12" height="22" />
          <polygon points="0,-115 -34,-48 34,-48" />
          <polygon points="0,-80 -42,-10 42,-10" />
        </g>
      </defs>

      {/* Campfire glow sits behind the hill crest so it hugs the ground */}
      <circle
        className="campfire-glow"
        cx="960"
        cy="205"
        r="85"
        fill="url(#campfire-glow-grad)"
      />

      {/* Hill */}
      <path
        d="M0,320 L0,250 Q720,160 1440,250 L1440,320 Z"
        fill="var(--mountain-near)"
      />

      {/* Pines */}
      <g fill="var(--mountain-far)">
        <use href="#scene-pine" transform="translate(90,246)" />
        <use href="#scene-pine" transform="translate(190,238) scale(1.25)" />
        <use href="#scene-pine" transform="translate(300,228) scale(0.9)" />
        <use href="#scene-pine" transform="translate(390,222) scale(0.7)" />
        <use href="#scene-pine" transform="translate(1330,248) scale(1.1)" />
        <use href="#scene-pine" transform="translate(1415,254) scale(0.85)" />
      </g>

      {/* Tent */}
      <g>
        <polygon points="805,212 850,138 895,212" fill="var(--border-bright)" />
        <polygon points="850,138 895,212 862,212" fill="var(--mountain-far)" />
        <polygon points="834,212 850,152 866,212" fill="var(--bg)" />
      </g>

      {/* Campfire */}
      <g>
        <rect
          x="938"
          y="209"
          width="44"
          height="8"
          rx="3"
          fill="var(--mountain-far)"
          transform="rotate(14 960 213)"
        />
        <rect
          x="938"
          y="209"
          width="44"
          height="8"
          rx="3"
          fill="var(--mountain-far)"
          transform="rotate(-14 960 213)"
        />
        <g transform="translate(960,208)">
          <path
            className="campfire-flame"
            d="M0,-40 C-12,-22 -14,-12 -8,-2 C-5,3 5,3 8,-2 C14,-12 12,-22 0,-40 Z"
            fill="#ff9a3c"
          />
          <path
            className="campfire-flame campfire-flame--inner"
            d="M0,-26 C-6,-16 -7,-9 -3,-3 C-1,0 3,0 4,-3 C7,-9 6,-16 0,-26 Z"
            fill="var(--moon-yellow)"
          />
          {/* wispy smoke rising just off the fire: squashed, soft-edged
              puffs that drift up a short way and dissolve */}
          <ellipse
            className="campfire-smoke"
            cx="2"
            cy="-32"
            rx="7"
            ry="4.5"
            fill="url(#campfire-smoke-grad)"
          />
          <ellipse
            className="campfire-smoke"
            cx="-3"
            cy="-30"
            rx="9"
            ry="5"
            fill="url(#campfire-smoke-grad)"
            style={{ animationDelay: "1.7s" }}
          />
          <ellipse
            className="campfire-smoke"
            cx="4"
            cy="-34"
            rx="6"
            ry="4"
            fill="url(#campfire-smoke-grad)"
            style={{ animationDelay: "3.4s" }}
          />
        </g>
        {/* fireflies drifting near the warmth */}
        <circle className="campfire-firefly" cx="908" cy="192" r="2" />
        <circle
          className="campfire-firefly"
          cx="1016"
          cy="184"
          r="2"
          style={{ animationDelay: "2.8s" }}
        />
        {/* rocks around the fire */}
        <polygon points="915,219 924,211 932,219" fill="var(--mountain-far)" />
        <polygon points="990,220 999,213 1007,220" fill="var(--mountain-far)" />
      </g>

      {/* Backpacker, enjoying the view */}
      <g>
        <rect x="1233" y="206" width="7" height="26" fill="var(--mountain-far)" />
        <rect x="1244" y="206" width="7" height="26" fill="var(--mountain-far)" />
        <rect x="1229" y="176" width="26" height="34" rx="5" fill="var(--mountain-far)" />
        <rect x="1251" y="180" width="14" height="26" rx="5" fill="var(--border-bright)" />
        <circle cx="1241" cy="166" r="9" fill="var(--mountain-far)" />
        <path d="M1232,164 A9,9 0 0 1 1250,164 Z" fill="var(--border-bright)" />
        <rect x="1246" y="162" width="9" height="3" rx="1.5" fill="var(--border-bright)" />
      </g>

      {/* Grass chevrons, like the old footer's little arrows */}
      <g
        stroke="var(--border-bright)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      >
        <path d="M496,228 l6,7 l6,-7" />
        <path d="M640,220 l6,7 l6,-7" />
        <path d="M755,224 l6,7 l6,-7" />
        <path d="M330,262 l6,7 l6,-7" />
        <path d="M580,258 l6,7 l6,-7" />
        <path d="M700,282 l6,7 l6,-7" />
        <path d="M905,252 l6,7 l6,-7" />
        <path d="M1010,268 l6,7 l6,-7" />
        <path d="M1185,236 l6,7 l6,-7" />
        <path d="M1300,278 l6,7 l6,-7" />
      </g>
    </svg>
  );
}
