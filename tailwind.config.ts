// Theme tokens, named by role. Every Site* component paints with these and
// nothing else, so each site keeps its own look by setting them — as CSS
// variables (app/assets/css/wedance-site.css lists them all) or by redefining
// `colors.site` in its own tailwind.config, which wins over this one.
const roles = [
  'bg', // the page; cards sit on it at 50–60 % (bg-site-bg/60)
  'surface', // tinted sections, tiles, form fields
  'border', // card and table lines
  'border-strong', // form fields, photo rings
  'border-button', // secondary (outline) buttons
  'heading', // titles and strong text
  'text', // body copy
  'muted', // secondary copy
  'subtle', // small print, placeholders
  'faint', // the faintest notes and icons
  'accent', // eyebrows, buttons, badges
  'highlight', // the accent words in titles, hovers
  'on-accent', // text on accent buttons
]

export default {
  theme: {
    extend: {
      colors: {
        site: Object.fromEntries(roles.map(r => [r, `rgb(var(--site-${r}) / <alpha-value>)`])),
      },
      fontFamily: {
        display: 'var(--site-font-display)',
      },
    },
  },
}
