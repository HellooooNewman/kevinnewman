// Pre-renders every raster image in public/ as WebP at each srcset width,
// so next/image can serve small, responsive images from a static export
// (lib/image-loader.ts maps each request to these files).
//
// Output lands in public/_img/ (gitignored). Images whose variants are all
// newer than the source are skipped, so repeat runs take a moment.

import { mkdir, readdir, rm, stat } from "node:fs/promises";
import { availableParallelism } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { deviceSizes, imageSizes } from "../lib/image-sizes.mjs";

const PUBLIC = path.resolve(import.meta.dirname, "../public");
const OUT = path.join(PUBLIC, "_img");
const WIDTHS = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);
const QUALITY = 75; // matches next/image's default `quality`
const RASTER = /\.(jpe?g|png)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== OUT) yield* walk(full);
    } else {
      yield full;
    }
  }
}

const variantPath = (source, width) =>
  path.join(OUT, `${path.relative(PUBLIC, source)}.${width}.webp`);

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return -1;
  }
}

async function optimize(source) {
  const sourceTime = await mtime(source);
  const outputs = WIDTHS.map((width) => [width, variantPath(source, width)]);
  const stale = [];
  for (const [width, out] of outputs) {
    if ((await mtime(out)) < sourceTime) stale.push([width, out]);
  }
  if (stale.length === 0) return 0;

  await mkdir(path.dirname(stale[0][1]), { recursive: true });
  // rotate() applies EXIF orientation before the metadata is stripped,
  // so phone photos don't come out sideways
  const image = sharp(source).rotate();
  await Promise.all(
    stale.map(([width, out]) =>
      image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out)
    )
  );
  return stale.length;
}

const started = performance.now();
const sources = [];
for await (const file of walk(PUBLIC)) {
  if (RASTER.test(file)) sources.push(file);
}

// A few images at a time; sharp already spreads each one across threads
const queue = [...sources];
let written = 0;
let updated = 0;
await Promise.all(
  Array.from({ length: Math.max(2, availableParallelism() >> 1) }, async () => {
    for (let source; (source = queue.shift()); ) {
      const count = await optimize(source);
      written += count;
      if (count) updated++;
    }
  })
);

// Drop variants whose source image was renamed or deleted
const expected = new Set(
  sources.flatMap((source) => WIDTHS.map((width) => variantPath(source, width)))
);
let removed = 0;
try {
  for await (const file of walk(OUT)) {
    if (!expected.has(file)) {
      await rm(file);
      removed++;
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const seconds = ((performance.now() - started) / 1000).toFixed(1);
console.log(
  `images: ${sources.length} sources, ${updated} updated (${written} variants), ` +
    `${removed} stale removed in ${seconds}s`
);
