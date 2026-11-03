<script setup lang="ts">
// Paragraphs split on blank lines; single newlines stay line breaks.
// The root takes the top margin (class), each paragraph the text style (pClass).
const props = defineProps<{ body?: string; pClass?: string }>()
const list = computed(() => paragraphs(props.body))
</script>

<template>
  <div v-if="list.length">
    <p v-for="(p, i) in list" :key="i" class="whitespace-pre-line" :class="[pClass, { 'mt-4': i > 0 }]">{{ p }}</p>
  </div>
</template>
