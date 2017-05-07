import '../main.min.css'
import { on, getElement, toggleClass, getEventTarget, removeClass,
  addClass } from './helpers/helpers'
import { runAfterPromise } from './bookingTable/bookingTemplate'
import { getAvailability, submitOrder } from './api/booking'

// DOM Elems
const btnLoad = document.getElementById('bookingSearch')
const startingDate = document.getElementById('startingDate')
const cleaningDuration = document.getElementById('cleaningDuration')
const bookingTable = document.getElementById('bookingTable')
const userDate = document.getElementById('bookingDate')
const userTime = document.getElementById('bookingTime')
const userDuration = document.getElementById('bookingDuration')
const btnSubmitOrder = document.getElementById('submitOrder')

// Helper vars
var queryParams = '?weekBeginning=2016-12-05&visitDuration=2.5&postcode=EC1R%203BU'
var bookingTo = {
  day: startingDate.value,
  start: '',
  end: '',
  duration: cleaningDuration.value
}

// get promise done
getAvailability(queryParams).then(data => runAfterPromise(data))

// submit order
on(btnSubmitOrder, 'click', () => {
  submitOrder(bookingTo.day, bookingTo.start, bookingTo.end, bookingTo.duration)
  .then(res => res.json())
  .then(data => {
    document.getElementById('userBooked').innerHTML = `
      <h3>${data.cleaner.name} will be the cleanner</h3>
    `
  })
})

// when user uses the form
on(btnLoad, 'click', () => {
  event.preventDefault()
  let start = !startingDate.value ? '' : `weekBeginning=${startingDate.value}&`
  let hours = !cleaningDuration.value ? '' : `visitDuration=${cleaningDuration.value}`

  // Clean table before loading it again
  if (start + hours !== '') {
    bookingTable.innerHTML = ''
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

on(bookingTable, 'click', () => {
  event.stopPropagation()
  let target = getEventTarget()
  let arrOfItems = document.getElementsByClassName('is-available')
  bookingTo = {
    day: target.dataset.day,
    start: target.dataset.starttime,
    end: target.dataset.endtime,
    duration: cleaningDuration.value ? cleaningDuration.value : 0.5
  }

  // removing is-active from all available items
  removeClass(arrOfItems, 'is-active')

  // adding is-active to the selected available item
  if (getElement(target).classList.contains('is-available')) {
    toggleClass(getElement(target), 'is-active')
    addClass('.user-booking', 'is-active')
    // Displaying user selections
    getElement(userDate).innerHTML = bookingTo.day
    getElement(userTime).innerHTML = bookingTo.start
    getElement(userDuration).innerHTML = bookingTo.duration
  }
})
