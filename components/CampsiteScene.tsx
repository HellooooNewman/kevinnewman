import AlpineLandscape from "./AlpineLandscape";

// An entirely vector campsite: shared silhouettes, layered terrain, and
// theme-aware fabric and foliage. Animation is handled by reduced-motion CSS.
export default function CampsiteScene() {
  return (
    <svg
      className="campsite-scene"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 600"
    >
      <defs>
        <radialGradient id="campfire-glow-grad">
          <stop stopColor="#ffb45f" stopOpacity="0.24" />
          <stop offset="0.4" stopColor="#f29352" stopOpacity="0.09" />
          <stop offset="1" stopColor="#f29352" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="campfire-ground-grad">
          <stop stopColor="#eaaa70" stopOpacity="0.22" />
          <stop offset="1" stopColor="#eaaa70" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="campfire-smoke-grad">
          <stop stopColor="#a0a9bd" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a0a9bd" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="camp-tent-fabric" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--camp-tent-light)" />
          <stop offset="1" stopColor="var(--camp-tent)" />
        </linearGradient>
        <linearGradient id="camp-tent-front" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="var(--camp-tent)" />
          <stop offset="1" stopColor="var(--camp-tent-light)" />
        </linearGradient>
        <radialGradient id="camp-tent-lamplight" gradientUnits="userSpaceOnUse" cx="832" cy="208" r="88">
          <stop stopColor="#ffda8d" stopOpacity="0.92" />
          <stop offset="0.45" stopColor="#f7bb6b" stopOpacity="0.76" />
          <stop offset="1" stopColor="#eaaa70" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="camp-tent-interior" cx="45%" cy="70%" r="75%">
          <stop stopColor="#ffe7ac" />
          <stop offset="0.5" stopColor="#eeb871" />
          <stop offset="1" stopColor="#79563e" />
        </radialGradient>
        <radialGradient id="camp-tent-spill">
          <stop stopColor="#ffd48a" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#efb46e" stopOpacity="0.12" />
          <stop offset="1" stopColor="#efb46e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="camp-flame" x1="0" y1="1" x2="0" y2="0">
          <stop stopColor="#ed7840" />
          <stop offset="0.55" stopColor="#ffb34d" />
          <stop offset="1" stopColor="#ffdb85" />
        </linearGradient>
      </defs>

      <AlpineLandscape />

      {/* A small, warm campsite on the left overlook. */}
      <g transform="translate(-30 340) scale(.43)">
        <circle className="campfire-glow" cx="964" cy="201" r="94" fill="url(#campfire-glow-grad)" />
        <ellipse className="campfire-glow" cx="960" cy="238" rx="134" ry="31" fill="url(#campfire-ground-grad)" />

        {/* A freestanding dome tent: curved poles, fitted fly, mesh vent,
            rounded doorway, and a waterproof bathtub floor. */}
        <ellipse className="camp-tent-glow" cx="875" cy="243" rx="67" ry="21" fill="url(#camp-tent-spill)" />
        {/* Contact shadow follows the curved floor, without an air gap. */}
        <path d="M750,232 Q827,248 916,231 L916,236 Q829,251 750,237 Z" fill="var(--alpine-foreground)" opacity="0.7" />
        <g strokeLinejoin="round">
          <path d="M752,232 C764,192 778,164 802,155 C823,147 847,150 864,164 C887,182 903,208 914,231 Q871,242 828,241 Z" fill="url(#camp-tent-fabric)" />
          <path d="M858,160 C837,176 827,206 828,241 Q876,240 914,231 C901,198 882,173 858,160 Z" fill="url(#camp-tent-front)" />
          {/* Steady interior light diffuses through the fabric, fading at the edges. */}
          <path className="camp-tent-glow" d="M752,232 C764,192 778,164 802,155 C823,147 847,150 864,164 C887,182 903,208 914,231 Q871,242 828,241 Z" fill="url(#camp-tent-lamplight)" />
          {/* Dark floor wraps around both panels and meets the ground. */}
          <path d="M755,224 Q790,231 829,232 Q874,232 910,224 L914,231 Q873,243 828,241 L752,232 Z" fill="var(--camp-tree)" />
          <path d="M759,225 Q793,232 829,232 Q871,232 909,225" fill="none" stroke="var(--camp-tent-seam)" strokeWidth="0.8" opacity="0.6" />
          {/* The pole arcs cross over the crown, with small attachment tabs. */}
          <g fill="none" stroke="var(--camp-tent-seam)" strokeLinecap="round">
            <path d="M753,232 C769,181 791,149 822,152 C852,155 881,185 900,234" strokeWidth="1.8" />
            <path d="M785,237 C784,195 802,158 831,152 C855,149 888,185 913,231" strokeWidth="1.4" />
            <path d="M828,239 C827,207 837,176 858,161" strokeWidth="1" opacity="0.6" />
          </g>
          <g stroke="var(--camp-tree)" strokeWidth="2" strokeLinecap="round">
            <path d="M770,191 l4,2 M792,162 l3,3 M858,173 l-3,3 M887,207 l-3,2" />
          </g>
          {/* A covered mesh vent breaks up the broad side panel. */}
          <path d="M799,179 Q809,169 821,168 L828,181 Z" fill="var(--camp-tree)" opacity="0.8" />
          <path d="M796,177 Q808,166 821,166 L830,178 Q813,174 796,177 Z" fill="var(--camp-tent-light)" />
          <path d="M799,177 Q814,174 826,178" fill="none" stroke="var(--camp-tent-seam)" strokeWidth="0.8" />
          {/* Open arched door, with the fabric gathered against one side. */}
          <path d="M841,230 C841,207 850,182 862,180 C878,178 893,207 900,226 Q870,232 841,230 Z" fill="var(--bg)" />
          <path className="camp-tent-glow" d="M841,230 C841,207 850,182 862,180 C878,178 893,207 900,226 Q870,232 841,230 Z" fill="url(#camp-tent-interior)" />
          <path d="M839,230 C839,205 850,179 862,178 C880,176 895,207 902,226" fill="none" stroke="var(--camp-tent-seam)" strokeWidth="1" />
          <path d="M865,182 C879,190 890,209 897,225 L886,225 C887,208 878,191 865,182 Z" fill="var(--camp-tent-light)" />
          <path d="M866,183 C879,197 882,214 886,224" fill="none" stroke="var(--camp-tent-seam)" strokeWidth="0.8" opacity="0.7" />
          <path d="M884,213 l7,-2" stroke="var(--camp-tree)" strokeWidth="2" strokeLinecap="round" />
          <path d="M841,230 Q869,233 900,226" fill="none" stroke="var(--camp-tent-seam)" strokeWidth="1" />
          <g fill="none" stroke="var(--camp-detail)" strokeWidth="1" opacity="0.75">
            <path d="M773,193 L731,239 M893,198 L931,237" />
            <path d="M728,236 l4,7 M929,234 l4,7" strokeWidth="2" />
          </g>
        </g>

        {/* The lantern rests on a flat stone in front of the guy rope. */}
        <g transform="translate(916 243)">
          <ellipse cy="7" rx="15" ry="3" fill="var(--bg)" opacity="0.3" />
          <path d="M-13,6 L-9,0 H7 L12,5 8,8 -10,8 Z" fill="var(--camp-rock)" />
          <path d="M-9,0 H7 L10,3 H-11 Z" fill="var(--camp-detail)" />
          <g transform="translate(-1 -3)">
            <path d="M-3,-12 V-15 A3,3 0 0 1 3,-15 V-12" fill="none" stroke="var(--camp-detail)" />
            <rect x="-5" y="-12" width="10" height="13" rx="2" fill="var(--camp-detail)" />
            <rect className="camp-lantern-light" x="-3" y="-10" width="6" height="8" rx="1" />
            <path d="M-6,2 H6" stroke="var(--camp-tree)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* Rounded stones, crossed logs, and an asymmetric flame. */}
        <g transform="translate(964 231)">
          <ellipse cy="5" rx="31" ry="8" fill="var(--bg)" opacity="0.3" />
          <g fill="var(--camp-rock)">
            <path d="M-29,3 Q-30,-3 -24,-4 Q-18,-4 -17,2 Z" />
            <path d="M-15,-5 Q-15,-10 -9,-9 L-3,-5 Z M7,-5 Q12,-12 18,-6 L19,-3 Z" />
            <path d="M20,3 Q20,-4 27,-2 Q32,-1 31,4 Z" />
          </g>
          <path d="M-18,0 L17,7 M-16,8 L17,-1" stroke="var(--camp-log)" strokeWidth="7" strokeLinecap="round" />
          <path d="M-15,0 L13,6" stroke="#b07958" strokeOpacity="0.35" strokeWidth="1.2" />
          <g className="campfire-flame">
            <path d="M-2,2 C-18,0 -17,-15 -9,-26 C-10,-17 -5,-18 -6,-28 C-8,-37 2,-42 1,-49 C14,-37 8,-29 14,-21 C23,-7 13,4 -2,2 Z" fill="url(#camp-flame)" />
            <path className="campfire-flame--inner campfire-flame" d="M0,2 C-10,-2 -8,-12 -3,-18 C0,-22 2,-27 1,-30 C11,-20 4,-16 9,-10 C13,-2 6,3 0,2 Z" fill="#ffe3a0" />
          </g>
          <g fill="var(--camp-rock)">
            <path d="M-24,8 Q-22,1 -15,4 L-12,10 Z M-7,11 Q-9,4 -2,5 Q5,4 6,11 Z M13,10 Q12,4 19,4 L25,8 Z" />
          </g>
          <ellipse className="campfire-smoke" cx="1" cy="-38" rx="8" ry="5" fill="url(#campfire-smoke-grad)" />
          <ellipse className="campfire-smoke" cx="-3" cy="-41" rx="10" ry="5" fill="url(#campfire-smoke-grad)" style={{ animationDelay: "1.7s" }} />
          <ellipse className="campfire-smoke" cx="4" cy="-43" rx="7" ry="4" fill="url(#campfire-smoke-grad)" style={{ animationDelay: "3.4s" }} />
        </g>
        <g>
          <circle className="campfire-firefly" cx="954" cy="167" r="1.4" />
          <circle className="campfire-firefly" cx="980" cy="183" r="1" style={{ animationDelay: "1.8s" }} />
          <circle className="campfire-firefly" cx="1019" cy="204" r="1.5" style={{ animationDelay: "3.2s" }} />
        </g>

      </g>
    </svg>
  );
}
