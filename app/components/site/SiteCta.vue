<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
// One message with a button (WhatsApp group, tickets, Instagram…).
defineProps<{ section: SiteSection; tinted?: boolean }>()
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted" width="max-w-3xl text-center">
    <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" size="text-4xl sm:text-5xl leading-tight" />
    <SiteParagraphs :body="section.body" class="mt-6" p-class="text-lg text-site-text" />
    <div v-if="section.buttons?.length" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        v-for="(b, i) in section.buttons"
        :key="i"
        v-bind="linkAttrs(b.url)"
        :class="i === 0
          ? 'rounded-full bg-site-accent px-8 py-4 text-lg font-semibold text-site-on-accent hover:bg-site-highlight transition-colors shadow-lg shadow-site-accent/20'
          : 'rounded-full border border-site-border-button px-8 py-4 text-site-text hover:border-site-accent/50 hover:text-site-heading transition-colors'"
      >
        {{ b.label }}
      </a>
    </div>
  </SiteBlock>
</template>
