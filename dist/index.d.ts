import React, { Component } from 'react';
interface Props {
    className?: string;
    list: any[];
    itemsPerPage: number;
    currentPageIndex: number;
    changePageIndex?: (pageIndex: number) => void;
    maximumVisiblePaginators: number;
    renderChildren: (children: any[]) => React.ReactNode;
    arrow?: any;
    showCounter?: boolean;
    useDefaultStyles?: boolean;
}
interface State {
    currentPage: number;
    lastPageIndex: number | null;
}
declare class Pagimagic extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromProps(props: Props, state: State): {
        currentPage: number;
        lastPageIndex: number;
    } | null;
    handleChangeCurrentPageIndex: (pageIndex: number) => void;
    getTotalPaginators: () => number;
    getItemsPerPage: () => number;
    getCurrentPage: () => number;
    getMaximumVisiblePaginators: () => number;
    getList: () => any[];
    startList: () => number;
    endList: () => number;
    getVisibleList: () => any[];
    getMax: () => number;
    needToRenderArrows: () => boolean;
    needToShowCounter: () => boolean;
    goTo: (pageIndex: number) => void;
    onClickPrev: (event: React.MouseEvent) => void;
    onClickNext: (event: React.MouseEvent) => void;
    createIterator: (currentPage: number) => unknown;
    render(): React.JSX.Element;
}
export default Pagimagic;
