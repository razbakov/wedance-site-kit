// A dev app for the layer: renders a real WeDance profile's site with the
// layer's components, so changes can be checked in a browser.
//   NUXT_PUBLIC_WEDANCE_PROFILE=<username> bun run dev
// Reads the public site API only (default: production WeDance; point
// NUXT_PUBLIC_WEDANCE_URL at a preview or localhost to test unreleased changes).
export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  i18n: {
    locales: ['en', 'de', 'es', 'ru', 'uk', 'fr', 'it', 'pt', 'pl'].map(code => ({ code, language: code })),
  },
})
