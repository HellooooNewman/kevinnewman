"use client";

import { useState } from "react";

// A real anchor keeps native mailto behavior and works before hydration.
// Clicking also copies the address, so the action still produces a useful
// result on machines without a configured mail client.
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
  const [copied, setCopied] = useState(false);
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
      href={`mailto:${address}`}
      onClick={handleClick}
      aria-label={`${children}: email ${address}`}
      title={address}
    >
      {copied ? "Email copied!" : children}
    </a>
  );
}
