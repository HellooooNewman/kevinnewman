import { deviceSizes, imageSizes } from './lib/image-sizes.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static prerender → real HTML for SEO & social cards
  // No image server in a static export: scripts/optimize-images.mjs
  // pre-renders WebP variants and the loader points srcset at them.
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes,
    imageSizes,
  },
  trailingSlash: true,
};
export default nextConfig;
