<script setup lang="ts">
// The frame every section below the hero shares; `tinted` alternates down the page.
defineProps<{ anchor?: string; tinted?: boolean; width?: string }>()
</script>

<template>
  <section :id="anchor || undefined" class="py-24 sm:py-32" :class="{ 'bg-surface-900/30': tinted }">
    <div class="mx-auto px-4 sm:px-6" :class="width || 'max-w-6xl'">
      <slot />
    </div>
  </section>
</template>
