import { daysMatrix, timeList } from './bookingUI'

// body to be executed once promise is done
export const runAfterPromise = (data) => {
  // Testing if data is right
  if (!Array.isArray(data) || data.length === 0) {
    global.document.getElementById('bookingTable').innerHTML = '<p>Nothing found</p>'
    return false
  }

  // join timeList and daysAndPossibilities to be printed
  let template = timeList(data) + daysMatrix(data)

  // Print template on html
  global.document.getElementById('bookingTable').innerHTML = template
}
