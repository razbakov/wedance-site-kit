import { describe, expect, test } from 'bun:test'

import { siteCopy } from '../app/utils/siteCopy'
import { peopleColumn } from '../app/utils/wedanceSite'

const row = (...handles: string[]) => ({ artists: handles.map(h => ({ handle: h, name: h })) })

describe('schedule people column (RAZ-1094)', () => {
  test('a school keeps Teacher, and an older feed without the field does too', () => {
    expect(peopleColumn({ username: 'montuno', schedulePeople: 'teacher' }, [row('ana')])).toBe('schedule.instructor')
    expect(peopleColumn({ username: 'montuno' }, [row('ana')])).toBe('schedule.instructor')
  })

  test('an artist or orchestra site says Artist; a venue says With', () => {
    expect(peopleColumn({ username: 'los.filinsclub', schedulePeople: 'artist' }, [row('dj.x')])).toBe('schedule.artist')
    expect(peopleColumn({ username: 'club', schedulePeople: 'with' }, [row('band')])).toBe('schedule.with')
  })

  test('the column is hidden when it would only name the site owner, or nobody', () => {
    expect(peopleColumn({ username: 'Los.Filinsclub', schedulePeople: 'artist' }, [row('los.filinsclub'), row()])).toBeNull()
    expect(peopleColumn({ username: 'los.filinsclub', schedulePeople: 'artist' }, [])).toBeNull()
  })

  test('every language has the new words', () => {
    for (const [lang, copy] of Object.entries(siteCopy)) {
      expect(copy.schedule.artist, lang).toBeTruthy()
      expect(copy.schedule.with, lang).toBeTruthy()
    }
  })
})
