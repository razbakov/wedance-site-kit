<script setup lang="ts">
const props = defineProps<{ url?: string; title?: string }>()
const src = computed(() => youtubeEmbed(props.url))
</script>

<template>
  <div v-if="src" class="rounded-2xl overflow-hidden border border-surface-800/40 aspect-video">
    <iframe
      :src="src"
      width="100%"
      height="100%"
      class="w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      :title="title || 'Video'"
    />
  </div>
</template>
