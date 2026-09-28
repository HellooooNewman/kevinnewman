import Starfield from "./Starfield";
import SocialLinks from "./SocialLinks";
import CampsiteScene from "./CampsiteScene";
import { lastUpdated } from "@/data/resume";
import FooterParallax from "./FooterParallax";

export default function Footer() {
  return (
    <footer id="footer" className="no-print site-footer">
      <Starfield fill moonStyle="none" reflectOnWater />
      <FooterParallax>
        <CampsiteScene />
      </FooterParallax>
      <div className="container site-footer__inner">
        <div style={{ pointerEvents: "auto", display: "inline-block" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>
            Thanks for coming by. Have a nice day.
          </p>
          <p className="site-footer__meta">
            © {new Date().getFullYear()} Kevin Newman · Last updated {lastUpdated}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
