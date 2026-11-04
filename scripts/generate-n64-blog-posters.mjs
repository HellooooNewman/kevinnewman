// Rebuild the static/RSS illustrations from the same art and math as the demos.
// Run: npm run blog:posters. Original texture artwork is by BoxingBruin.
import sharp from 'sharp';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { familyDiagrams } from './format-family-diagrams.mjs';
import { makeTextureTestPattern } from '../content/blog/n64-texture-formats/diagnostic-pattern.ts';
import { formats, convertTexture, defaultVertexColors, formatBytes, renderVertexPanels, textureBudget } from '../content/blog/n64-texture-formats/texture-math.ts';
import { bannerAssets, carpetAssets, diagnosticTexture, formatFamilies, revisionPairs, sceneComparisons, vertexTexture } from '../content/blog/n64-texture-formats/figures.ts';

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

const comparison = makeTextureTestPattern();
await writeFile(path.join(root, diagnosticTexture.file), await pixelPng(comparison.pixels, comparison.width, comparison.height, comparison.width, comparison.height));
const formatLayers = [];
let formatSvg = text(24, 32, `One texture. ${formats.length} ways to store it.`);
for (let i = 0; i < formats.length; i++) {
  const format = formats[i];
  const x = 24 + i % 3 * 232, y = 56 + Math.floor(i / 3) * 266;
  formatSvg += `<rect x="${x}" y="${y}" width="216" height="200" rx="6" fill="url(#checker)"/>`;
  formatSvg += text(x, y + 225, format.id);
  const cost = textureBudget(comparison.width, comparison.height, format.id);
  formatSvg += text(x, y + 246, `${format.bits} bits/texel · ${formatBytes(cost.texels + cost.paletteBytes)} packed`, true);
  const converted = convertTexture(comparison.pixels, format.id, comparison.width).pixels;
  formatLayers.push({ input: await pixelPng(converted, comparison.width, comparison.height, 192, 192), left: x + 12, top: y + 4 });
}
const formatFooter = 82 + Math.ceil(formats.length / 3) * 266;
formatSvg += text(24, formatFooter, '64 × 64 test pattern · full CI palettes included · padding and compression excluded', true);
formatSvg += text(24, formatFooter + 22, 'YUV16: opaque BT.601 4:2:2 approximation', true);
await sharp(background(744, formatFooter + 42, formatSvg)).composite(formatLayers).png().toFile(path.join(root, 'format-comparison.png'));

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
vertexSvg += text(24, 344, 'Original main · 64 × 64 I8 · 4 kb · original texture with example vertex colors', true);
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
revisionSvg += text(24, revisionFooter + 5, 'Floor: 50% less texel data. Carpet: same base cost. Unchanged banner omitted.', true);
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

let familiesSvg = text(24, 32, 'What the texture-format letters mean');
const familiesLayers = [];
const familyRowHeight = 492;
for (const [index, family] of formatFamilies.entries()) {
  const x = 24 + index % 2 * 372, y = 64 + Math.floor(index / 2) * familyRowHeight;
  const diagram = familyDiagrams[family.id];
  await writeFile(path.join(root, family.file), diagram);
  familiesSvg += text(x, y, `${family.id} · ${family.name}`);
  familiesSvg += text(x, y + 177, family.description, true);
  familiesLayers.push({ input: await sharp(Buffer.from(diagram)).png().toBuffer(), left: x + 90, top: y + 30 });
  const sample = convertTexture(comparison.pixels, family.sampleFormat, comparison.width).pixels;
  const samplePng = await pixelPng(sample, comparison.width, comparison.height, comparison.width, comparison.height);
  await writeFile(path.join(root, family.sampleFile), samplePng);
  familiesSvg += `<rect x="${x + 106}" y="${y + 200}" width="128" height="128" rx="4" fill="url(#checker)"/>`;
  familiesLayers.push({ input: await pixelPng(sample, comparison.width, comparison.height, 128, 128), left: x + 106, top: y + 200 });
  familiesSvg += text(x + 106, y + 352, `${family.sampleFormat} · ${comparison.width} × ${comparison.height}`, true);
  const size = textureBudget(comparison.width, comparison.height, family.sampleFormat);
  familiesSvg += text(x + 106, y + 374, `${formatBytes(size.texels + size.paletteBytes)} packed`, true);
  if (size.paletteBytes) familiesSvg += text(x + 106, y + 394, `${formatBytes(size.texels)} + ${size.paletteBytes} b palette`, true);
  const lines = family.sampleHint.split(' ').reduce((result, word) => {
    if (result.length && result.at(-1).length + word.length < 44) result[result.length - 1] += ` ${word}`;
    else result.push(word);
    return result;
  }, []);
  lines.forEach((line, i) => { familiesSvg += text(x, y + 422 + i * 18, line, true); });
}
const familiesFooter = 48 + Math.ceil(formatFamilies.length / 2) * familyRowHeight;
familiesSvg += text(24, familiesFooter, 'Top: color gradient · middle: fine magenta/green stripes · bottom: alpha fade', true);
familiesSvg += text(24, familiesFooter + 22, 'Packed sizes include full CI palettes; headers, padding, mipmaps, compression excluded.', true);
await sharp(background(768, familiesFooter + 44, familiesSvg)).composite(familiesLayers).png().toFile(path.join(root, 'format-families.png'));

console.log(`Generated nine static illustrations, ${formatFamilies.length} SVG diagrams, and ${formatFamilies.length} texture samples for the Pandemonium texture article.`);
