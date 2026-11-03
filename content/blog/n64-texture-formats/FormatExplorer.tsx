'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { assetRoot, formatSamples } from './figures';
import { convertTexture, formats, formatBytes, textureBudget, type FormatId } from './texture-math';
import { useTextureSource } from './useTextureSource';
import styles from './figures.module.css';

export default function FormatExplorer() {
  const id = useId();
  const [sampleId, setSampleId] = useState('carpet');
  const [format, setFormat] = useState<FormatId>('CI8');
  const canvas = useRef<HTMLCanvasElement>(null);
  const sample = formatSamples.find((s) => s.id === sampleId)!;
  const spec = formats.find((f) => f.id === format)!;
  const source = useTextureSource(sample.file);
  const converted = useMemo(() => source ? convertTexture(source.pixels, format) : null, [source, format]);
  const budget = textureBudget(sample.width, sample.height, format);
  const reference = textureBudget(64, 64, format);

  useEffect(() => {
    if (!converted || !canvas.current) return;
    const context = canvas.current.getContext('2d');
    if (!context) return;
    const pixels = converted.pixels.slice();
    context.putImageData(new ImageData(pixels, sample.width, sample.height), 0, 0);
  }, [converted, sample]);

  return <figure className={styles.figure} aria-labelledby={`${id}-title`}>
    <div className={styles.heading}><strong id={`${id}-title`}>What does each format keep?</strong></div>
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <fieldset className={styles.choiceGroup}><legend>Source artwork</legend>
          <div className={styles.choiceButtons}>{formatSamples.map((s) => <button key={s.id} type="button" aria-pressed={sampleId === s.id} onClick={() => setSampleId(s.id)}>{s.buttonLabel}</button>)}</div>
        </fieldset>
        <label htmlFor={`${id}-format`}>Compare as<select id={`${id}-format`} value={format} onChange={(event) => setFormat(event.target.value as FormatId)}>{formats.map((f) => <option key={f.id} value={f.id}>{f.id} · {f.bits} bits / texel</option>)}</select></label>
      </div>
      <div className={styles.previews}>
        <div><strong>Original PNG · {sample.width} × {sample.height}</strong><div className={styles.checker}><img src={`${assetRoot}/${sample.file}`} width={sample.width} height={sample.height} alt={`${sample.label} texture`} /></div></div>
        <div><strong>{format} · {spec.label}</strong><div className={styles.checker}>
          <img src={`${assetRoot}/${sample.file}`} width={sample.width} height={sample.height} alt="Original texture; enable JavaScript for the format comparison" hidden={!!converted} />
          <canvas ref={canvas} width={sample.width} height={sample.height} role="img" aria-label={`${sample.label} converted to ${format}, using texel alpha`} hidden={!converted} />
        </div></div>
      </div>
      <div className={styles.stats} aria-live="polite" aria-atomic="true">
        <div><span>Bits per texel</span><strong>{spec.bits}</strong></div>
        <div><span>This image’s texels</span><strong>{formatBytes(budget.texels)}</strong></div>
        <div><span>Palette payload</span><strong>{budget.paletteBytes ? `${budget.paletteBytes} B maximum` : 'None'}</strong></div>
      </div>
      <p className={styles.explanation}>{spec.detail}</p>
      {converted && converted.palette.length > 0 && <div className={styles.swatches} aria-label={`Generated palette with ${converted.palette.length} entries`}>{converted.palette.map((color, i) => <span key={i} title={`RGBA ${color.join(', ')}`} style={{ backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},${color[3] / 255})` }} />)}</div>}
      <p className={styles.budget}>At 64 × 64, {format} needs <strong>{formatBytes(reference.texels)}</strong> of texel data: {reference.fits ? 'it fits' : 'it exceeds'} the <strong>{formatBytes(reference.capacity)}</strong> available for texels{budget.paletteBytes ? ' when the upper 2 KiB of TMEM is reserved for palette lookup' : ' in TMEM'}. This comparison assumes one tile, with no mipmaps or other resident textures.</p>
    </div>
    <figcaption>Illustrative conversions with texel alpha applied. CI uses generated RGBA16 palettes; filtering, lighting, and blending can change the result on hardware.</figcaption>
  </figure>;
}
