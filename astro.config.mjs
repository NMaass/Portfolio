// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nmaass.dev',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
