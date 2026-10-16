"use client";

import { useEffect, useRef } from "react";
import { useMountTheme } from "@/lib/client-state";
import styles from "./TweetEmbeds.module.css";

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
  // X renders each embed once in the theme it's given, so read it at mount
  const theme = useMountTheme();

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
      className={styles.tweets}
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
