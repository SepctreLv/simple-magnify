export const isObject = val => {
  return Object(val) === val
}

export const isPlainObject = val => {
  return toString.call(val) === '[object Object]'
}

export const isElement = el => {
  return isObject(el) && el.nodeType === 1 && !isPlainObject(el)
}

export const isString = val => {
  return typeof val === 'string' || toString.call(val) === '[object String]'
}

export const isFunction = val => {
  return toString.call(val) === '[object Function]' || typeof val === 'function'
}

export const isNan = val => {
  return val !== val
}

export const isNumber = val => {
  return !isNan(val) && toString.call(val) === '[object Number]'
}

export const isNumeric = n => {
  return (isNumber(n) || isString(n)) && !isNan(n - parseFloat(n))
}

export const curry = (fn, args = []) => (...subArgs) => {
  const currylen = fn.currylen || fn.length
  const collect = args.concat(subArgs)
  if (collect.length >= currylen) {
    return fn(...collect)
  }
  return curry(fn, collect)
}

export const curryWith = (fn, enSureFunction, args = []) => (...subArgs) => {
  const index = subArgs.findIndex(enSureFunction)
  if (index >= 0) {
    const collect = args.concat(...subArgs.slice(0, index + 1))
    return fn(...collect)
  }

  const collect = args.concat(...subArgs)
  return curryWith(fn, enSureFunction, collect)
}

export const camelize = (word, first = true) => {
  word = word.replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())

  if (first) {
    word = word.substring(0, 1).toUpperCase() + word.substring(1)
  }
  return word
}

export const dasherize = word =>
  word.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()

const isCssNumber = name => {
  return ![
    'animationIterationCount',
    'columnCount',
    'fillOpacity',
    'flexGrow',
    'flexShrink',
    'fontWeight',
    'lineHeight',
    'opacity',
    'order',
    'orphans',
    'widows',
    'zIndex',
    'zoom'
  ].includes(name)
}

export const isCSSVariable = name => {
  return /^--/.test(name)
}

export const setStyle = (key, value, el) => {
  if (isString(key) && isElement(el)) {
    if (value || value === 0) {
      if (isCSSVariable(key)) {
        el.style.setProperty(key, value)
      } else {
        key = camelize(key, false)
        if (isNumeric(value) && isCssNumber(key)) {
          value += 'px'
        }
        el.style[key] = value
      }
    } else {
      el.style.removeProperty(dasherize(key))
    }
  } else if (isObject(key)) {
    if (isElement(value) && typeof el === 'undefined') {
      el = value
      value = undefined
    }
    let prop

    for (prop in key) {
      if (Object.prototype.hasOwnProperty.call(key, prop)) {
        setStyle(prop, key[prop], el)
      }
    }
  }

  return el
}
