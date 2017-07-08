import React from 'react';
import { shallow } from 'enzyme';

import Paginator from '../index';

describe('YourComponent', () => {
  describe('#render', () => {
    it('should render without crashing', () => {
      const props = {
        list: ['Sofiia', 'Anna'],
        itemsPerPage: 2,
        currentPageIndex: 0,
        maximumVisiblePaginators: 3,
        onChange: jest.fn(),
        renderChildren: jest.fn(),
      };
      const wrapper = shallow(<Paginator {...props} />);

      expect(wrapper.find('.Paginator').length).toBe(1);
    });
  });
});
