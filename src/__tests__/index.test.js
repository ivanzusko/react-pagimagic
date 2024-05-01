import React from 'react';
import {render} from '@testing-library/react';

import Pagimagic from '../index';

describe('Pagimagic', () => {
  describe('#render', () => {
    const spyRenderFn = jest.fn();

    it('should render without crashing', () => {
      const props = {
        list: ['Sofiia', 'Anna', 'Fedir', 'Emilia'],
        itemsPerPage: 2,
        currentPageIndex: 0,
        maximumVisiblePaginators: 3,
        renderChildren: spyRenderFn,
        showCounter: true,
        className: 'test-classname'
      };
      const { getByText } = render(<Pagimagic {...props} />);

      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('1-2 of 4')).toBeTruthy();
    });
  });
});
