<script setup lang="ts">
// The whole hosted page: header, sections, footer, in the site's own look.
useSiteTheme()
const { site } = useWeDanceSite()
useSeoMeta({ title: () => site.value?.seo.title || site.value?.profile.name, description: () => site.value?.seo.description })
</script>

<template>
  <div class="min-h-screen bg-site-bg text-site-text">
    <SiteHeader />
    <main>
      <SiteSections>
        <template #fallback="{ profileUrl }">
          <p class="p-16 text-center">No site to show. <a :href="profileUrl" class="underline">Open the WeDance page</a></p>
        </template>
      </SiteSections>
    </main>
    <SiteFooter legal />
  </div>
</template>
