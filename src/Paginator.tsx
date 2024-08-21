import React from 'react'
import glue from './glue'
import { PaginationIterator } from './types/definitions'

export default function Paginator ({
  className,
  list,
  currentPage,
  goTo,
  useDefaultStyles = false
}: {
  className?: string
  list: PaginationIterator
  currentPage: number
  goTo: (pageIndex: number) => void
  useDefaultStyles?: boolean
}): Array<false | React.JSX.Element> {
  return (
    list.map((pageIndex, i: number) => {
      // check if it is '...'
      if (typeof pageIndex !== 'number') {
        if (typeof list[i - 1] !== 'number') return false

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
        )
      } else {
        return (
          <button
            key={pageIndex}
            aria-label={`${currentPage === pageIndex ? 'current-' : ''}page-number-${pageIndex + 1}`}
            style={
              useDefaultStyles
                ? getDefaultStyles(currentPage === pageIndex)
                : {}
            }
            onClick={() => {
              goTo(pageIndex)
            }}
            className={
              currentPage === pageIndex
                ? glue('Pagimagic', className)(['__nav-item', '__nav-item--active'])
                : glue('Pagimagic', className)(['__nav-item'])
            }
          >
            {pageIndex + 1}
          </button>
        )
      }
    })
  )
};

function getDefaultStyles (isActivePage: boolean): {
  display: 'inline-block'
  verticalAlign: 'middle'
  width: '40px'
  height: '40px'
  padding: '10px'
  border: 'solid 1px #000'
  borderRadius: '3px'
  textAlign: 'center'
  margin: '0 5px'
  backgroundColor: '#000' | '#fff'
  color: '#fff' | '#000'
  cursor: 'pointer'
  boxSizing: 'border-box'
} {
  return {
    display: 'inline-block',
    verticalAlign: 'middle',
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
    boxSizing: 'border-box'
  }
}
