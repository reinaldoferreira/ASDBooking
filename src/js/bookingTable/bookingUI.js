const possibilitiesMatrix = data => data.map(x => {
  return `<li
    class="booking__cel schedule__item ${x.possible ? 'is-available' : 'is-disabled'}"
    data-day="${x.day}"
    data-startTime="${x.start}"
    data-endTime="${x.end}">
    Start
  </li>`
}).join('')

export const daysMatrix = data => data.map(x => {
  return `<li
    class="booking__col">
      <span class="booking__day">${x.day}</span>
      <ul class="booking__schedule">${possibilitiesMatrix(x.startTimes)}</ul>
  </li>`
}).join('')

export const timeList = data => {
  let listOfTimes = data[0].startTimes.map(x =>
    `<li class="booking__cel booking__cel--time">${x.start} - ${x.end}</li>`).join('')

  return `<li class="booking__col booking__times"><ul>${listOfTimes}</ul></li>`
}
