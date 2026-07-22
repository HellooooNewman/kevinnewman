/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static prerender → real HTML for SEO & social cards
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
