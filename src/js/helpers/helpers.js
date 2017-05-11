// checks if the element is an obj
export const isObject = value => Array.isArray(value) ? false : typeof value === 'object'

// Function used to get a DOM element
export const getElement = (el) => el.nodeName ? el : document.querySelectorAll(el)[0]

// Function used to handler events
export const on = (el, ev, cb) => {
  if (Array.isArray(el)) {
    el.map(x => {
      getElement(x).addEventListener(ev, (e) => {
        if (typeof cb === 'function') cb.call(null, e)
      }, false)
    })
  } else {
    getElement(el).addEventListener(ev, (e) => {
      if (typeof cb === 'function') cb.call(null, e)
    }, false)
  }
}

// Function used to toggle classes
export const toggleClass = (el, className) => {
  if (Array.isArray(el)) {
    el.map(x => getElement(x).classList.toggle(className))
  } else {
    getElement(el).classList.toggle(className)
  }
}

// Function used to remove a class
export const removeClass = (el, className) => {
  if (Array.isArray(el)) {
    let list = el.map(x => getElement(x))
    Object.keys(list).map(x => list[x].classList.remove(className))
  } if (isObject(el)) {
    Object.keys(el).map(x => el[x].classList.remove(className))
  } else {
    getElement(el).classList.remove(className)
  }
}

// Function used to remove a class
export const addClass = (el, className) => {
  if (Array.isArray(el)) {
    let list = el.map(x => getElement(x))
    Object.keys(list).map(x => list[x].classList.add(className))
  } if (isObject(el)) {
    Object.keys(el).map(x => el[x].classList.add(className))
  } else {
    getElement(el).classList.add(className)
  }
}
