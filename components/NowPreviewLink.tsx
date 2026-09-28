"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export interface NowPreview {
  title: string;
  description: string;
  image: string;
  label: string;
  logo?: boolean;
}

export default function NowPreviewLink({
  href,
  children,
  preview,
}: {
  href: string;
  children: React.ReactNode;
  preview?: NowPreview;
}) {
  const id = useId();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focused = useRef(false);
  const hovered = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function cancelTimer() {
    if (timer.current) clearTimeout(timer.current);
  }

  function close() {
    cancelTimer();
    setOpen(false);
  }

  function show(delay: number) {
    cancelTimer();
    if (preview) timer.current = setTimeout(() => setOpen(true), delay);
  }

  function scheduleClose() {
    cancelTimer();
    timer.current = setTimeout(() => {
      if (!focused.current && !hovered.current) setOpen(false);
    }, 160);
  }

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      if (!linkRef.current || !cardRef.current) return;
      const link = linkRef.current.getBoundingClientRect();
      const card = cardRef.current.getBoundingClientRect();
      const gutter = 12;
      const below = link.bottom + gutter;
      const top = below + card.height <= window.innerHeight - gutter
        ? below
        : link.top - card.height - gutter;
      setPosition({
        top: Math.max(gutter, Math.min(top, window.innerHeight - card.height - gutter)),
        left: Math.max(gutter, Math.min(link.left, window.innerWidth - card.width - gutter)),
      });
    };
    place();
    // Focusing a link can scroll it into view after the focus event.
    window.addEventListener("scroll", place, true);
    return () => window.removeEventListener("scroll", place, true);
  }, [open]);

  useEffect(() => {
    // Also cancel a pending hover when scrolling before its delay expires.
    const dismiss = () => {
      if (timer.current) clearTimeout(timer.current);
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    const onScroll = (event: Event) => {
      if (focused.current) return;
      if (event.target instanceof Node && cardRef.current?.contains(event.target)) return;
      dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", dismiss);
    };
  }, []);

  const linkProps = {
    href,
    ref: linkRef,
    "aria-describedby": open ? id : undefined,
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === "touch") return;
      hovered.current = true;
      show(240);
    },
    onPointerLeave: () => {
      hovered.current = false;
      scheduleClose();
    },
    onFocus: (event: React.FocusEvent<HTMLAnchorElement>) => {
      // Touch taps keep their native, single-tap navigation.
      if (!event.currentTarget.matches(":focus-visible")) return;
      focused.current = true;
      show(0);
    },
    onBlur: () => {
      focused.current = false;
      scheduleClose();
    },
    onClick: close,
  };

  return (
    <>
      {/* Native fragments fire hashchange and open the matching job card. */}
      {href.startsWith("#") ? (
        <a {...linkProps}>{children}</a>
      ) : (
        <Link {...linkProps}>{children}</Link>
      )}
      {open && preview && createPortal(
        <div
          ref={cardRef}
          id={id}
          role="tooltip"
          className="now-preview no-print"
          style={position}
          onPointerEnter={() => {
            hovered.current = true;
            cancelTimer();
          }}
          onPointerLeave={() => {
            hovered.current = false;
            scheduleClose();
          }}
        >
          <div className={`now-preview__image${preview.logo ? " now-preview__image--logo" : ""}`}>
            <Image src={preview.image} alt="" fill sizes="320px" />
          </div>
          <div className="now-preview__body">
            <span className="now-preview__label">{preview.label}</span>
            <strong className="now-preview__title">{preview.title}</strong>
            <p>{preview.description}</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
