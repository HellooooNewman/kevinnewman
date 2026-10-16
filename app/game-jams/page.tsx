import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/data/projects";
import { intro } from "@/data/resume";
import { cx } from "@/lib/cx";
import card from "@/styles/card.module.css";
import chip from "@/styles/chip.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Game Jams",
  description:
    "Games Kevin Newman has built at game jams, hackathons for video games.",
  path: "/game-jams/",
});

export default function GameJamsPage() {
  return (
    <div className={cx(layout.section, layout.container)}>
      <h1 className={layout.sectionTitle}>Game Jams</h1>

      <div className={cx(card.card, styles.intro)}>
        <h2 className={styles.introTitle}>
          What is a game jam?
        </h2>
        <p className={styles.introText}>
          A game jam is a hackathon for video games: a gathering of people to
          plan, design, and build one or more games in a short span of time,
          usually 24–72 hours. I try to join a few every year; you can find
          everything I&apos;ve shipped on{" "}
          <a href={intro.social.itch} target="_blank" rel="noopener noreferrer">
            itch.io
          </a>
          .
        </p>
      </div>

      <div className={layout.grid}>
        {games.filter((g) => !g.hidden).map((g) => {
          const isLocal = g.url.startsWith("/");
          const body = (
            <>
              <div className={card.media}>
                <Image
                  src={g.coverUrl}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <div className={chip.row}>
                <span className={cx(chip.chip, chip.accent)}>{g.year}</span>
                {g.platforms.map((p) => (
                  <span className={chip.chip} key={p}>
                    {p}
                  </span>
                ))}
                <span className={chip.chip}>{g.genre}</span>
              </div>
              <h3 className={card.title}>
                {g.title}
                {!isLocal && (
                  <>
                    {" "}
                    <span className={styles.external}>↗</span>
                  </>
                )}
              </h3>
              <p className={card.summary}>{g.description}</p>
            </>
          );

          return isLocal ? (
            <Link className={card.card} key={g.id} href={g.url}>
              {body}
            </Link>
          ) : (
            <a
              className={card.card}
              key={g.id}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
            </a>
          );
        })}
      </div>
    </div>
  );
}
