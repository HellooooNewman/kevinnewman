"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";

export default function ArchivedProjects({ items }: { items: Project[] }) {
  const [show, setShow] = useState(false);

  if (items.length === 0) return null;

  if (!show) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button className="btn" onClick={() => setShow(true)}>
          View archived projects
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="section-title" style={{ marginTop: "3.5rem" }}>
        Archived Projects
      </h2>
      <p style={{ color: "var(--text-faint)", marginTop: "-1rem", marginBottom: "1.5rem" }}>
        Older work, kept around for the memories.
      </p>
      <ProjectGrid items={items} />
    </>
  );
}
