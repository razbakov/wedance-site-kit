<script setup lang="ts">
// The site's footer: its name and city, its social links (from the WeDance
// page), optional Imprint / Privacy links, extra links a site passes, and —
// unless `credit` is false — "Made with WeDance".
const props = withDefaults(defineProps<{
  /** Link to /impressum and /privacy (the hosted app serves both). */
  legal?: boolean
  links?: { label: string; to: string }[]
  credit?: boolean
}>(), { legal: false, links: () => [], credit: true })

const { site, profileUrl } = useWeDanceSite()
const { base } = useWeDanceProfile()
const text = useSiteText()
const sitePath = useSitePath()

const NAMES: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', tiktok: 'TikTok', whatsapp: 'WhatsApp', telegram: 'Telegram', website: 'Website', spotify: 'Spotify', soundcloud: 'SoundCloud' }
const socials = computed(() => (site.value?.profile?.socials ?? [])
  .filter(s => /^https?:\/\//.test(s.url))
  .map(s => ({ label: NAMES[s.platform.toLowerCase()] ?? s.platform, url: s.url })))
const allLinks = computed(() => [
  ...props.links,
  ...(props.legal ? [{ label: text('site.impressum'), to: sitePath('/impressum') }, { label: text('site.privacy'), to: sitePath('/privacy') }] : []),
])
const year = new Date().getFullYear()
</script>

<template>
  <footer v-if="site" class="border-t border-site-border/40 bg-site-bg px-4 py-10 text-sm text-site-subtle">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div>
        <p class="font-display text-lg text-site-heading">{{ site.profile.name }}</p>
        <p v-if="site.profile.city" class="mt-1">{{ site.profile.city }}</p>
        <a :href="withUtm(profileUrl, 'footer')" target="_blank" rel="noopener" class="mt-1 inline-block underline-offset-2 hover:text-site-highlight hover:underline">WeDance</a>
      </div>

      <nav v-if="socials.length" :aria-label="text('site.followUs')">
        <p class="text-xs font-bold uppercase tracking-wider text-site-faint">{{ text('site.followUs') }}</p>
        <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <li v-for="s in socials" :key="s.url"><a :href="s.url" target="_blank" rel="noopener" class="hover:text-site-highlight">{{ s.label }}</a></li>
        </ul>
      </nav>

      <div v-if="allLinks.length" class="flex flex-wrap gap-x-4 gap-y-1">
        <NuxtLink v-for="l in allLinks" :key="l.to" :to="l.to" class="hover:text-site-highlight">{{ l.label }}</NuxtLink>
      </div>
    </div>
    <div class="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs text-site-faint">
      <span>© {{ year }} {{ site.profile.name }}</span>
      <a v-if="credit" :href="withUtm(base, 'site-credit')" target="_blank" rel="noopener" class="hover:text-site-highlight">{{ text('site.madeWith') }}</a>
    </div>
  </footer>
</template>
