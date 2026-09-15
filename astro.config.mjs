import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { hiddenOfferPaths } from './src/data/hidden-offers.mjs';

export default defineConfig({
  site: 'https://nxg-media.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) =>
        !hiddenOfferPaths.includes(new URL(page).pathname.replace(/\/+$/, '')) &&
        !page.includes('/_backups_') &&
        !page.includes('/archetypen/') &&
        !page.includes('/groeiscan') &&
        !page.includes('/website-abonnement') &&
        !page.includes('/website-subscription') &&
        !page.includes('/suscripcion-web'),
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
