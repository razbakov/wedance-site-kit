import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { siteCopy } from '../app/utils/siteCopy'
import { cancelReason, isCancelled, schemaEventStatus, type WeDanceEvent } from '../app/utils/wedanceSite'

const event = (extra: Partial<WeDanceEvent> = {}): WeDanceEvent => ({
  id: 'e1',
  name: 'Salsa From Zero',
  type: 'class',
  startDate: '2026-11-15T18:00:00.000Z',
  endDate: null,
  timezone: 'Europe/Berlin',
  venueName: 'Buena Vista Bar',
  venueAddress: 'Am Einlass 2A',
  price: 'free',
  cover: null,
  styles: ['Salsa Cubana'],
  artists: [],
  url: 'https://2026.wedance.vip/events/e1',
  ...extra,
})

describe('cancelled events (RAZ-968)', () => {
  test('an event without the field is scheduled, so older WeDance feeds keep working', () => {
    expect(isCancelled(event())).toBe(false)
    expect(cancelReason(event())).toBe('')
    expect(schemaEventStatus(event())).toBe('https://schema.org/EventScheduled')
  })

  test('a cancelled event is marked cancelled, with its reason trimmed', () => {
    const e = event({ cancelled: true, cancelReason: '  Public holiday, no dancing.  ' })
    expect(isCancelled(e)).toBe(true)
    expect(cancelReason(e)).toBe('Public holiday, no dancing.')
    expect(schemaEventStatus(e)).toBe('https://schema.org/EventCancelled')
  })

  test('a cancelled event without a reason has an empty reason', () => {
    expect(cancelReason(event({ cancelled: true, cancelReason: null }))).toBe('')
  })

  test('a reason on an event that is not cancelled is ignored', () => {
    expect(cancelReason(event({ cancelled: false, cancelReason: 'stale' }))).toBe('')
  })

  test('every built-in language has the cancelled label and the details link', () => {
    for (const [lang, copy] of Object.entries(siteCopy)) {
      expect(copy.schedule.cancelled, lang).toBeTruthy()
      expect(copy.schedule.details, lang).toBeTruthy()
    }
  })

  test('the schedule keeps cancelled dates, crossed out, with the reason and no sign-up button', () => {
    const source = readFileSync(resolve(import.meta.dir, '../app/components/site/SiteEvents.vue'), 'utf8')
    expect(source).toContain(':data-cancelled')
    expect(source).toContain('line-through')
    expect(source).toContain("st('schedule.cancelled')")
    expect(source).toContain('e.reason')
    expect(source).toMatch(/v-if="e\.cancelled"[^>]*>\{\{ st\('schedule\.details'\) \}\}/)
    expect(source).toMatch(/v-else[^>]*>\{\{ st\('schedule\.signUp'\) \}\}/)
  })
})
