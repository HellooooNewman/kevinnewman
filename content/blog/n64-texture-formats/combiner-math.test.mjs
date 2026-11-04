import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { combinerRecipes, renderCombiner } from './combiner-math.ts';

const texture0 = new Uint8ClampedArray([200, 100, 50, 64]);
const texture1 = new Uint8ClampedArray([20, 40, 100, 255]);
const shade = new Uint8ClampedArray([128, 200, 64, 255]);
const white = [255, 255, 255];
const render = (recipe, tint = white, amount = 0.5, vertex = shade) => renderCombiner(recipe, texture0, texture1, vertex, 1, tint, amount).stages;

test('the column recipe matches the actual exported material in both RGB and alpha', async () => {
  const bytes = await readFile(new URL('../../../public/assets/blog/pandemonium/models/columns.glb', import.meta.url));
  const gltf = JSON.parse(bytes.toString('utf8', 20, 20 + bytes.readUInt32LE(12)));
  const recipe = combinerRecipes.find((entry) => entry.id === 'columns');
  const names = { TEXEL0: 'TEX0', PRIMITIVE: 'PRIM' };
  for (const material of gltf.materials) {
    const cycles = material.extensions.FAST64_materials_n64.combiner.cycles;
    assert.equal(recipe.cycles.length, cycles.length);
    cycles.forEach((cycle, index) => {
      assert.deepEqual(recipe.cycles[index].rgb, cycle.color.map((slot) => names[slot] ?? slot));
      assert.deepEqual(recipe.cycles[index].alpha, cycle.alpha.map((slot) => names[slot] ?? slot));
    });
  }
});

test('column tint changes RGB while constant alpha keeps the material opaque', () => {
  const stages = render('columns');
  assert.equal(stages.length, 2);
  assert.deepEqual(stages[0], stages[1]);
  assert.deepEqual([...stages[1]], [100, 78, 13, 255]);
  assert.deepEqual([...render('columns', [0, 0, 0])[1]], [0, 0, 0, 255]);
});

test('a one-cycle texture recipe ignores shade and primitive color', () => {
  const result = render('texture', [0, 0, 0], 0, new Uint8ClampedArray([0, 0, 0, 0]));
  assert.equal(result.length, 1);
  assert.deepEqual([...result[0]], [200, 100, 50, 255]);
});

test('texture-alpha recipe passes alpha independently of the RGB tint', () => {
  assert.deepEqual([...render('alpha', [0, 0, 0])[0]], [0, 0, 0, 64]);
  assert.deepEqual([...render('alpha')[0]], [200, 100, 50, 64]);
});

test('two-texture lerp reaches both endpoints and shades the mixed result in cycle two', () => {
  assert.deepEqual([...render('lerp', white, 0)[0]], [200, 100, 50, 255]);
  assert.deepEqual([...render('lerp', white, 1)[0]], [20, 40, 100, 255]);
  const midpoint = render('lerp');
  assert.deepEqual([...midpoint[0]], [110, 70, 75, 255]);
  assert.deepEqual([...midpoint[1]], [55, 55, 19, 255]);
});
