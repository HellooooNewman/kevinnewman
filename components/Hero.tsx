import Starfield from "./Starfield";
import Mountains from "./Mountains";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import EmailButton from "./EmailButton";
import PrintContact from "./PrintContact";
import { intro } from "@/data/resume";

// Bare hostnames read better than https:// URLs on a printed page
const printLink = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function Hero() {
  return (
    // Wrapper so the mountains can hang below the section's clipped edge
    <div style={{ position: "relative" }}>
      <section
        className="hero-sky"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Starfield height={520} />

      <div className="container hero-inner">
        <div style={{ pointerEvents: "auto", maxWidth: 680 }}>
          <div
            id="hero-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
              color: "var(--brand-blue-bright)",
            }}
          >
            <Logo size={56} />
          </div>
          <h1
            className="hero-name"
            style={{
              margin: 0,
              fontSize: "clamp(2.2rem, 1.5rem + 4vw, 3.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            {intro.name}
          </h1>
          <p
            style={{
              margin: "0.75rem 0 0",
              fontSize: "clamp(1.1rem, 1rem + 1vw, 1.45rem)",
              color: "var(--text-dim)",
              fontWeight: 600,
            }}
          >
            {intro.tagline} · {intro.location}
          </p>
          <PrintContact
            user={intro.emailUser}
            domain={intro.emailDomain}
            links={[
              intro.emailDomain,
              printLink(intro.social.linkedin),
              printLink(intro.social.github),
            ]}
          />
          <p
            style={{
              margin: "1rem 0 0",
              fontSize: "1.1rem",
              color: "var(--text-dim)",
              maxWidth: 520,
            }}
          >
            {intro.headline}
          </p>
          <div
            className="no-print"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1.75rem",
              alignItems: "center",
            }}
          >
            <EmailButton
              user={intro.emailUser}
              domain={intro.emailDomain}
              className="btn btn--primary"
            >
              Get in touch
            </EmailButton>
            <a
              className="btn"
              href={intro.resumePdf}
              target="_blank"
              rel="noopener"
            >
              ↓ Résumé
            </a>
            <SocialLinks />
          </div>

          <div className="hero-stats">
            {intro.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Mountain silhouette: the v1 horizon, now a layered valley */}
      <Mountains />
    </div>
  );
}
