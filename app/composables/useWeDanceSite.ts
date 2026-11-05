/**
 * The site, managed on WeDance: WeDance is the CMS (every section, in every
 * language) and the CRM (the sign-up form posts to the profile's contacts).
 * The site only renders what GET /api/profiles/<username>/site returns —
 * events included, so a page makes one request. The WeDance address comes
 * from runtime config (wedanceUrl); the profile too (wedanceProfile), unless an
 * app that serves many sites picks it per request with setWeDanceProfile().
 */
import type { WeDanceSite } from '../utils/wedanceSite'

/** The profile picked for this request, when one app serves many sites (wedance-sites). */
const useProfileOverride = () => useState<string | null>('wedance-profile', () => null)

/**
 * Serve this request as `username`'s site. Call it before anything reads the
 * site — in a route middleware or plugin. A site built for one profile never
 * needs it: runtimeConfig.public.wedanceProfile is enough.
 */
export function setWeDanceProfile(username: string | null) {
  useProfileOverride().value = username
}

export function useWeDanceProfile() {
  const config = useRuntimeConfig().public
  const base = (config.wedanceUrl as string).replace(/\/$/, '')
  const username = useProfileOverride().value || (config.wedanceProfile as string)
  if (!username) console.warn('[wedance-site-kit] no profile: set runtimeConfig.public.wedanceProfile, or call setWeDanceProfile() per request.')
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
