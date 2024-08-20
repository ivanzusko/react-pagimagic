import React from 'react'
import glue from './glue'

const Counter = ({
  className,
  from,
  listLength,
  all
}: {
  className?: string
  from: number
  listLength: number
  all: number
}): JSX.Element => {
  const to = from + listLength - 1

  return (
    <div className={glue('Pagimagic', className)(['__counter'])}>
      {`${from}${from === to ? '' : `-${to}`}`} of {all}
    </div>
  )
}

export default Counter
