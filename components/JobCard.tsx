"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Job } from "@/data/resume";
import { cx } from "@/lib/cx";
import card from "@/styles/card.module.css";
import styles from "./JobCard.module.css";

export default function JobCard({
  job,
  defaultOpen = false,
}: {
  job: Job;
  defaultOpen?: boolean;
}) {
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
    <details
      className={cx(card.card, styles.jobCard)}
      id={anchorId}
      ref={detailsRef}
      open={defaultOpen}
    >
      <summary>
        <span className={styles.id}>
          <span className={styles.logo}>
            <Image
              src={job.logo}
              alt=""
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </span>
          <span>
            <strong className={styles.employer}>{job.employer}</strong>
            <span className={styles.role}>
              {job.title} · {job.employmentType}
            </span>
          </span>
        </span>
        <span className={styles.meta}>
          <span className={styles.period}>{job.period}</span>
          <span className={styles.location}>{job.location}</span>
        </span>
      </summary>
      <div className={styles.body}>
        {job.summary && <p className={styles.summary}>{job.summary}</p>}
        {job.sections ? (
          job.sections.map((section) => (
            <div key={section.heading}>
              <h3 className={styles.sectionHeading}>{section.heading}</h3>
              <ul className={styles.points}>
                {section.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className={styles.points}>
            {job.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        <p className={styles.tech}>{job.technology}</p>
        {/* The employer link lives here rather than in <summary>, where a
            link inside the toggle button confuses screen readers */}
        <p className={cx("no-print", styles.employerLink)}>
          <a href={job.employerLink} target="_blank" rel="noopener noreferrer">
            Visit {job.employer} ↗
          </a>
        </p>
      </div>
    </details>
  );
}
