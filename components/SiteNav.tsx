"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { cx } from "@/lib/cx";
import layout from "@/styles/layout.module.css";
import styles from "./SiteNav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/game-jams/", label: "Game Jams" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On home, the hero has its own stacked logo; the nav logo only slides in
  // once the hero logo has scrolled up past the bar.
  const [pastHeroLogo, setPastHeroLogo] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const heroLogo = document.getElementById("hero-logo");
    if (!heroLogo) {
      // Nothing to watch, so show the nav logo straight away
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPastHeroLogo(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPastHeroLogo(!entry.isIntersecting),
      // Treat the hero logo as "gone" once it slips under the sticky bar.
      { rootMargin: "-54px 0px 0px 0px" }
    );
    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [isHome]);

  const showLogo = !isHome || pastHeroLogo;

  return (
    <header className={cx(styles.siteNav, "no-print")}>
      <div className={cx(layout.container, styles.inner)}>
        <Link
          href="/"
          aria-label="Home"
          className={cx(styles.logo, showLogo && styles.visible)}
          aria-hidden={!showLogo}
          tabIndex={showLogo ? undefined : -1}
        >
          <Logo size={34} color="var(--brand-blue-bright)" />
        </Link>
        <nav aria-label="Main" className={styles.menu}>
          <ul className={styles.links}>
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={active ? styles.active : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
