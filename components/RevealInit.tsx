"use client";

import { useEffect } from "react";

/**
 * Home to the v1 console easter eggs. (The scroll-reveal it used to run
 * was removed; sections render in place.)
 */
export default function RevealInit() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Oh hey....what are you doing here :P");
    // eslint-disable-next-line no-console
    console.log("Try putting your mouse on the stars up top. ^");
  }, []);

  return null;
}
