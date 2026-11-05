/** Display sizes in the site's lowercase shorthand, using 1024-based steps.
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  const units = ['b', 'kb', 'mb', 'gb', 'tb'];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }
  return `${Number(size.toFixed(2))}${units[unit]}`;
}
