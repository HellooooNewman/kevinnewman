import type { Metadata } from "next";
import { projects, type Project } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";
import ArchivedProjects from "@/components/ArchivedProjects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work and personal projects by Kevin Newman: web apps, games, tools, and design.",
};

// Newest first; years look like "2019" or "2025–2026", so compare the start year.
function byNewest(a: Project, b: Project) {
  const diff = parseInt(b.year, 10) - parseInt(a.year, 10);
  return diff !== 0 ? diff : b.year.localeCompare(a.year);
}

export default function ProjectsPage() {
  const listed = projects.filter((p) => !p.jamOnly);
  const current = listed.filter((p) => !p.archived).sort(byNewest);
  const archived = listed.filter((p) => p.archived).sort(byNewest);

  return (
    <div className="section container">
      <h1 className="section-title">Projects</h1>
      <ProjectGrid items={current} />
      <ArchivedProjects items={archived} />
    </div>
  );
}
