<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
// A teacher, DJ or host: round photo, name and story.
defineProps<{ section: SiteSection; tinted?: boolean }>()
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div class="order-2 md:order-1">
        <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" size="text-3xl sm:text-4xl leading-tight" />
        <SiteParagraphs :body="section.body" class="mt-6" p-class="text-site-text leading-relaxed" />
        <dl v-if="section.items?.length" class="mt-6 grid grid-cols-2 gap-4">
          <div v-for="item in section.items" :key="item.id">
            <dt class="text-xl font-bold text-site-highlight">{{ item.title }}</dt>
            <dd v-if="item.body" class="text-sm text-site-muted">{{ item.body }}</dd>
          </div>
        </dl>
      </div>
      <div v-if="section.image" class="order-1 md:order-2 flex justify-center">
        <div class="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-site-border-strong/50">
          <img
            :src="section.image"
            :alt="[section.title, section.titleAccent].filter(Boolean).join(' ')"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  </SiteBlock>
</template>
