// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ceremony.example.org',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
