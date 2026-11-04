// Extract reference textures and model statistics from the website's GLB snapshot.
// Never reads or edits the game checkout. Run: npm run blog:model-assets
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { formatBytes } from '../lib/format-bytes.mjs';

const root = new URL('../public/assets/blog/pandemonium/models/', import.meta.url);
const model = await readFile(new URL('columns.glb', root));
const jsonLength = model.readUInt32LE(12);
const gltf = JSON.parse(model.toString('utf8', 20, 20 + jsonLength));
const binStart = 28 + jsonLength;
const labels = ['Shaft', 'Base', 'Transition'];
const textures = [];
for (const [index, texture] of gltf.textures.entries()) {
  const image = gltf.images[texture.source];
  const view = gltf.bufferViews[image.bufferView];
  const source = model.subarray(binStart + (view.byteOffset ?? 0), binStart + (view.byteOffset ?? 0) + view.byteLength);
  const format = gltf.samplers[texture.sampler].extensions.FAST64_sampler_n64.format;
  if (format.texture !== 'I' || ![4, 8].includes(format.size)) throw new Error('Expected an I4 or I8 column texture.');
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const levels = (1 << format.size) - 1;
  // Match the model shader: quantize intensity before filtering, output opaque.
  for (let pixel = 0; pixel < data.length; pixel += 4) {
    const intensity = Math.round(Math.round(data[pixel] / 255 * levels) / levels * 255);
    data[pixel] = data[pixel + 1] = data[pixel + 2] = intensity;
    data[pixel + 3] = 255;
  }
  const file = `columns-texture-${index}.png`;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(new URL(file, root).pathname);
  textures.push({ file, label: labels[index] ?? image.name, imageIndex: texture.source, sourceSha256: createHash('sha256').update(source).digest('hex'), width: info.width, height: info.height, format: `I${format.size}`, texelBytes: Math.ceil(info.width * info.height * format.size / 8) });
}
let triangles = 0;
function visitNode(index) {
  const node = gltf.nodes[index];
  if (node.mesh !== undefined) for (const primitive of gltf.meshes[node.mesh].primitives) {
    if (primitive.mode !== undefined && primitive.mode !== 4) throw new Error('Expected triangle primitives.');
    triangles += gltf.accessors[primitive.indices ?? primitive.attributes.POSITION].count / 3;
  }
  node.children?.forEach(visitNode);
}
gltf.scenes[gltf.scene ?? 0].nodes.forEach(visitNode);
const stats = { triangles, textureCount: textures.length, textureBytes: textures.reduce((sum, texture) => sum + texture.texelBytes, 0) };
await writeFile(new URL('columns-reference.json', root), JSON.stringify({ textures, stats }, null, 2) + '\n');
// RSS shows the same references above the model without requiring WebGL.
const width = 960;
const headerHeight = 236;
const poster = await sharp(await readFile(new URL('columns-poster.png', root))).resize({ width }).toBuffer();
const posterInfo = await sharp(poster).metadata();
const height = headerHeight + posterInfo.height;
const layers = [];
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#111827"/>`;
for (const [index, texture] of textures.entries()) {
  const x = 160 + index * 320;
  const png = await sharp(await readFile(new URL(texture.file, root))).resize({ width: 144, height: 144, fit: 'contain', kernel: 'nearest', background: '#111827' }).png().toBuffer();
  layers.push({ input: png, left: x - 72, top: 44 });
  svg += `<g fill="#edf1fa" text-anchor="middle" font-family="Arial,sans-serif" font-size="16"><text x="${x}" y="28">${texture.label}</text><text x="${x}" y="209">${texture.width} × ${texture.height} · ${texture.format} · ${formatBytes(texture.texelBytes)}</text></g>`;
}
svg += '</svg>';
layers.push({ input: poster, left: 0, top: headerHeight });
layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="70"><rect width="100%" height="100%" rx="5" fill="#0b101b"/><g fill="#fff" font-family="Arial,sans-serif" font-size="16"><text x="12" y="27">${stats.triangles} tris</text><text x="12" y="52">${stats.textureCount} textures · ${formatBytes(stats.textureBytes)} texels</text></g></svg>`), left: 12, top: headerHeight + 12 });
await sharp(Buffer.from(svg)).composite(layers).jpeg({ quality: 85 }).toFile(new URL('columns-reference.jpg', root).pathname);
console.log(`Column references: ${triangles} triangles, ${textures.length} textures, ${formatBytes(stats.textureBytes)} of packed texels.`);
