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
