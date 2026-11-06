export const formats = [
  { id: 'I4', bits: 4, label: '16 intensity levels', detail: 'Four bits of brightness per texel. Texel alpha uses that same intensity value.' },
  { id: 'I8', bits: 8, label: '256 intensity levels', detail: 'Eight bits of brightness. Smoother grayscale than I4, at twice the texel cost. Alpha follows intensity if the combiner uses it.' },
  { id: 'IA4', bits: 4, label: '3-bit intensity + 1-bit alpha', detail: 'Eight brightness levels and an independent on/off alpha value. Good for cutouts that can tolerate coarse shading.' },
  { id: 'IA8', bits: 8, label: '4-bit intensity + 4-bit alpha', detail: 'Sixteen brightness levels and sixteen alpha levels, sharing one byte. Softer transparent edges than IA4.' },
  { id: 'IA16', bits: 16, label: '8-bit intensity + 8-bit alpha', detail: '256 brightness levels and 256 alpha levels. Grayscale with a much smoother independent transparency channel.' },
  { id: 'CI4', bits: 4, palette: 16, label: '4-bit index → 16-entry palette', detail: 'Each texel selects one of sixteen palette entries. This example generates an RGBA16 palette from the selected artwork.' },
  { id: 'CI8', bits: 8, palette: 256, label: '8-bit index → 256-entry palette', detail: 'Each texel selects one of up to 256 palette entries. Both CI modes reserve the upper half of TMEM for palette lookup.' },
  { id: 'RGBA16', bits: 16, label: '5 red + 5 green + 5 blue + 1 alpha', detail: 'Direct color, with 32 levels per RGB channel and binary alpha. No palette required.' },
  { id: 'RGBA32', bits: 32, label: '8 bits each for red, green, blue, alpha', detail: 'Direct color and smooth alpha at 4b per texel. More expensive than intensity and indexed formats.' },
  { id: 'YUV16', bits: 16, label: '4:2:2 · shared color, separate brightness', detail: 'Each horizontal pair keeps two brightness samples but shares U and V color samples. Useful for video and photographic images, though sharp color edges can bleed. No palette or alpha. This preview approximates BT.601 conversion. The RDP needs a dedicated YUV render mode.' },
] as const;

export type FormatId = typeof formats[number]['id'];
export type RGB = readonly [number, number, number];
export type VertexColors = readonly [RGB, RGB, RGB, RGB];
type Color = [number, number, number, number];
type Swatch = { color: Color; count: number };

function quantize(value: number, bits: number): number {
  const levels = (1 << bits) - 1;
  const packed = Math.round(value / 255 * levels);
  // Bit replication matches the channel expansion of the packed formats.
  if (bits === 5) return (packed << 3) | (packed >> 2);
  if (bits === 3) return (packed << 5) | (packed << 2) | (packed >> 1);
  return Math.round(packed / levels * 255);
}

function rgba16(r: number, g: number, b: number, a: number): Color {
  return a < 128 ? [0, 0, 0, 0] : [quantize(r, 5), quantize(g, 5), quantize(b, 5), 255];
}

function key(color: Color): number {
  return (color[0] << 16) | (color[1] << 8) | color[2];
}

// A small deterministic, weighted median-cut palette for the browser example.
// This is an illustrative palette choice, not Pandemonium's exporter palette.
function makePalette(pixels: Uint8ClampedArray, limit: number): Color[] {
  const histogram = new Map<number, Swatch>();
  let transparent = false;
  for (let i = 0; i < pixels.length; i += 4) {
    const color = rgba16(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]);
    if (color[3] === 0) { transparent = true; continue; }
    const id = key(color);
    const existing = histogram.get(id);
    if (existing) existing.count++;
    else histogram.set(id, { color, count: 1 });
  }
  const target = limit - Number(transparent);
  const boxes: Swatch[][] = histogram.size ? [[...histogram.values()]] : [];
  const ranges = (box: Swatch[]) => [0, 1, 2].map((channel) =>
    Math.max(...box.map((s) => s.color[channel])) - Math.min(...box.map((s) => s.color[channel])));
  while (boxes.length < target) {
    let selected = -1;
    let score = -1;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].length < 2) continue;
      const candidate = Math.max(...ranges(boxes[i])) * Math.sqrt(boxes[i].reduce((sum, s) => sum + s.count, 0));
      if (candidate > score) { selected = i; score = candidate; }
    }
    if (selected === -1) break;
    const box = boxes[selected];
    const spread = ranges(box);
    const channel = spread.indexOf(Math.max(...spread));
    box.sort((a, b) => a.color[channel] - b.color[channel]);
    const half = box.reduce((sum, s) => sum + s.count, 0) / 2;
    let sum = 0;
    let split = 0;
    do { sum += box[split++].count; } while (sum < half && split < box.length - 1);
    boxes.splice(selected, 1, box.slice(0, split), box.slice(split));
  }
  const palette = boxes.map((box): Color => {
    const weight = box.reduce((sum, s) => sum + s.count, 0);
    return rgba16(...[0, 1, 2].map((channel) => box.reduce((sum, s) => sum + s.color[channel] * s.count, 0) / weight) as [number, number, number], 255);
  });
  if (transparent) palette.push([0, 0, 0, 0]);
  return palette;
}

// Illustrative BT.601 TV-range conversion, not a bit-exact RDP simulation.
// Average chroma within horizontal pairs; keep each pixel's luma separately.
function convertYuv16(pixels: Uint8ClampedArray, width: number): Uint8ClampedArray {
  const output = new Uint8ClampedArray(pixels.length);
  const toYuv = (offset: number) => {
    const r = pixels[offset], g = pixels[offset + 1], b = pixels[offset + 2];
    return [
      16 + (65.481 * r + 128.553 * g + 24.966 * b) / 255,
      128 + (-37.797 * r - 74.203 * g + 112 * b) / 255,
      128 + (112 * r - 93.786 * g - 18.214 * b) / 255,
    ];
  };
  for (let row = 0; row < pixels.length; row += width * 4) {
    const end = Math.min(row + width * 4, pixels.length);
    for (let first = row; first < end; first += 8) {
      const second = Math.min(first + 4, end - 4);
      const a = toYuv(first), b = toYuv(second);
      const u = Math.round((a[1] + b[1]) / 2) - 128;
      const v = Math.round((a[2] + b[2]) / 2) - 128;
      for (const [offset, value] of [[first, a[0]], [second, b[0]]]) {
        const y = 1.164383 * (Math.round(value) - 16);
        output.set([
          Math.round(y + 1.596027 * v),
          Math.round(y - 0.391762 * u - 0.812968 * v),
          Math.round(y + 2.017232 * u),
          255,
        ], offset);
      }
    }
  }
  return output;
}

export function convertTexture(pixels: Uint8ClampedArray, format: FormatId, width = pixels.length / 4): { pixels: Uint8ClampedArray; palette: Color[] } {
  if (format === 'YUV16') return { pixels: convertYuv16(pixels, width), palette: [] };
  const output = new Uint8ClampedArray(pixels.length);
  const indexed = format === 'CI4' || format === 'CI8';
  const palette = indexed ? makePalette(pixels, format === 'CI4' ? 16 : 256) : [];
  const matches = new Map<number, Color>();
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2], a = pixels[i + 3];
    const intensity = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    let color: Color;
    if (indexed) {
      const packed = rgba16(r, g, b, a);
      if (packed[3] === 0) color = [0, 0, 0, 0];
      else {
        const id = key(packed);
        const cached = matches.get(id);
        if (cached) color = cached;
        else {
          let best: Color = [0, 0, 0, 255];
          let distance = Infinity;
          for (const candidate of palette) {
            if (candidate[3] === 0) continue;
            const d = (packed[0] - candidate[0]) ** 2 + (packed[1] - candidate[1]) ** 2 + (packed[2] - candidate[2]) ** 2;
            if (d < distance) { best = candidate; distance = d; }
          }
          matches.set(id, best);
          color = best;
        }
      }
    } else if (format === 'RGBA32') color = [r, g, b, a];
    else if (format === 'RGBA16') color = rgba16(r, g, b, a);
    else {
      const intensityBits = format === 'IA4' ? 3 : format === 'I4' || format === 'IA8' ? 4 : 8;
      const value = quantize(intensity, intensityBits);
      const alpha = format === 'I4' || format === 'I8' ? value : quantize(a, format === 'IA4' ? 1 : format === 'IA8' ? 4 : 8);
      color = [value, value, value, alpha];
    }
    output.set(color, i);
  }
  return { pixels: output, palette };
}

export function textureBudget(width: number, height: number, format: FormatId) {
  const spec = formats.find((f) => f.id === format)!;
  const paletteEntries = 'palette' in spec ? spec.palette : 0;
  const texels = Math.ceil(width * height * spec.bits / 8);
  const capacity = paletteEntries ? 2048 : 4096;
  return { texels, paletteBytes: paletteEntries * 2, capacity, fits: texels <= capacity };
}

// RGBA32 and YUV16 split each texel across both halves of TMEM.
const splitsTmem = (format: FormatId) => format === 'RGBA32' || format === 'YUV16';

/** Width multiple that fills whole 64-bit TMEM rows, so libdragon adds no padding. */
export function rowAlignment(format: FormatId): number {
  const bits = formats.find((f) => f.id === format)!.bits;
  return (splitsTmem(format) ? 128 : 64) / bits;
}

/** TMEM bytes per texture row, padded like libdragon's rdpq_tex: ROUND_UP(bytes >> split, 8) << split. */
export function tmemRowBytes(width: number, format: FormatId): number {
  const bits = formats.find((f) => f.id === format)!.bits;
  const split = splitsTmem(format) ? 1 : 0;
  const bytes = Math.ceil(width * bits / 8);
  return Math.ceil((bytes >> split) / 8) * 8 << split;
}

/** Repeating or mirroring along an axis needs that dimension to be a power of two. */
export function isPowerOfTwo(value: number): boolean {
  return value > 0 && (value & (value - 1)) === 0;
}

export function interpolateVertexColor(colors: VertexColors, u: number, v: number): RGB {
  const weights = u + v <= 1 ? [1 - u - v, u, v, 0] : [0, 1 - v, 1 - u, u + v - 1];
  return [0, 1, 2].map((channel) => colors.reduce((sum, color, i) => sum + color[channel] * weights[i], 0)) as [number, number, number];
}

export function renderVertexPanels(source: Uint8ClampedArray, width: number, height: number, colors: VertexColors, size = 256, format: 'I4' | 'I8' = 'I4'): Uint8ClampedArray<ArrayBuffer>[] {
  const texture = convertTexture(source, format).pixels;
  const images = [0, 1, 2].map(() => new Uint8ClampedArray(size * size * 4));
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / (size - 1), v = y / (size - 1);
    const intensity = texture[(Math.min(height - 1, Math.floor(v * height)) * width + Math.min(width - 1, Math.floor(u * width))) * 4];
    const shade = interpolateVertexColor(colors, u, v);
    const offset = (y * size + x) * 4;
    images[0].set([intensity, intensity, intensity, 255], offset);
    images[1].set([...shade, 255], offset);
    images[2].set([...shade.map((channel) => Math.round(intensity * channel / 255)), 255], offset);
  }
  return images;
}

export { formatBytes } from '../../../lib/format-bytes.mjs';

export const defaultVertexColors: VertexColors = [[206, 164, 105], [145, 105, 87], [96, 115, 128], [198, 174, 133]];
