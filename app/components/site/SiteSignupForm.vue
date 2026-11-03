<script setup lang="ts">
// Sign-ups go to the profile's contacts on WeDance, which also sends the
// welcome email and tells the team. The `success` slot adds to the thank-you
// (a WhatsApp group, say).
const props = defineProps<{ contactsUrl?: string }>()
const { locale } = useI18n()
const st = useSiteText()
const route = useRoute()
const { apiUrl } = useWeDanceProfile()
const formName = (useRuntimeConfig().public.wedanceUtmSource as string) || 'wedance-site'
// Optional: a site that provides $posthog (a function returning the client) gets form events.
const nuxtApp = useNuxtApp()
const posthog = () => (nuxtApp.$posthog as undefined | (() => { capture: (event: string, props?: Record<string, unknown>) => void } | undefined))?.()

const name = ref('')
const email = ref('')
const phone = ref('')
const promoCode = ref('')
// Honeypot: people never see it, bots fill it in.
const website = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

async function submit() {
  if (!email.value || !name.value || !phone.value) return
  status.value = 'submitting'
  errorMessage.value = ''

  const query = route.query
  const utm = Object.fromEntries(UTM.map(k => [k, typeof query[k] === 'string' ? query[k] : '']))
  const source: Record<string, string> = Object.fromEntries(Object.entries({
    ...utm,
    referrer: document.referrer || '',
    promo_code: promoCode.value.trim(),
    page: route.path,
    form: formName,
  }).filter(([, v]) => v))

  try {
    await $fetch(props.contactsUrl || `${apiUrl}/contacts`, {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        locale: locale.value,
        source,
        website: website.value,
      },
    })
    status.value = 'success'
    posthog()?.capture('form_submitted', {
      language: locale.value,
      promo_code: promoCode.value || undefined,
      ...utm,
      referrer: document.referrer || '',
    })
  } catch (e: any) {
    status.value = 'error'
    // 400 (bad input) and 429 (too many sign-ups) carry a readable message.
    errorMessage.value = e?.statusCode < 500 ? e?.data?.statusMessage || '' : ''
    posthog()?.capture('form_error', { status: e?.statusCode })
  }
}
</script>

<template>
  <div>
    <form
      v-if="status !== 'success'"
      class="relative flex flex-col gap-3 max-w-md mx-auto"
      @submit.prevent="submit"
    >
      <div aria-hidden="true" class="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <input v-model="website" name="website" type="text" tabindex="-1" autocomplete="off" />
      </div>
      <input
        v-model="name"
        name="name"
        type="text"
        required
        autocomplete="name"
        :placeholder="st('form.namePlaceholder')"
        class="rounded-full px-6 py-4 bg-site-surface/60 border border-site-border-strong/50 text-site-heading placeholder:text-site-subtle focus:outline-none focus:border-site-accent/50 transition-colors"
      />
      <input
        v-model="email"
        name="email"
        type="email"
        required
        autocomplete="email"
        :placeholder="st('form.emailPlaceholder')"
        class="rounded-full px-6 py-4 bg-site-surface/60 border border-site-border-strong/50 text-site-heading placeholder:text-site-subtle focus:outline-none focus:border-site-accent/50 transition-colors"
      />
      <input
        v-model="phone"
        name="phone"
        type="tel"
        required
        autocomplete="tel"
        :placeholder="st('form.phonePlaceholder')"
        class="rounded-full px-6 py-4 bg-site-surface/60 border border-site-border-strong/50 text-site-heading placeholder:text-site-subtle focus:outline-none focus:border-site-accent/50 transition-colors"
      />
      <input
        v-model="promoCode"
        name="promo_code"
        type="text"
        :placeholder="st('form.promoCodePlaceholder')"
        class="rounded-full px-6 py-4 bg-site-surface/60 border border-site-border-strong/50 text-site-heading placeholder:text-site-subtle focus:outline-none focus:border-site-accent/50 transition-colors"
      />
      <button
        type="submit"
        :disabled="status === 'submitting'"
        class="rounded-full bg-site-accent px-8 py-4 text-lg font-semibold text-site-on-accent hover:bg-site-highlight transition-colors shadow-lg shadow-site-accent/20 disabled:opacity-60"
      >
        {{ status === 'submitting' ? st('form.submitting') : st('form.submit') }}
      </button>
    </form>

    <div v-if="status === 'success'" class="text-center">
      <p class="text-xl font-semibold text-site-highlight">{{ st('form.success') }}</p>
      <slot name="success" />
    </div>

    <p v-if="status === 'error'" class="mt-3 text-sm text-red-400 text-center">
      {{ errorMessage || st('form.error') }}
    </p>
    <p v-if="status !== 'success'" class="mt-3 text-xs text-site-faint text-center">
      {{ st('form.privacy') }}
    </p>
  </div>
</template>
