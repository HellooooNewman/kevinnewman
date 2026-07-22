# Kevin Newman - Personal Website

Personal portfolio site built with Next.js (App Router, static export). The
space theme - starfield, moon, mountains - carries over from the original
Angular version, rebuilt for real prerendered HTML, SEO, and mobile.

## Commands

| Command         | What it does                                 |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Dev server at http://localhost:4300          |
| `npm run build` | Static export to `out/` (deploy that folder) |
| `npm run lint`  | Lint                                         |

## Where things live

- `data/resume.ts` - intro, status pill, stats, "Right now" panel, skills, jobs, education
- `data/projects.ts` - all projects (`promote: true` features them on the home page; first two become spotlights)
- `app/` - routes (home, projects, project detail, game-jams, contact, legacy redirects)
- `components/` - Starfield canvas, Hero, JobCard, nav/footer
- `public/assets/` - images, logos, résumé PDF
- `assets/custom_projects/` - original full-res photos/videos (not deployed; web-sized copies live under `public/assets/`)

## Legacy URLs

Old v1 routes (`/project/:id`, `/home`) are prerendered redirect stubs - kept
automatically in sync with `data/projects.ts`.
