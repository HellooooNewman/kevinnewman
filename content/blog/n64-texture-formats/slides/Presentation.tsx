import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import SlideDeck, { type Slide } from '@/components/SlideDeck/SlideDeck';
import SceneComparisons from '../SceneComparisons';
import FormatFamilies from '../FormatFamilies';
import VertexColorDemo from '../VertexColorDemo';
import ColorCombinerDemo from '../ColorCombinerDemo';
import ModelExample from '../ModelExample';
import FormatExplorer from '../FormatExplorer';
import { assetRoot, carpetAssets } from '../figures';
import { formatChoices } from '../format-choices';
import { formatBytes, formats, textureBudget } from '../texture-math';
import TmemFit from './TmemFit';
import SameBudget from './SameBudget';
import s from './slides.module.css';

const ARTICLE = '/blog/n64-texture-formats/';
const LIBDRAGON = 'https://github.com/n64brew/libdragon/blob/f26e1c16145e4d6ad7e391e1306513d684083c02';

function Demo({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <div className={s.demo}>
    <header className={s.demoHeader}><p className={s.kicker}>{kicker}</p><h2>{title}</h2></header>
    {children}
  </div>;
}

const stores: Record<string, string> = {
  I4: '16 brightness levels',
  I8: '256 brightness levels',
  IA4: '3 intensity bits + 1 alpha bit',
  IA8: '4 intensity bits + 4 alpha bits',
  IA16: '8 intensity bits + 8 alpha bits',
  CI4: 'An index into a 16-color palette',
  CI8: 'An index into a 256-color palette',
  RGBA16: '5 bits per RGB channel + 1 alpha bit',
  RGBA32: '8 bits each for red, green, blue, and alpha',
  YUV16: 'Brightness per texel, U and V shared by a pair. No alpha',
};

function BitsTable() {
  return <table className={s.bits}>
    <thead><tr><th scope="col">Format</th><th scope="col">Bits / texel</th><th scope="col">What it stores</th><th scope="col">64 × 64</th></tr></thead>
    <tbody>{formats.map((format) => <tr key={format.id}>
      <th scope="row">{format.id}</th>
      <td><span className={s.bitBar} style={{ width: `${format.bits / 32 * 100}%` }} /><span>{format.bits}</span></td>
      <td>{stores[format.id]}</td>
      <td>{formatBytes(textureBudget(64, 64, format.id).texels)}</td>
    </tr>)}</tbody>
  </table>;
}

function ChoiceSlide({ index }: { index: number }) {
  const choice = formatChoices[index];
  return <div className={s.choice}>
    <header>
      <p className={s.kicker}>Which format would I use? · {index + 1} of {formatChoices.length}</p>
      <h2>{choice.title}</h2>
    </header>
    <div className={s.choiceSamples}>{choice.samples.map((sample) => {
      const cost = textureBudget(sample.width, sample.height, sample.format);
      return <figure key={sample.file}>
        <div className={s.pixelFrame}><Image src={`${assetRoot}/${sample.file}`} alt={sample.alt} fill sizes="40vw" unoptimized /></div>
        <figcaption><strong>{sample.label}</strong><span>{formatBytes(cost.texels + cost.paletteBytes)}{cost.paletteBytes ? ' with palette' : ' of texels'}</span></figcaption>
      </figure>;
    })}</div>
    {choice.id === 'color' && <p className={s.repeatNote}>One 16 × 64 tile, repeated across each preview.</p>}
    {choice.id === 'resolution' && <div className={s.screenSize}>
      <span>Both at 12 × 12 screen pixels:</span>
      {choice.samples.map((sample) => <figure key={sample.file}>
        <Image src={`${assetRoot}/${sample.file.replace('.png', '-screen.png')}`} alt={`${sample.width} × ${sample.height} source reduced to twelve by twelve screen pixels`} width={96} height={96} unoptimized />
        <figcaption>{sample.width} × {sample.height}</figcaption>
      </figure>)}
    </div>}
    <p className={s.choiceText}>{choice.description}</p>
  </div>;
}

function Arrow() {
  return <svg className={s.arrow} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>;
}

const slides: Slide[] = [
  {
    id: 'title', title: 'Texturing for the N64', layout: 'bleed',
    notes: 'Hi! This is about texturing Pandemonium, the boss battle we built for the N64brew game jam.\n\nI’ll cover texture formats, vertex colors, and the color combiner, with the boss room as the running example.\n\nAll Pandemonium textures were made by my teammate BoxingBruin.',
    content: <div className={s.title}>
      <div className={s.titleText}>
        <p className={s.kicker}>N64brew · Pandemonium</p>
        <h1>Texturing for the N64</h1>
        <p className={s.lead}>How texture formats, vertex colors, and the color combiner shape Pandemonium’s boss room.</p>
        <p className={s.byline}>Kevin Newman <span aria-hidden="true">·</span> textures by BoxingBruin</p>
        <p className={s.hint}>Press <kbd>→</kbd> or <kbd>Space</kbd> to begin</p>
      </div>
      <div className={s.titleArt}>
        <Image src={`${assetRoot}/scenes/carpet-after.jpg`} alt="Pandemonium’s boss room: a red carpet leads past textured columns to the door" fill sizes="(max-width: 800px) 100vw, 55vw" loading="eager" fetchPriority="high" />
      </div>
    </div>,
  },
  {
    id: 'jam', title: 'Game-jam chaos',
    notes: 'We built Pandemonium with very little time for optimization. We didn’t get to check every texture’s size or format, and the room wasn’t textured as nicely as we wanted.\n\nLots of overdraw. Z-fighting on the floor. Assets that didn’t make it into the final build. Usual game-jam chaos.\n\nRevisiting the scene gave us time to improve the artwork and look at what each surface actually needed.',
    content: <div className={s.stack}>
      <p className={s.kicker}>The jam</p>
      <h2>Built fast. Optimized… later.</h2>
      <ul className={s.chaos}>
        <li>Texture sizes and formats never checked</li>
        <li>Lots of overdraw</li>
        <li>Z-fighting on the floor</li>
        <li>Assets that missed the final build</li>
      </ul>
      <p className={s.lead}>Coming back gave us time to improve the art, and to ask what each surface actually needed.</p>
    </div>,
  },
  {
    id: 'before-after', title: 'Before and after', layout: 'demo',
    notes: 'Drag the divider across each view.\n\nOne example: the stone floor went from I8 to I4. 4kb down to 2kb, still at 64 × 64. The mesh still supplies its color.\n\nCamera positions, geometry, and lighting also differ, so this is the whole scene revision, not only formats.',
    content: <Demo kicker="Before → after" title="The same room, revisited"><SceneComparisons /></Demo>,
  },
  {
    id: 'texel', title: 'What is a texel?',
    notes: 'A texel, or texture element, is one pixel in a texture. So a 64 × 64 texture contains 4,096 texels.\n\nThis is the updated stone floor, blown up so you can see each one.',
    content: <div className={s.split}>
      <div className={s.stack}>
        <p className={s.kicker}>Vocabulary</p>
        <h2>A texel is one pixel in a texture</h2>
        <p className={s.huge}>64 × 64 = <strong>4,096</strong> texels</p>
      </div>
      <div className={s.texelArt}>
        <Image src={`${assetRoot}/updated/floor6.i4.png`} alt="The updated 64 by 64 stone floor texture, enlarged so each texel is visible" width={64} height={64} unoptimized />
        <span className={s.texelGrid} aria-hidden="true" />
        <span className={s.texelPick} aria-hidden="true"><span>1 texel</span></span>
      </div>
    </div>,
  },
  {
    id: 'tmem', title: '4kb of TMEM',
    notes: 'The N64’s graphics hardware has 4kb of texture memory, called TMEM.\n\nThat’s space for the textures being used while drawing, not a limit on all the artwork in the game.\n\nThe RDP can only sample texels already loaded there, so textures that exceed that space must be drawn in smaller sections, with new texture data loaded between draws.',
    content: <div className={s.stack}>
      <p className={s.kicker}>The budget</p>
      <h2>The RDP samples from just <span className={s.accent}>4kb</span> of TMEM</h2>
      <div className={s.cards}>
        <div><strong>Working memory</strong><p>Space for the textures being used while drawing. Not a limit on all the artwork in a game.</p></div>
        <div><strong>Only what’s loaded</strong><p>The RDP can only sample texels already loaded into TMEM.</p></div>
        <div><strong>Too big?</strong><p>Draw it in smaller sections, loading new texture data between draws.</p></div>
      </div>
    </div>,
  },
  {
    id: 'tmem-fit', title: 'What fits in one load?', layout: 'demo',
    notes: 'Pick a format and a size. 64 × 64 RGBA16 is 8kb: twice TMEM, so it has to be drawn in two sections.\n\nThe same 64 × 64 in I4 is 2kb and fits with room to spare.\n\nCI formats keep their palette in the upper half of TMEM, so the texels only get 2kb. CI8 at 64 × 64 no longer fits in one load.',
    content: <Demo kicker="Try it" title="What fits in one load?"><TmemFit /></Demo>,
  },
  {
    id: 'families', title: 'Format families', layout: 'demo',
    notes: 'The letters in a format name tell you what each texel stores.\n\nI is intensity, IA adds alpha, CI is an index into a palette, RGBA is direct color, and YUV shares color between horizontal pairs.\n\nThe test pattern has a color gradient, one-pixel magenta and green stripes, and an alpha fade. Watch the stripes lose their color in YUV, and the gradient band in CI4.',
    content: <Demo kicker="Reading the name" title="What the letters mean"><FormatFamilies /></Demo>,
  },
  {
    id: 'bits', title: 'Bits per texel', layout: 'demo',
    notes: 'Fewer bits can leave room for more texels, at the cost of brightness levels, colors, or transparency precision.\n\nThe right column is the cost of a 64 × 64 texture: anywhere from 2kb to 16kb.\n\nThese layouts follow libdragon’s texture-format definitions.',
    content: <div className={s.demo}>
      <header className={s.demoHeader}><p className={s.kicker}>Fewer bits, more texels</p><h2>Every format is a trade</h2></header>
      <BitsTable />
    </div>,
  },
  ...formatChoices.map((choice, index): Slide => ({
    id: `choice-${choice.id}`, title: choice.title, layout: 'demo',
    notes: [
      'I’d start with what the surface needs. Each pair uses the same source, so you can see what changes when you spend more memory.\n\nFor a tinted stone floor, I’d start with I4. I8 costs twice as much at the same dimensions, so only use it if the I4 brightness steps spoil the shading.',
      'The carpet’s pattern needs color in the texture itself. CI4 has 16 palette entries and CI8 has 256.\n\nIf neither palette keeps the colors you need, try RGBA16, at 2 bytes per texel.',
      'IA4 works for a grayscale cutout, like a banner ornament. A glow needs the softer alpha of IA8, and IA16 adds more precision.\n\nFor an effect with its own changing colors and smooth alpha, use RGBA32.',
      'Up close, a larger texel grid can help. On a tiny pickup, that detail disappears.\n\nAt 12 × 12 screen pixels, the 32 × 32 and 64 × 64 versions look almost the same, but one costs four times as much. A detailed mesh doesn’t automatically need a large texture.',
    ][index],
    content: <ChoiceSlide index={index} />,
  })),
  {
    id: 'special-cases', title: 'YUV16 and mipmaps',
    notes: 'For colored cutouts, RGBA16 or CI with an RGBA16 palette gives you on/off alpha.\n\nYUV16 is a separate case for video frames or photographs: it keeps brightness detail but shares color between neighboring texels, and has no alpha. It uses libdragon’s dedicated YUV conversion mode.\n\nFor surfaces that recede into the distance, mipmaps can reduce shimmering. They add storage, so budget for the levels that need to be loaded together.',
    content: <div className={s.stack}>
      <p className={s.kicker}>Special cases</p>
      <h2>A few special cases</h2>
      <div className={s.cards}>
        <div>
          <div className={s.cardArt}><Image src={`${assetRoot}/format-family-yuv-texture.png`} alt="The test pattern in YUV16: the fine stripes lose their color and the alpha fade becomes opaque" width={64} height={64} unoptimized /></div>
          <strong>YUV16</strong><p>For video frames or photographs. Keeps brightness per texel, shares color between neighbors, and has no alpha. Needs a dedicated conversion mode.</p>
        </div>
        <div>
          <div className={s.cardArt}>{carpetAssets.map((mip) => <Image key={mip.file} src={`${assetRoot}/${mip.file}`} alt={`Carpet ${mip.label.toLowerCase()}, ${mip.width} × ${mip.height}`} width={mip.width} height={mip.height} unoptimized style={{ height: `${mip.height / 64 * 100}%` }} />)}</div>
          <strong>Mipmaps</strong><p>Smaller copies for surfaces that recede into the distance. They reduce shimmering, but add storage, so budget for the levels loaded together.</p>
        </div>
        <div>
          <div className={s.cardArt}><Image src={`${assetRoot}/format-family-ci-texture.png`} alt="The test pattern as CI4 with an RGBA16 palette: color blocks and on/off alpha" width={64} height={64} unoptimized /></div>
          <strong>Colored cutouts</strong><p>RGBA16, or CI with an RGBA16 palette, gives on/off alpha with color.</p>
        </div>
      </div>
    </div>,
  },
  {
    id: 'vertex-colors', title: 'Vertex colors',
    notes: 'If you can get away with a simple color, this is definitely the way to go.\n\nA grayscale stone texture can still produce a colored floor. The texture supplies fine detail. Colors stored at the mesh’s vertices supply broader variation.\n\nThe renderer blends those corner colors across the triangle, then multiplies the texture by that color.',
    content: <div className={s.stack}>
      <p className={s.kicker}>Vertex colors</p>
      <h2>Let the mesh carry the color</h2>
      <pre className={s.formula}><code>surface RGB = texture intensity × interpolated vertex RGB</code></pre>
      <div className={s.equation}>
        <figure>
          <div className={s.pixelFrame}><Image src={`${assetRoot}/original/floor-corner2.i8.png`} alt="The original grayscale floor texture" fill sizes="22vw" unoptimized /></div>
          <figcaption><strong>Texture</strong><span>Fine detail · 64 × 64 I8</span></figcaption>
        </figure>
        <span aria-hidden="true">×</span>
        <figure>
          <div className={s.pixelFrame}><Image src={`${assetRoot}/vertex-shading.png`} alt="Four corner colors blended smoothly across the quad" fill sizes="22vw" unoptimized /></div>
          <figcaption><strong>Vertex colors</strong><span>Broad variation, blended</span></figcaption>
        </figure>
        <span aria-hidden="true">=</span>
        <figure>
          <div className={s.pixelFrame}><Image src={`${assetRoot}/floor-vertex-color.png`} alt="The grayscale floor tinted by the vertex colors" fill sizes="22vw" unoptimized /></div>
          <figcaption><strong>Surface</strong><span>Colored floor, same texels</span></figcaption>
        </figure>
      </div>
    </div>,
  },
  {
    id: 'vertex-demo', title: 'Vertex color demo', layout: 'demo',
    notes: 'This is the original 64 × 64 I8 floor. Change the corner colors and watch them blend across the two triangles.\n\nTry making all the vertices white: that’s the texture alone.\n\nThe original floor already used this technique, and the revision keeps it.',
    content: <Demo kicker="Try it" title="Texture × vertex colors"><VertexColorDemo /></Demo>,
  },
  {
    id: 'same-budget', title: 'Same 2kb, four times the texels',
    notes: 'For 2kb of raw texels, RGBA16 gives you 32 × 32, while I4 gives you 64 × 64: four times as many texels.\n\nPutting broad color changes in the vertices can preserve a larger grid for surface detail.\n\nCaveat: vertex colors don’t increase the screen resolution or add texture pixels by themselves. Their gradients follow the mesh, and vertex data also costs memory.',
    content: <div className={s.stack}>
      <p className={s.kicker}>Spend the bits on detail</p>
      <h2>Same 2kb. Four times the texels.</h2>
      <SameBudget />
      <p className={s.note}>Vertex colors don’t add texture pixels. Their gradients follow the mesh, and vertex data costs memory too.</p>
    </div>,
  },
  {
    id: 'combiner', title: 'The color combiner',
    notes: 'The texture format tells us what is stored. The color combiner decides how those samples mix with the other inputs. Vertex colors only affect the result if the material’s formula uses them.\n\nEach cycle runs (A − B) × C + D, separately for RGB and alpha. The letters are input slots, like the fields in Fast64.\n\nThe available inputs depend on the slot. Primitive is a fixed color from the material or drawing code; here it tints the columns. Environment is a second fixed color.',
    content: <div className={s.stack}>
      <p className={s.kicker}>The color combiner</p>
      <h2>One formula mixes every material</h2>
      <p className={s.slotFormula} aria-label="A minus B, times C, plus D">(<b>A</b> − <b>B</b>) × <b>C</b> + <b>D</b></p>
      <p className={s.center}>Run separately for RGB and alpha, once or twice per pixel.</p>
      <div className={s.inputs}>
        <div><strong>Texture 0 / 1</strong><span>Sampled color and alpha</span></div>
        <div><strong>Shade</strong><span>Vertex color or lighting</span></div>
        <div><strong>Primitive</strong><span>A fixed material color</span></div>
        <div><strong>Environment</strong><span>A second fixed color</span></div>
      </div>
    </div>,
  },
  {
    id: 'recipes', title: 'Combiner recipes',
    notes: 'Some recipes. Texture only: everything zero, D is Texture 0. Vertex colors have no effect.\n\nModulate: Texture 0 times Shade. That’s the vertex-color floor.\n\nLerp: (Texture 1 − Texture 0) × amount + Texture 0. Amount 0 gives Texture 0, amount 1 gives Texture 1. Both textures must fit in TMEM together.',
    content: <div className={s.stack}>
      <p className={s.kicker}>Filling the slots</p>
      <h2>Three recipes</h2>
      <div className={s.recipes}>
        <div><strong>Texture only</strong><code>(0 − 0) × 0 + <b>Texture 0</b></code><span>Shade is ignored</span></div>
        <div><strong>Modulate</strong><code>(<b>Texture 0</b> − 0) × <b>Shade</b> + 0</code><span>The vertex-colored floor</span></div>
        <div><strong>Lerp</strong><code>(<b>Texture 1</b> − <b>Texture 0</b>) × <b>amount</b> + <b>Texture 0</b></code><span>0 gives Texture 0, 1 gives Texture 1</span></div>
      </div>
    </div>,
  },
  {
    id: 'combiner-demo', title: 'Color combiner demo', layout: 'demo',
    notes: 'Switch between the recipes. The column material multiplies the texture by vertex shading in cycle 1, then tints with primitive color in cycle 2.\n\nIn a two-cycle material, Combined is the first cycle’s output, used as an input to the second.\n\nThe two-texture blend uses primitive alpha as the mix amount, then applies shade in cycle 2. These two 32 × 32 I4 patches use 1kb in total.\n\nThis preview doesn’t emulate RDP fixed-point precision, filtering, or fog.',
    content: <Demo kicker="Try it" title="Build a material"><ColorCombinerDemo /></Demo>,
  },
  {
    id: 'libdragon', title: 'In libdragon',
    notes: 'For the column settings, this is the equivalent libdragon configuration.\n\nFast64 stores the combiner choices in the exported material, which the model pipeline must apply when drawing. Changing the PNG alone cannot change that formula.',
    content: <div className={s.stack}>
      <p className={s.kicker}>In code</p>
      <h2>The column material in libdragon</h2>
      <div className={s.code}>
        <pre><code>
          <span className={s.fn}>rdpq_mode_combiner</span>(<span className={s.fn}>RDPQ_COMBINER2</span>({'\n'}
          {'    '}(<span className={s.kw}>TEX0</span>, <span className={s.num}>0</span>, <span className={s.kw}>SHADE</span>, <span className={s.num}>0</span>),{'       '}(<span className={s.num}>0</span>, <span className={s.num}>0</span>, <span className={s.num}>0</span>, <span className={s.num}>1</span>),{'\n'}
          {'    '}(<span className={s.kw}>COMBINED</span>, <span className={s.num}>0</span>, <span className={s.kw}>PRIM</span>, <span className={s.num}>0</span>),{'   '}(<span className={s.num}>0</span>, <span className={s.num}>0</span>, <span className={s.num}>0</span>, <span className={s.kw}>COMBINED</span>){'\n'}
          ));{'\n'}
          <span className={s.fn}>rdpq_set_prim_color</span>(<span className={s.fn}>RGBA32</span>(<span className={s.num}>255</span>, <span className={s.num}>255</span>, <span className={s.num}>255</span>, <span className={s.num}>255</span>));
        </code></pre>
        <ol className={s.annotations}>
          <li><b>Cycle 1 RGB</b> Texture 0 × Shade</li>
          <li><b>Cycle 1 alpha</b> Forced to 1</li>
          <li><b>Cycle 2 RGB</b> Combined × Primitive</li>
          <li><b>Cycle 2 alpha</b> Keep Combined</li>
        </ol>
      </div>
      <p className={s.note}>Fast64 stores these choices in the exported material. Changing the PNG alone can’t change the formula.</p>
    </div>,
  },
  {
    id: 'pipeline', title: 'Beyond the combiner',
    notes: 'The combiner is only part of the material.\n\nLighting supplies shade before this step. The later blender handles mixing with the framebuffer. Alpha testing can discard cutout pixels.\n\nStandard fog also uses the blender, often borrowing shade alpha for depth, so it needs care alongside custom alpha formulas.',
    content: <div className={s.stack}>
      <p className={s.kicker}>The bigger picture</p>
      <h2>The combiner is only part of the material</h2>
      <ol className={s.pipeline}>
        <li><strong>Shade</strong><span>Vertex colors and lighting, blended across the triangle</span></li>
        <li><strong>Texture samples</strong><span>From TMEM, picked by the UVs</span></li>
        <li data-focus="true"><strong>Color combiner</strong><span>(A − B) × C + D, for RGB and alpha</span></li>
        <li><strong>Blender</strong><span>Mixes with the framebuffer. Fog lives here, often borrowing shade alpha</span></li>
      </ol>
      <p className={s.note}>Alpha testing can discard cutout pixels. Fog needs care alongside custom alpha formulas.</p>
    </div>,
  },
  {
    id: 'columns', title: 'The boss-room columns in 3D', layout: 'demo',
    notes: 'Putting it together on a real model. On an N64 model, the UVs select the texture samples and the vertex data supplies shade.\n\nThree intensity textures: the shaft is 32 × 128 I8, the base and transition are I4. 254 triangles.\n\nSwitch between texture only, vertex colors, combined, and wireframe. The browser viewer approximates N64 intensity materials and three-point filtering, without full RDP emulation.',
    content: <Demo kicker="Putting it together" title="Textures, shade, and combiner on a real model"><ModelExample /></Demo>,
  },
  {
    id: 'room-changes', title: 'What changed in the room?',
    notes: 'The floor’s artwork also changed, so the before-and-after shows more than a format conversion.\n\nThe carpet still uses CI8. Its mipmaps actually add memory, but help stop the fine pattern shimmering in the distance.\n\nThe banner layers show another trade-off: spending bits on independent alpha where a decorative cutout needs it.',
    content: <div className={s.stack}>
      <p className={s.kicker}>The revision</p>
      <h2>What changed in the room?</h2>
      <div className={s.changes}>
        <figure>
          <div className={s.changeArt}>
            <Image src={`${assetRoot}/original/floor-corner2.i8.png`} alt="Original I8 stone floor" width={64} height={64} unoptimized />
            <Arrow />
            <Image src={`${assetRoot}/updated/floor6.i4.png`} alt="Updated I4 stone floor" width={64} height={64} unoptimized />
          </div>
          <figcaption><strong>Stone floor</strong><span>64 × 64 I8 → I4</span><b>4kb → 2kb</b></figcaption>
        </figure>
        <figure>
          <div className={s.changeArt}>
            <Image className={s.tall} src={`${assetRoot}/original/carpet_border3.png`} alt="Original CI8 carpet border" width={16} height={64} unoptimized />
            <Arrow />
            <Image className={s.tall} src={`${assetRoot}/updated/carpet_border8.ci8.png`} alt="Updated CI8 carpet border" width={16} height={64} unoptimized />
          </div>
          <figcaption><strong>Carpet border</strong><span>16 × 64 CI8 in both</span><b>Same 1kb, plus mipmaps</b></figcaption>
        </figure>
        <figure>
          <div className={s.changeArt}>
            <Image className={s.tall} src={`${assetRoot}/updated/banner_bottom_bg6.i4.png`} alt="I4 banner background layer" width={32} height={80} unoptimized />
            <span className={s.plus} aria-hidden="true">+</span>
            <Image className={s.tall} src={`${assetRoot}/updated/banner_bottom_detail2.ia4.png`} alt="IA4 banner ornament layer" width={64} height={128} unoptimized />
          </div>
          <figcaption><strong>Banner layers</strong><span>I4 background + IA4 ornament</span><b>Brightness and alpha, separate jobs</b></figcaption>
        </figure>
      </div>
    </div>,
  },
  {
    id: 'explorer', title: 'Try the formats yourself', layout: 'demo',
    notes: 'Last demo. Pick a source and a format. Watch the palette for the CI formats, and the alpha fade on the test pattern.\n\nSizes include a full RGBA16 palette for CI, before headers, padding, mipmaps, or compression.',
    content: <Demo kicker="Try it" title="Try the formats yourself"><FormatExplorer /></Demo>,
  },
  {
    id: 'totals', title: 'The room still grew',
    notes: 'The floor saves 2kb. But the updated room still has more texture data and geometry overall.\n\nAsset totals include room effects. Texel estimates exclude palettes, external mipmaps, padding, and headers.\n\nSaving memory on one surface buys room to spend it where the art needs it.',
    content: <div className={s.stack}>
      <p className={s.kicker}>Conclusion</p>
      <h2>The floor saved 2kb. The room still grew.</h2>
      <table className={s.totals}>
        <thead><tr><th scope="col">Room assets</th><th scope="col">Original</th><th scope="col">Updated</th></tr></thead>
        <tbody>{([
          ['Model files', 10, 12, '10', '12'],
          ['Triangles', 1316, 2321, '1,316', '2,321'],
          ['Material slots', 32, 72, '32', '72'],
          ['Unique textures', 18, 51, '18', '51'],
          ['Packed texels (est.)', 69, 131.56, '69kb', '131.56kb'],
        ] as const).map(([label, before, after, beforeText, afterText]) => <tr key={label}>
          <th scope="row">{label}</th>
          <td><span className={s.totalBar} style={{ width: `${before / after * 100}%` }} />{beforeText}</td>
          <td><span className={s.totalBar} data-after="true" style={{ width: '100%' }} />{afterText}</td>
        </tr>)}</tbody>
      </table>
      <p className={s.note}>Totals include room effects. Texel estimates exclude palettes, external mipmaps, padding, and headers.</p>
    </div>,
  },
  {
    id: 'thanks', title: 'Thanks',
    notes: 'During the jam, getting the game finished took priority. Coming back gave us time to revisit choices like the floor’s format, and bring the stonework and banners closer to how we wanted them to look.\n\nThe full article has every demo from today, plus links into libdragon’s documentation. Thanks!',
    content: <div className={s.stack}>
      <p className={s.kicker}>Thanks!</p>
      <h2>Ship the jam. Then revisit.</h2>
      <p className={s.lead}>Getting the game finished came first. Coming back let us choose formats on purpose, and bring the stonework and banners closer to how we wanted them.</p>
      <ul className={s.links}>
        <li><Link href={ARTICLE}>Read the article<span>kevinnewman.ca/blog/n64-texture-formats</span></Link></li>
        <li><Link href="/projects/pandemonium/">Pandemonium<span>The N64brew game-jam boss battle</span></Link></li>
        <li><a href={`${LIBDRAGON}/include/rdpq_macros.h#L310-L410`}>libdragon combiner docs<span>Formula and input definitions</span></a></li>
        <li><a href="https://github.com/Boxingbruin">BoxingBruin<span>Every texture in the room</span></a></li>
      </ul>
    </div>,
  },
];

export default function Presentation() {
  return <SlideDeck title="Texturing for the N64" articleHref={ARTICLE} slides={slides} />;
}
