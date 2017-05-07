import '../main.min.css'
import { on } from './helpers/helpers'
import { runAfterPromise } from './bookingTable/bookingTemplate'
import { getAvailability } from './api/booking'

// DOM Elems
const btnLoad = document.getElementById('bookingSearch')
const startingDate = document.getElementById('startingDate')
const cleaningDuration = document.getElementById('cleaningDuration')

var queryParams = '?weekBeginning=2016-12-05&visitDuration=2.5&postcode=EC1R%203BU'

// get promise done
getAvailability(queryParams).then(data => runAfterPromise(data))

// when user uses the form
on(btnLoad, 'click', () => {
  event.preventDefault()
  let start = !startingDate.value ? '' : `?weekBeginning=${startingDate.value}`
  let hours = !cleaningDuration.value ? '' : `?visitDuration=${cleaningDuration.value}`

  // Clean table before loading it again
  global.document.getElementById('bookingTable').innerHTML = ''
  getAvailability(start + hours).then(data => runAfterPromise(data))
})
