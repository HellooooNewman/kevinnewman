# Kevin Newman - Personal Website

Personal portfolio site built with Next.js (App Router, static export). The
space theme - starfield, moon, mountains - carries over from the original
Angular version, rebuilt for real prerendered HTML, SEO, and mobile.

## Commands

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Dev server at http://localhost:4301                    |
| `npm run build`     | Static export to `out/` (deploy that folder)           |
| `npm run images`    | Pre-render WebP image sizes (`dev` and `build` run it) |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)    |
| `npm run typecheck` | Generate Next's route types, then `tsc --noEmit`       |

## Analytics

[Client instrumentation](./instrumentation-client.ts) initializes PostHog using
the existing reverse proxy at `https://d.kevinnewman.ca`. It captures the initial
pageview, pageviews during client-side navigation, page leaves, and automatic
click interactions. Session recording is disabled, and cookies are scoped to
the current hostname so they do not share visitor identity with other projects.

Copy [the environment template](./.env.example) to `.env.local` and set
`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` to this site's public project token (`phc_…`)
from PostHog project settings. Use a public project token, never a personal API
key. Set `NEXT_PUBLIC_POSTHOG_UI_HOST` to `https://eu.posthog.com` for an EU project;
the default is US Cloud. The reverse proxy must forward to the same region.

Set these variables in the hosting provider's **build environment** as well.
Next.js embeds public environment variables during `npm run build`, so changing
them requires rebuilding and deploying the static export. Without a project
token, tracking stays disabled. Tracking only runs in production builds served
on `kevinnewman.ca` or `www.kevinnewman.ca`; local development and preview domains
do not send analytics.

After deploying, open the live site and navigate to another page. In browser
DevTools, check that event requests go to `https://d.kevinnewman.ca` and succeed,
then confirm the `$pageview` and `$autocapture` events in PostHog's live events.

## Where things live

- The footer's last-updated month and year, copyright year, and home page
  `dateModified` metadata come from the build date in [the resume data](./data/resume.ts).
  They use UTC and are baked into the static export on each build.
- `data/resume.ts` - intro, "Right now" panel, skills, jobs, education
- `data/projects.ts` - all projects (`promote: true` features them on the home page; first two become spotlights)
- `app/` - routes (home, projects, project detail, game-jams, contact, legacy redirects)
- `components/` - Starfield canvas, Hero, JobCard, nav/footer
- `public/assets/` - images, logos, résumé PDF. Add images here as plain JPEG/PNG;
  `scripts/optimize-images.mjs` turns them into WebP sizes in `public/_img/` (gitignored)
  and `lib/image-loader.ts` points `next/image` at them
- `assets/custom_projects/` - original full-res photos/videos (not deployed; web-sized copies live under `public/assets/`)

## Legacy URLs

Old v1 routes (`/project/:id`, `/home`) are prerendered redirect stubs - kept
automatically in sync with `data/projects.ts`.

## Writing blog posts

The blog is statically exported at `/blog/`. Each article lives in
`content/blog/<slug>/post.mdx`, with its React demos and CSS Modules beside it.
The [Pandemonium texture article](./content/blog/n64-texture-formats/post.mdx)
demonstrates headings, **bold**, *italic*, links, lists, quotes, fenced code,
GitHub-style tables, and an interactive React figure. Ordinary Markdown image
syntax works too; use a custom component for optimized images or richer media.

To add a post:

1. Create its folder and `post.mdx`. Write Markdown and import any custom React
   components directly into the article. Browser interactions use components
   with `'use client'`; the prose remains build-rendered HTML.
2. Add an entry to [the post catalog](./data/posts.ts), including a literal
   `load: () => import('@/content/blog/<slug>/post.mdx')` import. Set
   `published: false` for an exact-URL preview: it stays available at
   `/blog/<slug>/` but is omitted from the blog list, sitemap, and RSS and gets
   a `noindex` meta tag. Set `published: true` (or omit it) to list it once its
   date is due. Anyone with the URL can view an unpublished article.
   Set `draft: true` to exclude it from the static export entirely, including
   its URL. Draft status takes precedence over `published`.
   Dates use `YYYY-MM-DD`, with publication at midnight UTC. Future-dated
   articles are also available by exact URL with `noindex`; they join public
   listings after a rebuild when due. Reading time is calculated from the MDX body at build
   time: 200 words per minute, rounded up, with a one-minute minimum. It counts
   prose and visible code, including headings and table cells, and excludes
   imports, JSX expressions/attributes, Markdown syntax, and link URLs. Omit
   `readMinutes` to use the calculated time, or set `readMinutes: 5` to override
   it (a positive whole number), for example for an interactive article.
3. Add an image, alt text, and caption to `feedFigures` for each custom MDX
   component. RSS is generated from the article's own Markdown; custom
   components become these static figures. Missing fallbacks fail the build.
   Keep MDX expressions inside components so the feed stays readable.
   Native `<details>` and `<summary>` blocks can hold optional notes; RSS
   expands their content. Put the summary text on its own line between the
   opening and closing summary tags so MDX keeps it directly inside details.
4. Run `npm run dev` and visit `/blog/`. Run `npm run build` before publishing;
   deploy the resulting `out/` folder as usual.

`/feed.xml` is a full-text RSS feed, generated at build time, with absolute
links and image URLs. Feed discovery is included in page metadata. Both the
feed and the site use the same published-post catalog.

Each post can import its own styles, use bespoke React compositions, and
extend the default reading layout with wide figures. Start with the sample
instead of building every article as a fixed set of blocks.

The Pandemonium article uses original texture artwork by BoxingBruin. Its
interactive figures have PNG fallbacks for RSS, printing, and readers without
JavaScript. After changing the figure math or original textures, run
`npm run blog:posters` to rebuild these illustrations, then build the site.
`npm run test:blog` checks publication rules, reading-time calculation, format
conversion, palette limits, texture budgets, vertex-color interpolation, and
the comparison assets’ provenance.

The format-family samples use a generated 64 × 64 diagnostic pattern with
a color gradient, one-pixel complementary color stripes, and an alpha fade.
This makes palette limits and shared YUV chroma visible; RGBA32 is the reference.
The playground includes this pattern alongside the game artwork.
The color-combiner demo uses normalized arithmetic for a small set of legal
one- and two-cycle recipes. Its column recipe is checked against the exported
model material; the alpha path and two-texture lerp have independent tests.
`blog:posters` regenerates its 32 × 32 reference patches and static RSS image.
The preview illustrates the combiner, not the complete RDP pipeline or fixed-point
edge cases. Fog and framebuffer blending remain separate material operations.
The vertex demo uses original-main textures downloaded
from [Pandemonium commit d657844](https://github.com/Boxingbruin/Pandemonium/tree/d6578443ec1ca7634435b6881fe29bbd890bf1f9/assets/boss_room).
Those unmodified files live in [original/](./public/assets/blog/pandemonium/original/).
Read-only snapshots of the customized local game assets live separately in
[updated/](./public/assets/blog/pandemonium/updated/), for the revision comparison.
The playground uses the newer carpet border, banner ornament, and stone floor
from these snapshots at their native PNG dimensions and color/alpha precision.
Their N64 filename suffixes select game-build packing; each preview converts
the full-precision source PNG directly rather than re-encoding another preview.
The game checkout itself is not changed by this workflow.
[asset-sources.json](./content/blog/n64-texture-formats/asset-sources.json)
records the upstream commit, source paths, dimensions, and SHA-256 hashes of
both sets. The original carpet’s CI8 format comes from the original floor
model’s material, even though its PNG filename has no format suffix.
Comparison sizes are packed texel payloads, not PNG file sizes or measured
scene performance. When replacing a snapshot, update its provenance and
comparison metadata, regenerate the posters, and rerun the blog checks.

The room comparison uses one reveal slider with three selectable views and
six supplied screenshots, kept
as cropped 960 × 720 JPEGs in [scenes/](./public/assets/blog/pandemonium/scenes/).
To replace them, put `column-before.png`, `column-after.png`,
`window-before.png`, `window-after.png`, `carpet-before.png`, and
`carpet-after.png` in an input folder, then run
`node scripts/prepare-n64-scene-images.mjs <input-folder>`. This trims the
screenshot edges and applies the same centered 4:3 crop without changing
the lighting or colors. The regular build generates responsive WebP versions.
Run `npm run blog:posters` afterward to refresh the RSS illustration.

## Reusable model viewer

[ModelViewer](./components/ModelViewer/ModelViewer.tsx) accepts `src`, `title`,
`poster`, `posterAlt`, optional `caption`, and `rendering="gltf"` or `"n64"`.
Use a small article wrapper like [ModelExample](./content/blog/n64-texture-formats/ModelExample.tsx)
and register its static image in the post's `feedFigures`. Give the component a
React `key` matching `src` when switching between models so each starts closed.
Ordinary glTF materials use Three.js's loader; N64 exports use the separate
[material adapter](./components/ModelViewer/n64-material.ts).

The viewer imports Three.js, GLTFLoader, and OrbitControls only after the reader
clicks **Explore in 3D**. It works with static hosting, renders on demand, caps
pixel density at 2, and disposes GPU resources and image bitmaps on unmount.
It supports left-drag orbiting, right-drag or WASD/arrow-key panning, touch
gestures, zoom buttons, and reset. Keyboard controls apply while the canvas is
focused; opening the viewer or clicking its canvas focuses it automatically.
Loading or WebGL failures leave the poster visible with a retry button.

The first model is an unmodified 52,188-byte local snapshot of the boss-room
columns, with its embedded textures. [sources.json](./public/assets/blog/pandemonium/models/sources.json)
records its SHA-256 and source path. The local game checkout is read only.
The adapter reads Fast64 sampler formats (I8, I4, I4 here), rather than guessing
from filenames. It supports static meshes, opaque texture × shade or shade-only
combiners, optional second-cycle primitive tint, and I4/I8 intensity quantization.
It matches Tiny3D's importer vertex-color gamma conversion and follows the
exported N64 filter setting automatically: POINT uses nearest sampling and BILERP
uses approximate three-point filtering. These columns use BILERP; readers are not
asked to choose a filter. Unsupported N64 materials produce
a clear error instead of silently falling back to a different appearance.
This is an educational rendering subset: fog, dithering, fixed-point precision,
TMEM uploads, mip selection, other combiners, and animated N64 meshes are not
emulated. Standard glTF models can use the ordinary rendering path.

Run `npm run test:viewer` for model provenance and material compatibility checks.
Optional `textures` and `stats` props add an image reference strip above the
canvas and a top-left triangle/texture-size overlay. The column example gets
these from its GLB via `npm run blog:model-assets`: this extracts intensity
previews at the exported format precision, counts triangles, calculates packed
texel bytes, and regenerates the RSS illustration with the references included.
The generator only reads the website snapshot, not the game checkout.

Size labels use lowercase `b`, `kb`, `mb`, and larger units, with 1024-based
steps. Use [formatBytes](./lib/format-bytes.mjs) for UI and generated figures.

The model poster is a transparent PNG capture of the initial Combined view, so
the CSS backdrop follows the theme before and after the model loads. The WebGL
renderer clears to transparent and preserves the camera when switching themes.
After replacing the
model or shader, recapture the viewer canvas after **Reset view**, then run
`npm run blog:model-assets` to refresh its RSS fallback. The normal image build
makes its responsive WebP variants; `blog:posters` generates the other article
diagrams.
