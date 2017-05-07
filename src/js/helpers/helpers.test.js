import { expect } from 'chai'
import jsdom from 'jsdom'
import { isObject, getElement } from './helpers'

// on, toggleClass, getEventTarget,
  // removeClass, addClass

describe('isObject()', () => {
  it('should check if the given value is an object or not', () => {
    expect(isObject({name: 'Bob', surname: 'Burns'})).to.be.true
    expect(isObject(null)).to.be.true
    expect(isObject(['Hulk', 'Lola'])).to.be.true
    expect(isObject('I am a string')).to.be.false
    expect(isObject(222)).to.be.false
  })
})

describe('getElement()', () => {
  it('should return a DOM element', (done) => {
    jsdom.env(`<!DOCTYPE html><p class="p-class">Hello world</p>`, (err, window) => {
      let element = window.document.querySelectorAll('.p-class')[0]
      expect(getElement(element).innerHTML).to.equal('Hello world')
      done()
      window.close()
    })
  })
})
