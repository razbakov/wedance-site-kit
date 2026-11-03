<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
// Offers, steps or stops. Numbered tags make steps: up to four as cards,
// more as a vertical list (the bar crawl's stops).
const props = defineProps<{ section: SiteSection; tinted?: boolean }>()

const items = computed(() => props.section.items ?? [])
const numbered = computed(() => items.value.length > 0 && items.value.every(i => /^\d+$/.test(i.tag?.trim() ?? '')))
const layout = computed(() => (numbered.value ? (items.value.length > 4 ? 'list' : 'steps') : 'cards'))
const cols = computed(() => ({ 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' } as Record<number, string>)[items.value.length] ?? 'md:grid-cols-2 lg:grid-cols-3')
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div class="text-center" :class="layout === 'steps' ? 'mb-16' : 'mb-12'">
      <SiteHeading
        :eyebrow="section.eyebrow"
        :title="section.title"
        :accent="section.titleAccent"
        :size="layout === 'steps' ? 'text-3xl sm:text-4xl' : 'text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl mx-auto'"
        :stacked="layout === 'list'"
      />
      <SiteParagraphs :body="section.body" class="mt-5" p-class="text-surface-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed" />
    </div>

    <ol v-if="layout === 'list'" class="list-none mx-auto max-w-2xl space-y-5">
      <li v-for="item in items" :key="item.id" class="flex gap-5">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-500/40 bg-accent-500/10 font-display text-xl text-accent-400">
          {{ item.tag }}
        </span>
        <div class="pt-1">
          <h3 class="font-display text-xl text-fg">
            <a v-if="item.url" v-bind="linkAttrs(item.url)" class="hover:text-accent-400 transition-colors">{{ item.title }}</a>
            <template v-else>{{ item.title }}</template>
          </h3>
          <p v-if="item.body" class="mt-1 text-sm text-surface-200 leading-relaxed whitespace-pre-line">{{ item.body }}</p>
        </div>
      </li>
    </ol>

    <div v-else-if="layout === 'steps'" class="grid gap-8" :class="cols">
      <div v-for="item in items" :key="item.id" class="relative rounded-2xl bg-surface-950/60 border border-surface-800/40 p-8">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10 text-accent-400 font-display text-xl">
          {{ item.tag }}
        </div>
        <h3 class="text-lg font-semibold mb-2">
          <a v-if="item.url" v-bind="linkAttrs(item.url)" class="hover:text-accent-400 transition-colors">{{ item.title }}</a>
          <template v-else>{{ item.title }}</template>
        </h3>
        <p v-if="item.body" class="text-surface-300 text-sm leading-relaxed whitespace-pre-line">{{ item.body }}</p>
      </div>
    </div>

    <div v-else class="grid gap-6" :class="cols">
      <!-- The first card is the headline offer, as on the original page. -->
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="rounded-2xl p-6 sm:p-8"
        :class="i === 0 ? 'border-2 border-accent-500/40 bg-accent-500/10' : 'border border-surface-800/50 bg-surface-950/50'"
      >
        <img v-if="item.image" :src="item.image" :alt="item.title || ''" class="mb-5 w-full rounded-xl object-cover aspect-video" />
        <p v-if="item.tag" class="text-xs font-bold uppercase tracking-[0.18em] text-accent-400 mb-2">{{ item.tag }}</p>
        <h3 v-if="item.title" class="font-display text-2xl text-fg mb-3">
          <a v-if="item.url" v-bind="linkAttrs(item.url)" class="hover:text-accent-400 transition-colors">{{ item.title }}</a>
          <template v-else>{{ item.title }}</template>
        </h3>
        <p v-if="item.body" class="text-sm text-surface-200 leading-relaxed whitespace-pre-line">{{ item.body }}</p>
      </div>
    </div>

    <SiteVideoEmbed v-if="section.video" :url="section.video" :title="[section.title, section.titleAccent].filter(Boolean).join(' ')" class="mx-auto max-w-3xl mt-12" />

    <SiteCallout v-if="section.callout" :callout="section.callout" :class="['mt-10', layout === 'list' ? 'mx-auto max-w-2xl' : '']" />
  </SiteBlock>
</template>
