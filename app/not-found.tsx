import Link from "next/link";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import layout from "@/styles/layout.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={cx(layout.section, layout.container, styles.page)}>
      <h1 className={styles.title}>
        Looks like you&apos;re lost in space.
      </h1>
      <p className={styles.text}>
        This page doesn&apos;t exist (or drifted off into the void).
      </p>
      <p>
        <Link className={cx(button.btn, button.primary)} href="/">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}
