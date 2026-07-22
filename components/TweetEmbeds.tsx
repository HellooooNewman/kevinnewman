"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void };
    };
  }
}

const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

export default function TweetEmbeds({ urls }: { urls: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    if (!theme) return;
    const load = () => window.twttr?.widgets.load(containerRef.current ?? undefined);
    if (window.twttr) {
      load();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGETS_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGETS_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", load);
    return () => script?.removeEventListener("load", load);
  }, [theme]);

  if (!theme) return null;

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {urls.map((url) => (
        <blockquote
          key={url}
          className="twitter-tweet"
          data-theme={theme}
          data-dnt="true"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View post on X ↗
          </a>
        </blockquote>
      ))}
    </div>
  );
}
