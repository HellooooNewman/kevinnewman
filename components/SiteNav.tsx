"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuId = useId();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;
  // On home, the hero has its own stacked logo; the nav logo only slides in
  // once the hero logo has scrolled up past the bar.
  const [pastHeroLogo, setPastHeroLogo] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpenForPath(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [menuOpen]);

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
    <header ref={header} className={cx(styles.siteNav, "no-print")} onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) {
        event.preventDefault();
        setOpenForPath(null);
        menuButton.current?.focus();
      }
    }}>
      <div className={cx(layout.container, styles.inner)}>
        <Link
          href="/"
          aria-label="Home"
          className={cx(styles.logo, showLogo && styles.visible)}
          aria-hidden={!showLogo}
          tabIndex={showLogo ? undefined : -1}
          onClick={() => setOpenForPath(null)}
        >
          <Logo size={34} color="var(--brand-blue-bright)" />
        </Link>
        <button ref={menuButton} type="button" className={styles.menuToggle}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen} aria-controls={menuId}
          onClick={() => setOpenForPath(menuOpen ? null : pathname)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false"><path d={menuOpen ? "M6 6l12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          Menu
        </button>
        <nav id={menuId} aria-label="Main" className={cx(styles.menu, menuOpen && styles.menuOpen)}>
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
                    onClick={() => setOpenForPath(null)}
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
