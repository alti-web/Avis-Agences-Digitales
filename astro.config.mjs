// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://avis-agences-digitales.vercel.app',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
