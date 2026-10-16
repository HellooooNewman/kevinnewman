import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import GalleryLightbox from "@/components/GalleryLightbox";
import JsonLd from "@/components/JsonLd";
import TweetEmbeds from "@/components/TweetEmbeds";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import card from "@/styles/card.module.css";
import chip from "@/styles/chip.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./page.module.css";

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
  return pageMetadata({
    title: project.title,
    description: project.shortBody,
    path: `/projects/${project.slug}/`,
    image: { url: project.mainImg, alt: project.title },
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const projectUrl = `${SITE_URL}/projects/${project.slug}/`;
  const sameAs = [
    ...new Set(
      [
        project.projectUrl,
        project.repoUrl,
        ...(project.links?.map((link) => link.url) ?? []),
      ].filter((url): url is string => Boolean(url)),
    ),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    description: project.shortBody,
    image: new URL(project.mainImg, SITE_URL).toString(),
    dateCreated: project.year.slice(0, 4),
    creator: {
      "@type": "Person",
      "@id": `${SITE_URL}/#kevin-newman`,
      name: "Kevin Newman",
    },
    genre: project.projectType,
    keywords: [...project.projectType, ...project.roles].join(", "),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <article className={cx(layout.section, layout.container, styles.article)}>
      <JsonLd data={jsonLd} />
      <Link href="/projects/" className={styles.back}>
        ← All projects
      </Link>
      <h1 className={styles.title}>{project.title}</h1>

      <div className={cx(chip.row, styles.chips)}>
        <span className={cx(chip.chip, chip.accent)}>{project.workType}</span>
        {project.projectType.map((t) => (
          <span className={chip.chip} key={t}>
            {t}
          </span>
        ))}
        <span className={chip.chip}>{project.year}</span>
        {project.roles.map((r) => (
          <span className={chip.chip} key={r}>
            {r}
          </span>
        ))}
      </div>

      <GalleryLightbox
        images={[{ url: project.mainImg, alt: project.title }]}
        variant="hero"
      />

      <h2 className={styles.heading}>Project Summary</h2>
      {project.body.map((p) => (
        <p key={p} className={styles.text}>
          {p}
        </p>
      ))}

      {(project.projectUrl || project.repoUrl) && (
        <p className={styles.actions}>
          {project.projectUrl && (
            <a
              className={cx(button.btn, button.primary)}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit project ↗
            </a>
          )}
          {project.repoUrl && project.repoUrl !== project.projectUrl && (
            <a
              className={button.btn}
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
          <h2 className={styles.heading}>Links</h2>
          <ul className={cx(styles.text, styles.links)}>
            {project.links.map((l) => (
              <li key={l.url}>
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
        <div className={cx(card.card, styles.demo)}>
          <h2 className={styles.demoTitle}>Try the demo</h2>
          <p className={styles.demoNote}>
            <a
              href={project.demoCredentials.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign in ↗
            </a>{" "}
            {project.demoCredentials.note}
          </p>
          <p className={styles.demoLogin}>
            {project.demoCredentials.email} / {project.demoCredentials.password}
          </p>
        </div>
      )}

      {project.youtubeVideos && (
        <>
          <h2 className={cx(styles.heading, styles.spaced)}>Videos</h2>
          {project.youtubeVideos.map((v) => (
            <div key={v.id} className={styles.youtube}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </>
      )}

      {project.features && (
        <>
          <h2 className={styles.heading}>Features</h2>
          <ul className={styles.text}>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </>
      )}

      {project.videos?.map((v) => (
        <video
          key={v}
          className={styles.video}
          controls
          muted
          playsInline
          preload="metadata"
        >
          <source src={`${v}.webm`} type="video/webm" />
          <source src={`${v}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      {project.tweets && (
        <>
          <h2 className={cx(styles.heading, styles.spaced)}>Posts</h2>
          <TweetEmbeds urls={project.tweets} />
        </>
      )}

      {project.gallery.length > 0 && (
        <>
          <h2 className={cx(styles.heading, styles.spaced)}>Gallery</h2>
          <GalleryLightbox images={project.gallery} />
        </>
      )}
    </article>
  );
}
