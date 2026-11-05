import { deviceSizes, imageSizes } from './lib/image-sizes.mjs';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static prerender → real HTML for SEO & social cards
  allowedDevOrigins: ['127.0.0.1'], // allow live reload at the shared preview URL
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
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
const withMDX = createMDX({ options: {
  remarkPlugins: ['remark-gfm'],
  rehypePlugins: [['rehype-highlight', { plainText: ['text', 'txt'] }]],
} });
export default withMDX(nextConfig);
