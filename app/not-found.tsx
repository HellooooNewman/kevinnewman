import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section container" style={{ textAlign: "center", padding: "6rem 1.25rem" }}>
      <p style={{ fontSize: "4rem", margin: 0 }} aria-hidden="true">
        🛸
      </p>
      <h1 style={{ letterSpacing: "-0.02em" }}>
        Looks like you&apos;re lost in space. 🤔
      </h1>
      <p style={{ color: "var(--text-dim)" }}>
        This page doesn&apos;t exist (or drifted off into the void).
      </p>
      <p>
        <Link className="btn btn--primary" href="/">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}
