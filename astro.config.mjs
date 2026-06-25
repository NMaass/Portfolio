// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Redirect stub pages get robots=noindex; keep them out of the sitemap.
const REDIRECT_PATHS = new Set([
  '/writing/when-to-stop-architecting',
  '/writing/launching-is-letting-go',
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://nmaass.dev',
  trailingSlash: 'ignore',
  redirects: {
    // Permanent: post renamed twice. Both old slugs point at the current one.
    '/writing/when-to-stop-architecting': '/writing/put-the-hammer-down',
    '/writing/launching-is-letting-go': '/writing/put-the-hammer-down',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        return !REDIRECT_PATHS.has(path);
      },
    }),
  ],
  build: {
    assets: 'assets',
  },
});
