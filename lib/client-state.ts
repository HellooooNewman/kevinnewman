import { useSyncExternalStore } from "react";

// Browser-only state read through useSyncExternalStore: the server render
// gets a fixed fallback, and hydration then switches to the real value
// without a setState-in-effect round trip.

export type Theme = "dark" | "light";

const subscribeNever = () => () => {};

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

/** False in the server render, true once running in the browser. */
export function useIsClient() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

/** The live [data-theme] on <html>; "dark" (the default) on the server. */
export function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme, (): Theme => "dark");
}

/** The theme at mount, not followed afterwards; null on the server. For
    embeds that can't re-theme once they've rendered. */
export function useMountTheme() {
  return useSyncExternalStore(subscribeNever, readTheme, () => null);
}
