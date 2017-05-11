import { possibilitiesMatrix, daysMatrix, timeList } from './bookingUI'
import data from '../api/data.json'

describe('bookingUI', () => {
  describe('possibilitiesMatrix', () => {
    let testData = data.availability[0].startTimes
    test('it should return a string to be used as template for the given date', () => {
      expect(possibilitiesMatrix('2016-12-07', testData)).toContain('data-day')
      expect(possibilitiesMatrix('2016-12-07', testData)).toContain('data-startTime')
      expect(possibilitiesMatrix('2016-12-07', testData)).toContain('data-endTime')
      expect(possibilitiesMatrix('2016-12-07', testData)).not.toContain('undefined')
      expect(possibilitiesMatrix('2016-12-07', testData)).not.toBe('undefined')
      expect(possibilitiesMatrix('2016-12-07', testData)).toMatchSnapshot()
    })
  })

  describe('daysMatrix', () => {
    let testData = data.availability
    test('it should return a string to be used as template for the entire week', () => {
      expect(daysMatrix(testData)).toContain('booking__col')
      expect(daysMatrix(testData)).toContain('booking__day')
      expect(daysMatrix(testData)).toContain('booking__schedule')
      expect(daysMatrix(testData)).not.toContain('undefined')
      expect(daysMatrix(testData)).not.toBe('undefined')
      expect(possibilitiesMatrix('2016-12-07', testData)).toMatchSnapshot()
    })
  })

  describe('timeList', () => {
    let testData = data.availability
    test('it should return a string to be used as template for the time list', () => {
      expect(timeList(testData)).toContain('booking__cel--time')
      expect(timeList(testData)).toContain('booking__times')
      expect(timeList(testData)).not.toContain('undefined')
      expect(timeList(testData)).not.toBe('undefined')
      expect(possibilitiesMatrix('2016-12-07', testData)).toMatchSnapshot()
    })
  })
})
