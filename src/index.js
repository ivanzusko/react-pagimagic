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

  getTotalPaginators = () => {
    return Math.ceil(this.props.list.length / this.props.itemsPerPage);
  };

  goTo = pageIndex => {
    this.setState(() => ({ currentPage: pageIndex }));
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
              opacity: disabled(direction) === 'disabled' ? '.3' : 1
            }
            : {
              display: 'inline-block',
              cursor:
                  disabled(direction) === 'disabled' ? 'not-allowed' : 'pointer'
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

  render() {
    const props = this.props;
    const { itemsPerPage, maximumVisiblePaginators, renderChildren, list } = props;
    // where should splice starts
    const startList = this.state.currentPage * itemsPerPage;
    // where should splice ends
    const endList = startList + itemsPerPage;
    // elements which should to be shown
    const visibleList = targetList => targetList.slice(startList, endList);
    const className = props.className ? `Pagimagic ${props.className}` : 'Pagimagic';
    const { currentPage } = this.state;
    const totalPaginators = this.getTotalPaginators();
    const maxVisible =
      totalPaginators > maximumVisiblePaginators
        ? maximumVisiblePaginators
        : totalPaginators;
    let skip = 0;

    const createIterator = (amount, skip) => {
      return Array.apply(null, Array(amount)).reduce((memo, item, i) => {
        memo.push(skip + i);

        return memo;
      }, []);
    };

    const conditionToReturnIterator = (fn, total, max, skip) => {
      return total > max ? fn(max, skip) : fn(total, skip);
    };

    if (
      (currentPage + 1 > maxVisible && currentPage < totalPaginators) ||
      currentPage + 1 === totalPaginators
    ) {
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
                    props.useDefaultStyles
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

