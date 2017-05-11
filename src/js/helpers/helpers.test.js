import data from '../api/data.json'
import { isObject, getElement } from './helpers'

describe('isObject()', () => {
  test('it should check if the given value is an object or not', () => {
    let testData = data
    expect(isObject({name: 'Bob', surname: 'Burns'})).toBeTruthy()
    expect(isObject(null)).toBeTruthy()
    expect(isObject(['Hulk', 'Lola'])).toBeTruthy()
    expect(isObject('I am a string')).toBeFalsy()
    expect(isObject(222)).toBeFalsy()
    // expect(testData).toMatchSnapshot()
  })
})

describe('getElement()', () => {
  test('it should return a DOM element', () => {
    document.body.innerHTML = '<p class="p-class">Hello world</p>'
    let element = document.querySelectorAll('.p-class')[0]
    expect(getElement(element).innerHTML).toBe('Hello world')
  })
})
