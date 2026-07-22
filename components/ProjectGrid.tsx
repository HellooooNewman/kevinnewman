/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid">
      {items.map((p) => (
        <Link className="card" href={`/projects/${p.slug}/`} key={p.id}>
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: "1rem",
              aspectRatio: "16 / 10",
              background: "var(--bg-raised)",
            }}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
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
            <span className="chip chip--accent">{p.workType}</span>
            {p.projectType.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
            <span className="chip">{p.year}</span>
          </div>
          <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.1rem" }}>{p.title}</h3>
          <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.95rem" }}>
            {p.shortBody}
          </p>
        </Link>
      ))}
    </div>
  );
}
