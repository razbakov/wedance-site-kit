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

Every `Site*` component paints with role tokens and nothing else, so each site
keeps its own look. In Tailwind they are `site-<role>` colors
(`bg-site-bg/60`, `text-site-muted`, `border-site-border/40` …) plus `font-display`.

| Token | CSS variable | Used for |
|---|---|---|
| `bg` | `--site-bg` | the page; cards sit on it at 50–60 % |
| `surface` | `--site-surface` | tinted sections, tiles, form fields |
| `border` | `--site-border` | card and table lines |
| `border-strong` | `--site-border-strong` | form fields, photo rings |
| `border-button` | `--site-border-button` | secondary (outline) buttons |
| `heading` | `--site-heading` | titles and strong text |
| `text` | `--site-text` | body copy |
| `muted` | `--site-muted` | secondary copy |
| `subtle` | `--site-subtle` | small print, placeholders |
| `faint` | `--site-faint` | the faintest notes and icons |
| `accent` | `--site-accent` | eyebrows, buttons, badges |
| `highlight` | `--site-highlight` | the accent words in titles, hovers |
| `on-accent` | `--site-on-accent` | text on accent buttons |
| `font-display` | `--site-font-display` | headings |

The default is a dark page with a warm accent. A site sets its look one of two ways:

- **CSS variables** — space-separated RGB channels, so opacity modifiers keep
  working. The layer's defaults sit in `:where(:root)`, so any `:root` in the
  site wins:

  ```css
  :root {
    --site-bg: 14 17 28;          /* night */
    --site-surface: 26 30 46;
    --site-heading: 244 236 220;  /* sand */
    --site-text: 226 215 194;
    --site-accent: 201 162 39;    /* gold */
    --site-highlight: 222 186 80;
    --site-on-accent: 14 17 28;
    --site-font-display: 'Cormorant Garamond', serif;
  }
  ```

- **Tailwind colors** (what montuno.club does, mapping its wine/gold palette) —
  the site's `tailwind.config` wins over the layer's:

  ```ts
  colors: {
    site: { 'bg': wine[950], 'surface': wine[900], /* … */ 'accent': gold[500], 'on-accent': wine[950] },
  },
  fontFamily: { display: ['Playfair Display', 'serif'] },
  ```

## Languages

Each site declares its own locales in its `nuxt.config` — the layer declares
none, because Nuxt concatenates layers' locale lists:

```ts
i18n: {
  locales: [
    { code: 'en', language: 'en', name: 'English', file: 'en.json' },
    { code: 'de', language: 'de', name: 'Deutsch', file: 'de.json' },
    // … montuno.club: en de es ru uk · milailacapote.com: en de it es ru fr pt
  ],
  langDir: 'locales',
},
```

The layer's defaults, which a site overrides key by key:

- `strategy: 'prefix_except_default'`, `defaultLocale: 'en'`
- browser-language detection on the homepage only (`redirectOn: 'root'`), remembered in the cookie `i18n_locale` — set `detectBrowserLanguage.cookieKey` to keep an existing one (e.g. `'NEXT_LOCALE'`)
- `/en` and `/en/…` redirect (301) to the unprefixed page — whatever `defaultLocale` is

The page fetches WeDance in the active language (`?lang=<locale>`); WeDance
falls back to the site's first language for missing texts.

## Override a component

Normal Nuxt layer resolution: a component in the site with the same name wins.
To change how a section kind looks, copy its file into the site's
`app/components/site/` and edit it. Types and helpers for it:

```ts
import type { SiteSection, WeDanceEvent } from '#wedance-site'
```

| Section kind | Component |
|---|---|
| `hero` | `SiteHero` — a video file in `video` plays as a muted, looping background with `image` as its poster |
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
- `useSiteText()` → `st(key)`, the components' own words (see Copy).

## Copy

The components' own words (table headers, form placeholders, "Sign up") are
built in for en, de, es, ru, uk, it, fr and pt (`app/utils/siteCopy.ts`), so a
site needs no locale entries for them. To change one, put it in the site's
locale file under the same key — montuno.club says "Class" and "Join Free":

```json
{ "wedanceSite": { "schedule": { "class": "Class" }, "form": { "submit": "Join Free" } } }
```

## Releasing

Sites pin a tag. After a change: bump `version` in `package.json`, tag
`vX.Y.Z`, push the tag, then bump the `#vX.Y.Z` in each site's `package.json`.
