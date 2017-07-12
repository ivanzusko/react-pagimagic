(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.DefaultArrow = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var styles = {
    arrow: function arrow(next) {
      return {
        position: 'absolute',
        display: 'inline-block',
        width: '50px',
        height: '50px',
        top: 0,
        left: 0,
        transform: next ? 'none' : 'rotate(-180deg)'
      };
    },
    svg: function svg() {
      return {
        display: 'inline-block',
        width: '100%'
      };
    }
  };

  var DefaultArrow = function DefaultArrow(_ref) {
    var next = _ref.next;

    return _react2.default.createElement(
      'span',
      {
        className: 'Pagimagic-nav-arrow',
        style: styles.arrow(next)
      },
      _react2.default.createElement(
        'svg',
        {
          x: '0px',
          y: '0px',
          viewBox: '0 0 240.823 240.823',
          style: styles.svg()
        },
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('path', {
            d: 'M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179 l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261 C187.881,124.315,187.881,116.495,183.189,111.816z' }),
          _react2.default.createElement('g', null),
          _react2.default.createElement('g', null),
          _react2.default.createElement('g', null),
          _react2.default.createElement('g', null),
          _react2.default.createElement('g', null),
          _react2.default.createElement('g', null)
        ),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null),
        _react2.default.createElement('g', null)
      )
    );
  };

  exports.default = DefaultArrow;
});