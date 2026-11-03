<script setup lang="ts">
import type { SiteSection, WeDanceEvent } from '#wedance-site'
// The profile's upcoming events on WeDance; each row signs up there.
const props = defineProps<{ section: SiteSection; events: WeDanceEvent[]; profileUrl: string; tinted?: boolean }>()
const { locale } = useI18n()

const schedule = computed(() => props.events.map(e => ({ ...e, ...eventParts(e, locale.value), free: isFree(e.price), signup: withUtm(e.url, 'schedule') })))

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted">
    <div class="text-center mb-16">
      <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" />
      <SiteParagraphs :body="section.body" class="mt-4" p-class="text-surface-200 max-w-2xl mx-auto" />
    </div>

    <!-- relative: keeps the sr-only header cell inside the scroll box, not the page. -->
    <div class="relative overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-surface-800/50">
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-accent-500">{{ $t('wedanceSite.schedule.day') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-accent-500">{{ $t('wedanceSite.schedule.time') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-accent-500">{{ $t('wedanceSite.schedule.class') }}</th>
            <th class="pb-4 pr-6 text-sm font-semibold uppercase tracking-wider text-accent-500">{{ $t('wedanceSite.schedule.instructor') }}</th>
            <th class="pb-4"><span class="sr-only">{{ $t('wedanceSite.schedule.signUp') }}</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-800/30">
          <tr v-for="e in schedule" :key="e.id" class="group cursor-pointer hover:bg-surface-800/20 transition-colors" @click="openUrl(e.signup)">
            <td class="py-5 pr-6 text-surface-200 font-medium">
              {{ e.weekday }}
              <span class="block text-xs font-normal text-surface-400">{{ e.date }}</span>
            </td>
            <td class="py-5 pr-6 text-surface-300">{{ e.time }}</td>
            <td class="py-5 pr-6">
              <a :href="e.signup" target="_blank" rel="noopener" class="font-medium text-fg group-hover:text-accent-400 transition-colors" @click.stop>{{ e.name }}</a>
              <span v-if="e.free" class="ml-2 inline-block rounded-full bg-accent-500/20 px-2.5 py-0.5 text-xs font-semibold text-accent-400">{{ $t('wedanceSite.schedule.free') }}</span>
              <span v-if="e.venueName" class="block text-xs text-surface-400">{{ e.venueName }}</span>
            </td>
            <td class="py-5 pr-6 text-surface-300">{{ e.artists.map(a => a.name).join(', ') }}</td>
            <td class="py-5 text-right">
              <span class="inline-block rounded-full border border-accent-500/40 px-3 py-1 text-xs font-semibold text-accent-400 group-hover:bg-accent-500/10 whitespace-nowrap">{{ $t('wedanceSite.schedule.signUp') }}</span>
            </td>
          </tr>
          <tr v-if="!schedule.length">
            <td colspan="5" class="py-8 text-center text-surface-300">
              {{ $t('wedanceSite.schedule.empty') }}
              <a :href="withUtm(profileUrl, 'schedule-empty')" target="_blank" rel="noopener" class="ml-1 text-accent-400 underline underline-offset-4">{{ $t('wedanceSite.schedule.followOnWeDance') }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-8 flex items-center gap-2 text-sm text-surface-400">
      <svg class="w-4 h-4 text-accent-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{{ $t('wedanceSite.schedule.registerNote') }}</span>
    </div>

    <SiteCallout v-if="section.callout" :callout="section.callout" class="mt-8" />
  </SiteBlock>
</template>
