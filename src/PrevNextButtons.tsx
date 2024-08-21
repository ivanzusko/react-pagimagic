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
  const isDisabled = disabledClassName(currentPage, totalPaginators, direction) === 'disabled'

  const disableButtonStyles = {
    border: 'none',
    background: 'none'
  }

  return (
    <button
      aria-label={`${forward}-page`}
      style={
        useDefaultStyles
          ? {
              display: 'inline-block',
              cursor:
              isDisabled
                ? 'not-allowed'
                : 'pointer',
              position: 'relative',
              verticalAlign: 'middle',
              width: '50px',
              height: '50px',
              opacity: isDisabled ? '.3' : 1,
              ...disableButtonStyles
            }
          : {
              display: 'inline-block',
              cursor:
              isDisabled ? 'not-allowed' : 'pointer',
              ...disableButtonStyles
            }
      }
      className={
        glue('Pagimagic', className)(['__nav-item', `__nav-item--${forward}`, `__nav-item--${disabledClassName(currentPage, totalPaginators, direction)}`])
      }
      onClick={e => {
        callbackFn(e)
      }}
    >
      {
        (arrow != null)
          ? arrow()
          : useDefaultStyles
            ? <DefaultArrow next={forward === 'next'} />
            : (
              <span className={glue('Pagimagic', className)(['__nav-arrow', `__nav-arrow--${forward}`, `__nav-arrow--${disabledClassName(currentPage, totalPaginators, direction)}`])} aria-hidden='true'>
                {forward}
              </span>
              )
      }
    </button>
  )
};

function disabledClassName (currentPage: number, totalPaginators: number, direction?: PrevNext): 'disabled' | '' {
  if (direction === 'next') {
    return currentPage + 1 === totalPaginators ? 'disabled' : ''
  }
  return currentPage === 0 ? 'disabled' : ''
}
