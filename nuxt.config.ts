import { fileURLToPath } from 'node:url'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// A Nuxt layer: a site `extends` it and gets its WeDance sections, composables
// and theme tokens. The site brings @nuxtjs/tailwindcss and @nuxtjs/i18n
// (see README); this layer only adds to their config.
export default defineNuxtConfig({
  // Spelled out so a Nuxt 3 site finds them too: Nuxt 4 reads a layer's app/,
  // Nuxt 3 looks for components/ and composables/ at the layer's root. Not
  // `srcDir: 'app'` — that would leak into the site and move its `~`.
  components: [{ path: here('./app/components') }],
  imports: { dirs: [here('./app/composables'), here('./app/utils')] },
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
  // Routing defaults every site shares; a site's own i18n options win key by
  // key. No `locales` here on purpose: layers' locale lists are concatenated,
  // so each site declares its own, and only those.
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    // Only on the homepage, so a shared deep link opens in its own language.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
  },
})
