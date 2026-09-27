import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

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
