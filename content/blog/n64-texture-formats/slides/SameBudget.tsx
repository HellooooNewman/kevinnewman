'use client';

import { useEffect, useRef } from 'react';
import { vertexTexture } from '../figures';
import { convertTexture, defaultVertexColors, renderVertexPanels } from '../texture-math';
import { useTextureSource } from '../useTextureSource';
import styles from './slides.module.css';

/** Average 2 × 2 blocks: the colored floor baked down to a 32 × 32 texture. */
function halve(pixels: Uint8ClampedArray, size: number) {
  const half = size / 2;
  const output = new Uint8ClampedArray(half * half * 4);
  for (let y = 0; y < half; y++) for (let x = 0; x < half; x++) for (let channel = 0; channel < 4; channel++) {
    let sum = 0;
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) sum += pixels[((y * 2 + dy) * size + x * 2 + dx) * 4 + channel];
    output[(y * half + x) * 4 + channel] = Math.round(sum / 4);
  }
  return output;
}

export default function SameBudget() {
  const source = useTextureSource(vertexTexture.file);
  const baked = useRef<HTMLCanvasElement>(null);
  const tinted = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!source) return;
    const { width, height, pixels } = source;
    const [, , detail] = renderVertexPanels(pixels, width, height, defaultVertexColors, 64, 'I4');
    const [, , full] = renderVertexPanels(pixels, width, height, defaultVertexColors, 64, 'I8');
    const small = convertTexture(halve(full, 64), 'RGBA16', 32).pixels;
    baked.current?.getContext('2d')?.putImageData(new ImageData(small.slice(), 32, 32), 0, 0);
    tinted.current?.getContext('2d')?.putImageData(new ImageData(detail.slice(), 64, 64), 0, 0);
  }, [source]);

  return <div className={styles.budgetPair}>
    <figure>
      <div className={styles.pixelFrame}>
        <canvas ref={baked} width={32} height={32} role="img" aria-label="The colored floor baked into a 32 by 32 RGBA16 texture" />
      </div>
      <figcaption><strong>RGBA16 · 32 × 32</strong><span>Color baked into the texture</span><span>1,024 texels · 2kb</span></figcaption>
    </figure>
    <span className={styles.versus} aria-hidden="true">vs</span>
    <figure>
      <div className={styles.pixelFrame}>
        <canvas ref={tinted} width={64} height={64} role="img" aria-label="The same floor as a 64 by 64 I4 texture multiplied by four vertex colors" />
      </div>
      <figcaption><strong>I4 · 64 × 64 × vertex color</strong><span>Color from four vertices</span><span>4,096 texels · 2kb</span></figcaption>
    </figure>
  </div>;
}
