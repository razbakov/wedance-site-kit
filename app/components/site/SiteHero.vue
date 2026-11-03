<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
defineProps<{ section: SiteSection; tinted?: boolean }>()
</script>

<template>
  <section :id="section.anchor || undefined" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img
      v-if="section.image"
      :src="section.image"
      :alt="[section.title, section.titleAccent].filter(Boolean).join(' ')"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-surface-950/80 via-surface-950/70 to-surface-950" />

    <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
      <p v-if="section.eyebrow" class="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-400">
        {{ section.eyebrow }}
      </p>
      <h1 class="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
        {{ section.title }}<br v-if="section.title && section.titleAccent" />
        <span v-if="section.titleAccent" class="text-accent-400">{{ section.titleAccent }}</span>
      </h1>
      <SiteParagraphs :body="section.body" class="mt-6" p-class="text-lg sm:text-xl text-surface-200 max-w-2xl mx-auto leading-relaxed" />
      <div v-if="section.buttons?.length" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          v-for="(b, i) in section.buttons"
          :key="i"
          v-bind="linkAttrs(b.url)"
          :class="i === 0
            ? 'rounded-full bg-accent-500 px-8 py-4 text-lg font-semibold text-surface-950 hover:bg-accent-400 transition-colors shadow-lg shadow-accent-500/20'
            : 'text-sm text-surface-300 hover:text-fg transition-colors underline underline-offset-4'"
        >
          {{ b.label }}
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
