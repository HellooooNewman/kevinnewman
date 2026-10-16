// The widths next/image may put in a srcset. scripts/optimize-images.mjs
// pre-renders a WebP at every one of them, so both read this list.
//
// deviceSizes cover full-width and wide images (hero, lightbox, phones);
// imageSizes cover the small ones (job logos at 2x, grid cards at 1x, the
// now-panel preview).
export const deviceSizes = [640, 960, 1280, 1920];
export const imageSizes = [96, 256, 384];
