import React, { Component } from 'react';
import glue from './glue';
import PrevNextButtons from './PrevNextButtons';
import Counter from './Counter';
import Paginator from './Paginator';
;
class Pagimagic extends Component {
    constructor(props) {
        super(props);
        this.handleChangeCurrentPageIndex = (pageIndex) => {
            if (this.props.changePageIndex) {
                this.props.changePageIndex(pageIndex);
                this.setState(() => ({ currentPage: pageIndex }));
            }
            else {
                this.setState(() => ({ currentPage: pageIndex }));
            }
        };
        this.getTotalPaginators = () => {
            return Math.ceil(this.props.list.length / this.props.itemsPerPage);
        };
        this.getItemsPerPage = () => this.props.itemsPerPage;
        this.getCurrentPage = () => this.state.currentPage;
        this.getMaximumVisiblePaginators = () => this.props.maximumVisiblePaginators;
        this.getList = () => this.props.list;
        // where should splice starts
        this.startList = () => this.getCurrentPage() * this.getItemsPerPage();
        // where should splice ends
        this.endList = () => this.startList() + this.getItemsPerPage();
        // elements which should to be shown
        this.getVisibleList = () => this.getList().slice(this.startList(), this.endList());
        this.getMax = () => this.getTotalPaginators() > this.getMaximumVisiblePaginators()
            ? this.getMaximumVisiblePaginators()
            : this.getTotalPaginators();
        this.needToRenderArrows = () => this.getTotalPaginators() > this.getMax();
        this.needToShowCounter = () => !!this.props.showCounter;
        this.goTo = (pageIndex) => {
            this.handleChangeCurrentPageIndex(pageIndex);
        };
        this.onClickPrev = (event) => {
            event.preventDefault();
            if (this.getCurrentPage() > 0) {
                this.goTo(this.getCurrentPage() - 1);
            }
        };
        this.onClickNext = (event) => {
            event.preventDefault();
            if (this.getCurrentPage() + 1 < this.getTotalPaginators()) {
                this.goTo(this.getCurrentPage() + 1);
            }
        };
        this.createIterator = (currentPage) => {
            const HALF = Math.floor(this.getMaximumVisiblePaginators() / 2);
            const TOTAL = this.getTotalPaginators();
            const VISIBLE = TOTAL > this.getMaximumVisiblePaginators() ? this.getMaximumVisiblePaginators() : TOTAL;
            const TO_RENDER = VISIBLE - 3;
            const HALF_TO_RENDER = TO_RENDER / 2;
            // @ts-ignore
            const make = (condition) => memo => el => {
                if (condition)
                    memo.push(el);
            };
            const makeFirst = (memo, i) => {
                if (i === 0)
                    memo.push(i);
            };
            const makeEmpty = (condition) => (memo) => {
                if (this.needToRenderArrows() && condition)
                    memo.push('...');
            };
            const makeLast = (memo, i) => {
                if (i + 1 === VISIBLE)
                    memo.push(TOTAL - 1);
            };
            return Array.apply(null, Array(VISIBLE)).reduce((memo, item, i) => {
                /**
                 * Stage 1 - till the middle
                 */
                if (currentPage + HALF < VISIBLE) {
                    make(i < VISIBLE - 1)(memo)(i);
                    // @ts-ignore
                    makeEmpty(i >= VISIBLE - 1)(memo);
                    // @ts-ignore
                    makeLast(memo, i);
                }
                /**
                 * Stage 2 - when pagination starts moving
                 */
                else if (currentPage + HALF === VISIBLE && VISIBLE !== TOTAL) {
                    // @ts-ignore
                    makeFirst(memo, i);
                    make(i !== 0 && i !== VISIBLE - 1)(memo)(i);
                    // @ts-ignore
                    makeEmpty(i > HALF && i + 1 === VISIBLE)(memo);
                    // @ts-ignore
                    makeLast(memo, i);
                }
                /**
                 * Stage 3 - main part
                 */
                else if (currentPage + HALF < TOTAL) {
                    const el = (i + currentPage + HALF - VISIBLE + 1);
                    // @ts-ignore
                    makeFirst(memo, i);
                    // @ts-ignore
                    makeEmpty(el < currentPage - HALF_TO_RENDER)(memo);
                    make(el >= currentPage - HALF_TO_RENDER && el <= currentPage + HALF_TO_RENDER)(memo)(el);
                    // @ts-ignore
                    makeEmpty(el > currentPage + HALF_TO_RENDER && el !== TOTAL - 1)(memo);
                    // @ts-ignore
                    makeLast(memo, i);
                }
                /**
                 * Stage 4 - when last part rendered and we need just move active page indicator
                 */
                else if (currentPage + 1 < TOTAL) {
                    const renderingAmount = TOTAL - VISIBLE;
                    const el = renderingAmount + i;
                    // @ts-ignore
                    makeFirst(memo, i);
                    // @ts-ignore
                    makeEmpty(el <= renderingAmount)(memo);
                    make(el > renderingAmount)(memo)(el);
                }
                /**
                 * Last Stage - last page of paginating
                 */
                else {
                    const el = TOTAL - VISIBLE + i;
                    // @ts-ignore
                    makeFirst(memo, i);
                    // @ts-ignore
                    makeEmpty(el < currentPage - VISIBLE + 2)(memo);
                    make(el >= currentPage - VISIBLE + 2)(memo)(el);
                }
                return memo;
            }, []);
        };
        this.state = {
            // @ts-ignore
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
    render() {
        console.log('johnny > this.props', this.props);
        const { renderChildren } = this.props;
        return (React.createElement("div", { className: glue('Pagimagic', this.props.className)() },
            renderChildren(this.getVisibleList()),
            React.createElement("nav", { className: glue('Pagimagic', this.props.className)(['__nav']) },
                this.needToRenderArrows() &&
                    React.createElement(PrevNextButtons, { currentPage: this.getCurrentPage(), totalPaginators: this.getTotalPaginators(), callbackFn: this.onClickPrev, useDefaultStyles: this.props.useDefaultStyles, arrow: this.props.arrow, className: this.props.className }),
                React.createElement(Paginator, { className: this.props.className, list: this.createIterator(this.state.currentPage), currentPage: this.state.currentPage, goTo: this.goTo, useDefaultStyles: this.props.useDefaultStyles }),
                this.needToRenderArrows() &&
                    React.createElement(PrevNextButtons, { currentPage: this.getCurrentPage(), totalPaginators: this.getTotalPaginators(), callbackFn: this.onClickNext, direction: 'next', useDefaultStyles: this.props.useDefaultStyles, arrow: this.props.arrow, className: this.props.className })),
            this.needToShowCounter() &&
                React.createElement(Counter, { className: this.props.className, from: this.startList() + 1, listLength: this.getVisibleList().length, all: this.getList().length })));
    }
}
export default Pagimagic;
