// The default language has no prefix (prefix_except_default), so /en and
// /en/… are aliases nobody should land on: send them to the unprefixed page.
export default defineEventHandler((event) => {
  const lang = (useRuntimeConfig(event).public.i18n as { defaultLocale?: string } | undefined)?.defaultLocale
  if (!lang) return
  const match = event.path.match(/^\/([^/?]+)(\/[^?]*)?(\?.*)?$/)
  if (match?.[1] !== lang) return
  return sendRedirect(event, (match[2] || '/') + (match[3] || ''), 301)
})
