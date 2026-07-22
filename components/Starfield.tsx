"use client";

import { useEffect, useRef } from "react";

/**
 * The sky, evolved from the original Angular canvas header.
 * At night: drifting stars, the occasional shooting star, and a gently
 * bobbing moon - move your mouse (or tap) to sprinkle new stars.
 * By day (light theme): soft clouds drift left to right under the sun,
 * and a tiny flock of birds lazily trails your cursor.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkle: number;
}

interface Streak {
  x: number;
  y: number;
  v: number;
  len: number;
  life: number;
  maxLife: number;
}

interface Cloud {
  x: number;
  y: number;
  v: number;
  alpha: number;
  width: number;
  height: number;
  /** 0 = far off on the horizon, 1 = big and close overhead */
  depth: number;
  /** scroll-parallax rate, derived from depth */
  lag: number;
  sprite: HTMLCanvasElement;
}

interface Bird {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  flap: number;
  /** personal offset from the flock's target, so they don't stack */
  offX: number;
  offY: number;
  /** wander waypoint for when the cursor's been idle */
  wx: number;
  wy: number;
  retarget: number;
}

function makeBird(w: number, h: number): Bird {
  return {
    x: Math.random() * w,
    y: 20 + Math.random() * h * 0.4,
    vx: 0,
    vy: 0,
    size: 5 + Math.random() * 3,
    flap: Math.random() * Math.PI * 2,
    offX: (Math.random() - 0.5) * 150,
    offY: -(20 + Math.random() * 70),
    wx: Math.random() * w,
    wy: 20 + Math.random() * h * 0.5,
    retarget: 300 + Math.random() * 600,
  };
}

function makeStar(w: number, h: number, x?: number, y?: number): Particle {
  const m = Math.random();
  return {
    x: x ?? Math.random() * w,
    y: y ?? Math.random() * h,
    vx: 0.05 + m * 0.35,
    vy: 0.05 + m * 0.35,
    radius: 0.4 + m * 1.8,
    alpha: 0.3 + m * 0.7,
    twinkle: Math.random() * Math.PI * 2,
  };
}

/**
 * Pre-renders one volumetric cumulus cloud to an offscreen sprite. The
 * cloud is a mound of individually-lit puffs stacked in rows: a dusky
 * base row, a mid row seated in its crevices, and bright sunlit crowns
 * on top. Each puff's radial gradient is offset toward the sun, so every
 * later row shades the creases of the row beneath it - that lumpy
 * cauliflower structure is what sells the volume. The bottom is trimmed
 * flat and the belly gets a final unifying shade.
 *
 * A cloud's depth drives everything about it: close clouds are large,
 * bold, low-flying and quick; distant ones are small, faint, and hug
 * the horizon. Squaring the random skews the flock toward the distance;
 * `forceDepth` lets the caller demand a few huge close-ups.
 */
function makeCloud(
  w: number,
  h: number,
  dpr: number,
  forceDepth?: number
): Cloud {
  const depth = forceDepth ?? Math.random() * Math.random();
  const scale = 0.5 + depth * 2.2;

  type Puff = {
    dx: number;
    dy: number;
    r: number;
    squash: number;
    /** horizontal stretch, so puffs are ellipses rather than circles */
    stretch: number;
    row: number;
  };
  const puffs: Puff[] = [];
  let dx = 0;
  // Base row: wide, slightly squashed, defines the footprint. Tight
  // spacing so the puffs fuse into one mass instead of a row of balls.
  const baseCount = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < baseCount; i++) {
    const r = 20 + Math.random() * 14;
    puffs.push({
      dx,
      dy: (Math.random() - 0.5) * 4,
      r,
      squash: 0.72 + Math.random() * 0.1,
      stretch: 1.1 + Math.random() * 0.25,
      row: 0,
    });
    dx += r * (0.75 + Math.random() * 0.35);
  }
  const width = dx;
  // Mid row: rounder puffs seated deep in the base row's crevices.
  const midCount = Math.max(2, baseCount - 1);
  for (let i = 0; i < midCount; i++) {
    const t = (i + 0.5) / midCount + (Math.random() - 0.5) * 0.12;
    puffs.push({
      dx: width * t,
      dy: -(8 + Math.random() * 8),
      r: 18 + Math.random() * 13,
      squash: 0.82 + Math.random() * 0.12,
      stretch: 1 + Math.random() * 0.15,
      row: 1,
    });
  }
  // Crowns: big sunlit domes towards the middle…
  const crownCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < crownCount; i++) {
    puffs.push({
      dx: width * (0.28 + Math.random() * 0.44),
      dy: -(18 + Math.random() * 12),
      r: 22 + Math.random() * 16,
      squash: 0.88 + Math.random() * 0.1,
      stretch: 1,
      row: 2,
    });
  }
  // …and the big close clouds keep towering: one or two extra domes
  // stacked higher still.
  if (depth > 0.55) {
    const towerCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < towerCount; i++) {
      puffs.push({
        dx: width * (0.35 + Math.random() * 0.3),
        dy: -(34 + Math.random() * 14),
        r: 20 + Math.random() * 14,
        squash: 0.9 + Math.random() * 0.1,
        stretch: 1,
        row: 2,
      });
    }
  }
  // Fluff pass: small tufts scattered around every structural puff's
  // upper edge. This fine-grained detail is what breaks the perfect
  // circle arcs - the "bubble" look - into an irregular, feathery
  // silhouette. row -1 keeps them out of the shading passes.
  const fluff: Puff[] = [];
  for (const p of puffs) {
    const tufts = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tufts; i++) {
      const ang = Math.random() * Math.PI;
      const dist = p.r * (0.6 + Math.random() * 0.4);
      fluff.push({
        dx: p.dx + Math.cos(ang) * dist * p.stretch,
        dy: p.dy - Math.sin(ang) * dist * p.squash,
        r: p.r * (0.25 + Math.random() * 0.3),
        squash: 0.75 + Math.random() * 0.25,
        stretch: 1 + Math.random() * 0.3,
        row: -1,
      });
    }
  }
  puffs.push(...fluff);

  // Fit the sprite to whatever mound came out of the randomness.
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity;
  for (const p of puffs) {
    minX = Math.min(minX, p.dx - p.r * p.stretch);
    maxX = Math.max(maxX, p.dx + p.r * p.stretch);
    minY = Math.min(minY, p.dy - p.r);
  }
  const margin = 8;
  const ox = margin - minX;
  const oy = margin - minY;
  const baseY = oy + 14; // flat bottom, just under the base row's centers
  const localW = maxX - minX + margin * 2;
  const localH = baseY + 12;
  const spriteW = localW * scale;
  const spriteH = localH * scale;
  const sprite = document.createElement("canvas");
  sprite.width = Math.ceil(spriteW * dpr);
  sprite.height = Math.ceil(spriteH * dpr);
  const sctx = sprite.getContext("2d");
  if (sctx) {
    sctx.scale(dpr * scale, dpr * scale);

    // Pass 1: fuse every puff into one solid white mass with a feathered
    // rim. Interiors overlap their way up to full white; only the outline
    // keeps the falloff, so the edge reads as fluff, not a balloon skin.
    for (const p of puffs) {
      sctx.save();
      sctx.translate(ox + p.dx, oy + p.dy);
      sctx.scale(p.stretch, p.squash);
      const body = sctx.createRadialGradient(0, 0, p.r * 0.45, 0, 0, p.r);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(0.55, "rgba(255, 255, 255, 0.92)");
      body.addColorStop(1, "rgba(255, 255, 255, 0)");
      sctx.fillStyle = body;
      sctx.beginPath();
      sctx.arc(0, 0, p.r, 0, Math.PI * 2);
      sctx.fill();
      sctx.restore();
    }

    // Shave the ragged undersides into the soft flat base of a cumulus.
    const cut = sctx.createLinearGradient(0, baseY - 14, 0, baseY + 8);
    cut.addColorStop(0, "rgba(0, 0, 0, 0)");
    cut.addColorStop(1, "rgba(0, 0, 0, 1)");
    sctx.globalCompositeOperation = "destination-out";
    sctx.fillStyle = cut;
    sctx.fillRect(0, baseY - 14, localW, localH - baseY + 14);

    // Pass 2, clipped inside the silhouette: a soft shadow pooled under
    // every raised lump. Shading the crevices - rather than outlining the
    // lumps - is what gives the mound its volume.
    sctx.globalCompositeOperation = "source-atop";
    for (const p of puffs) {
      if (p.row < 1) continue;
      // A touch of jitter so the pools don't trace the circles above them.
      const sx = ox + p.dx + (Math.random() - 0.5) * p.r * 0.3;
      const sy = oy + p.dy + p.r * p.squash * 0.72;
      const sr = p.r;
      const pool = sctx.createRadialGradient(sx, sy, sr * 0.1, sx, sy, sr);
      pool.addColorStop(0, "rgba(163, 184, 216, 0.26)");
      pool.addColorStop(1, "rgba(163, 184, 216, 0)");
      sctx.fillStyle = pool;
      sctx.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
    }

    // One unifying belly shade over the whole mound…
    const shade = sctx.createLinearGradient(0, localH * 0.35, 0, baseY);
    shade.addColorStop(0, "rgba(255, 255, 255, 0)");
    shade.addColorStop(1, "rgba(158, 180, 214, 0.22)");
    sctx.fillStyle = shade;
    sctx.fillRect(0, 0, localW, localH);

    // …then the sun re-lights the tops of the upper lumps.
    for (const p of puffs) {
      if (p.row < 1) continue;
      const hx = ox + p.dx;
      const hy = oy + p.dy - p.r * p.squash * 0.4;
      const hr = p.r * 0.85;
      const sun = sctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
      sun.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      sun.addColorStop(1, "rgba(255, 255, 255, 0)");
      sctx.fillStyle = sun;
      sctx.fillRect(hx - hr, hy - hr, hr * 2, hr * 2);
    }
    sctx.globalCompositeOperation = "source-over";
  }

  return {
    x: Math.random() * w,
    // Close clouds ride high overhead; distant ones sit low, near the
    // horizon line, the way a real sky recedes.
    y: 10 + (1 - depth) * h * 0.28 + Math.random() * h * 0.15,
    v: 0.02 + depth * 0.1,
    alpha: 0.65 + depth * 0.35,
    width: spriteW,
    height: spriteH,
    depth,
    lag: 0.02 + depth * 0.06,
    sprite,
  };
}

export default function Starfield({
  height = 480,
  ambient = false,
  moonStyle = "full",
  fill = false,
}: {
  height?: number;
  /** Full-viewport fixed background: sparse, faint, no moon, non-interactive. */
  ambient?: boolean;
  /** "crescent" renders a waning moon (dark mode only); "none" hides the
   * moon and sun entirely. Used by the footer so it doesn't duplicate the
   * header's sky. */
  moonStyle?: "full" | "crescent" | "none";
  /** Track the parent element's height instead of a fixed height — for
   * sections that stretch to fill the viewport (e.g. the contact page). */
  fill?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = window.innerWidth;
    let h = ambient ? window.innerHeight : height;
    let raf = 0;
    let last = performance.now();
    let running = true;
    let visible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      if (ambient) h = window.innerHeight;
      else if (fill) h = canvas.parentElement?.offsetHeight ?? height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // In fill mode the parent's height can change independently of the
    // window (flex stretching), so watch it directly.
    let ro: ResizeObserver | null = null;
    if (fill && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    }

    const stars: Particle[] = Array.from(
      { length: ambient ? 40 : 70 },
      () => makeStar(w, h)
    );

    // Daytime sky (light theme): clouds instead of stars, plus a small
    // flock of birds that trails the cursor. Far clouds paint first so
    // the big close ones layer over them.
    // A couple of guaranteed-huge close-ups; the rest skew distant.
    const clouds: Cloud[] = ambient
      ? []
      : Array.from({ length: 10 }, (_, i) =>
          makeCloud(w, h, dpr, i < 2 ? 0.72 + Math.random() * 0.28 : undefined)
        ).sort((a, b) => a.depth - b.depth);
    const birds: Bird[] = ambient
      ? []
      : Array.from({ length: 4 }, () => makeBird(w, h));
    // Last known pointer position (canvas coords) and how long ago it moved.
    let px = w / 2;
    let py = h * 0.3;
    let pointerAge = Infinity;

    // Shooting stars are rare events now, not a permanent rain of streaks:
    // one spawns every few seconds, shoots up-right, and fades out.
    const streaks: Streak[] = [];
    let streakTimer = 60 + Math.random() * 180;

    // The moon stays parked in the upper right with a slow bob, so it never
    // wanders behind the hero content on the left.
    const moonY = 100;
    const moonR = 55;
    let moonPhase = Math.random() * Math.PI * 2;

    // The crescent is prebuilt as a sprite so the canvas shadow can glow
    // around the carved shape itself - glowing the full disc and then
    // erasing the bite leaves a glow-rimmed dark circle that reads as a
    // second moon.
    const crescentPad = 10;
    const crescentSize = (moonR + crescentPad) * 2;
    let crescentSprite: HTMLCanvasElement | null = null;
    if (moonStyle === "crescent") {
      crescentSprite = document.createElement("canvas");
      crescentSprite.width = crescentSize * dpr;
      crescentSprite.height = crescentSize * dpr;
      const sctx = crescentSprite.getContext("2d");
      if (sctx) {
        sctx.scale(dpr, dpr);
        const c = moonR + crescentPad;
        sctx.beginPath();
        sctx.arc(c, c, moonR, 0, Math.PI * 2);
        sctx.fillStyle = "#d8deef";
        sctx.fill();
        sctx.globalAlpha = 0.1;
        sctx.fillStyle = "#0a0e1a";
        for (const [cx, cy, cr] of [
          [-18, -10, 9],
          [12, 14, 12],
          [20, -20, 6],
        ] as const) {
          sctx.beginPath();
          sctx.arc(c + cx, c + cy, cr, 0, Math.PI * 2);
          sctx.fill();
        }
        sctx.globalAlpha = 1;
        sctx.globalCompositeOperation = "destination-out";
        sctx.beginPath();
        sctx.arc(c + 26, c - 12, moonR * 0.95, 0, Math.PI * 2);
        sctx.fill();
      }
    }

    // Scroll parallax: the sky lags behind the page, layered by depth.
    // Drawn positions wrap around the canvas so large scroll offsets
    // (e.g. the footer's) never empty the sky.
    let scrollTarget = window.scrollY;
    let scroll = window.scrollY;
    const mod = (n: number, m: number) => ((n % m) + m) % m;
    // Smaller stars are "farther" and lag a touch more. Kept subtle.
    const starLag = (radius: number) => Math.max(0.14 - radius * 0.045, 0.025);

    const isLight = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const draw = (now: number) => {
      if (!running || !visible) return;
      const delta = Math.min((now - last) / 16.67, 4);
      last = now;
      ctx.clearRect(0, 0, w, h);
      const light = isLight();

      if (ambient) {
        // Faint drifting stars only - a quiet backdrop for the whole page.
        ctx.save();
        ctx.globalAlpha = light ? 0.18 : 0.35;
        for (const p of stars) {
          p.twinkle += 0.02 * delta;
          const tw = 0.7 + Math.sin(p.twinkle) * 0.3;
          ctx.fillStyle = light
            ? `rgba(46, 80, 162, ${p.alpha * tw})`
            : `rgba(205, 217, 255, ${p.alpha * tw})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.min(p.radius, 1.4), 0, Math.PI * 2);
          ctx.fill();
          if (!reduced) {
            p.x += p.vx * 0.3 * delta;
            p.y -= p.vy * 0.3 * delta;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
          }
        }
        ctx.restore();
        raf = requestAnimationFrame(draw);
        return;
      }

      if (!reduced) {
        scroll += (scrollTarget - scroll) * 0.08 * delta;
      }

      if (light) {
        // Daytime: soft clouds drift slowly, left to right, under the sun.
        ctx.save();
        for (const c of clouds) {
          const cy = mod(c.y + 30 + scroll * c.lag, h + 60) - 30;
          ctx.globalAlpha = c.alpha;
          ctx.drawImage(c.sprite, c.x, cy, c.width, c.height);
          if (!reduced) {
            c.x += c.v * delta;
            if (c.x > w) c.x = -c.width;
          }
        }
        ctx.restore();
      } else {
        // Shooting stars (skipped entirely under reduced motion)
        if (!reduced) {
          streakTimer -= delta;
          if (streakTimer <= 0) {
            streaks.push({
              x: Math.random() * w * 0.75,
              y: h * 0.1 + Math.random() * h * 0.5,
              v: 5 + Math.random() * 4,
              len: 50 + Math.random() * 60,
              life: 0,
              maxLife: 45 + Math.random() * 30,
            });
            streakTimer = 150 + Math.random() * 360; // next one in ~2.5–8.5s
          }
          ctx.lineCap = "round";
          for (let i = streaks.length - 1; i >= 0; i--) {
            const s = streaks[i];
            const fade = Math.sin(Math.PI * (s.life / s.maxLife)) * 0.6;
            ctx.strokeStyle = `rgba(205, 217, 255, ${fade})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.len, s.y + s.len); // tail trails down-left
            ctx.stroke();
            s.x += s.v * delta;
            s.y -= s.v * delta;
            s.life += delta;
            if (s.life >= s.maxLife) streaks.splice(i, 1);
          }
        }

        // Stars (twinkling; smaller stars are "farther" and lag more)
        for (const p of stars) {
          p.twinkle += 0.03 * delta;
          const tw = 0.75 + Math.sin(p.twinkle) * 0.25;
          const py = mod(p.y + 10 + scroll * starLag(p.radius), h + 20) - 10;
          ctx.fillStyle = `rgba(205, 217, 255, ${p.alpha * tw})`;
          ctx.beginPath();
          ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
          if (!reduced) {
            p.x += p.vx * delta;
            p.y -= p.vy * delta;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
          }
        }
      }

      // Moon (or sun, in light mode) - drawn after the stars so it occludes
      // them. Bobs gently in the upper right; the scroll drift is clamped
      // so it never sinks into the terrain below.
      if (moonStyle !== "none") {
        const crescent = moonStyle === "crescent" && !light;
        const mx = w - 180 + Math.sin(moonPhase) * 24;
        const my = moonY + Math.min(scroll * 0.08, 50);
        ctx.save();
        if (crescent && crescentSprite) {
          // The dark side still occludes stars: a disc in the sky color,
          // then the glowing crescent sprite on top.
          ctx.beginPath();
          ctx.arc(mx, my, moonR, 0, Math.PI * 2);
          ctx.fillStyle = "#0a0e1a";
          ctx.fill();
          ctx.shadowColor = "#8fb0ff";
          ctx.shadowBlur = 25;
          ctx.drawImage(
            crescentSprite,
            mx - moonR - crescentPad,
            my - moonR - crescentPad,
            crescentSize,
            crescentSize
          );
        } else {
          ctx.beginPath();
          ctx.arc(mx, my, moonR, 0, Math.PI * 2);
          ctx.fillStyle = light ? "#ffd82f" : "#d8deef";
          ctx.shadowColor = light ? "#ffd82f" : "#8fb0ff";
          ctx.shadowBlur = 40;
          ctx.fill();
          if (!light) {
            // Craters - the sun doesn't have these
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = "#0a0e1a";
            ctx.shadowBlur = 0;
            for (const [cx, cy, cr] of [
              [-18, -10, 9],
              [12, 14, 12],
              [20, -20, 6],
            ] as const) {
              ctx.beginPath();
              ctx.arc(mx + cx, my + cy, cr, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.restore();

        if (!reduced) {
          moonPhase += 0.003 * delta;
        }
      }

      // Birds: a tiny flock that lazily trails the cursor, and goes back
      // to wandering the sky when you leave it alone for a few seconds.
      // Drawn last so they fly in front of the sun.
      if (light && !reduced) {
        pointerAge += delta;
        const following = pointerAge < 240;
        ctx.strokeStyle = "rgba(70, 84, 122, 0.9)";
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        for (const b of birds) {
          const tx = following ? px + b.offX : b.wx;
          const ty = following ? py + b.offY : b.wy;
          const dx = tx - b.x;
          const dy = ty - b.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          if (!following) {
            b.retarget -= delta;
            if (dist < 24 || b.retarget <= 0) {
              b.wx = Math.random() * w;
              b.wy = 20 + Math.random() * h * 0.5;
              b.retarget = 400 + Math.random() * 500;
            }
          }
          // Steer gently toward the target; they're gliders, not drones.
          const speedCap = following ? 2.4 : 0.8;
          const desired = Math.min(dist * 0.02, speedCap);
          b.vx += ((dx / dist) * desired - b.vx) * 0.035 * delta;
          b.vy += ((dy / dist) * desired - b.vy) * 0.035 * delta;
          b.x += b.vx * delta;
          b.y += b.vy * delta;
          const speed = Math.hypot(b.vx, b.vy);
          b.flap += (0.09 + speed * 0.05) * delta;
          const wingY = Math.sin(b.flap) * b.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(b.x - b.size, b.y + wingY);
          ctx.quadraticCurveTo(
            b.x - b.size * 0.4,
            b.y + b.size * 0.25,
            b.x,
            b.y
          );
          ctx.quadraticCurveTo(
            b.x + b.size * 0.4,
            b.y + b.size * 0.25,
            b.x + b.size,
            b.y + wingY
          );
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Pause the animation loop while the canvas is offscreen - the home
    // page runs several of these at once and they don't all need to tick.
    const io = new IntersectionObserver((entries) => {
      const nowVisible = entries.some((entry) => entry.isIntersecting);
      if (nowVisible === visible) return;
      visible = nowVisible;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    // Pointer over the sky: at night it sprinkles stars (the old easter
    // egg, kept); by day it gives the birds a target to trail. Listens on
    // the window so text and buttons overlapping the canvas don't block
    // the effect. At the cap, the oldest stars make way.
    const MAX_STARS = 1500;
    const sprinkle = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > w || y < 0 || y > h) return;
      px = x;
      py = y;
      pointerAge = 0;
      if (isLight()) return;
      const star = makeStar(w, h, x, y);
      // Counter the scroll-lag so the star appears exactly at the cursor,
      // then normalize into the wrap range so the drift logic doesn't
      // immediately teleport it (large offsets push the raw value far out).
      star.y = mod(y - scroll * starLag(star.radius) + 10, h + 20) - 10;
      stars.push(star);
      if (stars.length > MAX_STARS) stars.shift();
    };

    // Track the scroll position so the sky lags behind the page
    const onScroll = () => {
      scrollTarget = window.scrollY;
    };

    window.addEventListener("resize", resize);
    if (!ambient) {
      window.addEventListener("pointermove", sprinkle);
      window.addEventListener("pointerdown", sprinkle);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", sprinkle);
      window.removeEventListener("pointerdown", sprinkle);
      window.removeEventListener("scroll", onScroll);
    };
  }, [height, ambient, moonStyle, fill]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={
        ambient
          ? {
              position: "fixed",
              inset: 0,
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: -1,
            }
          : {
              position: "absolute",
              inset: 0,
              display: "block",
              userSelect: "none",
            }
      }
    />
  );
}
