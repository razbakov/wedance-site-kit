/**
 * Pass how the visitor reached this site on to WeDance (RAZ-1074, app/utils/landingSource.ts). The first
 * landing in the tab is remembered; a later link with its own utm tags replaces it. Every click on a WeDance
 * link (schedule, footer, sign-up) gets `utm_campaign=<landing source>` just before the browser follows it,
 * so the prerendered HTML stays the same for everyone.
 */
import { LANDING_SOURCE_KEY, isWeDanceLink, landingSourceLabel, withLandingSource } from '../utils/landingSource'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const wedanceUrl = useRuntimeConfig().public.wedanceUrl as string
  let label = ''

  const remember = (query: Record<string, unknown>, referrer: string, onlyTagged: boolean) => {
    if (onlyTagged && !query.utm_source) return
    label = landingSourceLabel(query, referrer, location.host)
    try { sessionStorage.setItem(LANDING_SOURCE_KEY, label) } catch { /* private mode: this page only */ }
  }

  try { label = sessionStorage.getItem(LANDING_SOURCE_KEY) || '' } catch { /* no storage */ }
  router.isReady().then(() => remember(router.currentRoute.value.query, document.referrer, !!label))
  router.afterEach((to, from) => { if (from.matched.length) remember(to.query, '', true) })

  // pointerdown/keydown come before the click follows the link, and cover middle-click and "open in new tab".
  const tag = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!a || !label || !isWeDanceLink(a.href, wedanceUrl)) return
    const next = withLandingSource(a.href, label)
    if (next !== a.href) a.href = next
  }
  for (const type of ['pointerdown', 'keydown', 'click', 'auxclick', 'contextmenu']) document.addEventListener(type, tag, true)
})
