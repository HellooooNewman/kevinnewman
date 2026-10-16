"use client";

import { useTheme } from "@/lib/client-state";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const theme = useTheme();

  // useTheme re-renders from the attribute change itself
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className={cx(button.btn, "no-print", styles.toggle)}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
