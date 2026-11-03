<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
const props = defineProps<{ section: SiteSection; tinted?: boolean }>()

const mapHref = computed(() => props.section.mapUrl || (props.section.address ? `https://maps.google.com/?q=${encodeURIComponent(props.section.address)}` : ''))
const embed = computed(() => (props.section.address ? `https://www.google.com/maps?q=${encodeURIComponent(props.section.address)}&output=embed` : ''))
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" size="text-3xl sm:text-4xl leading-tight" />
        <SiteParagraphs :body="section.body" class="mt-6" p-class="text-site-text leading-relaxed" />
        <div class="mt-6 space-y-3 text-site-muted">
          <div v-for="item in section.items ?? []" :key="item.id" class="flex items-start gap-3">
            <svg class="w-5 h-5 mt-0.5 text-site-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ item.title }}</span>
          </div>
          <div v-if="section.address" class="flex items-start gap-3">
            <svg class="w-5 h-5 mt-0.5 text-site-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <a :href="mapHref" target="_blank" rel="noopener" class="underline hover:text-site-heading transition-colors">{{ section.address }}</a>
          </div>
        </div>
      </div>

      <div v-if="embed" class="rounded-2xl overflow-hidden border border-site-border/40">
        <iframe
          :src="embed"
          width="100%"
          height="350"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          :title="section.address"
        />
      </div>
    </div>
  </SiteBlock>
</template>
