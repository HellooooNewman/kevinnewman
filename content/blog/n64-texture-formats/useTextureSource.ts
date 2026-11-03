'use client';

import { useEffect, useState } from 'react';
import { assetRoot } from './figures';

export function useTextureSource(file: string) {
  const [source, setSource] = useState<{ file: string; pixels: Uint8ClampedArray; width: number; height: number } | null>(null);
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0);
      setSource({ file, pixels: context.getImageData(0, 0, canvas.width, canvas.height).data, width: canvas.width, height: canvas.height });
    };
    image.src = `${assetRoot}/${file}`;
    return () => { cancelled = true; };
  }, [file]);
  return source?.file === file ? source : null;
}
