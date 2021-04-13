/*!
  * simple-magify v0.0.1 (https://github.com/SepctreLv/simple-magnify)
  * Copyright 2021 SepctreLv
  * Licensed under MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.file = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var CLASSES = {
    MAGNIFY: 'magnify',
    WINDOW: 'magnify-window',
    OVERLAY: 'magnify-overlay',
    LENS: 'magnify-lens',
    POSITION: 'magnify-window-',
    SHOW: 'magnify-window-show',
    IMAGE: 'magnify-image'
  };
  var SELECTORS = {
    LENS: '.magnify-lens',
    WINDOW: '.magnify-window'
  };
  var DEFAULTS = {
    source: 'data-origin',
    windowWidth: 400,
    windowHeight: 400,
    position: 'right',
    // top, bottom, left, right
    wrapSelector: null
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
  var isString = function isString(val) {
    return typeof val === 'string' || toString.call(val) === '[object String]';
  }; // is a given value function?

  var isFunction = function isFunction(val) {
    // fallback check is for IE
    return toString.call(val) === '[object Function]' || typeof val === 'function';
  }; // is a given value empty object?

  var isNan = function isNan(val) {
    // NaN is number :) Also it is the only value which does not equal itself
    return val !== val;
  }; // is a given value number?

  var isNumber = function isNumber(val) {
    return !isNan(val) && toString.call(val) === '[object Number]';
  }; // is a given value numeric?

  var isNumeric = function isNumeric(n) {
    return (isNumber(n) || isString(n)) && !isNan(n - parseFloat(n));
  };
  var curry = function curry(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function () {
      var currylen = fn.currylen || fn.length;

      for (var _len = arguments.length, subArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        subArgs[_key] = arguments[_key];
      }

      var collect = args.concat(subArgs);

      if (collect.length >= currylen) {
        return fn.apply(void 0, _toConsumableArray(collect));
      }

      return curry(fn, collect);
    };
  };
  var curryWith = function curryWith(fn, enSureFunction) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return function () {
      for (var _len2 = arguments.length, subArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        subArgs[_key2] = arguments[_key2];
      }

      var index = subArgs.findIndex(enSureFunction);

      if (index >= 0) {
        var _collect = args.concat.apply(args, _toConsumableArray(subArgs.slice(0, index + 1)));

        return fn.apply(void 0, _toConsumableArray(_collect));
      }

      var collect = args.concat.apply(args, subArgs);
      return curryWith(fn, enSureFunction, collect);
    };
  };
  var camelize = function camelize(word) {
    var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    word = word.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
      return p1.toUpperCase();
    });

    if (first) {
      word = word.substring(0, 1).toUpperCase() + word.substring(1);
    }

    return word;
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
  var dasherize = function dasherize(word) {
    return word.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  };

  var isCssNumber = function isCssNumber(name) {
    return !['animationIterationCount', 'columnCount', 'fillOpacity', 'flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'order', 'orphans', 'widows', 'zIndex', 'zoom'].includes(name);
  };

  var isCSSVariable = function isCSSVariable(name) {
    return /^--/.test(name);
  };
  var setStyle = function setStyle(key, value, el) {
    if (isString(key) && isElement(el)) {
      if (value || value === 0) {
        if (isCSSVariable(key)) {
          el.style.setProperty(key, value);
        } else {
          key = camelize(key, false);

          if (isNumeric(value) && isCssNumber(key)) {
            value += 'px';
          }

          el.style[key] = value;
        }
      } else {
        el.style.removeProperty(dasherize(key));
      }
    } else if (isObject(key)) {
      if (isElement(value) && typeof el === 'undefined') {
        el = value;
        value = undefined;
      }

      var prop;

      for (prop in key) {
        if (Object.prototype.hasOwnProperty.call(key, prop)) {
          setStyle(prop, key[prop], el);
        }
      }
    }

    return el;
  };

  var parseHTML = function parseHTML() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var htmlString = Array.isArray(args[0]) ? args[0].reduce(function (result, str, index) {
      return result + args[index] + str;
    }) : args[0];
    var el = document.createElement('div');
    el.innerHTML = htmlString;

    if (el.children.length === 1) {
      return el.children[0];
    }

    var fragment = document.createDocumentFragment();

    if (el.children.length) {
      while (el.children.length > 0) {
        fragment.appendChild(el.children[0]);
      }
    } else {
      while (el.childNodes.length > 0) {
        fragment.appendChild(el.childNodes[0]);
      }
    }

    return fragment;
  };
  var query = function query(selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return parent.querySelector(selector);
  };
  var appendTo = curry(function (child, el) {
    if (isString(child)) {
      child = parseHTML(child);
    }

    el.appendChild(child);
    return child;
  });
  var getDefaultView = function getDefaultView(el) {
    var view = el.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view;
  };
  var getStyle = function getStyle(el, key) {
    var value;

    if (Array.isArray(key)) {
      value = {};
      key.forEach(function (k) {
        value[k] = getStyle(el, k);
      });
      return value;
    }

    return getDefaultView(el).getComputedStyle(el, '').getPropertyValue(key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase());
  };
  var outerWidth = function outerWidth(el) {
    var includeMargins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (includeMargins) {
      var _getStyle = getStyle(el, ['marginLeft', 'marginRight']),
          marginLeft = _getStyle.marginLeft,
          marginRight = _getStyle.marginRight;

      return parseInt(marginLeft, 10) + parseInt(marginRight, 10) + el.offsetWidth;
    }

    return el.offsetWidth;
  };
  var outerHeight = function outerHeight(el) {
    var includeMargins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (includeMargins) {
      var _getStyle2 = getStyle(el, ['marginTop', 'marginBottom']),
          marginTop = _getStyle2.marginTop,
          marginBottom = _getStyle2.marginBottom;

      return parseInt(marginTop, 10) + parseInt(marginBottom, 10) + el.offsetHeight;
    }

    return el.offsetHeight;
  };

  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter(element) {
      _classCallCheck(this, EventEmitter);

      this.listeners = {};
      this.namespaces = {};
      this.element = element;
      this.element._eventEmitter = this;
    }

    _createClass(EventEmitter, [{
      key: "emit",
      value: function emit(event) {
        var listeners = this.getListeners(event);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var i = 0; i < listeners.length; i++) {
          var context = null;

          if (listeners[i].context !== null) {
            context = listeners[i].context;
          } else {
            context = {
              type: event
            };
          }

          var result = listeners[i].listener.apply(context, args);

          if (listeners[i].one) {
            this.removeListener(event, listeners[i].listener);
          }

          if (result === false) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "on",
      value: function on(event, listener, context) {
        return this.addListener(event, listener, context);
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (typeof listener === 'undefined') {
          return this.removeAllListeners(event);
        }

        return this.removeListener(event, listener);
      }
    }, {
      key: "addListener",
      value: function addListener(event, listener) {
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var one = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        this.ensureListener(listener);

        var _this$constructor$par = this.constructor.parseEvent(event),
            eventName = _this$constructor$par.eventName,
            namespace = _this$constructor$par.namespace;

        if (!eventName) {
          throw new Error('Event should not be null.');
        }

        if (!this.listeners[eventName]) {
          this.listeners[eventName] = {};
        }

        if (!namespace) {
          this.addToEvent(eventName, context, listener, one);
        } else {
          this.addToEventWithNamespace(eventName, namespace, context, listener, one);
          this.addToNamespace(eventName, namespace);
        }

        return this;
      }
    }, {
      key: "removeListener",
      value: function removeListener(event, listener) {
        if (this.hasListeners(event)) {
          var _this$constructor$par2 = this.constructor.parseEvent(event),
              eventName = _this$constructor$par2.eventName,
              namespace = _this$constructor$par2.namespace;

          switch (true) {
            case Boolean(!namespace && eventName):
              {
                this.filterListeners(eventName, '*', listener);
                break;
              }

            case Boolean(!eventName && namespace):
              {
                var events = this.namespaces[namespace];

                for (var i = 0; i < events.length; i++) {
                  this.filterListeners(events[i], namespace, listener);
                }

                for (var _i = 0; _i < events.length; _i++) {
                  if (!Object.prototype.hasOwnProperty.call(this.listeners[events[_i]], namespace)) {
                    this.removeEventInNamespaces(events[_i], namespace);
                  }
                }

                break;
              }

            case Boolean(eventName && namespace):
              {
                var callback = this.removeEventInNamespaces(eventName, namespace);
                this.filterListeners(eventName, namespace, listener, callback);
                break;
              }
          }
        }

        return this;
      }
    }, {
      key: "removeAllListeners",
      value: function removeAllListeners(event) {
        var _this = this;

        if (this.hasListeners(event)) {
          var _this$constructor$par3 = this.constructor.parseEvent(event),
              eventName = _this$constructor$par3.eventName,
              namespace = _this$constructor$par3.namespace;

          switch (true) {
            case Boolean(!namespace && eventName):
              {
                var keys = Object.keys(this.listeners[eventName]);
                keys.forEach(function (key) {
                  if (Object.prototype.hasOwnProperty.call(_this.namespaces, key)) {
                    _this.removeEventInNamespaces(eventName, key);
                  }
                });
                delete this.listeners[eventName];
                break;
              }

            case Boolean(!eventName && namespace):
              {
                var events = this.namespaces[namespace];

                for (var i = 0; i < events.length; i++) {
                  delete this.listeners[events[i]][namespace];
                }

                delete this.namespaces[namespace];
                break;
              }

            case Boolean(eventName && namespace):
              {
                this.removeEventInNamespaces(eventName, namespace);
                delete this.listeners[eventName][namespace];
                break;
              }
          }
        }

        return this;
      }
    }, {
      key: "hasListeners",
      value: function hasListeners(event) {
        var _this$constructor$par4 = this.constructor.parseEvent(event),
            eventName = _this$constructor$par4.eventName,
            namespace = _this$constructor$par4.namespace;

        if (!namespace && eventName) {
          if (!this.listeners[eventName] || Object.keys(this.listeners[eventName]).length === 0) {
            return false;
          }

          return true;
        }

        if (!eventName && namespace) {
          if (!this.namespaces[namespace] || Object.keys(this.namespaces[namespace]).length === 0) {
            return false;
          }

          return true;
        }

        if (eventName && namespace) {
          if (!this.listeners[eventName] || !this.listeners[eventName][namespace] || this.listeners[eventName][namespace].length === 0) {
            return false;
          }

          return true;
        }

        return false;
      }
    }, {
      key: "getListeners",
      value: function getListeners(event) {
        var _this2 = this;

        if (this.hasListeners(event)) {
          var _this$constructor$par5 = this.constructor.parseEvent(event),
              eventName = _this$constructor$par5.eventName,
              namespace = _this$constructor$par5.namespace;

          var sortedListeners = [];

          switch (true) {
            case Boolean(!namespace && eventName):
              {
                var keys = Object.keys(this.listeners[eventName]);
                keys.forEach(function (key) {
                  for (var i = 0; i < _this2.listeners[eventName][key].length; i++) {
                    sortedListeners = sortedListeners.concat(_this2.listeners[eventName][key][i]);
                  }
                });
                return sortedListeners;
              }

            case Boolean(!eventName && namespace):
              {
                var events = this.namespaces[namespace];

                for (var i = 0; i < events.length; i++) {
                  for (var j = 0; j < this.listeners[events[i]][namespace].length; j++) {
                    sortedListeners = sortedListeners.concat(this.listeners[events[i]][namespace][j]);
                  }
                }

                return sortedListeners;
              }

            case Boolean(eventName && namespace):
              {
                var namespaces = this.listeners[eventName];

                if (Object.prototype.hasOwnProperty.call(namespaces, namespace)) {
                  for (var _i2 = 0; _i2 < namespaces[namespace].length; _i2++) {
                    sortedListeners = sortedListeners.concat(namespaces[namespace][_i2]);
                  }

                  return sortedListeners;
                }

                return sortedListeners;
              }
          }
        }

        return [];
      }
    }, {
      key: "filterListeners",
      value: function filterListeners(eventName, namespace, listener, callback) {
        var listeners = this.listeners[eventName];

        if (typeof listeners[namespace] !== 'undefined') {
          listeners[namespace] = listeners[namespace].filter(function (value) {
            return value.listener !== listener;
          });

          if (listeners[namespace].length === 0) {
            if (callback) {
              callback();
            }

            delete listeners[namespace];
          }
        }

        this.listeners[eventName] = listeners;
      }
    }, {
      key: "removeEventInNamespaces",
      value: function removeEventInNamespaces(event, namespace) {
        var i = this.namespaces[namespace].length;

        while (i--) {
          if (this.namespaces[namespace][i] === event) {
            this.namespaces[namespace].splice(i, 1);
          }
        }
      }
    }, {
      key: "addToEvent",
      value: function addToEvent(eventName, context, listener) {
        var one = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!this.listeners[eventName]['*']) {
          this.listeners[eventName]['*'] = [];
        }

        this.listeners[eventName]['*'].push({
          context: context,
          listener: listener,
          one: one
        });
      }
    }, {
      key: "addToEventWithNamespace",
      value: function addToEventWithNamespace(eventName, namespace, context, listener) {
        var one = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (!this.listeners[eventName][namespace]) {
          this.listeners[eventName][namespace] = [];
        }

        this.listeners[eventName][namespace].push({
          context: context,
          listener: listener,
          one: one
        });
      }
    }, {
      key: "addToNamespace",
      value: function addToNamespace(eventName, namespace) {
        if (!this.namespaces[namespace]) {
          this.namespaces[namespace] = [];
        }

        if (!this.checkNamespace(eventName, namespace)) {
          this.namespaces[namespace].push(eventName);
        }
      }
    }, {
      key: "checkNamespace",
      value: function checkNamespace(eventName, namespace) {
        for (var i = 0; i < this.namespaces[namespace].length; i++) {
          if (this.namespaces[namespace][i] === eventName) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "ensureListener",
      value: function ensureListener(listener) {
        var type = _typeof(listener);

        if (type === 'function') {
          return listener;
        }

        throw new TypeError("Listeners should be function or closure. Received type: ".concat(type));
      }
    }], [{
      key: "parseEvent",
      value: function parseEvent(event) {
        var delimiter = '.';

        if (typeof event !== 'string') {
          event = event.toString();
        }

        if (event.indexOf(delimiter) === -1) {
          var _eventName = event.trim().length > 1 ? event : null;

          var _namespace = null;
          return {
            eventName: _eventName,
            namespace: _namespace
          };
        }

        var eventParts = event.split(delimiter);
        var eventName = eventParts[0].trim().length === 0 ? null : eventParts[0];
        var namespace = eventParts[1].trim().length === 0 ? null : eventParts[1];
        return {
          eventName: eventName,
          namespace: namespace
        };
      }
    }, {
      key: "getEventEmitter",
      value: function getEventEmitter(element) {
        if (!element._eventEmitter) {
          element._eventEmitter = new this(element);
        }

        return element._eventEmitter;
      }
    }]);

    return EventEmitter;
  }();

  var supportEventListener = function supportEventListener(element) {
    return _typeof(element) === 'object' && 'addEventListener' in element;
  };

  var trigger = function trigger(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var element = args[args.length - 1];

    if (!supportEventListener(element)) {
      return;
    }

    if (event instanceof window.Event) {
      element.dispatchEvent(event);
      return;
    }

    var data = args.length > 1 ? args.slice(0, args.length - 1) : null;

    var _EventEmitter$parseEv = EventEmitter.parseEvent(event),
        eventName = _EventEmitter$parseEv.eventName,
        namespace = _EventEmitter$parseEv.namespace;

    var cusEvent = new CustomEvent(eventName, {
      cancelable: true,
      bubbles: true,
      detail: data
    });

    if (namespace) {
      cusEvent.namespace = namespace;
    }

    element.dispatchEvent(cusEvent);
  };

  var getDelegator = function getDelegator(event, selector, callback, element) {
    return function (e, args) {
      var target = e.target;
      var currentTarget = e.currentTarget || element;
      var applyArgs = args ? [e].concat(args) : [e];
      var result;

      if (isString(selector)) {
        while (target && target !== currentTarget) {
          if (target.matches(selector)) {
            result = callback.apply(target, applyArgs);
          }

          target = target.parentNode;
        }
      } else {
        result = callback.apply(currentTarget, applyArgs);
      }

      if (result === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };

  var dispatch = function dispatch(e) {
    var eventName = typeof e.namespace === 'undefined' ? e.type : "".concat(e.type, ".").concat(e.namespace);
    var emitter = EventEmitter.getEventEmitter(e.currentTarget);

    if (e.detail) {
      emitter.emit(eventName, e, e.detail);
    } else {
      emitter.emit(eventName, e);
    }
  };

  var bind = function bind(event, selector, callback, element, once) {
    var emitter = EventEmitter.getEventEmitter(element);

    var _EventEmitter$parseEv2 = EventEmitter.parseEvent(event),
        eventName = _EventEmitter$parseEv2.eventName;

    if (!emitter.hasListeners(event)) {
      element.addEventListener(eventName, dispatch, false);
    }

    var delegator = getDelegator(event, selector, callback, element);
    callback._delegator = delegator;

    if (once) {
      emitter.once(event, delegator);
    } else {
      emitter.on(event, delegator);
    }
  };
  var bindEvent = curryWith(function (events, selector, callback, element) {
    var eventArr = events.split(' ');
    var selectorArr = isString(selector) ? selector.split(',') : null;

    switch (true) {
      case Boolean(eventArr.length > 1):
        {
          eventArr.forEach(function (e) {
            bindEvent(e, selector, callback, element);
          });
          break;
        }

      case Boolean(selectorArr && selectorArr.length > 1):
        {
          selectorArr.forEach(function (s) {
            bindEvent(events, s.trim(), callback, element);
          });
          break;
        }

      default:
        {
          if (!isString(selector) && !isFunction(callback)) {
            element = callback;
            callback = selector;
            selector = undefined;
          }

          bind(events, selector, callback, element);
          break;
        }
    }

    return element;
  }, supportEventListener);

  var Magnify = /*#__PURE__*/function () {
    function Magnify(element, options) {
      _classCallCheck(this, Magnify);

      this.$element = element;
      this._states = {};
      this.options = deepMerge({}, DEFAULTS, options, this.getDataOptions());
      this.classes = deepMerge({}, CLASSES, this.options.classes);
      this.selectors = deepMerge({}, SELECTORS, this.options.selectors);
      this.pageX = null;
      this.pageY = null;
      this.timer = null;
      this.overlayTimer = null;
      this.overlayVisible = false;
      this.stopLoading = false;
      this.init();
    }

    _createClass(Magnify, [{
      key: "init",
      value: function init() {
        this.$element.classList.add(this.classes.MAGNIFY);
        this.$image = query('img', this.$element);
        this.$image.classList.add(this.classes.IMAGE);
        this.initWindow();
        this.initOverlay();
        this.bind();
      }
    }, {
      key: "initOverlay",
      value: function initOverlay() {
        this.$overlay = appendTo("<div class=\"".concat(this.classes.OVERLAY, "\"><div class=\"").concat(this.classes.LENS, "\"></div></div>"), this.$element);
        this.$lens = query(this.selectors.LENS, this.$overlay);
        this.bindOverlayEvent();
      }
    }, {
      key: "initWindow",
      value: function initWindow() {
        this.$window = appendTo("<div class=\"".concat(this.classes.WINDOW, "\"><img src=\"\" alt=\"\" /></div>"), this.$element);
        this.$windowImage = query('img', this.$window);
        setStyle({
          width: this.options.windowWidth,
          height: this.options.windowHeight
        }, this.$window);
        this.$element.classList.add(this.classes.POSITION + this.options.position);
      }
    }, {
      key: "bindOverlayEvent",
      value: function bindOverlayEvent() {
        var _this = this;

        bindEvent('mouseleave', function () {
          trigger(_this.eventName('hideoverlay'), _this.$overlay);
          _this.overlayVisible = false;
          setStyle({
            left: 'auto',
            top: 'auto',
            width: 'auto',
            height: 'auto',
            display: 'none'
          }, _this.$overlay);
        }, this.$overlay);
        bindEvent('mouseenter', function () {
          if (_this.overlayTimer) {
            clearTimeout(_this.overlayTimer);
            _this.overlayTimer = null;
          }
        }, this.$overlay);
      }
    }, {
      key: "bind",
      value: function bind() {
        var _this2 = this;

        bindEvent(this.eventName('mouseenter'), function (e) {
          _this2.showWindow(e);
        }, this.$image);
        bindEvent(this.eventName('mouseleave'), function (e) {
          _this2.hideWindow(e);
        }, this.$image);
      }
    }, {
      key: "showWindow",
      value: function showWindow(e) {
        var _this3 = this;

        e.preventDefault();
        e.stopPropagation();
        bindEvent(this.eventName('hideoverlay'), function (e) {
          _this3.hideWindow(e);
        }, this.$overlay);
        bindEvent(this.eventName('mousemove'), function (e) {
          _this3.moveWindow(e, _this3.$image);
        }, this.$overlay);
        this.showOverlay();
        trigger(this.eventName('windowShow'));
        this.setImageOverlay();
        this.delay();
        console.log('show');
      }
    }, {
      key: "hideWindow",
      value: function hideWindow(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        if (e && e.preventDefault) e.preventDefault();
        console.log('hide');
      }
    }, {
      key: "moveWindow",
      value: function moveWindow(e, $target) {
        e.preventDefault();
        e.stopPropagation();
        this.pageX = e.pageX;
        this.pageY = e.pageY; // console.log($target, e.pageX, e.pageY)
      }
    }, {
      key: "showOverlay",
      value: function showOverlay() {
        trigger(this.eventName('showoverlay'));
        setStyle({
          top: 0,
          left: 0,
          width: outerWidth(this.$image),
          height: outerHeight(this.$image),
          display: 'block'
        }, this.$overlay);
        this.overlayVisible = true;
      }
    }, {
      key: "setImageOverlay",
      value: function setImageOverlay() {
        setStyle({
          top: 0,
          left: 0,
          width: outerWidth(this.$image),
          height: outerHeight(this.$image)
        }, this.$overlay);
      }
    }, {
      key: "delay",
      value: function delay() {
        var _this4 = this;

        this.stopLoading = true;
        this.timer = setTimeout(function () {
          _this4.delayWindow();
        }, 1);
      }
    }, {
      key: "delayWindow",
      value: function delayWindow() {
        setStyle({
          width: this.options.windowWidth,
          height: this.options.windowHeight
        }, this.$window);
        var imagePreview = new Image();
        var src = this.$image.getAttribute(this.options.source);
        imagePreview.src = src;

        if (this.stopLoading) {
          this.$window.classList.add(this.classes.SHOW);
          this.$windowImage.setAttribute('src', src); // $window set background-image to loaderUrl
        }

        var self = this;
        imagePreview.addEventListener('load', function () {
          if (self.stopLoading) {
            self.$window.classList.add(self.classes.SHOW);
            setStyle({
              background: '#fff'
            }, self.$window);
            var width = self.options.windowWidth * 2;
            var height = self.options.windowHeight * 2;

            if (this.width / this.height > self.options.windowWidth / self.options.windowHeight) {
              width = 'auto';
            }

            if (this.width / this.height < self.options.windowWidth / self.options.windowHeight) {
              height = 'auto';
            }

            setStyle({
              width: width,
              height: height
            }, self.$windowImage);
            self.$windowImage.setAttribute('src', src);
            self.$windowImage.setAttribute('width', width);
            self.$windowImage.setAttribute('height', height);
            setStyle('background-image', 'none', self.$window);
            var e = {
              pageX: self.pageX,
              pageY: self.pageY
            };
            self.initLens();
            self.positionWindow(e);
          }
        });
      }
    }, {
      key: "initLens",
      value: function initLens() {//
      }
    }, {
      key: "positionWindow",
      value: function positionWindow(e) {}
    }, {
      key: "eventName",
      value: function eventName(_eventName) {
        return _eventName + '.magnify';
      } // Checks whether the plugin is in a specific state or not.

    }, {
      key: "is",
      value: function is(state) {
        if (this._states[state] && this._states[state] > 0) {
          return true;
        }

        return false;
      } // Enters a state.

    }, {
      key: "enter",
      value: function enter(state) {
        if (typeof this._states[state] === 'undefined') {
          this._states[state] = 0;
        }

        this._states[state] = 1;
      } // Leaves a state.

    }, {
      key: "leave",
      value: function leave(state) {
        if (typeof this._states[state] === 'undefined') {
          this._states[state] = 0;
        }

        this._states[state] = 0;
      }
    }, {
      key: "getDataOptions",
      value: function getDataOptions() {
        if (!this.$element) {
          return {};
        }

        return this.parseDataOptions(this.$element.dataset);
      }
    }, {
      key: "parseDataOptions",
      value: function parseDataOptions(dataset) {
        return Object.entries(dataset).reduce(function (result, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          try {
            var content = JSON.parse("{\"data\": ".concat(v.replace(/'/g, '"'), "}")).data;
            return Object.assign(result, _defineProperty({}, k, content));
          } catch (err) {
            return Object.assign(result, _defineProperty({}, k, v));
          }
        }, {});
      }
    }]);

    return Magnify;
  }();

  return Magnify;

})));
