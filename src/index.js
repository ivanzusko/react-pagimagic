import React, { Component } from 'react';
import PropTypes from 'prop-types';

import glue from './glue';
import PrevNextButtons from './PrevNextButtons';
import Counter from './Counter';
import Paginator from './Paginator';

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

  render() {
    const { renderChildren } = this.props;

    return (
      <div className={glue('Pagimagic', this.props.className)()}>
        {renderChildren(this.getVisibleList())}

        <nav className={glue('Pagimagic', this.props.className)(['__nav'])}>
          {
            this.needToRenderArrows() &&
            <PrevNextButtons
              currentPage={this.getCurrentPage()}
              totalPaginators={this.getTotalPaginators()}
              callbackFn={this.onClickPrev}
              useDefaultStyles={this.props.useDefaultStyles}
              arrow={this.props.arrow}
              className={this.props.className}
            />
          }

          <Paginator
            className={this.props.className}
            list={this.createIterator(this.state.currentPage)}
            currentPage={this.state.currentPage}
            goTo={this.goTo}
            useDefaultStyles={this.props.useDefaultStyles}
          />

          {
            this.needToRenderArrows() &&
            <PrevNextButtons
              currentPage={this.getCurrentPage()}
              totalPaginators={this.getTotalPaginators()}
              callbackFn={this.onClickNext}
              direction='next'
              useDefaultStyles={this.props.useDefaultStyles}
              arrow={this.props.arrow}
              className={this.props.className}
            />
          }
        </nav>
        {
          this.needToShowCounter() &&
            <Counter
              className={this.props.className}
              from={this.startList() + 1}
              listLength={this.getVisibleList().length}
              all={this.getList().length}
            />
        }
      </div>
    );
  }
}

Pagimagic.propTypes = propTypes;

export default Pagimagic;
