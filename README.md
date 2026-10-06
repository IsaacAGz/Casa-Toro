# Casa Toro

Website for Casa Toro, a cabin retreat in Valle de Guadalupe, between Tecate and Ensenada. The site is bilingual: English under `/en/` and Spanish under `/es/`.

## Stack

- [Astro](https://astro.build) 7
- [Vue](https://vuejs.org) 3 for interactive sections (features, gallery, experiences)
- [Preact](https://preactjs.com) integration is installed
- [Tailwind CSS](https://tailwindcss.com) 4, wired through Vite
- Node.js 22.12 or newer

## Routes

`/` reads the browser language and sends visitors to `/en/` or `/es/`. Without JavaScript, that page offers both links.

| Path | Page |
| :-- | :-- |
| `/en/`, `/es/` | Home: overview, feature bands, and gallery |
| `/en/about`, `/es/about` | The cabin and the valley |
| `/en/experiences`, `/es/experiences` | Stay experiences |
| `/en/location`, `/es/location` | Route from Tecate and Ensenada |
| `/en/projects`, `/es/projects` | Related projects: Power Meals, Dustline, and Mirasol Collective |
| `/en/projects/…`, `/es/projects/…` | Project detail pages |
| `/en/reviews`, `/es/reviews` | Same related-projects page, kept so older links still resolve |

The home page uses `IndexLayout`. Inner pages use `BaseLayout`.

## Project structure

```text
/
├── public/images/          Static photos and placeholders
├── src/
│   ├── components/         Astro and Vue UI
│   ├── layouts/            IndexLayout and BaseLayout
│   ├── pages/              Routes (index, en/, es/)
│   ├── scripts/            Menu behavior
│   └── styles/global.css   Theme tokens, type, and shared layout
├── astro.config.mjs
└── package.json
```

Astro turns each file in `src/pages/` into a route. Shared UI lives in `src/components/`. Files in `public/` are served from the site root, so `public/images/road.jpg` is `/images/road.jpg`.

## Commands

Run these from the project root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site into `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Astro CLI help |
