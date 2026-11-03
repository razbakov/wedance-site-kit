<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
defineProps<{ section: SiteSection; tinted?: boolean }>()
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted" width="max-w-4xl">
    <div class="text-center mb-12">
      <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" />
      <SiteParagraphs :body="section.body" class="mt-4" p-class="text-site-text max-w-2xl mx-auto leading-relaxed" />
    </div>
    <SiteVideoEmbed :url="section.video" :title="[section.title, section.titleAccent].filter(Boolean).join(' ')" />
  </SiteBlock>
</template>
