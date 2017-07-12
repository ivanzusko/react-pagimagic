(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './DefaultArrow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./DefaultArrow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.DefaultArrow);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _DefaultArrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _DefaultArrow2 = _interopRequireDefault(_DefaultArrow);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var propTypes = {
    // list of items
    list: _propTypes2.default.array.isRequired,
    // how many items will be shown on one page
    itemsPerPage: _propTypes2.default.number.isRequired,
    // index of the current page
    currentPageIndex: _propTypes2.default.number.isRequired,
    // how many(max) paginator buttons with numbers should be shown:
    maximumVisiblePaginators: _propTypes2.default.number.isRequired,
    // render callback:
    renderChildren: _propTypes2.default.func.isRequired,
    // custom arrow element/component (if not specified
    // Pagimagic will render it's own <span>:
    arrow: _propTypes2.default.func,
    // if you don't want to specify/apply your own styles:
    useDefaultStyles: _propTypes2.default.bool
  };

  var Pagimagic = function (_Component) {
    _inherits(Pagimagic, _Component);

    function Pagimagic(props) {
      _classCallCheck(this, Pagimagic);

      var _this = _possibleConstructorReturn(this, (Pagimagic.__proto__ || Object.getPrototypeOf(Pagimagic)).call(this, props));

      _this.goTo = function (pageIndex) {
        _this.setState(function () {
          return { currentPage: pageIndex };
        });
      };

      _this.onClickPrev = function (event) {
        event.preventDefault();

        var currentPage = _this.state.currentPage;


        if (currentPage > 0) {
          _this.goTo(currentPage - 1);
        }
      };

      _this.onClickNext = function (event) {
        event.preventDefault();

        var _this$state = _this.state,
            currentPage = _this$state.currentPage,
            totalPaginators = _this$state.totalPaginators;


        if (currentPage + 1 < totalPaginators) {
          _this.goTo(currentPage + 1);
        }
      };

      _this.renderPrevNextButtons = function (currentPage, totalPaginators, callbackFn, direction) {
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
            style: _this.props.useDefaultStyles ? {
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
            className: 'Pagimagic-nav-item Pagimagic-nav-item--' + forward + ' ' + disabled(direction),
            onClick: function onClick(e) {
              callbackFn(e);
            }
          },
          _this.props.arrow ? _this.props.arrow() : _this.props.useDefaultStyles ? _react2.default.createElement(_DefaultArrow2.default, { next: forward === 'next' }) : _react2.default.createElement(
            'span',
            { className: 'Pagimagic-nav-arrow', 'aria-hidden': 'true' },
            forward
          )
        );
      };

      _this.state = {
        currentPage: _this.props.currentPageIndex,
        list: _this.props.list,
        totalPaginators: Math.ceil(_this.props.list.length / _this.props.itemsPerPage)
      };
      return _this;
    }

    _createClass(Pagimagic, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var itemsPerPage = props.itemsPerPage,
            maximumVisiblePaginators = props.maximumVisiblePaginators,
            renderChildren = props.renderChildren;

        // where should splice starts
        var startList = this.state.currentPage * itemsPerPage;
        // where should splice ends
        var endList = startList + itemsPerPage;
        // elements which should to be shown
        var visibleList = function visibleList(targetList) {
          return targetList.slice(startList, endList);
        };
        var className = props.className ? 'Pagimagic ' + props.className : 'Pagimagic';
        var _state = this.state,
            currentPage = _state.currentPage,
            totalPaginators = _state.totalPaginators,
            list = _state.list;

        var maxVisible = totalPaginators > maximumVisiblePaginators ? maximumVisiblePaginators : totalPaginators;
        var skip = 0;

        var createIterator = function createIterator(amount, skip) {
          return Array.apply(null, Array(amount)).reduce(function (memo, item, i) {
            memo.push(skip + i);

            return memo;
          }, []);
        };

        var conditionToReturnIterator = function conditionToReturnIterator(fn, total, max, skip) {
          return total > max ? fn(max, skip) : fn(total, skip);
        };

        if (currentPage + 1 > maxVisible && currentPage < totalPaginators || currentPage + 1 === totalPaginators) {
          skip = currentPage + 1 - maxVisible;
        }

        return _react2.default.createElement(
          'div',
          { className: className },
          renderChildren(visibleList(list)),
          _react2.default.createElement(
            'nav',
            { className: 'Pagimagic-nav' },
            totalPaginators > maxVisible && this.renderPrevNextButtons(currentPage, totalPaginators, this.onClickPrev),
            conditionToReturnIterator(createIterator, totalPaginators, maxVisible, skip).map(function (pageIndex) {
              return _react2.default.createElement(
                'a',
                {
                  key: pageIndex,
                  style: _this2.props.useDefaultStyles ? {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    lineHeight: '50px',
                    width: '50px',
                    height: '50px',
                    border: 'solid 1px #000',
                    borderRadius: '3px',
                    textAlign: 'center',
                    margin: '0 5px',
                    backgroundColor: currentPage === pageIndex ? '#000' : '#fff',
                    color: currentPage === pageIndex ? '#fff' : '#000'
                  } : {},
                  onClick: function onClick() {
                    _this2.goTo(pageIndex);
                  },
                  className: currentPage === pageIndex ? 'Pagimagic-nav-item active' : 'Pagimagic-nav-item'
                },
                pageIndex + 1
              );
            }),
            totalPaginators > maxVisible && this.renderPrevNextButtons(currentPage, totalPaginators, this.onClickNext, 'next')
          )
        );
      }
    }]);

    return Pagimagic;
  }(_react.Component);

  Pagimagic.propTypes = propTypes;

  exports.default = Pagimagic;
});