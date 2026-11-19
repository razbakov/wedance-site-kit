/**
 * How a visitor reached this site (RAZ-1074), passed on to WeDance so the page's Contacts can show the whole
 * route: "montuno.club / schedule / instagram-bio" instead of only "montuno.club / schedule".
 *
 * The landing's own utm tags win (`instagram-bio`), else the site that sent them (`l.instagram.com`), else
 * `direct` (typed, bookmark, QR code or an app that hides the referrer). Kept for the tab in sessionStorage by
 * app/plugins/landing-source.client.ts and written into `utm_campaign` of a WeDance link when it is clicked.
 * Never the referrer's path or query: only its host.
 */

export const LANDING_SOURCE_KEY = 'wds_landing_source'

const clean = (v: unknown) => (typeof v === 'string' ? v : Array.isArray(v) && typeof v[0] === 'string' ? v[0] : '')
  .trim().toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)

/** The label for a landing: utm_source[-utm_medium], else the outside referrer's host, else `direct`. */
export function landingSourceLabel(query: Record<string, unknown>, referrer: string | null | undefined, ownHost: string): string {
  const src = clean(query.utm_source)
  if (src) return [src, clean(query.utm_medium)].filter(Boolean).join('-')
  if (referrer) {
    try {
      const host = new URL(referrer).host.replace(/^www\./, '')
      if (host && host !== ownHost.replace(/^www\./, '')) return clean(host)
    } catch { /* unparsable: treated as direct */ }
  }
  return 'direct'
}

/** A link to WeDance (the site's wedanceUrl host, or any *.wedance.vip) that may carry the landing source. */
export function isWeDanceLink(href: string, wedanceUrl: string): boolean {
  try {
    const host = new URL(href).host
    return host === new URL(wedanceUrl).host || host === 'wedance.vip' || host.endsWith('.wedance.vip')
  } catch { return false }
}

/** The link with `utm_campaign` set to the landing source, unless the link already names a campaign. */
export function withLandingSource(href: string, label: string): string {
  if (!label) return href
  try {
    const u = new URL(href)
    if (u.searchParams.get('utm_campaign')) return href
    u.searchParams.set('utm_campaign', label)
    return u.toString()
  } catch { return href }
}
