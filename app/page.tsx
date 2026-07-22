/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Hero from "@/components/Hero";
import JobCard from "@/components/JobCard";
import RevealInit from "@/components/RevealInit";
import { intro, skills, jobs, education } from "@/data/resume";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <Link className="card" href={`/projects/${p.slug}/`}>
      <div className="card__media" style={{ aspectRatio: large ? "16 / 9" : "16 / 10" }}>
        <img src={p.thumbnail} alt={p.title} loading="lazy" />
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

  return (
    <>
      <RevealInit />
      <Hero />

      {/* Introduction + Now */}
      <section className="section container" aria-labelledby="intro-heading" data-reveal>
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
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>
              Right now
            </h3>
            <ul>
              {intro.now.map((item) => (
                <li key={item.text}>
                  <span aria-hidden="true">{item.icon}</span>
                  {item.href ? (
                    // Hash links use a plain <a>: native fragment navigation
                    // fires hashchange (which opens the job card) and honors
                    // scroll-margin-top, unlike Next's client-side scrolling.
                    item.href.startsWith("#") ? (
                      <a href={item.href}>{item.text}</a>
                    ) : (
                      <Link href={item.href}>{item.text}</Link>
                    )
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
      <section className="section container" aria-labelledby="work-heading" data-reveal>
        <h2 className="section-title" id="work-heading">
          Work
        </h2>
        <div className="timeline">
          {jobs.map((job) => (
            <JobCard key={job.employer + job.period} job={job} />
          ))}
        </div>
      </section>

      {/* Featured projects - spotlights first */}
      {featured.length > 0 && (
        <section
          className="section container"
          aria-labelledby="projects-heading"
          data-reveal
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
      <section className="section container" aria-labelledby="skills-heading" data-reveal>
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
      <section className="section container" aria-labelledby="edu-heading" data-reveal>
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
