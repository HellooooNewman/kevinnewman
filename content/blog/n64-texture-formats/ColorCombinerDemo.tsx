'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { combinerRecipes, renderCombiner, type RecipeId } from './combiner-math';
import { useTextureSource } from './useTextureSource';
import { assetRoot } from './figures';
import styles from './ColorCombinerDemo.module.css';

function PixelPanel({ label, pixels, fallback }: { label: string; pixels?: Uint8ClampedArray; fallback: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!pixels) return;
    canvas.current?.getContext('2d')?.putImageData(new ImageData(pixels.slice(), 32, 32), 0, 0);
  }, [pixels]);
  return <div className={styles.panel}><strong>{label}</strong><div className={styles.image}>
    <Image src={`${assetRoot}/${fallback}`} alt={label} fill sizes="(max-width: 700px) 42vw, 220px" unoptimized hidden={!!pixels} />
    <canvas ref={canvas} width={32} height={32} role="img" aria-label={label} hidden={!pixels} />
  </div></div>;
}

export default function ColorCombinerDemo() {
  const id = useId();
  const [selected, setSelected] = useState<RecipeId>('columns');
  const [tint, setTint] = useState('#ffffff');
  const [blend, setBlend] = useState(50);
  const source0 = useTextureSource('combiner-texture0.png');
  const source1 = useTextureSource('combiner-texture1.png');
  const alpha = useTextureSource('combiner-alpha.png');
  const shade = useTextureSource('combiner-shade.png');
  const recipe = combinerRecipes.find((entry) => entry.id === selected)!;
  const rgb = [1, 3, 5].map((offset) => parseInt(tint.slice(offset, offset + 2), 16));
  const texture0 = selected === 'alpha' ? alpha : source0;
  const preview = texture0 && source1 && shade ? renderCombiner(selected, texture0.pixels, source1.pixels, shade.pixels, 32, rgb, blend / 100) : null;
  const names: Record<string, string> = { TEX0: 'Texture 0', TEX1: 'Texture 1', SHADE: 'Shade', PRIM: 'Primitive', PRIM_ALPHA: 'Primitive alpha', COMBINED: 'Combined' };
  const sourceName = (name: string) => names[name] ?? name;
  const formula = (slots: readonly string[]) => `(${sourceName(slots[0])} − ${sourceName(slots[1])}) × ${sourceName(slots[2])} + ${sourceName(slots[3])}`;
  const twoCycles = recipe.cycles.length === 2;
  const slots = recipe.cycles.flatMap((cycle) => [...cycle.rgb, ...cycle.alpha]);
  const textureCount = new Set(slots.filter((slot) => slot === 'TEX0' || slot === 'TEX1')).size;
  const usesTextureAlpha = recipe.cycles.some((cycle) => cycle.alpha.includes('TEX0'));
  const settings = [
    { label: 'Cycles', value: String(recipe.cycles.length), detail: twoCycles ? 'Two-cycle mode' : 'One-cycle mode' },
    { label: 'Textures', value: String(textureCount), detail: `${selected === 'alpha' ? 'IA8' : 'I4'} · 32 × 32${textureCount > 1 ? ' each' : ''}` },
    { label: 'Vertex shade', value: slots.includes('SHADE') ? 'Used' : 'Unused', detail: slots.includes('SHADE') ? 'Interpolated vertex colors' : 'Ignored by this recipe' },
    { label: 'Primitive', value: slots.includes('PRIM_ALPHA') ? 'Blend amount' : slots.includes('PRIM') ? 'Color tint' : 'Unused', detail: slots.includes('PRIM_ALPHA') ? `${blend}% toward Texture 1` : slots.includes('PRIM') ? tint.toUpperCase() : 'Not selected' },
    { label: 'Output alpha', value: usesTextureAlpha ? 'Texture 0' : 'Opaque', detail: usesTextureAlpha ? 'Independent IA8 alpha' : 'Forced to 1' },
    { label: 'Preview blending', value: usesTextureAlpha ? 'Source alpha' : 'Off', detail: usesTextureAlpha ? 'Applied after the combiner' : 'Opaque surface' },
  ];
  return <figure id="color-combiner" className={styles.figure} aria-label="How the N64 color combiner mixes a material">
    <div className={styles.controls} role="group" aria-label="Combiner recipe">{combinerRecipes.map((entry) => <button type="button" key={entry.id} aria-pressed={entry.id === selected} onClick={() => { setSelected(entry.id); setTint(entry.id === 'alpha' ? '#e7ac63' : '#ffffff'); }}>{entry.label}</button>)}</div>
    <dl className={styles.settings} aria-label="Material settings">{settings.map((setting) => <div key={setting.label}>
      <dt>{setting.label}</dt>
      <dd><strong>{setting.value}</strong><span>{setting.detail}</span></dd>
    </div>)}</dl>
    <p className={styles.summary}>{recipe.summary}</p>
    <div className={styles.inputs}>
      {(selected === 'columns' || selected === 'alpha') && <label htmlFor={`${id}-tint`}>Primitive color <input id={`${id}-tint`} type="color" value={tint} onChange={(event) => setTint(event.target.value)} /></label>}
      {selected === 'lerp' && <label htmlFor={`${id}-blend`}>Texture 0 ← {blend}% → Texture 1<input id={`${id}-blend`} type="range" min={0} max={100} value={blend} onChange={(event) => setBlend(Number(event.target.value))} /></label>}
    </div>
    <div className={styles.cycles}>{recipe.cycles.map((cycle, index) => <div className={styles.cycle} key={`${selected}-${index}`}>
      <strong>Cycle {index + 1}{twoCycles ? '' : ' · final'}</strong>
      <div><span>RGB</span><code>{formula(cycle.rgb)}</code></div>
      <div><span>Alpha</span><code>{formula(cycle.alpha)}</code></div>
      <p>{cycle.explanation}</p>
    </div>)}</div>
    <div className={styles.panels} style={{ gridTemplateColumns: `repeat(${twoCycles ? 4 : 2}, minmax(0, 1fr))` }}>
      <PixelPanel label={selected === 'alpha' ? 'Texture 0 · IA8' : 'Texture 0 · I4'} pixels={texture0?.pixels} fallback={selected === 'alpha' ? 'combiner-alpha.png' : 'combiner-texture0.png'} />
      {selected === 'columns' && <PixelPanel label="Shade · vertex colors" pixels={shade?.pixels} fallback="combiner-shade.png" />}
      {selected === 'lerp' && <PixelPanel label="Texture 1 · I4" pixels={source1?.pixels} fallback="combiner-texture1.png" />}
      {twoCycles && <PixelPanel label="After cycle 1" pixels={preview?.stages[0]} fallback="combiner-cycle1.png" />}
      <PixelPanel label="Final result" pixels={preview?.stages.at(-1)} fallback="combiner-result.png" />
    </div>
    <figcaption>Flat-patch illustrations of the combiner math. The first recipe follows the column material in Fast64. This preview does not emulate RDP fixed-point precision, filtering, or fog.</figcaption>
  </figure>;
}
