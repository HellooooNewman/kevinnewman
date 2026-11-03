import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";
import { getPublishedPosts } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "projects/", "blog/", "game-jams/", "aoe2/", "contact/"].map((p) => ({
    url: `${SITE_URL}/${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const projectPages = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}/`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const blogPages = getPublishedPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.updated ?? post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...pages, ...projectPages, ...blogPages];
}
