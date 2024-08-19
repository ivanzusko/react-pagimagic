declare const Paginator: ({ className, list, currentPage, goTo, useDefaultStyles, }: {
    className?: string;
    list: any;
    currentPage: number;
    goTo: (pageIndex: number) => void;
    useDefaultStyles: any;
}) => any;
export default Paginator;
