'use client';

import { useId, useState } from 'react';
import { assetRoot, revisionPairs } from './figures';
import { formatBytes } from './texture-math';
import styles from './figures.module.css';

export default function TextureRevisionComparison() {
  const id = useId();
  const [selected, setSelected] = useState('floor');
  const [split, setSplit] = useState(50);
  const pair = revisionPairs.find((p) => p.id === selected)!;
  return <figure className={styles.figure} aria-labelledby={`${id}-title`}>
    <div className={styles.heading}><strong id={`${id}-title`}>Original main → updated local assets</strong></div>
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <fieldset className={styles.choiceGroup}><legend>Compare texture</legend>
          <div className={styles.choiceButtons}>{revisionPairs.map((p) => <button key={p.id} type="button" aria-pressed={selected === p.id} onClick={() => setSelected(p.id)}>{p.label}</button>)}</div>
        </fieldset>
      </div>
      <div className={styles.revisionStage}>
        <img src={`${assetRoot}/${pair.updated.file}`} alt={`Updated local ${pair.label.toLowerCase()} source artwork`} width={pair.updated.width} height={pair.updated.height} />
        <img src={`${assetRoot}/${pair.original.file}`} alt={`Original main-branch ${pair.label.toLowerCase()} source artwork`} width={pair.original.width} height={pair.original.height} style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} />
        <div className={styles.revisionLabels} aria-hidden="true"><span>Original main</span><span>Updated local</span></div>
        <div className={styles.revisionDivider} style={{ left: `${split}%` }} aria-hidden="true" />
      </div>
      <label className={styles.splitLabel} htmlFor={`${id}-split`}>Comparison split <output htmlFor={`${id}-split`}>{split}% original</output></label>
      <input className={styles.splitSlider} id={`${id}-split`} type="range" min={0} max={100} value={split} onChange={(event) => setSplit(Number(event.target.value))} />
      <div className={styles.previews}>{[{ label: 'Original main', texture: pair.original }, { label: 'Updated local', texture: pair.updated }].map(({ label, texture }) =>
        <div key={label} className={styles.revisionDetails}><strong>{label}</strong><span>{texture.width} × {texture.height} · {texture.format} · {formatBytes(texture.bytes)} of texels</span></div>
      )}</div>
      <p className={styles.budget} aria-live="polite">{pair.result}</p>
    </div>
    <figcaption>Source PNGs shown at the same display scale. Main is pinned to commit d657844. Updated images are snapshots from the local working version. The floor artwork and format both change. Palette storage, row padding, filtering, lighting, and frame timing are outside this source-image comparison.</figcaption>
  </figure>;
}
