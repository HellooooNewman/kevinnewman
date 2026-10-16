"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./ArchivedProjects.module.css";

export default function ArchivedProjects({ items }: { items: Project[] }) {
  const [show, setShow] = useState(false);

  if (items.length === 0) return null;

  if (!show) {
    return (
      <div className={styles.reveal}>
        <button className={button.btn} onClick={() => setShow(true)}>
          View archived projects
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className={cx(layout.sectionTitle, styles.title)}>
        Archived Projects
      </h2>
      <p className={styles.note}>
        Older work, kept around for the memories.
      </p>
      <ProjectGrid items={items} headingLevel={3} />
    </>
  );
}
