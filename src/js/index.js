import '../main.min.css'
import { getAvailability } from './api/booking'

var queryParams = '?weekBeginning=2016-12-05&visitDuration=2.5&postcode=EC1R%203BU'

getAvailability(queryParams).then(data => {
  let daysAndPossibilities = data.map(x => {
    let weekDay = x.day
    let dayTime = x.startTimes.map(x => {
      let isAvailable = x.possible ? 'is-available' : 'is-disabled'
      let possible = `<li
          class="schedule__item ${isAvailable}"
          data-day="${weekDay}"
          data-startTime="${x.start}">
          Start
        </li>`
      return possible
    }).join('')

    return `<li
      class="booking__col">
        <span class="schedule__day">${x.day}</span>
        <ul class="avbl__schedule">${dayTime}</ul>
    </li>`
  }).join('')

  let arrOfTimes = data.map(x => x.startTimes.map(x => `${x.start} - ${x.end}`))
  let timesList = `<li class="booking__col avbl__times"><ul>${arrOfTimes[0].map(x =>
    `<li>${x}</li>`).join('')}</ul></li>`

  // join timeList and daysAndPossibilities to be printed
  let template = timesList + daysAndPossibilities
  let bookingTable = data.length ? template : '<p>Nothing found</p>'

  // Print template on html
  global.document.getElementById('bookingTable').innerHTML = bookingTable
})
