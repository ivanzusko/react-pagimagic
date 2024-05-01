import React from 'react';
import {render} from '@testing-library/react';

import DefaultArrow from '../DefaultArrow';

describe('DefaultArrow', () => {
  it('should render without crashing', () => {
    const res1 = render(<DefaultArrow next={false} />);
    const res2 = render(<DefaultArrow next={true} />);

    expect(res1.container.firstChild.style.transform).toBe('rotate(-180deg)');
    expect(res2.container.firstChild.style.transform).toBe('none');
  });
});
