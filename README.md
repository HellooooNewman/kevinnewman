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

## Where things live

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

The format playground and vertex demo use original-main textures downloaded
from [Pandemonium commit d657844](https://github.com/Boxingbruin/Pandemonium/tree/d6578443ec1ca7634435b6881fe29bbd890bf1f9/assets/boss_room).
Those unmodified files live in [original/](./public/assets/blog/pandemonium/original/).
Read-only snapshots of the customized local game assets live separately in
[updated/](./public/assets/blog/pandemonium/updated/), for the revision comparison.
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
