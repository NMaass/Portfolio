// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nmaass.dev',
  trailingSlash: 'ignore',
  redirects: {
    // Permanent: post renamed 2026-05-08.
    '/writing/when-to-stop-architecting': '/writing/launching-is-letting-go',
  },
  build: {
    assets: 'assets',
  },
});
