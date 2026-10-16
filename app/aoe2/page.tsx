import { pageMetadata } from "@/lib/seo";
import RatingChart from "@/components/RatingChart";
import {
  LINKS,
  fmtDate,
  fmtDiff,
  fmtInt,
  fmtPct,
  getAoe2Stats,
  type Aoe2Stats,
  type LadderStats,
  type Tally,
} from "@/lib/aoe2";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import card from "@/styles/card.module.css";
import chip from "@/styles/chip.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./page.module.css";

// The stats fetch opts out of Next's fetch cache so each build is fresh;
// this keeps the page prerendered into the static export anyway.
export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: "Age of Empires II",
  description:
    "Kevin Newman's Age of Empires II: Definitive Edition ladder stats: ratings, rating history, most-played civs and maps, and recent matches.",
  path: "/aoe2/",
});

const External = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function rankLine(l: LadderStats, country: string | null) {
  if (l.rank === null) return "Not currently ranked";
  const parts = [`#${fmtInt(l.rank)}`];
  if (l.total) parts[0] += ` of ${fmtInt(l.total)} · top ${fmtPct(l.rank / l.total)}`;
  if (l.rankCountry && country) parts.push(`#${fmtInt(l.rankCountry)} in ${country}`);
  return parts.join(" · ");
}

function streakLine(streak: number) {
  if (streak === 0) return null;
  const n = Math.abs(streak);
  return `${streak > 0 ? "Won" : "Lost"} the last ${n === 1 ? "game" : `${n} games`}`;
}

function Tiles({ stats }: { stats: Aoe2Stats }) {
  const { team, solo } = stats;
  return (
    <dl className={styles.tiles}>
      {team && (
        <div className={cx(card.card, styles.tile, styles.tileHero)}>
          <dt>{team.name}</dt>
          <dd className={styles.value}>{team.rating !== null ? fmtInt(team.rating) : "–"}</dd>
          {team.peak !== null && <dd>Peak {fmtInt(team.peak)}</dd>}
          <dd>{rankLine(team, stats.countryName)}</dd>
        </div>
      )}
      {solo && (
        <div className={cx(card.card, styles.tile)}>
          <dt>{solo.name}</dt>
          <dd className={styles.value}>{solo.rating !== null ? fmtInt(solo.rating) : "–"}</dd>
          {solo.peak !== null && <dd>Peak {fmtInt(solo.peak)}</dd>}
          <dd>
            {solo.wins}–{solo.losses} record
          </dd>
        </div>
      )}
      {team && (
        <div className={cx(card.card, styles.tile)}>
          <dt>Team record</dt>
          <dd className={styles.value}>
            {fmtInt(team.wins)}–{fmtInt(team.losses)}
          </dd>
          <dd>{fmtPct(team.winRate)} wins</dd>
          {streakLine(team.streak) && <dd>{streakLine(team.streak)}</dd>}
        </div>
      )}
      <div className={cx(card.card, styles.tile)}>
        <dt>Games played</dt>
        <dd className={styles.value}>{fmtInt(stats.totalGames)}</dd>
        {stats.lastPlayed && <dd>Last ladder game {fmtDate(stats.lastPlayed)}</dd>}
      </div>
    </dl>
  );
}

function TallyList({ title, rows }: { title: string; rows: Tally[] }) {
  return (
    <section className={cx(card.card, styles.panel)}>
      <h2 className={styles.heading}>{title}</h2>
      {rows.length ? (
        <ol className={styles.tally}>
          {rows.map((row) => (
            <li key={row.name}>
              <img className={styles.icon} src={row.image} alt="" width={28} height={28} loading="lazy" />
              <span className={styles.tallyName}>{row.name}</span>
              <span className={styles.tallyMeta}>
                {row.games} games · {fmtPct(row.winRate)} wins
              </span>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ width: fmtPct(row.winRate) }} />
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.muted}>Not enough recent games to rank yet.</p>
      )}
    </section>
  );
}

function RecentMatches({ stats }: { stats: Aoe2Stats }) {
  return (
    <section className={cx(card.card, styles.panel)}>
      <h2 className={styles.heading}>Recent matches</h2>
      <ol className={styles.matches}>
        {stats.recent.map((m) => (
          <li key={m.id}>
            <span className={cx(chip.chip, m.won && chip.accent, styles.result)}>
              {m.won === null ? "No result" : m.won ? "Win" : "Loss"}
            </span>
            <span className={styles.matchCiv}>
              <img className={styles.icon} src={m.civImage} alt="" width={28} height={28} loading="lazy" />
              {m.civ}
            </span>
            <span className={styles.matchMap}>
              {m.map} · {m.format}
            </span>
            <span className={styles.matchRating}>
              {m.ratingAfter !== null && m.ratingDiff !== null
                ? `${fmtInt(m.ratingAfter)} (${fmtDiff(m.ratingDiff)})`
                : m.ladder}
            </span>
            <time className={styles.matchDate} dateTime={m.started}>
              {fmtDate(m.started)}
            </time>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function Aoe2Page() {
  const stats = await getAoe2Stats();

  return (
    <div className={cx(layout.section, layout.container)}>
      <h1 className={layout.sectionTitle}>Age of Empires II</h1>

      <div className={cx(card.card, styles.intro)}>
        {stats ? (
          <>
            <h2 className={styles.introTitle}>My ladder stats</h2>
            <p className={styles.introText}>
              A snapshot of my ranked Age of Empires II: Definitive Edition games as{" "}
              <strong>{stats.name}</strong>, pulled from aoe2companion when this site was last
              built on{" "}
              <time dateTime={stats.asOf}>{fmtDate(stats.asOf)}</time>. Live numbers are on{" "}
              <External href={LINKS.insights}>aoe2insights</External> and{" "}
              <External href={LINKS.companion}>aoe2companion</External>.
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.introTitle}>Stats unavailable</h2>
            <p className={styles.introText}>
              The ladder stats feed couldn&apos;t be reached when this site was last built, so
              there&apos;s nothing to show here right now. My live profile has everything.
            </p>
            <a className={cx(button.btn, styles.fallbackLink)} href={LINKS.insights} target="_blank" rel="noopener noreferrer">
              View my profile on aoe2insights ↗
            </a>
          </>
        )}
      </div>

      {stats && (
        <>
          <Tiles stats={stats} />

          <section className={cx(card.card, styles.panel)}>
            <h2 className={styles.heading}>Team Random Map rating</h2>
            <RatingChart
              id="team-rating"
              points={stats.history}
              label="Team Random Map rating over time"
              caption={
                stats.history.length > 1 &&
                `${fmtInt(stats.historyGames)} rated team games since ${fmtDate(stats.history[0][0])}. Hover the line for dates.`
              }
            />
          </section>

          {stats.sample ? (
            <>
              <div className={styles.split}>
                <TallyList title="Most played civs" rows={stats.civs} />
                <TallyList title="Most played maps" rows={stats.maps} />
              </div>
              <p className={styles.sampleNote}>
                Civs and maps are from my last {stats.sample.matches} matches, since{" "}
                {fmtDate(stats.sample.since)}.
              </p>
              <RecentMatches stats={stats} />
            </>
          ) : (
            <p className={styles.sampleNote}>
              Match history couldn&apos;t be loaded for this build, so civs, maps and recent
              matches are missing.
            </p>
          )}
        </>
      )}

      <p className={styles.legal}>
        Data from <External href="https://www.aoe2companion.com/">aoe2companion</External>. Age of
        Empires II © Microsoft Corporation. This page was created under Microsoft&apos;s
        &ldquo;Game Content Usage Rules&rdquo; using assets from Age of Empires II, and it is not
        endorsed by or affiliated with Microsoft.
      </p>
    </div>
  );
}
