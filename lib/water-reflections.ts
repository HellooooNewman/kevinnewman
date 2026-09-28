import { LAKE_SURFACE_PATH } from "./alpine-scene";

export interface ReflectedStar {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  phase: number;
}

/** Reuse the sky's frame loop; paint a handful of vector ripples at 20fps. */
export function createWaterReflections(canvas: HTMLCanvasElement) {
  const svg = canvas.parentElement?.querySelector<SVGSVGElement>(".campsite-scene");
  const group = svg?.querySelector<SVGGElement>("[data-star-reflections]");
  if (!svg || !group) return null;

  const slots = Array.from(group.querySelectorAll<SVGGElement>("[data-water-glint]"))
    .map((element) => {
      const [halo, core, trail] = Array.from(element.querySelectorAll("path"));
      return { element, halo, core, trail };
    });
  const geometry = document.createElement("canvas").getContext("2d");
  if (!geometry) return null;
  const occluders = Array.from(svg.querySelectorAll<SVGPathElement>("[data-sky-occluder]"))
    .map((element) => ({
      path: new Path2D(element.getAttribute("d") ?? ""),
      layer: element.parentElement as unknown as SVGGElement,
    }));
  const lake = new Path2D(LAKE_SURFACE_PATH);
  const shores = Array.from(svg.querySelectorAll<SVGPathElement>("[data-water-occluder]"))
    .map((element) => new Path2D(element.getAttribute("d") ?? ""));
  let offsetX = 0;
  let offsetY = 0;
  let scale = 1;
  let lastPaint = -Infinity;
  let painted = false;

  const resize = () => {
    const skyRect = canvas.getBoundingClientRect();
    const sceneRect = svg.getBoundingClientRect();
    offsetX = sceneRect.left - skyRect.left;
    offsetY = sceneRect.top - skyRect.top;
    scale = sceneRect.width / svg.viewBox.baseVal.width;
    lastPaint = -Infinity;
  };

  const clear = () => {
    slots.forEach(({ element }) => element.setAttribute("opacity", "0"));
    lastPaint = -Infinity;
    painted = false;
  };

  const shouldDraw = (now: number, reduced: boolean, light: boolean) => {
    if (light) {
      // Clear once when the sky changes to daytime.
      if (painted) clear();
      return false;
    }
    if (!reduced && now - lastPaint < 50) return false;
    lastPaint = now;
    return scale > 0;
  };

  const draw = (stars: ReflectedStar[], now: number, reduced: boolean) => {
    painted = true;
    // Test against the actual moving mountain silhouettes, rather than a
    // single height cutoff that excludes all the stars over the valley.
    const terrain = occluders.map(({ path, layer }) => ({
      path,
      offset: new DOMMatrix(layer.style.transform || undefined).m42,
    }));
    const candidates = stars
      .filter((star) => star.radius >= 1.2 && star.y >= 0)
      .map((star) => {
        const y = (star.y - offsetY) / scale;
        return { ...star, x: (star.x - offsetX) / scale, y,
          reflectionY: 403 + (403 - y) * 0.45 };
      })
      .filter((star) => star.y < 380 && star.x > 470 && star.x < 1390 &&
        star.reflectionY < 590 &&
        !terrain.some(({ path, offset }) => geometry.isPointInPath(path, star.x, star.y - offset)) &&
        geometry.isPointInPath(lake, star.x, star.reflectionY) &&
        !shores.some((path) => geometry.isPointInPath(path, star.x, star.reflectionY)))
      .sort((a, b) => b.radius - a.radius)
      .slice(0, slots.length);

    slots.forEach(({ element, halo, core, trail }, i) => {
      const star = candidates[i];
      if (!star) {
        element.setAttribute("opacity", "0");
        return;
      }

      const time = reduced ? 0 : now / 1000;
      const phase = star.phase * 0.18;
      // Mirror about the lake horizon, compressing the reflected sky into
      // its visible depth. Higher stars reflect closer to the foreground.
      const y = star.reflectionY;
      const x = star.x + Math.sin(time * 0.7 + phase) * 0.6;
      const half = star.radius * (0.85 + Math.sin(time * 0.45 + phase) * 0.18);
      const glint = `M${(x - half).toFixed(2)},${y.toFixed(2)} q${half.toFixed(2)},0.22 ${(half * 2).toFixed(2)},0`;
      // One soft glint and two faint, uneven ripples avoid a repeated ladder.
      const trailing = `M${(x - half * 0.8).toFixed(2)},${(y + 2.1 + star.radius).toFixed(2)} h${(half * 0.7).toFixed(2)} M${(x + half * 0.5).toFixed(2)},${(y + 5.5 + star.radius).toFixed(2)} h${(half * 0.9).toFixed(2)}`;
      const shimmer = 0.82 + Math.sin(time * 0.55 + phase) * 0.18;
      halo.setAttribute("d", glint);
      core.setAttribute("d", glint);
      trail.setAttribute("d", trailing);
      element.setAttribute("opacity", (star.brightness * shimmer * 0.22).toFixed(3));
    });
  };

  resize();
  return { resize, shouldDraw, draw, clear };
}
