<script setup lang="ts">
// The site's top bar: its logo (theme.logo) or name, the menu — every section
// with an anchor and a menu label on WeDance — and the language switch. On a
// phone the menu folds behind a button.
const { site, sections } = useWeDanceSite()
const text = useSiteText()
const localePath = useLocalePath()
const { locale } = useI18n()

const nav = computed(() => sections.value
  .filter(s => s.anchor && s.navLabel)
  .map(s => ({ label: s.navLabel!, href: `#${s.anchor}` })))
const logo = computed(() => site.value?.theme?.logo || '')
const name = computed(() => site.value?.profile?.name ?? '')
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })

// The bar is fixed, so jumps to #anchors land below it; and the page says its language.
useHead({ htmlAttrs: { class: 'site-has-header', lang: () => locale.value } })
</script>

<template>
  <header v-if="site" class="fixed inset-x-0 top-0 z-40 border-b border-site-border/40 bg-site-bg/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
      <NuxtLink :to="localePath('/')" class="flex min-w-0 items-center gap-2 font-display text-lg text-site-heading" @click="open = false">
        <img v-if="logo" :src="logo" :alt="name" class="h-9 w-auto max-w-[10rem] object-contain">
        <span v-else class="truncate">{{ name }}</span>
      </NuxtLink>

      <div class="hidden items-center gap-6 md:flex">
        <nav v-if="nav.length" :aria-label="text('site.menu')" class="flex items-center gap-5">
          <a v-for="n in nav" :key="n.href" :href="n.href" class="text-sm text-site-muted transition-colors hover:text-site-highlight">{{ n.label }}</a>
        </nav>
        <SiteLanguageSwitch />
      </div>

      <button
        v-if="nav.length || (site.locales?.length ?? 0) > 1"
        type="button"
        class="rounded-full border border-site-border-button p-2 text-site-heading md:hidden"
        :aria-expanded="open"
        aria-controls="site-mobile-menu"
        :aria-label="open ? text('site.close') : text('site.menu')"
        @click="open = !open"
      >
        <svg v-if="!open" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>

    <div v-if="open" id="site-mobile-menu" class="border-t border-site-border/40 px-4 pb-4 md:hidden">
      <nav v-if="nav.length" :aria-label="text('site.menu')" class="flex flex-col py-2">
        <a v-for="n in nav" :key="n.href" :href="n.href" class="py-2 text-base text-site-text hover:text-site-highlight" @click="open = false">{{ n.label }}</a>
      </nav>
      <SiteLanguageSwitch />
    </div>
  </header>
</template>
