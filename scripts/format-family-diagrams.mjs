// Small, code-drawn schematics shared by the article SVGs and RSS poster.
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="112" viewBox="0 0 160 112"><defs><pattern id="checker" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#e2e5eb"/><path d="M0 0h6v6H0zM6 6h6v6H6z" fill="#9aa5b5"/></pattern></defs>${body}</svg>`;
const rect = (x, y, width, height, fill, extra = '') => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}" ${extra}/>`;
const label = (x, y, value, fill = '#111627', size = 14) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="${size}" fill="${fill}">${value}</text>`;
const arrow = (x, y1, y2) => `<path d="M${x} ${y1}V${y2}m-4-5 4 5 4-5" fill="none" stroke="#7c9ff0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

let intensity = '', alpha = '';
for (let row = 0; row < 4; row++) for (let column = 0; column < 4; column++) {
  const x = 38 + column * 21, y = 14 + row * 21;
  const gray = (row * 4 + column) * 17;
  intensity += rect(x, y, 18, 18, `rgb(${gray},${gray},${gray})`, 'stroke="#7a83a3" stroke-width="0.5"');
  const brightness = [48, 112, 184, 248][row];
  alpha += rect(x, y, 18, 18, 'url(#checker)');
  alpha += rect(x, y, 18, 18, `rgb(${brightness},${brightness},${brightness})`, `opacity="${column / 3}"`);
}

const palette = ['#d8796d', '#81b292', '#7ea9e7', '#e1b96c'];
let indexed = rect(74, 8, 36, 32, '#dce5f5') + label(92, 31, '2', '#111627', 24) + arrow(92, 45, 60);
palette.forEach((color, i) => {
  indexed += rect(24 + i * 28, 68, 24, 28, color, i === 2 ? 'stroke="#7c9ff0" stroke-width="3"' : '');
  indexed += label(36 + i * 28, 87, i);
});

let rgba = '';
['R', 'G', 'B', 'A'].forEach((channel, i) => {
  const x = 14 + i * 34;
  rgba += rect(x, 12, 30, 28, ['#bc504b', '#387a50', '#416cac', 'url(#checker)'][i]);
  rgba += label(x + 15, 31, channel, i === 3 ? '#111627' : '#fff');
  rgba += `<path d="M${x + 15} 44 80 60" fill="none" stroke="#7a83a3" stroke-width="1.5"/>`;
});
rgba += arrow(80, 60, 70) + rect(62, 77, 36, 28, 'url(#checker)') + rect(62, 77, 36, 28, '#e07040', 'opacity="0.75"');

let yuv = rect(38, 8, 36, 28, '#e4e4e4') + label(56, 27, 'Y₀')
  + rect(86, 8, 36, 28, '#999') + label(104, 27, 'Y₁');
yuv += `<path d="M56 39v10m48-10v10" stroke="#7c9ff0" stroke-width="2"/>`;
yuv += rect(22, 51, 116, 28, '#7ea9e7') + label(80, 70, 'shared U + V', '#111627', 13);
yuv += `<path d="M56 82v9m48-9v9" stroke="#7c9ff0" stroke-width="2"/>`;
yuv += rect(38, 94, 36, 16, '#d6a66d') + rect(86, 94, 36, 16, '#916128');

export const familyDiagrams = { I: svg(intensity), IA: svg(alpha), CI: svg(indexed), RGBA: svg(rgba), YUV: svg(yuv) };
