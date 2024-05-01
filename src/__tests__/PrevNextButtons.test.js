import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import PrevNextButtons from '../PrevNextButtons';

describe('PrevNextButtons', () => {
  it('should render without crashing', () => {
    const spyFn = jest.fn();
    const props = {
      className: 'test-classname',
      currentPage: 1,
      callbackFn: spyFn,
      useDefaultStyles: true,
      totalPaginators: 14,
      direction: 'next', // or undefined
      arrow: undefined,
    };
    const { getByTestId } = render(<PrevNextButtons {...props} />);

    const el = getByTestId('Pagimagic-nav-arrow-default');
    
    expect(el).toBeTruthy();

    fireEvent.click(el);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});
