# nmaass.dev

Source for [nmaass.dev](https://nmaass.dev) — Nicholas Maassen's portfolio and writing. Static Astro site with no UI framework, deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) static site generator
- Source Serif 4 (Google Fonts) + JetBrains Mono
- Hand-written CSS, no UI framework
- Light + dark mode via `prefers-color-scheme` + manual toggle (persisted in `localStorage`)
- Hosted on GitHub Pages, deployed via GitHub Actions
- DNS + email forwarding on Cloudflare

## Performance + accessibility targets

| | Target | Actual |
|---|---|---|
| Lighthouse Performance | 100 | 100 |
| Lighthouse Accessibility | 100 | 100 |
| Lighthouse Best Practices | 100 | 100 |
| Lighthouse SEO | 100 | 100 |
| WCAG 2.1 | AA (axe-core) | AA, no issues |
| LCP (desktop) | < 1 s | 0.5 s |
| Page weight | < 200 KiB | ~160 KiB |

Verified via `npx lighthouse@latest https://nmaass.dev/` and `npx pa11y https://nmaass.dev/ --runner axe`.

## Local development

Requires Node 22+.

```sh
npm install
npm run dev      # local server on :4321
npm run build    # static output to dist/
npm run preview  # serve the built site locally
```

## Project layout

```
public/                  static assets, served as-is
  CNAME                  GitHub Pages custom-domain marker
  favicon.svg            inline-recolorable mark
  resume.pdf             resume link from the home page + footer
  projects/              project screenshots
src/
  layouts/
    Base.astro           shared header, footer, nav, theme toggle
    Post.astro           blog post layout (frontmatter title/date/description)
  pages/
    index.astro          home: hero, project cards, recent writing
    about.astro          about + tools + contact
    writing/index.astro  posts index
    writing/*.md         post markdown with frontmatter
  styles/
    tokens.css           color + type scale + spacing tokens
    global.css           reset, layout primitives, prose styles
astro.config.mjs         site config + redirects table
.github/workflows/
  deploy.yml             build with Node 22, deploy to Pages via Actions
```

## Adding a post

1. Create `src/pages/writing/<slug>.md` with the frontmatter:

   ```yaml
   ---
   layout: ../../layouts/Post.astro
   title: Post title
   description: One-line summary for OG/meta
   date: 2026-05-08
   ---
   ```

2. Add a matching entry to the `posts` array in `src/pages/writing/index.astro`.
3. Optional: add a teaser entry to the home page Writing list in `src/pages/index.astro`.

## Renaming a published post

Add an entry under `redirects` in `astro.config.mjs`:

```js
redirects: {
  '/writing/old-slug': '/writing/new-slug',
}
```

Astro generates a meta-refresh redirect with `rel=canonical` + `robots=noindex` so search-engine signals migrate cleanly.

## License

The site source is MIT. Post content is copyright Nicholas Maassen. Link freely; please don't republish in full without asking.
