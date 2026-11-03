/**
 * The site, managed on WeDance: WeDance is the CMS (every section, in every
 * language) and the CRM (the sign-up form posts to the profile's contacts).
 * The site only renders what GET /api/profiles/<username>/site returns —
 * events included, so a page makes one request. The profile and the WeDance
 * address come from runtime config (wedanceProfile, wedanceUrl).
 */
import type { WeDanceSite } from '../utils/wedanceSite'

export function useWeDanceProfile() {
  const config = useRuntimeConfig().public
  const base = (config.wedanceUrl as string).replace(/\/$/, '')
  const username = config.wedanceProfile as string
  if (!username) console.warn('[wedance-site-kit] runtimeConfig.public.wedanceProfile is empty — set it to the WeDance username.')
  return { base, username, profileUrl: `${base}/@${username}`, apiUrl: `${base}/api/profiles/${username}` }
}

export function useWeDanceSite() {
  const { username, profileUrl: fallbackProfileUrl, apiUrl } = useWeDanceProfile()
  const { locale } = useI18n()
  // One cache entry per language: the header and the page share it, and a
  // language switch fetches that language's copy.
  const { data, error, status } = useFetch<WeDanceSite>(`${apiUrl}/site`, {
    key: computed(() => `wedance-site-${username}-${locale.value}`),
    query: { lang: locale },
  })

  const site = computed(() => (data.value && Array.isArray(data.value.sections) ? data.value : null))
  const sections = computed(() => site.value?.sections ?? [])
  const events = computed(() => site.value?.events ?? [])
  const profileUrl = computed(() => site.value?.profile?.url || fallbackProfileUrl)
  const contactsUrl = computed(() => site.value?.contactsUrl || `${apiUrl}/contacts`)
  return { site, sections, events, profileUrl, contactsUrl, error, status }
}
