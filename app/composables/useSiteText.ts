import { siteCopy } from '../utils/siteCopy'

/**
 * The components' own words: the site's message for `wedanceSite.<key>` when
 * it has one in this language, else the layer's copy, else English.
 */
export function useSiteText() {
  const { t, te, locale } = useI18n()
  return (key: string) => {
    if (te(`wedanceSite.${key}`)) return t(`wedanceSite.${key}`)
    const [group, name] = key.split('.') as ['schedule' | 'form', string]
    return siteCopy[locale.value]?.[group]?.[name] ?? siteCopy.en![group][name] ?? key
  }
}
