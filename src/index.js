import React, { Component } from 'react';
import PropTypes from 'prop-types';

import glue from './glue';
import DefaultArrow from './DefaultArrow';

const propTypes = {
  // list of items
  list: PropTypes.array.isRequired,
  // how many items will be shown on one page
  itemsPerPage: PropTypes.number.isRequired,
  // index of the current page
  currentPageIndex: PropTypes.number.isRequired,
  // handler to change current page index (e.g. in case of using Redux):
  changePageIndex: PropTypes.func,
  // how many(max) paginator buttons with numbers should be shown:
  maximumVisiblePaginators: PropTypes.number.isRequired,
  // render callback:
  renderChildren: PropTypes.func.isRequired,
  // custom arrow element/component (if not specified
  // Pagimagic will render it's own <span>:
  arrow: PropTypes.any,
  // should counter (e.g.: item 1-10 of 213) be displayed or not
  showCounter: PropTypes.bool,
  // if you don't want to specify/apply your own styles:
  useDefaultStyles: PropTypes.bool,
};

class Pagimagic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPageIndex,
      lastPageIndex: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentPageIndex !== state.lastPageIndex) {
      return {
        currentPage: props.currentPageIndex,
        lastPageIndex: props.currentPageIndex
      };
    }

    return null;
  }

  handleChangeCurrentPageIndex = (pageIndex) => {
    if (this.props.changePageIndex) {
      this.props.changePageIndex(pageIndex);
      this.setState(() => ({ currentPage: pageIndex }));
    }
    else {
      this.setState(() => ({ currentPage: pageIndex }));
    }
  }

  getTotalPaginators = () => {
    return Math.ceil(this.props.list.length / this.props.itemsPerPage);
  };

  getItemsPerPage = () => this.props.itemsPerPage;

  getCurrentPage = () => this.state.currentPage;

  getMaximumVisiblePaginators = () => this.props.maximumVisiblePaginators;

  getList = () => this.props.list;

  // where should splice starts
  startList = () => this.getCurrentPage() * this.getItemsPerPage();

  // where should splice ends
  endList = () => this.startList() + this.getItemsPerPage();

  // elements which should to be shown
  getVisibleList = () => this.getList().slice(this.startList(), this.endList());

  getMax = () => this.getTotalPaginators() > this.getMaximumVisiblePaginators()
        ? this.getMaximumVisiblePaginators()
        : this.getTotalPaginators();

  needToRenderArrows = () => this.getTotalPaginators() > this.getMax();

  needToShowCounter = () => !!this.props.showCounter;

  goTo = pageIndex => {
    this.handleChangeCurrentPageIndex(pageIndex);
  };

  onClickPrev = event => {
    event.preventDefault();

    if (this.getCurrentPage() > 0) {
      this.goTo(this.getCurrentPage() - 1);
    }
  };

  onClickNext = event => {
    event.preventDefault();

    if (this.getCurrentPage() + 1 < this.getTotalPaginators()) {
      this.goTo(this.getCurrentPage() + 1);
    }
  };

  renderPrevNextButtons = (
    currentPage,
    totalPaginators,
    callbackFn,
    direction
  ) => {
    const forward = direction === 'next' ? 'next' : 'prev';
    const disabled = direction => {
      if (direction === 'next') {
        return currentPage + 1 === totalPaginators ? 'disabled' : '';
      }
      return currentPage === 0 ? 'disabled' : '';
    };

    return (
      <div
        style={
          this.props.useDefaultStyles
            ? {
              display: 'inline-block',
              cursor:
              disabled(direction) === 'disabled'
                ? 'not-allowed'
                : 'pointer',
              position: 'relative',
              verticalAlign: 'middle',
              width: '50px',
              height: '50px',
              opacity: disabled(direction) === 'disabled' ? '.3' : 1,
            }
            : {
              display: 'inline-block',
              cursor:
              disabled(direction) === 'disabled' ? 'not-allowed' : 'pointer',
            }
        }
        className={
          glue('Pagimagic', this.props.className)(['__nav-item', `__nav-item--${forward}`, `__nav-item--${disabled(direction)}`])
        }
        onClick={e => {
          callbackFn(e);
        }}
      >
        {
          this.props.arrow && typeof this.props.arrow === 'function'
            ? this.props.arrow()
            : this.props.useDefaultStyles
              ? <DefaultArrow next={forward === 'next'} />
              : this.props.arrow
                ? <span className={glue('Pagimagic', this.props.className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])}></span>
                : <span className={glue('Pagimagic', this.props.className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])} aria-hidden="true">
                  {forward}
                </span>
        }
      </div>
    );
  };

  createIterator = currentPage => {
    const HALF = Math.floor(this.getMaximumVisiblePaginators() / 2);
    const TOTAL = this.getTotalPaginators();
    const VISIBLE = TOTAL > this.getMaximumVisiblePaginators() ? this.getMaximumVisiblePaginators() : TOTAL;
    const TO_RENDER = VISIBLE - 3;
    const HALF_TO_RENDER = TO_RENDER/2;

    const make = condition => memo => el => {
      if (condition) memo.push(el);
    };
    const makeFirst = (memo, i) => {
      if (i === 0) memo.push(i);
    };
    const makeEmpty = condition => memo => {
      if (this.needToRenderArrows() && condition) memo.push('...');
    };
    const makeLast = (memo, i) => {
      if (i + 1 === VISIBLE) memo.push(TOTAL - 1);
    };

    return Array.apply(null, Array(VISIBLE)).reduce((memo, item, i) => {
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
        const el = (i + currentPage + HALF - VISIBLE + 1);

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
        const renderingAmount = TOTAL - VISIBLE;
        const el = renderingAmount + i;

        makeFirst(memo, i);
        makeEmpty(el <= renderingAmount)(memo);
        make(el > renderingAmount)(memo)(el);
      }
      /**
       * Last Stage - last page of paginating
       */
      else {
        const el = TOTAL - VISIBLE + i;

        makeFirst(memo, i);
        makeEmpty(el < currentPage - VISIBLE + 2)(memo);
        make(el >= currentPage - VISIBLE + 2)(memo)(el);
      }

      return memo;
    }, []);
  };

  renderPaginators = () => {
    const currentPage = this.state.currentPage;
    const list = this.createIterator(currentPage);

    return (
      list.map((pageIndex, i) => {
        if (isNaN(pageIndex) && isNaN(list[i - 1])) return false;
        if (isNaN(pageIndex)) {
          return (
            <span
              key={pageIndex+i}
              className={glue('Pagimagic', this.props.className)(['__break'])}
              style={
                this.props.useDefaultStyles
                  ? {
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
                    color: currentPage === pageIndex ? '#fff' : '#000',
                  }
                  : {}
              }
            >
              {pageIndex}
            </span>
          );
        }
        return (
          <a
            key={pageIndex}
            style={
              this.props.useDefaultStyles
                ? {
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
                  color: currentPage === pageIndex ? '#fff' : '#000',
                }
                : {}
            }
            onClick={() => {
              this.goTo(pageIndex);
            }}
            className={
              currentPage === pageIndex
                ? glue('Pagimagic', this.props.className)(['__nav-item', '__nav-item--active'])
                : glue('Pagimagic', this.props.className)(['__nav-item'])
            }
          >
            {pageIndex + 1}
          </a>
        );
      })
    );
  };

  renderCounter = () => {
    const from = this.startList() + 1;
    const listLength = this.getVisibleList().length;
    const to = from + listLength - 1;
    const all = this.getList().length;

    return (
      <div className={glue('Pagimagic', this.props.className)(['__counter'])}>
        {`${from}${from === to ? '' : '-'+to}`} of {all}
      </div>
    );
  }

  render() {
    const { renderChildren } = this.props;

    return (
      <div className={glue('Pagimagic', this.props.className)()}>
        {renderChildren(this.getVisibleList())}

        <nav className={glue('Pagimagic', this.props.className)(['__nav'])}>
          {
            this.needToRenderArrows() &&
            this.renderPrevNextButtons(
              this.getCurrentPage(),
              this.getTotalPaginators(),
              this.onClickPrev
            )
          }

          {this.renderPaginators()}

          {
            this.needToRenderArrows() &&
            this.renderPrevNextButtons(
              this.getCurrentPage(),
              this.getTotalPaginators(),
              this.onClickNext,
              'next'
            )
          }
        </nav>
        {
          this.needToShowCounter() &&
            this.renderCounter()
        }
      </div>
    );
  }
}

Pagimagic.propTypes = propTypes;

export default Pagimagic;
