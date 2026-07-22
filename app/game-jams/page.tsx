/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { games } from "@/data/projects";
import { intro } from "@/data/resume";

export const metadata: Metadata = {
  title: "Game Jams",
  description:
    "Games Kevin Newman has built at game jams, hackathons for video games.",
};

export default function GameJamsPage() {
  return (
    <div className="section container">
      <h1 className="section-title">Game Jams</h1>

      <div className="card" style={{ maxWidth: 680, marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem" }}>
          What is a game jam?
        </h2>
        <p style={{ margin: 0, color: "var(--text-dim)" }}>
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

      <div className="grid">
        {games.filter((g) => !g.hidden).map((g) => {
          const isLocal = g.url.startsWith("/");
          const body = (
            <>
              <div
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  marginBottom: "1rem",
                  aspectRatio: "315 / 250",
                  background: "var(--bg-raised)",
                }}
              >
                <img
                  src={g.coverUrl}
                  alt={g.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginBottom: "0.6rem",
                }}
              >
                <span className="chip chip--accent">{g.year}</span>
                {g.platforms.map((p) => (
                  <span className="chip" key={p}>
                    {p}
                  </span>
                ))}
                <span className="chip">{g.genre}</span>
              </div>
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.1rem" }}>
                {g.title}
                {!isLocal && (
                  <>
                    {" "}
                    <span style={{ color: "var(--text-faint)" }}>↗</span>
                  </>
                )}
              </h3>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.95rem" }}>
                {g.description}
              </p>
            </>
          );

          return isLocal ? (
            <Link className="card" key={g.id} href={g.url}>
              {body}
            </Link>
          ) : (
            <a
              className="card"
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
