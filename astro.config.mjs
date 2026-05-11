// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nmaass.dev',
  trailingSlash: 'ignore',
  redirects: {
    // Permanent: post renamed twice. Both old slugs point at the current one.
    '/writing/when-to-stop-architecting': '/writing/put-the-hammer-down',
    '/writing/launching-is-letting-go': '/writing/put-the-hammer-down',
  },
  build: {
    assets: 'assets',
  },
});
