// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nmaass.github.io',
  base: '/Portfolio',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
