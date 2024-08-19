import React from 'react';

import glue from './glue';

const Paginator = ({
  className,
  list,
  currentPage,
  goTo,
  useDefaultStyles,
}: {
  className?: string;
  list: any;
  currentPage: number;
  goTo: (pageIndex: number) => void;
  useDefaultStyles: any;
}) => {
  const defaultStyles = (pageIndex: number) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '40px',
    width: '40px',
    height: '40px',
    padding: '10px',
    border: 'solid 1px #000',
    borderRadius: '3px',
    textAlign: 'center',
    margin: '0 5px',
    backgroundColor: currentPage === pageIndex ? '#000' : '#fff',
    color: currentPage === pageIndex ? '#fff' : '#000',
    cursor: 'pointer',
  });

  return (
    //@ts-ignore
    list.map((pageIndex, i: number) => {
      if (isNaN(pageIndex) && isNaN(list[i - 1])) return false;
      if (isNaN(pageIndex)) {
        return (
          <span
            key={pageIndex+i}
            className={glue('Pagimagic', className)(['__break'])}
            style={
              useDefaultStyles
                ? defaultStyles(pageIndex)
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
            useDefaultStyles
              ? defaultStyles(pageIndex)
              : {}
          }
          onClick={() => {
            goTo(pageIndex);
          }}
          className={
            currentPage === pageIndex
              ? glue('Pagimagic', className)(['__nav-item', '__nav-item--active'])
              : glue('Pagimagic', className)(['__nav-item'])
          }
        >
          {pageIndex + 1}
        </a>
      );
    })
  );
};

export default Paginator;
