import type { ImageLoaderProps } from "next/image";

// A static export has no image server, so next/image points each srcset
// width at a WebP that scripts/optimize-images.mjs pre-rendered into
// public/_img/ (e.g. /assets/a.jpg at 640w -> /_img/assets/a.jpg.640.webp).
export default function imageLoader({ src, width }: ImageLoaderProps) {
  // SVGs and remote URLs have no variants; pass them through untouched
  // (better: mark those <Image>s `unoptimized`)
  if (!/^\/[^?#]+\.(jpe?g|png)$/i.test(src)) return src;
  return `/_img${src}.${width}.webp`;
}
