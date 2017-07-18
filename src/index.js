import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  arrow: PropTypes.func,
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
      className={`Pagimagic-nav-item Pagimagic-nav-item--${forward} ${disabled(direction)}`}
        onClick={e => {
          callbackFn(e);
        }}
      >
        {this.props.arrow
          ? this.props.arrow()
          : this.props.useDefaultStyles
            ? <DefaultArrow next={forward === 'next'} />
            : <span className="Pagimagic-nav-arrow" aria-hidden="true">
                {forward}
              </span>}
      </div>
    );
  };

  createIterator = (amount, skip, half) => {
    return Array.apply(null, Array(amount)).reduce((memo, item, i) => {
      const cP = this.state.currentPage;
      const sum = skip + i + half;
      const enough = skip + half + amount;
      
      if (enough <= this.getTotalPaginators() && cP !== 0 && cP >= half) {
        memo.push(sum);
      }
      else if (cP === 0 || cP < half) {
        memo.push(i);
      }
      else {
        memo.push(skip + i);
      }

      return memo;
    }, []);
  };

  conditionToReturnIterator = (fn, total, max, skip) => {
    const half = Math.floor(max / 2);
    const paginatorsToBeRendered = total > max ? fn(max, skip, half) : fn(total, skip, half);

    console.warn(paginatorsToBeRendered);
    return paginatorsToBeRendered;
  };

  renderPaginators = (
    currentPage,
    conditionToReturnIterator,
    createIterator,
    totalPaginators,
    maxVisible,
    skip
  ) => {
    return (
      conditionToReturnIterator(
        createIterator,
        totalPaginators,
        maxVisible,
        skip
      ).map(pageIndex => {

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
                ? 'Pagimagic-nav-item active'
                : 'Pagimagic-nav-item'
            }
          >
            {pageIndex + 1}
          </a>
        );
      })
    );
  };

  render() {
    const props = this.props;
    const { currentPage } = this.state;
    const { itemsPerPage, maximumVisiblePaginators, renderChildren, list } = props;
    // where should splice starts
    const startList = currentPage * itemsPerPage;
    // where should splice ends
    const endList = startList + itemsPerPage;
    // elements which should to be shown
    const visibleList = targetList => targetList.slice(startList, endList);
    const className = props.className ? `Pagimagic ${props.className}` : 'Pagimagic';

    const totalPaginators = this.getTotalPaginators();
    const maxVisible =
      totalPaginators > maximumVisiblePaginators
        ? maximumVisiblePaginators
        : totalPaginators;
    let skip = 0;

    if (
      (currentPage + 1 > maxVisible && currentPage < totalPaginators) ||
      currentPage + 1 === totalPaginators
    ) {
      skip = currentPage + 1 - maxVisible;
    }
    else if (currentPage + 1 < maxVisible) {
      skip = currentPage + 1 - maxVisible;
    }

    return (
      <div className={className}>
        {renderChildren(visibleList(list))}

        <nav className="Pagimagic-nav">
          {
            totalPaginators > maxVisible &&
              this.renderPrevNextButtons(
                currentPage,
                totalPaginators,
                this.onClickPrev
              )
          }

          {
            this.renderPaginators(
              currentPage,
              this.conditionToReturnIterator,
              this.createIterator,
              totalPaginators,
              maxVisible,
              skip
            )
          }

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
