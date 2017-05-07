import { isObject } from '../helpers/helpers'

// Get days and possibilities matrix
export const getDaysMatrix = data => data.map(x => {
  let weekDay = x.day
  let dayTime = x.startTimes.map(x => {
    let isAvailable = x.possible ? 'is-available' : 'is-disabled'
    let possible = `<li
        class="booking__cel schedule__item ${isAvailable}"
        data-day="${weekDay}"
        data-startTime="${x.start}"
        data-endTime="${x.end}">
        Start
      </li>`
    return possible
  }).join('')

  return `<li
    class="booking__col">
      <span class="booking__day">${x.day}</span>
      <ul class="booking__schedule">${dayTime}</ul>
  </li>`
}).join('')

// Get list of times
export const getTimesList = data =>
  data.map(x => x.startTimes.map(x => `${x.start} - ${x.end}`))


// body to be executed once promise is done
export const runAfterPromise = (data) => {
  // Testing if data is right
  if (!isObject(data) || data.length === 0) {
    global.document.getElementById('bookingTable').innerHTML = '<p>Nothing found</p>'
    return false
  }

  let daysAndPossibilities = getDaysMatrix(data)
  let arrOfTimes = getTimesList(data)
  let timesList = `<li class="booking__col booking__times"><ul>${arrOfTimes[0].map(x =>
    `<li class="booking__cel booking__cel--time">${x}</li>`).join('')}</ul></li>`

  // join timeList and daysAndPossibilities to be printed
  let template = timesList + daysAndPossibilities
  let bookingTable = data.length ? template : '<p>Nothing found</p>'

  // Print template on html
  global.document.getElementById('bookingTable').innerHTML = bookingTable
}
