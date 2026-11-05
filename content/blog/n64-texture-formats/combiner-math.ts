type Slot = 'TEX0' | 'TEX1' | 'SHADE' | 'PRIM' | 'PRIM_ALPHA' | 'COMBINED' | '0' | '1';
type Formula = readonly [Slot, Slot, Slot, Slot];
type Cycle = { rgb: Formula; alpha: Formula; explanation: string };
export type RecipeId = 'columns' | 'texture' | 'alpha' | 'lerp';
export const combinerRecipes: { id: RecipeId; label: string; summary: string; cycles: Cycle[] }[] = [
  { id: 'columns', label: 'Column material', summary: 'White primitive color leaves the first cycle’s result unchanged.', cycles: [
    { rgb: ['TEX0', '0', 'SHADE', '0'], alpha: ['0', '0', '0', '1'], explanation: 'Multiply texture color by interpolated vertex shading. Force alpha to 1.' },
    { rgb: ['COMBINED', '0', 'PRIM', '0'], alpha: ['0', '0', '0', 'COMBINED'], explanation: 'Tint the first result with primitive color. Keep its alpha.' },
  ] },
  { id: 'texture', label: 'Texture only', summary: 'Vertex colors and vertex lighting have no effect because Shade is not selected.', cycles: [
    { rgb: ['0', '0', '0', 'TEX0'], alpha: ['0', '0', '0', '1'], explanation: 'Take the texture color directly. Keep the surface opaque.' },
  ] },
  { id: 'alpha', label: 'Use texture alpha', summary: 'The combiner supplies color and alpha; source-alpha blending then reveals the checkerboard through the transparent areas.', cycles: [
    { rgb: ['TEX0', '0', 'PRIM', '0'], alpha: ['0', '0', '0', 'TEX0'], explanation: 'Tint the texture. Pass its alpha through for the blender to use.' },
  ] },
  { id: 'lerp', label: 'Blend two textures', summary: 'Primitive alpha sets the blend amount; cycle 2 shades the mixture.', cycles: [
    { rgb: ['TEX1', 'TEX0', 'PRIM_ALPHA', 'TEX0'], alpha: ['0', '0', '0', '1'], explanation: 'At 0%, use Texture 0. At 100%, use Texture 1. In between, mix them.' },
    { rgb: ['COMBINED', '0', 'SHADE', '0'], alpha: ['0', '0', '0', 'COMBINED'], explanation: 'Multiply the mixed texture by vertex shading. Keep opaque alpha.' },
  ] },
];

export function evaluateFormula(formula: Formula, inputs: Record<Slot, number>): number {
  const [a, b, c, d] = formula.map((slot) => inputs[slot]);
  return Math.max(0, Math.min(1, (a - b) * c + d));
}

// An educational normalized-arithmetic subset, not RDP fixed-point emulation.
export function renderCombiner(recipeId: RecipeId, texture0: Uint8ClampedArray, texture1: Uint8ClampedArray, shadePixels: Uint8ClampedArray, size: number, tint: readonly number[], blend: number) {
  const recipe = combinerRecipes.find((entry) => entry.id === recipeId)!;
  const stages = recipe.cycles.map(() => new Uint8ClampedArray(size * size * 4));
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const offset = (y * size + x) * 4;
    let combined = [0, 0, 0, 0];
    recipe.cycles.forEach((cycle, cycleIndex) => {
      const next = [0, 0, 0, 0];
      for (let channel = 0; channel < 4; channel++) {
        const alpha = channel === 3;
        next[channel] = evaluateFormula(alpha ? cycle.alpha : cycle.rgb, {
          TEX0: texture0[offset + channel] / 255,
          TEX1: texture1[offset + channel] / 255,
          SHADE: shadePixels[offset + channel] / 255,
          PRIM: alpha ? blend : tint[channel] / 255,
          PRIM_ALPHA: blend,
          COMBINED: combined[channel], '0': 0, '1': 1,
        });
      }
      // Keep intermediate precision; image quantization is for display only.
      combined = next;
      stages[cycleIndex].set(next.map((value) => Math.round(value * 255)), offset);
    });
  }
  return { stages, shade: shadePixels };
}
