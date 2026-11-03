export const formats = [
  { id: 'I4', bits: 4, label: '16 intensity levels', detail: 'Four bits of brightness per texel. The sampled intensity also supplies texel alpha; it is not a separate channel.' },
  { id: 'I8', bits: 8, label: '256 intensity levels', detail: 'Eight bits of brightness. Smoother grayscale than I4, at twice the texel cost. Alpha follows intensity if the combiner uses it.' },
  { id: 'IA4', bits: 4, label: '3-bit intensity + 1-bit alpha', detail: 'Eight brightness levels and an independent on/off alpha value. Good for cutouts that can tolerate coarse shading.' },
  { id: 'IA8', bits: 8, label: '4-bit intensity + 4-bit alpha', detail: 'Sixteen brightness levels and sixteen alpha levels, sharing one byte. Softer transparent edges than IA4.' },
  { id: 'IA16', bits: 16, label: '8-bit intensity + 8-bit alpha', detail: '256 brightness levels and 256 alpha levels. Grayscale with a much smoother independent transparency channel.' },
  { id: 'CI4', bits: 4, palette: 16, label: '4-bit index → 16-entry palette', detail: 'Each texel selects one of sixteen palette entries. This example generates an RGBA16 palette from the selected artwork.' },
  { id: 'CI8', bits: 8, palette: 256, label: '8-bit index → 256-entry palette', detail: 'Each texel selects one of up to 256 palette entries. Both CI modes reserve the upper half of TMEM for palette lookup.' },
  { id: 'RGBA16', bits: 16, label: '5 red + 5 green + 5 blue + 1 alpha', detail: 'Direct color, with 32 levels per RGB channel and binary alpha. No palette required.' },
  { id: 'RGBA32', bits: 32, label: '8 bits each for red, green, blue, alpha', detail: 'Direct color and smooth alpha at four bytes per texel. More expensive than intensity and indexed formats.' },
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

export function convertTexture(pixels: Uint8ClampedArray, format: FormatId): { pixels: Uint8ClampedArray; palette: Color[] } {
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

export function formatBytes(bytes: number): string {
  return bytes < 1024 ? `${bytes} B` : `${Number((bytes / 1024).toFixed(2))} KiB`;
}

export const defaultVertexColors: VertexColors = [[206, 164, 105], [145, 105, 87], [96, 115, 128], [198, 174, 133]];
