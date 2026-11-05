import sharp from 'sharp';
import path from 'node:path';
import { convertTexture, defaultVertexColors, renderVertexPanels } from '../content/blog/n64-texture-formats/texture-math.ts';
import { renderCombiner } from '../content/blog/n64-texture-formats/combiner-math.ts';

export async function generateCombinerFigures(root) {
  const size = 32;
  const load = async (file, format) => {
    const pixels = await sharp(path.join(root, file)).resize(size, size).ensureAlpha().raw().toBuffer();
    const converted = convertTexture(new Uint8ClampedArray(pixels), format, size).pixels;
    // The opaque recipes deliberately ignore intensity's texel alpha.
    if (format === 'I4') for (let i = 3; i < converted.length; i += 4) converted[i] = 255;
    return converted;
  };
  const texture0 = await load('updated/floor6.i4.png', 'I4');
  const texture1 = await load('original/floor-corner2.i8.png', 'I4');
  const alpha = await load('choice-glow-ia8.png', 'IA8');
  const shade = renderVertexPanels(texture0, size, size, defaultVertexColors, size, 'I4')[1];
  const columns = renderCombiner('columns', texture0, texture1, shade, size, [255, 255, 255], 0.5);
  const mix = renderCombiner('lerp', texture0, texture1, shade, size, [255, 255, 255], 0.5);
  const transparent = renderCombiner('alpha', alpha, texture1, shade, size, [231, 172, 99], 0.5);
  const files = { 'combiner-texture0.png': texture0, 'combiner-texture1.png': texture1, 'combiner-alpha.png': alpha, 'combiner-shade.png': shade, 'combiner-cycle1.png': columns.stages[0], 'combiner-result.png': columns.stages[1] };
  const png = (pixels, display = size) => sharp(Buffer.from(pixels), { raw: { width: size, height: size, channels: 4 } }).resize(display, display, { kernel: 'nearest' }).png();
  for (const [file, pixels] of Object.entries(files)) await png(pixels).toFile(path.join(root, file));
  const layers = [];
  const text = (x, y, value, font = 16) => `<text x="${x}" y="${y}" fill="#edf1fa" font-family="Arial,sans-serif" font-size="${font}">${value}</text>`;
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="700"><defs><pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#141a2e"/><path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#303b55"/></pattern></defs><rect width="100%" height="100%" fill="#111827"/>';
  svg += text(24, 32, 'Color combiner: (A − B) × C + D', 22);
  svg += text(24, 62, 'Column recipe: cycle 1 = Texture 0 × Shade. Cycle 2 = Combined × Primitive. Alpha = 1.');
  for (const [index, [name, pixels]] of [['Texture 0', texture0], ['Shade', shade], ['After cycle 1', columns.stages[0]], ['Final, white primitive', columns.stages[1]]].entries()) {
    const x = 24 + index * 234;
    svg += text(x, 100, name, 15);
    layers.push({ input: await png(pixels, 192).toBuffer(), left: x, top: 114 });
  }
  svg += text(24, 350, 'Two-texture lerp: (Texture 1 − Texture 0) × amount + Texture 0', 18);
  svg += text(24, 378, 'At 50%, both textures contribute equally. The second cycle applies Shade.', 15);
  for (const [index, [name, pixels]] of [['Texture 0', texture0], ['Texture 1', texture1], ['50% mix, shaded', mix.stages[1]], ['IA8 with alpha', transparent.stages[0]]].entries()) {
    const x = 24 + index * 234;
    svg += text(x, 414, name, 15) + `<rect x="${x}" y="430" width="192" height="192" fill="url(#checker)"/>`;
    layers.push({ input: await png(pixels, 192).toBuffer(), left: x, top: 430 });
  }
  svg += text(24, 662, 'RGB and alpha have separate formulas. Transparency also needs blending or alpha testing.', 15);
  svg += text(24, 686, 'Illustrative arithmetic on flat patches. RDP fixed-point precision is not emulated.', 13) + '</svg>';
  await sharp(Buffer.from(svg)).composite(layers).png().toFile(path.join(root, 'color-combiner.png'));
}
