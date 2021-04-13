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

  var Magnify = function Magnify(options) {
    _classCallCheck(this, Magnify);

    this.options = options;
  };

  new Magnify();

})));
