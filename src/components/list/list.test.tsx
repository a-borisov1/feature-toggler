import React from 'react';
import { shallow } from 'enzyme';

import { List } from '.';
import { Item } from '../item';

describe('List component', () => {
  const props = {
    featuresList: [
      {
        key: 'FEATURE_TOGGLE_1',
        value: 'FEATURE_TOGGLE_1',
        active: true,
        labels: ['Private', 'Test'],
        createdAt: 1607417878011,
      },
    ],
    setFeaturesList: ([]) => {},
  };

  it('Render right amount of Item components', () => {
    const ShadowList = shallow(<List {...props} />);
    expect(ShadowList.find(Item)).toHaveLength(1);
  });
});
