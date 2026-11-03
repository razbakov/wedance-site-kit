/**
 * The profile's upcoming events alone, for pages that don't need the whole
 * site (a kiosk, a schedule page). The homepage gets them from useWeDanceSite.
 */
import type { WeDanceEvent, WeDanceProfileRef } from '../utils/wedanceSite'

export function useWeDanceEvents(opts: { days?: number } = {}) {
  const { username, profileUrl: fallbackProfileUrl, apiUrl } = useWeDanceProfile()
  const days = opts.days ?? 35
  const { data, status } = useFetch<{ profile: WeDanceProfileRef; events: WeDanceEvent[] }>(`${apiUrl}/events`, {
    key: `wedance-events-${username}-${days}`,
    query: { days },
    // A WeDance hiccup must never break the page: an empty list + the profile link.
    default: () => ({ profile: { username, name: username, url: fallbackProfileUrl }, events: [] }),
  })
  const events = computed(() => data.value?.events ?? [])
  const profileUrl = computed(() => data.value?.profile.url ?? fallbackProfileUrl)
  return { events, profileUrl, status }
}
