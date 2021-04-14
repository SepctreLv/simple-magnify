/*!
  * simple-magify v0.0.1 (https://github.com/SepctreLv/simple-magnify)
  * Copyright 2021 SepctreLv
  * Licensed under MIT
  */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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
    WINDOWIMAGE: 'magnify-window-image',
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
  var LOADER = {
    loader: 'data:image/gif;base64,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'
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
  var getOffset = function getOffset(el) {
    var box = el.getBoundingClientRect();
    var win = getDefaultView(el);
    return {
      top: box.top + win.pageYOffset,
      left: box.left + win.pageXOffset
    };
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

  var removeEvent = curryWith(function (events, selector, callback, element) {
    var eventArr = events.split(' ');

    if (eventArr.length > 1) {
      eventArr.forEach(function (e) {
        removeEvent(e, selector, callback, element);
      });
    } else {
      if (!isString(selector) && !isFunction(callback)) {
        element = callback;
        callback = selector;
        selector = undefined;
      }

      if (!isFunction(callback)) {
        element = callback;
        callback = undefined;
      }

      var event = events;
      var emitter = EventEmitter.getEventEmitter(element);

      var _EventEmitter$parseEv3 = EventEmitter.parseEvent(event),
          eventName = _EventEmitter$parseEv3.eventName;

      if (emitter.hasListeners(event)) {
        if (emitter.getListeners(event).length === 0) {
          element.removeEventListener(eventName, dispatch);
        }

        if (typeof callback === 'undefined') {
          emitter.off(event);
        } else {
          emitter.off(event, callback._delegator);
        }
      }
    }

    return element;
  }, supportEventListener);
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
      this.lensSize = {};
      this.init();
    }

    _createClass(Magnify, [{
      key: "init",
      value: function init() {
        this.$element.classList.add(this.classes.MAGNIFY);
        this.$image = query('img', this.$element);
        this.$image.classList.add(this.classes.IMAGE);
        this.initWrap();
        this.initWindow();
        this.initOverlay();
        this.bind();
      }
    }, {
      key: "initWrap",
      value: function initWrap() {
        if (this.options.wrapSelector) {
          this.$wrap = query(this.options.wrapSelector) ? query(this.options.wrapSelector) : this.$element;
        } else {
          this.$wrap = this.$element;
        }
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
        this.$window = appendTo("<div class=\"".concat(this.classes.WINDOW, "\"><img src=\"\" alt=\"\" /></div>"), this.$wrap);
        this.$windowImage = query('img', this.$window);
        this.$windowImage.classList.add(this.classes.WINDOWIMAGE);
        setStyle({
          width: this.options.windowWidth,
          height: this.options.windowHeight
        }, this.$window);
        this.$wrap.classList.add(this.classes.POSITION + this.options.position);
      }
    }, {
      key: "bindOverlayEvent",
      value: function bindOverlayEvent() {
        var _this = this;

        bindEvent('mouseleave', function () {
          trigger(_this.eventName('hideoverlay'), _this.$overlay);
          _this.overlayVisible = false;
          setStyle({
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
          _this2.hideOverlay(e);
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
        trigger(this.eventName('windowshow'), this.$element);
        this.delay();
      }
    }, {
      key: "hideWindow",
      value: function hideWindow(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        if (e && e.preventDefault) e.preventDefault();
        clearTimeout(this.timer);
        removeEvent(this.eventName('hideoverlay'), this.$overlay);
        removeEvent(this.eventName('mousemove'), this.$overlay);
        this.stopLoading = false;
        setStyle({
          width: 'auto',
          height: 'auto',
          transform: 'none'
        }, this.$windowImage);
        this.$window.classList.remove(this.classes.SHOW);
        trigger(this.eventName('windowhide'), this.$element);
        this.clearLens();
      }
    }, {
      key: "moveWindow",
      value: function moveWindow(e, $target) {
        e.preventDefault();
        e.stopPropagation();
        this.pageX = e.pageX;
        this.pageY = e.pageY;
        this.positionWindow($target, e);
      }
    }, {
      key: "showOverlay",
      value: function showOverlay() {
        trigger(this.eventName('showoverlay'), this.$overlay);
        setStyle({
          width: outerWidth(this.$image),
          height: outerHeight(this.$image),
          display: 'block'
        }, this.$overlay);
        this.overlayVisible = true;
      }
    }, {
      key: "hideOverlay",
      value: function hideOverlay() {
        var _this4 = this;

        this.overlayTimer = setTimeout(function () {
          trigger(_this4.eventName('hideoverlay'), _this4.$overlay);
          _this4.overlayVisible = false;
          setStyle({
            display: 'none'
          }, _this4.$overlay);
        }, 100);
      }
    }, {
      key: "delay",
      value: function delay() {
        var _this5 = this;

        this.stopLoading = true;
        this.timer = setTimeout(function () {
          _this5.delayWindow();
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

          setStyle({
            'background-image': "url(".concat(LOADER.loader, ")")
          }, this.$window);
        }

        var self = this;
        imagePreview.addEventListener('load', function () {
          if (self.stopLoading) {
            self.$window.classList.add(self.classes.SHOW);
            setStyle({
              'background-color': '#fff'
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
            self.$windowImage.setAttribute('height', height); // $window set background-image to none

            setStyle('background-image', 'none', self.$window);
            var e = {
              pageX: self.pageX,
              pageY: self.pageY
            };
            self.initLens();
            self.positionWindow(self.$image, e);
          }
        });
      }
    }, {
      key: "initLens",
      value: function initLens() {
        var ratioWidth = this.options.windowWidth / outerWidth(this.$windowImage);
        var ratioHeight = this.options.windowHeight / outerHeight(this.$windowImage);
        setStyle({
          'background': "url(".concat(this.$image.getAttribute('src'), ") 0 0 no-repeat")
        }, this.$lens);
        var width = Math.round(ratioWidth * outerWidth(this.$image));
        var height = Math.round(ratioHeight * outerHeight(this.$image));
        this.setLensSize(width, height);
      }
    }, {
      key: "setLensSize",
      value: function setLensSize(width, height) {
        setStyle({
          width: width,
          height: height
        }, this.$lens);
        this.lensSize.width = width;
        this.lensSize.height = height;
      }
    }, {
      key: "clearLens",
      value: function clearLens() {
        setStyle({
          background: 'transparent'
        }, this.$lens);
      }
    }, {
      key: "positionWindow",
      value: function positionWindow($target, e) {
        var mouseX = Math.round(e.pageX - getOffset($target).left);
        var mouseY = Math.round(e.pageY - getOffset($target).top);
        var lensPos = this.moveLens(mouseX, mouseY);
        var width = outerWidth(this.$windowImage);
        var height = outerHeight(this.$windowImage);
        var left = -Math.round(width * lensPos.x);
        var top = -Math.round(height * lensPos.y);
        this.moveWindowImage(left, top);
      }
    }, {
      key: "moveWindowImage",
      value: function moveWindowImage(left, top) {
        var width = this.options.windowWidth;
        var height = this.options.windowHeight;
        var $img = this.$windowImage;

        if (left >= 0) {
          left = 0;
        }

        if (left <= width - outerWidth($img)) {
          left = width - outerWidth($img);
        }

        if (top >= 0) {
          top = 0;
        }

        if (top <= height - outerHeight($img)) {
          top = height - outerHeight($img);
        }

        setStyle({
          transform: "translate(".concat(left, "px, ").concat(top, "px)")
        }, $img);
      }
    }, {
      key: "moveLens",
      value: function moveLens(mouseX, mouseY) {
        var $img = this.$image;
        var size = this.lensSize;
        var left = Math.round(mouseX - size.width / 2);
        var top = Math.round(mouseY - size.height / 2);

        if (left <= 0) {
          left = 0;
        }

        if (left >= outerWidth($img) - size.width) {
          left = outerWidth($img) - size.width;
        }

        if (top <= 0) {
          top = 0;
        }

        if (top >= outerHeight($img) - size.height) {
          top = outerHeight($img) - size.height;
        }

        setStyle({
          transform: "translate(".concat(left, "px, ").concat(top, "px)"),
          backgroundPosition: "".concat(-left, "px ").concat(-top, "px")
        }, this.$lens);
        return {
          x: left / outerWidth($img),
          y: top / outerHeight($img)
        };
      }
    }, {
      key: "eventName",
      value: function eventName(_eventName) {
        return _eventName + '.magnify';
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
  new Magnify(magnifyElement, {
    wrapSelector: '.magnify-wrap'
  });

})));
