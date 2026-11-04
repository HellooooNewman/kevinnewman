import Image from 'next/image';
import { assetRoot } from './figures';
import { formatChoices } from './format-choices';
import { formatBytes, textureBudget } from './texture-math';
import styles from './FormatChoiceGuide.module.css';

export default function FormatChoiceGuide() {
  return <figure id="format-choice-guide" className={styles.guide} aria-label="Choosing a format for the surface">
    <div className={styles.grid}>{formatChoices.map((choice) => <div className={styles.card} key={choice.id}>
      <h3>{choice.title}</h3>
      <div className={styles.samples}>{choice.samples.map((sample) => {
        const cost = textureBudget(sample.width, sample.height, sample.format);
        return <div className={styles.sample} key={sample.file}>
          <div className={styles.image}><Image src={`${assetRoot}/${sample.file}`} alt={sample.alt} fill sizes="(max-width: 700px) 42vw, 220px" unoptimized /></div>
          <strong>{sample.label}</strong>
          <span>{formatBytes(cost.texels + cost.paletteBytes)}{cost.paletteBytes ? ' with palette' : ' texels'}</span>
        </div>;
      })}</div>
      {choice.id === 'color' && <div className={styles.repeatNote}>One 16 × 64 tile, repeated across each preview.</div>}
      {choice.id === 'resolution' && <div className={styles.smallView}>
        <span>Both drawn 12 pixels wide:</span>
        {choice.samples.map((sample) => <Image key={sample.file} src={`${assetRoot}/${sample.file}`} alt={`${sample.width} × ${sample.height} source at a twelve-pixel screen footprint`} width={12} height={12} unoptimized />)}
      </div>}
      <p>{choice.description}</p>
    </div>)}</div>
    <figcaption>Sizes are packed texels, plus a full RGBA16 palette for CI. The glow is generated; the stone and carpet use the game artwork. These are illustrative conversions.</figcaption>
  </figure>;
}
