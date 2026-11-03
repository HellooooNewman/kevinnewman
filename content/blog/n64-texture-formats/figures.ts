export const assetRoot = '/assets/blog/pandemonium';

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
    result: 'Same dimensions, same CI8 format, same base texel payload. The artwork changes, and the local version adds two smaller mip images with 320 bytes of additional packed texels.' },
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
  { id: 'carpet', file: 'original/carpet_border3.png', buttonLabel: 'Carpet', label: 'Original carpet · CI8 material', width: 16, height: 64 },
  { id: 'banner', file: 'original/banner_bottom.ia8.png', buttonLabel: 'Banner', label: 'Original banner · IA8 source', width: 64, height: 64 },
  { id: 'floor', file: vertexTexture.file, buttonLabel: 'Stone floor', label: 'Original floor · I8 source', width: 64, height: 64 },
] as const;

export const articleFigures = {
  FormatExplorer: { src: `${assetRoot}/format-comparison.png`, alt: 'The same Pandemonium carpet artwork represented in intensity, intensity-alpha, indexed-color, and RGBA formats, with texel alpha applied.', caption: 'I4 and I8 store intensity; IA adds independent alpha; CI4 and CI8 select palette entries; RGBA16 and RGBA32 store color directly. This comparison always applies texel alpha and uses illustrative conversions of carpet texture. Open the article to try all formats.' },
  VertexColorDemo: { src: `${assetRoot}/vertex-color-comparison.png`, alt: 'Three panels show the original main-branch grayscale floor texture, interpolated vertex colors, and their multiplication into a colored floor.', caption: 'original main-branch 64 × 64 I8 floor texture multiplied by interpolated vertex RGB. It uses 4 KiB of texel data. Vertex colors carry broad color variation; this technique was already present in the original game. Open the article to change the four corner colors.' },
  BannerGallery: { src: `${assetRoot}/banner-formats.png`, alt: 'The original main-branch IA8 banner cloth beside the local revision’s separate I4 background and IA4 ornament.', caption: 'Original cloth: IA8, 64 × 64, 4 KiB. Additional local background: I4, 32 × 80, 1.25 KiB. Additional local ornament: IA4, 64 × 128, 4 KiB. These are different assets, not interchangeable encodings of one image.' },
  MipmapGallery: { src: `${assetRoot}/carpet-mipmaps.png`, alt: 'The updated local carpet border at 16 × 64, 8 × 32, and 4 × 16, enlarged to the same display size.', caption: 'The local revision’s CI8 carpet border and two smaller mip images, based on texture artwork. Packed texel payloads are 1,024, 256, and 64 bytes; palette storage and TMEM row padding are additional. This named mip-image chain is absent from the pinned original main branch.' },
  TextureRevisionComparison: { src: `${assetRoot}/texture-revisions.png`, alt: 'Original main-branch and updated local floor and carpet textures shown side by side, with their formats and raw texel sizes.', caption: 'Original main commit d657844 compared with the local working version. Floor: 64 × 64 I8 to I4, 4 KiB to 2 KiB. Carpet: 16 × 64 CI8 in both, 1 KiB of base texels in both; the local mip images add 320 bytes. The unchanged IA8 banner cloth is omitted from this comparison. Source artwork changes are shown separately from format costs; no frame-rate improvement is claimed.' },
  SceneComparisons: { src: `${assetRoot}/scene-comparisons.jpg`, alt: 'Three before-and-after screenshot pairs compare the column and banner, window wall, and carpet views in Pandemonium’s boss room.', caption: 'Before screenshots on the left; after screenshots on the right. These supplied captures show the overall scene revision, including stonework, columns, banners, and carpet. Camera positions, geometry, and lighting also differ. Open the article to switch between three views in the reveal slider.' },
};
