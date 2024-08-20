import React from 'react'
import glue from './glue'
import DefaultArrow from './DefaultArrow'
import { PrevNext } from './types/definitions'

export default function PrevNextButtons ({
  currentPage,
  totalPaginators,
  callbackFn,
  direction,
  useDefaultStyles = false,
  arrow,
  className
}: {
  currentPage: number
  totalPaginators: number
  callbackFn: (event: React.MouseEvent) => void
  direction?: PrevNext
  useDefaultStyles?: boolean
  arrow?: () => JSX.Element
  className?: string
}): JSX.Element {
  const forward = direction === 'next' ? 'next' : 'prev'
  const disabled = (direction?: PrevNext): 'disabled' | '' => {
    if (direction === 'next') {
      return currentPage + 1 === totalPaginators ? 'disabled' : ''
    }
    return currentPage === 0 ? 'disabled' : ''
  }

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
              opacity: disabled(direction) === 'disabled' ? '.3' : 1
            }
          : {
              display: 'inline-block',
              cursor:
            disabled(direction) === 'disabled' ? 'not-allowed' : 'pointer'
            }
      }
      className={
        glue('Pagimagic', className)(['__nav-item', `__nav-item--${forward}`, `__nav-item--${disabled(direction)}`])
      }
      onClick={e => {
        callbackFn(e)
      }}
    >
      {
        (arrow != null) && typeof arrow === 'function'
          ? arrow()
          : useDefaultStyles
            ? <DefaultArrow next={forward === 'next'} />
            : (arrow != null)
                ? <span className={glue('Pagimagic', className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])} />
                : (
                  <span className={glue('Pagimagic', className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabled(direction)}`])} aria-hidden='true'>
                    {forward}
                  </span>
                  )
      }
    </div>
  )
};
