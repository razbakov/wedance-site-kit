<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  accent?: string
  /** Title size/leading classes. */
  size?: string
  /** Accent on its own line. */
  stacked?: boolean
}>(), { size: 'text-3xl sm:text-4xl' })
</script>

<template>
  <div>
    <p v-if="eyebrow" class="text-sm font-medium uppercase tracking-[0.2em] text-accent-500 mb-4">{{ eyebrow }}</p>
    <h2 v-if="title || accent" class="font-display" :class="size">
      {{ title }}<br v-if="stacked && title && accent" /><template v-else-if="title && accent">{{ ' ' }}</template><span v-if="accent" class="text-accent-400">{{ accent }}</span>
    </h2>
  </div>
</template>
