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

    return Array.apply(null, Array(VISIBLE)).reduce((memo, item, i) => {
      if (currentPage + HALF < VISIBLE) {
        memo.push(i);
      }
      else if (currentPage + HALF === VISIBLE && VISIBLE !== TOTAL) {
        memo.push(i + 1);
      }
      else if (currentPage + HALF < TOTAL) {
        const el = (i + currentPage + HALF - VISIBLE + 1);
        memo.push(el);
      }
      else {
        const el = TOTAL - VISIBLE + i;
        memo.push(el);
      }

      return memo;
    }, []);
  };

  renderPaginators = () => {
    const currentPage = this.state.currentPage;

    return (
      this.createIterator(currentPage).map(pageIndex => {
        return (
          <a
            key={pageIndex}
            style={
              this.props.useDefaultStyles
                ? {
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
        { renderChildren(visibleList(list)) }

        <nav className={glue('Pagimagic', this.props.className)(['__nav'])}>
          {
            totalPaginators > maxVisible &&
              this.renderPrevNextButtons(
                currentPage,
                totalPaginators,
                this.onClickPrev
              )
          }

          { this.renderPaginators() }

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
