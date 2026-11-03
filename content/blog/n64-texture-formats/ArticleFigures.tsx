import { assetRoot, bannerAssets, carpetAssets } from './figures';
import { formatBytes } from './texture-math';
import styles from './figures.module.css';

export function BannerGallery() {
  return <figure className={styles.figure}>
    <div className={styles.heading}>Original cloth and the local revision’s additional layers</div>
    <div className={styles.gallery}>{bannerAssets.map((asset) => <div className={styles.asset} key={asset.file}>
      <div className={styles.checker}><img src={`${assetRoot}/${asset.file}`} alt={`${asset.label}, an ${asset.format} source texture`} width={asset.width} height={asset.height} loading="lazy" /></div>
      <strong>{asset.label}</strong><span>{asset.format} · {asset.width} × {asset.height}</span><span>{formatBytes(asset.bytes)} of texels</span>
    </div>)}</div>
    <figcaption>Original IA8 cloth beside the local version’s additional background and ornament. Sizes count packed texels.</figcaption>
  </figure>;
}

export function MipmapGallery() {
  return <figure className={styles.figure}>
    <div className={styles.heading}>The local revision’s carpet mip images</div>
    <div className={styles.gallery}>{carpetAssets.map((asset) => <div className={styles.asset} key={asset.file}>
      <div className={styles.checker}><img src={`${assetRoot}/${asset.file}`} alt={`${asset.label} of the carpet border, ${asset.width} by ${asset.height} pixels`} width={asset.width} height={asset.height} loading="lazy" /></div>
      <strong>{asset.label}</strong><span>CI8 · {asset.width} × {asset.height}</span><span>{formatBytes(asset.bytes)} of texels</span>
    </div>)}</div>
    <figcaption>The local carpet and two smaller mip images, enlarged for comparison. Palettes and TMEM row padding are additional.</figcaption>
  </figure>;
}
