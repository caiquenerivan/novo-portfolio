import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nerivan.site',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR' } },
    }),
  ],
});
