'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { formatBytes } from '@/lib/format-bytes.mjs';
import type { ModelStats, TextureReference, ViewerHandle, ViewerOptions, ViewMode } from './types';
import styles from './ModelViewer.module.css';

type Props = ViewerOptions & {
  id?: string;
  title: string;
  poster: string;
  posterAlt: string;
  caption?: string;
  textures?: readonly TextureReference[];
  stats?: ModelStats;
};

export default function ModelViewer({ id, src, rendering, title, poster, posterAlt, caption, textures = [], stats }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ViewMode>('combined');
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<ViewerHandle | null>(null);
  const instructions = useId();
  useEffect(() => {
    if (!attempt || !canvas.current) return;
    const controller = new AbortController();
    const element = canvas.current;
    let viewer: ViewerHandle | undefined;
    const lost = () => {
      setError('The 3D view was interrupted. Reload it to continue.');
      setStatus('error');
    };
    // Neither Three.js nor the model is fetched until the reader opens the view.
    import('./engine').then(({ createViewer }) => {
      controller.signal.throwIfAborted();
      return createViewer(element, { src, rendering }, controller.signal, lost);
    }).then((result) => {
      viewer = result;
      if (controller.signal.aborted) { result.dispose(); return; }
      engine.current = result;
      setStatus('ready');
      element.focus({ preventScroll: true });
    }).catch((reason: unknown) => {
      if (controller.signal.aborted) return;
      setError(reason instanceof Error ? reason.message : 'The 3D view could not load.');
      setStatus('error');
    });
    return () => { controller.abort(); viewer?.dispose(); engine.current = null; };
  }, [attempt, src, rendering]);

  const start = () => { setStatus('loading'); setError(''); setMode('combined'); setAttempt((value) => value + 1); };
  const modes: [ViewMode, string][] = rendering === 'n64'
    ? [['combined', 'Combined'], ['texture', 'Texture'], ['vertices', 'Vertex colors'], ['wireframe', 'Wireframe']]
    : [['combined', 'Model'], ['wireframe', 'Wireframe']];
  return <figure id={id} className={styles.viewer} aria-label={title}>
    <div className={styles.heading}><strong>{title}</strong></div>
    {textures.length > 0 && <div className={styles.textureReferences} role="group" aria-label="Textures used by this model">{textures.map((texture) => <div className={styles.textureReference} key={texture.src}>
      <strong>{texture.label}</strong>
      <div className={styles.textureImage}><Image src={texture.src} alt={texture.alt} fill sizes="(max-width: 500px) 28vw, 300px" unoptimized /></div>
      <span>{texture.width} × {texture.height} · {texture.format}</span>
      <span>{formatBytes(texture.texelBytes)} texels</span>
    </div>)}</div>}
    <div className={styles.stage}>
      <Image className={styles.poster} src={poster} alt={posterAlt} fill sizes="(max-width: 1000px) 100vw, 960px" />
      {attempt > 0 && <canvas key={`${src}:${rendering}:${attempt}`} ref={canvas} className={styles.canvas} data-ready={status === 'ready'} role="img" aria-label={`${title}, interactive 3D model`} aria-describedby={instructions} tabIndex={status === 'ready' ? 0 : -1}
        onPointerDown={(event) => { if (status === 'ready') event.currentTarget.focus({ preventScroll: true }); }}
        onKeyDown={(event) => {
          if (status !== 'ready' || event.ctrlKey || event.metaKey || event.altKey) return;
          const panKeys: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1], a: [-1, 0], d: [1, 0], w: [0, 1], s: [0, -1] };
          const direction = panKeys[event.key] ?? panKeys[event.key.toLowerCase()];
          if (direction) { event.preventDefault(); engine.current?.pan(...direction); }
          if (event.key === '+' || event.key === '=') { event.preventDefault(); engine.current?.zoom(0.8); }
          if (event.key === '-') { event.preventDefault(); engine.current?.zoom(1.25); }
          if (event.key.toLowerCase() === 'r') engine.current?.reset();
        }} />}
      {status !== 'ready' && <div className={styles.overlay}>
        {status === 'error' && <p role="alert">{error}</p>}
        <button type="button" disabled={status === 'loading'} onClick={start}>{status === 'loading' ? 'Loading 3D…' : status === 'error' ? 'Retry 3D view' : 'Explore in 3D'}</button>
      </div>}
      {stats && <div className={styles.stats} aria-label="Model statistics" title={`${stats.textureCount} textures; ${stats.textureBytes.toLocaleString('en-US')} b of packed texels, excluding headers, padding, and compression.`}>
        <strong>{stats.triangles.toLocaleString('en-US')} tris</strong>
        <span>{stats.textureCount} textures · {formatBytes(stats.textureBytes)} texels</span>
      </div>}
    </div>
    <div className={styles.controls}>
      <div className={styles.buttons} role="group" aria-label="Model display">{modes.map(([value, label]) => <button type="button" key={value} disabled={status !== 'ready'} aria-pressed={mode === value} onClick={() => { setMode(value); engine.current?.setMode(value); }}>{label}</button>)}</div>
      <div className={styles.buttons} role="group" aria-label="Camera controls">
        <button type="button" disabled={status !== 'ready'} onClick={() => engine.current?.zoom(0.8)}>Zoom in</button>
        <button type="button" disabled={status !== 'ready'} onClick={() => engine.current?.zoom(1.25)}>Zoom out</button>
        <button type="button" disabled={status !== 'ready'} onClick={() => engine.current?.reset()}>Reset view</button>
      </div>
      <p id={instructions}>Left drag to orbit · right drag or WASD / arrow keys to pan · pinch, scroll, or + / − to zoom · R to reset</p>
      <span className={styles.srOnly} role="status" aria-live="polite">{status === 'ready' ? '3D model ready.' : status === 'loading' ? 'Loading 3D model.' : ''}</span>
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
