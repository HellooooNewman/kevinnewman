/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import GalleryLightbox from "@/components/GalleryLightbox";
import TweetEmbeds from "@/components/TweetEmbeds";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortBody,
    openGraph: {
      title: project.title,
      description: project.shortBody,
      images: [{ url: project.mainImg }],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="section container" style={{ maxWidth: 860 }}>
      <Link
        href="/projects/"
        style={{ fontSize: "0.9rem", color: "var(--text-faint)" }}
      >
        ← All projects
      </Link>
      <h1
        style={{
          margin: "0.75rem 0 0.5rem",
          fontSize: "clamp(1.8rem, 1.4rem + 2vw, 2.6rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {project.title}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <span className="chip chip--accent">{project.workType}</span>
        {project.projectType.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
        <span className="chip">{project.year}</span>
        {project.roles.map((r) => (
          <span className="chip" key={r}>
            {r}
          </span>
        ))}
      </div>

      <GalleryLightbox
        images={[{ url: project.mainImg, alt: project.title }]}
        variant="hero"
      />

      <h2 style={{ fontSize: "1.25rem" }}>Project Summary</h2>
      {project.body.map((p) => (
        <p key={p} style={{ color: "var(--text-dim)" }}>
          {p}
        </p>
      ))}

      {(project.projectUrl || project.repoUrl) && (
        <p style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {project.projectUrl && (
            <a
              className="btn btn--primary"
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit project ↗
            </a>
          )}
          {project.repoUrl && project.repoUrl !== project.projectUrl && (
            <a
              className="btn"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source ↗
            </a>
          )}
        </p>
      )}

      {project.links && (
        <>
          <h2 style={{ fontSize: "1.25rem" }}>Links</h2>
          <ul style={{ color: "var(--text-dim)" }}>
            {project.links.map((l) => (
              <li key={l.url} style={{ marginBottom: "0.4rem" }}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
                {l.description && <> · {l.description}</>}
              </li>
            ))}
          </ul>
        </>
      )}

      {project.demoCredentials && (
        <div
          className="card"
          style={{ marginTop: "1.5rem", padding: "1.25rem" }}
        >
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>
            Try the demo
          </h2>
          <p style={{ margin: "0 0 0.75rem", color: "var(--text-dim)" }}>
            <a
              href={project.demoCredentials.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign in ↗
            </a>{" "}
            {project.demoCredentials.note}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-faint)",
            }}
          >
            {project.demoCredentials.email} / {project.demoCredentials.password}
          </p>
        </div>
      )}

      {project.youtubeVideos && (
        <>
          <h2 style={{ fontSize: "1.25rem", marginTop: "2rem" }}>Videos</h2>
          {project.youtubeVideos.map((v) => (
            <div
              key={v.id}
              style={{
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                marginTop: "1rem",
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </div>
          ))}
        </>
      )}

      {project.features && (
        <>
          <h2 style={{ fontSize: "1.25rem" }}>Features</h2>
          <ul style={{ color: "var(--text-dim)" }}>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </>
      )}

      {project.videos?.map((v) => (
        <video
          key={v}
          controls
          muted
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            marginTop: "1rem",
          }}
        >
          <source src={`${v}.webm`} type="video/webm" />
          <source src={`${v}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      {project.tweets && (
        <>
          <h2 style={{ fontSize: "1.25rem", marginTop: "2rem" }}>Posts</h2>
          <TweetEmbeds urls={project.tweets} />
        </>
      )}

      {project.gallery.length > 0 && (
        <>
          <h2 style={{ fontSize: "1.25rem", marginTop: "2rem" }}>Gallery</h2>
          <GalleryLightbox images={project.gallery} />
        </>
      )}
    </article>
  );
}
