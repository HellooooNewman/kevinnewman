import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import JobCard from "@/components/JobCard";
import RevealInit from "@/components/RevealInit";
import NowPreviewLink, { type NowPreview } from "@/components/NowPreviewLink";
import { intro, skills, jobs, education } from "@/data/resume";
import { projects, type Project } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";
import { cx } from "@/lib/cx";
import card from "@/styles/card.module.css";
import chip from "@/styles/chip.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./page.module.css";

// The home page keeps the site-wide preview cards from the layout; it only
// needs to name its canonical address.
export const metadata: Metadata = { alternates: { canonical: "/" } };

function getNowPreview(href: string): NowPreview | undefined {
  const project = projects.find((p) => href === `/projects/${p.slug}/`);
  if (project) {
    return {
      title: project.title,
      description: project.shortBody,
      image: project.thumbnail,
      label: `${project.workType} project · ${project.year}`,
    };
  }
  const job = jobs.find((j) => href === `#job-${j.employer.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
  if (job) {
    return {
      title: job.employer,
      description: job.summary ?? job.points[0] ?? job.title,
      image: job.logo,
      label: `${job.employmentType} · ${job.period}`,
      logo: true,
    };
  }
}

function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <Link className={card.card} href={`/projects/${p.slug}/`}>
      <div className={cx(card.media, large && styles.mediaWide)}>
        <Image
          src={p.thumbnail}
          alt=""
          fill
          sizes={large ? "(max-width: 820px) 100vw, 50vw" : "(max-width: 720px) 100vw, 33vw"}
        />
        {p.badge && <span className={card.badge}>{p.badge}</span>}
      </div>
      <h3 className={cx(card.title, large && styles.titleLarge)}>{p.title}</h3>
      <p className={card.summary}>{p.shortBody}</p>
    </Link>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.promote);
  const spotlight = featured.slice(0, 2);
  const rest = featured.slice(2);
  const personId = `${SITE_URL}/#kevin-newman`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile-page`,
        url: `${SITE_URL}/`,
        name: "Kevin Newman · Full Stack Developer",
        description: intro.body[0],
        dateModified: "2026-09-01",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: intro.name,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/assets/icons/logo-image.png`,
        jobTitle: "Senior Software Engineer",
        description: intro.body[0],
        address: {
          "@type": "PostalAddress",
          addressCountry: "CA",
        },
        worksFor: {
          "@type": "Organization",
          name: "Sonar Software",
          url: "https://sonar.software",
        },
        knowsAbout: skills.core,
        sameAs: Object.values(intro.social),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealInit />
      <Hero />

      {/* Introduction + Now */}
      <section className={cx(layout.section, layout.container)} aria-labelledby="intro-heading">
        <h2 className={layout.sectionTitle} id="intro-heading">
          Introduction
        </h2>
        <div className={styles.introGrid}>
          <div>
            {intro.body.map((p, i) => (
              <p
                key={p}
                // Only the first (professional) paragraph belongs on the résumé
                className={cx(styles.introText, i > 0 && "no-print")}
              >
                {p}
              </p>
            ))}
          </div>
          <aside
            className={cx(card.card, styles.nowPanel, "no-print")}
            aria-label="What I'm up to now"
          >
            <div className={styles.nowPanelHeader}>
              <h3 className={styles.nowPanelTitle}>Right now</h3>
            </div>
            <ul>
              {intro.now.map((item) => (
                <li key={item.text}>
                  {item.href ? (
                    <NowPreviewLink href={item.href} preview={getNowPreview(item.href)}>
                      {item.text}
                    </NowPreviewLink>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Work - constellation timeline */}
      <section className={cx(layout.section, layout.container)} aria-labelledby="work-heading">
        <h2 className={layout.sectionTitle} id="work-heading">
          Work
        </h2>
        <div className={styles.timeline}>
          {jobs.map((job) => (
            <JobCard
              key={job.employer + job.period}
              job={job}
              defaultOpen={job.employer === "Sonar Software"}
            />
          ))}
        </div>
      </section>

      {/* Featured projects - spotlights first */}
      {featured.length > 0 && (
        <section
          className={cx(layout.section, layout.container)}
          aria-labelledby="projects-heading"
        >
          <h2 className={layout.sectionTitle} id="projects-heading">
            Projects
            <Link className={layout.viewAll} href="/projects/">
              View all →
            </Link>
          </h2>
          <div className={cx(styles.spotlight, "no-print")}>
            {spotlight.map((p) => (
              <ProjectCard key={p.id} p={p} large />
            ))}
          </div>
          {rest.length > 0 && (
            <div className={cx(layout.grid, "no-print")}>
              {rest.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
          {/* Résumé view: the cards above collapse to one line per project */}
          <ul className={cx("print-only", styles.printProjects)}>
            {featured.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong> — {p.shortBody}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills - core stack first, the long tail second */}
      <section className={cx(layout.section, layout.container)} aria-labelledby="skills-heading">
        <h2 className={layout.sectionTitle} id="skills-heading">
          Skills
        </h2>
        <div className={card.card}>
          <h3 className={styles.skillsTitle}>My core stack</h3>
          <div className={styles.chipCloud}>
            {skills.core.map((skill) => (
              <span className={cx(chip.chip, chip.accent)} key={skill}>
                {skill}
              </span>
            ))}
          </div>
          <h3 className={styles.skillsSubtitle}>Also experienced with</h3>
          <div className={styles.chipCloud}>
            {skills.also.map((skill) => (
              <span className={chip.chip} key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={cx(layout.section, layout.container)} aria-labelledby="edu-heading">
        <h2 className={layout.sectionTitle} id="edu-heading">
          Education
        </h2>
        <div className={layout.grid}>
          {education.map((school) => (
            <div className={card.card} key={school.program}>
              <h3 className={styles.program}>{school.program}</h3>
              <p className={styles.school}>
                {school.school} · {school.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
