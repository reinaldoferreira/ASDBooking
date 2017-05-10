export const BOOKING_API = 'https://private-anon-17d1fe7cbf-housekeepavailability.apiary-mock.com'

export function getBaseUrl(w = window) {
  const inDev = w.location.search !== ''
  return inDev ? 'http://localhost:3030' : BOOKING_API
}
