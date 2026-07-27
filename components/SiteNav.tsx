"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

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
    <header className="site-nav no-print">
      <div className="container site-nav__inner">
        <Link
          href="/"
          aria-label="Home"
          className={`site-nav__logo${showLogo ? " is-visible" : ""}`}
          aria-hidden={!showLogo}
          tabIndex={showLogo ? undefined : -1}
        >
          <Logo size={34} color="var(--brand-blue-bright)" />
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav__links">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={active ? "active" : undefined}
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
