// is a given value Date Object?
export const isDate = value => {
  return toString.call(value) === '[object Date]'
}

// is a given value Map?
export const isMap = val => {
  return val != null && val.constructor ? val.constructor.name === 'Map' : false
}

// is a given value Set?
export const isSet = val => {
  return val != null && val.constructor ? val.constructor.name === 'Set' : false
}

// is a given value Symbol?
export const isSymbol = val => {
  return val != null && val.constructor
    ? val.constructor.name === 'Symbol'
    : false
}

// is a given value RegExp?
export const isRegexp = val => {
  return toString.call(val) === '[object RegExp]'
}

// is a given value Error object?
export const isError = val => {
  return toString.call(val) === '[object Error]'
}

// is a given value Array?
export const isArray = val => {
  if (Array.isArray) {
    return Array.isArray(val)
  }
  return toString.call(val) === '[object Array]'
}

// is a given value object?
export const isObject = val => {
  return Object(val) === val
}

// is a given value plain object?
export const isPlainObject = val => {
  return toString.call(val) === '[object Object]'
}

// is a given value undefined?
export const isUndefined = val => {
  return val === void 0
}

// is a given object a Element?
export const isElement = el => {
  return isObject(el) && el.nodeType === 1 && !isPlainObject(el)
}

export const isString = val => {
  return typeof val === 'string' || toString.call(val) === '[object String]'
}

// is a given value function?
export const isFunction = val => {
  // fallback check is for IE
  return toString.call(val) === '[object Function]' || typeof val === 'function'
}

// is a given value empty object?
export const isEmptyObject = val => {
  return isObject(val) && Object.getOwnPropertyNames(val).length == 0
}

export const throttle = (type, name, obj) => {
  obj = obj || window

  let running = false
  let func = function() {
    if (running) {
      return
    }

    running = true

    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  }

  obj.addEventListener(type, func)
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

export const compose = (...fn) => {
  const callback = (...args) =>
    fn.reduceRight((r, i, index) => {
      if (Array.isArray(r) && index === fn.length - 1) {
        return i(...r)
      }
      return i(r)
    }, args)
  callback.currylen = fn[fn.curylen || fn.length - 1].length
  return callback
}

/** Credit to https://github.com/jonschlinkert/shallow-clone MIT */
export const clone = val => {
  if (isElement(val)) {
    return val
  } else if (isArray(val)) {
    return val.slice()
  } else if (isDate(val)) {
    return new val.constructor(Number(val))
  } else if (isMap(val)) {
    return new Map(val)
  } else if (isSet(val)) {
    return new Set(val)
  } else if (isSymbol(val)) {
    return Symbol.prototype.valueOf
      ? Object(Symbol.prototype.valueOf.call(val))
      : {}
  } else if (isRegexp(val)) {
    const re = new val.constructor(val.source, /\w+$/.exec(val))
    re.lastIndex = val.lastIndex
    return re
  } else if (isError(val)) {
    return Object.create(val)
  } else if (isPlainObject(val)) {
    return Object.assign({}, val)
  }
  return val
}

export const merge = (target, ...sources) => {
  sources.forEach(src => {
    for (const prop in src) {
      // eslint-disable-line
      target[prop] = src[prop]
    }
  })
  return target
}

function deepMergeTwo(target, source) {
  const sourceIsArray = isArray(source)
  const targetIsArray = isArray(target)

  if (isUndefined(source)) {
    return target
  }

  if (sourceIsArray !== targetIsArray) {
    return clone(source)
  } else if (sourceIsArray) {
    return clone(source)
  } else if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      target[key] = deepMergeTwo(target[key], source[key])
    })

    return target
  }

  return clone(source)
}

export const deepMerge = (...args) => {
  return args.filter(isObject).reduce(deepMergeTwo, {})
}
