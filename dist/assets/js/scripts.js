/*!
  * simple-magify v0.0.1 (https://github.com/SepctreLv/simple-magnify)
  * Copyright 2021 SepctreLv
  * Licensed under MIT
  */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var DEFAULTS = {
    source: 'data-origin',
    zoomWidth: 400,
    zoomHeight: 400,
    placement: {
      x: 'right',
      y: 'top'
    }
  };

  // is a given value Date Object?
  var isDate = function isDate(value) {
    return toString.call(value) === '[object Date]';
  }; // is a given value Map?

  var isMap = function isMap(val) {
    return val != null && val.constructor ? val.constructor.name === 'Map' : false;
  }; // is a given value Set?

  var isSet = function isSet(val) {
    return val != null && val.constructor ? val.constructor.name === 'Set' : false;
  }; // is a given value Symbol?

  var isSymbol = function isSymbol(val) {
    return val != null && val.constructor ? val.constructor.name === 'Symbol' : false;
  }; // is a given value RegExp?

  var isRegexp = function isRegexp(val) {
    return toString.call(val) === '[object RegExp]';
  }; // is a given value Error object?

  var isError = function isError(val) {
    return toString.call(val) === '[object Error]';
  }; // is a given value Array?

  var isArray = function isArray(val) {
    if (Array.isArray) {
      return Array.isArray(val);
    }

    return toString.call(val) === '[object Array]';
  }; // is a given value object?

  var isObject = function isObject(val) {
    return Object(val) === val;
  }; // is a given value plain object?

  var isPlainObject = function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
  }; // is a given value undefined?

  var isUndefined = function isUndefined(val) {
    return val === void 0;
  }; // is a given object a Element?

  var isElement = function isElement(el) {
    return isObject(el) && el.nodeType === 1 && !isPlainObject(el);
  };
  /** Credit to https://github.com/jonschlinkert/shallow-clone MIT */

  var clone = function clone(val) {
    if (isElement(val)) {
      return val;
    } else if (isArray(val)) {
      return val.slice();
    } else if (isDate(val)) {
      return new val.constructor(Number(val));
    } else if (isMap(val)) {
      return new Map(val);
    } else if (isSet(val)) {
      return new Set(val);
    } else if (isSymbol(val)) {
      return Symbol.prototype.valueOf ? Object(Symbol.prototype.valueOf.call(val)) : {};
    } else if (isRegexp(val)) {
      var re = new val.constructor(val.source, /\w+$/.exec(val));
      re.lastIndex = val.lastIndex;
      return re;
    } else if (isError(val)) {
      return Object.create(val);
    } else if (isPlainObject(val)) {
      return Object.assign({}, val);
    }

    return val;
  };

  function deepMergeTwo(target, source) {
    var sourceIsArray = isArray(source);
    var targetIsArray = isArray(target);

    if (isUndefined(source)) {
      return target;
    }

    if (sourceIsArray !== targetIsArray) {
      return clone(source);
    } else if (sourceIsArray) {
      return clone(source);
    } else if (isPlainObject(target) && isPlainObject(source)) {
      Object.keys(source).forEach(function (key) {
        target[key] = deepMergeTwo(target[key], source[key]);
      });
      return target;
    }

    return clone(source);
  }

  var deepMerge = function deepMerge() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return args.filter(isObject).reduce(deepMergeTwo, {});
  };

  var Magnify = /*#__PURE__*/function () {
    function Magnify(element, options) {
      _classCallCheck(this, Magnify);

      this.element = element;
      this.options = deepMerge({}, DEFAULTS, options);
      this.init();
    }

    _createClass(Magnify, [{
      key: "init",
      value: function init() {
        console.log(this.options);
      }
    }]);

    return Magnify;
  }();

  var thumbElements = document.querySelectorAll('.thumb-item');
  var magnifyImg = document.querySelector('.magnify .magnify-image');
  thumbElements.forEach(function (thumbElement) {
    thumbElement.addEventListener('mouseenter', function () {
      thumbElements.forEach(function (thumbEl) {
        thumbEl.classList.remove('active');
      });
      thumbElement.classList.add('active');
      var url = thumbElement.dataset.url;
      var origin = thumbElement.dataset.origin;
      magnifyImg.setAttribute('src', url);
      magnifyImg.setAttribute('data-origin', origin);
    });
  });
  var magnifyElement = document.querySelector('.magnify');

  if (magnifyElement) {
    new Magnify(magnifyElement, {
      delay: 0
    });
  }

})));
