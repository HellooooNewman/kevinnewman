import { fmtDate, fmtInt, fmtMonth, type RatingPoint } from "@/lib/aoe2";
import { cx } from "@/lib/cx";
import styles from "./RatingChart.module.css";

// The SVG stretches to its box (preserveAspectRatio="none"), so it only
// draws the line, area and gridlines; every label is HTML positioned by
// percentage on top, which keeps the text from distorting.
const W = 1000;
const H = 300;
const round = (n: number) => Math.round(n * 10) / 10;

function niceStep(range: number) {
  return [25, 50, 100, 200, 250, 500].find((s) => range / s <= 6) ?? 1000;
}

function timeTicks(t0: number, t1: number): { t: number; label: string }[] {
  const years = (t1 - t0) / (365.25 * 24 * 3600_000);
  const start = new Date(t0);
  const ticks: { t: number; label: string }[] = [];
  if (years >= 2) {
    for (let y = start.getUTCFullYear() + 1; ; y++) {
      const t = Date.UTC(y, 0, 1);
      if (t > t1) break;
      ticks.push({ t, label: String(y) });
    }
  } else {
    const every = years >= 1 ? 3 : 1;
    for (let m = start.getUTCMonth() + 1; ; m += every) {
      const t = Date.UTC(start.getUTCFullYear(), m, 1);
      if (t > t1) break;
      ticks.push({ t, label: fmtMonth(t) });
    }
  }
  return ticks;
}

export default function RatingChart({
  id,
  points,
  label,
  caption,
}: {
  id: string;
  /** Oldest first. */
  points: RatingPoint[];
  /** Names the series in the accessible summary, e.g. "Team Random Map rating". */
  label: string;
  caption?: React.ReactNode;
}) {
  if (points.length < 2) {
    return <p className={styles.empty}>Not enough rated games yet to chart.</p>;
  }

  const [t0, first] = points[0];
  const [t1, current] = points[points.length - 1];
  const peak = points.reduce((hi, p) => (p[1] > hi[1] ? p : hi));
  const low = points.reduce((lo, p) => (p[1] < lo[1] ? p : lo));

  const step = niceStep(peak[1] - low[1] || 50);
  const y0 = Math.floor((low[1] - step / 4) / step) * step;
  const y1 = Math.ceil((peak[1] + step / 4) / step) * step;
  const x = (t: number) => ((t - t0) / (t1 - t0 || 1)) * W;
  const y = (r: number) => H - ((r - y0) / (y1 - y0)) * H;

  const line = points.map(([t, r], i) => `${i ? "L" : "M"}${round(x(t))},${round(y(r))}`).join("");
  const area = `${line}L${W},${H}L0,${H}Z`;
  const gridlines: number[] = [];
  for (let r = y0; r <= y1; r += step) gridlines.push(r);

  // Each point's hover target spans halfway to its neighbours.
  const xs = points.map(([t]) => x(t));
  const hit = xs.map((px, i) => {
    const left = i ? (xs[i - 1] + px) / 2 : 0;
    const right = i < xs.length - 1 ? (px + xs[i + 1]) / 2 : W;
    return { left: round(left), width: round(right - left) };
  });

  const pos = ([t, r]: RatingPoint) => ({ left: `${x(t) / 10}%`, top: `${(y(r) / H) * 100}%` });
  const peakIsCurrent = peak === points[points.length - 1];
  // Keep the labels apart when the peak sits close to the end of the line
  const crowded = !peakIsCurrent && x(t1) - x(peak[0]) < W * 0.15;
  const align = (px: number) => (px < W * 0.1 ? styles.alignStart : px > W * 0.9 ? styles.alignEnd : undefined);

  return (
    <figure className={styles.chart}>
      <div className={styles.frame}>
        <div className={styles.yAxis} aria-hidden="true">
          {gridlines.map((r) => (
            <span key={r} style={{ top: `${(y(r) / H) * 100}%` }}>
              {fmtInt(r)}
            </span>
          ))}
        </div>

        <div className={styles.plot}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>{label}</title>
            <desc id={`${id}-desc`}>
              {`From ${fmtInt(first)} on ${fmtDate(t0)} to ${fmtInt(current)} on ${fmtDate(t1)}. ` +
                `Peak ${fmtInt(peak[1])} on ${fmtDate(peak[0])}; low ${fmtInt(low[1])} on ${fmtDate(low[0])}.`}
            </desc>
            {gridlines.map((r) => (
              <line key={r} className={styles.grid} x1={0} x2={W} y1={round(y(r))} y2={round(y(r))} />
            ))}
            <path className={styles.area} d={area} />
            <path className={styles.line} d={line} />
            <g className={styles.hit}>
              {points.map(([t, r], i) => (
                <rect key={i} x={hit[i].left} width={hit[i].width} y={0} height={H}>
                  <title>{`${fmtDate(t)}: ${fmtInt(r)}`}</title>
                </rect>
              ))}
            </g>
          </svg>

          <div aria-hidden="true">
            {!peakIsCurrent && (
              <>
                <span className={cx(styles.dot, styles.dotPeak)} style={pos(peak)} />
                <span className={cx(styles.tag, styles.tagAbove, align(x(peak[0])))} style={pos(peak)}>
                  Peak {fmtInt(peak[1])}
                </span>
              </>
            )}
            <span className={styles.dot} style={pos(points[points.length - 1])} />
            <span
              className={cx(styles.tag, styles.alignEnd, crowded ? styles.tagBelow : styles.tagAbove)}
              style={pos(points[points.length - 1])}
            >
              {peakIsCurrent ? `Peak ${fmtInt(current)}` : fmtInt(current)}
            </span>
          </div>
        </div>

        <div className={styles.xAxis} aria-hidden="true">
          {timeTicks(t0, t1).map((tick) => (
            <span key={tick.t} style={{ left: `${x(tick.t) / 10}%` }}>
              {tick.label}
            </span>
          ))}
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
