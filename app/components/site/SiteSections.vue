<script setup lang="ts">
// The page body: every section the profile's site has on WeDance, each kind
// drawn by its Site* component. Components resolve by name, so a site that
// has its own app/components/site/SiteHero.vue (say) gets that one instead.
const { sections, events, profileUrl, contactsUrl } = useWeDanceSite()

const kinds: Record<string, ReturnType<typeof resolveComponent>> = {
  hero: resolveComponent('SiteHero'),
  text: resolveComponent('SiteText'),
  cards: resolveComponent('SiteCards'),
  events: resolveComponent('SiteEvents'),
  faq: resolveComponent('SiteFaq'),
  video: resolveComponent('SiteVideo'),
  person: resolveComponent('SitePerson'),
  location: resolveComponent('SiteLocation'),
  signup: resolveComponent('SiteSignup'),
  cta: resolveComponent('SiteCta'),
}
// Kinds this site doesn't know yet are skipped; backgrounds alternate below the hero.
const blocks = computed(() => sections.value
  .filter(s => kinds[s.kind])
  .map((s, i) => ({ section: s, component: kinds[s.kind]!, tinted: s.kind !== 'hero' && i % 2 === 0 })))
</script>

<template>
  <template v-if="blocks.length">
    <component
      :is="b.component"
      v-for="b in blocks"
      :key="b.section.id"
      :section="b.section"
      :tinted="b.tinted"
      v-bind="b.section.kind === 'events'
        ? { events, profileUrl }
        : b.section.kind === 'signup' ? { contactsUrl } : {}"
    />
  </template>
  <!-- WeDance unreachable, or nothing this site can draw: the site's own fallback. -->
  <slot v-else name="fallback" :profile-url="profileUrl" />
</template>
