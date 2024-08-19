import React from 'react';
import glue from './glue';
import { PaginationIterator } from './types/definitions';

export default function Paginator({
  className,
  list,
  currentPage,
  goTo,
  useDefaultStyles,
}: {
  className?: string;
  list: PaginationIterator;
  currentPage: number;
  goTo: (pageIndex: number) => void;
  useDefaultStyles?: boolean;
}) {
  return (
    list.map((pageIndex, i: number) => {
      // check if it is '...'
      if (typeof pageIndex !== 'number') {
        if (typeof list[i - 1] !== 'number') return false;

        return (
          <span
            key={`${pageIndex}${i}`}
            className={glue('Pagimagic', className)(['__break'])}
            style={
              useDefaultStyles
                ? getDefaultStyles(false)
                : {}
            }
          >
            {pageIndex}
          </span>
        );
      } else {
        return (
          <a
            key={pageIndex}
            style={
              useDefaultStyles
                ? getDefaultStyles(currentPage === pageIndex)
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
      }
    })
  );
};

function getDefaultStyles(isActivePage: boolean) {
  return {
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
    backgroundColor: isActivePage ? '#000' : '#fff',
    color: isActivePage ? '#fff' : '#000',
    cursor: 'pointer',
  }
}
