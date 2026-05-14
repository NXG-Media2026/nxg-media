import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://nxg-media.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/archetypen/'),
      serialize: (item) => ({
        ...item,
        lastmod: new Date().toISOString().split('T')[0],
      }),
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl-NL', en: 'en', es: 'es' },
      },
    }),
  ],
});
