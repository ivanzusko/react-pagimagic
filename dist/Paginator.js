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
    global.Paginator = mod.exports;
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

  var Paginator = function Paginator(_ref) {
    var className = _ref.className,
        list = _ref.list,
        currentPage = _ref.currentPage,
        goTo = _ref.goTo,
        useDefaultStyles = _ref.useDefaultStyles;

    var defaultStyles = function defaultStyles(pageIndex) {
      return {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '20px',
        width: '40px',
        height: '40px',
        padding: '10px',
        border: 'solid 1px #000',
        borderRadius: '3px',
        textAlign: 'center',
        margin: '0 5px',
        backgroundColor: currentPage === pageIndex ? '#000' : '#fff',
        color: currentPage === pageIndex ? '#fff' : '#000',
        cursor: 'pointer'
      };
    };

    return list.map(function (pageIndex, i) {
      if (isNaN(pageIndex) && isNaN(list[i - 1])) return false;
      if (isNaN(pageIndex)) {
        return _react2.default.createElement(
          'span',
          {
            key: pageIndex + i,
            className: (0, _glue2.default)('Pagimagic', className)(['__break']),
            style: useDefaultStyles ? defaultStyles(pageIndex) : {}
          },
          pageIndex
        );
      }
      return _react2.default.createElement(
        'a',
        {
          key: pageIndex,
          style: useDefaultStyles ? defaultStyles(pageIndex) : {},
          onClick: function onClick() {
            goTo(pageIndex);
          },
          className: currentPage === pageIndex ? (0, _glue2.default)('Pagimagic', className)(['__nav-item', '__nav-item--active']) : (0, _glue2.default)('Pagimagic', className)(['__nav-item'])
        },
        pageIndex + 1
      );
    });
  };

  exports.default = Paginator;
});