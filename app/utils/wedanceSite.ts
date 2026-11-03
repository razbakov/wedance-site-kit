/**
 * What GET /api/profiles/<username>/site returns, in one language. Mirrors
 * Resolved<SiteSection> and the route's response in wedance-2026
 * shared/types/profileSite.ts — that file is the contract; change it there
 * first, then here. `kind` stays a string: kinds a site doesn't know yet are
 * skipped, so WeDance can add one without breaking older sites.
 */
export type SiteButton = { label: string; url: string }
export type SiteItem = { id: string; tag?: string; title?: string; body?: string; image?: string; url?: string }
export type SiteCallout = { title?: string; body?: string; button?: SiteButton }
export type SiteSection = {
  id: string
  kind: string
  anchor?: string
  navLabel?: string
  eyebrow?: string
  title?: string
  titleAccent?: string
  body?: string
  image?: string
  video?: string
  address?: string
  mapUrl?: string
  days?: number
  buttons?: SiteButton[]
  items?: SiteItem[]
  callout?: SiteCallout
}

/** An event on the profile, as /site and /events list it. */
export type WeDanceEvent = {
  id: string
  name: string
  type: string | null
  startDate: string
  endDate: string | null
  timezone: string | null
  venueName: string | null
  venueAddress: string | null
  price: string
  cover: string | null
  styles: string[]
  artists: { handle: string; name: string }[]
  url: string
}

export type WeDanceProfileRef = { username: string; name: string; url: string }

export type WeDanceSite = {
  profile: WeDanceProfileRef
  lang: string
  locales: string[]
  domain: string | null
  seo: { title?: string; description?: string; image?: string }
  sections: SiteSection[]
  updatedAt: string | null
  events: WeDanceEvent[]
  contactsUrl: string
}

const TZ = 'Europe/Berlin'

/** Paragraphs are separated by a blank line; single newlines stay line breaks. */
export const paragraphs = (body?: string) => (body ?? '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

/** In-page anchors stay in the tab; anything else opens a new one. */
export function linkAttrs(url: string) {
  return url.startsWith('#') ? { href: url } : { href: url, target: '_blank', rel: 'noopener' }
}

/** A YouTube watch/short/share URL as an embed URL. */
export function youtubeEmbed(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    const id = u.hostname.includes('youtu.be')
      ? u.pathname.slice(1)
      : u.searchParams.get('v') || u.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]
    return id ? `https://www.youtube.com/embed/${id}` : ''
  } catch {
    return ''
  }
}

export const isWhatsApp = (url?: string) => !!url && /(^|\.)(whatsapp\.com|wa\.me)/.test(url.replace(/^https?:\/\//, ''))

export const isFree = (price: string) => /^(free|0|0 ?€|€ ?0|kostenlos|gratis)$/i.test(price.trim())

/**
 * A WeDance link with campaign tags, so WeDance can tell where people came
 * from. `source` defaults to the site's `wedanceUtmSource` runtime config.
 */
export function withUtm(url: string, medium: string, source?: string) {
  const u = new URL(url)
  const src = source ?? (useRuntimeConfig().public.wedanceUtmSource as string)
  if (src) u.searchParams.set('utm_source', src)
  u.searchParams.set('utm_medium', medium)
  return u.toString()
}

/** Date/time parts in the event's time zone, in the visitor's language. */
export function eventParts(e: Pick<WeDanceEvent, 'startDate' | 'timezone'>, locale: string) {
  const tz = e.timezone || TZ
  const start = new Date(e.startDate)
  const fmt = (o: Intl.DateTimeFormatOptions, d = start) => new Intl.DateTimeFormat(locale, { timeZone: tz, ...o }).format(d)
  return {
    weekday: fmt({ weekday: 'long' }),
    date: fmt({ day: 'numeric', month: 'short' }),
    time: fmt({ hour: '2-digit', minute: '2-digit', hour12: false }),
    day: fmt({ year: 'numeric', month: '2-digit', day: '2-digit' }),
  }
}
