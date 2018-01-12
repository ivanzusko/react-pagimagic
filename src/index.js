import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { typeOf } from 'picklock';

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
  // if you don't want to specify/apply your own styles:
  useDefaultStyles: PropTypes.bool,
};

class Pagimagic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPageIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPageIndex !== this.props.currentPageIndex) {
      this.setState(() => ({ currentPage: nextProps.currentPageIndex }));
    }
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

  goTo = pageIndex => {
    this.handleChangeCurrentPageIndex(pageIndex);
  };

  onClickPrev = event => {
    event.preventDefault();

    const { currentPage } = this.state;

    if (currentPage > 0) {
      this.goTo(currentPage - 1);
    }
  };

  onClickNext = event => {
    event.preventDefault();

    const { currentPage } = this.state;

    if (currentPage + 1 < this.getTotalPaginators()) {
      this.goTo(currentPage + 1);
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
          this.props.arrow && typeOf(this.props.arrow, 'function')
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

  createIterator = (currentPage) => {
    const HALF = Math.floor(this.props.maximumVisiblePaginators / 2);
    const TOTAL = this.getTotalPaginators();
    const VISIBLE = TOTAL > this.props.maximumVisiblePaginators ? this.props.maximumVisiblePaginators : TOTAL;
    const TO_RENDER = VISIBLE - 3;
    const HALF_TO_RENDER = TO_RENDER/2;

    const make = condition => memo => el => {
      if (condition) memo.push(el);
    };
    const makeFirst = (memo, i) => {
      if (i === 0) memo.push(i);
    };
    const makeEmpty = condition => memo => {
      if (condition) memo.push('...');
    };
    const makeLast = (memo, i) => {
      if (i + 1 === VISIBLE) memo.push(TOTAL - 1);
    };

    const j1 = Array.apply(null, Array(VISIBLE)).reduce((memo, item, i) => {
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
        console.error('(3)', el);

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

    return j1;
  };

  renderPaginators = () => {
    const currentPage = this.state.currentPage;
    const list = this.createIterator(currentPage);

    return (
      list.map((pageIndex, i) => {
        if (isNaN(pageIndex) && isNaN(list[i - 1])) return false;
        if (isNaN(pageIndex)) {
          return (
            <p
              key={pageIndex+i}
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
            >{pageIndex}</p>
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

  render() {
    const { currentPage } = this.state;
    const { itemsPerPage, maximumVisiblePaginators, renderChildren, list } = this.props;
    // where should splice starts
    const startList = currentPage * itemsPerPage;
    // where should splice ends
    const endList = startList + itemsPerPage;
    // elements which should to be shown
    const visibleList = targetList => targetList.slice(startList, endList);

    const totalPaginators = this.getTotalPaginators();
    const maxVisible =
      totalPaginators > maximumVisiblePaginators
        ? maximumVisiblePaginators
        : totalPaginators;

    return (
      <div className={glue('Pagimagic', this.props.className)()}>
        {renderChildren(visibleList(list))}

        <nav className={glue('Pagimagic', this.props.className)(['__nav'])}>
          {
            totalPaginators > maxVisible &&
            this.renderPrevNextButtons(
              currentPage,
              totalPaginators,
              this.onClickPrev
            )
          }

          {this.renderPaginators()}

          {
            totalPaginators > maxVisible &&
            this.renderPrevNextButtons(
              currentPage,
              totalPaginators,
              this.onClickNext,
              'next'
            )
          }
        </nav>
      </div>
    );
  }
}

Pagimagic.propTypes = propTypes;

export default Pagimagic;
