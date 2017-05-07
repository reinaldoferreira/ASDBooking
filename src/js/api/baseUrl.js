const BOOKING_API = 'https://private-anon-17d1fe7cbf-housekeepavailability.apiary-mock.com'

export default function getBaseUrl() {
  const inDev = window.location.search !== ''
  return inDev ? 'http://localhost:3030' : BOOKING_API
}
