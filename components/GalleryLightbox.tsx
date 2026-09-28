"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  url: string;
  alt: string;
}

export default function GalleryLightbox({
  images,
  variant = "grid",
}: {
  images: GalleryImage[];
  variant?: "grid" | "hero";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  // Keyboard users land on the close button when the viewer opens, and go
  // back to the image they opened it from when it closes.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          close();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
        case " ":
          // Space on a focused button should press it, not skip ahead
          if (e.target instanceof HTMLButtonElement) break;
          e.preventDefault();
          next();
          break;
        case "Tab": {
          // Keep focus inside the viewer while it is open
          const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
          if (!buttons || buttons.length === 0) break;
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          const active = document.activeElement;
          if (!dialogRef.current?.contains(active)) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, close, next, prev]);

  const openOnKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setIndex(i);
    }
  };

  return (
    <>
      {variant === "hero" ? (
        <div className="gallery-item gallery-item--hero">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            width={1600}
            height={1000}
            sizes="(max-width: 900px) 100vw, 860px"
            preload
            tabIndex={0}
            role="button"
            aria-label={`Enlarge image: ${images[0].alt}`}
            onClick={() => setIndex(0)}
            onKeyDown={(e) => openOnKey(e, 0)}
          />
          <button
            type="button"
            className="gallery-zoom-btn"
            aria-label={`Enlarge image: ${images[0].alt}`}
            title="Enlarge image"
            onClick={() => setIndex(0)}
          >
            ⛶
          </button>
        </div>
      ) : (
        <div className="grid" style={{ gap: "0.85rem" }}>
          {images.map((g, i) => (
            <div className="gallery-item" key={g.url}>
              <Image
                src={g.url}
                alt={g.alt}
                width={1200}
                height={750}
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                tabIndex={0}
                role="button"
                aria-label={`Enlarge image: ${g.alt}`}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => openOnKey(e, i)}
              />
              <button
                type="button"
                className="gallery-zoom-btn"
                aria-label={`Enlarge image: ${g.alt}`}
                title="Enlarge image"
                onClick={() => setIndex(i)}
              >
                ⛶
              </button>
            </div>
          ))}
        </div>
      )}

      {index !== null && (
        <div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${images[index].alt}`}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox-close"
            aria-label="Close image"
            title="Close image"
            onClick={close}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav lightbox-nav--prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox-nav lightbox-nav--next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                ›
              </button>
            </>
          )}
          <div className="lightbox-image-wrap">
            <Image
              className="lightbox-image"
              src={images[index].url}
              alt={images[index].alt}
              fill
              sizes="92vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
