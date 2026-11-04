// A diagnostic image, drawn from pixel values rather than game artwork.
// It deliberately stresses palette size, horizontal chroma, and independent alpha.
export function makeTextureTestPattern() {
  const width = 64, height = 64;
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    let color: number[];
    if (y < 30) {
      const hue = x / width * 6;
      const value = (0.35 + 0.65 * y / 29) * 255;
      const rise = (hue % 1) * value, fall = value - rise;
      const rgb = [[value,rise,0], [fall,value,0], [0,value,rise], [0,fall,value], [rise,0,value], [value,0,fall]][Math.floor(hue)];
      color = [...rgb.map(Math.round), 255];
    } else if (y < 32 || y >= 46 && y < 48) {
      color = [20, 24, 32, 255];
    } else if (y < 46) {
      // Complementary colors share neutral chroma in a horizontal YUV pair.
      color = x % 2 ? [0,255,0,255] : [255,0,255,255];
    } else {
      color = [30, 190, 235, Math.round(x / (width - 1) * 255)];
    }
    pixels.set(color, (y * width + x) * 4);
  }
  return { width, height, pixels };
}
