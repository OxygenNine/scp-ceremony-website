// @ts-check
import { defineConfig } from 'astro/config';

/** 部署到 GitHub Pages 项目站点：https://oxygennine.github.io/scp-ceremony-website/ */
export const GH_PAGES_ORIGIN = 'https://oxygennine.github.io';
export const GH_PAGES_BASE = '/scp-ceremony-website';

export default defineConfig({
  site: GH_PAGES_ORIGIN,
  base: GH_PAGES_BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
