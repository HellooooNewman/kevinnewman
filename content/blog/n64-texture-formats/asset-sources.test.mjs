import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
import { articleFigures, bannerAssets, carpetAssets, formatSamples, revisionPairs, vertexTexture } from './figures.ts';
import { textureBudget } from './texture-math.ts';
import { formatChoices } from './format-choices.ts';

const assets = new URL('../../../public/assets/blog/pandemonium/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('./asset-sources.json', import.meta.url), 'utf8'));

test('both texture snapshots match their recorded source bytes and dimensions', async () => {
  for (const asset of [...manifest.original, ...manifest.updated]) {
    const buffer = await readFile(new URL(asset.file, assets));
    assert.equal(createHash('sha256').update(buffer).digest('hex'), asset.sha256, asset.file);
    const { width, height } = await sharp(buffer).metadata();
    assert.deepEqual({ width, height }, { width: asset.width, height: asset.height }, asset.file);
  }
});

test('comparison claims use the recorded dimensions and N64 texel budgets', () => {
  const sources = new Map([...manifest.original, ...manifest.updated].map((asset) => [asset.file, asset]));
  for (const asset of [vertexTexture, ...bannerAssets, ...carpetAssets, ...formatSamples, ...revisionPairs.flatMap((pair) => [pair.original, pair.updated])]) {
    const source = sources.get(asset.file);
    assert.ok(source, asset.file);
    assert.deepEqual([asset.width, asset.height], [source.width, source.height], asset.file);
    if ('bytes' in asset) assert.equal(asset.bytes, textureBudget(asset.width, asset.height, 'format' in asset ? asset.format : 'CI8').texels, asset.file);
  }
  const [floor, carpet] = revisionPairs;
  assert.equal(floor.updated.bytes / floor.original.bytes, 0.5);
  assert.equal(carpet.updated.bytes, carpet.original.bytes);
  assert.equal(sources.get('original/banner_bottom.ia8.png').sha256, sources.get('updated/banner_bottom.ia8.png').sha256);
});

test('every MDX figure has an existing RSS illustration even while the post is unpublished', async () => {
  const source = await readFile(new URL('./post.mdx', import.meta.url), 'utf8');
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  const names = new Set();
  visit(tree, 'mdxJsxFlowElement', (node) => { if (!['details', 'summary'].includes(node.name)) names.add(node.name); });
  for (const name of names) {
    const figure = articleFigures[name];
    assert.ok(figure?.alt && figure?.caption, `Missing RSS figure: ${name}`);
    const image = await readFile(new URL(`../../../public${figure.src}`, import.meta.url));
    assert.ok((await sharp(image).metadata()).width > 0, name);
  }
});

test('format-choice images show the advertised precision, alpha, and resolution', async () => {
  const previews = new Map();
  for (const choice of formatChoices) for (const sample of choice.samples) {
    const { data, info } = await sharp(await readFile(new URL(sample.file, assets))).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.deepEqual([info.width, info.height], [choice.id === 'color' ? 64 : sample.width, sample.height]);
    const colors = new Set(), alpha = new Set();
    for (let pixel = 0; pixel < data.length; pixel += 4) {
      colors.add(`${data[pixel]},${data[pixel + 1]},${data[pixel + 2]}`);
      alpha.add(data[pixel + 3]);
    }
    previews.set(sample.file, { colors, alpha });
  }
  assert.ok(previews.get('choice-stone-i4.png').colors.size <= 16);
  assert.ok(previews.get('choice-stone-i8.png').colors.size > 16);
  assert.ok(previews.get('choice-carpet-ci4.png').colors.size <= 16);
  assert.ok(previews.get('choice-carpet-ci8.png').colors.size > 16);
  assert.deepEqual([...previews.get('choice-glow-ia4.png').alpha].sort((a, b) => a - b), [0, 255]);
  assert.ok(previews.get('choice-glow-ia8.png').alpha.size > 2);
  assert.equal(textureBudget(64, 64, 'I4').texels / textureBudget(32, 32, 'I4').texels, 4);
});
