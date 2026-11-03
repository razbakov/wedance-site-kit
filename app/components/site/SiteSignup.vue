<script setup lang="ts">
import type { SiteSection } from '#wedance-site'
// People who sign up here land in the profile's contacts on WeDance.
defineProps<{ section: SiteSection; contactsUrl: string; tinted?: boolean }>()
</script>

<template>
  <SiteBlock :anchor="section.anchor" :tinted="tinted" width="max-w-3xl text-center">
    <SiteHeading :eyebrow="section.eyebrow" :title="section.title" :accent="section.titleAccent" size="text-4xl sm:text-5xl leading-tight" />
    <SiteParagraphs :body="section.body" class="mt-6" p-class="text-lg text-site-text" />
    <div class="mt-10">
      <SiteSignupForm :contacts-url="contactsUrl" />
    </div>
  </SiteBlock>
</template>
