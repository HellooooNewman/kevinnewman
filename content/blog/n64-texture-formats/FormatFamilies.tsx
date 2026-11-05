import Image from 'next/image';
import { assetRoot, diagnosticTexture, formatFamilies } from './figures';
import { formatBytes, textureBudget } from './texture-math';
import styles from './figures.module.css';

export default function FormatFamilies() {
  return <figure className={styles.familyFigure} aria-label="What the texture-format letters mean">
    <div className={styles.familyGrid}>{formatFamilies.map((family) => {
      const size = textureBudget(diagnosticTexture.width, diagnosticTexture.height, family.sampleFormat);
      return <div key={family.id} className={styles.familyCard}>
        <div className={styles.familyLabel}><strong>{family.id}</strong><span>{family.name}</span></div>
        <Image src={`${assetRoot}/${family.file}`} alt={family.alt} width={160} height={112} unoptimized />
        <p>{family.description}</p>
        <div className={styles.familySample}>
          <div className={styles.familyTextureFrame}><Image className={styles.familyTexture} src={`${assetRoot}/${family.sampleFile}`} alt={`Color gradient, fine stripes, and alpha fade represented as ${family.sampleFormat}`} width={diagnosticTexture.width} height={diagnosticTexture.height} unoptimized /></div>
          <span>{family.sampleFormat} · {diagnosticTexture.width} × {diagnosticTexture.height}</span>
          <span className={styles.familySize} title={`${(size.texels + size.paletteBytes).toLocaleString('en-US')}b`}>{formatBytes(size.texels + size.paletteBytes)} packed</span>
          {size.paletteBytes > 0 && <span className={styles.familyPalette}>{formatBytes(size.texels)} texels + {size.paletteBytes}b palette</span>}
        </div>
        <p className={styles.familyHint}>{family.sampleHint}</p>
      </div>;
    })}</div>
  </figure>;
}
