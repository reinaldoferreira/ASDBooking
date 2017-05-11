import { expect } from 'chai'
import { possibilitiesMatrix, daysMatrix, timeList } from './bookingUI'
import data from '../api/data.json'

describe('possibilitiesMatrix(day, data)', () => {
  let testData = data.availability[0].startTimes
  it('should return a string to be used as template for the given date', () => {
    expect(possibilitiesMatrix('2016-12-07', testData)).to.be.a('string')
    expect(possibilitiesMatrix('2016-12-07', testData)).to.contain('data-day')
    expect(possibilitiesMatrix('2016-12-07', testData)).to.contain('data-startTime')
    expect(possibilitiesMatrix('2016-12-07', testData)).to.contain('data-endTime')
    expect(possibilitiesMatrix('2016-12-07', testData)).to.not.contain('undefined')
    expect(possibilitiesMatrix('2016-12-07', testData)).to.not.be.an('undefined')
  })
})

describe('daysMatrix(data)', () => {
  let testData = data.availability
  it('should return a string to be used as template for the entire week', () => {
    expect(daysMatrix(testData)).to.be.a('string')
    expect(daysMatrix(testData)).to.contain('booking__col')
    expect(daysMatrix(testData)).to.contain('booking__day')
    expect(daysMatrix(testData)).to.contain('booking__schedule')
    expect(daysMatrix(testData)).to.not.contain('undefined')
    expect(daysMatrix(testData)).to.not.be.an('undefined')
  })
})

describe('timeList(data)', () => {
  let testData = data.availability
  it('should return a string to be used as template for the time list', () => {
    expect(timeList(testData)).to.be.a('string')
    expect(timeList(testData)).to.contain('booking__cel--time')
    expect(timeList(testData)).to.contain('booking__times')
    expect(timeList(testData)).to.not.contain('undefined')
    expect(timeList(testData)).to.not.be.an('undefined')
  })
})
