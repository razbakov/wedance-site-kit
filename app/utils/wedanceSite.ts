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

export type WeDanceSocial = { platform: string; url: string }

export type WeDanceProfileRef = {
  username: string
  name: string
  url: string
  // Newer WeDance answers (v0.2.0+); older ones leave them out.
  photo?: string | null
  city?: string | null
  socials?: WeDanceSocial[]
}

/** The 13 role tokens (tailwind.config.ts), each as space-separated RGB channels: "245 158 11". */
export type SiteThemeRole = 'bg' | 'surface' | 'border' | 'border-strong' | 'border-button' | 'heading' | 'text' | 'muted' | 'subtle' | 'faint' | 'accent' | 'highlight' | 'on-accent'

/** The look WeDance resolved for this site (its preset + overrides). Every field is optional. */
export type SiteTheme = {
  vars?: Partial<Record<SiteThemeRole, string>>
  /** CSS font-family for headings, e.g. "'Playfair Display', serif". */
  fontDisplay?: string
  /** A stylesheet that loads that font (Google Fonts). */
  fontUrl?: string
  logo?: string
  favicon?: string
}

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
  // Newer WeDance answers (hosted sites); older ones leave them out.
  theme?: SiteTheme
  /** false = a draft, shown only through a preview link. */
  published?: boolean
  /** This answer came through a preview link: don't let search engines index it. */
  preview?: boolean
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
