import React from 'react';
import { shallow } from 'enzyme';

import YourComponent from '../index';

describe('YourComponent', () => {
  describe('#render', () => {
    it('should render without crashing', () => {
      const props = {};
      const wrapper = shallow(<YourComponent {...props} />);

      expect(wrapper.find('.Paginator').length).toBe(1);
    });
  });
});
