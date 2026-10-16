import Starfield from "./Starfield";
import SocialLinks from "./SocialLinks";
import CampsiteScene from "./CampsiteScene";
import { lastUpdated } from "@/data/resume";
import FooterParallax from "./FooterParallax";
import { cx } from "@/lib/cx";
import layout from "@/styles/layout.module.css";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="footer" className={cx("no-print", styles.footer)}>
      <Starfield fill moonStyle="none" reflectOnWater />
      <FooterParallax>
        <CampsiteScene />
      </FooterParallax>
      <div className={cx(layout.container, styles.inner)}>
        <div className={styles.farewell}>
          <p className={styles.thanks}>
            Thanks for coming by. Have a nice day.
          </p>
          <p className={styles.meta}>
            © {new Date().getFullYear()} Kevin Newman · Last updated {lastUpdated}
          </p>
          <div className={styles.social}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
