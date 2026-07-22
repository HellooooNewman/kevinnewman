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

      <style jsx>{`
        .site-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          background: color-mix(in srgb, var(--bg) 82%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .site-nav__inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.6rem;
          padding-bottom: 0.6rem;
        }
        /* Logo rules go through :global() - <Link> is a component, so
           styled-jsx never adds its scope class to the rendered <a>. */
        .site-nav :global(.site-nav__logo) {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }
        .site-nav :global(.site-nav__logo.is-visible) {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .site-nav :global(.site-nav__logo) {
            transition: none;
            transform: none;
          }
        }
        nav {
          flex: 1;
          min-width: 0;
        }
        .site-nav__links {
          display: flex;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .site-nav__links::-webkit-scrollbar {
          display: none;
        }
        .site-nav__links :global(a) {
          display: block;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          color: var(--text-dim);
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }
        .site-nav__links :global(a:hover) {
          color: var(--text);
          text-decoration: none;
          background: var(--bg-raised);
        }
        .site-nav__links :global(a.active) {
          color: var(--brand-blue-glow);
        }
        @media (max-width: 640px) {
          /* Every link visible on a phone: drop the (duplicate) logo, tighten
             spacing. Brand lives in the hero; "Home" still gets you back. */
          .site-nav__inner {
            gap: 0.5rem;
          }
          .site-nav :global(.site-nav__logo) {
            display: none;
          }
          .site-nav__links :global(a) {
            padding: 0.35rem 0.55rem;
            font-size: 0.9rem;
          }
        }
        @media (max-width: 400px) {
          .site-nav__inner {
            gap: 0.4rem;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          .site-nav__links :global(a) {
            padding: 0.35rem 0.45rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </header>
  );
}
