(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './glue', './DefaultArrow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./glue'), require('./DefaultArrow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.glue, global.DefaultArrow);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _glue, _DefaultArrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _glue2 = _interopRequireDefault(_glue);

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
    // handler to change current page index (e.g. in case of using Redux):
    changePageIndex: _propTypes2.default.func,
    // how many(max) paginator buttons with numbers should be shown:
    maximumVisiblePaginators: _propTypes2.default.number.isRequired,
    // render callback:
    renderChildren: _propTypes2.default.func.isRequired,
    // custom arrow element/component (if not specified
    // Pagimagic will render it's own <span>:
    arrow: _propTypes2.default.any,
    // should counter (e.g.: item 1-10 of 213) be displayed or not
    showCounter: _propTypes2.default.bool,
    // if you don't want to specify/apply your own styles:
    useDefaultStyles: _propTypes2.default.bool
  };

  var Pagimagic = function (_Component) {
    _inherits(Pagimagic, _Component);

    function Pagimagic(props) {
      _classCallCheck(this, Pagimagic);

      var _this = _possibleConstructorReturn(this, (Pagimagic.__proto__ || Object.getPrototypeOf(Pagimagic)).call(this, props));

      _this.handleChangeCurrentPageIndex = function (pageIndex) {
        if (_this.props.changePageIndex) {
          _this.props.changePageIndex(pageIndex);
          _this.setState(function () {
            return { currentPage: pageIndex };
          });
        } else {
          _this.setState(function () {
            return { currentPage: pageIndex };
          });
        }
      };

      _this.getTotalPaginators = function () {
        return Math.ceil(_this.props.list.length / _this.props.itemsPerPage);
      };

      _this.getItemsPerPage = function () {
        return _this.props.itemsPerPage;
      };

      _this.getCurrentPage = function () {
        return _this.state.currentPage;
      };

      _this.getMaximumVisiblePaginators = function () {
        return _this.props.maximumVisiblePaginators;
      };

      _this.getList = function () {
        return _this.props.list;
      };

      _this.startList = function () {
        return _this.getCurrentPage() * _this.getItemsPerPage();
      };

      _this.endList = function () {
        return _this.startList() + _this.getItemsPerPage();
      };

      _this.getVisibleList = function () {
        return _this.getList().slice(_this.startList(), _this.endList());
      };

      _this.getMax = function () {
        return _this.getTotalPaginators() > _this.getMaximumVisiblePaginators() ? _this.getMaximumVisiblePaginators() : _this.getTotalPaginators();
      };

      _this.needToRenderArrows = function () {
        return _this.getTotalPaginators() > _this.getMax();
      };

      _this.needToShowCounter = function () {
        return !!_this.props.showCounter;
      };

      _this.goTo = function (pageIndex) {
        _this.handleChangeCurrentPageIndex(pageIndex);
      };

      _this.onClickPrev = function (event) {
        event.preventDefault();

        if (_this.getCurrentPage() > 0) {
          _this.goTo(_this.getCurrentPage() - 1);
        }
      };

      _this.onClickNext = function (event) {
        event.preventDefault();

        if (_this.getCurrentPage() + 1 < _this.getTotalPaginators()) {
          _this.goTo(_this.getCurrentPage() + 1);
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
            className: (0, _glue2.default)('Pagimagic', _this.props.className)(['__nav-item', '__nav-item--' + forward, '__nav-item--' + disabled(direction)]),
            onClick: function onClick(e) {
              callbackFn(e);
            }
          },
          _this.props.arrow && typeof _this.props.arrow === 'function' ? _this.props.arrow() : _this.props.useDefaultStyles ? _react2.default.createElement(_DefaultArrow2.default, { next: forward === 'next' }) : _this.props.arrow ? _react2.default.createElement('span', { className: (0, _glue2.default)('Pagimagic', _this.props.className)(['__nav-arrow', '__nav-arrow--' + forward, '__nav-arrow--' + disabled(direction)]) }) : _react2.default.createElement(
            'span',
            { className: (0, _glue2.default)('Pagimagic', _this.props.className)(['__nav-arrow', '__nav-arrow--' + forward, '__nav-arrow--' + disabled(direction)]), 'aria-hidden': 'true' },
            forward
          )
        );
      };

      _this.createIterator = function (currentPage) {
        var HALF = Math.floor(_this.getMaximumVisiblePaginators() / 2);
        var TOTAL = _this.getTotalPaginators();
        var VISIBLE = TOTAL > _this.getMaximumVisiblePaginators() ? _this.getMaximumVisiblePaginators() : TOTAL;
        var TO_RENDER = VISIBLE - 3;
        var HALF_TO_RENDER = TO_RENDER / 2;

        var make = function make(condition) {
          return function (memo) {
            return function (el) {
              if (condition) memo.push(el);
            };
          };
        };
        var makeFirst = function makeFirst(memo, i) {
          if (i === 0) memo.push(i);
        };
        var makeEmpty = function makeEmpty(condition) {
          return function (memo) {
            if (_this.needToRenderArrows() && condition) memo.push('...');
          };
        };
        var makeLast = function makeLast(memo, i) {
          if (i + 1 === VISIBLE) memo.push(TOTAL - 1);
        };

        return Array.apply(null, Array(VISIBLE)).reduce(function (memo, item, i) {
          /**
           * Stage 1 - till the middle
           */
          if (currentPage + HALF < VISIBLE) {
            make(i < VISIBLE - 1)(memo)(i);
            makeEmpty(i >= VISIBLE - 1)(memo);
            makeLast(memo, i);
          }
          /**
           * Stage 2 - when pagination starts moving
           */
          else if (currentPage + HALF === VISIBLE && VISIBLE !== TOTAL) {
              makeFirst(memo, i);
              make(i !== 0 && i !== VISIBLE - 1)(memo)(i);
              makeEmpty(i > HALF && i + 1 === VISIBLE)(memo);
              makeLast(memo, i);
            }
            /**
             * Stage 3 - main part
             */
            else if (currentPage + HALF < TOTAL) {
                var el = i + currentPage + HALF - VISIBLE + 1;

                makeFirst(memo, i);
                makeEmpty(el < currentPage - HALF_TO_RENDER)(memo);
                make(el >= currentPage - HALF_TO_RENDER && el <= currentPage + HALF_TO_RENDER)(memo)(el);
                makeEmpty(el > currentPage + HALF_TO_RENDER && el !== TOTAL - 1)(memo);
                makeLast(memo, i);
              }
              /**
               * Stage 4 - when last part rendered and we need just move active page indicator
               */
              else if (currentPage + 1 < TOTAL) {
                  var renderingAmount = TOTAL - VISIBLE;
                  var _el = renderingAmount + i;

                  makeFirst(memo, i);
                  makeEmpty(_el <= renderingAmount)(memo);
                  make(_el > renderingAmount)(memo)(_el);
                }
                /**
                 * Last Stage - last page of paginating
                 */
                else {
                    var _el2 = TOTAL - VISIBLE + i;

                    makeFirst(memo, i);
                    makeEmpty(_el2 < currentPage - VISIBLE + 2)(memo);
                    make(_el2 >= currentPage - VISIBLE + 2)(memo)(_el2);
                  }

          return memo;
        }, []);
      };

      _this.renderPaginators = function () {
        var currentPage = _this.state.currentPage;
        var list = _this.createIterator(currentPage);

        return list.map(function (pageIndex, i) {
          if (isNaN(pageIndex) && isNaN(list[i - 1])) return false;
          if (isNaN(pageIndex)) {
            return _react2.default.createElement(
              'span',
              {
                key: pageIndex + i,
                className: (0, _glue2.default)('Pagimagic', _this.props.className)(['__break']),
                style: _this.props.useDefaultStyles ? {
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  lineHeight: '20px',
                  width: '20px',
                  height: '20px',
                  border: 'solid 1px #000',
                  borderRadius: '3px',
                  textAlign: 'center',
                  margin: '0 5px',
                  backgroundColor: currentPage === pageIndex ? '#000' : '#fff',
                  color: currentPage === pageIndex ? '#fff' : '#000'
                } : {}
              },
              pageIndex
            );
          }
          return _react2.default.createElement(
            'a',
            {
              key: pageIndex,
              style: _this.props.useDefaultStyles ? {
                display: 'inline-block',
                verticalAlign: 'middle',
                lineHeight: '20px',
                width: '20px',
                height: '20px',
                border: 'solid 1px #000',
                borderRadius: '3px',
                textAlign: 'center',
                margin: '0 5px',
                backgroundColor: currentPage === pageIndex ? '#000' : '#fff',
                color: currentPage === pageIndex ? '#fff' : '#000'
              } : {},
              onClick: function onClick() {
                _this.goTo(pageIndex);
              },
              className: currentPage === pageIndex ? (0, _glue2.default)('Pagimagic', _this.props.className)(['__nav-item', '__nav-item--active']) : (0, _glue2.default)('Pagimagic', _this.props.className)(['__nav-item'])
            },
            pageIndex + 1
          );
        });
      };

      _this.renderCounter = function () {
        var from = _this.startList() + 1;
        var listLength = _this.getVisibleList().length;
        var to = from + listLength - 1;
        var all = _this.getList().length;

        return _react2.default.createElement(
          'div',
          { className: (0, _glue2.default)('Pagimagic', _this.props.className)(['__counter']) },
          '' + from + (from === to ? '' : '-' + to),
          ' of ',
          all
        );
      };

      _this.state = {
        currentPage: _this.props.currentPageIndex
      };
      return _this;
    }

    _createClass(Pagimagic, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.currentPageIndex !== this.props.currentPageIndex) {
          this.setState(function () {
            return { currentPage: nextProps.currentPageIndex };
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var renderChildren = this.props.renderChildren;


        return _react2.default.createElement(
          'div',
          { className: (0, _glue2.default)('Pagimagic', this.props.className)() },
          renderChildren(this.getVisibleList()),
          _react2.default.createElement(
            'nav',
            { className: (0, _glue2.default)('Pagimagic', this.props.className)(['__nav']) },
            this.needToRenderArrows() && this.renderPrevNextButtons(this.getCurrentPage(), this.getTotalPaginators(), this.onClickPrev),
            this.renderPaginators(),
            this.needToRenderArrows() && this.renderPrevNextButtons(this.getCurrentPage(), this.getTotalPaginators(), this.onClickNext, 'next')
          ),
          this.needToShowCounter() && this.renderCounter()
        );
      }
    }]);

    return Pagimagic;
  }(_react.Component);

  Pagimagic.propTypes = propTypes;

  exports.default = Pagimagic;
});