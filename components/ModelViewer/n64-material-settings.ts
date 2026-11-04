type Cycle = { color: string[]; alpha: string[] };
export type N64MaterialExtension = {
  combiner?: { set?: boolean; cycles?: Cycle[] };
  primitive?: { set?: boolean; color?: number[] };
  textures?: Record<string, { index: number }>;
  otherModes?: { textureFilter?: string };
  extensions?: { FAST64_materials_f3d?: { geometryMode?: { cullBack?: boolean; cullFront?: boolean } } };
};
export type N64SamplerExtension = {
  set?: boolean;
  format?: { texture: string; size: number };
  fields?: { clamp: boolean; mirror: boolean }[];
};

const equals = (a: string[], b: string[]) => a.length === b.length && a.every((v, i) => v === b[i]);

// Deliberately bounded: unsupported combiners must not silently look correct.
// Fast64's schema: https://github.com/Fast-64/fast64/tree/main/fast64_internal/f3d/glTF
export function readN64Settings(extension: N64MaterialExtension, sampler?: N64SamplerExtension) {
  const cycles = extension.combiner?.cycles;
  if (!extension.combiner?.set || !cycles?.length || cycles.length > 2) throw new Error('Unsupported N64 combiner.');
  const textured = equals(cycles[0].color, ['TEXEL0', '0', 'SHADE', '0']);
  const shadeOnly = equals(cycles[0].color, ['0', '0', '0', 'SHADE']);
  if ((!textured && !shadeOnly) || !equals(cycles[0].alpha, ['0', '0', '0', '1'])) throw new Error('This viewer currently supports opaque texture × shade and shade-only N64 materials.');
  if (cycles[1] && (!equals(cycles[1].color, ['COMBINED', '0', 'PRIMITIVE', '0']) || !equals(cycles[1].alpha, ['0', '0', '0', 'COMBINED']))) throw new Error('Unsupported second N64 combiner cycle.');
  if (Object.keys(extension.textures ?? {}).some((key) => key !== '0')) throw new Error('Multiple N64 texture inputs are not supported yet.');
  if (textured && (sampler?.set === false || sampler?.format?.texture !== 'I' || ![4, 8].includes(sampler.format.size))) throw new Error('This N64 adapter currently supports embedded I4 and I8 textures.');
  const textureFilter = extension.otherModes?.textureFilter;
  if (textured && textureFilter !== 'BILERP' && textureFilter !== 'POINT') throw new Error('Unsupported or missing N64 texture filter.');
  const primitive = cycles[1] ? extension.primitive?.color : [1, 1, 1, 1];
  if (!primitive || primitive.length !== 4 || primitive.some((v) => !Number.isFinite(v) || v < 0 || v > 1)) throw new Error('Missing N64 primitive color.');
  const geometry = extension.extensions?.FAST64_materials_f3d?.geometryMode;
  if (geometry?.cullFront) throw new Error('Front-face N64 culling is not supported yet.');
  return { textured, threePoint: textureFilter === 'BILERP', intensityBits: sampler?.format?.size ?? 8, primitive: primitive.slice(0, 3), cullBack: geometry?.cullBack !== false };
}
