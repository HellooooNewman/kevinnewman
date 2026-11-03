// Crop screenshot borders and prepare matching 4:3 JPEGs for the blog.
// Usage: node scripts/prepare-n64-scene-images.mjs <input-directory>
// Inputs: column-before.png, column-after.png, window-before.png,
// window-after.png, carpet-before.png, carpet-after.png.
import sharp from 'sharp';
import path from 'node:path';
import { mkdir, stat } from 'node:fs/promises';

const input = process.argv[2];
if (!input) throw new Error('Provide the directory containing the six source screenshots.');
const output = path.resolve(import.meta.dirname, '../public/assets/blog/pandemonium/scenes');
await mkdir(output, { recursive: true });
for (const name of ['column', 'window', 'carpet']) {
  for (const version of ['before', 'after']) {
    const file = `${name}-${version}`;
    const source = path.resolve(input, `${file}.png`);
    const { width, height } = await sharp(source).metadata();
    await sharp(source)
      .extract({ left: 12, top: 12, width: width - 24, height: height - 24 })
      .resize(960, 720, { fit: 'cover', position: 'centre', withoutEnlargement: true })
      .jpeg({ quality: 88, chromaSubsampling: '4:4:4', mozjpeg: true })
      .toFile(path.join(output, `${file}.jpg`));
    const { size } = await stat(path.join(output, `${file}.jpg`));
    console.log(`${file}: 960 × 720, ${Math.round(size / 1024)} KiB`);
  }
}
