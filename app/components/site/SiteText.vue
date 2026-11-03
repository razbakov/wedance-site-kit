<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
// A heading and paragraphs, with big words (items) or a photo beside it.
defineProps<{ section: SiteSection; tinted?: boolean }>()
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div :class="section.items?.length || section.image ? 'grid md:grid-cols-2 gap-16 items-center' : 'max-w-3xl'">
      <div>
        <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" size="text-3xl sm:text-4xl leading-tight" stacked />
        <SiteParagraphs :body="section.body" class="mt-6" p-class="text-surface-200 leading-relaxed" />
      </div>

      <div v-if="section.items?.length" class="grid grid-cols-2 gap-4">
        <div v-for="item in section.items" :key="item.id" class="rounded-2xl bg-surface-900/50 border border-surface-800/50 p-6 text-center">
          <p class="text-3xl font-bold text-accent-400">{{ item.title }}</p>
          <p v-if="item.body" class="mt-1 text-sm text-surface-300">{{ item.body }}</p>
        </div>
      </div>
      <div v-else-if="section.image" class="rounded-2xl overflow-hidden border border-surface-800/40">
        <img :src="section.image" :alt="section.title || ''" class="w-full h-auto" />
      </div>
    </div>

    <SiteCallout v-if="section.callout" :callout="section.callout" class="mt-12" />
  </SiteBlock>
</template>
