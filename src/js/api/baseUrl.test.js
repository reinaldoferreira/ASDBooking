import { expect } from 'chai'
import jsdom from 'jsdom'
import { getBaseUrl, BOOKING_API } from './baseUrl'

describe('getBaseUrl()', () => {
  it('should return the dev url', (done) => {
    jsdom.env('', {
      url: 'http://localhost:3000/?inDev',
      contentType: 'text/html',
      includeNodeLocations: true
    }, (err, window) => {
      expect(getBaseUrl(window)).to.equal('http://localhost:3030')
      done()
      window.close()
    })
  })

  it('should return the production url', (done) => {
    jsdom.env('', {
      url: 'http://asdbooking.surge.sh/',
      contentType: 'text/html',
      includeNodeLocations: true
    }, (err, window) => {
      expect(getBaseUrl(window)).to.equal(BOOKING_API)
      window.close()
      done()
    })
  })
})
