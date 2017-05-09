import '../main.min.css'
import { on, getElement, toggleClass, getEventTarget, removeClass, addClass } from './helpers/helpers'
import { runAfterPromise } from './bookingTable/bookingController'
import { getAvailability, submitOrder } from './api/booking'
import dom from './domElements'

// Helpers
let queryParams = '?weekBeginning=2016-12-05&visitDuration=2.5&postcode=EC1R%203BU'
let bookingTo = {
  day: dom.startingDate.value,
  start: '',
  end: '',
  duration: dom.cleaningDuration.value
}

// get promise done
getAvailability(queryParams).then(data => runAfterPromise(data))

// submit order
on(dom.btnSubmitOrder, 'click', () => {
  submitOrder(bookingTo.day, bookingTo.start, bookingTo.end, bookingTo.duration)
  .then(res => res.json())
  .then(data => {
    document.getElementById('userBooked').innerHTML = `
      <h3>${data.cleaner.name} will be the cleanner</h3>
    `
  })
})

// when user uses the form
on(dom.btnLoad, 'click', () => {
  event.preventDefault()
  let start = !dom.startingDate.value ? '' : `weekBeginning=${dom.startingDate.value}&`
  let hours = !dom.cleaningDuration.value ? '' : `visitDuration=${dom.cleaningDuration.value}`

  // Clean table before loading it again
  if (start + hours !== '') {
    dom.bookingTable.innerHTML = ''
    getAvailability('?' + start + hours).then(data => runAfterPromise(data))
  } else {
    // Displays error message
    toggleClass(getElement('.error-message'), 'is-active')
    // Hide error message after 3sec
    setTimeout(function() {
      toggleClass(getElement('.error-message'), 'is-active')
    }, 3000)
  }
})

on(dom.bookingTable, 'click', () => {
  event.stopPropagation()
  let target = getEventTarget()
  let arrOfItems = document.getElementsByClassName('is-available')
  bookingTo = {
    day: target.dataset.day,
    start: target.dataset.starttime,
    end: target.dataset.endtime,
    duration: dom.cleaningDuration.value ? dom.cleaningDuration.value : 0.5
  }

  // removing is-active from all available items
  removeClass(arrOfItems, 'is-active')

  // adding is-active to the selected available item
  if (getElement(target).classList.contains('is-available')) {
    toggleClass(getElement(target), 'is-active')
    addClass('.user-booking', 'is-active')
    // Displaying user selections
    getElement(dom.userDate).innerHTML = bookingTo.day
    getElement(dom.userTime).innerHTML = bookingTo.start
    getElement(dom.userDuration).innerHTML = bookingTo.duration
  }
})
