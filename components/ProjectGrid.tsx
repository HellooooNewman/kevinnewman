import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { cx } from "@/lib/cx";
import card from "@/styles/card.module.css";
import chip from "@/styles/chip.module.css";
import layout from "@/styles/layout.module.css";

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
    <div className={layout.grid}>
      {items.map((p) => (
        <Link className={card.card} href={`/projects/${p.slug}/`} key={p.id}>
          <div className={card.media}>
            <Image
              src={p.thumbnail}
              alt=""
              fill
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
          </div>
          <div className={chip.row}>
            <span className={cx(chip.chip, chip.accent)}>{p.workType}</span>
            {p.projectType.map((t) => (
              <span className={chip.chip} key={t}>
                {t}
              </span>
            ))}
            <span className={chip.chip}>{p.year}</span>
          </div>
          <Heading className={card.title}>{p.title}</Heading>
          <p className={card.summary}>{p.shortBody}</p>
        </Link>
      ))}
    </div>
  );
}
