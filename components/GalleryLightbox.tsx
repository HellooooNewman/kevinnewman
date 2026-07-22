/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";

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

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

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
          e.preventDefault();
          next();
          break;
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
          <img
            src={images[0].url}
            alt={images[0].alt}
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
              <img
                src={g.url}
                alt={g.alt}
                loading="lazy"
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
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button
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
          <img
            className="lightbox-image"
            src={images[index].url}
            alt={images[index].alt}
          />
        </div>
      )}
    </>
  );
}
