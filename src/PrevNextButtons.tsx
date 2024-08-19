import React from 'react';
import glue from './glue';
import DefaultArrow from './DefaultArrow';
import { PrevNext } from './types/definitions';

export default function PrevNextButtons({
  currentPage,
  totalPaginators,
  callbackFn,
  direction,
  useDefaultStyles,
  arrow,
  className,
}: {
  currentPage: any;
  totalPaginators: any;
  callbackFn: any;
  direction?: PrevNext;
  useDefaultStyles: any;
  arrow: any;
  className: any;
}) {
  const forward = direction === 'next' ? 'next' : 'prev';
  const disabled = (direction?: PrevNext) => {
    if (direction === 'next') {
      return currentPage + 1 === totalPaginators ? 'disabled' : '';
    }
    return currentPage === 0 ? 'disabled' : '';
  };

  return (
    <div
      style={
        useDefaultStyles
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
        glue('Pagimagic', className)(['__nav-item', `__nav-item--${forward}`, `__nav-item--${disabled(direction)}`])
      }
      onClick={e => {
        callbackFn(e);
      }}
    >
      {
        arrow && typeof arrow === 'function'
          ? arrow()
          : useDefaultStyles
            ? <DefaultArrow next={forward === 'next'} />
            : arrow
              ? <span className={glue('Pagimagic', className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])}></span>
              : <span className={glue('Pagimagic', className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])} aria-hidden="true">
                {forward}
              </span>
      }
    </div>
  );
};
