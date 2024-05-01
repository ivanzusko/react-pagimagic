import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import Paginator from '../Paginator';

describe('Paginator', () => {
  it('should render without crashing', () => {
    const spyFn = jest.fn();
    const props = {
      className: 'test-classname',
      list: [1, 2, 3, 4, 5, '...', 13],
      currentPage: 1,
      goTo: spyFn,
      useDefaultStyles: true,
    };
    const { getByText } = render(<Paginator {...props} />);

    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('6')).toBeTruthy();
    expect(getByText('14')).toBeTruthy();

    fireEvent.click(screen.getByText(/14/i));
    expect(spyFn).toHaveBeenCalledTimes(1);

    const el = getByText('...');
    expect(el.style.width).toBe('40px');
    expect(el.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('should render without default styles', () => {
    const props = {
      className: 'test-classname',
      list: [1, 2, 3, 4, 5, '...', 13],
      currentPage: 1,
      goTo: jest.fn(),
      useDefaultStyles: false,
    };
    const { getByText } = render(<Paginator {...props} />);

    const el = getByText('...');
    expect(el.style.width).toBe('');
    expect(el.style.backgroundColor).toBe('');
  });
});
