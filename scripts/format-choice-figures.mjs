import sharp from 'sharp';
import path from 'node:path';
import { formatChoices } from '../content/blog/n64-texture-formats/format-choices.ts';
import { convertTexture, formatBytes, textureBudget } from '../content/blog/n64-texture-formats/texture-math.ts';

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const tint = [193, 155, 96];

export async function generateFormatChoices(root) {
  const floor = await sharp(path.join(root, 'updated/floor6.i4.png')).ensureAlpha().raw().toBuffer();
  const carpet = await sharp(path.join(root, 'updated/carpet_border8.ci8.png')).ensureAlpha().raw().toBuffer();
  const glow = new Uint8ClampedArray(64 * 64 * 4);
  for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
    const alpha = Math.round(255 * Math.max(0, 1 - Math.hypot(x - 31.5, y - 31.5) / 30));
    glow.set([224, 224, 224, alpha], (y * 64 + x) * 4);
  }
  const layers = [];
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="952"><defs><pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#141a2e"/><path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#303b55"/></pattern></defs><rect width="100%" height="100%" fill="#111827"/>';
  const text = (x, y, value, size = 14) => `<text x="${x}" y="${y}" font-size="${size}" font-family="Arial,sans-serif" fill="#edf1fa">${escape(value)}</text>`;
  for (const [index, choice] of formatChoices.entries()) {
    const x = 20 + index % 2 * 470, y = 20 + Math.floor(index / 2) * 450;
    svg += `<rect x="${x}" y="${y}" width="450" height="432" rx="8" fill="#161e30" stroke="#3d4c6b"/>`;
    svg += text(x + 16, y + 30, choice.title, 18);
    for (const [column, sample] of choice.samples.entries()) {
      let source;
      if (choice.id === 'alpha') source = glow;
      else if (choice.id === 'color') source = new Uint8ClampedArray(carpet);
      else if (sample.width === 32) source = new Uint8ClampedArray(await sharp(floor, { raw: { width: 64, height: 64, channels: 4 } }).resize(32, 32).raw().toBuffer());
      else source = new Uint8ClampedArray(floor);
      const pixels = convertTexture(source, sample.format, sample.width).pixels;
      if (choice.id === 'stone' || choice.id === 'resolution') {
        for (let pixel = 0; pixel < pixels.length; pixel += 4) {
          const intensity = pixels[pixel] / 255;
          pixels.set([...tint.map((channel) => Math.round(channel * intensity)), 255], pixel);
        }
      }
      let preview = pixels;
      let width = sample.width;
      if (choice.id === 'color') {
        // Repeat one 16 × 64 carpet tile so the border is easier to inspect.
        width = 64;
        preview = new Uint8ClampedArray(width * sample.height * 4);
        for (let row = 0; row < sample.height; row++) for (let repeat = 0; repeat < 4; repeat++) preview.set(pixels.subarray(row * sample.width * 4, (row + 1) * sample.width * 4), (row * width + repeat * sample.width) * 4);
      }
      const file = path.join(root, sample.file);
      await sharp(Buffer.from(preview), { raw: { width, height: sample.height, channels: 4 } }).png().toFile(file);
      const imageX = x + 16 + column * 214;
      svg += `<rect x="${imageX}" y="${y + 50}" width="204" height="144" rx="4" fill="url(#checker)"/>`;
      layers.push({ input: await sharp(file).resize(144, 144, { fit: 'contain', kernel: 'nearest', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(), left: imageX + 30, top: y + 50 });
      svg += text(imageX, y + 218, sample.label, 13);
      const budget = textureBudget(sample.width, sample.height, sample.format);
      svg += text(imageX, y + 240, `${formatBytes(budget.texels + budget.paletteBytes)}${budget.paletteBytes ? ' with palette' : ' texels'}`, 13);
      if (choice.id === 'resolution') layers.push({ input: await sharp(file).resize(12, 12, { kernel: 'nearest' }).png().toBuffer(), left: x + 260 + column * 50, top: y + 257 });
    }
    if (choice.id === 'resolution') svg += text(x + 16, y + 268, 'Both drawn 12 pixels wide:', 13);
    if (choice.id === 'color') svg += text(x + 16, y + 268, 'One 16 × 64 tile, repeated across each preview.', 12);
    const lines = [];
    for (const word of choice.description.split(' ')) {
      if (lines.length && lines.at(-1).length + word.length < 52) lines[lines.length - 1] += ` ${word}`;
      else lines.push(word);
    }
    lines.forEach((line, lineIndex) => { svg += text(x + 16, y + 302 + lineIndex * 20, line); });
  }
  svg += text(20, 934, 'Illustrative conversions · CI sizes include full palettes · glow generated, stone/carpet from game artwork', 13) + '</svg>';
  await sharp(Buffer.from(svg)).composite(layers).png().toFile(path.join(root, 'format-choice-guide.png'));
}
