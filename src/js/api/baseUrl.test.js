import { expect } from 'chai'
import { getBaseUrl, BOOKING_API } from './baseUrl'

describe('getBaseUrl()', () => {
  it('should return the dev url', () => {
    let w = { location: { search: 'dev' } }
    expect(getBaseUrl(w)).to.equal('http://localhost:3030')
  })

  it('should return the production url', () => {
    let w = { location: { search: '' } }
    expect(getBaseUrl(w)).to.equal(BOOKING_API)
  })
})
