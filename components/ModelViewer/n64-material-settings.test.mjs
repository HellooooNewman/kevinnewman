import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { readN64Settings } from './n64-material-settings.ts';

const root = new URL('../../public/assets/blog/pandemonium/models/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('sources.json', root)));
const bytes = await readFile(new URL('columns.glb', root));
const gltf = JSON.parse(bytes.toString('utf8', 20, 20 + bytes.readUInt32LE(12)));

test('the game model is an unmodified, self-contained snapshot with vertex colors', () => {
  const source = manifest.models.find((model) => model.file === 'columns.glb');
  assert.equal(bytes.length, source.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), source.sha256);
  assert.equal(bytes.toString('ascii', 0, 4), 'glTF');
  assert.equal(bytes.readUInt32LE(4), 2);
  assert.ok(gltf.images.every((image) => image.bufferView !== undefined && !image.uri));
  assert.ok(gltf.buffers.every((buffer) => !buffer.uri));
  for (const mesh of gltf.meshes) for (const primitive of mesh.primitives) {
    assert.ok(primitive.attributes.COLOR_0 !== undefined);
    assert.ok(primitive.attributes.TEXCOORD_0 !== undefined);
  }
});

test('the model poster has a transparent backdrop and visible model pixels', async () => {
  const poster = await readFile(new URL('columns-poster.png', root));
  const metadata = await sharp(poster).metadata();
  assert.equal(metadata.hasAlpha, true);
  const { channels } = await sharp(poster).stats();
  assert.equal(channels[3].min, 0);
  assert.equal(channels[3].max, 255);
});

test('all exported column materials resolve to supported opaque intensity × vertex color', () => {
  const formats = [];
  for (const material of gltf.materials) {
    const extension = material.extensions.FAST64_materials_n64;
    const textureIndex = material.pbrMetallicRoughness.baseColorTexture.index;
    assert.equal(extension.textures['0'].index, textureIndex);
    const sampler = gltf.samplers[gltf.textures[textureIndex].sampler].extensions.FAST64_sampler_n64;
    const settings = readN64Settings(extension, sampler);
    formats.push(settings.intensityBits);
    assert.equal(settings.textured, true);
    assert.equal(settings.threePoint, true);
    assert.deepEqual(settings.primitive, [1, 1, 1]);
    assert.equal(settings.cullBack, true);
    // glTF alphaMode must not override the N64 combiner's constant opaque alpha.
    assert.equal(material.alphaMode, 'BLEND');
  }
  assert.deepEqual(formats, [8, 4, 4]);
});

test('unsupported texture inputs and alpha combiners fail rather than silently rendering incorrectly', () => {
  const original = gltf.materials[0].extensions.FAST64_materials_n64;
  const sampler = gltf.samplers[0].extensions.FAST64_sampler_n64;
  const alpha = structuredClone(original);
  alpha.combiner.cycles[0].alpha = ['0', '0', '0', 'TEXEL0'];
  assert.throws(() => readN64Settings(alpha, sampler), /opaque/);
  assert.throws(() => readN64Settings(original, { ...sampler, format: { texture: 'CI', size: 4 } }), /I4 and I8/);
  assert.throws(() => readN64Settings({ ...original, textures: { ...original.textures, '1': { index: 1 } } }, sampler), /Multiple/);
  assert.throws(() => readN64Settings({ ...original, combiner: { set: false } }, sampler), /combiner/);
});

test('opaque untextured shade-only geometry does not require a sampler', () => {
  const settings = readN64Settings({ combiner: { set: true, cycles: [{ color: ['0', '0', '0', 'SHADE'], alpha: ['0', '0', '0', '1'] }] } });
  assert.equal(settings.textured, false);
});

test('filtering follows the exported N64 material rather than a viewer preference', () => {
  const original = gltf.materials[0].extensions.FAST64_materials_n64;
  const sampler = gltf.samplers[0].extensions.FAST64_sampler_n64;
  assert.equal(readN64Settings(original, sampler).threePoint, true);
  const point = { ...original, otherModes: { ...original.otherModes, textureFilter: 'POINT' } };
  assert.equal(readN64Settings(point, sampler).threePoint, false);
  assert.throws(() => readN64Settings({ ...original, otherModes: { textureFilter: 'AVERAGE' } }, sampler), /texture filter/);
  assert.throws(() => readN64Settings({ ...original, otherModes: {} }, sampler), /texture filter/);
});

test('column references match embedded images, N64 formats, and geometry totals', async () => {
  const reference = JSON.parse(await readFile(new URL('columns-reference.json', root)));
  const binStart = 28 + bytes.readUInt32LE(12);
  let texelBytes = 0;
  for (const [index, texture] of gltf.textures.entries()) {
    const entry = reference.textures[index];
    const image = gltf.images[texture.source];
    const view = gltf.bufferViews[image.bufferView];
    const source = bytes.subarray(binStart + (view.byteOffset ?? 0), binStart + (view.byteOffset ?? 0) + view.byteLength);
    assert.equal(entry.sourceSha256, createHash('sha256').update(source).digest('hex'));
    const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const format = gltf.samplers[texture.sampler].extensions.FAST64_sampler_n64.format;
    assert.equal(entry.format, `${format.texture}${format.size}`);
    assert.deepEqual([entry.width, entry.height], [info.width, info.height]);
    assert.equal(entry.texelBytes, Math.ceil(info.width * info.height * format.size / 8));
    texelBytes += entry.texelBytes;
    const preview = await sharp(await readFile(new URL(entry.file, root))).ensureAlpha().raw().toBuffer();
    const levels = (1 << format.size) - 1;
    for (let pixel = 0; pixel < preview.length; pixel += 4) {
      const intensity = Math.round(Math.round(data[pixel] / 255 * levels) / levels * 255);
      assert.deepEqual([...preview.subarray(pixel, pixel + 4)], [intensity, intensity, intensity, 255]);
    }
  }
  const triangles = gltf.meshes.reduce((sum, mesh) => sum + mesh.primitives.reduce((count, primitive) => count + gltf.accessors[primitive.indices ?? primitive.attributes.POSITION].count / 3, 0), 0);
  assert.deepEqual(reference.stats, { triangles, textureCount: gltf.textures.length, textureBytes: texelBytes });
  assert.equal(triangles, 254);
  assert.equal(texelBytes, 6592);
});
