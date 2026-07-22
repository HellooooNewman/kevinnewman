import type { Metadata } from "next";
import Starfield from "@/components/Starfield";
import SocialLinks from "@/components/SocialLinks";
import EmailButton from "@/components/EmailButton";
import { intro } from "@/data/resume";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kevin Newman.",
};

export default function ContactPage() {
  return (
    // data-sky-page + flex: 1 — this sky fills the viewport down to the
    // footer, whose own sky continues it seamlessly (no divider).
    <div
      data-sky-page
      style={{
        position: "relative",
        overflow: "hidden",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Starfield height={720} fill />
      <div
        className="section container"
        style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}
      >
        <div
          className="card"
          style={{
            maxWidth: 620,
            margin: "3rem auto",
            padding: "2.5rem",
            pointerEvents: "auto",
          }}
        >
          <h1 style={{ margin: "0 0 1rem", fontSize: "1.8rem", letterSpacing: "-0.02em" }}>
            Hello, weary traveller 👋
          </h1>
          <p style={{ color: "var(--text-dim)" }}>
            You made it this far. Take a break, rest your fingers, and enjoy
            the sky drifting by.
          </p>
          <p style={{ color: "var(--text-dim)" }}>
            If you&apos;d like to work together, the fastest way to reach me is
            email, or find me on any of these:
          </p>
          <p style={{ margin: "1.5rem 0" }}>
            <EmailButton
              user={intro.emailUser}
              domain={intro.emailDomain}
              className="btn btn--primary"
            >
              <span aria-hidden="true">✉️</span> Email me
            </EmailButton>
          </p>
          <SocialLinks />
          <p style={{ margin: "1.5rem 0 0", fontSize: "0.9rem", color: "var(--text-faint)" }}>
            Tip: at night, the stars follow your cursor. Go on, try it. ✨
          </p>
        </div>
      </div>
    </div>
  );
}
