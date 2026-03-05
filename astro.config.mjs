// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://avis-agences-digitales.fr',
  trailingSlash: 'never',
  integrations: [sitemap({
    serialize(item) {
      const path = item.url.replace(/\/$/, '');

      if (path === 'https://avis-agences-digitales.fr') {
        item.changefreq = 'weekly';
        item.priority = 1.0;
      } else if (path.includes('/avis/')) {
        item.changefreq = 'monthly';
        item.priority = 0.8;
      } else if (path.includes('/agences-web/')) {
        item.changefreq = 'monthly';
        item.priority = 0.7;
      } else if (path.endsWith('/blog')) {
        item.changefreq = 'weekly';
        item.priority = 0.6;
      } else if (path.includes('/blog/')) {
        item.changefreq = 'yearly';
        item.priority = 0.6;
      } else if (path.includes('/methodologie') || path.includes('/a-propos')) {
        item.changefreq = 'yearly';
        item.priority = 0.4;
      } else if (path.includes('/contact')) {
        item.changefreq = 'yearly';
        item.priority = 0.3;
      }

      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
