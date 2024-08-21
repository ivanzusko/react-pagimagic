import React from 'react'
import { render } from '@testing-library/react'
import DefaultArrow from '../DefaultArrow'

describe('DefaultArrow Component', () => {
  test('renders with default rotation when next is true', () => {
    const { getByTestId } = render(<DefaultArrow next />)
    const arrowElement = getByTestId('Pagimagic-nav-arrow-default')

    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement).toHaveStyle('transform: none')
  })

  test('renders with 180 degree rotation when next is false', () => {
    const { getByTestId } = render(<DefaultArrow next={false} />)
    const arrowElement = getByTestId('Pagimagic-nav-arrow-default')

    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement).toHaveStyle('transform: rotate(-180deg)')
  })

  test('has correct dimensions and style', () => {
    const { getByTestId } = render(<DefaultArrow next />)
    const arrowElement = getByTestId('Pagimagic-nav-arrow-default')

    expect(arrowElement).toHaveStyle({
      position: 'absolute',
      display: 'inline-block',
      width: '50px',
      height: '50px',
      top: '0',
      left: '0'
    })
  })

  test('renders SVG element correctly', () => {
    const { container } = render(<DefaultArrow next />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveAttribute('viewBox', '0 0 240.823 240.823')
    expect(svgElement).toHaveStyle({
      display: 'inline-block',
      width: '100%'
    })
  })
})
