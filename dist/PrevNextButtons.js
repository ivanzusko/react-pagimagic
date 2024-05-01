(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './glue', './DefaultArrow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./glue'), require('./DefaultArrow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.glue, global.DefaultArrow);
    global.PrevNextButtons = mod.exports;
  }
})(this, function (exports, _react, _glue, _DefaultArrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _glue2 = _interopRequireDefault(_glue);

  var _DefaultArrow2 = _interopRequireDefault(_DefaultArrow);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var PrevNextButtons = function PrevNextButtons(_ref) {
    var currentPage = _ref.currentPage,
        totalPaginators = _ref.totalPaginators,
        callbackFn = _ref.callbackFn,
        direction = _ref.direction,
        useDefaultStyles = _ref.useDefaultStyles,
        arrow = _ref.arrow,
        className = _ref.className;

    var forward = direction === 'next' ? 'next' : 'prev';
    var disabled = function disabled(direction) {
      if (direction === 'next') {
        return currentPage + 1 === totalPaginators ? 'disabled' : '';
      }
      return currentPage === 0 ? 'disabled' : '';
    };

    return _react2.default.createElement(
      'div',
      {
        style: useDefaultStyles ? {
          display: 'inline-block',
          cursor: disabled(direction) === 'disabled' ? 'not-allowed' : 'pointer',
          position: 'relative',
          verticalAlign: 'middle',
          width: '50px',
          height: '50px',
          opacity: disabled(direction) === 'disabled' ? '.3' : 1
        } : {
          display: 'inline-block',
          cursor: disabled(direction) === 'disabled' ? 'not-allowed' : 'pointer'
        },
        className: (0, _glue2.default)('Pagimagic', className)(['__nav-item', '__nav-item--' + forward, '__nav-item--' + disabled(direction)]),
        onClick: function onClick(e) {
          callbackFn(e);
        }
      },
      arrow && typeof arrow === 'function' ? arrow() : useDefaultStyles ? _react2.default.createElement(_DefaultArrow2.default, { next: forward === 'next' }) : arrow ? _react2.default.createElement('span', { className: (0, _glue2.default)('Pagimagic', className)(['__nav-arrow', '__nav-arrow--' + forward, '__nav-arrow--' + disabled(direction)]) }) : _react2.default.createElement(
        'span',
        { className: (0, _glue2.default)('Pagimagic', className)(['__nav-arrow', '__nav-arrow--' + forward, '__nav-arrow--' + disabled(direction)]), 'aria-hidden': 'true' },
        forward
      )
    );
  };

  exports.default = PrevNextButtons;
});