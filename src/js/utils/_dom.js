import { curry, isString} from './_utils'

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

export const appendTo = curry((child, el) => {
  if (isString(child)) {
    child = parseHTML(child)
  }
  el.appendChild(child)

  return child
})

export const getDefaultView = el => {
  let view = el.ownerDocument.defaultView

  if (!view || !view.opener) {
    view = window
  }

  return view
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
