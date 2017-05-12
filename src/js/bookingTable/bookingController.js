import { daysMatrix, timeList } from './bookingUI'

// body to be executed once promise is done
export function runAfterPromise(data) {
  // Testing if data is right
  if (!Array.isArray(data) || data.length === 0) {
    document.getElementById('bookingTable').innerHTML = '<p>Nothing found</p>'
    return false
  } else {
    // Print template on html
    document.getElementById('bookingTable').innerHTML = timeList(data) + daysMatrix(data)
  }
}
