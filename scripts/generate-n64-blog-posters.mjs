// Rebuild the static/RSS illustrations from the same art and math as the demos.
// Run: npm run blog:posters. Original texture artwork is by BoxingBruin.
import sharp from 'sharp';
import path from 'node:path';
import { formats, convertTexture, defaultVertexColors, formatBytes, renderVertexPanels, textureBudget } from '../content/blog/n64-texture-formats/texture-math.ts';
import { bannerAssets, carpetAssets, formatSamples, revisionPairs, sceneComparisons, vertexTexture } from '../content/blog/n64-texture-formats/figures.ts';

const root = path.resolve(import.meta.dirname, '../public/assets/blog/pandemonium');
const escape = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const text = (x, y, value, small = false) => `<text x="${x}" y="${y}" fill="${small ? '#aab5ce' : '#edf1fa'}" font-family="Arial, sans-serif" font-size="${small ? 13 : 17}" font-weight="${small ? 400 : 600}">${escape(value)}</text>`;

function background(width, height, content) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#141a2e"/><path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#232c4a"/></pattern></defs><rect width="100%" height="100%" fill="#111627"/>${content}</svg>`);
}

async function load(file) {
  const { data, info } = await sharp(path.join(root, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { pixels: new Uint8ClampedArray(data), width: info.width, height: info.height };
}

async function pixelPng(pixels, width, height, displayWidth, displayHeight) {
  return sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } }).resize(displayWidth, displayHeight, { kernel: 'nearest' }).png().toBuffer();
}

const carpet = await load(formatSamples[0].file);
const formatLayers = [];
let formatSvg = text(24, 32, 'One texture. Nine ways to store it.');
for (let i = 0; i < formats.length; i++) {
  const format = formats[i];
  const x = 24 + i % 3 * 232, y = 56 + Math.floor(i / 3) * 266;
  formatSvg += `<rect x="${x}" y="${y}" width="216" height="200" rx="6" fill="url(#checker)"/>`;
  formatSvg += text(x, y + 225, format.id);
  formatSvg += text(x, y + 246, `${format.bits} bits/texel · ${formatBytes(textureBudget(carpet.width, carpet.height, format.id).texels)}`, true);
  const converted = convertTexture(carpet.pixels, format.id).pixels;
  formatLayers.push({ input: await pixelPng(converted, carpet.width, carpet.height, 48, 192), left: x + 84, top: y + 4 });
}
formatSvg += text(24, 880, 'Illustrative conversions · palette payload is additional', true);
await sharp(background(744, 900, formatSvg)).composite(formatLayers).png().toFile(path.join(root, 'format-comparison.png'));

const floor = await load(vertexTexture.file);
const vertexImages = renderVertexPanels(floor.pixels, floor.width, floor.height, defaultVertexColors, 256, vertexTexture.format);
const vertexNames = ['Texture intensity', 'Vertex colors', 'Texture × vertex colors'];
let vertexSvg = text(24, 32, 'Detail in the texture. Color in the vertices.');
const vertexLayers = [];
for (let i = 0; i < 3; i++) {
  const png = await pixelPng(vertexImages[i], 256, 256, 224, 224);
  vertexLayers.push({ input: png, left: 24 + i * 248, top: 56 });
  vertexSvg += text(24 + i * 248, 310, vertexNames[i]);
  if (i > 0) await sharp(await pixelPng(vertexImages[i], 256, 256, 256, 256)).png().toFile(path.join(root, i === 1 ? 'vertex-shading.png' : 'floor-vertex-color.png'));
}
vertexSvg += text(24, 344, 'Original main · 64 × 64 I8 · 4 KiB · original texture with example vertex colors', true);
await sharp(background(768, 366, vertexSvg)).composite(vertexLayers).png().toFile(path.join(root, 'vertex-color-comparison.png'));

async function gallery(name, title, files) {
  let svg = text(24, 32, title);
  const layers = [];
  for (let i = 0; i < files.length; i++) {
    const [file, label, format] = files[i];
    const image = await load(file);
    const x = 24 + i * 248;
    svg += `<rect x="${x}" y="56" width="224" height="256" rx="6" fill="url(#checker)"/>`;
    svg += text(x, 342, label);
    svg += text(x, 366, `${format} · ${image.width} × ${image.height} · ${formatBytes(textureBudget(image.width, image.height, format).texels)}`, true);
    const scale = Math.min(208 / image.width, 240 / image.height);
    const width = Math.round(image.width * scale), height = Math.round(image.height * scale);
    layers.push({ input: await pixelPng(image.pixels, image.width, image.height, width, height), left: x + Math.floor((224 - width) / 2), top: 56 + Math.floor((256 - height) / 2) });
  }
  svg += text(24, 408, 'Packed texel sizes · palettes and padding are additional', true);
  await sharp(background(768, 430, svg)).composite(layers).png().toFile(path.join(root, name));
}

await gallery('banner-formats.png', 'Original cloth and additional local layers', bannerAssets.map((asset, i) => [asset.file, ['Original cloth', 'Local background', 'Local ornament'][i], asset.format]));
await gallery('carpet-mipmaps.png', 'The local revision’s carpet mip images', carpetAssets.map((asset) => [asset.file, asset.label, 'CI8']));

let revisionSvg = text(24, 32, 'Original main → updated local textures');
const revisionLayers = [];
for (let row = 0; row < revisionPairs.length; row++) {
  const pair = revisionPairs[row];
  const top = 60 + row * 300;
  revisionSvg += text(24, top, pair.label);
  for (const [column, asset] of [pair.original, pair.updated].entries()) {
    const x = 24 + column * 372;
    revisionSvg += `<rect x="${x}" y="${top + 12}" width="348" height="208" rx="6" fill="url(#checker)"/>`;
    revisionSvg += text(x, top + 246, `${column === 0 ? 'Original main' : 'Updated local'} · ${asset.format}`);
    revisionSvg += text(x, top + 268, `${asset.width} × ${asset.height} · ${formatBytes(asset.bytes)} of texels`, true);
    const image = await load(asset.file);
    const scale = Math.min(332 / image.width, 192 / image.height);
    const width = Math.round(image.width * scale), height = Math.round(image.height * scale);
    revisionLayers.push({ input: await pixelPng(image.pixels, image.width, image.height, width, height), left: x + Math.floor((348 - width) / 2), top: top + 12 + Math.floor((208 - height) / 2) });
  }
}
const revisionFooter = 60 + revisionPairs.length * 300;
revisionSvg += text(24, revisionFooter + 5, 'Floor: 50% fewer texel bytes. Carpet: same base cost. Unchanged banner omitted.', true);
revisionSvg += text(24, revisionFooter + 28, 'Main d657844 · palettes, row padding, and local mip images excluded', true);
await sharp(background(768, revisionFooter + 50, revisionSvg)).composite(revisionLayers).png().toFile(path.join(root, 'texture-revisions.png'));

let sceneSvg = text(24, 32, 'Pandemonium: the room before and after');
const sceneLayers = [];
for (const [row, scene] of sceneComparisons.entries()) {
  const top = 68 + row * 328;
  sceneSvg += text(24, top, scene.title);
  sceneSvg += text(24, top + 26, 'Before', true) + text(396, top + 26, 'After', true);
  for (const [column, file] of [scene.before, scene.after].entries()) {
    sceneLayers.push({ input: await sharp(path.join(root, file)).resize(348, 261).toBuffer(), left: 24 + column * 372, top: top + 40 });
  }
}
sceneSvg += text(24, 1064, 'Supplied screenshots · camera, geometry, and lighting also differ', true);
await sharp(background(768, 1090, sceneSvg)).composite(sceneLayers).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(root, 'scene-comparisons.jpg'));

console.log('Generated eight static illustrations for the Pandemonium texture article.');
