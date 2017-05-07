import 'whatwg-fetch'
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl()

// Getting
export function getAvailability(params) {
  return get('/availability/' + params)
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError)
}

function onSuccess(response) {
  return response.json()
}

function onError(error) {
  console.log(error) // eslint-disable-line no-console
}

// Booking
export function submitOrder(day, start, end, duration) {
  return fetch('https://private-anon-17d1fe7cbf-housekeepavailability.apiary-mock.com/book/', {
    method: 'POST',
    body: JSON.stringify({
      'day': day,
      'startTime': {
        'start': start,
        'end': end
      },
      'visitDuration': duration,
      'propertyId': 'ealdk1f9'
    })
  })
}
