"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import type { Job } from "@/data/resume";

export default function JobCard({ job }: { job: Job }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // Anchor id so other parts of the site (e.g. the "Right now" panel) can
  // deep-link to a job: #job-sonar-software opens and scrolls to this card.
  const anchorId = `job-${job.employer.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${anchorId}` && detailsRef.current) {
        detailsRef.current.open = true;
      }
    };
    // Clicking a link whose hash already matches the URL doesn't fire
    // hashchange, so also open on any click of an anchor pointing here.
    const openOnAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a[href]");
      if (
        anchor instanceof HTMLAnchorElement &&
        anchor.hash === `#${anchorId}` &&
        detailsRef.current
      ) {
        detailsRef.current.open = true;
      }
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    document.addEventListener("click", openOnAnchorClick);
    return () => {
      window.removeEventListener("hashchange", openIfTargeted);
      document.removeEventListener("click", openOnAnchorClick);
    };
  }, [anchorId]);

  // Collapsed <details> content doesn't print: force every card open for
  // Ctrl+P (the page doubles as the résumé) and restore it afterwards.
  useEffect(() => {
    let wasOpen = false;
    const onBeforePrint = () => {
      if (!detailsRef.current) return;
      wasOpen = detailsRef.current.open;
      detailsRef.current.open = true;
    };
    const onAfterPrint = () => {
      if (detailsRef.current) detailsRef.current.open = wasOpen;
    };
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, []);

  return (
    <details className="card job-card" id={anchorId} ref={detailsRef}>
      <summary>
        <span className="job-card__id">
          <a
            href={job.employerLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${job.employer} website`}
            title={`Visit ${job.employer}`}
            // keep the logo click from also toggling the <details>
            onClick={(e) => e.stopPropagation()}
            className="job-card__logo"
          >
            <img
              src={job.logo}
              alt=""
              loading="lazy"
              width={40}
              height={40}
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                borderRadius: 8,
                background: "rgba(255,255,255,0.9)",
                padding: 4,
              }}
            />
          </a>
          <span>
            <strong style={{ fontSize: "1.05rem" }}>{job.employer}</strong>
            <span
              style={{
                display: "block",
                color: "var(--text-dim)",
                fontSize: "0.95rem",
              }}
            >
              {job.title} · {job.employmentType}
            </span>
          </span>
        </span>
        <span className="job-card__meta">
          <span className="job-card__period">{job.period}</span>
          <span className="job-card__location">{job.location}</span>
        </span>
      </summary>
      <div style={{ paddingTop: "1rem" }}>
        {job.summary && (
          <p style={{ margin: "0 0 1rem", color: "var(--text-dim)" }}>
            {job.summary}
          </p>
        )}
        {job.sections ? (
          job.sections.map((section) => (
            <div key={section.heading}>
              <h4
                style={{
                  margin: "1rem 0 0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                {section.heading}
              </h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--text-dim)" }}>
                {section.points.map((p) => (
                  <li key={p} style={{ marginBottom: "0.35rem" }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--text-dim)" }}>
            {job.points.map((p) => (
              <li key={p} style={{ marginBottom: "0.35rem" }}>
                {p}
              </li>
            ))}
          </ul>
        )}
        <p
          style={{
            margin: "0.9rem 0 0",
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--text-faint)",
          }}
        >
          {job.technology}
        </p>
      </div>
    </details>
  );
}
