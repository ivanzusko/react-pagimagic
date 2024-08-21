import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Pagimagic from '../index'

describe('Pagimagic', () => {
  const mockedBigList = ['Sofiia', 'Anna', 'Fedir', 'Emilia', 'Ko', 'JO', 'Mian', 'Ukraine', 'Germany', 'Deutschland', 'USA', 'Tatooine', 'Kyiv', 'Berlin', 'Brandenburg', 'Tokio', 'BJJ']

  describe('#render', () => {
    const spyRenderFn = jest.fn()

    it('should render without crashing', () => {
      const props = {
        list: ['Sofiia', 'Anna', 'Fedir', 'Emilia'],
        itemsPerPage: 2,
        currentPageIndex: 0,
        maximumVisiblePaginators: 3,
        renderChildren: spyRenderFn,
        showCounter: true,
        className: 'test-classname'
      }
      render(<Pagimagic {...props} />)

      expect(screen.getByText('1')).toBeTruthy()
      expect(screen.getByText('2')).toBeTruthy()
      expect(screen.getByText('1-2 of 4')).toBeTruthy()
    })
  })

  it('should change pagination back-n-forth', () => {
    const spyRenderFn = jest.fn()

    const props = {
      list: mockedBigList,
      itemsPerPage: 2,
      currentPageIndex: 2,
      maximumVisiblePaginators: 5,
      renderChildren: spyRenderFn,
      showCounter: true,
      className: 'test-classname',
      useDefaultStyles: true
    }
    render(<Pagimagic {...props} />)

    expect(screen.queryByLabelText('current-page-number-2')).toBeNull()
    expect(screen.getByLabelText('current-page-number-3')).toBeInTheDocument()

    // can navigate back
    fireEvent.click(screen.getByLabelText('prev-page'))
    expect(screen.getByLabelText('current-page-number-2')).toBeInTheDocument()
    expect(screen.queryByLabelText('current-page-number-3')).toBeNull()

    // can navigate forward
    fireEvent.click(screen.getByLabelText('next-page'))
    expect(screen.getByLabelText('current-page-number-3')).toBeInTheDocument()
    expect(screen.queryByLabelText('current-page-number-2')).toBeNull()

    // can navigate one direction multiple times
    fireEvent.click(screen.getByLabelText('next-page'))
    expect(screen.getByLabelText('page-number-2')).toBeInTheDocument()
    expect(screen.getByLabelText('current-page-number-4')).toBeInTheDocument()
    expect(screen.queryByLabelText('page-number-5')).toBeNull()
    expect(screen.getByLabelText('page-number-9')).toBeInTheDocument()

    // can come to the middle when '...' is from both sides
    // eg 1 ... 4 [5] 6 ... 9

    fireEvent.click(screen.getByLabelText('next-page'))
    expect(screen.getByLabelText('page-number-1')).toBeInTheDocument()
    expect(screen.queryByLabelText('page-number-2')).toBeNull()
    expect(screen.queryByLabelText('page-number-3')).toBeNull()
    expect(screen.getByLabelText('page-number-4')).toBeInTheDocument()
    expect(screen.getByLabelText('current-page-number-5')).toBeInTheDocument()
    expect(screen.getByLabelText('page-number-6')).toBeInTheDocument()
    expect(screen.queryByLabelText('page-number-7')).toBeNull()
    expect(screen.queryByLabelText('page-number-8')).toBeNull()
    expect(screen.getByLabelText('page-number-9')).toBeInTheDocument()

    // hits the last page and ...
    fireEvent.click(screen.getByLabelText('next-page'))
    fireEvent.click(screen.getByLabelText('next-page'))
    fireEvent.click(screen.getByLabelText('next-page'))
    fireEvent.click(screen.getByLabelText('next-page'))
    expect(screen.getByLabelText('current-page-number-9')).toBeInTheDocument()
    // ... doesn't go forward
    fireEvent.click(screen.getByLabelText('next-page'))
    expect(screen.getByLabelText('current-page-number-9')).toBeInTheDocument()
  })

  it('should call custom changePageIndex callback', () => {
    const spyRenderFn = jest.fn()
    const mockChangePageFn = jest.fn()

    const props = {
      list: mockedBigList,
      itemsPerPage: 2,
      currentPageIndex: 0,
      maximumVisiblePaginators: 3,
      renderChildren: spyRenderFn,
      showCounter: true,
      className: 'test-classname',
      changePageIndex: mockChangePageFn
    }
    render(<Pagimagic {...props} />)

    fireEvent.click(screen.getByLabelText('next-page'))
    expect(mockChangePageFn).toHaveBeenCalledWith(1)
    fireEvent.click(screen.getByLabelText('next-page'))
    expect(mockChangePageFn).toHaveBeenCalledWith(2)
  })

  it('should render custom arrows', () => {
    const spyRenderFn = jest.fn()
    const mockChangePageFn = jest.fn()

    const props = {
      list: mockedBigList,
      itemsPerPage: 2,
      currentPageIndex: 0,
      maximumVisiblePaginators: 3,
      renderChildren: spyRenderFn,
      showCounter: true,
      className: 'test-classname',
      changePageIndex: mockChangePageFn,
      arrow: () => <p>Johnny</p>
    }
    render(<Pagimagic {...props} />)

    fireEvent.click(screen.queryAllByText('Johnny')[1])
    expect(mockChangePageFn).toHaveBeenCalledWith(1)
  })
})
