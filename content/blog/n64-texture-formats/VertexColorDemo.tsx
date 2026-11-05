'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { assetRoot, vertexTexture } from './figures';
import { defaultVertexColors, renderVertexPanels, type RGB, type VertexColors } from './texture-math';
import { useTextureSource } from './useTextureSource';
import styles from './figures.module.css';

const labels = ['Top left', 'Top right', 'Bottom left', 'Bottom right'];
const panels = ['Texture intensity', 'Vertex colors', 'Texture × vertex colors'];
const hex = (color: RGB) => `#${color.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;

export default function VertexColorDemo() {
  const id = useId();
  const [colors, setColors] = useState<VertexColors>(defaultVertexColors);
  const [mesh, setMesh] = useState(true);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const source = useTextureSource(vertexTexture.file);

  useEffect(() => {
    if (!source) return;
    const size = 256;
    const images = renderVertexPanels(source.pixels, source.width, source.height, colors, size, vertexTexture.format);
    images.forEach((pixels, i) => canvases.current[i]?.getContext('2d')?.putImageData(new ImageData(pixels, size, size), 0, 0));
  }, [source, colors]);

  function changeColor(index: number, value: string) {
    const next = [...colors] as [RGB, RGB, RGB, RGB];
    next[index] = [1, 3, 5].map((offset) => parseInt(value.slice(offset, offset + 2), 16)) as [number, number, number];
    setColors(next);
  }

  return <figure className={styles.figure} aria-labelledby={`${id}-title`}>
    <div className={styles.heading}><strong id={`${id}-title`}>Texture holds the details. Vertices hold color.</strong></div>
    <div className={`${styles.gallery} ${styles.vertexGallery}`}>{panels.map((label, index) => <div className={styles.asset} key={label}>
      <strong>{label}</strong>
      <div className={styles.vertexFrame}>
        <img src={`${assetRoot}/${index === 0 ? vertexTexture.file : index === 1 ? 'vertex-shading.png' : 'floor-vertex-color.png'}`} alt={label} width={256} height={256} hidden={!!source} loading="lazy" />
        <canvas ref={(element) => { canvases.current[index] = element; }} width={256} height={256} role="img" aria-label={`${label}, shown on a quad made of two triangles`} hidden={!source} />
        {mesh && index > 0 && <svg viewBox="0 0 256 256" aria-hidden="true"><path d="M4 4H252V252H4ZM252 4 4 252" />{[[5, 5], [251, 5], [5, 251], [251, 251]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={4} fill={hex(colors[i])} />)}</svg>}
      </div>
      <span>{index === 0 ? 'Original main · 64 × 64 I8 · 4kb' : index === 1 ? 'Four corner colors, smoothly interpolated' : 'Same texture dimensions. More color variation.'}</span>
    </div>)}</div>
    <div className={styles.colorControls}>{labels.map((label, index) => <label key={label} htmlFor={`${id}-${index}`}><input id={`${id}-${index}`} type="color" value={hex(colors[index])} onChange={(event) => changeColor(index, event.target.value)} />{label}</label>)}</div>
    <div className={styles.vertexActions}>
      <button type="button" onClick={() => setColors(defaultVertexColors)}>Reset colors</button>
      <button type="button" onClick={() => setColors([[255,255,255],[255,255,255],[255,255,255],[255,255,255]])}>Make all vertices white</button>
      <label className={styles.alpha}><input type="checkbox" checked={mesh} onChange={(event) => setMesh(event.target.checked)} /> Show triangles</label>
    </div>
  </figure>;
}
