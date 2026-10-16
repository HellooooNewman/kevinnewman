"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./PrintContact.module.css";

// Print-only contact line for the résumé header (print styles in
// PrintContact.module.css). The email arrives as split parts and is only
// assembled after mount — same anti-scraper barrier as EmailButton, so
// the address never appears in the served HTML or the RSC payload.
export default function PrintContact({
  user,
  domain,
  links,
}: {
  user: string;
  domain: string;
  links: string[];
}) {
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    setEmail(user + "@" + domain);
  }, [user, domain]);

  return (
    <p className={cx("print-only", styles.printContact)}>
      {[email, ...links].filter(Boolean).join(" · ")}
    </p>
  );
}
