import SocialLinks from "./SocialLinks";
import Starfield from "./Starfield";
import CampsiteScene from "./CampsiteScene";

export default function Footer() {
  return (
    <footer className="no-print site-footer">
      <Starfield height={560} moonStyle="none" />
      <CampsiteScene />
      {/* pointer-events pattern from the contact page: the wrapper lets
          events through to the starfield, interactive children opt back in */}
      <div className="container site-footer__inner">
        <div style={{ pointerEvents: "auto", display: "inline-block" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>
            Thanks for coming by. <span aria-hidden="true">✨</span> Have a nice
            day.
          </p>
          <p
            style={{
              margin: "0.25rem 0 0",
              color: "var(--text-faint)",
              fontSize: "0.9rem",
            }}
          >
            Designed and developed by me :)
          </p>
          <div style={{ marginTop: "1rem" }}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
