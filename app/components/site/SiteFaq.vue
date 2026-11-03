<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
defineProps<{ section: SiteSection; tinted?: boolean }>()

const openFaq = ref<string | null>(null)
function toggleFaq(id: string) {
  openFaq.value = openFaq.value === id ? null : id
}
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted" width="max-w-3xl">
    <div class="text-center mb-16">
      <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" />
    </div>

    <div class="space-y-3">
      <div
        v-for="item in section.items ?? []"
        :key="item.id"
        class="rounded-xl border border-site-border/40 bg-site-bg/60 overflow-hidden"
      >
        <button
          class="flex w-full items-center justify-between px-6 py-5 text-left"
          :aria-expanded="openFaq === item.id"
          @click="toggleFaq(item.id)"
        >
          <span class="font-medium pr-4">{{ item.title }}</span>
          <svg
            class="w-5 h-5 shrink-0 text-site-subtle transition-transform duration-200"
            :class="{ 'rotate-180': openFaq === item.id }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <Transition
          enter-from-class="grid-rows-[0fr]"
          enter-active-class="grid transition-[grid-template-rows] duration-200"
          enter-to-class="grid-rows-[1fr]"
          leave-from-class="grid-rows-[1fr]"
          leave-active-class="grid transition-[grid-template-rows] duration-200"
          leave-to-class="grid-rows-[0fr]"
        >
          <div v-if="openFaq === item.id" class="px-6 pb-5">
            <SiteParagraphs :body="item.body" p-class="text-site-muted leading-relaxed" />
          </div>
        </Transition>
      </div>
    </div>
  </SiteBlock>
</template>
