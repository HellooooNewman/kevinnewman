import Starfield from "./Starfield";
import Mountains from "./Mountains";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import EmailButton from "./EmailButton";
import PrintContact from "./PrintContact";
import { intro } from "@/data/resume";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./Hero.module.css";

// Bare hostnames read better than https:// URLs on a printed page
const printLink = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function Hero() {
  return (
    // Wrapper so the mountains can hang below the section's clipped edge
    <div className={styles.hero}>
      <section className={styles.sky}>
        <Starfield height={520} />

        <div className={cx(layout.container, styles.inner)}>
          <div className={styles.content}>
            <div id="hero-logo" className={styles.logo}>
              <Logo size={56} />
            </div>
            <h1 className={styles.name}>{intro.name}</h1>
            <p className={styles.tagline}>
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
            <p className={styles.headline}>{intro.headline}</p>
            <div className={cx("no-print", styles.actions)}>
              <EmailButton user={intro.emailUser} domain={intro.emailDomain}>
                Let&apos;s work together
              </EmailButton>
              <a
                className={button.btn}
                href={intro.resumePdf}
                target="_blank"
                rel="noopener"
              >
                ↓ Résumé
              </a>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Mountain silhouette: the v1 horizon, now a layered valley */}
      <Mountains />
    </div>
  );
}
