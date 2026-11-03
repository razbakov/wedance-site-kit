<script setup lang="ts">
import type { SiteSection, WeDanceEvent } from '#wedance-site'
// The profile's upcoming events on WeDance; each row signs up there.
const props = defineProps<{ section: SiteSection; events: WeDanceEvent[]; profileUrl: string; tinted?: boolean }>()
const { locale } = useI18n()
const st = useSiteText()

const schedule = computed(() => props.events.map(e => ({ ...e, ...eventParts(e, locale.value), free: isFree(e.price), signup: withUtm(e.url, 'schedule') })))

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div class="text-center mb-16">
      <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" />
      <SiteParagraphs :body="section.body" class="mt-4" p-class="text-site-text max-w-2xl mx-auto" />
    </div>

    <!-- relative: keeps the sr-only header cell inside the scroll box, not the page. -->
    <div class="relative overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-site-border/50">
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-site-accent">{{ st('schedule.day') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-site-accent">{{ st('schedule.time') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-site-accent">{{ st('schedule.class') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-site-accent">{{ st('schedule.instructor') }}</th>
            <th class="pb-4"><span class="sr-only">{{ st('schedule.signUp') }}</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-site-border/30">
          <tr v-for="e in schedule" :key="e.id" class="group cursor-pointer hover:bg-site-border/20 transition-colors" @click="openUrl(e.signup)">
            <td class="py-5 pr-6 text-site-text font-medium">
              {{ e.weekday }}
              <span class="block text-xs font-normal text-site-subtle">{{ e.date }}</span>
            </td>
            <td class="py-5 pr-6 text-site-muted">{{ e.time }}</td>
            <td class="py-5 pr-6">
              <a :href="e.signup" target="_blank" rel="noopener" class="font-medium text-site-heading group-hover:text-site-highlight transition-colors" @click.stop>{{ e.name }}</a>
              <span v-if="e.free" class="ml-2 inline-block rounded-full bg-site-accent/20 px-2.5 py-0.5 text-xs font-semibold text-site-highlight">{{ st('schedule.free') }}</span>
              <span v-if="e.venueName" class="block text-xs text-site-subtle">{{ e.venueName }}</span>
            </td>
            <td class="py-5 pr-6 text-site-muted">{{ e.artists.map(a => a.name).join(', ') }}</td>
            <td class="py-5 text-right">
              <span class="inline-block rounded-full border border-site-accent/40 px-3 py-1 text-xs font-semibold text-site-highlight group-hover:bg-site-accent/10 whitespace-nowrap">{{ st('schedule.signUp') }}</span>
            </td>
          </tr>
          <tr v-if="!schedule.length">
            <td colspan="5" class="py-8 text-center text-site-muted">
              {{ st('schedule.empty') }}
              <a :href="withUtm(profileUrl, 'schedule-empty')" target="_blank" rel="noopener" class="ml-1 text-site-highlight underline underline-offset-4">{{ st('schedule.followOnWeDance') }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-8 flex items-center gap-2 text-sm text-site-subtle">
      <svg class="w-4 h-4 text-site-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{{ st('schedule.registerNote') }}</span>
    </div>

    <SiteCallout v-if="section.callout" :callout="section.callout" class="mt-8" />
  </SiteBlock>
</template>
