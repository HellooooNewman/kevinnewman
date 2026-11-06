'use client';

import { useState } from 'react';
import { assetRoot } from '../figures';
import { formatBytes, formats, textureBudget, type FormatId } from '../texture-math';
import styles from './slides.module.css';

// YUV16 needs a dedicated render mode, so it stays out of this simple budget view.
const choices = formats.filter((format) => format.id !== 'YUV16');
const sizes = [[16, 16], [32, 32], [32, 64], [64, 64], [64, 128], [128, 128]] as const;
const TMEM = 4096;

export default function TmemFit() {
  const [format, setFormat] = useState<FormatId>('RGBA16');
  const [sizeIndex, setSizeIndex] = useState(3);
  const [width, height] = sizes[sizeIndex];
  const spec = formats.find((entry) => entry.id === format)!;
  const budget = textureBudget(width, height, format);
  const rowBytes = width * spec.bits / 8;
  const rowsPerSection = Math.max(1, Math.floor(budget.capacity / rowBytes));
  const sections = Math.ceil(height / rowsPerSection);
  const indexed = budget.paletteBytes > 0;
  const used = Math.min(budget.texels, budget.capacity);
  // Draw every size on one texel scale so 16 × 16 and 128 × 128 compare honestly.
  const scale = `calc(var(--tmem-texture) / 128)`;

  return <div className={styles.tmem}>
    <div className={styles.tmemControls}>
      <fieldset>
        <legend>Format</legend>
        <div className={styles.chips}>{choices.map((entry) => <button key={entry.id} type="button" aria-pressed={format === entry.id} onClick={() => setFormat(entry.id)}>
          {entry.id}<span>{entry.bits}-bit</span>
        </button>)}</div>
      </fieldset>
      <fieldset>
        <legend>Texture size</legend>
        <div className={styles.chips}>{sizes.map(([w, h], i) => <button key={`${w}x${h}`} type="button" aria-pressed={sizeIndex === i} onClick={() => setSizeIndex(i)}>{w} × {h}</button>)}</div>
      </fieldset>
    </div>

    <div className={styles.tmemBody}>
      <div className={styles.tmemMemory} role="img" aria-label={`TMEM: ${formatBytes(used)} of ${formatBytes(budget.capacity)} available for texels${indexed ? ', with the palette in the upper half' : ''}`}>
        <span className={styles.tmemLabel}>TMEM · 4kb</span>
        <div className={styles.tmemBank}>
          {indexed && <div className={styles.tmemPalette} style={{ flexBasis: `${(TMEM - budget.capacity) / TMEM * 100}%` }}>
            <span>Palette half</span>
            <div style={{ width: `${budget.paletteBytes / (TMEM - budget.capacity) * 100}%` }} />
            <small>{budget.paletteBytes}b used</small>
          </div>}
          <div className={styles.tmemTexels} style={{ flexBasis: `${budget.capacity / TMEM * 100}%` }}>
            <div style={{ height: `${used / budget.capacity * 100}%` }} data-full={budget.texels >= budget.capacity} />
            <span>{formatBytes(used)} / {formatBytes(budget.capacity)}</span>
          </div>
        </div>
      </div>

      <div className={styles.tmemTexture}>
        <div className={styles.tmemCanvas} style={{ width: `calc(${scale} * ${width})`, height: `calc(${scale} * ${height})`, backgroundImage: `url(${assetRoot}/updated/floor6.i4.png)`, backgroundSize: `calc(${scale} * 64) calc(${scale} * 64)` }}>
          {sections > 1 && Array.from({ length: sections }, (_, i) => <div key={i} className={styles.tmemSection}
            style={{ top: `${i * rowsPerSection / height * 100}%`, height: `${Math.min(rowsPerSection, height - i * rowsPerSection) / height * 100}%` }}>
            <span>{i + 1}</span>
          </div>)}
        </div>
      </div>

      <div className={styles.tmemVerdict} aria-live="polite">
        <strong data-fits={budget.fits}>{budget.fits ? 'Fits in one load' : `${sections} sections`}</strong>
        <p>{width} × {height} {format} = <b>{formatBytes(budget.texels)}</b> of texels{indexed ? <> + <b>{budget.paletteBytes}b</b> palette</> : null}.</p>
        <p>{budget.fits
          ? `${Math.round(budget.texels / budget.capacity * 100)}% of the space available for texels.`
          : `Only ${rowsPerSection} rows fit at once, so the texture is drawn in sections, loading new texels between draws.`}</p>
        {indexed && <p className={styles.dim}>CI formats keep the palette in TMEM’s upper half, leaving 2kb for texels.</p>}
      </div>
    </div>
    <p className={styles.footnote}>Illustrative. Ignores row padding, mipmaps, and materials that load two textures at once.</p>
  </div>;
}
