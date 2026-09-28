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
    <Link className="card" href={`/projects/${p.slug}/`}>
      <div className="card__media" style={{ aspectRatio: large ? "16 / 9" : "16 / 10" }}>
        <Image
          src={p.thumbnail}
          alt=""
          fill
          sizes={large ? "(max-width: 820px) 100vw, 50vw" : "(max-width: 720px) 100vw, 33vw"}
        />
        {p.badge && <span className="card-badge">{p.badge}</span>}
      </div>
      <h3 style={{ margin: "0 0 0.4rem", fontSize: large ? "1.3rem" : "1.1rem" }}>
        {p.title}
      </h3>
      <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.95rem" }}>
        {p.shortBody}
      </p>
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
      <section className="section container" aria-labelledby="intro-heading">
        <h2 className="section-title" id="intro-heading">
          Introduction
        </h2>
        <div className="intro-grid">
          <div>
            {intro.body.map((p, i) => (
              <p
                key={p}
                // Only the first (professional) paragraph belongs on the résumé
                className={i > 0 ? "no-print" : undefined}
                style={{ marginTop: 0, color: "var(--text-dim)" }}
              >
                {p}
              </p>
            ))}
          </div>
          <aside className="card now-panel" aria-label="What I'm up to now">
            <div className="now-panel__header">
              <h3 style={{ margin: 0, fontSize: "1rem" }}>Right now</h3>
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
      <section className="section container" aria-labelledby="work-heading">
        <h2 className="section-title" id="work-heading">
          Work
        </h2>
        <div className="timeline">
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
          className="section container"
          aria-labelledby="projects-heading"
        >
          <h2 className="section-title" id="projects-heading">
            Projects
            <Link className="view-all" href="/projects/">
              View all →
            </Link>
          </h2>
          <div className="grid--spotlight no-print">
            {spotlight.map((p) => (
              <ProjectCard key={p.id} p={p} large />
            ))}
          </div>
          {rest.length > 0 && (
            <div className="grid no-print">
              {rest.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
          {/* Résumé view: the cards above collapse to one line per project */}
          <ul className="print-only print-projects">
            {featured.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong> — {p.shortBody}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills - core stack first, the long tail second */}
      <section className="section container" aria-labelledby="skills-heading">
        <h2 className="section-title" id="skills-heading">
          Skills
        </h2>
        <div className="card">
          <h3 style={{ margin: "0 0 0.85rem", fontSize: "1.05rem" }}>
            My core stack
          </h3>
          <div className="chip-cloud">
            {skills.core.map((skill) => (
              <span className="chip chip--accent chip--lg" key={skill}>
                {skill}
              </span>
            ))}
          </div>
          <h3
            style={{
              margin: "1.75rem 0 0.85rem",
              fontSize: "0.95rem",
              color: "var(--text-dim)",
            }}
          >
            Also experienced with
          </h3>
          <div className="chip-cloud">
            {skills.also.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section container" aria-labelledby="edu-heading">
        <h2 className="section-title" id="edu-heading">
          Education
        </h2>
        <div className="grid">
          {education.map((school) => (
            <div className="card" key={school.program}>
              <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.02rem" }}>
                {school.program}
              </h3>
              <p style={{ margin: 0, color: "var(--text-faint)" }}>
                {school.school} · {school.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
