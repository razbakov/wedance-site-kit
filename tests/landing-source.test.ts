import { describe, expect, test } from 'bun:test'
import { isWeDanceLink, landingSourceLabel, withLandingSource } from '../app/utils/landingSource'

const HOST = 'montuno.club'

describe('landing source (RAZ-1074)', () => {
  test('a tagged landing names its utm source and medium', () => {
    expect(landingSourceLabel({ utm_source: 'Instagram', utm_medium: 'bio' }, 'https://l.instagram.com/x?u=1', HOST)).toBe('instagram-bio')
    expect(landingSourceLabel({ utm_source: 'flyer' }, '', HOST)).toBe('flyer')
  })

  test('else the outside site that sent them, host only', () => {
    expect(landingSourceLabel({}, 'https://l.instagram.com/?u=https%3A%2F%2Fmontuno.club&e=secret', HOST)).toBe('l.instagram.com')
    expect(landingSourceLabel({}, 'https://www.google.com/', HOST)).toBe('google.com')
  })

  test('direct when there is nothing, or the referrer is the site itself', () => {
    expect(landingSourceLabel({}, '', HOST)).toBe('direct')
    expect(landingSourceLabel({}, 'https://montuno.club/de', HOST)).toBe('direct')
    expect(landingSourceLabel({}, 'not a url', HOST)).toBe('direct')
  })

  test('only WeDance links get it, and a campaign the link names stays', () => {
    expect(isWeDanceLink('https://2026.wedance.vip/events/x', 'https://2026.wedance.vip')).toBe(true)
    expect(isWeDanceLink('https://wa.me/49123', 'https://2026.wedance.vip')).toBe(false)
    expect(withLandingSource('https://2026.wedance.vip/events/x?utm_source=montuno.club&utm_medium=schedule', 'instagram-bio'))
      .toBe('https://2026.wedance.vip/events/x?utm_source=montuno.club&utm_medium=schedule&utm_campaign=instagram-bio')
    expect(withLandingSource('https://2026.wedance.vip/e?utm_campaign=autumn', 'direct')).toBe('https://2026.wedance.vip/e?utm_campaign=autumn')
  })
})
