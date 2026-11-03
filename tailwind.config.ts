// Theme tokens. Every Site* component paints with these three, never with a
// site's own palette, so each site keeps its look by setting them — either as
// CSS variables (see app/assets/css/wedance-site.css) or by redefining the
// colors in its own tailwind.config (which wins over this one).
//   surface — the page's own color: backgrounds, borders, muted text
//   accent  — eyebrows, highlights, buttons
//   fg      — headings and strong text on the surface
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const scale = (name: string) => Object.fromEntries(shades.map(s => [s, `rgb(var(--wds-${name}-${s}) / <alpha-value>)`]))

export default {
  theme: {
    extend: {
      colors: {
        surface: scale('surface'),
        accent: scale('accent'),
        fg: 'rgb(var(--wds-fg) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--wds-font-display)',
      },
    },
  },
}
