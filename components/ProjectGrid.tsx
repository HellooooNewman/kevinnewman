import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectGrid({
  items,
  headingLevel = 2,
}: {
  items: Project[];
  /** Card titles sit one level below the heading above the grid. */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <div className="grid">
      {items.map((p) => (
        <Link className="card" href={`/projects/${p.slug}/`} key={p.id}>
          <div
            className="card__media"
            style={{
              aspectRatio: "16 / 10",
            }}
          >
            <Image
              src={p.thumbnail}
              alt=""
              fill
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
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
          <Heading style={{ margin: "0 0 0.4rem", fontSize: "1.1rem" }}>{p.title}</Heading>
          <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.95rem" }}>
            {p.shortBody}
          </p>
        </Link>
      ))}
    </div>
  );
}
