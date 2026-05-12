import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://docveri.de',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/sichtbarkeit') &&
        !page.includes('/impressum') &&
        !page.includes('/datenschutz') &&
        !page.includes('/agb') &&
        !page.includes('/archetypen/'),
      serialize: (item) => ({
        ...item,
        lastmod: new Date().toISOString().split('T')[0],
      }),
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de' },
      },
    }),
  ],
});
