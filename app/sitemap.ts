import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const SITE_URL = "https://www.kevinnewman.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "projects/", "game-jams/", "contact/"].map((p) => ({
    url: `${SITE_URL}/${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const projectPages = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}/`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...projectPages];
}
