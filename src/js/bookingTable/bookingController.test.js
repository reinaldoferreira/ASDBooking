import { runAfterPromise } from './bookingController'
import data from '../api/data.json'

describe('runAfterPromise()', () => {
  document.body.innerHTML = '<ul id="bookingTable"></ul>'
  let table = document.getElementById('bookingTable')
  let testData

  test('it should print Nothing found', () => {
    runAfterPromise([])
    expect(table.innerHTML).toContain('<p>Nothing found</p>')
    runAfterPromise('')
    expect(table.innerHTML).toContain('<p>Nothing found</p>')
    runAfterPromise({})
    expect(table.innerHTML).toContain('<p>Nothing found</p>')
  })

  test('it should print the booking table', () => {
    testData = data.availability
    runAfterPromise(testData)
    expect(table.innerHTML).not.toContain('<p>Nothing found</p>')
    expect(table.innerHTML).not.toContain('undefined')
    expect(table.innerHTML).toMatchSnapshot()
  })
})
