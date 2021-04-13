import { curry, isString, isElement, isEmptyObject } from './_utils'

const dataStore = '__magnifyData'
const getCachedData = el => {
  return (el[dataStore] = el[dataStore] || {})
}

export const parseHTML = (...args) => {
  const htmlString = Array.isArray(args[0])
    ? args[0].reduce((result, str, index) => result + args[index] + str)
    : args[0]

  const el = document.createElement('div')
  el.innerHTML = htmlString

  if (el.children.length === 1) {
    return el.children[0]
  }

  const fragment = document.createDocumentFragment()

  if (el.children.length) {
    while (el.children.length > 0) {
      fragment.appendChild(el.children[0])
    }
  } else {
    while (el.childNodes.length > 0) {
      fragment.appendChild(el.childNodes[0])
    }
  }

  return fragment
}

export const query = (selector, parent = document) =>
  parent.querySelector(selector)

export const queryAll = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector))

export const children = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }

  if (!isElement(el)) {
    return []
  }

  if (isString(selector)) {
    return Array.from(el.children).filter(c => c.matches(selector))
  }

  return Array.from(el.children)
}

export const siblings = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }

  if (!isElement(el)) {
    return []
  }

  return children(selector, el.parentNode).filter(element => element !== el)
}

export const parent = el => el.parentNode

export const parents = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }

  const result = []
  let last = el

  while (
    isElement(last) &&
    last.parentNode &&
    last !== document.body.parentNode
  ) {
    last = last.parentNode

    if (!selector || (selector && last.matches(selector))) {
      result.push(last)
    }
  }

  return result
}

export const find = curry((selector, parent) => parent.querySelector(selector))

export const findAll = curry((selector, parent) =>
  Array.from(parent.querySelectorAll(selector))
)

export const parentWith = curry((fn, el) => {
  const parentElement = el.parentNode
  if (!parentElement || parentElement === document) {
    return false
  }
  if (fn(parentElement)) {
    return parentElement
  }
  return parentWith(fn, parentElement)
})

export const closest = (selector, el) => {
  if (el.matches(selector)) {
    return el
  }
  return parentWith(el => el.matches(selector), el)
}

export const append = curry((child, el) => {
  if (isString(child)) {
    el.insertAdjacentHTML('beforeend', child)
  } else {
    el.append(child)
  }

  return el
})

export const appendTo = curry((child, el) => {
  if (isString(child)) {
    child = parseHTML(child)
  }
  el.appendChild(child)

  return child
})

export const prepend = curry((child, el) => {
  if (isString(child)) {
    el.insertAdjacentHTML('afterbegin', child)
  } else {
    el.prepend(child)
  }

  return el
})

export const empty = curry(el => {
  while (el.lastChild) {
    el.removeChild(el.lastChild)
  }
  return el
})

export const getData = (key, el) => {
  if (isElement(key) && typeof el === 'undefined') {
    el = key
    key = undefined
  }

  const cache = getCachedData(el)
  if (key) {
    if (!(key in cache)) {
      let value = el.dataset[key] || el.dataset[camelize(key, false)]

      if (value !== undefined) {
        try {
          value = JSON.parse(value)
        } catch (e) {} // eslint-disable-line

        cache[key] = value
      }
    }

    return cache[key]
  }

  return cache
}

export const setData = (key, value, el) => {
  getCachedData(el)[key] = value

  return el
}

export const removeData = (key, el) => {
  if (isElement(key) && typeof el === 'undefined') {
    el = key
    key = undefined
  }

  if (typeof key === 'undefined') {
    delete el[dataStore]
  } else {
    delete getCachedData(el)[key]
  }

  return el
}

export const hasData = el => {
  return dataStore in el ? !isEmptyObject(el[dataStore]) : false
}

export const getDefaultView = el => {
  let view = el.ownerDocument.defaultView

  if (!view || !view.opener) {
    view = window
  }

  return view
}

export const getDocWidth = () => {
  return document.documentElement.clientWidth || document.body.clientWidth
}

export const getDocHeight = () => {
  return document.documentElement.clientHeight || document.body.clientHeight
}

export const getOffset = el => {
  const box = el.getBoundingClientRect()
  const win = getDefaultView(el)

  return {
    top: box.top + win.pageYOffset,
    left: box.left + win.pageXOffset
  }
}

export const getStyle = (el, key) => {
  let value

  if (Array.isArray(key)) {
    value = {}

    key.forEach(k => {
      value[k] = getStyle(el, k)
    })

    return value
  }

  return getDefaultView(el)
    .getComputedStyle(el, '')
    .getPropertyValue(key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase())
}

export const outerWidth = (el, includeMargins = false) => {
  if (includeMargins) {
    const { marginLeft, marginRight } = getStyle(el, [
      'marginLeft',
      'marginRight'
    ])

    return parseInt(marginLeft, 10) + parseInt(marginRight, 10) + el.offsetWidth
  }

  return el.offsetWidth
}

export const outerHeight = (el, includeMargins = false) => {
  if (includeMargins) {
    const { marginTop, marginBottom } = getStyle(el, [
      'marginTop',
      'marginBottom'
    ])

    return (
      parseInt(marginTop, 10) + parseInt(marginBottom, 10) + el.offsetHeight
    )
  }

  return el.offsetHeight
}
