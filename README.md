# wedance-site-kit

A Nuxt layer for a website whose content, events and sign-ups live on a
[WeDance](https://2026.wedance.vip) profile. WeDance is the CMS (every section,
in every language) and the CRM (the sign-up form lands in the profile's
contacts). The site only draws what WeDance returns:

- `GET  /api/profiles/<username>/site?lang=<locale>` — the sections in one language, plus the profile's upcoming events
- `GET  /api/profiles/<username>/events?days=<n>` — the events alone
- `POST /api/profiles/<username>/contacts` — a sign-up

The contract is `shared/types/profileSite.ts` in
[wedance-2026](https://github.com/razbakov/wedance-2026). `app/utils/wedanceSite.ts`
mirrors its resolved (one-language) shape; change the contract there first.

Used by [montuno.club](https://github.com/razbakov/montuno-club).

## Adopt it

The site needs Nuxt ≥ 3.12 (Nuxt 4 is fine), `@nuxtjs/tailwindcss` (Tailwind 3)
and `@nuxtjs/i18n`. The layer adds to their config; it doesn't install them.

1. Add the layer, pinned to a tag:

   ```bash
   bun add github:razbakov/wedance-site-kit#v0.1.0
   ```

2. Extend it and name the profile in `nuxt.config.ts`:

   ```ts
   export default defineNuxtConfig({
     extends: ['wedance-site-kit'],
     modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
     runtimeConfig: {
       public: {
         wedanceProfile: 'dancegods-company',
         wedanceUtmSource: 'dancegodscompany.com',
       },
     },
   })
   ```

3. Render the sections on a page:

   ```vue
   <script setup lang="ts">
   const { site } = useWeDanceSite()
   useSeoMeta({ title: () => site.value?.seo.title, description: () => site.value?.seo.description })
   </script>

   <template>
     <SiteSections>
       <template #fallback="{ profileUrl }">
         <a :href="withUtm(profileUrl, 'site-unavailable')">Find us on WeDance</a>
       </template>
     </SiteSections>
   </template>
   ```

   `#fallback` shows when WeDance can't be reached or has no section this site can draw.

### Runtime config

All under `runtimeConfig.public`; each can be set by env at runtime.

| Key | Env | Default | What |
|---|---|---|---|
| `wedanceProfile` | `NUXT_PUBLIC_WEDANCE_PROFILE` | — (required) | The profile's WeDance username, e.g. `montunoclub` |
| `wedanceUrl` | `NUXT_PUBLIC_WEDANCE_URL` | `https://2026.wedance.vip` | Where WeDance runs (point at a preview or localhost to test) |
| `wedanceUtmSource` | `NUXT_PUBLIC_WEDANCE_UTM_SOURCE` | `''` | `utm_source` on links to WeDance, and the `form` tag on sign-ups — usually the site's domain |

## Theme

Every `Site*` component paints with three Tailwind colors and one font, never
with a site's own palette:

| Token | Tailwind | Used for |
|---|---|---|
| `surface` 50–950 | `bg-surface-950`, `text-surface-200`, `border-surface-800/40` … | the page's own color: backgrounds, borders, muted text |
| `accent` 50–950 | `text-accent-400`, `bg-accent-500` … | eyebrows, highlights, buttons |
| `fg` | `text-fg` | headings and strong text on the surface |
| `font-display` | `font-display` | headings |

The default is a dark page with a warm accent. A site sets its look one of two ways:

- **Tailwind colors** (what montuno.club does) — the site's `tailwind.config` wins over the layer's:

  ```ts
  colors: { surface: wine, accent: gold, fg: '#ffffff' },
  fontFamily: { display: ['Playfair Display', 'serif'] },
  ```

- **CSS variables** — RGB channels, so opacity modifiers keep working. The
  layer's defaults sit in `:where(:root)`, so any `:root` in the site wins:

  ```css
  :root {
    --wds-surface-950: 255 255 255;   /* a light page… */
    --wds-surface-200: 64 64 64;
    --wds-accent-500: 200 30 60;
    --wds-fg: 20 20 20;               /* …with dark text */
    --wds-font-display: 'Cormorant', serif;
  }
  ```

  All variables are listed in `app/assets/css/wedance-site.css`.

## Override a component

Normal Nuxt layer resolution: a component in the site with the same name wins.
To change how a section kind looks, copy its file into the site's
`app/components/site/` and edit it. Types and helpers for it:

```ts
import type { SiteSection, WeDanceEvent } from '#wedance-site'
```

| Section kind | Component |
|---|---|
| `hero` | `SiteHero` |
| `text` | `SiteText` |
| `cards` | `SiteCards` |
| `events` | `SiteEvents` (props: `events`, `profileUrl`) |
| `faq` | `SiteFaq` |
| `video` | `SiteVideo` |
| `person` | `SitePerson` |
| `location` | `SiteLocation` |
| `signup` | `SiteSignup` (prop: `contactsUrl`) → `SiteSignupForm` |
| `cta` | `SiteCta` |

Building blocks they share: `SiteBlock` (section frame; `tinted` alternates down the page),
`SiteHeading`, `SiteParagraphs`, `SiteCallout`, `SiteVideoEmbed`. `SiteSections` maps kinds
to components; kinds it doesn't know are skipped.

`SiteSignupForm` has a `success` slot for what follows the thank-you — montuno.club
overrides `SiteSignup` to put its WhatsApp group there. If the site provides
`$posthog` (a function returning the PostHog client), the form captures
`form_submitted` / `form_error`.

## Composables and helpers (auto-imported)

- `useWeDanceSite()` → `{ site, sections, events, profileUrl, contactsUrl, error, status }`. One fetch per language, shared by every caller (a header building its menu from `sections` costs nothing extra).
- `useWeDanceEvents({ days })` → `{ events, profileUrl, status }`, for pages without the sections (a kiosk).
- `useWeDanceProfile()` → `{ base, username, profileUrl, apiUrl }` from runtime config.
- `withUtm(url, medium)`, `eventParts(event, locale)`, `isFree(price)`, `paragraphs(body)`, `linkAttrs(url)`, `youtubeEmbed(url)`, `isWhatsApp(url)`.

## Copy

The components' own words (table headers, form placeholders, "Sign up") are in
`i18n/locales/` under `wedanceSite.*`, in en, de, es, ru and uk. A site's own
locale files win key by key — montuno.club says "Class" and "Join Free" where
the layer says "Event" and "Sign up".

## Releasing

Sites pin a tag. After a change: bump `version` in `package.json`, tag
`vX.Y.Z`, push the tag, then bump the `#vX.Y.Z` in each site's `package.json`.
