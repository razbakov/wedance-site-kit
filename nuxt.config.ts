import { fileURLToPath } from 'node:url'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// A Nuxt layer: a site `extends` it and gets its WeDance sections, composables
// and theme tokens. The site brings @nuxtjs/tailwindcss and @nuxtjs/i18n
// (see README); this layer only adds to their config.
export default defineNuxtConfig({
  alias: {
    // Types and helpers, for components a site overrides.
    '#wedance-site': here('./app/utils/wedanceSite'),
  },
  css: [here('./app/assets/css/wedance-site.css')],
  runtimeConfig: {
    public: {
      // Where WeDance runs. Env: NUXT_PUBLIC_WEDANCE_URL.
      wedanceUrl: 'https://2026.wedance.vip',
      // The profile whose site this is (its WeDance username). Env: NUXT_PUBLIC_WEDANCE_PROFILE.
      wedanceProfile: '',
      // utm_source on links to WeDance, and the `form` the sign-ups are tagged with. Env: NUXT_PUBLIC_WEDANCE_UTM_SOURCE.
      wedanceUtmSource: '',
    },
  },
  // Default copy for the sections; a site's own locale files win key by key.
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'de', file: 'de.json' },
      { code: 'es', file: 'es.json' },
      { code: 'ru', file: 'ru.json' },
      { code: 'uk', file: 'uk.json' },
    ],
  },
})
