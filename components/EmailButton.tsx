"use client";

import { useState } from "react";
import { useIsClient } from "@/lib/client-state";
import { cx } from "@/lib/cx";
import button from "@/styles/button.module.css";

// The address arrives as split parts and is only assembled in the browser,
// so it never appears in the served HTML that scrapers read. Once hydrated
// it's a real mailto anchor, and clicking also copies the address, so the
// action still produces a useful result without a configured mail client.
export default function EmailButton({
  user,
  domain,
  className = cx(button.btn, button.primary),
  children,
}: {
  user: string;
  domain: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const isClient = useIsClient();
  const address = `${user}@${domain}`;

  const showCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
  };

  const copyWithFallback = () => {
    const textarea = document.createElement("textarea");
    textarea.value = address;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const didCopy = document.execCommand("copy");
    textarea.remove();
    if (didCopy) showCopied();
  };

  const handleClick = () => {
    if (navigator.clipboard && window.isSecureContext) {
      void navigator.clipboard.writeText(address).then(showCopied, copyWithFallback);
    } else {
      copyWithFallback();
    }
  };

  return (
    <a
      className={className}
      href={isClient ? `mailto:${address}` : undefined}
      onClick={handleClick}
      aria-label={isClient ? `${children}: email ${address}` : undefined}
      title={isClient ? address : undefined}
    >
      {copied ? "Email copied!" : children}
    </a>
  );
}
