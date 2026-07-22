"use client";

import { useEffect, useState } from "react";

// The address arrives as two separate props and is only assembled in the
// browser after mount, so it never appears in the served HTML, the RSC
// payload, or the JS bundle. (Importing the parts as constants doesn't
// work: the minifier constant-folds the concatenation back into the full
// address - dynamic props are the barrier that prevents that.)
//
// A real anchor (rather than window.location.href in a click handler)
// keeps native mailto behavior: hover preview, right-click → copy
// address, and the browser's own no-mail-client fallback UI.
export default function EmailButton({
  user,
  domain,
  className = "btn btn--primary",
  children,
}: {
  user: string;
  domain: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref("mailto:" + user + "@" + domain);
  }, [user, domain]);

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
