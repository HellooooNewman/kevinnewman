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
      {choice.id === 'color' && <div className={styles.repeatNote}>One 16 × 64 tile, repeated and mirrored on X, as in the room.</div>}
      {choice.id === 'resolution' && <div className={styles.smallView}>
        <span>Both reduced to 12 × 12 screen pixels, enlarged 8×:</span>
        <div className={styles.screenSamples}>{choice.samples.map((sample) => <div key={sample.file}>
          <Image src={`${assetRoot}/${sample.file.replace('.png', '-screen.png')}`} alt={`${sample.width} × ${sample.height} source reduced to twelve by twelve pixels, then enlarged eight times for inspection`} width={96} height={96} unoptimized />
          <span>{sample.width} × {sample.height} source</span>
        </div>)}</div>
      </div>}
      <p>{choice.description}</p>
    </div>)}</div>
  </figure>;
}
