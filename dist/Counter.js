(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './glue'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./glue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.glue);
    global.Counter = mod.exports;
  }
})(this, function (exports, _react, _glue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _glue2 = _interopRequireDefault(_glue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Counter = function Counter(_ref) {
    var className = _ref.className,
        from = _ref.from,
        listLength = _ref.listLength,
        all = _ref.all;

    var to = from + listLength - 1;

    return _react2.default.createElement(
      'div',
      { className: (0, _glue2.default)('Pagimagic', className)(['__counter']) },
      '' + from + (from === to ? '' : '-' + to),
      ' of ',
      all
    );
  };

  exports.default = Counter;
});