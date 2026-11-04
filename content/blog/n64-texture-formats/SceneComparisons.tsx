'use client';

import Image from 'next/image';
import { useState, type PointerEvent } from 'react';
import { assetRoot, sceneComparisons } from './figures';
import styles from './figures.module.css';

export default function SceneComparisons() {
  const [selected, setSelected] = useState('carpet');
  const [split, setSplit] = useState(50);
  const scene = sceneComparisons.find((item) => item.id === selected)!;

  function moveDivider(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSplit(Math.round(Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))));
  }

  return <figure id="scene-comparisons" className={styles.figure} aria-label="Room before and after">
    <div className={styles.sceneControls}>
      <fieldset className={styles.choiceGroup}><legend>Room view</legend>
        <div className={styles.choiceButtons}>{sceneComparisons.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => { setSelected(item.id); setSplit(50); }}>{item.label}</button>)}</div>
      </fieldset>
    </div>
    <div className={styles.sceneStage}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.querySelector('input')?.focus({ preventScroll: true });
        moveDivider(event);
      }}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) moveDivider(event); }}
      onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
      <Image src={`${assetRoot}/${scene.after}`} alt={scene.afterAlt} width={960} height={720} sizes="(max-width: 1000px) 100vw, 960px" loading="eager" draggable={false} />
      <Image src={`${assetRoot}/${scene.before}`} alt={scene.beforeAlt} width={960} height={720} sizes="(max-width: 1000px) 100vw, 960px" loading="eager" draggable={false} style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} />
      <div className={styles.sceneLabels} aria-hidden="true"><span>Before</span><span>After</span></div>
      <div className={styles.sceneDivider} style={{ left: `${split}%` }} aria-hidden="true"><span><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 7-5 5 5 5m6-10 5 5-5 5" /></svg></span></div>
      <input className={styles.sceneRange} type="range" min={0} max={100} value={split}
        aria-label={`${scene.title}: before and after reveal`}
        aria-valuetext={`${split}% before, ${100 - split}% after`}
        onChange={(event) => setSplit(Number(event.target.value))} />
    </div>
  </figure>;
}
