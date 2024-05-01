import React from 'react';
import {render} from '@testing-library/react';

import Counter from '../Counter';

describe('Counter', () => {
  it('should render without crashing', () => {
    const props = {
      from: 12,
      listLength: 4,
      all: 40,
      className: 'test-classname',
    };
    const { getByText } = render(<Counter {...props} />);

    expect(getByText('12-15 of 40')).toBeTruthy();
  });

  it('should render 1 of case', () => {
    const props = {
      from: 1,
      listLength: 1,
      all: 40,
      className: 'test-classname',
    };
    const { getByText } = render(<Counter {...props} />);

    expect(getByText('1 of 40')).toBeTruthy();
  });
});
