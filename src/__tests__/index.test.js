import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Pagimagic from '../index';

describe('YourComponent', () => {
  describe('#render', () => {
    it('should render without crashing', () => {
      const props = {
        list: ['Sofiia', 'Anna'],
        itemsPerPage: 2,
        currentPageIndex: 0,
        maximumVisiblePaginators: 3,
        renderChildren: jest.fn(),
      };
      const wrapper = shallow(<Pagimagic {...props} />);

      expect(wrapper.find('.Pagimagic').length).toBe(1);
    });
  });
});
