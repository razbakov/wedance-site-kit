/**
 * The look WeDance keeps for this site (its preset + overrides, `site.theme`),
 * written into <head> on the server so the first paint already has it: the
 * `--site-*` role variables, the heading font and the favicon.
 *
 * A site without a theme on WeDance gets nothing here and keeps its own
 * `:root { --site-… }` / tailwind colours. Values are page owners' input, so
 * only well-formed ones are written.
 */
import type { SiteTheme } from '../utils/wedanceSite'

const ROLE = /^[a-z]+(-[a-z]+)?$/
const RGB = /^\d{1,3} \d{1,3} \d{1,3}$/
const FONT = /^[\w\s,'"-]{1,120}$/

/** The `:root { … }` rule for a theme, or '' when it sets nothing. Exported for tests. */
export function themeCss(theme: SiteTheme | undefined | null): string {
  if (!theme) return ''
  const vars = Object.entries(theme.vars ?? {})
    .filter(([role, v]) => ROLE.test(role) && typeof v === 'string' && RGB.test(v))
    .map(([role, v]) => `--site-${role}: ${v};`)
  if (theme.fontDisplay && FONT.test(theme.fontDisplay)) vars.push(`--site-font-display: ${theme.fontDisplay};`)
  return vars.length ? `:root { ${vars.join(' ')} }` : ''
}

const safeUrl = (u: string | undefined, host?: RegExp) => {
  if (!u) return null
  try {
    const url = new URL(u)
    return url.protocol === 'https:' && (!host || host.test(url.hostname)) ? url.toString() : null
  } catch {
    return null
  }
}

export function useSiteTheme() {
  const { site } = useWeDanceSite()
  useHead(() => {
    const theme = site.value?.theme
    const css = themeCss(theme)
    const font = safeUrl(theme?.fontUrl, /^fonts\.googleapis\.com$/)
    const favicon = safeUrl(theme?.favicon)
    return {
      style: css ? [{ key: 'wedance-site-theme', textContent: css }] : [],
      link: [
        ...(font ? [{ key: 'wedance-site-font', rel: 'stylesheet' as const, href: font }] : []),
        ...(favicon ? [{ key: 'wedance-site-favicon', rel: 'icon' as const, href: favicon }] : []),
      ],
    }
  })
}
