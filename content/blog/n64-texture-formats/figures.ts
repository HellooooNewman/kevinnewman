export const assetRoot = '/assets/blog/pandemonium';

export const formatFamilies = [
  { id: 'I', name: 'Intensity', file: 'format-family-i.svg', sampleFormat: 'I4', sampleFile: 'format-family-i-texture.png', sampleHint: 'Grayscale; opacity follows brightness, so the bottom cannot fade independently.', description: 'One brightness value per texel.', alt: 'A grid of sixteen grayscale values progressing from black to white.' },
  { id: 'IA', name: 'Intensity + alpha', file: 'format-family-ia.svg', sampleFormat: 'IA8', sampleFile: 'format-family-ia-texture.png', sampleHint: 'Grayscale, with a separate transparency fade along the bottom.', description: 'Brightness and alpha, stored separately.', alt: 'Grayscale rows with independently changing opacity, revealing a checkerboard behind transparent texels.' },
  { id: 'CI', name: 'Color index', file: 'format-family-ci.svg', sampleFormat: 'CI4', sampleFile: 'format-family-ci-texture.png', sampleHint: 'The gradient becomes blocks of palette colors. Alpha is on or off with this RGBA16 palette.', description: 'An index selects a palette color.', alt: 'The stored index 2 points to the blue entry numbered 2 in a four-color example palette.' },
  { id: 'RGBA', name: 'Direct color', file: 'format-family-rgba.svg', sampleFormat: 'RGBA32', sampleFile: 'format-family-rgba-texture.png', sampleHint: 'The reference: smooth color, distinct magenta/green stripes, and a soft alpha fade.', description: 'Color and alpha stored directly.', alt: 'Red, green, blue, and alpha channels feed one colored texel with transparency.' },
  { id: 'YUV', name: 'Brightness + shared color', file: 'format-family-yuv.svg', sampleFormat: 'YUV16', sampleFile: 'format-family-yuv-texture.png', sampleHint: 'The magenta/green stripes lose their color when paired. The bottom stays opaque.', description: 'Two brightness samples share U and V.', alt: 'Two neighboring texels have separate Y brightness samples and share U and V color information.' },
] as const;

export const diagnosticTexture = { id: 'diagnostic', file: 'format-test-pattern.png', buttonLabel: 'Test pattern', label: 'Generated diagnostic pattern', width: 64, height: 64 } as const;

export const sceneComparisons = [
  { id: 'column', label: 'Columns & banner', title: 'Stonework, columns, and banner detail',
    before: 'scenes/column-before.jpg', after: 'scenes/column-after.jpg',
    beforeAlt: 'Before: pale columns, plain walls, and a red banner beside the boss-room door.',
    afterAlt: 'After: textured columns, detailed brickwork, a statue alcove, and a gold-patterned red banner.',
    caption: 'The column and doorway view brings the stonework, statue alcove, and banner ornament into focus.' },
  { id: 'window', label: 'Window wall', title: 'The window wall',
    before: 'scenes/window-before.jpg', after: 'scenes/window-after.jpg',
    beforeAlt: 'Before: a softly lit plain wall, pale column, and yellow window.',
    afterAlt: 'After: brickwork and statue alcoves beneath an illuminated window, with ornate red and gold banners.',
    caption: 'The window-wall view shows how the masonry and layered banner artwork change the room’s character.' },
  { id: 'carpet', label: 'Carpet & floor', title: 'Carpet and floor across the room',
    before: 'scenes/carpet-before.jpg', after: 'scenes/carpet-after.jpg',
    beforeAlt: 'Before: a red carpet with a simple border between pale floor panels, facing the boss-room door.',
    afterAlt: 'After: a more detailed carpet border and patterned stone floor leading toward the door, framed by textured columns.',
    caption: 'The wider floor view shows the revised carpet border and stone pattern together in the scene.' },
] as const;

export const vertexTexture = { file: 'original/floor-corner2.i8.png', format: 'I8', width: 64, height: 64, bytes: 4096 } as const;

export const revisionPairs = [
  { id: 'floor', label: 'Stone floor',
    original: { file: 'original/floor-corner2.i8.png', format: 'I8', width: 64, height: 64, bytes: 4096 },
    updated: { file: 'updated/floor6.i4.png', format: 'I4', width: 64, height: 64, bytes: 2048 },
    result: '50% less raw texel data at the same dimensions. The source artwork also changes, so this is a revision comparison, not an isolated encoding-quality test.' },
  { id: 'carpet', label: 'Carpet border',
    original: { file: 'original/carpet_border3.png', format: 'CI8', width: 16, height: 64, bytes: 1024 },
    updated: { file: 'updated/carpet_border8.ci8.png', format: 'CI8', width: 16, height: 64, bytes: 1024 },
    result: 'Same dimensions, same CI8 format, same base texel payload. The artwork changes, and the local version adds two smaller mip images with 320 b of additional packed texels.' },
] as const;

export const bannerAssets = [
  { file: 'original/banner_bottom.ia8.png', format: 'IA8', width: 64, height: 64, bytes: 4096, label: 'Original cloth · main' },
  { file: 'updated/banner_bottom_bg6.i4.png', format: 'I4', width: 32, height: 80, bytes: 1280, label: 'Updated background · local' },
  { file: 'updated/banner_bottom_detail2.ia4.png', format: 'IA4', width: 64, height: 128, bytes: 4096, label: 'Updated ornament · local' },
] as const;

export const carpetAssets = [
  { file: 'updated/carpet_border8.ci8.png', width: 16, height: 64, bytes: 1024, label: 'Updated base' },
  { file: 'updated/carpet_border8-mip1.ci8.png', width: 8, height: 32, bytes: 256, label: 'Updated mip 1' },
  { file: 'updated/carpet_border8-mip2.ci8.png', width: 4, height: 16, bytes: 64, label: 'Updated mip 2' },
] as const;

export const formatSamples = [
  { id: 'carpet', file: 'updated/carpet_border8.ci8.png', buttonLabel: 'Carpet', label: 'Detailed carpet border · source PNG', width: 16, height: 64 },
  { id: 'banner', file: 'updated/banner_mid_detail2.ia4.png', buttonLabel: 'Banner', label: 'Detailed banner ornament · source PNG', width: 64, height: 128 },
  { id: 'floor', file: 'updated/floor6.i4.png', buttonLabel: 'Stone floor', label: 'Detailed stone floor · source PNG', width: 64, height: 64 },
] as const;

export const explorerSamples = [diagnosticTexture, ...formatSamples] as const;

export const articleFigures = {
  ModelExample: { src: `${assetRoot}/models/columns-reference.jpg`, alt: 'The shaft, base, and transition intensity textures above four textured boss-room columns. The model uses 254 triangles and 6.44 kb of packed texels.', caption: 'Shaft: 32 × 128 I8, 4 kb. Base: 32 × 32 I4, 512 b. Transition: 32 × 124 I4, 1,984 b. These sizes total 6,592 b across three textures; they are used by separate materials. Open the article to orbit the 254-triangle model and compare texture-only, vertex-color, combined, and wireframe views. The browser viewer approximates N64 intensity materials and three-point filtering, without full RDP emulation.' },
  FormatFamilies: { src: `${assetRoot}/format-families.png`, alt: 'Five format diagrams and diagnostic samples reveal palette banding, independent alpha, and lost color in fine YUV stripes.', caption: 'Each 64 × 64 test pattern has a color gradient at the top, one-pixel magenta/green stripes in the middle, and an alpha fade at the bottom. RGBA32 is the reference. CI4 reduces the gradient to palette colors; YUV16 averages the stripes’ color and loses alpha. I4: 2 kb; IA8: 4 kb; CI4: 2 kb plus 32 b of palette; RGBA32: 16 kb; YUV16: 8 kb. Packed sizes exclude headers, padding, mipmaps, and compression. These are illustrative conversions; YUV16 is approximate.' },
  FormatExplorer: { src: `${assetRoot}/format-comparison.png`, alt: 'A generated color-gradient, stripe, and alpha test pattern represented in ten texture formats, with packed sizes.', caption: 'The 64 × 64 diagnostic pattern makes palette banding, alpha precision, and YUV shared color visible. Texel alpha is applied where available. YUV16 is an opaque BT.601 4:2:2 approximation. Sizes include a full RGBA16 palette for CI, before headers, padding, mipmaps, or compression. Open the article to compare this pattern or the newer detailed game artwork at native PNG precision.' },
  VertexColorDemo: { src: `${assetRoot}/vertex-color-comparison.png`, alt: 'Three panels show the original main-branch grayscale floor texture, interpolated vertex colors, and their multiplication into a colored floor.', caption: 'original main-branch 64 × 64 I8 floor texture multiplied by interpolated vertex RGB. It uses 4 kb of texel data. Vertex colors carry broad color variation; this technique was already present in the original game. Open the article to change the four corner colors.' },
  BannerGallery: { src: `${assetRoot}/banner-formats.png`, alt: 'The original main-branch IA8 banner cloth beside the local revision’s separate I4 background and IA4 ornament.', caption: 'Original cloth: IA8, 64 × 64, 4 kb. Additional local background: I4, 32 × 80, 1.25 kb. Additional local ornament: IA4, 64 × 128, 4 kb. These are different assets, not interchangeable encodings of one image.' },
  MipmapGallery: { src: `${assetRoot}/carpet-mipmaps.png`, alt: 'The updated local carpet border at 16 × 64, 8 × 32, and 4 × 16, enlarged to the same display size.', caption: 'The local revision’s CI8 carpet border and two smaller mip images, based on texture artwork. Packed texel payloads are 1,024, 256, and 64 b; palette storage and TMEM row padding are additional. This named mip-image chain is absent from the pinned original main branch.' },
  TextureRevisionComparison: { src: `${assetRoot}/texture-revisions.png`, alt: 'Original main-branch and updated local floor and carpet textures shown side by side, with their formats and raw texel sizes.', caption: 'Original main commit d657844 compared with the local working version. Floor: 64 × 64 I8 to I4, 4 kb to 2 kb. Carpet: 16 × 64 CI8 in both, 1 kb of base texels in both; the local mip images add 320 b. The unchanged IA8 banner cloth is omitted from this comparison. Source artwork changes are shown separately from format costs; no frame-rate improvement is claimed.' },
  SceneComparisons: { src: `${assetRoot}/scene-comparisons.jpg`, alt: 'Three before-and-after screenshot pairs compare the column and banner, window wall, and carpet views in Pandemonium’s boss room.', caption: 'Before screenshots on the left; after screenshots on the right. These supplied captures show the overall scene revision, including stonework, columns, banners, and carpet. Camera positions, geometry, and lighting also differ. Open the article to switch between three views in the reveal slider.' },
};
