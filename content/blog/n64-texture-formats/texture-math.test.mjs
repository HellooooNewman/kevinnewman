import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertTexture, formats, textureBudget, interpolateVertexColor, renderVertexPanels, rowAlignment, tmemRowBytes, isPowerOfTwo } from './texture-math.ts';

test('I formats share intensity with alpha; IA formats quantize independent alpha', () => {
  const pixels = new Uint8ClampedArray([128, 128, 128, 0, 128, 128, 128, 255]);
  const i4 = convertTexture(pixels, 'I4').pixels;
  assert.equal(i4[0], i4[3]);
  assert.equal(i4[3], i4[7]);
  const ia4 = convertTexture(pixels, 'IA4').pixels;
  assert.equal(ia4[0], ia4[4]);
  assert.deepEqual([ia4[3], ia4[7]], [0, 255]);
  assert.equal(new Set(Array.from({ length: 256 }, (_, value) => convertTexture(new Uint8ClampedArray([value, value, value, 255]), 'I4').pixels[0])).size, 16);
});

test('IA4 has eight brightness levels while IA8 has sixteen alpha levels', () => {
  const source = new Uint8ClampedArray(Array.from({ length: 256 }, (_, value) => [value, value, value, value]).flat());
  const ia4 = convertTexture(source, 'IA4').pixels;
  const ia8 = convertTexture(source, 'IA8').pixels;
  assert.equal(new Set(Array.from(ia4).filter((_, i) => i % 4 === 0)).size, 8);
  assert.equal(new Set(Array.from(ia8).filter((_, i) => i % 4 === 3)).size, 16);
});

test('RGBA16 preserves binary alpha and five-bit color, while RGBA32 preserves the source', () => {
  const source = new Uint8ClampedArray([126, 81, 240, 200, 10, 20, 30, 20]);
  const rgba16 = convertTexture(source, 'RGBA16').pixels;
  const valid = new Set(Array.from({ length: 32 }, (_, v) => (v << 3) | (v >> 2)));
  assert.ok(valid.has(rgba16[0]) && valid.has(rgba16[1]) && valid.has(rgba16[2]));
  assert.equal(rgba16[3], 255);
  assert.equal(rgba16[7], 0);
  assert.deepEqual(convertTexture(source, 'RGBA32').pixels, source);
});

test('CI palettes obey their entry limits and output only palette colors', () => {
  const source = new Uint8ClampedArray(Array.from({ length: 1024 }, (_, i) => [i % 256, i * 13 % 256, i * 37 % 256, i === 0 ? 0 : 255]).flat());
  for (const [format, limit] of [['CI4', 16], ['CI8', 256]]) {
    const result = convertTexture(source, format);
    assert.ok(result.palette.length <= limit);
    const entries = new Set(result.palette.map((c) => c.join(',')));
    for (let i = 0; i < result.pixels.length; i += 4) assert.ok(entries.has(Array.from(result.pixels.slice(i, i + 4)).join(',')));
    assert.deepEqual(result, convertTexture(source, format));
  }
});

test('CI texels are limited to 2 KiB, even when the logical palette is small', () => {
  assert.deepEqual(textureBudget(64, 64, 'CI4'), { texels: 2048, paletteBytes: 32, capacity: 2048, fits: true });
  assert.equal(textureBudget(64, 64, 'CI8').fits, false);
  assert.equal(textureBudget(64, 64, 'I8').fits, true);
  assert.equal(textureBudget(32, 32, 'RGBA16').texels, textureBudget(64, 64, 'I4').texels);
  assert.equal(textureBudget(64, 64, 'RGBA32').texels, 16384);
});

test('row alignment follows libdragon TMEM pitch: 64-bit rows, split for RGBA32 and YUV16', () => {
  const expected = { I4: 16, IA4: 16, CI4: 16, I8: 8, IA8: 8, CI8: 8, IA16: 4, RGBA16: 4, RGBA32: 4, YUV16: 8 };
  for (const format of formats) assert.equal(rowAlignment(format.id), expected[format.id], format.id);
  // Aligned widths need no padding; 40-wide I4 rows are 20b, padded to 24b.
  for (const format of formats) assert.equal(tmemRowBytes(rowAlignment(format.id) * 3, format.id) * 8, rowAlignment(format.id) * 3 * format.bits, format.id);
  assert.equal(tmemRowBytes(40, 'I4'), 24);
  assert.equal(tmemRowBytes(40, 'I8'), 40);
  assert.equal(tmemRowBytes(40, 'RGBA16'), 80);
  assert.equal(tmemRowBytes(2, 'RGBA32'), 16);
  assert.deepEqual(textureBudget(40, 48, 'RGBA16'), { texels: 3840, paletteBytes: 0, capacity: 4096, fits: true });
});

test('repeating needs power-of-two dimensions', () => {
  for (const size of [1, 16, 32, 64, 128]) assert.equal(isPowerOfTwo(size), true, String(size));
  for (const size of [0, 40, 48, 80, 124]) assert.equal(isPowerOfTwo(size), false, String(size));
});

test('YUV16 shares horizontal chroma, preserves grayscale, and has no alpha or palette', () => {
  const source = new Uint8ClampedArray([255,0,0,0, 0,0,255,255]);
  const { pixels, palette } = convertTexture(source, 'YUV16', 2);
  assert.deepEqual(palette, []);
  assert.deepEqual([pixels[3], pixels[7]], [255, 255]);
  // Red and blue share color: both acquire some of the neighboring channel.
  assert.ok(pixels[2] > 100 && pixels[4] > 100);
  const gray = new Uint8ClampedArray([48,48,48,0, 200,200,200,255]);
  const result = convertTexture(gray, 'YUV16', 2).pixels;
  for (const offset of [0, 4]) {
    assert.equal(result[offset], result[offset + 1]);
    assert.equal(result[offset], result[offset + 2]);
    assert.ok(Math.abs(result[offset] - gray[offset]) <= 1);
  }
  assert.deepEqual(textureBudget(64, 64, 'YUV16'), { texels: 8192, paletteBytes: 0, capacity: 4096, fits: false });
});

test('YUV pairs never share color across row boundaries', () => {
  const source = new Uint8ClampedArray([
    255,0,0,255, 255,0,0,255, 255,0,0,255,
    0,0,255,255, 0,0,255,255, 0,0,255,255,
  ]);
  const result = convertTexture(source, 'YUV16', 3).pixels;
  assert.ok(result[8] > 250 && result[10] < 5);
  assert.ok(result[12] < 5 && result[14] > 250);
});

test('vertex interpolation reaches all four corners and shares the diagonal', () => {
  const colors = [[255,0,0],[0,255,0],[0,0,255],[255,255,255]];
  for (const [u, v, expected] of [[0,0,colors[0]],[1,0,colors[1]],[0,1,colors[2]],[1,1,colors[3]]]) assert.deepEqual(interpolateVertexColor(colors, u, v), expected);
  assert.deepEqual(interpolateVertexColor(colors, 0.5, 0.5), [0, 127.5, 127.5]);
});

test('white vertices leave the intensity texture unchanged in the combined preview', () => {
  const source = new Uint8ClampedArray([90,90,90,255,170,170,170,255,255,255,255,255,0,0,0,255]);
  const [texture, , combined] = renderVertexPanels(source, 2, 2, [[255,255,255],[255,255,255],[255,255,255],[255,255,255]], 8);
  assert.deepEqual(texture, combined);
  assert.ok(formats.every((format) => convertTexture(source, format.id).pixels.length === source.length));
});

test('the original I8 vertex demo retains its 256 intensity levels', () => {
  const source = new Uint8ClampedArray(Array.from({ length: 256 }, (_, v) => [v, v, v, 255]).flat());
  const white = Array.from({ length: 4 }, () => [255, 255, 255]);
  const [i8, , combined] = renderVertexPanels(source, 16, 16, white, 16, 'I8');
  const [i4] = renderVertexPanels(source, 16, 16, white, 16, 'I4');
  const levels = (pixels) => new Set(Array.from(pixels).filter((_, i) => i % 4 === 0)).size;
  assert.equal(levels(i8), 256);
  assert.equal(levels(i4), 16);
  assert.deepEqual(i8, combined);
});
