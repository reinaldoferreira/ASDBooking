/* global expect */
import data from '../api/data.json'
import { isObject, getElement, on, toggleClass, removeClass, addClass } from './helpers'

describe('isObject()', () => {
  test('it should check if the given value is an object or not', () => {
    let testData = data
    expect(isObject({name: 'Bob', surname: 'Burns'})).toBeTruthy()
    expect(isObject(null)).toBeTruthy()
    expect(isObject(['Hulk', 'Lola'])).toBeFalsy()
    expect(isObject('I am a string')).toBeFalsy()
    expect(isObject(222)).toBeFalsy()
    expect(testData).toMatchSnapshot()
  })
})

describe('getElement()', () => {
  test('it should return a DOM element', () => {
    document.body.innerHTML = '<p class="p-class">Hello world</p>'
    let element = document.querySelectorAll('.p-class')[0]
    expect(getElement(element).innerHTML).toBe('Hello world')
  })
})

describe('toggleClass()', () => {
  test('it should toggle a class of the given element', () => {
    document.body.innerHTML = '<p class="p-class">Some text</p>'
    toggleClass('.p-class', 'is-active')

    let test = document.querySelectorAll('.p-class')[0]
    expect(test.classList[1]).toBe('is-active')
    toggleClass('.p-class', 'is-active')
    expect(test.classList[0]).toBe('p-class')
    expect(test.classList[1]).toBeUndefined()

    document.body.innerHTML += '<p class="first">Some text</p>'
    document.body.innerHTML += '<p class="second">Some text</p>'
    toggleClass(['.first', '.second'], 'active')
    let first = document.getElementsByClassName('first')[0]
    let second = document.getElementsByClassName('second')[0]

    expect(first.classList[1]).toBe('active')
    expect(second.classList[1]).toBe('active')
  })
})

describe('removeClass()', () => {
  test('it should remove the given class from the the given element', () => {
    document.body.innerHTML = `
      <p class="p-class extra-class">Some text</p>
      <p class="p-class extra-class">Some text 2</p>
      <button class="submit-btn extra-class">Submit</button>
      <button class="cancel-btn extra-class">Cancel</button>
      <div class="some-div extra-class"></div>
    `

    let arr = ['.submit-btn', '.cancel-btn']
    let obj = document.getElementsByClassName('p-class')
    let el =  document.getElementsByClassName('some-div')

    expect(el[0].classList).toContain('extra-class')
    removeClass(el, 'extra-class')
    expect(el[0].classList).not.toContain('extra-class')

    let itemInArray = document.querySelectorAll(arr[0])[0]
    expect(itemInArray.classList).toContain('extra-class')
    removeClass(arr, 'extra-class')
    expect(itemInArray.classList).not.toContain('extra-class')

    expect(obj[0].classList).toContain('extra-class')
    removeClass(obj, 'extra-class')
    expect(obj[0].classList).not.toContain('extra-class')
  })
})

describe('addClass()', () => {
  test('it should add the given class from the the given element', () => {
    document.body.innerHTML = `
      <p class="p-class">Some text</p>
      <p class="p-class">Some text 2</p>
      <button class="submit-btn">Submit</button>
      <button class="cancel-btn">Cancel</button>
      <div class="some-div"></div>
    `

    let arr = ['.submit-btn', '.cancel-btn']
    let obj = document.getElementsByClassName('p-class')
    let el =  document.getElementsByClassName('some-div')

    expect(el[0].classList).not.toContain('extra-class')
    addClass(el, 'extra-class')
    expect(el[0].classList).toContain('extra-class')

    let itemInArray = document.querySelectorAll(arr[0])[0]
    expect(itemInArray.classList).not.toContain('extra-class')
    addClass(arr, 'extra-class')
    expect(itemInArray.classList).toContain('extra-class')

    expect(obj[0].classList).not.toContain('extra-class')
    addClass(obj, 'extra-class')
    expect(obj[0].classList).toContain('extra-class')
  })
})

describe('on()', () => {
  test('it should add the given eventListener to the given element', () => {
    document.body.innerHTML = `
      <button class="add-first">Add First</button>
      <button class="add-second">Add Second</button>
    `

    on('.add-first', 'click', () => document.body.innerHTML += '<p>Hulk</p>')

    expect(document.body.innerHTML).not.toContain('Hulk')
    document.getElementsByClassName('add-first')[0].click()
    expect(document.body.innerHTML).toContain('Hulk')

    document.body.innerHTML = `
      <button class="add-first">Add First</button>
      <button class="add-second">Add Second</button>
    `

    on(['.add-first', '.add-second'], 'click', () => document.body.innerHTML += '<p>Hulk and Lola</p>')
    expect(document.body.innerHTML).not.toContain('Hulk and Lola')
    document.getElementsByClassName('add-second')[0].click()
    expect(document.body.innerHTML).toContain('Hulk and Lola')
  })
})
