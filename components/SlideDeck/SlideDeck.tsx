'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './SlideDeck.module.css';

export interface Slide {
  /** Stable id, used in the URL hash so a slide can be linked to. */
  id: string;
  /** Short label for the slide menu, the presenter view, and screen readers. */
  title: string;
  /** Speaker notes, shown only in the presenter window. */
  notes?: string;
  /** Demo slides top-align and scroll when a live figure is taller than the screen. */
  layout?: 'center' | 'demo' | 'bleed';
  content: ReactNode;
}

const NAVIGATE = 'slidedeck:navigate';

function subscribeLocation(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(NAVIGATE, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(NAVIGATE, onChange);
  };
}

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener('fullscreenchange', onChange);
  return () => document.removeEventListener('fullscreenchange', onChange);
}

const readHash = () => decodeURIComponent(window.location.hash.slice(1));
const readPresenter = () => new URLSearchParams(window.location.search).has('presenter');
const readFullscreen = () => document.fullscreenElement !== null;
const readFullscreenEnabled = () => document.fullscreenEnabled;

/** Move to a slide without adding history entries or scrolling the page. */
function showSlide(id: string) {
  window.history.replaceState(window.history.state, '', `#${encodeURIComponent(id)}`);
  window.dispatchEvent(new Event(NAVIGATE));
}

/** Form controls keep every key. A focused 3D canvas keeps the arrows for
    panning, but PageUp/PageDown from a presentation clicker still navigate. */
const ownsKey = (target: EventTarget | null, key: string) => target instanceof Element && (
  !!target.closest('input, textarea, select, [contenteditable="true"], [role="slider"]') ||
  (!!target.closest('canvas') && key.startsWith('Arrow')));

export default function SlideDeck({ title, slides, articleHref }: { title: string; slides: Slide[]; articleHref: string }) {
  const hash = useSyncExternalStore(subscribeLocation, readHash, () => '');
  const presenter = useSyncExternalStore(subscribeLocation, readPresenter, () => false);
  const fullscreen = useSyncExternalStore(subscribeFullscreen, readFullscreen, () => false);
  const canFullscreen = useSyncExternalStore(subscribeFullscreen, readFullscreenEnabled, () => false);
  const deck = useRef<HTMLDivElement>(null);
  const channel = useRef<BroadcastChannel | null>(null);
  const menuId = useId();

  const found = slides.findIndex((slide) => slide.id === hash);
  const numbered = Number.parseInt(hash, 10);
  const index = found >= 0 ? found : Number.isInteger(numbered) ? Math.min(Math.max(numbered - 1, 0), slides.length - 1) : 0;
  const slide = slides[index];

  const go = (next: number) => {
    const target = slides[Math.min(Math.max(next, 0), slides.length - 1)];
    if (target.id === slide.id) return;
    showSlide(target.id);
    channel.current?.postMessage(target.id);
  };

  // The audience window and the presenter window follow each other.
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const bus = new BroadcastChannel(`slidedeck:${articleHref}`);
    bus.onmessage = (event: MessageEvent) => { if (typeof event.data === 'string') showSlide(event.data); };
    channel.current = bus;
    return () => { bus.close(); channel.current = null; };
  }, [articleHref]);

  // The deck covers the site chrome, so keep focus and scrolling inside it.
  useEffect(() => {
    const root = deck.current;
    if (!root) return;
    // Custom elements are left alone: Next's route announcer and dev overlay live there.
    const covered = [...document.body.children].filter((element): element is HTMLElement =>
      element instanceof HTMLElement && !element.contains(root) && !element.inert &&
      !element.tagName.includes('-') && !['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE', 'NOSCRIPT'].includes(element.tagName));
    covered.forEach((element) => { element.inert = true; });
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      covered.forEach((element) => { element.inert = false; });
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void deck.current?.requestFullscreen().catch(() => {});
  };
  const openPresenter = () => {
    window.open(`${window.location.pathname}?presenter#${encodeURIComponent(slide.id)}`, 'slidedeck-presenter', 'popup,width=960,height=720');
  };

  const keys = useRef({ go, index, last: slides.length - 1, toggleFullscreen, openPresenter, presenter });
  useEffect(() => { keys.current = { go, index, last: slides.length - 1, toggleFullscreen, openPresenter, presenter }; });
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || ownsKey(event.target, event.key)) return;
      const { go, index, last, toggleFullscreen, openPresenter, presenter } = keys.current;
      const onButton = event.target instanceof Element && !!event.target.closest('button, a, summary');
      switch (event.key) {
        case 'ArrowRight': case 'PageDown': go(index + 1); break;
        case 'ArrowLeft': case 'PageUp': go(index - 1); break;
        case ' ': if (onButton) return; go(index + (event.shiftKey ? -1 : 1)); break;
        case 'Home': go(0); break;
        case 'End': go(last); break;
        case 'f': case 'F': if (presenter) return; toggleFullscreen(); break;
        case 'p': case 'P': if (presenter) return; openPresenter(); break;
        default: return;
      }
      event.preventDefault();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const position = `${index + 1} / ${slides.length}`;
  const menu = <label className={styles.menu} htmlFor={menuId}>
    <span className={styles.srOnly}>Go to slide</span>
    <select id={menuId} value={slide.id} onChange={(event) => go(slides.findIndex((entry) => entry.id === event.target.value))}>
      {slides.map((entry, i) => <option key={entry.id} value={entry.id}>{i + 1}. {entry.title}</option>)}
    </select>
    <span className={styles.position} aria-hidden="true">{position}</span>
  </label>;
  const stepper = <div className={styles.stepper}>
    <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" title="Previous slide (←)">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
    </button>
    <button type="button" onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label="Next slide" title="Next slide (→ or Space)">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
    </button>
  </div>;

  if (presenter) return <div ref={deck} className={styles.presenter}>
    <PresenterView slides={slides} index={index} title={title} />
    <nav className={styles.toolbar} aria-label="Presenter controls">{menu}{stepper}</nav>
  </div>;

  return <div ref={deck} className={styles.deck} role="region" aria-roledescription="slide deck" aria-label={title}>
    <div className={styles.progress} style={{ width: `${(index + 1) / slides.length * 100}%` }} aria-hidden="true" />
    <div className={styles.stage}>{slides.map((entry, i) => <section
      key={entry.id}
      className={styles.slide}
      data-layout={entry.layout ?? 'center'}
      data-state={i === index ? 'active' : i < index ? 'past' : 'future'}
      inert={i !== index}
      aria-roledescription="slide"
      aria-label={`${i + 1} of ${slides.length}: ${entry.title}`}>
      <div className={styles.frame}>{entry.layout === 'demo' ? <FitToSlide>{entry.content}</FitToSlide> : entry.content}</div>
    </section>)}</div>
    <p className={styles.srOnly} aria-live="polite">{`Slide ${position}: ${slide.title}`}</p>
    <nav className={styles.toolbar} aria-label="Slide controls">
      <Link className={styles.back} href={articleHref}><span aria-hidden="true">←</span> Article</Link>
      {menu}
      <div className={styles.actions}>
        <button type="button" className={styles.wide} onClick={openPresenter} title="Open speaker notes in a new window (P)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></svg>
          <span>Notes</span>
        </button>
        {canFullscreen && <button type="button" className={styles.wide} onClick={toggleFullscreen} aria-pressed={fullscreen} title="Toggle fullscreen (F)">
          <svg viewBox="0 0 24 24" aria-hidden="true">{fullscreen ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}</svg>
          <span>Fullscreen</span>
        </button>}
        <ThemeToggle />
        {stepper}
      </div>
    </nav>
  </div>;
}

/** Below this, shrinking hurts legibility more than scrolling does. */
const MIN_SCALE = 0.6;

/**
 * Shrinks a live demo that is taller than the slide so it fits without
 * scrolling. A transform keeps pointer math, canvases, and inputs working,
 * and the outer box takes the scaled height so centering still applies.
 * Narrow screens scroll instead.
 */
function FitToSlide({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = outer.current;
    const content = inner.current;
    const frame = box?.parentElement;
    const slide = frame?.parentElement;
    if (!box || !content || !frame || !slide) return;
    const fit = () => {
      const padding = getComputedStyle(frame);
      const available = slide.clientHeight - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom);
      const natural = content.offsetHeight;
      const wide = window.matchMedia('(min-width: 801px)').matches;
      const scale = wide && natural > available ? Math.max(MIN_SCALE, available / natural) : 1;
      content.style.transform = scale < 1 ? `scale(${scale})` : '';
      box.style.height = scale < 1 ? `${Math.ceil(natural * scale)}px` : '';
    };
    const observer = new ResizeObserver(fit);
    observer.observe(slide);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  return <div ref={outer} className={styles.fit}><div ref={inner} className={styles.fitInner}>{children}</div></div>;
}

function PresenterView({ slides, index, title }: { slides: Slide[]; index: number; title: string }) {
  const [started, setStarted] = useState(() => Date.now());
  const [now, setNow] = useState(started);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = Math.max(0, Math.floor((now - started) / 1000));
  const elapsed = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const slide = slides[index];
  const next = slides[index + 1];
  return <div className={styles.presenterBody}>
    <header className={styles.presenterHeader}>
      <span>{title} · speaker notes</span>
      <span className={styles.timer}>
        <time aria-label="Elapsed time">{elapsed}</time>
        <button type="button" onClick={() => { const at = Date.now(); setStarted(at); setNow(at); }}>Reset</button>
      </span>
    </header>
    <p className={styles.presenterCount}>Slide {index + 1} of {slides.length}</p>
    <h1>{slide.title}</h1>
    <div className={styles.notes}>{slide.notes ? slide.notes.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>No notes for this slide.</p>}</div>
    <p className={styles.upNext}>{next ? <>Next: <strong>{next.title}</strong></> : 'Last slide'}</p>
  </div>;
}
