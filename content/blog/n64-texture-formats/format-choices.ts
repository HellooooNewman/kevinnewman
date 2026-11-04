export const formatChoices = [
  {
    id: 'stone', title: 'Can the mesh supply the color?',
    description: 'For a tinted stone floor, I’d start with I4. I8 costs twice as much at the same dimensions; use it if the brightness steps in I4 spoil the shading. Both examples get the same tint from vertex color.',
    samples: [
      { file: 'choice-stone-i4.png', label: 'I4 · 16 brightness levels', format: 'I4', width: 64, height: 64, alt: 'Stone detail with sixteen intensity levels and a warm vertex tint.' },
      { file: 'choice-stone-i8.png', label: 'I8 · 256 brightness levels', format: 'I8', width: 64, height: 64, alt: 'The same stone detail and tint with finer intensity precision.' },
    ],
  },
  {
    id: 'color', title: 'Does the artwork need its own colors?',
    description: 'The carpet’s pattern needs color in the texture. CI4 has 16 palette entries; CI8 has 256. If neither palette keeps the colors you need, try RGBA16, at 2 b per texel.',
    samples: [
      { file: 'choice-carpet-ci4.png', label: 'CI4 · 16 palette entries', format: 'CI4', width: 16, height: 64, alt: 'The detailed red and gold carpet border reduced to a sixteen-entry palette.' },
      { file: 'choice-carpet-ci8.png', label: 'CI8 · 256 palette entries', format: 'CI8', width: 16, height: 64, alt: 'The same carpet border with a larger palette retaining finer color changes.' },
    ],
  },
  {
    id: 'alpha', title: 'Does it need a hard edge or a soft fade?',
    description: 'IA4 works for a grayscale cutout such as a banner ornament. A glow needs the softer alpha of IA8; IA16 adds precision. For an effect with its own changing colors and smooth alpha, use RGBA32.',
    samples: [
      { file: 'choice-glow-ia4.png', label: 'IA4 · on/off alpha', format: 'IA4', width: 64, height: 64, alt: 'A glow encoded as IA4 becomes a solid disc with a hard transparency edge.' },
      { file: 'choice-glow-ia8.png', label: 'IA8 · 16 alpha levels', format: 'IA8', width: 64, height: 64, alt: 'The same glow encoded as IA8 fades gradually into the background.' },
    ],
  },
  {
    id: 'resolution', title: 'How big is it on screen?',
    description: 'Up close, the larger texel grid can help. On a tiny pickup, that detail may disappear. Choose dimensions for the view; a detailed mesh does not automatically need a large texture.',
    samples: [
      { file: 'choice-resolution-32.png', label: '32 × 32 · I4', format: 'I4', width: 32, height: 32, alt: 'The stone texture at thirty-two by thirty-two texels, enlarged for close inspection.' },
      { file: 'choice-resolution-64.png', label: '64 × 64 · I4', format: 'I4', width: 64, height: 64, alt: 'The same stone artwork at sixty-four by sixty-four texels, preserving finer detail.' },
    ],
  },
] as const;
