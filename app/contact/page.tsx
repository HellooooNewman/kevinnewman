import { pageMetadata } from "@/lib/seo";
import Starfield from "@/components/Starfield";
import SocialLinks from "@/components/SocialLinks";
import EmailButton from "@/components/EmailButton";
import { intro } from "@/data/resume";
import { cx } from "@/lib/cx";
import card from "@/styles/card.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Email Kevin Newman, or find him on GitHub, LinkedIn, itch.io and X.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    // data-sky-page tells the footer to drop its divider: this sky fills
    // the viewport and the footer's own sky continues it seamlessly.
    <div data-sky-page className={styles.skyPage}>
      <Starfield height={720} fill />
      <div className={cx(layout.section, layout.container, styles.inner)}>
        <div className={cx(card.card, styles.panel)}>
          <h1 className={styles.title}>
            Hello, weary traveller
          </h1>
          <p className={styles.text}>
            You made it this far. Take a break, rest your fingers, and enjoy
            the sky drifting by.
          </p>
          <p className={styles.text}>
            If you&apos;d like to work together, the fastest way to reach me is
            email, or find me on any of these:
          </p>
          <p className={styles.cta}>
            <EmailButton user={intro.emailUser} domain={intro.emailDomain}>
              Let&apos;s work together
            </EmailButton>
          </p>
          <SocialLinks />
          <p className={styles.tip}>
            Tip: at night, the stars follow your cursor. Go on, try it.
          </p>
        </div>
      </div>
    </div>
  );
}
