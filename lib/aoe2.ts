// Age of Empires II: DE ladder stats from the public aoe2companion API.
//
// The site is a static export, so these run once per `next build` and the
// numbers are baked into the HTML: they refresh whenever the site deploys.
// A failed or slow API never fails the build; callers get null and render
// a fallback instead.
import "server-only";

export const PROFILE_ID = 458097;
const API = "https://data.aoe2companion.com/api";

export const LINKS = {
  insights: `https://www.aoe2insights.com/user/${PROFILE_ID}/`,
  companion: `https://www.aoe2companion.com/players/${PROFILE_ID}`,
};

/** 20 matches a page; 5 pages is a 100-match sample in one burst of
 * requests, well inside the API's 16 requests per 10 seconds. */
const MATCH_PAGES = 5;
const TIMEOUT_MS = 10_000;
const MIN_GAMES = 3;
const TOP_N = 5;
const RECENT_N = 10;
const HISTORY_POINTS = 120;
const TIME_ZONE = "America/Toronto";
// The API turns away anonymous clients (Node's default user agent gets a 403),
// so say who's asking.
const USER_AGENT = "kevinnewman.ca static build (+https://www.kevinnewman.ca/aoe2/)";

// ─── Raw API shapes (only the fields read here) ─────────────────────────

interface RawLeaderboard {
  leaderboardId: string;
  leaderboardName: string;
  rating: number | null;
  maxRating: number | null;
  rank: number | null;
  total: number | null;
  rankCountry: number | null;
  wins: number;
  losses: number;
  streak: number;
  lastMatchTime: string | null;
}

interface RawProfile {
  name: string;
  countryName: string | null;
  /** A numeric string, e.g. "1552". */
  games: string | number;
  leaderboards: RawLeaderboard[];
  /** Rating history per ladder, newest first. */
  ratings: { leaderboardId: string; ratings: { date: string; rating: number }[] }[];
}

interface RawPlayer {
  profileId: number;
  civName: string;
  civImageUrl: string;
  /** Rating going into the match. */
  rating: number | null;
  ratingDiff: number | null;
  won: boolean | null;
}

interface RawMatch {
  matchId: number;
  started: string;
  leaderboardName: string | null;
  mapName: string;
  mapImageUrl: string;
  teams: { players: RawPlayer[] }[];
}

// ─── Reduced shapes the pages render ────────────────────────────────────

export interface LadderStats {
  name: string;
  rating: number | null;
  peak: number | null;
  rank: number | null;
  total: number | null;
  rankCountry: number | null;
  wins: number;
  losses: number;
  winRate: number;
  streak: number;
}

export interface Aoe2Summary {
  /** ISO time the data was fetched, i.e. the build time. */
  asOf: string;
  name: string;
  countryName: string | null;
  totalGames: number;
  lastPlayed: string | null;
  team: LadderStats | null;
  solo: LadderStats | null;
}

export interface Tally {
  name: string;
  image: string;
  games: number;
  wins: number;
  winRate: number;
}

export interface RecentMatch {
  id: number;
  started: string;
  ladder: string;
  map: string;
  mapImage: string;
  civ: string;
  civImage: string;
  /** Players per team, e.g. "4v4". */
  format: string;
  won: boolean | null;
  ratingAfter: number | null;
  ratingDiff: number | null;
}

/** [epoch ms, rating] */
export type RatingPoint = [number, number];

export interface Aoe2Stats extends Aoe2Summary {
  /** Team Random Map rating history, oldest first, downsampled. */
  history: RatingPoint[];
  /** Rated Team RM games behind `history`, before downsampling. */
  historyGames: number;
  /** The match sample behind civs, maps and recent; null if none loaded. */
  sample: { matches: number; since: string } | null;
  civs: Tally[];
  maps: Tally[];
  recent: RecentMatch[];
}

// ─── Fetching ───────────────────────────────────────────────────────────

// Each page prerenders separately, so the raw responses are memoised per
// process: the home page and /aoe2/ share one request per build worker,
// and `next dev` reloads don't run into the rate limit.
type Memo = Map<string, { at: number; json: Promise<unknown> }>;
const memo: Memo = ((globalThis as { __aoe2Memo?: Memo }).__aoe2Memo ??= new Map());
const MEMO_TTL = process.env.NODE_ENV === "development" ? 10 * 60_000 : Infinity;

function getJson<T>(url: string): Promise<T> {
  const hit = memo.get(url);
  if (hit && Date.now() - hit.at < MEMO_TTL) return hit.json as Promise<T>;

  console.info(`[aoe2] GET ${url}`);
  // no-store keeps the response out of Next's persistent fetch cache, so
  // every build gets fresh numbers; the pages opt back into prerendering
  // with `dynamic = "force-static"`.
  const json = fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "application/json", "user-agent": USER_AGENT },
  }).then((res) => {
    if (!res.ok) throw new Error(`${res.status} from ${url}`);
    return res.json();
  });
  memo.set(url, { at: Date.now(), json });
  json.catch(() => memo.delete(url));
  return json as Promise<T>;
}

const reason = (err: unknown) => (err instanceof Error ? err.message : String(err));

const profileUrl = () => `${API}/profiles/${PROFILE_ID}`;
const matchesUrl = (page: number) => `${API}/matches?profile_ids=${PROFILE_ID}&page=${page}`;

/** Ladder ratings only: one request, for the home page's link preview. */
export async function getAoe2Summary(): Promise<Aoe2Summary | null> {
  try {
    return summarize(await getJson<RawProfile>(profileUrl()));
  } catch (err) {
    console.warn(`[aoe2] profile unavailable, rendering without stats: ${reason(err)}`);
    return null;
  }
}

/** Everything /aoe2/ shows. Missing match pages only shrink the sample;
 * a missing profile means no stats at all. */
export async function getAoe2Stats(): Promise<Aoe2Stats | null> {
  const pages = Array.from({ length: MATCH_PAGES }, (_, i) =>
    getJson<{ matches: RawMatch[] }>(matchesUrl(i + 1)),
  );
  let profile: RawProfile;
  try {
    profile = await getJson<RawProfile>(profileUrl());
  } catch (err) {
    console.warn(`[aoe2] profile unavailable, rendering the fallback: ${reason(err)}`);
    return null;
  }

  try {
    const settled = await Promise.allSettled(pages);
    const byId = new Map<number, RawMatch>();
    for (const page of settled) {
      if (page.status === "rejected") {
        console.warn(`[aoe2] a match page failed: ${reason(page.reason)}`);
        continue;
      }
      for (const m of page.value.matches ?? []) {
        if (findMe(m) && !Number.isNaN(Date.parse(m.started))) byId.set(m.matchId, m);
      }
    }
    const matches = [...byId.values()].sort((a, b) => Date.parse(b.started) - Date.parse(a.started));

    const raw = profile.ratings.find((r) => r.leaderboardId === "rm_team")?.ratings ?? [];
    const points = raw
      .map((p): RatingPoint => [Date.parse(p.date), p.rating])
      .filter(([t, r]) => Number.isFinite(t) && Number.isFinite(r))
      .sort((a, b) => a[0] - b[0]);

    return {
      ...summarize(profile),
      history: downsample(points, HISTORY_POINTS),
      historyGames: points.length,
      sample: matches.length
        ? { matches: matches.length, since: matches[matches.length - 1].started }
        : null,
      civs: tally(matches, (me) => ({ name: me.civName, image: me.civImageUrl })),
      maps: tally(matches, (_, m) => ({ name: m.mapName, image: m.mapImageUrl })),
      recent: matches.slice(0, RECENT_N).map(toRecent),
    };
  } catch (err) {
    console.warn(`[aoe2] unexpected API data, rendering the fallback: ${reason(err)}`);
    return null;
  }
}

// ─── Reducers ───────────────────────────────────────────────────────────

export function winRate(wins: number, games: number): number {
  return games > 0 ? wins / games : 0;
}

function toLadder(lb: RawLeaderboard | undefined): LadderStats | null {
  if (!lb) return null;
  return {
    name: lb.leaderboardName,
    rating: lb.rating,
    peak: lb.maxRating,
    rank: lb.rank,
    total: lb.total,
    rankCountry: lb.rankCountry,
    wins: lb.wins,
    losses: lb.losses,
    winRate: winRate(lb.wins, lb.wins + lb.losses),
    streak: lb.streak,
  };
}

function summarize(profile: RawProfile): Aoe2Summary {
  const lb = (id: string) => profile.leaderboards.find((l) => l.leaderboardId === id);
  const lastPlayed = profile.leaderboards
    .map((l) => l.lastMatchTime)
    .filter((t): t is string => !!t && !Number.isNaN(Date.parse(t)))
    .sort()
    .at(-1);
  return {
    asOf: new Date().toISOString(),
    name: profile.name,
    countryName: profile.countryName,
    totalGames: Number(profile.games) || 0,
    lastPlayed: lastPlayed ?? null,
    team: toLadder(lb("rm_team")),
    solo: toLadder(lb("rm_1v1")),
  };
}

function findMe(match: RawMatch): RawPlayer | undefined {
  return match.teams.flatMap((t) => t.players).find((p) => p.profileId === PROFILE_ID);
}

function formatOf(match: RawMatch): string {
  return match.teams.map((t) => t.players.length).join("v");
}

function tally(
  matches: RawMatch[],
  key: (me: RawPlayer, match: RawMatch) => { name: string; image: string },
): Tally[] {
  const counts = new Map<string, Tally>();
  for (const match of matches) {
    const me = findMe(match);
    if (!me || me.won === null) continue;
    const { name, image } = key(me, match);
    const entry = counts.get(name) ?? { name, image, games: 0, wins: 0, winRate: 0 };
    entry.games += 1;
    if (me.won) entry.wins += 1;
    counts.set(name, entry);
  }
  return [...counts.values()]
    .filter((t) => t.games >= MIN_GAMES)
    .map((t) => ({ ...t, winRate: winRate(t.wins, t.games) }))
    .sort((a, b) => b.games - a.games || b.winRate - a.winRate)
    .slice(0, TOP_N);
}

function toRecent(match: RawMatch): RecentMatch {
  const me = findMe(match)!;
  return {
    id: match.matchId,
    started: match.started,
    ladder: match.leaderboardName ?? "Unranked",
    map: match.mapName,
    mapImage: match.mapImageUrl,
    civ: me.civName,
    civImage: me.civImageUrl,
    format: formatOf(match),
    won: me.won,
    ratingAfter: me.rating !== null && me.ratingDiff !== null ? me.rating + me.ratingDiff : null,
    ratingDiff: me.ratingDiff,
  };
}

/** Largest-Triangle-Three-Buckets: thins a sorted series to `threshold`
 * points while keeping its shape. The all-time peak is always kept. */
function downsample(points: RatingPoint[], threshold: number): RatingPoint[] {
  if (points.length <= threshold) return points;
  const out: RatingPoint[] = [points[0]];
  const bucket = (points.length - 2) / (threshold - 2);
  let a = 0;
  for (let i = 0; i < threshold - 2; i++) {
    const start = Math.floor(i * bucket) + 1;
    const end = Math.floor((i + 1) * bucket) + 1;
    // Average of the next bucket, the third corner of each triangle
    const nextEnd = Math.min(Math.floor((i + 2) * bucket) + 1, points.length);
    let avgT = 0;
    let avgR = 0;
    for (let j = end; j < nextEnd; j++) {
      avgT += points[j][0];
      avgR += points[j][1];
    }
    const n = Math.max(nextEnd - end, 1);
    avgT /= n;
    avgR /= n;

    let best = start;
    let bestArea = -1;
    for (let j = start; j < end; j++) {
      const area = Math.abs(
        (points[a][0] - avgT) * (points[j][1] - points[a][1]) -
          (points[a][0] - points[j][0]) * (avgR - points[a][1]),
      );
      if (area > bestArea) {
        bestArea = area;
        best = j;
      }
    }
    out.push(points[best]);
    a = best;
  }
  out.push(points[points.length - 1]);

  const peak = points.reduce((hi, p) => (p[1] > hi[1] ? p : hi));
  if (!out.includes(peak)) {
    out.push(peak);
    out.sort((x, y) => x[0] - y[0]);
  }
  return out;
}

// ─── Formatting ─────────────────────────────────────────────────────────
// Absolute dates only: the HTML is static, so "2 days ago" would go stale.

const dateFmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeZone: TIME_ZONE });
const monthFmt = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const intFmt = new Intl.NumberFormat("en-CA");

export const fmtDate = (d: string | number) => dateFmt.format(new Date(d));
export const fmtMonth = (d: string | number) => monthFmt.format(new Date(d));
export const fmtInt = (n: number) => intFmt.format(n);
export const fmtPct = (ratio: number) => `${Math.round(ratio * 100)}%`;
export const fmtDiff = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "±0");
