<script setup lang="ts">
// The site's languages (those it has on WeDance and this app can route), as
// links to the same page in each. Nothing when there is only one.
const { site } = useWeDanceSite()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const text = useSiteText()

const codes = computed(() => new Set((locales.value as (string | { code: string })[]).map(l => (typeof l === 'string' ? l : l.code))))
const available = computed(() => (site.value?.locales ?? []).filter(l => codes.value.has(l)))
</script>

<template>
  <nav v-if="available.length > 1" :aria-label="text('site.language')" class="flex items-center gap-1">
    <NuxtLink
      v-for="l in available"
      :key="l"
      :to="switchLocalePath(l as any)"
      :hreflang="l"
      :aria-current="l === locale ? 'true' : undefined"
      class="rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider transition-colors"
      :class="l === locale ? 'bg-site-accent text-site-on-accent' : 'text-site-subtle hover:text-site-highlight'"
    >{{ l }}</NuxtLink>
  </nav>
</template>
