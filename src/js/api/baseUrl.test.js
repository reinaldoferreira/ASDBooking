/* global expect */
import { getBaseUrl, BOOKING_API } from './baseUrl'

describe('getBaseUrl()', () => {
  test('it should return the dev url', () => {
    let w = { location: { search: 'dev' } }
    expect(getBaseUrl(w)).toBe('http://localhost:3030')
  })

  test('it should return the production url', () => {
    let w = { location: { search: '' } }
    expect(getBaseUrl(w)).toBe(BOOKING_API)
  })
})
